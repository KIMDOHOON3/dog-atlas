import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";

// Git chronology is traceability, never evidence of permission by itself.
export function readAssetHistory(root) {
  const log = execFileSync(
    "git",
    [
      "-c",
      "core.quotepath=false",
      "log",
      "--no-renames",
      "--format=@@%H|%cs|%s",
      "--name-only",
      "--diff-filter=AM",
      "HEAD",
      "--",
      "public",
      "docs",
      "design",
      "scripts",
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
  );
  const commits = [];
  let current;
  for (const line of log.split(/\r?\n/)) {
    if (line.startsWith("@@")) {
      const [commit, date, ...subject] = line.slice(2).split("|");
      current = { commit, date, subject: subject.join("|"), files: [] };
      commits.push(current);
    } else if (line && current) current.files.push(line);
  }
  const history = new Map();
  for (const c of commits)
    for (const file of c.files.filter((f) => f.startsWith("public/"))) {
      const entry = {
        commit: c.commit,
        date: c.date,
        subject: c.subject,
        relatedRecords: c.files.filter(
          (f) =>
            /^(docs|design|scripts)\//.test(f) && /\.(md|json|py|mjs)$/.test(f),
        ),
      };
      const previous = history.get(file);
      history.set(file, {
        latest: previous?.latest ?? entry,
        earliestObserved: entry,
      });
    }
  const tree = execFileSync(
    "git",
    ["-c", "core.quotepath=false", "ls-tree", "-r", "HEAD", "--", "public"],
    { cwd: root, encoding: "utf8" },
  );
  const blobs = new Map(
    tree
      .trim()
      .split(/\r?\n/)
      .map((line) => {
        const [meta, file] = line.split("\t");
        return [file, meta.split(" ")[2]];
      }),
  );
  return { history, blobs };
}

export async function enrichProvenance(assets, breeds, records, root) {
  const { history, blobs } = readAssetHistory(root);
  const attested = new Map();
  for (const record of [
    "docs/audits/image-origin-attestation.json",
    "docs/audits/image-origin-attestation-second-pass.json",
  ]) {
    const attestation = JSON.parse(await fs.readFile(`${root}/${record}`, "utf8"));
    for (const asset of attestation.assets) {
      if (attested.has(asset.path)) throw new Error(`Duplicate attested image: ${asset.path}`);
      attested.set(asset.path, { sha256: asset.sha256, date: attestation.date, record });
    }
  }
  const secondPass = JSON.parse(
    await fs.readFile(`${root}/docs/audits/image-second-pass-evidence.json`, "utf8"),
  );
  const recovered = new Map(secondPass.assets.map((a) => [a.path, a]));
  const assetPaths = new Set(assets.map((a) => a.path));
  if (recovered.size !== secondPass.assets.length ||
      secondPass.assets.some((a) => !assetPaths.has(a.path)))
    throw new Error("Second-pass image evidence has duplicate or missing assets");
  const evidenceTexts = new Map();
  for (const entry of secondPass.assets) {
    const evidence = entry.productionEvidence;
    if (!evidence) continue;
    const key = `${evidence.commit ?? "working-tree"}:${evidence.record}`;
    if (!evidenceTexts.has(key)) {
      evidenceTexts.set(key, evidence.commit
        ? execFileSync("git", ["show", `${evidence.commit}:${evidence.record}`], {
            cwd: root, encoding: "utf8", maxBuffer: 8 * 1024 * 1024,
          })
        : await fs.readFile(`${root}/${evidence.record}`, "utf8"));
    }
    const text = evidenceTexts.get(key);
    if ((evidence.excerpt && !text.includes(evidence.excerpt)) ||
        (evidence.recordSha256 && createHash("sha256").update(text).digest("hex") !== evidence.recordSha256)) {
      throw new Error(`Image provenance evidence changed: ${entry.path}`);
    }
  }
  const ordered = [...breeds].sort((a, b) => b.slug.length - a.slug.length);
  for (const asset of assets) {
    const basename = asset.path.split("/").at(-1);
    const breed = ordered.find((b) => basename.startsWith(b.slug + "-"));
    const buffer = await fs.readFile(`${root}/${asset.path}`);
    const gitHash = createHash("sha1")
      .update(`blob ${buffer.length}\0`)
      .update(buffer)
      .digest("hex");
    asset.git = history.has(asset.path)
      ? {
          ...history.get(asset.path),
          matchesHeadBlob: blobs.get(asset.path) === gitHash,
        }
      : null;
    asset.productionRecords = asset.records
      .filter((p) =>
        /image-prompts|prompts\.json|scripts\/generate-|design\/yard-blender/.test(
          p,
        ),
      )
      .map((record) => ({ record, basis: "explicit-file-mention" }));
    // Only v4 scene batches whose recorded scope explicitly names the breed.
    // Do not infer ownership of the older v2/v3 reference images from reuse.
    if (breed && /\/v4\/.+-feature-.+\.webp$/.test(asset.path)) {
      for (const record of records) {
        if (
          !record.path.startsWith("docs/image-prompts-") ||
          !/v4/.test(record.text) ||
          !/\{slug\}.*feature|생활 장면|장면 설계/.test(record.text)
        )
          continue;
        const tableName = record.text.includes(`| ${breed.nameKo} |`);
        const namedSlug = record.text.includes("`" + breed.slug + "`");
        const bulletName = record.text
          .split(/\r?\n/)
          .some((line) => line.trim() === `- ${breed.nameKo}`);
        if (!(tableName || namedSlug || bulletName)) continue;
        if (!asset.productionRecords.some((r) => r.record === record.path))
          asset.productionRecords.push({
            record: record.path,
            basis: "breed-and-v4-scene-batch-scope",
          });
      }
    }
    const reviewed = recovered.get(asset.path);
    if (reviewed) {
      if (reviewed.sha256 !== asset.sha256)
        throw new Error(`Reviewed image changed: ${asset.path}`);
      asset.secondPassReview = {
        record: "docs/audits/image-second-pass-evidence.json",
        kind: reviewed.reviewKind,
        reviewedAt: reviewed.reviewedAt,
      };
      if (reviewed.productionEvidence) {
        const { record, basis, commit } = reviewed.productionEvidence;
        if (commit && (asset.git?.latest.commit !== commit || !asset.git.matchesHeadBlob))
          throw new Error(`Historical image mapping changed: ${asset.path}`);
        asset.productionRecords.push({ record, basis, ...(commit ? { commit } : {}) });
      }
    }
    asset.provenanceStatus = asset.productionRecords.length
      ? "production-record-linked-permission-pending"
      : asset.records.length
        ? "mentioned-only"
        : asset.git
          ? "git-trace-only"
          : "untraced";
    asset.creatorStatement =
      attested.get(asset.path)?.sha256 === asset.sha256
        ? {
            record: attested.get(asset.path).record,
            date: attested.get(asset.path).date,
            basis: "user-confirmed-new-ai-generation-current-hash",
          }
        : null;
    if (asset.creatorStatement)
      asset.provenanceStatus = "user-confirmed-ai-origin-permission-pending";
    asset.permissionStatus = "not-cleared-by-inventory";
  }
}
