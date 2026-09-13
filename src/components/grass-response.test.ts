import { describe, expect, it } from "vitest";
import { createGrassResponse, type GrassContact } from "./grass-response";
import { YARD } from "./yard-layout";
import { createPlayBall, createPlaygroundWorld } from "./play-ball";

const sample = (
  x: number,
  overrides: Partial<GrassContact> = {},
): GrassContact => ({
  id: "ball",
  x,
  z: 0,
  vx: 2,
  vz: 0,
  radius: 0.3,
  grounded: true,
  ...overrides,
});
const peak = (data: Uint8Array) =>
  Math.max(...data.filter((_, i) => i % 4 === 2));
function cell(field: ReturnType<typeof createGrassResponse>, x: number, z = 0) {
  const ix = Math.floor(
    ((x + YARD.radiusX) / (2 * YARD.radiusX)) * field.width,
  );
  const iz = Math.floor(
    ((z + YARD.radiusZ) / (2 * YARD.radiusZ)) * field.height,
  );
  return field.data.slice(
    (iz * field.width + ix) * 4,
    (iz * field.width + ix) * 4 + 3,
  );
}

describe("grass contact response", () => {
  it("responds to actual Cannon floor contact during a rolling ball", () => {
    const world = createPlaygroundWorld();
    const ball = createPlayBall({ x: 0, z: 2 }, world);
    const field = createGrassResponse();
    ball.launch(3, 0, 0);
    let maximum = 0;
    for (let i = 0; i < 60; i++) {
      ball.step(1 / 60);
      const grounded = world.world.contacts.some(
        (contact) =>
          (contact.bi === ball.body && contact.bj === world.floor) ||
          (contact.bj === ball.body && contact.bi === world.floor),
      );
      field.update(1 / 60, [
        sample(ball.body.position.x, {
          z: ball.body.position.z,
          vx: ball.body.velocity.x,
          vz: ball.body.velocity.z,
          grounded,
        }),
      ]);
      maximum = Math.max(maximum, peak(field.data));
    }
    expect(ball.body.position.x).toBeGreaterThan(0.5);
    expect(maximum).toBeGreaterThan(70);
  });
  it("lays a continuous direction field under a ground movement", () => {
    const field = createGrassResponse();
    field.update(1 / 60, [sample(-0.5)]);
    field.update(1 / 60, [sample(0.5)]);
    const middle = cell(field, 0);
    expect(middle[2]).toBeGreaterThan(70);
    expect(middle[0]).toBeGreaterThan(128);
    expect(middle[1]).toBe(128);
    expect(cell(field, 0, 1)[2]).toBe(0);
    field.reset();
    field.update(1 / 60, [sample(0.5, { vx: -2 })]);
    field.update(1 / 60, [sample(-0.5, { vx: -2 })]);
    expect(cell(field, 0)[0]).toBeLessThan(128);
  });

  it("does not draw airborne arcs or bridge a landing to its launch", () => {
    const field = createGrassResponse();
    field.update(1 / 60, [sample(-0.5, { grounded: false })]);
    field.update(1 / 60, [sample(0.5, { grounded: false })]);
    expect(peak(field.data)).toBe(0);
    field.update(1 / 60, [sample(0.5)]);
    expect(cell(field, 0.5)[2]).toBeGreaterThan(0);
    expect(cell(field, -0.25)[2]).toBe(0);
  });

  it("recovers fully while stationary without keeping the render loop dirty", () => {
    const field = createGrassResponse();
    field.update(1 / 60, [sample(0)]);
    const initial = peak(field.data);
    field.update(0.5, [sample(0, { vx: 0 })]);
    expect(peak(field.data)).toBeLessThan(initial);
    for (let i = 0; i < 180; i++) field.update(1 / 30, [sample(0, { vx: 0 })]);
    expect(peak(field.data)).toBe(0);
    expect(field.update(1 / 30, [sample(0, { vx: 0 })])).toBe(false);
  });

  it("clears reset history and does not paint teleport paths", () => {
    const field = createGrassResponse();
    field.update(1 / 60, [sample(-3)]);
    field.update(1 / 60, [sample(3)]);
    expect(cell(field, 0)[2]).toBe(0);
    field.reset();
    expect(peak(field.data)).toBe(0);
    expect(field.update(1 / 30, [sample(0, { vx: 0 })])).toBe(false);
  });

  it("uses wider contact areas for broad toys", () => {
    const ball = createGrassResponse(),
      disc = createGrassResponse();
    ball.update(1 / 60, [sample(0, { radius: 0.24 })]);
    disc.update(1 / 60, [sample(0, { id: "disc", radius: 0.48 })]);
    const count = (data: Uint8Array) =>
      data.filter((value, i) => i % 4 === 2 && value > 0).length;
    expect(count(disc.data)).toBeGreaterThan(count(ball.data));
  });
});
