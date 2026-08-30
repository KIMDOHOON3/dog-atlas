import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBreed } from "@/content/breeds/data";
import { familiarKoreaBreeds } from "@/content/familiar-korea-breeds";
import { getAllStandardBreedDetails, getStandardBreedDetail } from "./data";

const publicFile = (assetPath: string) => join(process.cwd(), "public", assetPath.slice(1));

describe("standard breed detail editorial data", () => {
  const details = getAllStandardBreedDetails();

  it("keeps the gated expansion beyond the 100-breed milestone", () => {
    expect(details).toHaveLength(193);
    expect(details.some((detail) => detail.slug === "poodle")).toBe(false);
    expect(details.some((detail) => detail.slug === "american-cocker-spaniel")).toBe(true);
    expect(details.map((detail) => detail.slug)).toEqual(expect.arrayContaining([
      "belgian-groenendael",
      "caucasian-shepherd-dog",
      "mongolian-bankhar",
      "belgian-malinois",
      "belgian-tervueren",
      "komondor",
      "boerboel",
      "presa-canario",
      "sapsaree",
      "donggyeongi",
      "mudi",
      "bolognese",
      "kooikerhondje",
      "puli",
      "white-swiss-shepherd-dog",
      "welsh-corgi-cardigan",
      "shar-pei",
      "bulldog",
      "american-akita",
      "finnish-spitz",
      "karelian-bear-dog",
      "lhasa-apso",
      "tibetan-spaniel",
      "icelandic-sheepdog",
      "dutch-shepherd-dog",
      "mastiff",
      "soft-coated-wheaten-terrier",
      "otterhound",
      "belgian-laekenois",
      "czechoslovakian-wolfdog",
      "bouvier-des-flandres",
      "miniature-american-shepherd",
      "dogo-argentino",
      "dogue-de-bordeaux",
      "neapolitan-mastiff",
      "continental-bulldog",
      "smooth-fox-terrier",
      "wire-fox-terrier",
      "kerry-blue-terrier",
      "cairn-terrier",
      "norfolk-terrier",
      "norwich-terrier",
      "miniature-bull-terrier",
      "american-staffordshire-terrier",
      "australian-silky-terrier",
      "swedish-vallhund",
      "italian-volpino",
      "eurasier",
      "hokkaido",
      "kai",
      "kishu",
      "shikoku",
      "canaan-dog",
      "harrier",
      "english-foxhound",
      "petit-basset-griffon-vendeen",
      "finnish-hound",
      "alpine-dachsbracke",
      "bavarian-mountain-scent-hound",
      "german-wire-haired-pointing-dog",
      "small-munsterlander",
      "wire-haired-pointing-griffon-korthals",
      "english-pointer",
      "irish-water-spaniel",
      "spanish-water-dog",
      "american-water-spaniel",
      "tibetan-terrier",
      "japanese-chin",
      "prague-ratter",
      "azawakh",
      "sloughi",
      "galgo-espanol",
      "bergamasco-shepherd",
      "schipperke",
      "slovakian-cuvac",
      "polish-lowland-sheepdog",
      "appenzeller-cattle-dog",
      "entlebucher-mountain-dog",
      "greater-swiss-mountain-dog",
      "german-pinscher",
      "kangal-shepherd-dog",
      "parson-russell-terrier",
      "sealyham-terrier",
      "bedlington-terrier",
      "manchester-terrier",
      "cesky-terrier",
      "thai-ridgeback",
      "portuguese-podengo",
      "greenland-dog",
      "peruvian-hairless-dog",
      "cirneco-dell-etna",
      "gascon-saintongeois",
      "grand-basset-griffon-vendeen",
      "schweizer-laufhund",
    ]));
  });

  it.each([
    ["schweizer-laufhund", "네 가지", "긴 귀"],
    ["manchester-terrier", "쥐잡이", "단모"],
    ["cesky-terrier", "실리햄", "클리핑"],
    ["thai-ridgeback", "수레 호위", "리지"],
    ["portuguese-podengo", "세 체급", "하네스"],
    ["greenland-dog", "썰매", "극지 이중모"],
    ["peruvian-hairless-dog", "프리잉카", "뜨거운 바닥"],
    ["cirneco-dell-etna", "화산암", "발바닥"],
    ["gascon-saintongeois", "큰형", "긴 귀"],
    ["grand-basset-griffon-vendeen", "약 43cm", "발판"],
  ])("connects 200-expansion batch-08 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body]), ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");
    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
  });

  it.each([
    ["schipperke", "작은 목자", "목갈기"],
    ["slovakian-cuvac", "타트라", "두 번째 경계"],
    ["polish-lowland-sheepdog", "좋은 기억력", "눈가"],
    ["appenzeller-cattle-dog", "소 떼", "말린 꼬리"],
    ["entlebucher-mountain-dog", "가장 작고 낮은 몸", "자연스럽게 짧은 꼬리"],
    ["greater-swiss-mountain-dog", "수레", "큰 몸"],
    ["german-pinscher", "슈나우저", "현관"],
    ["kangal-shepherd-dog", "포식자", "이중문"],
    ["parson-russell-terrier", "존 러셀", "울타리 아래"],
    ["sealyham-terrier", "실리햄 영지", "흰 거친 털"],
  ])("connects 200-expansion batch-07 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body]), ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");
    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
  });

  it.each([
    ["irish-water-spaniel", "랫 테일", "매끈한 꼬리"],
    ["spanish-water-dog", "목양", "코드"],
    ["american-water-spaniel", "작은 보트", "발판"],
    ["tibetan-terrier", "테리어가 아니라", "넓은 발"],
    ["japanese-chin", "신라", "눈가"],
    ["prague-ratter", "설치류", "사람 발"],
    ["azawakh", "유목민", "관찰 거리"],
    ["sloughi", "북아프리카", "긴 보폭"],
    ["galgo-espanol", "스페인 평원", "매우 긴 꼬리"],
    ["bergamasco-shepherd", "계절", "플록"],
  ])("connects 200-expansion batch-06 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body]), ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");
    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
  });

  it.each([
    ["harrier", "토끼", "울타리"],
    ["english-foxhound", "말을 탄 사냥대", "안전문"],
    ["petit-basset-griffon-vendeen", "방데", "낮은 틈"],
    ["finnish-hound", "토끼와 여우", "울음"],
    ["alpine-dachsbracke", "다친 사슴", "경사판"],
    ["bavarian-mountain-scent-hound", "오래된 땅 냄새", "긴 리드"],
    ["german-wire-haired-pointing-dog", "들·숲·물", "수염"],
    ["small-munsterlander", "문스터", "장식털"],
    ["wire-haired-pointing-griffon-korthals", "코르탈스", "풀씨"],
    ["english-pointer", "몸을 멈춰", "얇은 짧은 털"],
  ])("connects 200-expansion batch-05 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body]), ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");
    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each([
    ["american-staffordshire-terrier", "투견", "두 겹"],
    ["australian-silky-terrier", "시드니", "긴 털"],
    ["swedish-vallhund", "소의 발뒤꿈치", "자연 꼬리"],
    ["italian-volpino", "수레꾼", "소리를 줄일"],
    ["eurasier", "울프스피츠", "선택"],
    ["hokkaido", "아이누", "높은 울타리"],
    ["kai", "야마나시", "줄무늬"],
    ["kishu", "기이 반도", "동물과 마주치면"],
    ["shikoku", "고치현", "미끄럽지 않은"],
    ["canaan-dog", "메신저", "뜨거운 바닥"],
  ])("connects 200-expansion batch-04 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [...detail.story.steps.map((step) => step.image), ...detail.realities.map((reality) => reality.image)];
    const copy = [detail.heroStatement, ...detail.story.steps.flatMap((step) => [step.title, step.body]), ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");
    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each([
    ["dogue-de-bordeaux", "정육업자", "침과 얼굴 주름"],
    ["neapolitan-mastiff", "농장 뜰", "주름의 깊이"],
    ["continental-bulldog", "스위스", "피부와 발"],
    ["smooth-fox-terrier", "여우굴", "작은 동물과 바퀴"],
    ["wire-fox-terrier", "굴속 여우", "거친 겉털"],
    ["kerry-blue-terrier", "아일랜드 농장", "청회색"],
    ["cairn-terrier", "돌무더기", "파도 되는 한 구역"],
    ["norfolk-terrier", "마구간", "접힌 귀"],
    ["norwich-terrier", "케임브리지", "직립 귀"],
    ["miniature-bull-terrier", "쥐잡이", "짧은 흰 털"],
  ])("connects 200-expansion batch-03 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.map((reality) => reality.image),
    ];
    const copy = [
      detail.heroStatement,
      ...detail.story.steps.flatMap((step) => [step.title, step.body]),
      ...detail.realities.flatMap((reality) => [reality.title, reality.body]),
    ].join(" ");

    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it("connects the Puli herding role to distinct modern movement, rest, visitor, and cord-care scenes", () => {
    const detail = getStandardBreedDetail("puli")!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.map((reality) => reality.image),
    ];
    const copy = [
      detail.heroStatement,
      ...detail.story.steps.flatMap((step) => [step.title, step.body]),
      ...detail.realities.flatMap((reality) => [reality.title, reality.body]),
    ].join(" ");

    expect(copy).toContain("양 떼");
    expect(copy).toContain("곡선");
    expect(copy).toContain("안전문");
    expect(copy).toContain("코드");
    expect(detail.heroSizeDetails?.summaryRows).toEqual([
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ]);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each([
    ["puli", "양 떼", "코드"],
    ["white-swiss-shepherd-dog", "북미", "이중모"],
    ["welsh-corgi-cardigan", "소", "경사로"],
    ["shar-pei", "중국 남부", "안전문"],
    ["bulldog", "해로운 오락", "그늘"],
    ["american-akita", "북미", "큰 이중모"],
    ["finnish-spitz", "나무 위 새", "창 하단"],
    ["karelian-bear-dog", "큰 사냥감", "야생동물"],
    ["lhasa-apso", "수도원", "얇은 층"],
    ["tibetan-spaniel", "높은 담", "보조 잠금"],
  ])("connects 200-expansion batch-01 breed %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.map((reality) => reality.image),
    ];
    const copy = [
      detail.heroStatement,
      ...detail.story.steps.flatMap((step) => [step.title, step.body]),
      ...detail.realities.flatMap((reality) => [reality.title, reality.body]),
    ].join(" ");

    expect(copy).toContain(roleCopy);
    expect(copy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each(["puli", "white-swiss-shepherd-dog", "american-akita", "karelian-bear-dog"])(
    "keeps %s sex-specific numbers behind a compact size summary",
    (slug) => {
      const size = getStandardBreedDetail(slug)?.heroSizeDetails;
      expect(size?.summaryRows).toEqual([
        { label: "체고", value: "성별로 다름" },
        { label: "몸무게", value: "성별로 다름" },
      ]);
      expect(size?.items).toHaveLength(2);
    },
  );

  it("keeps Finnish Spitz sex-specific height compact without hiding its shared weight range", () => {
    expect(getStandardBreedDetail("finnish-spitz")?.heroSizeDetails?.summaryRows).toEqual([
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "약 9~15kg" },
    ]);
  });

  it.each(["welsh-corgi-cardigan", "shar-pei", "bulldog", "lhasa-apso", "tibetan-spaniel"])(
    "does not repeat %s simple height and weight in an expandable block",
    (slug) => expect(getStandardBreedDetail(slug)?.heroSizeDetails).toBeUndefined(),
  );

  it.each([
    ["belgian-malinois", "양 떼", "움직이는 자극"],
    ["belgian-tervueren", "가축", "긴 털"],
    ["komondor", "가축 무리", "코드를"],
    ["boerboel", "외딴 농장", "방문객"],
    ["presa-canario", "소의 이동", "방문객"],
    ["sapsaree", "집과 마을", "얼굴 털"],
    ["donggyeongi", "경주", "귀와 눈"],
    ["mudi", "가축", "알린 뒤"],
    ["bolognese", "실내", "경사로"],
    ["kooikerhondje", "오리", "물새"],
  ])("connects ten-breed batch %s to its own role and lived reality", (slug, roleCopy, livedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.map((reality) => reality.image),
    ];
    const storyCopy = detail.story.steps.map((step) => `${step.title} ${step.body}`).join(" ");
    const realityCopy = [detail.realitiesTitle, ...detail.realities.flatMap((reality) => [reality.title, reality.body])].join(" ");

    expect(storyCopy).toContain(roleCopy);
    expect(realityCopy).toContain(livedCopy);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it.each([
    ["belgian-groenendael", "양 떼", "방문"],
    ["caucasian-shepherd-dog", "거주지", "이중 경계"],
    ["mongolian-bankhar", "가축 곁", "가축과의 결속"],
  ])("connects %s history to a breed-specific lived reality", (slug, historyDetail, realityDetail) => {
    const detail = getStandardBreedDetail(slug)!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.map((reality) => reality.image),
    ];

    expect(detail.story.steps[0].body).toContain(historyDetail);
    expect([detail.realitiesTitle, ...detail.realities.map((reality) => reality.title)].join(" ")).toContain(realityDetail);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
  });

  it("connects American Cocker history, present participation, and lived realities", () => {
    const detail = getStandardBreedDetail("american-cocker-spaniel")!;
    const breed = getBreed("american-cocker-spaniel")!;
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.flatMap((reality) => reality.image ? [reality.image] : []),
    ];

    expect(detail.story.steps.map((step) => step.navLabel)).toEqual(["과거의 역할", "현재의 경향", "생활의 현실"]);
    expect(detail.story.steps[0].body).toContain("조렵견");
    expect(detail.story.steps[1].body).toContain("오늘날");
    expect(detail.story.steps[2].body).toContain("매일");
    expect(detail.realitiesTitle).toContain("악마견");
    expect(detail.realities[0].body).toContain("과장돼 붙었어요");
    expect(detail.realities[1].body).toContain("활동");
    expect(detail.realities[1].body).toContain("피모");
    expect(detail.realities[1].imageAlt).toContain("전신");
    expect(detail.realities[1].imageAlt).not.toContain("클로즈업");
    expect(detail.realities.every((reality) => Boolean(reality.image))).toBe(true);
    expect(new Set(images).size).toBe(5);
    images.forEach((image) => expect(existsSync(publicFile(image)), image).toBe(true));
    expect(breed.sources.some((source) => source.url.includes("cocker-spaniel-history"))).toBe(true);
  });

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

    expect(copy).toContain("포메라니안");
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
    expect(detail.sizeVarieties?.summaryRows).toEqual([
      { label: "구분", value: "3가지" },
      { label: "체고", value: "약 13~23cm" },
      { label: "몸무게", value: "약 3.5~14.5kg" },
    ]);
    expect(detail.sizeVarieties?.detailsLabel).toBe("크기별 보기");
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

  it.each([
    { slug: "briard", storyImages: ["/illustrations/v3/briard-history.webp", "/illustrations/v4/briard-feature-parallel-lane-turn.webp", "/illustrations/v4/briard-feature-work-to-rest.webp"], realityImages: ["/illustrations/v4/briard-feature-goat-coat-line-brushing.webp", "/illustrations/v4/briard-feature-double-dewclaw-check.webp"], related: ["beauceron", "old-english-sheepdog"] },
    { slug: "borzoi", storyImages: ["/illustrations/v3/borzoi-history.webp", "/illustrations/v4/borzoi-feature-controlled-straight-lure.webp", "/illustrations/v4/borzoi-feature-sprint-to-rest.webp"], realityImages: ["/illustrations/v4/borzoi-feature-tall-gate-clear-space.webp", "/illustrations/v4/borzoi-feature-silky-coat-care.webp"], related: ["greyhound", "afghan-hound"] },
    { slug: "italian-pointing-dog", storyImages: ["/illustrations/v3/italian-pointing-dog-history.webp", "/illustrations/v4/italian-pointing-dog-feature-high-air-scent.webp", "/illustrations/v4/italian-pointing-dog-feature-search-to-rest.webp"], realityImages: ["/illustrations/v4/italian-pointing-dog-feature-long-ear-drying.webp", "/illustrations/v4/italian-pointing-dog-feature-field-body-check.webp"], related: ["english-setter", "german-short-haired-pointing-dog"] },
  ])("adds $slug in the French-herding-Russian-sighthound-and-Italian-pointer standard-detail batch", ({ slug, storyImages, realityImages, related }) => {
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

    expect(detail.heroSizeDetails?.summaryRows).toEqual([
      { label: "체고", value: "65~80cm" },
      { label: "몸무게", value: "성별로 다름" },
    ]);
    expect(detail.heroSizeDetails?.detailsLabel).toBe("성별 보기");
    expect(detail.heroSizeDetails?.items).toEqual([
      { id: "female", label: "암컷", value: "체고 65~75cm · 약 39kg" },
      { id: "male", label: "수컷", value: "체고 70~80cm · 약 45kg" },
    ]);
    expect(detail.sizeVarieties).toBeUndefined();
  });

  it("keeps the final milestone history scenes specific and directly sourced", () => {
    const evidenceSlugs = [
      "scottish-terrier",
      "norwegian-elkhound-grey",
      "saluki",
      "irish-wolfhound",
      "bullmastiff",
      "chinese-crested-dog",
      "xoloitzcuintle",
      "coton-de-tulear",
      "norwegian-lundehund",
      "west-highland-white-terrier",
    ];

    evidenceSlugs.forEach((slug) => {
      const detail = getStandardBreedDetail(slug)!;
      expect(detail.story.steps[0].imageAlt, slug).not.toContain("형성 지역과 과거 역할");
      expect(getBreed(slug)?.sources.some((source) => source.url.includes("/expert-advice/")), slug).toBe(true);
    });
  });

  it.each([
    {
      slug: "old-english-sheepdog",
      summaryRows: [{ label: "체고", value: "성별로 다름" }],
      items: [
        { id: "male", label: "수컷", value: "체고 61cm 이상" },
        { id: "female", label: "암컷", value: "체고 56cm 이상" },
      ],
    },
    {
      slug: "borzoi",
      summaryRows: [
        { label: "체고", value: "성별로 다름" },
        { label: "몸무게", value: "약 27~48kg" },
      ],
      items: [
        { id: "male", label: "수컷", value: "체고 71cm 이상" },
        { id: "female", label: "암컷", value: "체고 66cm 이상" },
      ],
    },
  ])("keeps $slug sex-specific heights readable behind one shared size-card pattern", ({ slug, summaryRows, items }) => {
    const detail = getStandardBreedDetail(slug)!;

    expect(detail.heroSizeDetails?.summaryRows).toEqual(summaryRows);
    expect(detail.heroSizeDetails?.detailsLabel).toBe("성별 보기");
    expect(detail.heroSizeDetails?.items).toEqual(items);
  });

  it("separates French Bulldog ancestry from the later companion-breed formation", () => {
    const detail = getStandardBreedDetail("french-bulldog")!;
    const background = `${detail.story.steps[0].title} ${detail.story.steps[0].body}`;

    expect(background).toContain("투우 미끼 경기");
    expect(background).toContain("조상");
    expect(background).toContain("반려견으로 정립");
    expect(background).not.toMatch(/프렌치 불도그가 [^.!?]*투우/u);
  });

  it.each([
    ["chihuahua", "낮은 자기 자리"],
    ["pug", "서늘한 자기 자리"],
    ["french-bulldog", "편안한 숨"],
    ["pekingese", "낮은 자리"],
    ["great-dane", "큰 몸을 완전히 펴고"],
    ["saint-bernard", "큰 몸을 완전히 펴고"],
  ])("keeps the $0 daily-rhythm copy aligned with its resting illustration", (slug, expectedCopy) => {
    const detail = getStandardBreedDetail(slug)!;
    const dailyRhythm = detail.story.steps.find((step) => step.image.includes("daily-rhythm"))!;

    expect(`${dailyRhythm.title} ${dailyRhythm.body}`).toContain(expectedCopy);
  });

  it.each([
    ["chihuahua", "American Kennel Club", "Chihuahua-club-flier.pdf"],
    ["pug", "Royal Veterinary College", "brachycephaly/health-issues"],
    ["french-bulldog", "Royal Veterinary College", "brachycephaly/health-issues"],
    ["pekingese", "Royal Veterinary College", "brachycephaly-expertise"],
    ["great-dane", "MSD Veterinary Manual", "gastric-dilation-and-volvulus"],
    ["saint-bernard", "MSD Veterinary Manual", "gastric-dilation-and-volvulus"],
  ])("keeps direct health or safety evidence for $0", (slug, organization, urlPart) => {
    expect(getBreed(slug)?.sources).toContainEqual(expect.objectContaining({ organization, url: expect.stringContaining(urlPart) }));
  });

  it("uses a natural subject particle in related-breed headings", () => {
    expect(getStandardBreedDetail("great-dane")?.relatedTitle).toBe("그레이트 덴이 마음에 들지만 망설여진다면");
    expect(getStandardBreedDetail("chihuahua")?.relatedTitle).toBe("치와와가 마음에 들지만 망설여진다면");
  });

  it.each([
    "labrador-retriever",
    "golden-retriever",
    "dachshund",
    "beagle",
    "border-collie",
    "german-shepherd-dog",
    "siberian-husky",
    "samoyed",
    "shiba",
    "rottweiler",
  ])("keeps a direct breed-history source for core editorial review breed %s", (slug) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes("/expert-advice/dog-breeds/") && source.url.includes("history"))).toBe(true);
  });

  it.each([
    "golden-retriever",
    "dachshund",
    "beagle",
    "border-collie",
    "german-shepherd-dog",
    "siberian-husky",
    "samoyed",
    "shiba",
    "rottweiler",
  ])("keeps the %s rest scene copy and alt specific to the visible illustration", (slug) => {
    const dailyRhythm = getStandardBreedDetail(slug)!.story.steps.find((step) => step.image.includes("daily-rhythm"))!;

    expect(dailyRhythm.imageAlt).not.toContain("편안한 리듬으로 전환");
    expect(dailyRhythm.title).toMatch(/쉬|정리|매트/u);
  });

  it("describes the visible Rottweiler droving and cart scene", () => {
    expect(getBreed("rottweiler")?.historyVisual?.alt).toContain("가축 시장과 수레");
  });

  it.each([
    ["german-spitz", "손짓"],
    ["shih-tzu", "관리 도구"],
    ["korea-jindo-dog", "편안한 거리"],
    ["yorkshire-terrier", "활동 도구"],
    ["welsh-corgi-pembroke", "몸을 길게"],
    ["miniature-schnauzer", "활동 도구"],
    ["italian-sighthound", "폭신한 침대"],
    ["jack-russell-terrier", "관목과 땅 냄새"],
  ])("keeps the %s daily scene copy and alt specific to the visible illustration", (slug, visibleDetail) => {
    const dailyRhythm = getStandardBreedDetail(slug)!.story.steps.find((step) => step.image.includes("daily-rhythm"))!;

    expect(dailyRhythm.imageAlt).not.toContain("편안한 리듬으로 전환");
    expect(dailyRhythm.imageAlt).toContain(visibleDetail);
    expect(`${dailyRhythm.title} ${dailyRhythm.body}`).not.toContain("생활 리듬이 필요");
  });

  it.each([
    ["german-spitz", "유럽 농가 마당"],
    ["italian-sighthound", "유럽의 저택 뜰"],
    ["jack-russell-terrier", "말을 탄 사냥대"],
  ])("describes the visible %s history scene", (slug, visibleDetail) => {
    expect(getBreed(slug)?.historyVisual?.alt).toContain(visibleDetail);
  });

  it.each([
    ["maltese", "maltese-history"],
    ["welsh-corgi-pembroke", "pembroke-welsh-corgi-history"],
    ["yorkshire-terrier", "yorkshire-terrier-history"],
    ["italian-sighthound", "italian-greyhound-history"],
    ["jack-russell-terrier", "jackrussellterrier"],
    ["korea-jindo-dog", "korean-jindo-dog"],
  ])("keeps an additional direct breed source for reviewed breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["bichon-frise", "bichon-frise-history"],
    ["greyhound", "club-history"],
    ["whippet", "whippet-history"],
    ["pyrenean-mountain-dog", "great-pyrenees-history"],
    ["basenji", "basenji-history"],
    ["bernese-mountain-dog", "bernese-mountain-dog-history"],
    ["shetland-sheepdog", "shetland-sheepdog-history"],
    ["australian-shepherd", "australian-shepherd-history"],
    ["akita", "akita-history"],
    ["cavalier-king-charles-spaniel", "cavalier-king-charles-spaniel-history"],
  ])("keeps a direct history source for fifth editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it("describes the visible Greyhound sprint before moving recovery to the next sentence", () => {
    const sprint = getStandardBreedDetail("greyhound")!.story.steps[2];

    expect(sprint.title).toContain("울타리가 닫힌 운동장");
    expect(sprint.imageAlt).toContain("짧게 달리는");
    expect(sprint.body).toContain("달리기가 끝나면");
  });

  it.each([
    ["yakutian-laika", "yakutian-laika-breed-history"],
    ["english-cocker-spaniel", "english-cocker-spaniel-history"],
    ["english-springer-spaniel", "english-springer-spaniel-history"],
    ["havanese", "havanese-history"],
    ["schnauzer", "fun-facts-standard-schnauzer"],
    ["brittany-spaniel", "fun-facts-brittany"],
    ["lagotto-romagnolo", "5-facts-lagotto-romagnolo"],
    ["giant-schnauzer", "giant-schnauzer-history"],
    ["portuguese-water-dog", "portuguese-water-dog-history"],
    ["irish-red-setter", "meet-setter-breeds"],
  ])("keeps a direct official history source for sixth editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["yakutian-laika", "하네스를 착용", "하네스를 착용"],
    ["brittany-spaniel", "리드를 정리", "긴 리드를 정리"],
    ["irish-red-setter", "그늘진 매트", "그늘진 매트"],
  ])("keeps the %s third story step aligned with its visible scene", (slug, titleDetail, altDetail) => {
    const thirdStep = getStandardBreedDetail(slug)!.story.steps[2];

    expect(thirdStep.title).toContain(titleDetail);
    expect(thirdStep.imageAlt).toContain(altDetail);
    expect(thirdStep.body).toMatch(/쉬/u);
  });

  it.each([
    ["boxer", "boxer-history"],
    ["newfoundland", "newfoundland-history"],
    ["weimaraner", "fun-facts-weimaraner"],
    ["german-short-haired-pointing-dog", "german-shorthaired-pointer-history"],
    ["australian-cattle-dog", "AustralianCattleDog-club-flier"],
    ["vizsla", "vizsla-history"],
    ["flat-coated-retriever", "facts-about-flat-coated-retriever"],
    ["beauceron", "beauceron-vs-doberman"],
    ["english-setter", "english-setter-history"],
    ["chesapeake-bay-retriever", "chesapeake-bay-retriever-history"],
  ])("keeps a direct official history source for seventh editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["boxer", "작업장 마당"],
    ["newfoundland", "젖은 줄과 어망"],
    ["weimaraner", "숲 가장자리"],
    ["german-short-haired-pointing-dog", "얕은 습지"],
    ["australian-cattle-dog", "소 무리"],
    ["vizsla", "습지 들판"],
    ["flat-coated-retriever", "사람의 손"],
    ["beauceron", "양 떼"],
    ["english-setter", "몸을 낮춰"],
    ["chesapeake-bay-retriever", "낮은 부두"],
  ])("describes the visible history scene for seventh editorial review breed %s", (slug, visibleDetail) => {
    const alt = getBreed(slug)?.historyVisual?.alt ?? "";

    expect(alt).toContain(visibleDetail);
    expect(alt).not.toContain("원래 역할과 생활 환경");
  });

  it("restores the Boxer hunting ancestry before its later working roles", () => {
    const historyStep = getStandardBreedDetail("boxer")!.story.steps[0];

    expect(historyStep.body).toContain("큰 사냥감");
    expect(historyStep.body).toContain("가축 상인");
  });

  it.each([
    ["english-setter", "긴 줄을 정리", "긴 줄과 장비"],
    ["australian-cattle-dog", "표식과 긴 줄을 치운", "원통 표식과 긴 줄"],
  ])("keeps the %s third story step aligned with its visible gear-and-rest scene", (slug, titleDetail, altDetail) => {
    const thirdStep = getStandardBreedDetail(slug)!.story.steps[2];

    expect(thirdStep.title).toContain(titleDetail);
    expect(thirdStep.imageAlt).toContain(altDetail);
    expect(thirdStep.body).toMatch(/쉬/u);
  });

  it("uses ordinary Korean for the Australian Cattle Dog signal and Beauceron storage", () => {
    expect(getStandardBreedDetail("australian-cattle-dog")!.story.steps[1].body).toContain("보호자의 손짓");
    expect(getStandardBreedDetail("australian-cattle-dog")!.story.steps[1].body).not.toContain("열린 손");
    expect(getStandardBreedDetail("beauceron")!.story.steps[2].body).toContain("수납장");
    expect(JSON.stringify(getStandardBreedDetail("english-setter"))).not.toContain("보호자의 열린 손");
  });

  it.each([
    ["nova-scotia-duck-tolling-retriever", "nova-scotia-duck-tolling-retriever-history"],
    ["old-english-sheepdog", "fun-facts-old-english-sheepdog"],
    ["cane-corso", "cane-corso-history"],
    ["airedale-terrier", "history-of-the-airedale-terrier"],
    ["chow-chow", "fun-facts-chow-chow"],
    ["bedlington-terrier", "bedlington-terrier-history"],
    ["finnish-lapponian-dog", "finnish-lapphund-history"],
    ["leonberger", "history-behind-the-leonberger"],
    ["bull-terrier", "bull-terrier-history"],
    ["alaskan-malamute", "alaskan-malamute-history-arctic-sled"],
  ])("keeps a direct official history source for eighth editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["nova-scotia-duck-tolling-retriever", "갈대 뒤"],
    ["old-english-sheepdog", "돌담길"],
    ["cane-corso", "열린 문"],
    ["airedale-terrier", "에어 계곡"],
    ["chow-chow", "중국 북부"],
    ["bedlington-terrier", "광산 마을"],
    ["finnish-lapponian-dog", "순록 무리"],
    ["leonberger", "수레"],
    ["bull-terrier", "전람회"],
    ["alaskan-malamute", "무거운 짐"],
  ])("describes the visible history scene for eighth editorial review breed %s", (slug, visibleDetail) => {
    const alt = getBreed(slug)?.historyVisual?.alt ?? "";

    expect(alt).toContain(visibleDetail);
    expect(alt).not.toMatch(/원래 역할과 생활 환경|편집 초안 역사 장면/u);
  });

  it.each([
    ["nova-scotia-duck-tolling-retriever", "회수 도구", "마른 매트"],
    ["airedale-terrier", "뚜껑 있는 상자", "물그릇 옆 매트"],
    ["finnish-lapponian-dog", "운동 도구", "시원한 매트"],
  ])("keeps the %s third story step concrete and aligned with the visible rest scene", (slug, titleDetail, altDetail) => {
    const thirdStep = getStandardBreedDetail(slug)!.story.steps[2];

    expect(thirdStep.title).toContain(titleDetail);
    expect(thirdStep.imageAlt).toContain(altDetail);
    expect(thirdStep.body).toMatch(/정리|쉬/u);
  });

  it("states the Bull Terrier's ancestry and later show-breed refinement without translated signal copy", () => {
    const detail = getStandardBreedDetail("bull-terrier")!;

    expect(detail.story.steps[0].body).toContain("투견");
    expect(detail.story.steps[0].body).toContain("제임스 힝크스");
    expect(detail.story.steps[0].body).toContain("전람회");
    expect(JSON.stringify(detail)).not.toContain("열린 손");
  });

  it.each([
    ["miniature-pinscher", "miniature-pinscher-history"],
    ["clumber-spaniel", "clumber-spaniel-history"],
    ["tibetan-mastiff", "tibetan-mastiff-history"],
    ["australian-kelpie", "fun-facts-australian-kelpie"],
    ["curly-coated-retriever", "fun-facts-curly-coated-retriever"],
    ["border-terrier", "border-terrier-facts"],
    ["barbet", "barbet-2020-new-akc-recognized-breed"],
    ["basset-hound", "basset-hound-history"],
    ["afghan-hound", "afghan-hound-history"],
    ["boston-terrier", "boston-terrier-history"],
  ])("keeps a direct official history source for ninth editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["miniature-pinscher", "마구간"],
    ["clumber-spaniel", "클럼버 파크"],
    ["tibetan-mastiff", "유목민 천막"],
    ["australian-kelpie", "양 떼"],
    ["curly-coated-retriever", "물새"],
    ["border-terrier", "경계 언덕"],
    ["barbet", "물풀과 강가"],
    ["basset-hound", "울타리 길"],
    ["afghan-hound", "산악 지형"],
    ["boston-terrier", "붉은 벽돌"],
  ])("describes the visible history scene for ninth editorial review breed %s", (slug, visibleDetail) => {
    const alt = getBreed(slug)?.historyVisual?.alt ?? "";

    expect(alt).toContain(visibleDetail);
    expect(alt).not.toMatch(/원래 역할과 생활 환경|편집 초안 역사 장면/u);
  });

  it("uses concrete Korean for the Kelpie rest scene and Curly delivery cue", () => {
    const kelpie = getStandardBreedDetail("australian-kelpie")!;
    const curly = getStandardBreedDetail("curly-coated-retriever")!;

    expect(kelpie.story.steps[2].title).toContain("큰 공과 표식");
    expect(kelpie.story.steps[2].title).toContain("그늘진 매트");
    expect(curly.story.steps[1].body).toContain("내민 두 손");
    expect(JSON.stringify(curly)).not.toContain("열린 두 손");
  });

  it("states the Boston Terrier's early fighting ancestry before companion refinement", () => {
    const history = getStandardBreedDetail("boston-terrier")!.story.steps[0];

    expect(history.body).toContain("투견");
    expect(history.body).toContain("반려견");
    expect(history.title).toContain("불도그·테리어");
  });

  it("describes the Tibetan Mastiff's documented gate-guardian role without calling it a livestock guardian", () => {
    const detail = getStandardBreedDetail("tibetan-mastiff")!;

    expect(detail.story.steps[0].body).toContain("천막");
    expect(detail.story.steps[0].body).toContain("사원의 문");
    expect(detail.story.steps[0].body).not.toContain("가축 주변을 지키");
  });

  it.each([
    ["rhodesian-ridgeback", "rhodesian-ridgeback-once-hunted-lions"],
    ["collie-rough", "collie-history-queen-victoria-lassie-beyond"],
    ["affenpinscher", "affenpinscher-history"],
    ["bearded-collie", "bearded-collie-collection"],
    ["bloodhound", "bloodhound-history"],
    ["briard", "briard-breed-history-thomas-jefferson"],
    ["borzoi", "borzoi-history"],
    ["italian-pointing-dog", "bracco-italiano-becomes-newest-akc-recognized-dog-breed"],
    ["dalmatian", "dalmatian-history"],
    ["continental-toy-spaniel", "pappy-anniversary-papillon-joins-akc-century-club"],
    ["dobermann", "doberman-pinscher-history"],
  ])("keeps a direct official history source for final editorial review breed %s", (slug, urlPart) => {
    expect(getBreed(slug)?.sources.some((source) => source.url.includes(urlPart))).toBe(true);
  });

  it.each([
    ["rhodesian-ridgeback", "넓은 초원"],
    ["collie-rough", "언덕 목초지"],
    ["affenpinscher", "마구간과 부엌"],
    ["bearded-collie", "바위와 경사"],
    ["bloodhound", "아르덴"],
    ["briard", "저지대 목초지"],
    ["borzoi", "말을 탄 사냥대"],
    ["italian-pointing-dog", "코를 높이"],
    ["dalmatian", "말이 끄는 마차"],
    ["maltipoo", "말티즈와 토이·미니어처 푸들"],
    ["continental-toy-spaniel", "유럽 저택"],
    ["dobermann", "19세기 독일 도시"],
  ])("describes the visible history scene for final editorial review breed %s", (slug, visibleDetail) => {
    const alt = getBreed(slug)?.historyVisual?.alt ?? "";

    expect(alt).toContain(visibleDetail);
    expect(alt).not.toMatch(/원래 역할과 생활 환경|편집 초안 역사 장면/u);
  });

  it.each([
    ["maltipoo", "리드와 장난감", "리드와 공 장난감"],
    ["continental-toy-spaniel", "리드를 정리", "냄새 주머니와 리드"],
    ["dobermann", "하네스를 풀고", "하네스와 느슨한 리드"],
  ])("keeps the %s daily rest copy aligned with its visible equipment", (slug, titleDetail, altDetail) => {
    const thirdStep = getStandardBreedDetail(slug)!.story.steps[2];

    expect(thirdStep.title).toContain(titleDetail);
    expect(thirdStep.imageAlt).toContain(altDetail);
    expect(thirdStep.body).toMatch(/정리|쉬/u);
  });

  it("keeps Papillon and Dobermann history concrete and removes translated open-hand copy", () => {
    expect(getStandardBreedDetail("continental-toy-spaniel")!.story.steps[0].body).toMatch(/파피용.*파렌/u);
    expect(getStandardBreedDetail("dobermann")!.story.steps[0].body).toContain("세금 징수원");
    expect(JSON.stringify(details)).not.toContain("열린 손");
  });

  it.each(details)("keeps every $nameKo story and reality image distinct and available", (detail) => {
    const images = [
      ...detail.story.steps.map((step) => step.image),
      ...detail.realities.flatMap((reality) => reality.image ? [reality.image] : []),
    ];

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

  it("avoids internal editorial jargon, broken Korean particles, and the old repeated filler copy", () => {
    const exposedCopy = JSON.stringify(details);

    const opaqueCopy = exposedCopy.match(
      /관계 거리|사람 신호|활동 종료|시야를 닫|중심 매트|중앙 매트|위치 알림|보호자 재확인|몸 점검|라인 브러싱|(?<!이)루어|구조화된|선택형|사람의 열린 손|다음 과제|닫힌 장/u,
    )?.[0];
    expect(opaqueCopy ?? null).toBeNull();
    expect(exposedCopy).not.toMatch(/참여과|관계과|안전과 오늘|더위과|주의과|신뢰과|회수과|과제과|거리과|보행과 오늘/u);
    expect(exposedCopy).not.toContain("과거의 역할은 오늘의 생활에서도 환경 선택과 회복 루틴에 영향을 줘요.");
    expect(exposedCopy).not.toContain("같은 견종 안에서도 성향과 건강은 다를 수 있어요. 이 설명은 경향을 이해하는 출발점으로만 사용해 주세요.");
    expect(exposedCopy).not.toContain("비슷해 보여도 활동 방식과 관리 부담은 달라요. 이름보다 실제 생활 조건을 함께 비교해 보세요.");
  });

  it.each(details)("links only existing related breeds and retains $nameKo internal source data", (detail) => {
    Object.keys(detail.relatedDifferences).forEach((slug) => expect(getBreed(slug)).toBeDefined());
    expect(getBreed(detail.slug)?.sources.length).toBeGreaterThanOrEqual(2);
  });
});
