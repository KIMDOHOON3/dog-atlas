import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreed } from "../breeds/data";
import { breedGrowthGuides, getBreedGrowthGuide } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

function readVp8Dimensions(bytes: Buffer) {
  expect(bytes.subarray(12, 16).toString("ascii")).toBe("VP8 ");
  return {
    width: bytes.readUInt16LE(26) & 0x3fff,
    height: bytes.readUInt16LE(28) & 0x3fff,
  };
}

describe("breed growth guides", () => {
  it("starts with one reversible Poodle pilot", () => {
    expect(breedGrowthGuides.map((guide) => guide.slug)).toEqual(["poodle"]);
    expect(getBreedGrowthGuide("poodle")?.stages).toHaveLength(3);
    expect(getBreed("poodle")?.historyVisibility).toBe("hidden");
  });

  it("keeps three optimized 1200 by 900 WebP stage portraits", () => {
    for (const stage of getBreedGrowthGuide("poodle")!.stages) {
      const filePath = publicFile(stage.image);
      expect(existsSync(filePath), stage.image).toBe(true);
      expect(statSync(filePath).size, stage.image).toBeLessThanOrEqual(700_000);
      const bytes = readFileSync(filePath);
      expect(bytes.subarray(8, 12).toString("ascii"), stage.image).toBe("WEBP");
      expect(readVp8Dimensions(bytes), stage.image).toEqual({ width: 1200, height: 900 });
    }
  });

  it("keeps age ranges advisory and links multiple primary sources", () => {
    const guide = getBreedGrowthGuide("poodle")!;
    expect(guide.medicalNote).toContain("넓은 범위");
    expect(guide.medicalNote).toContain("담당 수의사");
    expect(guide.sources).toHaveLength(3);
    expect(new Set(guide.sources.map((source) => source.organization)).size).toBe(3);
  });
});
