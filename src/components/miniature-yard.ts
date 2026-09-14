import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { YARD, YARD_OBSTACLES } from "./yard-layout";
import { createGrassResponse, type GrassContact } from "./grass-response";
import { applyGrassResponse } from "./grass-response-material";

/** Static turf plus locally authored Blender furniture, loaded only with the yard. */
export function addMiniatureYard(
  scene: THREE.Scene,
  onReady: (models: Map<string, THREE.Object3D>) => void = () => {},
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
  const texture = (wood = false) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = wood ? "#a87647" : "#7d895f";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < (wood ? 10000 : 42000); i++) {
      const shade = Math.floor(random() * 20);
      ctx.fillStyle = wood
        ? `rgba(65,35,15,${random() * 0.055})`
        : `rgba(${75 + shade},${91 + shade},${49 + shade},.5)`;
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
  const grassResponse = createGrassResponse();
  const responseMap = keep(
    new THREE.DataTexture(
      grassResponse.data,
      grassResponse.width,
      grassResponse.height,
    ),
  );
  responseMap.minFilter = responseMap.magFilter = THREE.LinearFilter;
  responseMap.needsUpdate = true;
  const turf = keep(
    new THREE.MeshStandardMaterial({
      map: turfMap,
      bumpMap: turfMap,
      bumpScale: 0.012,
      roughness: 1,
      color: 0xffffff,
    }),
  );
  const rim = keep(
    new THREE.MeshStandardMaterial({ color: 0xf1e2c6, roughness: 1 }),
  );
  applyGrassResponse(turf, responseMap);
  const profile = [
    new THREE.Vector2(0, -0.5),
    new THREE.Vector2(0.97, -0.5),
    new THREE.Vector2(1.015, -0.43),
    new THREE.Vector2(1.025, -0.22),
    new THREE.Vector2(1.02, -0.07),
    new THREE.Vector2(1.003, -0.01),
    new THREE.Vector2(0.99, -0.02),
  ];
  const baseGeometry = keep(new THREE.LatheGeometry(profile, 160));
  const base = new THREE.Mesh(baseGeometry, rim);
  base.scale.set(YARD.radiusX, 1, YARD.radiusZ);
  scene.add(base);
  const topGeometry = keep(new THREE.CylinderGeometry(1, 1, 0.045, 128));
  const top = new THREE.Mesh(topGeometry, turf);
  top.scale.set(YARD.radiusX, 1, YARD.radiusZ);
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
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      side: THREE.DoubleSide,
    }),
  );
  const bladeCount = matchMedia("(max-width:767px)").matches ? 16000 : 34000;
  applyGrassResponse(bladeMat, responseMap, true);
  const fibres = new THREE.InstancedMesh(bladeGeo, bladeMat, bladeCount);
  // Stay hidden until the first camera resize has selected readable detail.
  fibres.visible = false;
  resources.push(fibres);
  const fibre = new THREE.Object3D(),
    color = new THREE.Color();
  for (let i = 0; i < bladeCount; i++) {
    const angle = random() * Math.PI * 2,
      r = Math.sqrt(random()) * 0.996;
    const x = Math.cos(angle) * r * YARD.radiusX,
      z = Math.sin(angle) * r * YARD.radiusZ;
    fibre.position.set(x, 0, z);
    fibre.rotation.y = random() * Math.PI * 2;
    const underObject = YARD_OBSTACLES.some(
      (o) => Math.abs(x - o.x) < o.width / 2 && Math.abs(z - o.z) < o.depth / 2,
    );
    const height = 0.38 + random() * 0.42;
    fibre.scale.set(
      underObject ? 0 : 1,
      underObject ? 0 : height,
      underObject ? 0 : 1,
    );
    fibre.updateMatrix();
    fibres.setMatrixAt(i, fibre.matrix);
    const variation = random();
    color.set(0x738155).multiplyScalar(0.92 + variation * 0.12);
    fibres.setColorAt(i, color);
  }
  fibres.receiveShadow = true;
  scene.add(fibres);
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
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(20, 14, 1);
  shadow.position.set(0.1, -0.52, 0.1);
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
    "/models/yard-furniture.glb?v=quiet-cafe-11",
    (gltf) => {
      if (disposed) {
        releaseModel(gltf.scene);
        return;
      }
      furniture = gltf.scene;
      furniture.name = "Blender playground furniture";
      furniture.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const lawn =
          object.name === "Lawn_surface" || object.name === "Lawn surface";
        const edge = object.name === "Lawn_edge" || object.name === "Lawn edge";
        object.castShadow = !lawn && !edge;
        object.receiveShadow = true;
        if (lawn && !object.geometry.getAttribute("uv")) {
          // The Blender lawn has no UVs; without these the grass/bump maps
          // sample a single texel and the entire surface looks painted flat.
          object.geometry.computeBoundingBox();
          const bounds = object.geometry.boundingBox!;
          const positions = object.geometry.getAttribute("position");
          const uv = new Float32Array(positions.count * 2);
          const spanX = Math.max(bounds.max.x - bounds.min.x, 0.001);
          const spanZ = Math.max(bounds.max.z - bounds.min.z, 0.001);
          for (let i = 0; i < positions.count; i++) {
            uv[i * 2] = (positions.getX(i) - bounds.min.x) / spanX;
            uv[i * 2 + 1] = (positions.getZ(i) - bounds.min.z) / spanZ;
          }
          object.geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
        }
        if (lawn || edge) {
          const original = Array.isArray(object.material)
            ? object.material
            : [object.material];
          original.forEach((material) => material.dispose());
          object.material = (lawn ? turf : rim).clone();
          if (lawn) applyGrassResponse(object.material, responseMap);
        }
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
      base.visible = false;
      top.visible = false;
      scene.add(furniture);
      const models = new Map<string, THREE.Object3D>();
      for (const id of ["bone", "disc", "tug"]) {
        const model = furniture.getObjectByName(`Throw_${id}`);
        if (model) models.set(id, model);
      }
      onReady(models);
    },
    undefined,
    () => {
      /* The lightweight procedural bench remains usable offline. */
    },
  );
  return {
    updateGrass(dt: number, contacts: readonly GrassContact[]) {
      const changed = grassResponse.update(dt, contacts);
      if (changed) responseMap.needsUpdate = true;
      return changed;
    },
    resetGrass() {
      grassResponse.reset();
      responseMap.needsUpdate = true;
    },
    setViewScale(pixelsPerUnit: number) {
      // Subpixel blades shimmer like particles. The mipmapped turf and bump
      // textures retain the lawn's grain when individual blades are too small.
      fibres.visible = pixelsPerUnit * 0.065 * 0.8 >= 1.5;
    },
    dispose() {
      disposed = true;
      if (furniture) {
        scene.remove(furniture);
        releaseModel(furniture);
      }
      resources.forEach((resource) => resource.dispose());
    },
  };
}
