// Input: pnpm licenses list --prod --json > tmp/runtime-licenses.json
import fs from "node:fs/promises";
import path from "node:path";
const groups = JSON.parse(
  await fs.readFile(process.argv[2] ?? "tmp/runtime-licenses.json", "utf8"),
);
const packages = Object.values(groups)
  .flat()
  .sort((a, b) => a.name.localeCompare(b.name));
const output = [
  "Dog Atlas — third-party software notices",
  "Generated from installed production dependencies. These notices apply to the named software, not the site's editorial content or artwork.",
];
const missing = [];
for (const pkg of packages) {
  const folder = pkg.paths[0];
  const entries = await fs.readdir(folder, { withFileTypes: true });
  const files = entries
    .filter(
      (e) =>
        e.isFile() &&
        /^(licen[cs]e|copying|notice|copyright)([.-]|$)/i.test(e.name),
    )
    .map((e) => e.name);
  for (const dir of entries.filter(
    (e) => e.isDirectory() && /^(licenses?|notices?)$/i.test(e.name),
  )) {
    for (const name of await fs.readdir(path.join(folder, dir.name))) {
      if ((await fs.stat(path.join(folder, dir.name, name))).isFile())
        files.push(path.join(dir.name, name));
    }
  }
  output.push(
    `\n${"=".repeat(72)}\n${pkg.name} ${pkg.versions.join(", ")}\nLicense: ${pkg.license}\nProject: ${pkg.homepage ?? "See npm package metadata"}`,
  );
  if (!files.length) {
    const upstream = pkg.name.startsWith("@next/")
      ? "node_modules/next/license.md"
      : ["client-only", "server-only"].includes(pkg.name)
        ? "node_modules/react/LICENSE"
        : null;
    if (upstream)
      output.push(
        `\n--- Upstream project license (package omits standalone text) ---\n${await fs.readFile(upstream, "utf8")}`,
      );
    else missing.push(pkg.name);
  }
  for (const file of files.sort())
    output.push(
      `\n--- ${file.replaceAll("\\", "/")} ---\n${await fs.readFile(path.join(folder, file), "utf8")}`,
    );
}
async function bundledNotices(folder) {
  for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) await bundledNotices(file);
    else if (/^(licen[cs]e|copying|notice)([.-]|$)/i.test(entry.name))
      output.push(
        `\n--- Bundled in Next.js: ${file.replaceAll("\\", "/").replace("node_modules/next/", "")} ---\n${await fs.readFile(file, "utf8")}`,
      );
  }
}
await bundledNotices("node_modules/next/dist/compiled");
// Three.js bundles this decoder separately from Three's own MIT license.
output.push(
  `\n--- Meshoptimizer decoder bundled in Three.js ---\n${await fs.readFile("node_modules/meshoptimizer/LICENSE.md", "utf8")}`,
);
if (missing.length)
  throw new Error(`License text missing: ${missing.join(", ")}`);
await fs.writeFile("public/THIRD_PARTY_NOTICES.txt", output.join("\n") + "\n");
console.log(
  JSON.stringify({ packages: packages.length, licenses: Object.keys(groups) }),
);
