import { describe, it, expect } from "vitest";
import {
  createPlayBall,
  createPlaygroundWorld,
  BALL_RADIUS,
  throwVelocity,
} from "./play-ball";
import { YARD, YARD_OBSTACLES } from "./yard-layout";
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
        Math.max(
          Math.abs(p.body.position.x / 2),
          Math.abs(p.body.position.z / YARD.ballZ),
        ),
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
  it("keeps diagonal throws inside the oval lawn", () => {
    const p = createPlayBall();
    p.hold(YARD.ballX - 0.1, 0);
    expect(p.body.position.x).toBe(YARD.ballX - 0.1);
    p.launch(8, 6, 0);
    for (let i = 0; i < 120; i++) {
      p.step(1 / 60);
      expect(
        Math.hypot(
          Math.abs(p.body.position.x / YARD.ballX),
          Math.abs(p.body.position.z / YARD.ballZ),
        ),
      ).toBeLessThanOrEqual(1.000001);
    }
  });
  it("rebounds from the feeding station instead of rolling through the bowls", () => {
    const p = createPlayBall();
    const station = YARD_OBSTACLES[1];
    p.hold(station.x, station.z + 1.2, BALL_RADIUS);
    p.launch(0, -4, 0);
    let rebounded = false;
    for (let i = 0; i < 30; i++) {
      p.step(1 / 60);
      if (p.body.velocity.z > 0.1) rebounded = true;
      expect(p.body.position.z).toBeGreaterThan(station.z + station.depth / 2);
    }
    expect(rebounded).toBe(true);
  });
});

// A tilted camera has sloping screen edges, including at airborne heights.
describe("camera-cropped playground", () => {
  it("keeps held, thrown and interpolated poses within the visible crop", () => {
    const p = createPlayBall();
    const bounds = [
      { x: 1, y: 0, z: -0.25, constant: 3 },
      { x: -1, y: 0, z: 0.25, constant: 3 },
      { x: 0, y: -1, z: 1, constant: 5 },
      { x: 0, y: 0, z: -1, constant: 4 },
    ];
    p.setViewBounds(bounds);
    p.hold(100, -100, 2);
    p.launch(8, -8, 5.5);
    for (let i = 0; i < 300; i++) {
      p.step(1 / 120);
      for (const pos of [p.body.position, p.body.interpolatedPosition]) {
        for (const b of bounds) {
          expect(
            b.x * pos.x + b.y * pos.y + b.z * pos.z + b.constant,
          ).toBeGreaterThanOrEqual(-0.0001);
        }
      }
    }
  });
  it("repositions a sleeping ball immediately when the viewport narrows", () => {
    const p = createPlayBall();
    p.hold(6, 0);
    p.cancel();
    p.setViewBounds([{ x: -1, y: 0, z: 0, constant: 2 }]);
    expect(p.body.position.x).toBe(2);
    expect(p.body.interpolatedPosition.x).toBe(2);
  });
});

describe("throwable playground toys", () => {
  it.each(["bone", "disc", "tug"] as const)(
    "throws, settles and cancels the %s at its own resting height",
    (kind) => {
      const p = createPlayBall({ kind, x: 0, z: 3 });
      p.launch(4, 2, 3);
      let highest = 0;
      for (let i = 0; i < 900; i++) {
        p.step(1 / 60);
        highest = Math.max(highest, p.body.position.y);
        expect(Number.isFinite(p.body.position.y)).toBe(true);
        expect(
          Math.hypot(
            p.body.position.x / YARD.ballX,
            p.body.position.z / YARD.ballZ,
          ),
        ).toBeLessThanOrEqual(1.0001);
      }
      expect(highest).toBeGreaterThan(0.3);
      expect(p.body.velocity.length()).toBeLessThan(0.15);
      p.hold(1, 2, 2);
      p.cancel();
      expect(p.body.position.y).toBe(p.restHeight);
      expect(p.body.interpolatedPosition.y).toBe(p.restHeight);
      expect(p.body.quaternion.w).toBe(1);
    },
  );
  it("spins the disc around its face and collides with another item in the shared world", () => {
    const environment = createPlaygroundWorld();
    const disc = createPlayBall({ kind: "disc", x: 0, z: 3 }, environment);
    disc.launch(0, 0, 1);
    expect(disc.body.angularVelocity.y).toBe(12);
    disc.cancel();
    const ball = createPlayBall({ x: -2, z: 3 }, environment);
    ball.launch(5, 0, 0);
    let collided = false;
    for (let i = 0; i < 90; i++) {
      environment.world.step(1 / 60);
      collided ||= environment.world.contacts.some(
        (c) =>
          (c.bi === ball.body && c.bj === disc.body) ||
          (c.bi === disc.body && c.bj === ball.body),
      );
      ball.step(1 / 60, false);
      disc.step(1 / 60, false);
    }
    expect(collided).toBe(true);
    expect(disc.body.position.x).toBeGreaterThan(0.01);
  });
});
