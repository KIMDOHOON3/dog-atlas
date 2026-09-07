import { describe, it, expect } from "vitest";
import { createPlayBall, BALL_RADIUS } from "./play-ball";
describe("playground ball", () => {
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
