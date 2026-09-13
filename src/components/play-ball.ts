import {
  Body,
  Box,
  ContactMaterial,
  Cylinder,
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
export type PlayItemKind = "ball" | "bone" | "disc" | "tug";
export function createPlaygroundWorld() {
  const world = new World({ gravity: new Vec3(0, -9.82, 0), allowSleep: true });
  const turf = new Material("ground");
  const floor = new Body({ mass: 0, shape: new Plane(), material: turf });
  floor.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(floor);
  for (const object of YARD_OBSTACLES) {
    const obstacle = new Body({
      mass: 0,
      shape: new Box(
        new Vec3(object.width / 2, object.height / 2, object.depth / 2),
      ),
      material: turf,
    });
    obstacle.position.set(object.x, object.y ?? object.height / 2, object.z);
    world.addBody(obstacle);
  }
  return { world, turf };
}
export function createPlayBall(
  options: { kind?: PlayItemKind; x?: number; z?: number } = {},
  environment = createPlaygroundWorld(),
) {
  const { world, turf } = environment;
  const kind = options.kind ?? "ball";
  const restHeight =
    kind === "ball"
      ? BALL_RADIUS
      : kind === "bone"
        ? 0.145
        : kind === "disc"
          ? 0.08
          : 0.09;
  const rubber = new Material(kind);
  world.addContactMaterial(
    new ContactMaterial(turf, rubber, {
      friction: kind === "ball" ? 0.5 : kind === "disc" ? 0.36 : 0.65,
      restitution: kind === "ball" ? 0.62 : kind === "bone" ? 0.35 : 0.18,
    }),
  );
  const body = new Body({
    mass: kind === "tug" ? 0.55 : kind === "disc" ? 0.18 : 0.35,
    material: rubber,
    linearDamping: kind === "disc" ? 0.28 : 0.48,
    angularDamping: kind === "disc" ? 0.28 : 0.6,
    allowSleep: true,
    sleepSpeedLimit: 0.15,
    sleepTimeLimit: 0.7,
  });
  if (kind === "ball") body.addShape(new Sphere(BALL_RADIUS));
  else if (kind === "disc") body.addShape(new Cylinder(0.55, 0.55, 0.13, 24));
  else if (kind === "bone") {
    body.addShape(new Box(new Vec3(0.45, 0.12, 0.12)));
    for (const x of [-0.46, 0.46])
      body.addShape(new Sphere(0.145), new Vec3(x, 0, 0));
  } else {
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      body.addShape(
        new Sphere(0.065),
        new Vec3(0.4 * Math.cos(angle), 0, 0.22 * Math.sin(angle)),
      );
    }
  }
  body.position.set(options.x ?? 0.7, restHeight, options.z ?? 1);
  const syncPose = () => {
    body.previousPosition.copy(body.position);
    body.interpolatedPosition.copy(body.position);
    body.previousQuaternion.copy(body.quaternion);
    body.interpolatedQuaternion.copy(body.quaternion);
  };
  syncPose();
  world.addBody(body);
  body.sleep();
  const edgePadding = kind === "ball" ? 0 : kind === "bone" ? 0.4 : 0.25;
  let halfWidth = YARD.ballX - edgePadding;
  const depth = YARD.ballZ - edgePadding;
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
    restHeight,
    kind,
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
        Math.max(restHeight, Math.min(Math.max(3, body.position.y), y)),
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
      if (kind === "disc") body.angularVelocity.set(0.25, 12, -0.4);
      else
        body.angularVelocity.set(
          z / (kind === "ball" ? BALL_RADIUS : 0.65),
          0.3,
          -x / (kind === "ball" ? BALL_RADIUS : 0.65),
        );
      body.wakeUp();
    },
    cancel() {
      body.type = Body.DYNAMIC;
      body.updateMassProperties();
      body.position.y = restHeight;
      if (kind !== "ball") body.quaternion.set(0, 0, 0, 1);
      body.velocity.setZero();
      body.angularVelocity.setZero();
      body.sleep();
      syncPose();
    },
    step(dt: number, advanceWorld = true) {
      if (advanceWorld) world.step(1 / 60, Math.min(dt, 0.05), 3);
      if (body.type !== Body.DYNAMIC) return;
      contain(true);
      contain(false, body.interpolatedPosition);
    },
  };
}
