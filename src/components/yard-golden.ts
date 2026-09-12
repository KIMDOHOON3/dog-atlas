import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/** The downloaded golden has no skeleton: retain its original standing pose. */
export function addYardGolden(scene: THREE.Scene, ready: () => void) {
  let disposed = false;
  let model: THREE.Group | undefined;
  const release = (root: THREE.Group) => {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material]) {
        materials.add(material);
        for (const value of Object.values(material)) {
          if (value instanceof THREE.Texture) textures.add(value);
        }
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => {
      texture.dispose();
      const image = texture.source.data;
      if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
        image.close();
      }
    });
  };

  new GLTFLoader().load(
    "/models/yard-golden-retriever.glb",
    (gltf) => {
      if (disposed) {
        release(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.name = "Golden Retriever — iRahulRajput (CC BY 4.0)";
      // Fit any source unit scale to the miniature yard and ground the paws.
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const scale = 1.65 / size.y;
      const placement = new THREE.Group();
      model.scale.setScalar(scale);
      model.position.set(
        -center.x * scale,
        -bounds.min.y * scale,
        -center.z * scale,
      );
      placement.add(model);
      model = placement;
      model.rotation.y = -0.85;
      model.position.set(1.55, 0.03, -0.45);
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.castShadow = true;
        object.receiveShadow = false;
      });
      scene.add(model);
      ready();
    },
    undefined,
    () => {
      // Keep the yard and throwable ball usable if the model cannot load.
    },
  );

  return {
    dispose() {
      disposed = true;
      if (model) {
        scene.remove(model);
        release(model);
      }
    },
  };
}
