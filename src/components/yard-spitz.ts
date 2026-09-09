import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSpitzFollow } from "./spitz-follow";

/** Ground following with the baked Blender joint animation. */
export function addYardSpitz(scene: THREE.Scene, ready: () => void) {
  let disposed = false;
  let model: THREE.Group | undefined;
  const follow = createSpitzFollow();
  let mixer: THREE.AnimationMixer | undefined;
  let run: THREE.AnimationAction | undefined;
  let runWeight = 0;
  const shadowGeometry = new THREE.CircleGeometry(0.7, 24);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x514d34,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(0.65, 1, 1);
  const release = (root: THREE.Group) => {
    const materials = new Set<THREE.Material>();
    const skeletons = new Set<THREE.Skeleton>();
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      if (object instanceof THREE.SkinnedMesh) skeletons.add(object.skeleton);
      object.geometry.dispose();
      (Array.isArray(object.material)
        ? object.material
        : [object.material]
      ).forEach((m) => materials.add(m));
    });
    materials.forEach((material) => material.dispose());
    skeletons.forEach((skeleton) => skeleton.dispose());
  };
  new GLTFLoader().load(
    "/models/yard-spitz-rigged.glb",
    (gltf) => {
      if (disposed) {
        release(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        for (const material of materials) {
          if (
            material instanceof THREE.MeshStandardMaterial &&
            material.name === "Warm white coat"
          ) {
            material.color.set(0xf1eee6);
            material.roughness = 0.95;
          }
        }
      });
      const clip = gltf.animations.find((clip) => clip.name.includes("Run"));
      if (clip) {
        mixer = new THREE.AnimationMixer(model);
        run = mixer.clipAction(clip);
        run.setEffectiveWeight(0).play();
      }
      model.name = "Blender Spitz appearance test";
      model.scale.setScalar(1.05);
      model.rotation.y = -0.85;
      model.position.set(1.55, 0.03, -0.45);
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        // Thin coat ribbons use the body shadow; self-shadowing creates speckles.
        object.castShadow = false;
        object.receiveShadow = false;
      });
      scene.add(model);
      scene.add(shadow);
      shadow.position.set(1.55, 0.012, -0.45);
      ready();
    },
    undefined,
    () => {
      /* The yard and ball remain usable if the study cannot load. */
    },
  );
  return {
    update(dt: number, ball: { x: number; z: number }) {
      if (!model) return false;
      const previousYaw = model.rotation.y;
      const s = follow.step(dt, ball);
      runWeight +=
        (Math.min(1, s.speed / 0.8) - runWeight) * (1 - Math.exp(-dt * 10));
      if (runWeight < 0.001) runWeight = 0;
      if (run && mixer) {
        run.setEffectiveWeight(runWeight);
        run.setEffectiveTimeScale(Math.max(0.5, s.speed / 1.5));
        mixer.update(dt);
      }
      model.position.set(
        s.x,
        0.03 + (0.5 + 0.5 * Math.sin(s.phase * 2)) * 0.09 * runWeight,
        s.z,
      );
      model.rotation.y = s.yaw;

      shadow.position.set(s.x, 0.012, s.z);
      shadow.rotation.z = -s.yaw;
      shadowMaterial.opacity = 0.12 - 0.025 * runWeight;
      return (
        runWeight > 0 ||
        s.speed > 0.005 ||
        Math.abs(previousYaw - s.yaw) > 0.0001
      );
    },
    dispose() {
      disposed = true;
      if (model) {
        mixer?.stopAllAction();
        mixer?.uncacheRoot(model);
        scene.remove(model);
        release(model);
      }
      scene.remove(shadow);
      shadowGeometry.dispose();
      shadowMaterial.dispose();
    },
  };
}
