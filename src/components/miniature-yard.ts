import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { YARD, YARD_OBSTACLES } from "./yard-layout";

/** Rounded miniature platform and furniture with shadows on the white page. */
export function addMiniatureYard(
  scene: THREE.Scene,
  onReady: () => void = () => {},
) {
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
  const woodTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#a87647";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 10000; i++) {
      ctx.fillStyle = `rgba(65,35,15,${random() * 0.055})`;
      ctx.fillRect(random() * 512, random() * 512, 30 + random() * 100, 0.5);
    }
    const map = keep(new THREE.CanvasTexture(canvas));
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(1, 1);
    map.anisotropy = 4;
    return map;
  };
  // Only shadows are drawn; the page background remains identical above and below.
  const floorMaterial = keep(
    new THREE.ShadowMaterial({
      color: 0x655c50,
      opacity: 0.18,
      depthWrite: false,
    }),
  );
  const topGeometry = keep(new THREE.PlaneGeometry(80, 80));
  const top = new THREE.Mesh(topGeometry, floorMaterial);
  top.rotation.x = -Math.PI / 2;
  top.position.y = -0.48;
  top.receiveShadow = true;
  scene.add(top);
  const platform = new THREE.Mesh(
    keep(
      new RoundedBoxGeometry(
        YARD.halfWidth * 2,
        0.44,
        YARD.halfDepth * 2,
        4,
        0.2,
      ),
    ),
    keep(new THREE.MeshStandardMaterial({ color: 0xede4d2, roughness: 0.9 })),
  );
  platform.position.set(YARD.centerX, -0.22, YARD.centerZ);
  platform.castShadow = platform.receiveShadow = true;
  scene.add(platform);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 15, 64, 64, 64);
  gradient.addColorStop(0, "rgba(70,65,45,.10)");
  gradient.addColorStop(0.7, "rgba(70,65,45,.04)");
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
  const wood = keep(
    new THREE.MeshStandardMaterial({
      map: woodTexture(),
      roughness: 0.85,
      color: 0xf7e5c5,
    }),
  );
  const darkWood = keep(
    new THREE.MeshStandardMaterial({ color: 0x795031, roughness: 1 }),
  );
  const box = keep(new RoundedBoxGeometry(1, 1, 1, 2, 0.055));
  const bench = new THREE.Group();
  bench.position.set(YARD_OBSTACLES[0].x, 0, YARD_OBSTACLES[0].z);
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
  benchShadow.position.set(
    YARD_OBSTACLES[0].x + 0.1,
    0.003,
    YARD_OBSTACLES[0].z + 0.1,
  );
  benchShadow.scale.set(3.2, 1.65, 1);
  scene.add(benchShadow);
  let disposed = false;
  let furniture: THREE.Group | null = null;
  const releaseModel = (model: THREE.Group) => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach((material) => material.dispose());
    });
  };
  new GLTFLoader().load(
    "/models/yard-furniture.glb?v=diorama-5",
    (gltf) => {
      if (disposed) {
        releaseModel(gltf.scene);
        return;
      }
      furniture = gltf.scene;
      furniture.name = "Blender playground furniture";
      furniture.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.castShadow = true;
        object.receiveShadow = true;
        if (
          object.material instanceof THREE.MeshStandardMaterial &&
          object.material.name === "Yard oak"
        ) {
          object.material.color.set(0xf7e5c5);
          object.material.map = wood.map;
          object.material.bumpMap = wood.map;
          object.material.bumpScale = 0.006;
          object.material.needsUpdate = true;
        }
      });
      bench.visible = false;
      platform.visible = false;
      scene.add(furniture);
      onReady();
    },
    undefined,
    () => {
      /* The lightweight procedural bench remains usable offline. */
    },
  );
  return () => {
    disposed = true;
    if (furniture) {
      scene.remove(furniture);
      releaseModel(furniture);
    }
    resources.forEach((resource) => resource.dispose());
  };
}
