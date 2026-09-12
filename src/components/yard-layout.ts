/** Shared world-space dimensions for the lawn, ball bounds and furniture. */
export const YARD = { radiusX: 8, radiusZ: 4.3, ballX: 7.65, ballZ: 3.95 };
export const YARD_OBSTACLES = [
  { x: -3.9, z: -2.25, width: 2.7, depth: 1.15, height: 1.3 },
  { x: 4.05, z: -1.8, width: 2.05, depth: 1.05, height: 0.4 },
  { x: -3.5, z: 1.6, width: 1.12, depth: 1.12, height: 0.12 },
  { x: 3.15, z: 1.5, width: 1.35, depth: 0.6, height: 0.24 },
] as const;

export function hitsYardObject(
  x: number,
  y: number,
  z: number,
  radius: number,
) {
  return YARD_OBSTACLES.some(
    (o) =>
      Math.abs(x - o.x) < o.width / 2 + radius &&
      Math.abs(z - o.z) < o.depth / 2 + radius &&
      y < o.height + radius,
  );
}
