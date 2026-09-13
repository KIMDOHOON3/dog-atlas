import {
  Body,
  Box,
  ContactMaterial,
  Material,
  Plane,
  Sphere,
  Vec3,
  World,
} from "cannon-es";
import { YARD, YARD_OBSTACLES } from "./yard-layout";
export const BALL_RADIUS = 0.32;
export type ViewBoundary = {
  x: number;
  y: number;
  z: number;
  constant: number;
};
export function throwVelocity(x: number, z: number, lift: number) {
  const speed = Math.hypot(x, z);
  const scale = speed > 8 ? 8 / speed : 1;
  return {
    x: x * scale,
    z: z * scale,
    y: Math.min(5.5, Math.max(0, speed - 1.5) * 0.38 + Math.max(0, lift) * 2.8),
  };
}
export function createPlayBall() {
  const world = new World({ gravity: new Vec3(0, -9.82, 0), allowSleep: true });
  const turf = new Material("turf"),
    rubber = new Material("rubber");
  world.addContactMaterial(
    new ContactMaterial(turf, rubber, { friction: 0.5, restitution: 0.62 }),
  );
  const floor = new Body({ mass: 0, shape: new Plane(), material: turf });
  floor.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(floor);
  const body = new Body({
    mass: 0.35,
    shape: new Sphere(BALL_RADIUS),
    material: rubber,
    linearDamping: 0.48,
    angularDamping: 0.55,
    allowSleep: true,
    sleepSpeedLimit: 0.15,
    sleepTimeLimit: 0.7,
  });
  body.position.set(0.7, BALL_RADIUS, 1);
  const syncPose = () => {
    body.previousPosition.copy(body.position);
    body.interpolatedPosition.copy(body.position);
    body.previousQuaternion.copy(body.quaternion);
    body.interpolatedQuaternion.copy(body.quaternion);
  };
  syncPose();
  world.addBody(body);
  body.sleep();
  for (const object of YARD_OBSTACLES) {
    const obstacle = new Body({
      mass: 0,
      shape: new Box(
        new Vec3(object.width / 2, object.height / 2, object.depth / 2),
      ),
      material: turf,
    });
    obstacle.position.set(object.x, object.height / 2, object.z);
    world.addBody(obstacle);
  }
  let halfWidth = YARD.ballX;
  const depth = YARD.ballZ;
  const worldBounds = [
    { x: 1, y: 0, z: 0, constant: halfWidth },
    { x: -1, y: 0, z: 0, constant: halfWidth },
    { x: 0, y: 0, z: 1, constant: depth },
    { x: 0, y: 0, z: -1, constant: depth },
  ];
  let bounds: ViewBoundary[] = worldBounds;
  const contain = (bounce: boolean, position = body.position) => {
    // Clip horizontally at the current height; airborne balls remain catchable.
    for (let pass = 0; pass < 8; pass++) {
      const radius = Math.hypot(position.x / halfWidth, position.z / depth);
      if (radius > 1) {
        position.x /= radius;
        position.z /= radius;
        const nx = position.x / (halfWidth * halfWidth);
        const nz = position.z / (depth * depth);
        const length = Math.hypot(nx, nz);
        const ux = nx / length,
          uz = nz / length;
        const outward = body.velocity.x * ux + body.velocity.z * uz;
        if (bounce && outward > 0) {
          body.velocity.x -= 1.55 * outward * ux;
          body.velocity.z -= 1.55 * outward * uz;
        }
      }
      for (const plane of bounds) {
        const d =
          plane.x * position.x +
          plane.y * position.y +
          plane.z * position.z +
          plane.constant;
        const lengthSquared = plane.x ** 2 + plane.z ** 2;
        if (d >= 0 || lengthSquared < 1e-8) continue;
        position.x -= (d * plane.x) / lengthSquared;
        position.z -= (d * plane.z) / lengthSquared;
        const outward = body.velocity.x * plane.x + body.velocity.z * plane.z;
        if (bounce && outward < 0) {
          body.velocity.x -= (1.55 * outward * plane.x) / lengthSquared;
          body.velocity.z -= (1.55 * outward * plane.z) / lengthSquared;
        }
      }
    }
  };
  return {
    body,
    setViewBounds(viewBounds: ViewBoundary[]) {
      bounds = [...worldBounds, ...viewBounds];
      contain(false);
      syncPose();
    },
    setWidth(width: number) {
      halfWidth = Math.max(1, width);
      worldBounds[0].constant = worldBounds[1].constant = halfWidth;
      contain(false);
      syncPose();
    },
    hold(x: number, z: number, y = body.position.y) {
      body.type = Body.KINEMATIC;
      body.updateMassProperties();
      body.velocity.setZero();
      body.angularVelocity.setZero();
      // Keep an airborne catch at its current height, even above the drag limit.
      body.position.set(
        x,
        Math.max(BALL_RADIUS, Math.min(Math.max(3, body.position.y), y)),
        z,
      );
      contain(false);
      syncPose();
      body.wakeUp();
    },
    launch(x: number, z: number, y = 3.5) {
      body.type = Body.DYNAMIC;
      body.updateMassProperties();
      body.velocity.set(
        Math.max(-8, Math.min(8, x)),
        Math.max(0, Math.min(5.5, y)),
        Math.max(-8, Math.min(8, z)),
      );
      body.angularVelocity.set(z / BALL_RADIUS, 0.3, -x / BALL_RADIUS);
      body.wakeUp();
    },
    cancel() {
      body.type = Body.DYNAMIC;
      body.updateMassProperties();
      body.position.y = BALL_RADIUS;
      body.velocity.setZero();
      body.angularVelocity.setZero();
      body.sleep();
      syncPose();
    },
    step(dt: number) {
      world.step(1 / 60, Math.min(dt, 0.05), 3);
      if (body.type !== Body.DYNAMIC) return;
      contain(true);
      contain(false, body.interpolatedPosition);
    },
  };
}
