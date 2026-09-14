/** Shared world-space dimensions for the lawn, ball bounds and furniture. */
export const YARD = { radiusX: 9.2, radiusZ: 6.1, ballX: 8.85, ballZ: 5.75 };
export const YARD_TOYS = [
  { id: "tug", label: "터그", x: -5.6, z: 1.5 },
  { id: "disc", label: "원반", x: -3.5, z: 3.6 },
  { id: "bone", label: "뼈다귀", x: 4, z: 3.3 },
] as const;
export const YARD_OBSTACLES: ReadonlyArray<{
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  y?: number;
}> = [
  { x: 0, z: -4.85, width: 6.2, depth: 0.12, height: 1.16 },
  { x: 3.15, z: -3.1, width: 1.5, depth: 1.5, height: 0.09, y: 0.965 },
  { x: 3.15, z: -3.1, width: 0.15, depth: 0.15, height: 2.8 },
  ...[2.03, 4.27].map((x) => ({
    x,
    z: -2.9,
    width: 0.65,
    depth: 0.65,
    height: 1.08,
  })),
  { x: 0, z: 2.9, width: 3.18, depth: 0.25, height: 0.94, y: 1.52 },
  ...[-1.008, 1.008].map((x) => ({
    x,
    z: 2.84,
    width: 0.16,
    depth: 0.15,
    height: 1.6,
  })),
  { x: -4.4, z: -3.4, width: 2.7, depth: 1.15, height: 1.3 },
  { x: -1.7, z: -4.0, width: 2.05, depth: 1.05, height: 0.4 },
];
