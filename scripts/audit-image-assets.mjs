// Read-only audit. Resolve authored content as well as literal paths so dynamic
// filenames and paused detail drafts are protected before any manual cleanup.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// Use the Vite already installed with Vitest (also works with pnpm's isolated dependencies).
const testRequire = createRequire(require.resolve("vitest/package.json"));
const { createServer } = await import(pathToFileURL(testRequire.resolve("vite")).href);
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
const references = new Map();
const imagePattern = /\/(?:illustrations|images)\/[^\s"'`<>)}]+?\.(?:webp|png|jpg|jpeg|svg|avif|gif)(?=[?#\s"'`<>)}]|$)/gi;

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(target) : [target];
  }))).flat();
}

function collectString(value, origin) {
  for (const match of value.matchAll(imagePattern)) {
    if (match[0].includes("${")) continue;
    const origins = references.get(match[0]) ?? new Set();
    origins.add(origin);
    references.set(match[0], origins);
  }
}

function collectData(value, origin, seen = new WeakSet()) {
  if (typeof value === "string") return collectString(value, origin);
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) collectData(item, origin, seen);
  } else if (value instanceof Map || value instanceof Set) {
    for (const item of value.values()) collectData(item, origin, seen);
  } else if (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null) {
    for (const item of Object.values(value)) collectData(item, origin, seen);
  }
}

const sourceFiles = await filesUnder(path.join(root, "src"));
for (const file of sourceFiles) {
  if (!/\.(?:ts|tsx|css|json)$/.test(file)) continue;
  const source = await readFile(file, "utf8");
  const origin = path.relative(root, file).replaceAll("\\", "/");
  if (/\.tsx?$/.test(file)) {
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const visit = (node) => {
      if (ts.isStringLiteralLike(node)) collectString(node.text, origin);
      ts.forEachChild(node, visit);
    };
    visit(ast);
  } else {
    collectString(source, origin);
  }
}

const server = await createServer({
  root,
  configFile: false,
  resolve: { alias: { "@": path.join(root, "src") } },
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
});
try {
  for (const file of sourceFiles) {
    if (!file.includes(`${path.sep}content${path.sep}`) || !file.endsWith(".ts") || /\.(?:test|spec)\.ts$/.test(file)) continue;
    const origin = path.relative(root, file).replaceAll("\\", "/");
    const contentModule = await server.ssrLoadModule(`/${origin}`);
    for (const value of Object.values(contentModule)) collectData(value, `evaluated:${origin}`);
  }
  const { breeds } = await server.ssrLoadModule("/src/content/breeds/data.ts");
  const { getBreedCardImage } = await server.ssrLoadModule("/src/lib/breed-image-assets.ts");
  for (const breed of breeds) collectString(getBreedCardImage(breed.slug), "runtime:getBreedCardImage");
} finally {
  await server.close();
}

const assets = [];
for (const file of await filesUnder(path.join(root, "public"))) {
  if (!/\.(?:webp|png|jpg|jpeg|svg|avif|gif)$/i.test(file)) continue;
  const url = `/${path.relative(path.join(root, "public"), file).replaceAll("\\", "/")}`;
  assets.push({ path: `public${url}`, bytes: (await stat(file)).size, references: [...(references.get(url) ?? [])] });
}
assets.sort((a, b) => a.path.localeCompare(b.path));
const unused = assets.filter((asset) => asset.references.length === 0);
console.log(JSON.stringify({
  total: assets.length,
  totalBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
  referenced: assets.length - unused.length,
  unusedCount: unused.length,
  unusedBytes: unused.reduce((sum, asset) => sum + asset.bytes, 0),
  unused,
}, null, 2));
