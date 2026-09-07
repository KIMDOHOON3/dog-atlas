import {
  Body,
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
  let halfWidth = 5;
  return {
    body,
    setWidth(width: number) {
      halfWidth = Math.max(1, width);
      body.position.x = Math.max(
        -halfWidth,
        Math.min(halfWidth, body.position.x),
      );
    },
    hold(x: number, z: number) {
      body.type = Body.KINEMATIC;
      body.velocity.setZero();
      body.angularVelocity.setZero();
      body.position.set(
        Math.max(-halfWidth, Math.min(halfWidth, x)),
        0.65,
        Math.max(-2, Math.min(3, z)),
      );
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
      if (Math.abs(body.position.x) > halfWidth) {
        body.position.x = Math.sign(body.position.x) * halfWidth;
        body.velocity.x *= -0.55;
      }
      if (body.position.z < -2 || body.position.z > 3) {
        body.position.z = Math.max(-2, Math.min(3, body.position.z));
        body.velocity.z *= -0.55;
      }
    },
  };
}
