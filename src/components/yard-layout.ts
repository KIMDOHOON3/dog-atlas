/** The ball stays inset from the miniature's rounded platform edges. */
export const YARD = {
  halfWidth: 7,
  halfDepth: 5,
  centerX: -1,
  centerZ: -0.5,
  ballX: 5.4,
  ballZ: 3.6,
};
export const YARD_OBSTACLES = [
  { x: -4.4, z: -3.4, width: 2.7, depth: 1.15, height: 1.3 },
  { x: -1.7, z: -4.0, width: 2.05, depth: 1.05, height: 0.4 },
  { x: -4.7, z: -1.9, width: 1.12, depth: 1.12, height: 0.14 },
  { x: -2.8, z: -2.65, width: 1.35, depth: 0.6, height: 0.28 },
] as const;
