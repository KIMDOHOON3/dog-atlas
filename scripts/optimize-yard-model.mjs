// Repack the Blender export without quantization, simplification or reordering.
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { MeshoptEncoder } from "meshoptimizer/encoder";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const sourcePath = "design/yard-blender/yard-furniture.source.glb";
const targetPath = "public/models/yard-furniture.glb";
const extension = "KHR_meshopt_compression";
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
const source = await fs.readFile(sourcePath);
assert.equal(source.toString("ascii", 0, 4), "glTF");
assert.equal(source.readUInt32LE(4), 2);
const jsonLength = source.readUInt32LE(12);
const document = JSON.parse(source.subarray(20, 20 + jsonLength).toString());
assert.equal(document.buffers.length, 1);
assert.ok(!document.extensionsUsed?.includes(extension));
const binary = source.subarray(28 + jsonLength);
const parts = [];
let byteOffset = 0;
for (const [index, view] of document.bufferViews.entries()) {
  const accessors = document.accessors.filter((a) => a.bufferView === index);
  assert.equal(
    accessors.length,
    1,
    "Expected separate Blender attribute streams",
  );
  const accessor = accessors[0];
  assert.ok(!accessor.sparse && !accessor.byteOffset && !view.byteStride);
  const count = accessor.count;
  const stride = view.byteLength / count;
  // INDICES preserves index order exactly, including each triangle's first vertex.
  const mode = view.target === 34963 ? "INDICES" : "ATTRIBUTES";
  const raw = binary.subarray(
    view.byteOffset ?? 0,
    (view.byteOffset ?? 0) + view.byteLength,
  );
  const encoded = MeshoptEncoder.encodeGltfBuffer(raw, count, stride, mode, 1);
  const decoded = new Uint8Array(raw.length);
  MeshoptDecoder.decodeGltfBuffer(decoded, count, stride, encoded, mode);
  assert.ok(
    Buffer.from(decoded).equals(raw),
    `Lossless round trip failed: view ${index}`,
  );
  view.buffer = 1;
  view.extensions = {
    [extension]: {
      buffer: 0,
      byteOffset,
      byteLength: encoded.length,
      byteStride: stride,
      count,
      mode,
    },
  };
  if (mode === "ATTRIBUTES") view.byteStride = stride;
  const padded = Buffer.alloc((encoded.length + 3) & ~3);
  padded.set(encoded);
  parts.push(padded);
  byteOffset += padded.length;
}
document.buffers = [
  { byteLength: byteOffset },
  {
    byteLength: binary.length,
    extensions: { [extension]: { fallback: true } },
  },
];
document.extensionsUsed = [...(document.extensionsUsed ?? []), extension];
document.extensionsRequired = [
  ...(document.extensionsRequired ?? []),
  extension,
];
const jsonBytes = Buffer.from(JSON.stringify(document));
const json = Buffer.alloc((jsonBytes.length + 3) & ~3, 32);
json.set(jsonBytes);
const packed = Buffer.concat(parts);
const header = Buffer.alloc(20);
header.write("glTF");
header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + json.length + packed.length, 8);
header.writeUInt32LE(json.length, 12);
header.writeUInt32LE(0x4e4f534a, 16);
const binaryHeader = Buffer.alloc(8);
binaryHeader.writeUInt32LE(packed.length);
binaryHeader.writeUInt32LE(0x004e4942, 4);
const output = Buffer.concat([header, json, binaryHeader, packed]);
await fs.writeFile(targetPath, output);
console.log(
  JSON.stringify({
    sourcePath,
    targetPath,
    originalBytes: source.length,
    packedBytes: output.length,
    originalGzipBytes: gzipSync(source).length,
    packedGzipBytes: gzipSync(output).length,
    byteExactBuffers: document.bufferViews.length,
  }),
);
