import { expect, it } from "vitest";
import { createYardSpitz } from "./yard-spitz";

it("approaches a thrown ball, slows down nearby and stays inside the yard", () => {
  const dog = createYardSpitz();
  const ball = { x: 3, z: 1 };
  const initial = Math.hypot(
    dog.root.position.x - ball.x,
    dog.root.position.z - ball.z,
  );
  dog.chaseBall();
  for (let i = 0; i < 150; i++) dog.update(1 / 30, ball);
  const distance = Math.hypot(
    dog.root.position.x - ball.x,
    dog.root.position.z - ball.z,
  );
  expect(distance).toBeLessThan(initial);
  expect(distance).toBeGreaterThan(0.65);
  const before = dog.root.position.clone();
  for (let i = 0; i < 30; i++) dog.update(1 / 30, ball);
  expect(dog.root.position.distanceTo(before)).toBeLessThan(0.05);
  for (const target of [
    { x: 100, z: 100 },
    { x: -4, z: -2 },
  ]) {
    dog.chaseBall();
    for (let i = 0; i < 600; i++) {
      dog.update(1 / 30, target);
      expect(
        Math.hypot(dog.root.position.x / 4.75, dog.root.position.z / 2.05),
      ).toBeLessThanOrEqual(1.00001);
      expect(dog.root.position.x < -1 && dog.root.position.z < -0.60001).toBe(
        false,
      );
    }
  }
  dog.dispose();
});
