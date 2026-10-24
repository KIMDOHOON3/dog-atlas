// Screening selects review candidates. It does NOT detect all translated
// plagiarism or grant permission, and it never rewrites source text.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
const changes = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/editorial-rights-changes.json"),
    "utf8",
  ),
);
const byHash = new Map(changes.map((c) => [c.afterHash, c]));
const triage = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/editorial-manual-triage.json"),
    "utf8",
  ),
);
const triageByHash = new Map(triage.map((c) => [c.sha256, c]));
const needsReview = (u) =>
  u.flags.length &&
  ![
    "source-compared-and-rewritten",
    "retained-limited-facts-not-full-clearance",
  ].includes(u.review);
const units = new Map();
const files = [];
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
for (const file of (await walk(path.join(root, "src")))
  .filter((f) => /\.[jt]sx?$/.test(f) && !/\.(test|spec)\./.test(f))
  .sort()) {
  const text = await fs.readFile(file, "utf8");
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const ast = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  let count = 0;
  function visit(node) {
    if (
      ts.isStringLiteralLike(node) ||
      ts.isJsxText(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      const value = node.text.trim();
      if (
        /[가-힣]/.test(value) &&
        value.length >= 20 &&
        !/^https?:\/\//.test(value)
      ) {
        const hash = createHash("sha256").update(value).digest("hex");
        const entry = units.get(hash) ?? {
          sha256: hash,
          preview: value.slice(0, 180),
          characters: value.length,
          templateFragment:
            ts.isTemplateHead(node) ||
            ts.isTemplateMiddle(node) ||
            ts.isTemplateTail(node),
          locations: [],
          flags: [],
          review: byHash.has(hash)
            ? "source-compared-and-rewritten"
            : (triageByHash.get(hash)?.status ??
              "screened-source-comparison-pending"),
        };
        const chronology =
          value.match(/\b(?:1[0-9]{3}|20[0-9]{2})년?|\d{1,2}세기/g) ?? [];
        if (
          chronology.length >= 2 &&
          !entry.flags.includes("multiple-historical-dates")
        )
          entry.flags.push("multiple-historical-dates");
        if (
          /왕실|공작|대령|전람회|복원|멸종|교배/.test(value) &&
          chronology.length &&
          !entry.flags.includes("historical-sequence-review")
        )
          entry.flags.push("historical-sequence-review");
        if (value.length > 350 && !entry.flags.includes("long-passage-review"))
          entry.flags.push("long-passage-review");
        entry.locations.push({
          file: relative,
          line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1,
        });
        units.set(hash, entry);
        count++;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  files.push({ file: relative, textUnits: count });
}
const list = [...units.values()].sort((a, b) =>
  a.sha256.localeCompare(b.sha256),
);
const missingChanges = changes.filter((c) => !units.has(c.afterHash));
const missingTriage = triage.filter((c) => !units.has(c.sha256));
if (missingTriage.length)
  throw new Error(
    `Triaged text changed or missing: ${missingTriage.map((c) => c.slug + ":" + c.field).join(", ")}`,
  );
if (missingChanges.length)
  throw new Error(
    `Reviewed paragraphs changed or missing: ${missingChanges.map((c) => c.slug + ":" + c.field).join(", ")}`,
  );
const summary = {
  sourceFilesScanned: files.length,
  filesWithEditorialText: files.filter((f) => f.textUnits).length,
  uniqueTextUnits: list.length,
  candidateUnits: list.filter(needsReview).length,
  reviewedRewrittenTextUnits: changes.length,
  reviewedBreeds: new Set(changes.map((c) => c.slug)).size,
  retainedLimitedFactUnits: triage.filter(
    (c) => c.status === "retained-limited-facts-not-full-clearance",
  ).length,
  blockedSourceUnits: triage.filter((c) => c.status === "source-fetch-blocked")
    .length,
  note: "All source files screened for Korean literals/JSX/template fragments >=20 characters. Static fragments are not resolved sentences. No flag is a legal finding; unflagged text is not cleared. External-source comparison is limited to the recorded manual review.",
};
await fs.writeFile(
  path.join(root, "docs/audits/editorial-screening.json"),
  JSON.stringify({ summary, files, units: list }, null, 2) + "\n",
);
await fs.writeFile(
  path.join(root, "docs/audits/editorial-review-queue.json"),
  JSON.stringify(list.filter(needsReview), null, 2) + "\n",
);
console.log(JSON.stringify(summary, null, 2));
