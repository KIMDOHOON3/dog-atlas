// Inventory coverage is not a legal clearance. No files are deleted by this audit.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { enrichProvenance } from "./rights-provenance.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const relative = (p) => path.relative(root, p).replaceAll("\\", "/");
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
const records = [];
for (const folder of ["design", "docs", "scripts"]) {
  for (const file of await walk(path.join(root, folder))) {
    if (
      !/\.(md|json|py|mjs)$/i.test(file) ||
      file.includes(`${path.sep}audits${path.sep}`)
    )
      continue;
    records.push({
      path: relative(file),
      text: await fs.readFile(file, "utf8"),
    });
  }
}
const assets = [];
for (const file of (await walk(path.join(root, "public"))).sort()) {
  if (
    !/\.(png|webp|jpg|jpeg|svg|avif|gif|glb|gltf|woff2?|ttf|otf)$/i.test(file)
  )
    continue;
  const buffer = await fs.readFile(file);
  const url =
    "/" + path.relative(path.join(root, "public"), file).replaceAll("\\", "/");
  const mentions = records
    .filter((r) => r.text.includes(url) || r.text.includes(path.basename(file)))
    .map((r) => r.path);
  assets.push({
    path: relative(file),
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    records: mentions,
    rightsStatus: mentions.length
      ? "record-found-permission-unverified"
      : "file-specific-record-missing",
  });
}
const require = createRequire(import.meta.url);
const testRequire = createRequire(require.resolve("vitest/package.json"));
const { createServer } = await import(
  pathToFileURL(testRequire.resolve("vite")).href
);
const server = await createServer({
  root,
  configFile: false,
  resolve: { alias: { "@": path.join(root, "src") } },
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
});
let content;
const editorialChanges = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/editorial-rights-changes.json"),
    "utf8",
  ),
);
const thirdPass = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/editorial-third-pass.json"),
    "utf8",
  ),
);
const careReview = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/care-review-2026-10-24.json"),
    "utf8",
  ),
);
const geneticReview = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/genetic-health-review-2026-10-24.json"),
    "utf8",
  ),
);
const geneticSecondReview = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/audits/genetic-health-second-review-2026-10-24.json"),
    "utf8",
  ),
);
const geneticEntries = [
  ...geneticReview.entries,
  ...geneticSecondReview.entries,
];
const reviewKey = (entry) => `${entry.surface}:${entry.slug}:${entry.field}`;
const activeCareEntries = careReview.entries.filter((entry) => {
  if (!entry.supersededBy) return true;
  const replacement = geneticReview.entries.find(
    (next) => reviewKey(next) === reviewKey(entry),
  );
  if (
    entry.supersededBy !== "genetic-health-review-2026-10-24" ||
    replacement?.beforeHash !== entry.sha256
  )
    throw new Error(`Invalid review replacement: ${reviewKey(entry)}`);
  return false;
});
try {
  const { breeds } = await server.ssrLoadModule("/src/content/breeds/data.ts");
  const { getAllAuthoredStandardBreedDetails, getAllStandardBreedDetails } =
    await server.ssrLoadModule("/src/content/standard-breed-detail/data.ts");
  const publishedSlugs = new Set(
    getAllStandardBreedDetails().map((detail) => detail.slug),
  );
  const surfaces = {
    breed: new Map(breeds.map((breed) => [breed.slug, breed])),
    standard: new Map(
      getAllAuthoredStandardBreedDetails().map((detail) => [
        detail.slug,
        detail,
      ]),
    ),
  };
  // Compare resolved data too: template fragments alone cannot prove that the
  // reviewed sentence is still attached to the intended breed and surface.
  const seen = new Set();
  for (const { entry, review } of [
    ...thirdPass.entries.map((entry) => ({ entry, review: thirdPass })),
    ...activeCareEntries.map((entry) => ({ entry, review: careReview })),
    ...geneticReview.entries.map((entry) => ({ entry, review: geneticReview })),
    ...geneticSecondReview.entries.map((entry) => ({
      entry,
      review: geneticSecondReview,
    })),
  ]) {
    const key = `${entry.surface}:${entry.slug}:${entry.field}`;
    if (seen.has(key)) throw new Error(`Duplicate editorial review: ${key}`);
    seen.add(key);
    if (
      typeof entry.publicStandard === "boolean" &&
      entry.publicStandard !== publishedSlugs.has(entry.slug)
    )
      throw new Error(`Reviewed publication status changed: ${key}`);
    const actual = entry.field
      .split(".")
      .reduce(
        (value, part) => value?.[part],
        surfaces[entry.surface]?.get(entry.slug),
      );
    if (
      typeof actual !== "string" ||
      actual !== entry.text ||
      createHash("sha256").update(actual).digest("hex") !== entry.sha256
    )
      throw new Error(`Reviewed resolved text changed or missing: ${key}`);
    for (const sourceKey of entry.sourceKeys ?? []) {
      const source = review.sources[sourceKey];
      const linked = surfaces.breed
        .get(entry.slug)
        ?.sources.some(
          (candidate) =>
            candidate.url === source?.url &&
            candidate.checkedAt === review.reviewedAt,
        );
      if (!source || !linked)
        throw new Error(`Care source missing: ${key}:${sourceKey}`);
    }
  }
  const { healthScreeningGuidance, getHealthScreeningSources } =
    await server.ssrLoadModule("/src/content/breeds/health-screening.ts");
  for (const entry of geneticReview.guidance) {
    const actual = healthScreeningGuidance[entry.field];
    if (
      actual !== entry.text ||
      createHash("sha256").update(actual).digest("hex") !== entry.sha256
    )
      throw new Error(`Screening guidance changed: ${entry.field}`);
    for (const slug of new Set(geneticEntries.map((entry) => entry.slug))) {
      for (const key of entry.sourceKeys) {
        const expected = geneticReview.sources[key];
        if (
          !expected ||
          !getHealthScreeningSources(slug).some(
            (source) =>
              source.url === expected.url &&
              source.checkedAt === geneticReview.reviewedAt,
          )
        )
          throw new Error(`Screening guidance source missing: ${slug}:${key}`);
      }
    }
  }
  await enrichProvenance(assets, breeds, records, root);
  // These batch documents describe newly made v4 scenes. Resolve the matching
  // data module to expand filenames, instead of mistaking {slug}/{id} for gaps.
  for (const record of records) {
    const match = record.path.match(
      /^docs\/image-prompts-(expansion-to-(?:200|300)-batch-\d{2})-\d{4}-\d{2}-\d{2}\.md$/,
    );
    if (!match || !/생성|제작/.test(record.text)) continue;
    const modulePath = `src/content/standard-breed-detail/${match[1]}-data.ts`;
    const contentModule = await server.ssrLoadModule(`/${modulePath}`);
    const urls = new Set();
    const collect = (value) => {
      if (
        typeof value === "string" &&
        /^\/illustrations\/v4\/.+-feature-.+\.webp$/.test(value)
      )
        urls.add(`public${value}`);
      else if (value && typeof value === "object")
        for (const child of Object.values(value)) collect(child);
    };
    for (const value of Object.values(contentModule)) collect(value);
    for (const asset of assets.filter((a) => urls.has(a.path))) {
      if (!asset.productionRecords.some((r) => r.record === record.path))
        asset.productionRecords.push({
          record: record.path,
          basis: "documented-scene-batch-resolved-from-module",
          module: modulePath,
        });
      if (!asset.creatorStatement)
        asset.provenanceStatus = "production-record-linked-permission-pending";
    }
  }
  content = breeds.map((b) => ({
    slug: b.slug,
    status: b.contentStatus,
    sources: b.sources,
    geneticHealthReview: geneticEntries
      .filter((entry) => entry.slug === b.slug)
      .map(({ surface, field, sha256, sourceKeys, publicStandard }) => ({
        surface,
        field,
        sha256,
        sourceKeys,
        ...(typeof publicStandard === "boolean" ? { publicStandard } : {}),
      })),
    careReview: careReview.entries
      .filter((entry) => entry.slug === b.slug)
      .map(
        ({
          surface,
          field,
          sha256,
          decision,
          sourceKeys,
          publicStandard,
          supersededBy,
        }) => ({
          surface,
          field,
          sha256,
          decision,
          sourceKeys,
          ...(typeof publicStandard === "boolean" ? { publicStandard } : {}),
          ...(supersededBy ? { supersededBy } : {}),
        }),
      ),
    thirdPassReview: thirdPass.entries
      .filter((entry) => entry.slug === b.slug)
      .map(
        ({ surface, field, sha256, source, supportingSources, decision }) => ({
          surface,
          field,
          sha256,
          source,
          supportingSources,
          decision,
        }),
      ),
    reviewedTextUnits: editorialChanges
      .filter((c) => c.slug === b.slug)
      .map(({ field, source, afterHash, reviewedAt }) => ({
        field,
        source,
        afterHash,
        reviewedAt,
      })),
    review: [
      "maltese",
      "shiba",
      "border-collie",
      "poodle",
      "labrador-retriever",
      "samoyed",
    ].includes(b.slug)
      ? "history-rewritten-2026-10-24-not-full-clearance"
      : b.slug === "bichon-frise"
        ? "previous-history-rewrite-rechecked"
        : editorialChanges.some((c) => c.slug === b.slug)
          ? "selected-paragraphs-rewritten-2026-10-24-not-full-clearance"
          : thirdPass.entries.some((entry) => entry.slug === b.slug)
            ? "selected-limited-facts-compared-2026-10-24-not-full-clearance"
            : "inventory-only-original-expression-review-pending",
  }));
} finally {
  await server.close();
}
const summary = {
  geneticHealthReviewedBreeds: new Set(
    geneticEntries.map((entry) => entry.slug),
  ).size,
  geneticHealthRewrittenUnits: geneticEntries.length,
  geneticHealthSecondBatchBreeds: new Set(
    geneticSecondReview.entries.map((entry) => entry.slug),
  ).size,
  geneticHealthPendingBreeds: content.filter(
    (breed) => !breed.geneticHealthReview.length,
  ).length,
  geneticHealthGuidanceUnits: geneticReview.guidance.length,
  careActiveResolvedTextUnits: activeCareEntries.length,
  careReviewedResolvedTextUnits: careReview.entries.length,
  careRewrittenUnits: careReview.entries.filter(
    (entry) => entry.decision === "rewritten",
  ).length,
  careRetainedUnits: careReview.entries.filter(
    (entry) => entry.decision === "retained-limited-review",
  ).length,
  thirdPassResolvedTextUnitsVerified: thirdPass.entries.length,
  thirdPassRewrittenUnits: thirdPass.entries.filter(
    (entry) => entry.decision === "rewritten",
  ).length,
  thirdPassRetainedUnits: thirdPass.entries.filter(
    (entry) => entry.decision === "retained-limited-facts-not-full-clearance",
  ).length,
  assets: assets.length,
  assetsWithRecordMentions: assets.filter((a) => a.records.length).length,
  assetsWithoutFileSpecificRecords: assets.filter((a) => !a.records.length)
    .length,
  breeds: content.length,
  breedsWithoutSources: content.filter((b) => !b.sources?.length).length,
  assetsWithProductionRecords: assets.filter((a) => a.productionRecords.length)
    .length,
  assetsWithBatchScopeRecords: assets.filter((a) =>
    a.productionRecords.some(
      (r) => r.basis === "breed-and-v4-scene-batch-scope",
    ),
  ).length,
  assetsWithGitTrace: assets.filter((a) => a.git).length,
  assetsUnchangedFromGitHead: assets.filter((a) => a.git?.matchesHeadBlob)
    .length,
  assetsWithoutProductionRecords: assets.filter(
    (a) => !a.productionRecords.length,
  ).length,
  assetsWithCreatorStatement: assets.filter((a) => a.creatorStatement).length,
  secondPassReviewedAssets: assets.filter((a) => a.secondPassReview).length,
  secondPassGenerationRecords: assets.filter((a) =>
    ["generation-manifest", "generation-note"].includes(
      a.secondPassReview?.kind,
    ),
  ).length,
  secondPassNewSceneNotes: assets.filter(
    (a) => a.secondPassReview?.kind === "new-scene-production-note",
  ).length,
  assetsWithoutProductionRecordOrCreatorStatement: assets.filter(
    (a) => !a.productionRecords.length && !a.creatorStatement,
  ).length,
  note: "Record mentions, creator testimony and source links do not establish permission. See docs/rights-followup-2026-10-24.md.",
};
await fs.mkdir(path.join(root, "docs/audits"), { recursive: true });
for (const [name, value] of Object.entries({
  "asset-rights-inventory": assets,
  "content-rights-inventory": content,
  "rights-summary": summary,
  "genetic-health-review-queue": content.map((breed) => ({
    slug: breed.slug,
    status: breed.geneticHealthReview.length
      ? "selected-claims-reviewed-not-full-clearance"
      : "pending-breed-specific-review",
    reviewedFields: breed.geneticHealthReview.map(
      ({ surface, field }) => `${surface}.${field}`,
    ),
    expertReviewed: false,
  })),
  "image-rights-followup-queue": assets
    .filter((a) => !a.productionRecords.length && !a.creatorStatement)
    .map((a) => ({
      path: a.path,
      sha256: a.sha256,
      mentions: a.records,
      latestGitRecord: a.git?.latest ?? null,
      nextCheck:
        "Locate original generation/export record; confirm provider terms and reference-input rights. Git trace alone is not permission.",
    })),
})) {
  await fs.writeFile(
    path.join(root, `docs/audits/${name}.json`),
    JSON.stringify(value, null, 2) + "\n",
  );
}
console.log(JSON.stringify(summary, null, 2));
