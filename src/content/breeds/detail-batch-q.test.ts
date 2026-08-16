import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { breeds } from "./data";
import { detailBatchQ } from "./detail-batch-q";

describe("detail batch Q", () => {
  it("publishes the Mongolian Bankhar landrace detail", () => {
    expect(detailBatchQ.map((breed) => breed.slug)).toEqual(["mongolian-bankhar"]);
    expect(breeds).toHaveLength(375);
    expect(detailBatchQ[0].identity.lineage).toContain("랜드레이스");
  });

  it("uses distinct local WebP visuals", () => {
    const breed = detailBatchQ[0];
    for (const assetPath of [breed.illustration, breed.historyVisual?.src]) {
      expect(assetPath).toBeTruthy();
      expect(assetPath?.endsWith(".webp")).toBe(true);
      expect(fs.existsSync(path.join(process.cwd(), "public", assetPath!))).toBe(true);
    }
  });
});
