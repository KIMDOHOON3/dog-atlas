// Runs before dependencies are installed. Vercel: 0 = skip, 1 = build.
import { execFileSync } from "node:child_process";

const build = (reason) => {
  console.log(`[build check] Build: ${reason}`);
  process.exitCode = 1;
};

const documentationOnly = (file) =>
  file.startsWith("docs/") || file === "README.md" || file === "AGENTS.md";

function check() {
  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
  // Never fall back to HEAD^: a push can contain code followed by docs commits.
  if (!previous || !/^(?:[a-f\d]{40}|[a-f\d]{64})$/i.test(previous)) {
    return build("no reliable previous successful deployment");
  }
  const git = (...args) =>
    execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 10000,
      maxBuffer: 4 * 1024 * 1024,
    });
  try {
    const current = git("rev-parse", "HEAD").trim();
    // Same-commit redeploys may be applying environment/settings changes.
    if (current === previous) return build("same-commit redeploy");
    git("merge-base", "--is-ancestor", previous, current);
    const changed = git(
      "diff",
      "--name-only",
      "--no-renames",
      "-z",
      previous,
      current,
      "--",
    )
      .split("\0")
      .filter(Boolean);
    if (!changed.length)
      return build("no file changes; allow explicit redeploy");
    if (!changed.every(documentationOnly)) {
      return build("application, assets, configuration or other files changed");
    }
    console.log(
      `[build check] Skip: ${changed.length} documentation files only`,
    );
    process.exitCode = 0;
  } catch {
    // Missing shallow history, git failures and timeouts must not block shipping.
    build("comparison unavailable");
  }
}

check();
