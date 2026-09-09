import { describe, expect, it } from "vitest";
import { createSpitzFollow } from "./spitz-follow";
describe("Spitz follows the ball", () => {
  it("approaches and settles without covering the ball", () => {
    const dog = createSpitzFollow();
    for (let i = 0; i < 600; i++) dog.step(1 / 30, { x: 3, z: 1 });
    expect(Math.hypot(dog.state.x - 3, dog.state.z - 1)).toBeCloseTo(0.9, 1);
    expect(dog.state.speed).toBeLessThan(0.01);
  });
  it("stays on the yard and approaches the front of the bench", () => {
    const dog = createSpitzFollow();
    for (const target of [
      { x: -3, z: -2 },
      { x: 8, z: 8 },
      { x: -8, z: 8 },
      { x: 4, z: -8 },
    ]) {
      for (let i = 0; i < 300; i++) {
        const s = dog.step(1 / 30, target);
        expect(Math.hypot(s.x / 4.8, s.z / 1.85)).toBeLessThanOrEqual(1.001);
        expect(s.x < -0.6 && s.z < -0.251).toBe(false);
      }
    }
  });
});
