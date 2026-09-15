// @vitest-environment node
import { afterAll, beforeAll, expect, it } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(
  new URL("./vercel-ignore-build.mjs", import.meta.url),
);
let repo;
let baseline;
const git = (...args) =>
  execFileSync("git", args, {
    cwd: repo,
    encoding: "utf8",
    stdio: "pipe",
  }).trim();
function commit(file, content) {
  const target = path.join(repo, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
  git("add", "--", file);
  git("commit", "-qm", "fixture");
  return git("rev-parse", "HEAD");
}
function run(previous, cwd = repo) {
  const result = spawnSync(process.execPath, [script], {
    cwd,
    env: { ...process.env, VERCEL_GIT_PREVIOUS_SHA: previous ?? "" },
    encoding: "utf8",
  });
  if (result.error) throw result.error;
  return { status: result.status, output: result.stdout };
}
beforeAll(() => {
  repo = mkdtempSync(path.join(tmpdir(), "dog-atlas-build-check-"));
  git("init", "-q");
  git("config", "user.name", "Build check");
  git("config", "user.email", "build-check@example.invalid");
  baseline = commit("src/app.ts", "export const value = 1;");
});
afterAll(() => {
  // Only remove the exact temporary fixture created by this suite.
  if (
    repo &&
    path.dirname(repo) === path.resolve(tmpdir()) &&
    path.basename(repo).startsWith("dog-atlas-build-check-")
  ) {
    rmSync(repo, { recursive: true, force: true });
  }
});

it("skips docs-only pushes, including consecutive unbuilt docs commits", () => {
  commit("docs/status.md", "status");
  commit("README.md", "read me");
  expect(run(baseline).status).toBe(0);
});
it("builds all code changes since the last success even when HEAD is docs-only", () => {
  commit("src/app.ts", "export const value = 2;");
  commit("docs/status.md", "new status");
  expect(run(baseline).status).toBe(1);
});
it("does not skip assets or deployment configuration", () => {
  let previous = git("rev-parse", "HEAD");
  commit("public/asset.webp", "fixture");
  expect(run(previous).status).toBe(1);
  previous = git("rev-parse", "HEAD");
  commit("vercel.json", "{}");
  expect(run(previous).status).toBe(1);
});
it("detects a runtime file moved into docs as an application deletion", () => {
  const previous = git("rev-parse", "HEAD");
  git("mv", "src/app.ts", "docs/app.ts");
  git("commit", "-qm", "move fixture");
  expect(run(previous).status).toBe(1);
});
it("allows first deploys, unavailable history and same-commit env redeploys", () => {
  expect(run().status).toBe(1);
  expect(run("f".repeat(40)).status).toBe(1);
  expect(run("--help").status).toBe(1);
  expect(run(git("rev-parse", "HEAD")).output).toContain(
    "same-commit redeploy",
  );
});
