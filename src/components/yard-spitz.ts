import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/** A small articulated, sculpted Spitz. Shared vertex colours keep each limb one draw. */
export function createYardSpitz() {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const resources: THREE.BufferGeometry[] = [];
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
  });
  const cream = "#f5f1e7",
    white = "#fffaf0",
    shade = "#e7e2d7";
  function sculpt(
    parent: THREE.Group,
    shapes: {
      p: number[];
      s: number[];
      c?: string;
      cone?: boolean;
      r?: number;
    }[],
  ) {
    const parts = shapes.map(({ p, s, c = cream, cone, r = 0 }) => {
      const source = cone
        ? new THREE.ConeGeometry(1, 2, 4)
        : new THREE.SphereGeometry(1, 16, 12);
      const geometry = source.toNonIndexed();
      source.dispose();
      geometry.scale(s[0], s[1], s[2]);
      geometry.rotateZ(r);
      geometry.translate(p[0], p[1], p[2]);
      const color = new THREE.Color(c);
      const colors = new Float32Array(geometry.attributes.position.count * 3);
      for (let i = 0; i < colors.length; i += 3) color.toArray(colors, i);
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      return geometry;
    });
    const geometry = mergeGeometries(parts)!;
    parts.forEach((part) => part.dispose());
    resources.push(geometry);
    parent.add(new THREE.Mesh(geometry, material));
  }
  // Forward is +Z; a compact body, deep neck ruff and tapering fox muzzle.
  sculpt(body, [
    { p: [0, 0.78, 0], s: [0.29, 0.34, 0.53] },
    { p: [0, 0.87, 0.36], s: [0.34, 0.4, 0.3], c: white },
    { p: [0, 0.68, 0.42], s: [0.26, 0.3, 0.24] },
    ...[-1, 1].flatMap((side) => [
      {
        p: [side * 0.18, 0.87, 0.28],
        s: [0.16, 0.29, 0.25],
        c: white,
        r: side * 0.2,
      },
      { p: [side * 0.18, 0.65, -0.3], s: [0.16, 0.28, 0.24], c: shade },
    ]),
  ]);
  const head = new THREE.Group();
  head.position.set(0, 1.13, 0.39);
  body.add(head);
  sculpt(head, [
    { p: [0, 0.06, 0.08], s: [0.255, 0.27, 0.255], c: white },
    { p: [0, -0.035, 0.3], s: [0.125, 0.105, 0.23], c: white },
    { p: [0, -0.01, 0.49], s: [0.069, 0.052, 0.045], c: "#272723" },
    ...[-1, 1].flatMap((side) => [
      {
        p: [side * 0.173, 0.32, 0.015],
        s: [0.14, 0.23, 0.085],
        cone: true,
        r: side * -0.17,
        c: white,
      },
      {
        p: [side * 0.173, 0.32, 0.073],
        s: [0.072, 0.14, 0.016],
        cone: true,
        r: side * -0.17,
        c: "#ddc6b7",
      },
      { p: [side * 0.15, 0.106, 0.27], s: [0.041, 0.047, 0.025], c: "#272723" },
      {
        p: [side * 0.143, 0.12, 0.291],
        s: [0.011, 0.012, 0.008],
        c: "#ffffff",
      },
    ]),
  ]);
  const legs = [-1, 1].flatMap((side) =>
    [0.3, -0.33].map((z) => {
      const leg = new THREE.Group();
      leg.position.set(side * 0.205, 0.66, z);
      body.add(leg);
      sculpt(leg, [
        { p: [0, -0.16, 0], s: [0.095, 0.23, 0.11] },
        { p: [0, -0.39, 0.015], s: [0.064, 0.2, 0.072], c: white },
        { p: [0, -0.57, 0.055], s: [0.085, 0.058, 0.13], c: white },
      ]);
      return leg;
    }),
  );
  const tail = new THREE.Group();
  tail.position.set(0, 0.84, -0.42);
  body.add(tail);
  sculpt(
    tail,
    Array.from({ length: 10 }, (_, i) => {
      const angle = -1.4 + (i / 9) * 4.7;
      return {
        p: [
          Math.cos(angle) * 0.19,
          0.25 + Math.sin(angle) * 0.24,
          0.02 + i * 0.019,
        ],
        s: [0.14 - i * 0.003, 0.15 - i * 0.003, 0.145 - i * 0.003],
        c: i > 5 ? white : cream,
      };
    }),
  );
  const shadowGeometry = new THREE.CircleGeometry(1, 32);
  resources.push(shadowGeometry);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x655b45,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(0.38, 0.73, 1);
  shadow.position.y = 0.012;
  root.add(shadow);
  root.scale.setScalar(1.2);
  root.position.set(1.8, 0, 0.3);
  root.rotation.y = -0.65;
  let time = 0,
    gait = 0,
    speed = 0,
    chase = 0;
  const target = new THREE.Vector2(2.8, 0.6);
  const routes = [
    [2.8, 0.6],
    [1.5, 1.65],
    [-1.2, 1.45],
    [-3.6, 0.2],
    [-0.3, -0.4],
  ];
  let route = 0,
    pause = 1.5;
  return {
    root,
    chaseBall() {
      chase = 9;
      pause = 0;
    },
    update(dt: number, ball: { x: number; z: number }) {
      dt = Math.min(dt, 0.05);
      time += dt;
      chase = Math.max(0, chase - dt);
      if (chase > 0) target.set(ball.x, ball.z);
      // Keep the dog on the lawn and clear of the bench, even when the ball rolls behind it.
      const edge = Math.hypot(target.x / 4.75, target.y / 2.05);
      if (edge > 1) target.multiplyScalar(1 / edge);
      if (target.x < -1 && target.y < -0.6) target.y = -0.5;
      const dx = target.x - root.position.x,
        dz = target.y - root.position.z;
      const distance = Math.hypot(dx, dz);
      pause = Math.max(0, pause - dt);
      const desired =
        pause > 0
          ? 0
          : Math.min(
              chase > 0 ? 2.3 : 0.72,
              Math.max(0, distance - (chase > 0 ? 0.85 : 0.1)) * 2,
            );
      speed = THREE.MathUtils.damp(speed, desired, 6, dt);
      if (distance > 0.1 && speed > 0.015) {
        const angle = Math.atan2(dx, dz);
        const turn = Math.atan2(
          Math.sin(angle - root.rotation.y),
          Math.cos(angle - root.rotation.y),
        );
        root.rotation.y += turn * (1 - Math.exp(-7 * dt));
        root.position.x += Math.sin(root.rotation.y) * speed * dt;
        root.position.z += Math.cos(root.rotation.y) * speed * dt;
        const bound = Math.hypot(
          root.position.x / 4.75,
          root.position.z / 2.05,
        );
        if (bound > 1) {
          root.position.x /= bound;
          root.position.z /= bound;
        }
        if (root.position.x < -1 && root.position.z < -0.6)
          root.position.z = -0.6;
      }
      if (chase === 0 && distance < 0.22 && pause === 0) {
        route = (route + 1) % routes.length;
        target.set(...(routes[route] as [number, number]));
        pause = 1.5;
      }
      gait += dt * (3 + speed * 6);
      const stride = Math.min(1, speed / 1.5);
      legs.forEach((leg, i) => {
        leg.rotation.x =
          Math.sin(gait + (i === 0 || i === 3 ? 0 : Math.PI)) * 0.65 * stride;
      });
      body.position.y = Math.abs(Math.sin(gait)) * 0.065 * stride;
      body.rotation.x = Math.sin(gait * 2) * 0.025 * stride;
      head.rotation.x = THREE.MathUtils.damp(
        head.rotation.x,
        chase > 0 && distance < 1 ? 0.3 : Math.sin(time * 1.4) * 0.04,
        5,
        dt,
      );
      head.rotation.y = Math.sin(time * 1.6) * 0.09 * (1 - stride);
      tail.rotation.z = Math.sin(time * (chase > 0 ? 9 : 4)) * 0.16;
    },
    dispose() {
      resources.forEach((g) => g.dispose());
      material.dispose();
      shadowMaterial.dispose();
      root.removeFromParent();
    },
  };
}
