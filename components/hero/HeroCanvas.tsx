"use client";

import { useEffect, useRef } from "react";
import { createFieldSet, curlAngle, sumForces, type Vec } from "./fields";
// ink.ts is reused as the "foam" pool: bright specks the cursor stirs up, advected by the same water.
import { clearInk, createInkPool, INK_CAP, INK_LIFE, spawnInk } from "./ink";
import { buildAuroraLut, LUT_SIZE } from "./palettes";

const BG = "#05070f";
const FADE = "rgba(5,7,15,0.09)";
const MAX_SPEED = 3;
const FRAME_MS = 1000 / 60;
const GRID = 16; // px between force-grid nodes
const MAX_LIFE = 1200; // frames before a particle respawns
const RIPPLES = 14;
const RIPPLE_LIFE = 36; // frames

const LUT = buildAuroraLut(0.7);
const FOAM_LUT = buildAuroraLut(1);

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const overlay = overlayRef.current;
    const octx = overlay ? overlay.getContext("2d") : null;
    const host = canvas.closest("section") ?? canvas.parentElement!;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const debug = new URLSearchParams(window.location.search).get("debug") === "1";
    const { fields, cursor, whirlpools } = createFieldSet();
    const foam = createInkPool();

    let w = 0;
    let h = 0;
    let count = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pvx = new Float32Array(0);
    let pvy = new Float32Array(0);
    let plife = new Float32Array(0);
    // coarse force grid (all fields summed, rebuilt every frame)
    let gcols = 0;
    let grows = 0;
    let gfx = new Float32Array(0);
    let gfy = new Float32Array(0);
    const acc: Vec = [0, 0]; // shared scratch for summed forces

    let tSim = 0; // simulated seconds (does not jump after a pause)
    let foamPhase = 0;
    let frameNo = 0;
    let fps = 60;

    // pointer state
    let pointerActive = false;
    let cx = 0;
    let cy = 0;
    let lastMoveT = 0;
    let pendVx = 0; // px per 60fps frame, decays when the pointer stops
    let pendVy = 0;
    let moved = false;
    let foamPrevX = 0;
    let foamPrevY = 0;
    let hasFoamPrev = false;
    let lastRippleT = 0;

    // ripple rings (drawn on the overlay)
    const rx = new Float32Array(RIPPLES);
    const ry = new Float32Array(RIPPLES);
    const rage = new Float32Array(RIPPLES).fill(RIPPLE_LIFE);
    let rhead = 0;

    const readouts = new Map<string, HTMLElement>();
    host.querySelectorAll<HTMLElement>("[data-readout]").forEach((el) => {
      readouts.set(el.dataset.readout ?? "", el);
    });

    function particleCount(): number {
      const base = w < 768 ? 500 : 4000;
      const areaFactor = Math.max(0.4, Math.min(1, (w * h) / (1280 * 720)));
      const cores = navigator.hardwareConcurrency || 8;
      return Math.round(base * areaFactor * (cores <= 4 ? 0.7 : 1));
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      if (overlay && octx) {
        overlay.width = canvas!.width;
        overlay.height = canvas!.height;
        octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, w, h);

      count = particleCount();
      px = new Float32Array(count);
      py = new Float32Array(count);
      pvx = new Float32Array(count);
      pvy = new Float32Array(count);
      plife = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        px[i] = Math.random() * w;
        py[i] = Math.random() * h;
        plife[i] = Math.random() * MAX_LIFE; // stagger so respawns are spread out
      }
      gcols = Math.ceil(w / GRID) + 2;
      grows = Math.ceil(h / GRID) + 2;
      gfx = new Float32Array(gcols * grows);
      gfy = new Float32Array(gcols * grows);
      clearInk(foam);
      rage.fill(RIPPLE_LIFE);
      readouts.get("count")?.replaceChildren(String(count));
      if (reduced) renderStatic();
    }

    /** One simulation + draw step. dt is in 60fps frame units. */
    function step(dt: number, withStir: boolean) {
      tSim += (dt * FRAME_MS) / 1000;
      const t = tSim;
      for (let i = 0; i < fields.length; i++) fields[i].update(t, w, h);

      // the cursor drags water along its own motion; that motion fades once the pointer stops
      pendVx *= Math.pow(0.8, dt);
      pendVy *= Math.pow(0.8, dt);
      cursor.setPointer(cx, cy, pointerActive && withStir, pendVx, pendVy);

      const c = ctx!;
      c.globalCompositeOperation = "source-over";
      c.fillStyle = FADE;
      c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = "lighter";

      // All fields are summed ONCE per frame onto a coarse grid; particles then just sample it.
      buildGrid(t);

      // --- water particles: short line segments (previous -> current position), like streamlines
      const damp = Math.pow(0.96, dt);
      c.lineWidth = 1.1;
      for (let i = 0; i < count; i++) {
        const x0 = px[i];
        const y0 = py[i];
        sampleGrid(x0, y0, acc);
        let vx = (pvx[i] + acc[0] * dt) * damp;
        let vy = (pvy[i] + acc[1] * dt) * damp;
        const sp2 = vx * vx + vy * vy;
        if (sp2 > MAX_SPEED * MAX_SPEED) {
          const k = MAX_SPEED / Math.sqrt(sp2);
          vx *= k;
          vy *= k;
        }
        const x = x0 + vx * dt;
        const y = y0 + vy * dt;
        const life = plife[i] + dt;
        if (x > w + 10 || x < -40 || y < -10 || y > h + 10 || whirlpools.absorbs(x, y)) {
          // left the screen, or drained by a whirlpool: re-enter upstream (left edge)
          px[i] = -5 - Math.random() * 20;
          py[i] = Math.random() * h;
          pvx[i] = 1.6;
          pvy[i] = 0;
          plife[i] = 0;
          continue;
        }
        if (life > MAX_LIFE) {
          px[i] = Math.random() * w;
          py[i] = Math.random() * h;
          pvx[i] = 0;
          pvy[i] = 0;
          plife[i] = 0;
          continue;
        }
        px[i] = x;
        py[i] = y;
        pvx[i] = vx;
        pvy[i] = vy;
        plife[i] = life;
        // aurora colour: flow angle, speed, and a slow bands-across-the-water drift
        const bands = 0.5 + 0.5 * Math.sin((y / h) * 3.2 + (x / w) * 2 + t * 0.15);
        const u =
          ((Math.atan2(vy, vx) + Math.PI) / (2 * Math.PI)) * 0.35 +
          Math.min(1, Math.sqrt(sp2) / MAX_SPEED) * 0.25 +
          bands * 0.4;
        c.globalAlpha = life < 20 ? life / 20 : 1;
        c.strokeStyle = LUT[(u * (LUT_SIZE - 1)) | 0];
        c.beginPath();
        c.moveTo(x0, y0);
        c.lineTo(x, y);
        c.stroke();
      }
      c.globalAlpha = 1;

      if (withStir) stepFoam(dt, t);
    }

    /** Sum every enabled field at each grid node (nodes spaced GRID px apart). */
    function buildGrid(t: number) {
      for (let r = 0; r < grows; r++) {
        for (let q = 0; q < gcols; q++) {
          sumForces(fields, q * GRID, r * GRID, t, acc);
          const k = r * gcols + q;
          gfx[k] = acc[0];
          gfy[k] = acc[1];
        }
      }
    }

    /** Bilinear sample of the force grid into `out`. */
    function sampleGrid(x: number, y: number, out: Vec) {
      const fx = Math.min(Math.max(x / GRID, 0), gcols - 1.001);
      const fy = Math.min(Math.max(y / GRID, 0), grows - 1.001);
      const ix = fx | 0;
      const iy = fy | 0;
      const tx = fx - ix;
      const ty = fy - iy;
      const k = iy * gcols + ix;
      const a = (1 - tx) * (1 - ty);
      const b = tx * (1 - ty);
      const cc = (1 - tx) * ty;
      const d = tx * ty;
      out[0] = gfx[k] * a + gfx[k + 1] * b + gfx[k + gcols] * cc + gfx[k + gcols + 1] * d;
      out[1] = gfy[k] * a + gfy[k + 1] * b + gfy[k + gcols] * cc + gfy[k + gcols + 1] * d;
    }

    /** Foam the cursor stirs up. It rides the same currents, so whirlpools catch and swallow it. */
    function stepFoam(dt: number, t: number) {
      const c = ctx!;
      if (moved && pointerActive) {
        const n = 1 + Math.floor(Math.random() * 2);
        foamPhase += 0.02;
        const hueU = 0.5 + 0.5 * Math.sin(foamPhase);
        const x0 = hasFoamPrev ? foamPrevX : cx;
        const y0 = hasFoamPrev ? foamPrevY : cy;
        for (let i = 0; i < n; i++) {
          const f = (i + 1) / n;
          spawnInk(foam, x0 + (cx - x0) * f, y0 + (cy - y0) * f, pendVx, pendVy, hueU);
        }
        foamPrevX = cx;
        foamPrevY = cy;
        hasFoamPrev = true;
        moved = false;
      } else if (!pointerActive) {
        hasFoamPrev = false;
      }
      foamPhase += 0.0015 * dt;

      const damp = Math.pow(0.97, dt);
      for (let i = 0; i < INK_CAP; i++) {
        const age = foam.age[i];
        if (age >= INK_LIFE) continue;
        let x = foam.x[i];
        let y = foam.y[i];
        sampleGrid(x, y, acc);
        const a = curlAngle(x, y, t);
        const vx = (foam.vx[i] + (acc[0] + Math.cos(a) * 0.025) * dt * 1.4) * damp;
        const vy = (foam.vy[i] + (acc[1] + Math.sin(a) * 0.025) * dt * 1.4) * damp;
        x += vx * dt;
        y += vy * dt;
        foam.x[i] = x;
        foam.y[i] = y;
        foam.vx[i] = vx;
        foam.vy[i] = vy;
        // a drained speck dies at once
        foam.age[i] = whirlpools.absorbs(x, y) ? INK_LIFE : age + dt;
        const k = 1 - age / INK_LIFE;
        c.globalAlpha = 0.12 * k; // subtle: HUD text must stay readable
        c.fillStyle = FOAM_LUT[(foam.hue[i] * (LUT_SIZE - 1)) | 0];
        c.beginPath();
        c.arc(x, y, 0.7 + 2.4 * k, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    /**
     * Overlay canvas (cleared every frame, so no smearing): expanding ripple rings where the
     * cursor stirs the water, a small reticle on each field centre (debug only), radii and labels in ?debug=1.
     */
    function drawOverlay(dt: number) {
      const c = octx;
      if (!c) return;
      c.clearRect(0, 0, w, h);
      c.lineWidth = 1;

      for (let i = 0; i < RIPPLES; i++) {
        if (rage[i] >= RIPPLE_LIFE) continue;
        rage[i] += dt;
        const k = rage[i] / RIPPLE_LIFE;
        c.globalAlpha = 0.12 * (1 - k);
        c.strokeStyle = "#7dffc8";
        c.beginPath();
        c.arc(rx[i], ry[i], 6 + k * 50, 0, Math.PI * 2);
        c.stroke();
      }

      if (!debug) {
        c.globalAlpha = 1;
        return; // no reticles or labels outside ?debug=1
      }
      c.font = "10px monospace";
      for (let i = 0; i < fields.length; i++) {
        const ms = fields[i].markers;
        if (!ms || fields[i].name === "cursor") continue;
        for (let j = 0; j < ms.length; j++) {
          const m = ms[j];
          if (m.x < -1000) continue;
          c.strokeStyle = m.color;
          c.fillStyle = m.color;
          c.globalAlpha = debug ? 0.9 : 0.35;
          c.beginPath();
          c.arc(m.x, m.y, 9, 0, Math.PI * 2);
          c.moveTo(m.x - 16, m.y);
          c.lineTo(m.x - 5, m.y);
          c.moveTo(m.x + 5, m.y);
          c.lineTo(m.x + 16, m.y);
          c.moveTo(m.x, m.y - 16);
          c.lineTo(m.x, m.y - 5);
          c.moveTo(m.x, m.y + 5);
          c.lineTo(m.x, m.y + 16);
          c.stroke();
          if (debug) {
            c.beginPath();
            c.arc(m.x, m.y, m.r, 0, Math.PI * 2);
            c.stroke();
          }
          c.globalAlpha = debug ? 0.9 : 0.5;
          c.fillText(debug ? m.label : m.label.toUpperCase(), m.x + 14, m.y - 12);
        }
      }
      c.globalAlpha = 1;
    }

    function renderStatic() {
      // Reduced motion: let the river settle, draw once, no stirring.
      for (let i = 0; i < 260; i++) step(1, false);
      drawOverlay(0);
    }

    function updateReadouts() {
      const az = readouts.get("az");
      const el = readouts.get("el");
      if (!az || !el) return;
      if (pointerActive) {
        // map cursor to a sky-like coordinate: x -> azimuth -180..180, y -> elevation +90..-90
        az.replaceChildren(`${((cx / w - 0.5) * 360).toFixed(1)}°`);
        el.replaceChildren(`${((0.5 - cy / h) * 180).toFixed(1)}°`);
      } else {
        az.replaceChildren("--");
        el.replaceChildren("--");
      }
    }

    // --- loop control
    let raf = 0;
    let last = 0;
    let running = false;
    let onScreen = true;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const ms = Math.min(now - last, 50);
      last = now;
      const dt = ms / FRAME_MS;
      fps += (1000 / Math.max(ms, 1) - fps) * 0.05;
      step(dt, true);
      drawOverlay(dt);
      if (++frameNo % 10 === 0) updateReadouts();
    }

    function sync() {
      const should = onScreen && !document.hidden && !reduced;
      if (should && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    // --- pointer (mouse, pen, touch)
    function onPointer(e: PointerEvent) {
      if (reduced) return;
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (pointerActive && lastMoveT > 0) {
        const f = Math.max(now - lastMoveT, 1) / FRAME_MS; // px per 60fps frame
        pendVx = (x - cx) / f;
        pendVy = (y - cy) / f;
      }
      cx = x;
      cy = y;
      lastMoveT = now;
      pointerActive = true;
      moved = true;
      // a ripple every ~180ms of movement
      if (now - lastRippleT > 180) {
        lastRippleT = now;
        rx[rhead] = x;
        ry[rhead] = y;
        rage[rhead] = 0;
        rhead = (rhead + 1) % RIPPLES;
      }
    }
    function onLeave() {
      pointerActive = false;
      lastMoveT = 0;
    }

    // --- debounced resize
    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      sync();
    });

    resize();
    io.observe(host);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    host.addEventListener("pointermove", onPointer);
    host.addEventListener("pointerdown", onPointer);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointercancel", onLeave);
    function onUp(e: PointerEvent) {
      if (e.pointerType === "touch") onLeave();
    }
    host.addEventListener("pointerup", onUp);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerdown", onPointer);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      host.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ background: BG }}
      />
      <canvas
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </>
  );
}
