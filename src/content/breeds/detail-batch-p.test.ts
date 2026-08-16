import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchP } from "./detail-batch-p";
import { getMasterBreed } from "./master-catalog";

describe("detail batch P mapping", () => {
  it("publishes both UKC non-FCI catalog entries", () => {
    expect(detailBatchP.map((breed) => breed.slug)).toEqual([
      "american-pit-bull-terrier",
      "american-bully",
    ]);
    expect(breeds).toHaveLength(373);
    for (const breed of detailBatchP) {
      expect(getMasterBreed(breed.slug)?.detailStatus).toBe("published");
      expect(breed.sources[0].organization).toBe("United Kennel Club");
    }
  });

  it("uses distinct local WebP card and history assets", () => {
    const hashes = new Set<string>();
    for (const breed of detailBatchP) {
      for (const assetPath of [breed.illustration, breed.historyVisual!.src]) {
        const filePath = join(process.cwd(), "public", assetPath.slice(1));
        expect(existsSync(filePath)).toBe(true);
        const bytes = readFileSync(filePath);
        expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
        hashes.add(createHash("sha256").update(bytes).digest("hex"));
      }
    }
    expect(hashes.size).toBe(4);
  });
});
