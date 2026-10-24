import * as THREE from "three";
import { YARD_OBSTACLES } from "./yard-layout";

/** Two small, unlit paper-thin butterflies share the yard's render loop. */
export function addYardButterflies(scene: THREE.Scene, mobile: boolean) {
  const resources: Array<{ dispose(): void }> = [];
  const keep = <T extends { dispose(): void }>(value: T) => {
    resources.push(value);
    return value;
  };
  const outline = new THREE.Shape();
  outline.moveTo(0, 0.04);
  outline.bezierCurveTo(0.09, 0.22, 0.28, 0.34, 0.34, 0.21);
  outline.bezierCurveTo(0.39, 0.1, 0.29, -0.01, 0.19, -0.035);
  outline.bezierCurveTo(0.34, -0.08, 0.26, -0.25, 0.17, -0.24);
  outline.bezierCurveTo(0.07, -0.23, 0.025, -0.09, 0, 0.04);
  const wingGeometry = keep(new THREE.ShapeGeometry(outline, 12));
  wingGeometry.rotateX(Math.PI / 2);
  const bodyGeometry = keep(new THREE.SphereGeometry(1, 8, 6));
  const spotGeometry = keep(new THREE.CircleGeometry(1, 10));
  spotGeometry.rotateX(-Math.PI / 2);
  const ink = keep(new THREE.MeshBasicMaterial({ color: 0x574938 }));
  const cream = keep(
    new THREE.MeshBasicMaterial({
      color: 0xffedc7,
      side: THREE.DoubleSide,
    }),
  );
  const antennaCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0.09),
    new THREE.Vector3(0.03, 0.025, 0.17),
    new THREE.Vector3(0.06, 0.02, 0.18),
  );
  const antennaGeometry = keep(
    new THREE.TubeGeometry(antennaCurve, 6, 0.005, 3, false),
  );
  const group = new THREE.Group();
  group.name = "Bench butterflies";
  scene.add(group);
  const butterflies = [0x779fba, 0xd9a650].map((color, index) => {
    const root = new THREE.Group();
    root.name = `Butterfly ${index + 1}`;
    root.scale.setScalar(mobile ? 0.96 : 0.75);
    const edge = keep(
      new THREE.MeshBasicMaterial({ color: 0x655443, side: THREE.DoubleSide }),
    );
    const fill = keep(
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    );
    const wings = [-1, 1].map((side) => {
      const hinge = new THREE.Group();
      const wing = new THREE.Group();
      wing.scale.x = side;
      wing.add(new THREE.Mesh(wingGeometry, edge));
      const panel = new THREE.Mesh(wingGeometry, fill);
      panel.scale.set(0.89, 1, 0.9);
      panel.position.set(0.006, 0.003, 0);
      wing.add(panel);
      for (const [x, z, radius] of [
        [0.255, 0.19, 0.025],
        [0.287, 0.125, 0.018],
        [0.175, -0.17, 0.021],
      ]) {
        const spot = new THREE.Mesh(spotGeometry, cream);
        spot.scale.setScalar(radius);
        spot.position.set(x, 0.006, z);
        wing.add(spot);
      }
      hinge.add(wing);
      root.add(hinge);
      return { hinge, side };
    });
    const body = new THREE.Mesh(bodyGeometry, ink);
    body.scale.set(0.022, 0.022, 0.15);
    root.add(body);
    for (const side of [-1, 1]) {
      const antenna = new THREE.Mesh(antennaGeometry, ink);
      antenna.scale.x = side;
      root.add(antenna);
    }
    group.add(root);
    return { root, wings };
  });
  let elapsed = 0;
  const bench = YARD_OBSTACLES[0];
  const pose = (time: number, still: boolean) => {
    butterflies.forEach(({ root, wings }, index) => {
      const perchX = bench.x + (index === 0 ? -0.65 : 0.64);
      const perchZ = bench.z - 0.38;
      // Continuous paths have no landing interval or cycle-reset jump.
      const angle = time * (index === 0 ? 0.72 : 0.61) + index * Math.PI;
      root.position.set(
        perchX + (still ? 0 : Math.sin(angle) * 1.15),
        still
          ? 1.35
          : 1.95 +
              0.2 * Math.sin(angle * 2) +
              0.06 * Math.sin(time * 3 + index),
        perchZ + (still ? 0 : 0.8 + 0.65 * Math.cos(angle)),
      );
      root.rotation.set(
        still ? 0 : Math.sin(angle * 2) * 0.1,
        still
          ? -0.22
          : Math.atan2(1.15 * Math.cos(angle), -0.65 * Math.sin(angle)),
        still ? 0 : Math.cos(angle) * 0.16,
      );
      const flutter =
        0.35 + (0.5 + 0.5 * Math.sin(time * 27 + index * 2)) * 0.85;
      const fold = still ? 0.92 : flutter;
      for (const { hinge, side } of wings) hinge.rotation.z = side * fold;
    });
  };
  pose(0, false);
  return {
    update(dt: number) {
      elapsed += dt;
      pose(elapsed, false);
      return true;
    },
    rest() {
      elapsed = 0;
      pose(0, true);
    },
    resize(isMobile: boolean) {
      butterflies.forEach(({ root }) =>
        root.scale.setScalar(isMobile ? 0.96 : 0.75),
      );
    },
    dispose() {
      scene.remove(group);
      resources.forEach((resource) => resource.dispose());
    },
  };
}
