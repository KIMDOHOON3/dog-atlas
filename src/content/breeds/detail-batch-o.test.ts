import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchO, detailBatchOSlugs } from "./detail-batch-o";
import { getMasterBreed } from "./master-catalog";

describe("detail batch O mapping", () => {
  it("adds exactly sixty-five unique breeds, including Korean native breeds", () => {
    expect(detailBatchOSlugs).toHaveLength(65);
    expect(new Set(detailBatchOSlugs).size).toBe(65);
    expect(detailBatchOSlugs).toEqual(expect.arrayContaining(["sapsaree", "pungsan-dog", "donggyeongi", "jeju-dog"]));
    for (const slug of detailBatchOSlugs) expect(getMasterBreed(slug)).toBeDefined();
  });

  it("publishes each breed and resolves related links", () => {
    const publishedSlugs = new Set(breeds.map((breed) => breed.slug));
    for (const breed of detailBatchO) {
      expect(publishedSlugs.has(breed.slug)).toBe(true);
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      for (const relation of breed.related) expect(publishedSlugs.has(relation.slug)).toBe(true);
    }
  });

  it("maps every card and history scene to a WebP file", () => {
    for (const breed of detailBatchO) {
      for (const assetPath of [breed.illustration, breed.historyVisual!.src]) {
        expect(assetPath).toMatch(/\.webp$/);
        const filePath = join(process.cwd(), "public", assetPath.slice(1));
        expect(existsSync(filePath)).toBe(true);
        expect(readFileSync(filePath).subarray(8, 12).toString("ascii")).toBe("WEBP");
      }
    }
  });

  it("uses a distinct card and history image for every added breed", () => {
    const cardHashes = new Set<string>();
    const historyHashes = new Set<string>();

    for (const breed of detailBatchO) {
      const cardPath = join(process.cwd(), "public", breed.illustration.slice(1));
      const historyPath = join(process.cwd(), "public", breed.historyVisual!.src.slice(1));
      cardHashes.add(createHash("sha256").update(readFileSync(cardPath)).digest("hex"));
      historyHashes.add(createHash("sha256").update(readFileSync(historyPath)).digest("hex"));
    }

    expect(cardHashes.size).toBe(detailBatchO.length);
    expect(historyHashes.size).toBe(detailBatchO.length);
  });
});
