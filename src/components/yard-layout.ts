/** Shared world-space dimensions for the lawn, ball bounds and furniture. */
export const YARD = { radiusX: 9.2, radiusZ: 6.1, ballX: 8.85, ballZ: 5.75 };
export const YARD_TOYS = [
  { id: "tug", label: "터그", x: -5.6, z: 1.5 },
  { id: "disc", label: "원반", x: -2, z: 3 },
  { id: "bone", label: "뼈다귀", x: 2, z: 2.5 },
] as const;
export const YARD_OBSTACLES: ReadonlyArray<{
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  y?: number;
}> = [
  { x: -4.4, z: -3.4, width: 2.7, depth: 1.15, height: 1.3 },
  { x: -1.7, z: -4.0, width: 2.05, depth: 1.05, height: 0.4 },
  // Hurdle posts and crossbar, leaving room underneath.
  { x: -1.7, z: -1.2, width: 0.16, depth: 0.5, height: 1.45 },
  { x: 0.7, z: -1.2, width: 0.16, depth: 0.5, height: 1.45 },
  { x: -0.5, z: -1.2, width: 2.4, depth: 0.14, height: 0.14, y: 0.9 },
  // Tunnel sides and roof keep the entrance open for thrown toys.
  { x: 2, z: -3.2, width: 0.24, depth: 2.4, height: 1.25 },
  { x: 4, z: -3.2, width: 0.24, depth: 2.4, height: 1.25 },
  { x: 3, z: -3.2, width: 1.8, depth: 2.4, height: 0.3, y: 1.7 },
  ...[0, 1, 2].map((i) => ({
    x: 5.5 + i * 0.3,
    z: -2.6 + i * 1.1,
    width: 0.16,
    depth: 0.16,
    height: 1.25,
  })),
];
