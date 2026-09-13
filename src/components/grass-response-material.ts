import * as THREE from "three";
import { YARD } from "./yard-layout";

export function applyGrassResponse(
  material: THREE.MeshStandardMaterial,
  texture: THREE.DataTexture,
  blades = false,
) {
  const sample = `texture2D(grassResponse, (grassWorldXZ + vec2(${YARD.radiusX}, ${YARD.radiusZ})) / vec2(${YARD.radiusX * 2}, ${YARD.radiusZ * 2}))`;
  material.customProgramCacheKey = () => `grass-response-v1-${blades}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.grassResponse = { value: texture };
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      "#include <common>\nuniform sampler2D grassResponse;\nvarying vec2 grassWorldXZ;",
    );
    if (blades) {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
        vec4 root = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        grassWorldXZ = root.xz;
        vec3 response = ${sample}.rgb;
        vec2 direction = (response.rg * 255.0 - 128.0) / 127.0;
        vec4 grassWorld = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
        float tip = clamp(position.y / 0.065, 0.0, 1.0);
        grassWorld.xz += direction * 0.07 * tip;
        grassWorld.y = mix(grassWorld.y, root.y, response.b * 0.7 * tip);
        vec4 mvPosition = viewMatrix * grassWorld;
        gl_Position = projectionMatrix * mvPosition;
      `,
      );
    } else {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\ngrassWorldXZ = (modelMatrix * vec4(transformed, 1.0)).xz;",
      );
    }
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform sampler2D grassResponse;\nvarying vec2 grassWorldXZ;",
      )
      .replace(
        "#include <color_fragment>",
        `
      #include <color_fragment>
      vec3 response = ${sample}.rgb;
      vec2 direction = (response.rg * 255.0 - 128.0) / 127.0;
      diffuseColor.rgb *= 1.0 + response.b * 0.3 + dot(direction, vec2(0.6, 0.8)) * 0.12;
    `,
      )
      .replace(
        "#include <normal_fragment_maps>",
        `
      #include <normal_fragment_maps>
      normal = normalize(normal + mat3(viewMatrix) * vec3(-direction.x, 0.0, -direction.y) * 0.3);
    `,
      );
  };
}
