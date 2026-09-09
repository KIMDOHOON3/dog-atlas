import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSpitzFollow } from "./spitz-follow";

/** Ground following with a lightweight vertex gait for the unrigged sculpt. */
export function addYardSpitz(scene: THREE.Scene, ready: () => void) {
  let disposed = false;
  let model: THREE.Group | undefined;
  const follow = createSpitzFollow();
  const phase = { value: 0 },
    stride = { value: 0 };
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
    "/models/yard-spitz-clean.glb",
    (gltf) => {
      if (disposed) {
        release(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.updateMatrixWorld(true);
      const meshes: THREE.Mesh[] = [];
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) meshes.push(o);
      });
      // Put all surfaces, including the coat, into the same rest coordinate space.
      for (const mesh of meshes) {
        mesh.geometry.applyMatrix4(mesh.matrixWorld);
        mesh.removeFromParent();
        mesh.position.set(0, 0, 0);
        mesh.quaternion.identity();
        mesh.scale.set(1, 1, 1);
        model.add(mesh);
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const material of materials) {
          if (!(material instanceof THREE.MeshStandardMaterial)) continue;
          if (material.name === "Warm white coat") {
            material.color.set(0xf1eee6);
            material.roughness = 0.95;
          }
          material.onBeforeCompile = (shader) => {
            shader.uniforms.dogPhase = phase;
            shader.uniforms.dogStride = stride;
            shader.vertexShader =
              "uniform float dogPhase; uniform float dogStride;\n" +
              shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
              "#include <begin_vertex>",
              `
              #include <begin_vertex>
              float leg = (1.0 - smoothstep(0.35, 0.78, position.y)) * dogStride;
              float pair = position.z > 0.0 ? 0.0 : 2.35;
              float stepWave = sin(dogPhase + pair + sign(position.x) * 0.25);
              transformed.z += stepWave * 0.23 * leg;
              transformed.y += max(0.0, cos(dogPhase + pair)) * 0.13 * leg;
              float tail = smoothstep(0.2, 0.7, -position.z) * smoothstep(0.95, 1.3, position.y);
              transformed.x += sin(dogPhase * 0.5) * 0.045 * tail * dogStride;
            `,
            );
          };
          material.customProgramCacheKey = () => "spitz-bound-gait-v2";
        }
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
      phase.value = s.phase;
      stride.value = Math.min(1, s.speed / 0.7);
      model.position.set(
        s.x,
        0.03 + (0.5 + 0.5 * Math.sin(s.phase * 2)) * 0.09 * stride.value,
        s.z,
      );
      model.rotation.y = s.yaw;
      model.rotation.x = Math.sin(s.phase) * 0.035 * stride.value;
      shadow.position.set(s.x, 0.012, s.z);
      shadow.rotation.z = -s.yaw;
      shadowMaterial.opacity = 0.12 - 0.025 * stride.value;
      return s.speed > 0.005 || Math.abs(previousYaw - s.yaw) > 0.0001;
    },
    dispose() {
      disposed = true;
      if (model) {
        scene.remove(model);
        release(model);
      }
      scene.remove(shadow);
      shadowGeometry.dispose();
      shadowMaterial.dispose();
    },
  };
}
