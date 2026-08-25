import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreed } from "@/content/breeds/data";
import { japaneseSpitzDetail } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

describe("standard breed detail editorial data", () => {
  it("keeps every Japanese Spitz story and reality image distinct and available", () => {
    const images = [
      ...japaneseSpitzDetail.story.steps.map((step) => step.image),
      ...japaneseSpitzDetail.realities.map((reality) => reality.image),
    ];

    expect(new Set(images).size).toBe(images.length);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it("keeps body blocks concise and avoids generic puppy-care or verdict copy", () => {
    const bodyBlocks = [
      japaneseSpitzDetail.story.description,
      ...japaneseSpitzDetail.story.steps.map((step) => step.body),
      japaneseSpitzDetail.story.caution,
      ...japaneseSpitzDetail.realities.map((reality) => reality.body),
      ...Object.values(japaneseSpitzDetail.relatedDifferences),
    ];
    const exposedCopy = [
      japaneseSpitzDetail.heroStatement,
      japaneseSpitzDetail.story.title,
      ...bodyBlocks,
      ...japaneseSpitzDetail.readinessQuestions,
    ].join(" ");

    bodyBlocks.forEach((block) => {
      const sentenceCount = block.split(/[.!?](?:\s|$)/).filter(Boolean).length;
      expect(sentenceCount, block).toBeLessThanOrEqual(2);
    });
    expect(exposedCopy).not.toMatch(/예방접종|배변|월령|성장 단계|추천 견종|잘 맞는 견종/);
  });

  it("links only existing related breeds and retains internal source data", () => {
    Object.keys(japaneseSpitzDetail.relatedDifferences).forEach((slug) => expect(getBreed(slug)).toBeDefined());
    expect(getBreed("japanese-spitz")?.sources.length).toBeGreaterThanOrEqual(2);
  });
});
