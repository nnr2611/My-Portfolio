// Ink particles: a fixed-size ring buffer (oldest culled first) so nothing is allocated per frame.

export const INK_CAP = 900;
export const INK_LIFE = 100; // frames

export type InkPool = {
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  age: Float32Array; // frames lived; >= INK_LIFE means dead
  hue: Float32Array; // 0..1 position within the active palette
  head: number; // next slot to write
};

export function createInkPool(): InkPool {
  const age = new Float32Array(INK_CAP);
  age.fill(INK_LIFE); // all dead
  return {
    x: new Float32Array(INK_CAP),
    y: new Float32Array(INK_CAP),
    vx: new Float32Array(INK_CAP),
    vy: new Float32Array(INK_CAP),
    age,
    hue: new Float32Array(INK_CAP),
    head: 0,
  };
}

/** Spawn one ink particle; overwrites the oldest slot when full. */
export function spawnInk(
  p: InkPool,
  x: number,
  y: number,
  cursorVx: number,
  cursorVy: number,
  hue: number,
): void {
  const i = p.head;
  p.head = (i + 1) % INK_CAP;
  p.x[i] = x + (Math.random() - 0.5) * 6;
  p.y[i] = y + (Math.random() - 0.5) * 6;
  // initial velocity = 25% of cursor velocity + small jitter
  p.vx[i] = cursorVx * 0.25 + (Math.random() - 0.5) * 0.8;
  p.vy[i] = cursorVy * 0.25 + (Math.random() - 0.5) * 0.8;
  p.age[i] = 0;
  p.hue[i] = hue;
}

export function clearInk(p: InkPool): void {
  p.age.fill(INK_LIFE);
}
