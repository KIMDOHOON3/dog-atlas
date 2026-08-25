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
    const everydayProfiles = details.filter((detail) => !detail.modernWork);

    expect(workProfiles.map((detail) => detail.slug).sort()).toEqual([
      "dobermann",
      "german-shepherd-dog",
      "golden-retriever",
      "labrador-retriever",
    ]);
    workProfiles.forEach((detail) => {
      expect(detail.story.steps).toHaveLength(4);
      expect(detail.story.steps[3]).toEqual(detail.modernWork?.storyStep);
      expect(detail.story.steps[3].navLabel).toBe("현재의 역할");
      detail.modernWork?.roles.forEach((role) => {
        expect(role.sourceUrls.length).toBeGreaterThan(0);
        role.sourceUrls.forEach((url) => expect(url).toMatch(/^https:\/\//));
      });
      expect(detail.modernWork?.caution).toMatch(/모든|보증|동일|뜻하지/);
    });
    everydayProfiles.forEach((detail) => expect(detail.story.steps).toHaveLength(3));
  });

  it("uses Pomeranian-specific copy instead of all German Spitz varieties", () => {
    const detail = getStandardBreedDetail("german-spitz")!;
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body])].join(" ");

    expect(copy).toContain("포메라이언");
    expect(copy).not.toMatch(/울프스피츠|다섯 바라이어티|55cm/u);
    expect(detail.story.steps[1].image).toBe("/illustrations/v4/german-spitz-feature-cooperative-play.webp");
  });

  it("explains Jindo relationship and distance without an opaque one-person-dog phrase", () => {
    const detail = getStandardBreedDetail("korea-jindo-dog")!;

    expect(detail.heroStatement).toContain("스스로 거리를");
    expect(detail.story.steps[2].body).toContain("개체마다 다르게");
    expect(detail.story.steps[2].body).not.toContain("한 사람만 따른다");
  });

  it("separates Dachshund history from present alerting and provides three selectable sizes", () => {
    const detail = getStandardBreedDetail("dachshund")!;

    expect(detail.story.steps[0].title).toContain("굴속");
    expect(detail.story.steps[1].title).toContain("보호자를 확인");
    expect(detail.story.steps[1].image).toBe("/illustrations/v6/dachshund-present-alerting.webp");
    expect(detail.sizeVarieties?.summary).toContain("가슴둘레");
    expect(detail.sizeVarieties?.items.map((item) => item.label)).toEqual(["래빗", "미니어처", "스탠더드"]);
    expect(detail.realities[1].id).toBe("size-varieties");
    detail.sizeVarieties?.items.forEach((item) => expect(existsSync(publicFile(item.image)), item.image).toBe(true));
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
