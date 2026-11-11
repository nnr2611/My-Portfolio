"use client";

import { useRef } from "react";
import { MAX_PARTICLES, MIN_PARTICLES, PARTICLES_EVENT } from "./events";

/**
 * Number box for the particle count. HeroCanvas fills in the starting value (via data-readout)
 * and listens for the event; the flow field adapts to the new density.
 */
export default function ParticleInput() {
  const ref = useRef<HTMLInputElement>(null);
  const timer = useRef(0);

  function send() {
    const el = ref.current;
    if (!el) return;
    const n = Number(el.value);
    if (!Number.isFinite(n) || el.value === "") return;
    window.dispatchEvent(new CustomEvent(PARTICLES_EVENT, { detail: n }));
  }

  function onChange() {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(send, 400); // wait until typing pauses
  }

  function clampOnBlur() {
    const el = ref.current;
    if (!el || el.value === "") return;
    el.value = String(Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, Math.round(Number(el.value)))));
    send();
  }

  return (
    <input
      ref={ref}
      type="number"
      inputMode="numeric"
      min={MIN_PARTICLES}
      max={MAX_PARTICLES}
      step={100}
      defaultValue=""
      placeholder="--"
      data-readout="count"
      aria-label={`Particle count (${MIN_PARTICLES} to ${MAX_PARTICLES})`}
      onChange={onChange}
      onBlur={clampOnBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") clampOnBlur();
      }}
      className="pointer-events-auto mt-0.5 w-24 rounded-md border border-white/20 bg-white/5 px-2 py-0.5 text-foreground/90 outline-none focus:border-accent/70"
    />
  );
}
