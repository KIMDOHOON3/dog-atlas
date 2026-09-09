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
export const BALL_RADIUS = 0.32;
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
  world.addBody(body);
  body.sleep();
  const bench = new Body({
    mass: 0,
    shape: new Box(new Vec3(1.25, 0.5, 0.48)),
    material: turf,
  });
  bench.position.set(-2.5, 0.5, -1.5);
  world.addBody(bench);
  let halfWidth = 5.65;
  const depth = 2.65;
  const contain = (bounce: boolean) => {
    const x = body.position.x,
      z = body.position.z;
    const length = Math.hypot(x / halfWidth, z / depth);
    if (length <= 1) return;
    body.position.x = x / length;
    body.position.z = z / length;
    if (bounce) {
      const nx = body.position.x / (halfWidth * halfWidth),
        nz = body.position.z / (depth * depth);
      const n = Math.hypot(nx, nz),
        ux = nx / n,
        uz = nz / n;
      const outward = body.velocity.x * ux + body.velocity.z * uz;
      if (outward > 0) {
        body.velocity.x -= 1.55 * outward * ux;
        body.velocity.z -= 1.55 * outward * uz;
      }
    }
  };
  return {
    body,
    setWidth(width: number) {
      halfWidth = Math.max(1, width);
      contain(false);
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
    },
    step(dt: number) {
      world.step(1 / 60, Math.min(dt, 0.05), 3);
      if (body.type !== Body.DYNAMIC) return;
      contain(true);
    },
  };
}
