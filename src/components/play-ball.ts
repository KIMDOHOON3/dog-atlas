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
    hold(x: number, z: number) {
      body.type = Body.KINEMATIC;
      body.velocity.setZero();
      body.angularVelocity.setZero();
      body.position.set(x, 0.65, z);
      contain(false);
      body.wakeUp();
    },
    launch(x: number, z: number) {
      body.type = Body.DYNAMIC;
      body.updateMassProperties();
      body.velocity.set(
        Math.max(-6, Math.min(6, x)),
        3.5,
        Math.max(-5, Math.min(5, z)),
      );
      body.angularVelocity.set(z * 1.5, 1, -x * 1.5);
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
