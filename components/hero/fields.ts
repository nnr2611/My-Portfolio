// Force fields for the hero "river". Each field is a small object: toggle `enabled`, add or remove it in the list.
// Units: CSS pixels, seconds. Forces are accelerations per 60fps frame.
// To keep the hot loop allocation-free, each field owns one output tuple and `force` returns it
// (the caller must read it before calling the next field).

export type Vec = [number, number];

export type Marker = { x: number; y: number; r: number; color: string; label: string };

export type Field = {
  name: string;
  enabled: boolean;
  /** Once per frame: move centres, age whirlpools, rescale radii. */
  update(t: number, w: number, h: number): void;
  /** Force at (x, y). Returns this field's own reusable tuple. */
  force(x: number, y: number, t: number): Vec;
  /** Present for fields with centres; used by the reticle / ?debug=1 overlay. */
  markers?: Marker[];
};

/** Overall size factor so radii feel the same on phones and large monitors. */
function sizeScale(w: number, h: number): number {
  return Math.min(1.4, Math.max(0.55, Math.min(w, h) / 800));
}

/** Higher-frequency angle noise, used for the extra curl on foam. */
export function curlAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.011 + t * 0.6) + Math.cos(y * 0.013 - t * 0.5) + Math.sin((x + y) * 0.007 + t * 0.4)
  ) * 1.6;
}

// ---------------------------------------------------------------- 1. River current

/**
 * Water flows left to right. Acceleration (terminal speed ~ a / 0.04 with damping 0.96):
 *   ax = A * (0.8 + 0.4 sin(pi y / h))      faster mid-stream, slower near the banks
 *   ay = B * sin(0.004 x + 0.003 y - 0.3 t) a very slight meander (kept small: the stream stays steady)
 */
export function createRiver(strength = 0.08): Field {
  const out: Vec = [0, 0];
  let H = 1;
  return {
    name: "river",
    enabled: true,
    update(_t, _w, h) {
      H = h;
    },
    force(x, y, t) {
      out[0] = strength * (0.8 + 0.4 * Math.sin((Math.PI * y) / H));
      out[1] =
        0.008 * Math.sin(x * 0.004 + y * 0.003 - t * 0.3) +
        0.004 * Math.cos(x * 0.011 - y * 0.009 + t * 0.5);
      return out;
    },
  };
}

// ---------------------------------------------------------------- 2. Whirlpools

type Slot = { x: number; y: number; age: number; life: number; sign: 1 | -1; r: number; e: number };

export type Whirlpools = Field & {
  /** True when (x, y) is inside the drain at the core of a live whirlpool. */
  absorbs(x: number, y: number): boolean;
  /** How many whirlpools are currently visible. */
  active(): number;
  /** Change how many whirlpools exist (applied on the next update). */
  setCount(n: number): void;
};

/**
 * A few whirlpools that open at random spots, spin up, drift downstream and fade out.
 * Each one has an envelope e = sin(pi * age / life) (0 -> 1 -> 0). Force at offset r from the centre:
 *   tangential: sign * 0.07 * e * g * r_perp      g = exp(-d^2 / 2 sigma^2), ramped to 0 at the core
 *   inward:     0.025 * e * g * (-r_hat)           pulls water into a spiral
 * Particles that reach the core are drained (see `absorbs`) and re-enter upstream.
 */
