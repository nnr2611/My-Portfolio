// Aurora is the only palette: hues 110 (green) to 190 (cyan-teal).
const HUE_FROM = 110;
const HUE_TO = 190;

export const LUT_SIZE = 64;

/** Pre-built colour strings so the render loop never formats a colour. Index 0..LUT_SIZE-1. */
export function buildAuroraLut(alpha: number): string[] {
  const lut: string[] = [];
  for (let i = 0; i < LUT_SIZE; i++) {
    const u = i / (LUT_SIZE - 1);
    lut.push(`hsla(${(HUE_FROM + (HUE_TO - HUE_FROM) * u).toFixed(1)}, 90%, 62%, ${alpha})`);
  }
  return lut;
}
