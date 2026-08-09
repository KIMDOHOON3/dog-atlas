import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { breeds } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

describe("published breed visual assets", () => {
  it("maps all 367 published breeds to existing WebP card and history files", () => {
    expect(breeds).toHaveLength(367);

    const cardPaths = new Set<string>();
    const historyPaths = new Set<string>();
    const cardHashes = new Set<string>();
    const historyHashes = new Set<string>();

    for (const breed of breeds) {
      const assets = [breed.illustration, breed.historyVisual!.src];
      expect(assets.every((assetPath) => assetPath.endsWith(".webp"))).toBe(true);

      const cardPath = publicFile(breed.illustration);
      const historyPath = publicFile(breed.historyVisual!.src);
      expect(existsSync(cardPath)).toBe(true);
      expect(existsSync(historyPath)).toBe(true);

      const cardBytes = readFileSync(cardPath);
      const historyBytes = readFileSync(historyPath);
      expect(cardBytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
      expect(historyBytes.subarray(8, 12).toString("ascii")).toBe("WEBP");

      cardPaths.add(breed.illustration);
      historyPaths.add(breed.historyVisual!.src);
      cardHashes.add(createHash("sha256").update(cardBytes).digest("hex"));
      historyHashes.add(createHash("sha256").update(historyBytes).digest("hex"));
    }

    expect(cardPaths.size).toBe(367);
    expect(historyPaths.size).toBe(367);
    expect(cardHashes.size).toBe(367);
    expect(historyHashes.size).toBe(367);
  }, 30000);
});
