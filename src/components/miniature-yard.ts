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
    ctx.fillStyle = wood ? "#a87647" : "#858359";
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
      color: 0xdfd8bb,
    }),
  );
  const rim = keep(
    new THREE.MeshStandardMaterial({ color: 0xf1e2c6, roughness: 1 }),
  );
  const profile = [
    new THREE.Vector2(0, -0.17),
    new THREE.Vector2(0.95, -0.17),
    new THREE.Vector2(0.995, -0.135),
    new THREE.Vector2(1.006, -0.07),
    new THREE.Vector2(1.004, 0.01),
    new THREE.Vector2(0.99, 0.055),
    new THREE.Vector2(0.975, 0.065),
  ];
  const baseGeometry = keep(new THREE.LatheGeometry(profile, 160));
  const positions = baseGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i),
      z = positions.getZ(i),
      y = positions.getY(i);
    const n = Math.sin(x * 83 + z * 59) * Math.sin(z * 107 - y * 31) * 0.0015;
    positions.setXYZ(i, x + n, y + n * 2, z + n);
  }
  baseGeometry.computeVertexNormals();
  const base = new THREE.Mesh(baseGeometry, rim);
  base.scale.set(6.12, 1.7, 3.12);
  base.position.y = -0.09;
  scene.add(base);
  const topGeometry = keep(new THREE.CylinderGeometry(1, 1, 0.045, 128));
  const top = new THREE.Mesh(topGeometry, turf);
  top.scale.set(6, 1, 3);
  top.position.y = -0.0225;
  top.receiveShadow = true;
  scene.add(top);
  // Short tapered fibres give the lawn a real silhouette and grazing-light texture.
  const bladeGeo = keep(new THREE.BufferGeometry());
  bladeGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [-0.008, 0, 0, 0.008, 0, 0, 0.004, 0.035, 0.003, 0, 0.065, 0.013],
      3,
    ),
  );
  bladeGeo.setIndex([0, 1, 2, 0, 2, 3]);
  bladeGeo.computeVertexNormals();
  const bladeMat = keep(
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
  );
  const bladeCount = matchMedia("(max-width:767px)").matches ? 26000 : 62000;
  const fibres = new THREE.InstancedMesh(bladeGeo, bladeMat, bladeCount);
  resources.push(fibres);
  const fibre = new THREE.Object3D(),
    color = new THREE.Color();
  for (let i = 0; i < bladeCount; i++) {
    const angle = random() * Math.PI * 2,
      r = Math.sqrt(random()) * 0.996;
    const x = Math.cos(angle) * r * 6,
      z = Math.sin(angle) * r * 3;
    let print = false;
    for (let j = 0; j < 6; j++) {
      const px = -3.6 + j * 0.22 + (j % 2) * 0.23,
        pz = 0.15 + j * 0.32;
      if (Math.hypot((x - px) / 0.16, (z - pz + 0.04) / 0.18) < 1) print = true;
    }
    fibre.position.set(x, 0, z);
    fibre.rotation.y = random() * Math.PI * 2;
    fibre.scale.set(print ? 0 : 1, 0.45 + random() * 0.65, 1);
    fibre.updateMatrix();
    fibres.setMatrixAt(i, fibre.matrix);
    const variation = random();
    color.setHSL(0.145 + variation * 0.004, 0.27, 0.28 + variation * 0.045);
    fibres.setColorAt(i, color);
  }
  fibres.receiveShadow = true;
  scene.add(fibres);
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
      color: 0xf7e5c5,
    }),
  );
  const darkWood = keep(
    new THREE.MeshStandardMaterial({ color: 0x795031, roughness: 1 }),
  );
  const box = keep(new RoundedBoxGeometry(1, 1, 1, 2, 0.055));
  const bench = new THREE.Group();
  bench.position.set(-2.5, 0, -1.5);
  bench.rotation.y = -0.22;
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
      stamp.position.set(x + dx, 0.014, z + dz);
      stamp.scale.set(sx, 0.012, sz);
      stamp.updateMatrix();
      paws.setMatrixAt(index++, stamp.matrix);
    }
  }
  scene.add(paws);
  return () => resources.forEach((resource) => resource.dispose());
}
