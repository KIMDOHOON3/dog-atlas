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
      "bloodhound",
      "dobermann",
      "german-shepherd-dog",
      "golden-retriever",
      "labrador-retriever",
      "lagotto-romagnolo",
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

  it("adds Shetland Sheepdog as the next standard detail after the three-breed batch", () => {
    const detail = getStandardBreedDetail("shetland-sheepdog")!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === detail.slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual([
      "/illustrations/v3/shetland-sheepdog-history.webp",
      "/illustrations/v4/shetland-sheepdog-feature-alert-reorientation.webp",
      "/illustrations/v4/shetland-sheepdog-feature-sound-cue.webp",
    ]);
    expect(detail.realities.map((reality) => reality.image)).toEqual([
      "/illustrations/v4/shetland-sheepdog-feature-scent-choice.webp",
      "/illustrations/v4/shetland-sheepdog-feature-long-coat-care.webp",
    ]);
    expect(Object.keys(detail.relatedDifferences)).toEqual(["border-collie", "australian-shepherd"]);
  });

  it("adds Australian Shepherd as the next standard detail after Shetland Sheepdog", () => {
    const detail = getStandardBreedDetail("australian-shepherd")!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === detail.slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual([
      "/illustrations/v3/australian-shepherd-history.webp",
      "/illustrations/v4/australian-shepherd-feature-movement-focus.webp",
      "/illustrations/v4/australian-shepherd-feature-work-to-rest.webp",
    ]);
    expect(detail.realities.map((reality) => reality.image)).toEqual([
      "/illustrations/v4/australian-shepherd-feature-cooperative-task.webp",
      "/illustrations/v4/australian-shepherd-feature-double-coat-care.webp",
    ]);
    expect(detail.story.steps[0].body).toContain("미국에서 정립");
    expect(Object.keys(detail.relatedDifferences)).toEqual(["border-collie", "shetland-sheepdog"]);
  });

  it.each([
    {
      slug: "yakutian-laika",
      storyImages: [
        "/illustrations/v3/yakutian-laika-history.webp",
        "/illustrations/v4/yakutian-laika-feature-cooperation.webp",
        "/illustrations/v4/yakutian-laika-feature-purposeful-activity.webp",
      ],
      realityImages: [
        "/illustrations/v4/yakutian-laika-feature-double-coat.webp",
        "/illustrations/v4/yakutian-laika-feature-cool-rest.webp",
      ],
      related: ["siberian-husky", "samoyed"],
    },
    {
      slug: "english-cocker-spaniel",
      storyImages: [
        "/illustrations/v3/english-cocker-spaniel-history.webp",
        "/illustrations/v4/english-cocker-spaniel-feature-search-retrieve.webp",
        "/illustrations/v4/english-cocker-spaniel-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/english-cocker-spaniel-feature-working-show.webp",
        "/illustrations/v4/english-cocker-spaniel-feature-ear-coat-care.webp",
      ],
      related: ["cavalier-king-charles-spaniel", "beagle"],
    },
    {
      slug: "akita",
      storyImages: [
        "/illustrations/v3/akita-history.webp",
        "/illustrations/v4/akita-feature-respectful-distance.webp",
        "/illustrations/v4/akita-feature-calm-walking.webp",
      ],
      realityImages: [
        "/illustrations/v4/akita-feature-large-dog-route.webp",
        "/illustrations/v4/akita-feature-double-coat-care.webp",
      ],
      related: ["shiba", "korea-jindo-dog"],
    },
  ])("adds $slug in the next three-breed standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "cavalier-king-charles-spaniel",
      storyImages: [
        "/illustrations/v3/cavalier-king-charles-spaniel-history.webp",
        "/illustrations/v4/cavalier-king-charles-spaniel-feature-family-participation.webp",
        "/illustrations/v4/cavalier-king-charles-spaniel-feature-scent-walk.webp",
      ],
      realityImages: [
        "/illustrations/v4/cavalier-king-charles-spaniel-feature-independent-rest.webp",
        "/illustrations/v4/cavalier-king-charles-spaniel-feature-feathered-coat-care.webp",
      ],
      related: ["english-cocker-spaniel", "shih-tzu"],
    },
    {
      slug: "english-springer-spaniel",
      storyImages: [
        "/illustrations/v3/english-springer-spaniel-history.webp",
        "/illustrations/v4/english-springer-spaniel-feature-close-search.webp",
        "/illustrations/v4/english-springer-spaniel-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/english-springer-spaniel-feature-structured-retrieve.webp",
        "/illustrations/v4/english-springer-spaniel-feature-ear-feather-care.webp",
      ],
      related: ["english-cocker-spaniel", "labrador-retriever"],
    },
    {
      slug: "havanese",
      storyImages: [
        "/illustrations/v3/havanese-history.webp",
        "/illustrations/v4/havanese-feature-family-participation.webp",
        "/illustrations/v4/havanese-feature-independent-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/havanese-feature-long-coat-care.webp",
        "/illustrations/v4/havanese-feature-scent-walk.webp",
      ],
      related: ["bichon-frise", "maltese"],
    },
  ])("adds $slug in the companion-and-spaniel standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "schnauzer",
      storyImages: [
        "/illustrations/v3/schnauzer-history.webp",
        "/illustrations/v4/schnauzer-feature-structured-scent.webp",
        "/illustrations/v4/schnauzer-feature-alert-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/schnauzer-feature-pursuit-safety.webp",
        "/illustrations/v4/schnauzer-feature-wiry-coat-care.webp",
      ],
      related: ["miniature-schnauzer", "giant-schnauzer"],
    },
    {
      slug: "brittany-spaniel",
      storyImages: [
        "/illustrations/v3/brittany-spaniel-history.webp",
        "/illustrations/v4/brittany-spaniel-feature-point-reorientation.webp",
        "/illustrations/v4/brittany-spaniel-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/brittany-spaniel-feature-wildlife-safety.webp",
        "/illustrations/v4/brittany-spaniel-feature-ear-feather-care.webp",
      ],
      related: ["english-setter", "english-springer-spaniel"],
    },
    {
      slug: "lagotto-romagnolo",
      storyImages: [
        "/illustrations/v4/lagotto-romagnolo-feature-water-retrieval.webp",
        "/illustrations/v4/lagotto-romagnolo-feature-scent-box-search.webp",
        "/illustrations/v4/lagotto-romagnolo-feature-work-to-rest.webp",
        "/illustrations/v3/lagotto-romagnolo-history.webp",
      ],
      realityImages: [
        "/illustrations/v4/lagotto-romagnolo-feature-designated-digging.webp",
        "/illustrations/v4/lagotto-romagnolo-feature-curly-coat-care.webp",
      ],
      related: ["portuguese-water-dog", "poodle"],
    },
  ])("adds $slug in the working-and-pointing standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "giant-schnauzer",
      storyImages: [
        "/illustrations/v3/giant-schnauzer-history.webp",
        "/illustrations/v4/giant-schnauzer-feature-controlled-strength.webp",
        "/illustrations/v4/giant-schnauzer-feature-alert-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/giant-schnauzer-feature-large-dog-route.webp",
        "/illustrations/v4/giant-schnauzer-feature-wiry-coat-care.webp",
      ],
      related: ["schnauzer", "rottweiler"],
    },
    {
      slug: "portuguese-water-dog",
      storyImages: [
        "/illustrations/v3/portuguese-water-dog-history.webp",
        "/illustrations/v4/portuguese-water-dog-feature-structured-retrieval.webp",
        "/illustrations/v4/portuguese-water-dog-feature-swim-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/portuguese-water-dog-feature-safe-water-exit.webp",
        "/illustrations/v4/portuguese-water-dog-feature-coat-ear-care.webp",
      ],
      related: ["poodle", "newfoundland"],
    },
    {
      slug: "irish-red-setter",
      storyImages: [
        "/illustrations/v3/irish-red-setter-history.webp",
        "/illustrations/v4/irish-red-setter-feature-broad-search.webp",
        "/illustrations/v4/irish-red-setter-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/irish-red-setter-feature-wildlife-safety.webp",
        "/illustrations/v4/irish-red-setter-feature-feathered-coat-care.webp",
      ],
      related: ["english-setter", "vizsla"],
    },
  ])("adds $slug in the large-working-and-field standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "boxer",
      storyImages: [
        "/illustrations/v3/boxer-history.webp",
        "/illustrations/v4/boxer-feature-controlled-energy.webp",
        "/illustrations/v4/boxer-feature-heat-recovery.webp",
      ],
      realityImages: [
        "/illustrations/v4/boxer-feature-calm-greeting.webp",
        "/illustrations/v4/boxer-feature-low-impact-footing.webp",
      ],
      related: ["rottweiler", "boston-terrier"],
    },
    {
      slug: "newfoundland",
      storyImages: [
        "/illustrations/v3/newfoundland-history.webp",
        "/illustrations/v4/newfoundland-feature-controlled-hauling.webp",
        "/illustrations/v4/newfoundland-feature-water-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/newfoundland-feature-massive-dog-route.webp",
        "/illustrations/v4/newfoundland-feature-wet-coat-drying.webp",
      ],
      related: ["portuguese-water-dog", "bernese-mountain-dog"],
    },
    {
      slug: "vizsla",
      storyImages: [
        "/illustrations/v3/vizsla-history.webp",
        "/illustrations/v4/vizsla-feature-versatile-search.webp",
        "/illustrations/v4/vizsla-feature-independent-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/vizsla-feature-wildlife-reorientation.webp",
        "/illustrations/v4/vizsla-feature-short-coat-check.webp",
      ],
      related: ["weimaraner", "german-short-haired-pointing-dog"],
    },
  ])("adds $slug in the companion-water-and-pointer standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "weimaraner",
      storyImages: [
        "/illustrations/v3/weimaraner-history.webp",
        "/illustrations/v4/weimaraner-feature-visual-search.webp",
        "/illustrations/v4/weimaraner-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/weimaraner-feature-visitor-distance.webp",
        "/illustrations/v4/weimaraner-feature-short-coat-check.webp",
      ],
      related: ["vizsla", "german-short-haired-pointing-dog"],
    },
    {
      slug: "german-short-haired-pointing-dog",
      storyImages: [
        "/illustrations/v3/german-short-haired-pointing-dog-history.webp",
        "/illustrations/v4/german-short-haired-pointing-dog-feature-versatile-sequence.webp",
        "/illustrations/v4/german-short-haired-pointing-dog-feature-work-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/german-short-haired-pointing-dog-feature-wildlife-safety.webp",
        "/illustrations/v4/german-short-haired-pointing-dog-feature-field-check.webp",
      ],
      related: ["vizsla", "weimaraner"],
    },
    {
      slug: "flat-coated-retriever",
      storyImages: [
        "/illustrations/v3/flat-coated-retriever-history.webp",
        "/illustrations/v4/flat-coated-retriever-feature-gentle-delivery.webp",
        "/illustrations/v4/flat-coated-retriever-feature-retrieve-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/flat-coated-retriever-feature-wet-feather-drying.webp",
        "/illustrations/v4/flat-coated-retriever-feature-vehicle-access.webp",
      ],
      related: ["labrador-retriever", "golden-retriever"],
    },
  ])("adds $slug in the next pointing-and-retriever standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it("distinguishes the five pointing breeds by their actual search pattern", () => {
    expect(getStandardBreedDetail("brittany-spaniel")?.story.steps[1].title).toContain("작은 구역");
    expect(getStandardBreedDetail("irish-red-setter")?.story.steps[1].title).toContain("큰 호");
    expect(getStandardBreedDetail("vizsla")?.story.steps[1].title).toContain("사람 가까운 범위");
    expect(getStandardBreedDetail("weimaraner")?.story.steps[1].title).toContain("범위를 단계적으로 좁힐");
    expect(getStandardBreedDetail("german-short-haired-pointing-dog")?.story.steps[1].title).toContain("과제 전환");
  });

  it.each([
    {
      slug: "nova-scotia-duck-tolling-retriever",
      storyImages: [
        "/illustrations/v3/nova-scotia-duck-tolling-retriever-history.webp",
        "/illustrations/v4/nova-scotia-duck-tolling-retriever-feature-shoreline-tolling.webp",
        "/illustrations/v4/nova-scotia-duck-tolling-retriever-feature-retrieve-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/nova-scotia-duck-tolling-retriever-feature-safe-water-exit.webp",
        "/illustrations/v4/nova-scotia-duck-tolling-retriever-feature-wet-coat-care.webp",
      ],
      related: ["golden-retriever", "labrador-retriever"],
    },
    {
      slug: "old-english-sheepdog",
      storyImages: [
        "/illustrations/v3/old-english-sheepdog-history.webp",
        "/illustrations/v4/old-english-sheepdog-feature-movement-redirection.webp",
        "/illustrations/v4/old-english-sheepdog-feature-large-rest-space.webp",
      ],
      realityImages: [
        "/illustrations/v4/old-english-sheepdog-feature-line-brushing.webp",
        "/illustrations/v4/old-english-sheepdog-feature-wide-home-route.webp",
      ],
      related: ["border-collie", "shetland-sheepdog"],
    },
    {
      slug: "cane-corso",
      storyImages: [
        "/illustrations/v3/cane-corso-history.webp",
        "/illustrations/v4/cane-corso-feature-controlled-strength.webp",
        "/illustrations/v4/cane-corso-feature-visitor-distance.webp",
      ],
      realityImages: [
        "/illustrations/v4/cane-corso-feature-vehicle-access.webp",
        "/illustrations/v4/cane-corso-feature-short-coat-check.webp",
      ],
      related: ["rottweiler", "boxer"],
    },
  ])("adds $slug in the tolling-herding-and-guardian standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "chesapeake-bay-retriever",
      storyImages: [
        "/illustrations/v3/chesapeake-bay-retriever-history.webp",
        "/illustrations/v4/chesapeake-bay-retriever-feature-rough-water-route.webp",
        "/illustrations/v4/chesapeake-bay-retriever-feature-retrieve-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/chesapeake-bay-retriever-feature-safe-water-plan.webp",
        "/illustrations/v4/chesapeake-bay-retriever-feature-wavy-coat-drying.webp",
      ],
      related: ["labrador-retriever", "flat-coated-retriever"],
    },
    {
      slug: "airedale-terrier",
      storyImages: [
        "/illustrations/v3/airedale-terrier-history.webp",
        "/illustrations/v4/airedale-terrier-feature-riverside-scent-search.webp",
        "/illustrations/v4/airedale-terrier-feature-search-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/airedale-terrier-feature-pursuit-u-turn.webp",
        "/illustrations/v4/airedale-terrier-feature-wiry-coat-care.webp",
      ],
      related: ["jack-russell-terrier", "miniature-schnauzer"],
    },
    {
      slug: "chow-chow",
      storyImages: [
        "/illustrations/v3/chow-chow-history.webp",
        "/illustrations/v4/chow-chow-feature-observation-distance.webp",
        "/illustrations/v4/chow-chow-feature-choice-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/chow-chow-feature-heat-recovery.webp",
        "/illustrations/v4/chow-chow-feature-dense-coat-care.webp",
      ],
      related: ["akita", "shiba"],
    },
  ])("adds $slug in the cold-water-terrier-and-spitz standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(familiarKoreaBreeds.some((entry) => entry.slug === slug)).toBe(false);
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    {
      slug: "dalmatian",
      storyImages: [
        "/illustrations/v3/dalmatian-history.webp",
        "/illustrations/v4/dalmatian-feature-rhythm-loop.webp",
        "/illustrations/v4/dalmatian-feature-activity-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/dalmatian-feature-visual-cues.webp",
        "/illustrations/v4/dalmatian-feature-paw-surface-check.webp",
      ],
      related: ["weimaraner", "labrador-retriever"],
    },
    {
      slug: "bedlington-terrier",
      storyImages: [
        "/illustrations/v3/bedlington-terrier-history.webp",
        "/illustrations/v4/bedlington-terrier-feature-short-lure-run.webp",
        "/illustrations/v4/bedlington-terrier-feature-run-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/bedlington-terrier-feature-secure-sightline.webp",
        "/illustrations/v4/bedlington-terrier-feature-linty-coat-care.webp",
      ],
      related: ["jack-russell-terrier", "whippet"],
    },
    {
      slug: "finnish-lapponian-dog",
      storyImages: [
        "/illustrations/v3/finnish-lapponian-dog-history.webp",
        "/illustrations/v4/finnish-lapponian-dog-feature-direction-change.webp",
        "/illustrations/v4/finnish-lapponian-dog-feature-voice-to-rest.webp",
      ],
      realityImages: [
        "/illustrations/v4/finnish-lapponian-dog-feature-warm-weather-route.webp",
        "/illustrations/v4/finnish-lapponian-dog-feature-foot-coat-check.webp",
      ],
      related: ["shetland-sheepdog", "samoyed"],
    },
  ])("adds $slug in the coach-terrier-and-reindeer-herding standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "leonberger", storyImages: ["/illustrations/v3/leonberger-history.webp", "/illustrations/v4/leonberger-feature-controlled-cart.webp", "/illustrations/v4/leonberger-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/leonberger-feature-vehicle-ramp.webp", "/illustrations/v4/leonberger-feature-wet-coat-drying.webp"], related: ["newfoundland", "saint-bernard"] },
    { slug: "bull-terrier", storyImages: ["/illustrations/v3/bull-terrier-history.webp", "/illustrations/v4/bull-terrier-feature-full-body-play.webp", "/illustrations/v4/bull-terrier-feature-play-to-rest.webp"], realityImages: ["/illustrations/v4/bull-terrier-feature-visitor-gate.webp", "/illustrations/v4/bull-terrier-feature-cooperative-body-check.webp"], related: ["jack-russell-terrier", "boxer"] },
    { slug: "english-setter", storyImages: ["/illustrations/v3/english-setter-history.webp", "/illustrations/v4/english-setter-feature-broad-setting-search.webp", "/illustrations/v4/english-setter-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/english-setter-feature-wildlife-distance.webp", "/illustrations/v4/english-setter-feature-feather-coat-check.webp"], related: ["german-short-haired-pointing-dog", "vizsla"] },
  ])("adds $slug in the giant-terrier-and-setting-dog standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "alaskan-malamute", storyImages: ["/illustrations/v3/alaskan-malamute-history.webp", "/illustrations/v4/alaskan-malamute-feature-steady-freight.webp", "/illustrations/v4/alaskan-malamute-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/alaskan-malamute-feature-secure-yard.webp", "/illustrations/v4/alaskan-malamute-feature-seasonal-undercoat.webp"], related: ["siberian-husky", "yakutian-laika"] },
    { slug: "rhodesian-ridgeback", storyImages: ["/illustrations/v3/rhodesian-ridgeback-history.webp", "/illustrations/v4/rhodesian-ridgeback-feature-distance-tracking.webp", "/illustrations/v4/rhodesian-ridgeback-feature-tracking-to-rest.webp"], realityImages: ["/illustrations/v4/rhodesian-ridgeback-feature-pursuit-u-turn.webp", "/illustrations/v4/rhodesian-ridgeback-feature-ridge-check.webp"], related: ["basenji", "greyhound"] },
    { slug: "collie-rough", storyImages: ["/illustrations/v3/collie-rough-history.webp", "/illustrations/v4/collie-rough-feature-wide-direction.webp", "/illustrations/v4/collie-rough-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/collie-rough-feature-movement-reorientation.webp", "/illustrations/v4/collie-rough-feature-line-brushing.webp"], related: ["shetland-sheepdog", "border-collie"] },
  ])("adds $slug in the freight-distance-and-collie standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "miniature-pinscher", storyImages: ["/illustrations/v3/miniature-pinscher-history.webp", "/illustrations/v4/miniature-pinscher-feature-scent-box-search.webp", "/illustrations/v4/miniature-pinscher-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/miniature-pinscher-feature-doorway-pause.webp", "/illustrations/v4/miniature-pinscher-feature-cold-weather.webp"], related: ["dobermann", "chihuahua"] },
    { slug: "clumber-spaniel", storyImages: ["/illustrations/v3/clumber-spaniel-history.webp", "/illustrations/v4/clumber-spaniel-feature-leisurely-search.webp", "/illustrations/v4/clumber-spaniel-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/clumber-spaniel-feature-low-ramp.webp", "/illustrations/v4/clumber-spaniel-feature-ear-feather-check.webp"], related: ["english-cocker-spaniel", "basset-hound"] },
    { slug: "tibetan-mastiff", storyImages: ["/illustrations/v3/tibetan-mastiff-history.webp", "/illustrations/v4/tibetan-mastiff-feature-boundary-patrol.webp", "/illustrations/v4/tibetan-mastiff-feature-evening-to-rest.webp"], realityImages: ["/illustrations/v4/tibetan-mastiff-feature-visitor-buffer.webp", "/illustrations/v4/tibetan-mastiff-feature-seasonal-undercoat.webp"], related: ["mongolian-bankhar", "newfoundland"] },
  ])("adds $slug in the small-pinscher-spaniel-and-highland-guardian standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "australian-kelpie", storyImages: ["/illustrations/v3/australian-kelpie-history.webp", "/illustrations/v4/australian-kelpie-feature-direction-change.webp", "/illustrations/v4/australian-kelpie-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/australian-kelpie-feature-movement-redirection.webp", "/illustrations/v4/australian-kelpie-feature-dry-trail-check.webp"], related: ["border-collie", "australian-shepherd"] },
    { slug: "curly-coated-retriever", storyImages: ["/illustrations/v3/curly-coated-retriever-history.webp", "/illustrations/v4/curly-coated-retriever-feature-gentle-water-delivery.webp", "/illustrations/v4/curly-coated-retriever-feature-retrieve-to-rest.webp"], realityImages: ["/illustrations/v4/curly-coated-retriever-feature-safe-water-exit.webp", "/illustrations/v4/curly-coated-retriever-feature-curl-ear-drying.webp"], related: ["labrador-retriever", "flat-coated-retriever"] },
    { slug: "border-terrier", storyImages: ["/illustrations/v3/border-terrier-history.webp", "/illustrations/v4/border-terrier-feature-scent-tunnel-search.webp", "/illustrations/v4/border-terrier-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/border-terrier-feature-lure-u-turn.webp", "/illustrations/v4/border-terrier-feature-harsh-coat-paw-check.webp"], related: ["jack-russell-terrier", "scottish-terrier"] },
  ])("adds $slug in the kelpie-curly-and-border-terrier standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "australian-cattle-dog", storyImages: ["/illustrations/v3/australian-cattle-dog-history.webp", "/illustrations/v4/australian-cattle-dog-feature-close-direction.webp", "/illustrations/v4/australian-cattle-dog-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/australian-cattle-dog-feature-visitor-buffer.webp", "/illustrations/v4/australian-cattle-dog-feature-coat-paw-check.webp"], related: ["australian-kelpie", "border-collie"] },
    { slug: "barbet", storyImages: ["/illustrations/v3/barbet-history.webp", "/illustrations/v4/barbet-feature-reed-search.webp", "/illustrations/v4/barbet-feature-water-work-to-rest.webp"], realityImages: ["/illustrations/v4/barbet-feature-beard-ear-drying.webp", "/illustrations/v4/barbet-feature-woolly-coat-care.webp"], related: ["poodle", "portuguese-water-dog"] },
    { slug: "basset-hound", storyImages: ["/illustrations/v3/basset-hound-history.webp", "/illustrations/v4/basset-hound-feature-slow-scent-trail.webp", "/illustrations/v4/basset-hound-feature-scent-to-rest.webp"], realityImages: ["/illustrations/v4/basset-hound-feature-low-ramp.webp", "/illustrations/v4/basset-hound-feature-ear-paw-check.webp"], related: ["beagle", "clumber-spaniel"] },
  ])("adds $slug in the cattle-water-and-scent-hound standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "afghan-hound", storyImages: ["/illustrations/v3/afghan-hound-history.webp", "/illustrations/v4/afghan-hound-feature-controlled-lure-run.webp", "/illustrations/v4/afghan-hound-feature-run-to-rest.webp"], realityImages: ["/illustrations/v4/afghan-hound-feature-double-gate.webp", "/illustrations/v4/afghan-hound-feature-long-coat-check.webp"], related: ["saluki", "greyhound"] },
    { slug: "beauceron", storyImages: ["/illustrations/v3/beauceron-history.webp", "/illustrations/v4/beauceron-feature-boundary-return.webp", "/illustrations/v4/beauceron-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/beauceron-feature-wide-doorway-halt.webp", "/illustrations/v4/beauceron-feature-double-dewclaw-check.webp"], related: ["briard", "german-shepherd-dog"] },
    { slug: "boston-terrier", storyImages: ["/illustrations/v3/boston-terrier-history.webp", "/illustrations/v4/boston-terrier-feature-short-family-play.webp", "/illustrations/v4/boston-terrier-feature-play-to-rest.webp"], realityImages: ["/illustrations/v4/boston-terrier-feature-cool-route.webp", "/illustrations/v4/boston-terrier-feature-eye-safe-space.webp"], related: ["french-bulldog", "boxer"] },
  ])("adds $slug in the sighthound-shepherd-and-companion standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it.each([
    { slug: "affenpinscher", storyImages: ["/illustrations/v3/affenpinscher-history.webp", "/illustrations/v4/affenpinscher-feature-lidded-box-search.webp", "/illustrations/v4/affenpinscher-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/affenpinscher-feature-doorway-foot-space.webp", "/illustrations/v4/affenpinscher-feature-rough-coat-face-care.webp"], related: ["miniature-schnauzer", "miniature-pinscher"] },
    { slug: "bearded-collie", storyImages: ["/illustrations/v3/bearded-collie-history.webp", "/illustrations/v4/bearded-collie-feature-broad-terrain-route.webp", "/illustrations/v4/bearded-collie-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/bearded-collie-feature-wet-entry-drying.webp", "/illustrations/v4/bearded-collie-feature-line-brush-pad-check.webp"], related: ["border-collie", "collie-rough"] },
    { slug: "bloodhound", storyImages: ["/illustrations/v3/bloodhound-history.webp", "/illustrations/v4/bloodhound-feature-long-scent-route.webp", "/illustrations/v4/bloodhound-feature-trail-to-rest.webp", "/illustrations/v4/bloodhound-feature-missing-person-search.webp"], realityImages: ["/illustrations/v4/bloodhound-feature-vehicle-ramp.webp", "/illustrations/v4/bloodhound-feature-ear-fold-drying.webp"], related: ["basset-hound", "beagle"] },
  ])("adds $slug in the small-companion-collie-and-tracking-hound standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
    const detail = getStandardBreedDetail(slug)!;
    expect(getBreed(slug)).toBeDefined();
    expect(detail.story.steps.map((step) => step.image)).toEqual(storyImages);
    expect(detail.realities.map((reality) => reality.image)).toEqual(realityImages);
    expect(Object.keys(detail.relatedDifferences)).toEqual(related);
  });

  it("keeps Bloodhound's current missing-person search separate from its historical wounded-game tracking", () => {
    const detail = getStandardBreedDetail("bloodhound")!;

    expect(detail.story.steps[0].body).toContain("상처 입은 사냥감");
    expect(detail.story.steps[3]).toEqual(detail.modernWork?.storyStep);
    expect(detail.modernWork?.roles[0].label).toBe("실종자 수색 추적견");
    expect(detail.modernWork?.roles[0].sourceUrls).toEqual([
      "https://www.fci.be/Nomenclature/Standards/084g06-en.pdf",
      "https://www.akc.org/dog-breeds/bloodhound/",
    ]);
  });

  it("keeps Lagotto Romagnolo's current truffle work separate from its original water retrieval", () => {
    const detail = getStandardBreedDetail("lagotto-romagnolo")!;

    expect(detail.story.steps[0].title).toContain("수상견");
    expect(detail.story.steps[3]).toEqual(detail.modernWork?.storyStep);
    expect(detail.modernWork?.roles[0].label).toBe("트러플 탐색견");
    expect(detail.modernWork?.roles[0].sourceUrls).toEqual([
      "https://www.fci.be/Nomenclature/Standards/298g08-en.pdf",
    ]);
  });

  it("splits Pyrenean Mountain Dog height and sex-based reference weights in an expandable hero summary", () => {
    const detail = getStandardBreedDetail("pyrenean-mountain-dog")!;

    expect(detail.heroSizeDetails?.summary).toBe("체고 65~80cm · 성별 체중 보기");
    expect(detail.heroSizeDetails?.items).toEqual([
      { id: "female", label: "암컷", value: "체고 65~75cm · 약 39kg" },
      { id: "male", label: "수컷", value: "체고 70~80cm · 약 45kg" },
    ]);
    expect(detail.sizeVarieties).toBeUndefined();
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
