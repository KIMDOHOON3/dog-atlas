// Run with the original downloaded GLB path. Uses existing pnpm tool packages.
import fs from "node:fs/promises";
import { MeshoptSimplifier } from "../node_modules/.pnpm/meshoptimizer@1.1.1/node_modules/meshoptimizer/index.js";
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const input = await fs.readFile(process.argv[2]);
const jsonLength = input.readUInt32LE(12);
const doc = JSON.parse(input.subarray(20, 20 + jsonLength));
const bin = input.subarray(28 + jsonLength);
const originalViews = doc.bufferViews;
function accessor(index) {
  const a = doc.accessors[index],
    v = originalViews[a.bufferView];
  const size = { SCALAR: 1, VEC2: 2, VEC3: 3 }[a.type];
  if (v.byteStride || a.sparse)
    throw new Error("Expected packed source attributes");
  const bytes = bin.subarray(
    (v.byteOffset || 0) + (a.byteOffset || 0),
    (v.byteOffset || 0) + (a.byteOffset || 0) + a.count * size * 4,
  );
  const copy = Uint8Array.from(bytes).buffer;
  return a.componentType === 5126
    ? new Float32Array(copy)
    : new Uint32Array(copy);
}
const primitive = doc.meshes[0].primitives[0];
const positions = accessor(primitive.attributes.POSITION);
const uv = accessor(primitive.attributes.TEXCOORD_0);
const indices = accessor(primitive.indices);
await MeshoptSimplifier.ready;
const [simplified, error] = MeshoptSimplifier.simplifyWithAttributes(
  indices,
  positions,
  3,
  uv,
  2,
  [0.1, 0.1],
  null,
  45000 * 3,
  0.008,
);
const [remap, vertexCount] = MeshoptSimplifier.compactMesh(simplified);
const chunks = [];
let offset = 0;
doc.bufferViews = [];
function append(bytes, target) {
  const data = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const id = doc.bufferViews.length;
  doc.bufferViews.push({
    buffer: 0,
    byteOffset: offset,
    byteLength: data.length,
    ...(target ? { target } : {}),
  });
  const padding = Buffer.alloc((4 - (data.length % 4)) % 4);
  chunks.push(data, padding);
  offset += data.length + padding.length;
  return id;
}
for (const index of Object.values(primitive.attributes)) {
  const a = doc.accessors[index],
    old = accessor(index);
  const size = old.length / a.count;
  const next = new Float32Array(vertexCount * size);
  for (let i = 0; i < a.count; i++)
    if (remap[i] !== 0xffffffff)
      next.set(old.subarray(i * size, (i + 1) * size), remap[i] * size);
  a.bufferView = append(next, 34962);
  a.byteOffset = 0;
  a.count = vertexCount;
  if (a.min) {
    a.min = Array(size).fill(Infinity);
    a.max = Array(size).fill(-Infinity);
    for (let i = 0; i < next.length; i++) {
      const c = i % size;
      a.min[c] = Math.min(a.min[c], next[i]);
      a.max[c] = Math.max(a.max[c], next[i]);
    }
  }
}
const a = doc.accessors[primitive.indices];
const packed = vertexCount <= 65535 ? new Uint16Array(simplified) : simplified;
a.bufferView = append(packed, 34963);
a.byteOffset = 0;
a.count = packed.length;
a.componentType = vertexCount <= 65535 ? 5123 : 5125;
for (const image of doc.images) {
  const v = originalViews[image.bufferView];
  const bytes = bin.subarray(
    v.byteOffset || 0,
    (v.byteOffset || 0) + v.byteLength,
  );
  const resized = await sharp(bytes)
    .resize({
      width: 1024,
      height: 1024,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 88 })
    .toBuffer();
  image.bufferView = append(resized);
  image.mimeType = "image/jpeg";
}
doc.asset.copyright =
  "Golden Retriever Dog by iRahulRajput / Sketchfab, CC BY 4.0. Modified: mesh simplification and 1K textures, Dog Atlas.";
doc.asset.extras = {
  source:
    "https://sketchfab.com/3d-models/golden-retriever-dog-3d-model-free-4d32f856099c4baca05da2da485c24c1",
  license: "https://creativecommons.org/licenses/by/4.0/",
};
doc.buffers = [{ byteLength: offset }];
const json = Buffer.from(JSON.stringify(doc));
const jsonPadded = Buffer.concat([
  json,
  Buffer.alloc((4 - (json.length % 4)) % 4, 32),
]);
const header = Buffer.alloc(20);
header.writeUInt32LE(0x46546c67);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + jsonPadded.length + offset, 8);
header.writeUInt32LE(jsonPadded.length, 12);
header.writeUInt32LE(0x4e4f534a, 16);
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(offset);
binHeader.writeUInt32LE(0x004e4942, 4);
const output = Buffer.concat([header, jsonPadded, binHeader, ...chunks]);
await fs.writeFile("public/models/yard-golden-retriever.glb", output);
console.log(
  JSON.stringify(
    {
      sourceBytes: input.length,
      outputBytes: output.length,
      sourceTriangles: indices.length / 3,
      triangles: packed.length / 3,
      vertexCount,
      error,
    },
    null,
    2,
  ),
);
