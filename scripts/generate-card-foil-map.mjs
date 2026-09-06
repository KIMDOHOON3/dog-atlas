// Build-time material data, not an alteration of the watercolor artwork.
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "public/illustrations/card-studies");
await mkdir(target, { recursive: true });
const W = 384,
  H = 528;
const variants = 4;
const pixels = Buffer.alloc(W * variants * H * 3);
const clamp = (n) => Math.max(0, Math.min(1, n));
const fract = (n) => n - Math.floor(n);
const smooth = (a, b, n) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const hash = (x, y) => fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
const placements = [
  [0.12, 0.15],
  [0.48, 0.1],
  [0.85, 0.18],
  [0.08, 0.38],
  [0.91, 0.43],
  [0.12, 0.64],
  [0.88, 0.66],
].map(([x, y], i) => [x, y, 0.056 + 0.01 * Math.sin(i * 3.7)]);
function segment(x, y, ax, ay, bx, by) {
  const vx = bx - ax,
    vy = by - ay,
    t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy));
  return Math.hypot(x - ax - vx * t, y - ay - vy * t);
}
function motif(u, v, variant) {
  let result = 0;
  for (let i = 0; i < placements.length; i++) {
    const [cx, cy, size] = placements[i];
    const angle = (hash(i + 17, variant + 3) - 0.5) * 0.7;
    const px = (u - cx) / size,
      py = ((v - cy) * 1.4) / size;
    if (Math.max(Math.abs(px), Math.abs(py)) > 1.2) continue;
    const x = px * Math.cos(angle) - py * Math.sin(angle);
    const y = px * Math.sin(angle) + py * Math.cos(angle);
    const kind = (i + variant) % 4;
    let distance;
    if (kind === 0) {
      // Bone toy: outline of the union, with no internal circle seams.
      const bar = Math.max(Math.abs(x) - 0.48, Math.abs(y) - 0.19);
      const lobes = Math.min(
        ...[-0.55, 0.55].flatMap((a) =>
          [-0.18, 0.18].map((b) => Math.hypot(x - a, y - b) - 0.25),
        ),
      );
      distance = Math.abs(Math.min(bar, lobes));
    } else if (kind === 1) {
      // Ball and two curved tennis-ball seams.
      const ring = Math.abs(Math.hypot(x, y) - 0.7);
      const seam = Math.min(
        Math.abs(Math.hypot(x - 1.02, y) - 0.88),
        Math.abs(Math.hypot(x + 1.02, y) - 0.88),
      );
      distance = Math.min(ring, Math.hypot(x, y) < 0.66 ? seam : 2);
    } else if (kind === 2) {
      // Bowl: curved rim, sloped sides and a flat base.
      distance = Math.min(
        Math.abs(Math.hypot(x / 0.78, (y + 0.18) / 0.2) - 1) * 0.2,
        segment(x, y, -0.75, -0.15, -0.53, 0.49),
        segment(x, y, 0.75, -0.15, 0.53, 0.49),
        segment(x, y, -0.53, 0.49, 0.53, 0.49),
      );
    } else {
      // Collar band with a small round identification tag.
      const ellipse = Math.hypot(x / 0.7, (y + 0.12) / 0.43);
      distance = Math.min(
        Math.abs(ellipse - 1) * 0.43,
        Math.abs(ellipse - 0.72) * 0.43,
        Math.abs(Math.hypot(x, y - 0.57) - 0.2),
        segment(x, y, 0, 0.3, 0, 0.39),
      );
    }
    result = Math.max(result, 1 - smooth(0.022, 0.07, distance));
  }
  return result;
}
for (let variant = 0; variant < variants; variant++)
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const u = (x + 0.5) / W,
        v = (y + 0.5) / H;
      const body = Math.exp(
        -(((u - 0.52) / 0.36) ** 4) - ((v - 0.51) / 0.22) ** 4,
      );
      const face = Math.exp(
        -(((u - 0.23) / 0.15) ** 2) - ((v - 0.3) / 0.13) ** 2,
      );
      const portrait = Math.max(body, face);
      const engraving = motif(u, v, variant);
      const grain = hash(Math.floor(u * 700), Math.floor(v * 980));
      const fine = 0.65 + 0.35 * Math.sin((u * 0.8 - v) * 760);
      const coating =
        (0.2 + fine * 0.8) *
        (1 - portrait * 0.72) *
        (1 - smooth(0.74, 0.82, v)) *
        (0.88 + grain * 0.12);
      const cellX = u * 150,
        cellY = v * 210,
        seed = hash(Math.floor(cellX), Math.floor(cellY));
      const fleck =
        (1 -
          smooth(
            0.03,
            0.19,
            Math.hypot(fract(cellX) - 0.5, fract(cellY) - 0.5),
          )) *
        (seed >= 0.88 ? 1 : 0);
      const at = (y * W * variants + variant * W + x) * 3;
      pixels[at] = Math.round((Math.round(clamp(engraving) * 63) / 63) * 255);
      pixels[at + 1] = Math.round((Math.round(clamp(coating) * 31) / 31) * 255);
      pixels[at + 2] = Math.round(
        (Math.round((fleck > 0.01 ? 0.6 + fleck * 0.4 : grain * 0.45) * 7) /
          7) *
          255,
      );
    }
const material = await sharp(pixels, {
  raw: { width: W * variants, height: H, channels: 3 },
})
  .png()
  .toFile(path.join(target, "dog-gear-foil-material-v1.png"));
const palette = Buffer.alloc(256 * 3);
for (let x = 0; x < 256; x++)
  for (let c = 0; c < 3; c++)
    palette[x * 3 + c] = Math.round(
      (0.55 + 0.45 * Math.cos(2 * Math.PI * (x / 256 + [0, 0.33, 0.67][c]))) *
        255,
    );
await sharp(palette, { raw: { width: 256, height: 1, channels: 3 } })
  .png()
  .toFile(path.join(target, "foil-spectrum-v1.png"));
console.log({ width: W, height: H, materialBytes: material.size });
