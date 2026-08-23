import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { poodleDetail } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

describe("Poodle detail editorial data", () => {
  it("gives every story step one distinct image and keeps every file available", () => {
    const images = [
      ...poodleDetail.story.steps.map((step) => step.image),
      ...poodleDetail.sizes.map((size) => size.image),
      ...poodleDetail.realities.flatMap((reality) => reality.image ? [reality.image] : []),
    ];

    expect(images).toEqual([
      "/illustrations/v3/poodle-history.webp",
      "/illustrations/v4/poodle-feature-learning-retrieval.webp",
      "/illustrations/v5/poodle-daily-interaction.webp",
      "/illustrations/v6/poodle-size-toy.webp",
      "/illustrations/v6/poodle-size-miniature.webp",
      "/illustrations/v6/poodle-size-medium.webp",
      "/illustrations/v6/poodle-size-standard.webp",
      "/illustrations/v4/poodle-feature-coat-care.webp",
    ]);
    expect(new Set(images).size).toBe(images.length);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it("keeps the exposed copy concise and avoids growth-guide language", () => {
    const exposedCopy = [
      poodleDetail.heroStatement,
      poodleDetail.story.title,
      poodleDetail.story.description,
      ...poodleDetail.story.steps.flatMap((step) => [step.eyebrow, step.title, step.body]),
      poodleDetail.story.caution,
      ...poodleDetail.realities.flatMap((reality) => [reality.title, reality.body]),
      ...poodleDetail.readinessQuestions,
      ...Object.values(poodleDetail.relatedDifferences),
    ].join(" ");

    expect(exposedCopy.length).toBeGreaterThanOrEqual(700);
    expect(exposedCopy.length).toBeLessThanOrEqual(900);
    expect(exposedCopy).not.toMatch(/생후|예방접종|사회화|배변|월령|성장 단계/);
    expect(exposedCopy).not.toContain("지루함");
  });

  it("limits each body block to two sentences and keeps only direct Poodle sources", () => {
    const bodyBlocks = [
      poodleDetail.story.description,
      ...poodleDetail.story.steps.map((step) => step.body),
      poodleDetail.story.caution,
      ...poodleDetail.realities.map((reality) => reality.body),
      ...Object.values(poodleDetail.relatedDifferences),
    ];

    bodyBlocks.forEach((block) => {
      const sentenceCount = block.split(/[.!?](?:\s|$)/).filter(Boolean).length;
      expect(sentenceCount, block).toBeLessThanOrEqual(2);
    });
    expect(poodleDetail.sources.map((source) => source.organization)).toEqual([
      "Fédération Cynologique Internationale",
      "American Kennel Club",
      "American Kennel Club",
    ]);
  });
});