export function createWhirlpools(count = 5): Whirlpools {
  const out: Vec = [0, 0];
  const slots: Slot[] = [];
  const markers: Marker[] = [];
  let lastT = -1;
  let s = 1;
  let target = count;

  function respawn(sl: Slot, w: number, h: number, stagger: boolean) {
    sl.x = w * (0.08 + 0.84 * Math.random());
    sl.y = h * (0.14 + 0.72 * Math.random());
    sl.life = 9 + Math.random() * 10; // seconds
    sl.age = stagger ? Math.random() * sl.life : 0;
    sl.sign = Math.random() < 0.5 ? 1 : -1;
    sl.r = 100 + Math.random() * 70;
  }

  return {
    name: "whirlpools",
    enabled: true,
    markers,
    update(t, w, h) {
      s = sizeScale(w, h);
      while (slots.length < target) {
        const sl: Slot = { x: 0, y: 0, age: 0, life: 1, sign: 1, r: 150, e: 0 };
        respawn(sl, w, h, true);
        slots.push(sl);
        markers.push({ x: -9999, y: 0, r: 0, color: "rgba(120,255,190,0.8)", label: "whirlpool" });
      }
      while (slots.length > target) {
        slots.pop();
        markers.pop();
      }
      const dt = lastT < 0 ? 0 : Math.max(0, t - lastT);
      lastT = t;
      for (let i = 0; i < slots.length; i++) {
        const sl = slots[i];
        sl.age += dt;
        sl.x += dt * 60 * 0.3 * s; // drift downstream
        if (sl.age >= sl.life || sl.x > w + sl.r) respawn(sl, w, h, false);
        sl.e = Math.sin((Math.PI * sl.age) / sl.life);
        const m = markers[i];
        m.x = sl.e > 0.08 ? sl.x : -9999;
        m.y = sl.y;
        m.r = sl.r * s;
        m.label = sl.sign > 0 ? "whirlpool cw" : "whirlpool ccw";
      }
    },
    force(x, y) {
      out[0] = 0;
      out[1] = 0;
      for (let i = 0; i < slots.length; i++) {
        const sl = slots[i];
        if (sl.e < 0.01) continue;
        const sg = sl.r * s * 0.55;
        const dx = x - sl.x;
        const dy = y - sl.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > 9 * sg * sg) continue; // beyond 3 sigma
        const g = Math.exp(-d2 / (2 * sg * sg));
        const d = Math.sqrt(d2) + 1e-3;
        const ramp = d / (d + 0.2 * sg); // zero spin exactly at the core
        const tang = sl.sign * 0.11 * sl.e * g * ramp;
        const inward = 0.06 * sl.e * g;
        out[0] += (-dy / d) * tang - (dx / d) * inward;
        out[1] += (dx / d) * tang - (dy / d) * inward;
      }
      return out;
    },
    absorbs(x, y) {
      for (let i = 0; i < slots.length; i++) {
        const sl = slots[i];
        if (sl.e < 0.25) continue;
        const rr = 0.05 * sl.r * s;
        const dx = x - sl.x;
        const dy = y - sl.y;
        if (dx * dx + dy * dy < rr * rr) return true;
      }
      return false;
    },
    setCount(n) {
      target = Math.max(0, Math.round(n));
    },
    active() {
      let n = 0;
      for (let i = 0; i < slots.length; i++) if (slots[i].e > 0.08) n++;
      return n;
    },
  };
}

// ---------------------------------------------------------------- 3. Cursor (stirring the water)

export type CursorField = Field & {
  setPointer(x: number, y: number, active: boolean, vx: number, vy: number): void;
};

/**
 * Within `radius` px of the pointer: a vortex, a gentle outward push, and a drag along the
 * pointer's own velocity, like dragging a hand through water. Falloff is (1 - d/R)^2.
 */
export function createCursorField(radius = 150): CursorField {
  const out: Vec = [0, 0];
  const marker: Marker = { x: -9999, y: -9999, r: radius, color: "rgba(255,255,255,0.6)", label: "cursor" };
  let active = false;
  let pvx = 0;
  let pvy = 0;
  return {
    name: "cursor",
    enabled: true,
    markers: [marker],
    setPointer(x, y, a, vx, vy) {
      marker.x = x;
      marker.y = y;
      active = a;
      pvx = Math.max(-12, Math.min(12, vx));
      pvy = Math.max(-12, Math.min(12, vy));
    },
    update() {},
    force(x, y) {
      out[0] = 0;
      out[1] = 0;
      if (!active) return out;
      const dx = x - marker.x;
      const dy = y - marker.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= radius || d < 1e-3) return out;
      const f = (1 - d / radius) * (1 - d / radius);
      const ux = dx / d;
      const uy = dy / d;
      out[0] = (-uy * 0.08 + ux * 0.03 + pvx * 0.01) * f;
      out[1] = (ux * 0.08 + uy * 0.03 + pvy * 0.01) * f;
      return out;
    },
  };
}

// ---------------------------------------------------------------- Composition

export type FieldSet = { fields: Field[]; cursor: CursorField; whirlpools: Whirlpools };

/** River current, 4 random whirlpools, cursor. */
export function createFieldSet(): FieldSet {
  const cursor = createCursorField();
  const whirlpools = createWhirlpools(4);
  const fields: Field[] = [
    createRiver(),
    whirlpools,
    cursor,
  ];
  return { fields, cursor, whirlpools };
}

/** Sum all enabled fields at (x, y) into `out`. No allocation. */
export function sumForces(fields: Field[], x: number, y: number, t: number, out: Vec): void {
  out[0] = 0;
  out[1] = 0;
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    if (!f.enabled) continue;
    const v = f.force(x, y, t);
    out[0] += v[0];
    out[1] += v[1];
  }
}
