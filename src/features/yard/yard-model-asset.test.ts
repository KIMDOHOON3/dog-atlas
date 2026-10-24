// @vitest-environment node
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { expect, it } from "vitest";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { Mesh } from "three";

it("loads the compressed yard with byte-identical geometry, materials and transforms", async () => {
  const original = readFileSync(
    "design/yard-blender/yard-furniture.source.glb",
  );
  const packed = readFileSync("public/models/yard-furniture.glb");
  expect(gzipSync(packed).length).toBeLessThan(gzipSync(original).length * 0.8);
  const parse = (bytes: Buffer) =>
    new GLTFLoader()
      .setMeshoptDecoder(MeshoptDecoder)
      .parseAsync(
        bytes.buffer.slice(
          bytes.byteOffset,
          bytes.byteOffset + bytes.byteLength,
        ) as ArrayBuffer,
        "",
      );
  const [before, after] = await Promise.all([parse(original), parse(packed)]);
  let meshes = 0;
  before.scene.traverse((object) => {
    const result = after.scene.getObjectByName(object.name)!;
    expect(result, object.name).toBeDefined();
    expect(result.position.toArray()).toEqual(object.position.toArray());
    expect(result.quaternion.toArray()).toEqual(object.quaternion.toArray());
    expect(result.scale.toArray()).toEqual(object.scale.toArray());
    if (!(object instanceof Mesh) || !(result instanceof Mesh)) return;
    meshes++;
    expect(result.geometry.index!.array).toEqual(object.geometry.index!.array);
    expect(Object.keys(result.geometry.attributes)).toEqual(
      Object.keys(object.geometry.attributes),
    );
    for (const name of Object.keys(object.geometry.attributes)) {
      expect(result.geometry.getAttribute(name).array).toEqual(
        object.geometry.getAttribute(name).array,
      );
    }
    const materialData = (mesh: Mesh) => {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      return materials.map((material) => {
        const { uuid: _uuid, ...data } = material.toJSON();
        void _uuid;
        return data;
      });
    };
    expect(materialData(result)).toEqual(materialData(object));
  });
  expect(meshes).toBe(16);
});
