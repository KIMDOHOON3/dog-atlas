import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreed } from "@/content/breeds/data";
import { familiarKoreaBreeds } from "@/content/familiar-korea-breeds";
import { getAllStandardBreedDetails, getStandardBreedDetail } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

describe("standard breed detail editorial data", () => {
  const details = getAllStandardBreedDetails();

  it("covers every Korea-familiar breed through the standard detail or Poodle module", () => {
    familiarKoreaBreeds.forEach((entry) => {
      expect(entry.slug === "poodle" || getStandardBreedDetail(entry.slug), entry.slug).toBeTruthy();
    });
  });

  it("gives each newly standardized familiar breed its own daily-reality heading", () => {
    const dedicatedSlugs = new Set(["poodle", "maltese", "bichon-frise", "japanese-spitz"]);
    const titles = familiarKoreaBreeds
      .filter((entry) => !dedicatedSlugs.has(entry.slug))
      .map((entry) => getStandardBreedDetail(entry.slug)?.story.steps[2].title);

    expect(titles).toHaveLength(28);
    expect(titles).not.toContain("외형만으로는 매일 필요한 준비를 알 수 없어요.");
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("keeps present-day work profiles limited to breeds with direct official sources", () => {
    const workProfiles = details.filter((detail) => detail.modernWork);

    expect(workProfiles.map((detail) => detail.slug).sort()).toEqual([
      "dobermann",
      "german-shepherd-dog",
      "golden-retriever",
      "labrador-retriever",
    ]);
    workProfiles.forEach((detail) => {
      detail.modernWork?.roles.forEach((role) => {
        expect(role.sourceUrls.length).toBeGreaterThan(0);
        role.sourceUrls.forEach((url) => expect(url).toMatch(/^https:\/\//));
      });
      expect(detail.modernWork?.caution).toMatch(/모든|보증|동일|뜻하지/);
    });
  });

  it.each(details)("keeps every $nameKo story and reality image distinct and available", (detail) => {
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];

    expect(new Set(images).size).toBe(images.length);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each(details)("keeps $nameKo body blocks concise and avoids generic puppy-care or verdict copy", (detail) => {
    const bodyBlocks = [
      detail.story.description,
      ...detail.story.steps.map((step) => step.body),
      detail.story.caution,
      ...(detail.modernWork?.roles.map((role) => role.body) ?? []),
      ...(detail.modernWork ? [detail.modernWork.caution] : []),
      ...detail.realities.map((reality) => reality.body),
      ...Object.values(detail.relatedDifferences),
    ];
    const exposedCopy = [
      detail.heroStatement,
      detail.story.title,
      ...bodyBlocks,
      ...detail.readinessQuestions,
    ].join(" ");

    bodyBlocks.forEach((block) => {
      const sentenceCount = block.split(/[.!?](?:\s|$)/).filter(Boolean).length;
      expect(sentenceCount, block).toBeLessThanOrEqual(2);
    });
    expect(exposedCopy).not.toMatch(/예방접종|배변|월령|성장 단계|추천 견종|잘 맞는 견종/);
  });

  it.each(details)("links only existing related breeds and retains $nameKo internal source data", (detail) => {
    Object.keys(detail.relatedDifferences).forEach((slug) => expect(getBreed(slug)).toBeDefined());
    expect(getBreed(detail.slug)?.sources.length).toBeGreaterThanOrEqual(2);
  });
});
