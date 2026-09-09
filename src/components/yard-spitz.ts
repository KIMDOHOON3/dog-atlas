import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/** Appearance test of the last Blender sculpt; no running rig is present. */
export function addYardSpitz(scene: THREE.Scene, ready: () => void) {
  let disposed = false;
  let model: THREE.Group | undefined;
  const release = (root: THREE.Group) => {
    const materials = new Set<THREE.Material>();
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      (Array.isArray(object.material)
        ? object.material
        : [object.material]
      ).forEach((m) => materials.add(m));
    });
    materials.forEach((material) => material.dispose());
  };
  new GLTFLoader().load(
    "/models/yard-spitz.glb",
    (gltf) => {
      if (disposed) {
        release(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.name = "Blender Spitz appearance test";
      model.scale.setScalar(1.05);
      model.rotation.y = -0.85;
      model.position.set(1.55, 0.03, -0.45);
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        // Thin coat ribbons use the body shadow; self-shadowing creates speckles.
        object.castShadow =
          object.name !== "Baked_coat" && object.name !== "Baked coat";
        object.receiveShadow = false;
      });
      scene.add(model);
      ready();
    },
    undefined,
    () => {
      /* The yard and ball remain usable if the study cannot load. */
    },
  );
  return () => {
    disposed = true;
    if (model) {
      scene.remove(model);
      release(model);
    }
  };
}
