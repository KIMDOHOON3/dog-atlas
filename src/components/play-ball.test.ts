import { describe, it, expect } from "vitest";
import { createPlayBall, BALL_RADIUS, throwVelocity } from "./play-ball";
describe("playground ball", () => {
  it("interpolates between physics steps and resets the display pose on grab", () => {
    const p = createPlayBall();
    p.launch(3, 0, 3);
    p.step(1 / 60);
    const before = p.body.interpolatedPosition.x;
    const physical = p.body.position.x;
    p.step(1 / 120);
    expect(p.body.position.x).toBe(physical);
    expect(p.body.interpolatedPosition.x).toBeGreaterThan(before);
    p.hold(1, 1, 1.2);
    expect(p.body.interpolatedPosition.y).toBe(1.2);
    p.cancel();
    expect(p.body.interpolatedPosition.y).toBe(BALL_RADIUS);
  });
  it("rolls a slow gesture and gives a fast or lifted throw more height", () => {
    const slow = throwVelocity(0.8, 0, 0);
    const fast = throwVelocity(6, 0, 0);
    expect(slow.y).toBe(0);
    expect(fast.y).toBeGreaterThan(slow.y);
    expect(throwVelocity(6, 0, 1).y).toBeGreaterThan(fast.y);
    const p = createPlayBall();
    p.launch(slow.x, slow.z, slow.y);
    for (let i = 0; i < 30; i++) {
      p.step(1 / 60);
      expect(p.body.position.y).toBeLessThan(BALL_RADIUS + 0.03);
    }
  });
  it("preserves the airborne catch position and allows another throw", () => {
    const p = createPlayBall();
    p.launch(2, 0, 5);
    for (let i = 0; i < 12; i++) p.step(1 / 60);
    const { x, y, z } = p.body.position;
    expect(y).toBeGreaterThan(0.7);
    p.hold(x, z);
    p.step(1 / 60);
    expect(p.body.position.y).toBeCloseTo(y);
    expect(p.body.velocity.length()).toBe(0);
    p.launch(-3, 0, 2);
    p.step(1 / 60);
    expect(p.body.position.x).toBeLessThan(x);
  });
  it("caps diagonal fling speed and height", () => {
    const v = throwVelocity(100, -100, 100);
    expect(Math.hypot(v.x, v.z)).toBeCloseTo(8);
    expect(v.y).toBe(5.5);
  });
  it("bounces on turf and settles without escaping the field", () => {
    const p = createPlayBall();
    p.setWidth(2);
    p.launch(5, -4);
    let falling = false,
      bounced = false;
    for (let i = 0; i < 900; i++) {
      const before = p.body.velocity.y;
      p.step(1 / 60);
      if (before < -0.5) falling = true;
      if (falling && p.body.velocity.y > 0.5) bounced = true;
      expect(Math.abs(p.body.position.x)).toBeLessThanOrEqual(2);
      expect(
        Math.hypot(p.body.position.x / 2, p.body.position.z / 2.65),
      ).toBeLessThanOrEqual(1.000001);
    }
    expect(bounced).toBe(true);
    expect(p.body.position.y).toBeCloseTo(BALL_RADIUS, 2);
    expect(p.body.velocity.length()).toBeLessThan(0.15);
  });
  it("cancels a held ball without throwing", () => {
    const p = createPlayBall();
    p.hold(100, 100);
    p.cancel();
    p.step(1 / 30);
    expect(p.body.position.y).toBeCloseTo(BALL_RADIUS);
    expect(p.body.velocity.length()).toBe(0);
  });
});
