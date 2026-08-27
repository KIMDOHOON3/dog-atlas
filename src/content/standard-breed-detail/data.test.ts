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

  it.each(details)("keeps $nameKo hero and three-stage headings distinct", (detail) => {
    const stageTitles = detail.story.steps.slice(0, 3).map((step) => step.title);

    expect(stageTitles).not.toContain(detail.heroStatement);
    expect(new Set(stageTitles).size).toBe(stageTitles.length);
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
    expect(detail.realities[1].body).toContain("예상 성견 크기");
    expect(detail.realities[1].body).not.toContain("FCI");
    detail.sizeVarieties?.items.forEach((item) => expect(existsSync(publicFile(item.image)), item.image).toBe(true));
  });

  it("connects Yorkshire Terrier history, present exploration, and rest without carrying copy", () => {
    const detail = getStandardBreedDetail("yorkshire-terrier")!;
    const storyCopy = detail.story.steps.slice(0, 3).flatMap((step) => [step.title, step.body]).join(" ");

    expect(detail.story.steps[0].title).toContain("소형 테리어");
    expect(detail.story.steps[1].title).toContain("움직임과 냄새");
    expect(detail.story.steps[2].title).toContain("편안히 쉬는");
    expect(detail.realities[0].title).toContain("안전한 길");
    expect(storyCopy).not.toContain("안아");
  });

  it("adds Greyhound as the first standard detail beyond the Korea-familiar set", () => {
    const detail = getStandardBreedDetail("greyhound")!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === "greyhound")).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual([
      "/illustrations/v3/greyhound-history.webp",
      "/illustrations/v4/greyhound-feature-visual-tracking.webp",
      "/illustrations/v4/greyhound-feature-sprint-rest.webp",
    ]);
    expect(detail.realities.map((reality) => reality.image)).toEqual([
      "/illustrations/v4/greyhound-feature-independent-rest.webp",
      "/illustrations/v4/greyhound-feature-cold-weather.webp",
    ]);
    expect(Object.keys(detail.relatedDifferences)).toEqual(["whippet", "italian-sighthound"]);
  });

  it("adds Whippet as the next standard detail beyond the Korea-familiar set", () => {
    const detail = getStandardBreedDetail("whippet")!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === "whippet")).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual([
      "/illustrations/v3/whippet-history.webp",
      "/illustrations/v4/whippet-feature-visual-tracking.webp",
      "/illustrations/v4/whippet-feature-sprint-recovery.webp",
    ]);
    expect(detail.realities.map((reality) => reality.image)).toEqual([
      "/illustrations/v4/whippet-feature-warm-rest.webp",
      "/illustrations/v4/whippet-feature-cold-weather.webp",
    ]);
    expect(detail.story.steps[0].body).toContain("직선 경주");
    expect(Object.keys(detail.relatedDifferences)).toEqual(["greyhound", "italian-sighthound"]);
  });

  it.each([
    {
      slug: "pyrenean-mountain-dog",
      storyImages: [
        "/illustrations/v3/pyrenean-mountain-dog-history.webp",
        "/illustrations/v4/pyrenean-mountain-dog-feature-independent-watch.webp",
        "/illustrations/v4/pyrenean-mountain-dog-feature-night-alert.webp",
      ],
      realityImages: [
        "/illustrations/v4/pyrenean-mountain-dog-feature-giant-scale.webp",
        "/illustrations/v4/pyrenean-mountain-dog-feature-double-coat-care.webp",
      ],
    },
    {
      slug: "basenji",
      storyImages: [
        "/illustrations/v3/basenji-history.webp",
        "/illustrations/v4/basenji-feature-tracking-safety.webp",
        "/illustrations/v4/basenji-feature-vocal-expression.webp",
      ],
      realityImages: [
        "/illustrations/v4/basenji-feature-choice-search.webp",
        "/illustrations/v4/basenji-feature-cold-weather.webp",
      ],
    },
    {
      slug: "bernese-mountain-dog",
      storyImages: [
        "/illustrations/v3/bernese-mountain-dog-history.webp",
        "/illustrations/v4/bernese-mountain-dog-feature-shared-task.webp",
        "/illustrations/v4/bernese-mountain-dog-feature-controlled-strength.webp",
      ],
      realityImages: [
        "/illustrations/v4/bernese-mountain-dog-feature-tricolor-coat-care.webp",
        "/illustrations/v4/bernese-mountain-dog-feature-vehicle-access.webp",
      ],
    },
  ])("adds $slug in the next three-breed standard-detail batch", ({ slug, storyImages, realityImages }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
  });

  it("separates French Bulldog ancestry from the later companion-breed formation", () => {
    const detail = getStandardBreedDetail("french-bulldog")!;
    const background = `${detail.story.steps[0].title} ${detail.story.steps[0].body}`;

    expect(background).toContain("투우 미끼 경기");
    expect(background).toContain("조상");
    expect(background).toContain("반려견으로 정립");
    expect(background).not.toMatch(/프렌치 불도그가 [^.!?]*투우/u);
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
