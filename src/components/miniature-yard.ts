import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/** Static miniature: all textures are generated once, with no external asset requests. */
export function addMiniatureYard(scene: THREE.Scene) {
  const resources: Array<{ dispose(): void }> = [];
  const keep = <T extends { dispose(): void }>(resource: T) => {
    resources.push(resource);
    return resource;
  };
  let seed = 71;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const texture = (wood = false) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = wood ? "#a87647" : "#929660";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 42000; i++) {
      const shade = Math.floor(random() * 50);
      ctx.fillStyle = wood
        ? `rgba(65,35,15,${random() * 0.12})`
        : `rgba(${100 + shade},${106 + shade},${57 + shade},.5)`;
      ctx.fillRect(
        random() * 512,
        random() * 512,
        wood ? 30 + random() * 100 : 1 + random() * 2,
        wood ? 0.5 : 1 + random() * 2,
      );
    }
    const map = keep(new THREE.CanvasTexture(canvas));
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(wood ? 1 : 4, wood ? 1 : 2);
    map.anisotropy = 4;
    return map;
  };
  const turfMap = texture();
  const turf = keep(
    new THREE.MeshStandardMaterial({
      map: turfMap,
      bumpMap: turfMap,
      bumpScale: 0.04,
      roughness: 1,
      color: 0xe6e2c4,
    }),
  );
  const rim = keep(
    new THREE.MeshStandardMaterial({ color: 0xf1e2c6, roughness: 1 }),
  );
  const baseGeometry = keep(new THREE.CylinderGeometry(1, 0.99, 0.25, 128));
  const base = new THREE.Mesh(baseGeometry, rim);
  base.scale.set(6.12, 1, 3.12);
  base.position.y = -0.16;
  scene.add(base);
  const topGeometry = keep(new THREE.CylinderGeometry(1, 1, 0.045, 128));
  const top = new THREE.Mesh(topGeometry, turf);
  top.scale.set(6, 1, 3);
  top.position.y = -0.0225;
  top.receiveShadow = true;
  scene.add(top);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 15, 64, 64, 64);
  gradient.addColorStop(0, "rgba(70,49,26,.3)");
  gradient.addColorStop(0.7, "rgba(70,49,26,.13)");
  gradient.addColorStop(1, "rgba(70,49,26,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const shadowMap = keep(new THREE.CanvasTexture(shadowCanvas));
  const shadowMat = keep(
    new THREE.MeshBasicMaterial({
      map: shadowMap,
      transparent: true,
      depthWrite: false,
    }),
  );
  const shadowGeo = keep(new THREE.PlaneGeometry(1, 1));
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(14, 8, 1);
  shadow.position.set(0.15, -0.3, 0.2);
  scene.add(shadow);
  const wood = keep(
    new THREE.MeshStandardMaterial({
      map: texture(true),
      roughness: 0.85,
      color: 0xf0d4ae,
    }),
  );
  const darkWood = keep(
    new THREE.MeshStandardMaterial({ color: 0x795031, roughness: 1 }),
  );
  const box = keep(new RoundedBoxGeometry(1, 1, 1, 2, 0.055));
  const bench = new THREE.Group();
  bench.position.set(-2.5, 0, -1.5);
  bench.rotation.y = -0.08;
  function slat(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    material = wood,
  ) {
    const mesh = new THREE.Mesh(box, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(w, h, d);
    mesh.castShadow = true;
    bench.add(mesh);
  }
  for (const x of [-0.94, 0.94]) {
    for (const z of [-0.27, 0.27]) slat(x, 0.28, z, 0.12, 0.56, 0.12, darkWood);
    slat(x, 0.75, -0.31, 0.11, 1.05, 0.11, darkWood);
  }
  for (let i = 0; i < 4; i++) slat(0, 0.58, -0.3 + i * 0.2, 2.4, 0.09, 0.16);
  for (let i = 0; i < 2; i++) slat(0, 0.87 + i * 0.24, -0.34, 2.4, 0.18, 0.07);
  scene.add(bench);
  const benchShadow = new THREE.Mesh(shadowGeo, shadowMat);
  benchShadow.rotation.x = -Math.PI / 2;
  benchShadow.position.set(-2.4, 0.003, -1.4);
  benchShadow.scale.set(3.2, 1.65, 1);
  scene.add(benchShadow);
  const pawMat = keep(
    new THREE.MeshStandardMaterial({ color: 0x666a42, roughness: 1 }),
  );
  const pawGeo = keep(new THREE.SphereGeometry(1, 10, 6));
  const paws = new THREE.InstancedMesh(pawGeo, pawMat, 30);
  resources.push(paws);
  const stamp = new THREE.Object3D();
  let index = 0;
  for (let i = 0; i < 6; i++) {
    const x = -3.6 + i * 0.22 + (i % 2) * 0.23,
      z = 0.15 + i * 0.32;
    const parts = [
      [0, 0, 0.09, 0.07],
      [-0.09, -0.1, 0.038, 0.045],
      [-0.035, -0.14, 0.038, 0.045],
      [0.035, -0.14, 0.038, 0.045],
      [0.09, -0.1, 0.038, 0.045],
    ];
    for (const [dx, dz, sx, sz] of parts) {
      stamp.position.set(x + dx, 0.002, z + dz);
      stamp.scale.set(sx, 0.006, sz);
      stamp.updateMatrix();
      paws.setMatrixAt(index++, stamp.matrix);
    }
  }
  scene.add(paws);
  return () => resources.forEach((resource) => resource.dispose());
}
