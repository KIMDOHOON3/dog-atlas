import { describe, expect, it } from "vitest";

import { breeds, getBreed } from "@/content/breeds/data";
import { familiarKoreaBreeds } from "@/content/familiar-korea-breeds";
import { poodleDetail } from "@/content/poodle-detail/data";
import { getStandardBreedDetail } from "@/content/standard-breed-detail/data";
import {
  getBreedFactPresentation,
  getBreedLifespanDisplay,
  getBreedSizeDisplay,
  getBreedSizeFactRows,
} from "./breed-fact-presentation";

describe("breed fact presentation", () => {
  it("presents the Pomeranian variety size instead of the full German Spitz range", () => {
    expect(getBreedFactPresentation(getBreed("german-spitz")!)).toMatchObject({
      size: "18~24cm · 1.4~3.2kg",
      height: "18~24cm",
      weight: "1.4~3.2kg",
    });
  });
  it("separates Japanese Spitz height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("japanese-spitz")!);

    expect(facts).toMatchObject({
      size: "30~38cm · 5~11kg",
      height: "30~38cm",
      weight: "5~11kg",
    });
  });

  it("separates Maltese height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("maltese")!);

    expect(facts).toMatchObject({
      size: "18~23cm · 3.2kg 이하",
      height: "18~23cm",
      weight: "3.2kg 이하",
    });
  });

  it("separates Border Collie height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("border-collie")!);

    expect(facts).toMatchObject({
      size: "46~56cm · 14~25kg",
      height: "46~56cm",
      weight: "14~25kg",
    });
  });

  it("separates Greyhound height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("greyhound")!);

    expect(facts).toMatchObject({
      size: "69~76cm · 27~32kg",
      height: "69~76cm",
      weight: "27~32kg",
    });
  });

  it("separates Yakutian Laika height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("yakutian-laika")!);

    expect(facts).toMatchObject({
      size: "53~59cm · 18~25kg",
      height: "53~59cm",
      weight: "18~25kg",
    });
  });

  it("separates Samoyed height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("samoyed")!);

    expect(facts).toMatchObject({
      size: "48~60cm · 16~30kg",
      height: "48~60cm",
      weight: "16~30kg",
    });
  });

  it("separates Chihuahua height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("chihuahua")!);

    expect(facts).toMatchObject({
      size: "13~20cm · 2.7kg 이하",
      height: "13~20cm",
      weight: "2.7kg 이하",
    });
  });

  it("separates Shih Tzu height and weight for the detail summary", () => {
    const facts = getBreedFactPresentation(getBreed("shih-tzu")!);

    expect(facts).toMatchObject({
      size: "27cm 이하 · 4.5~8kg",
      height: "27cm 이하",
      weight: "4.5~8kg",
    });
  });

  it("shows compact numeric facts for poodle", () => {
    const poodle = getBreed("poodle")!;

    expect(getBreedSizeDisplay(poodle)).toBe(
      "토이 23~28cm · 미니어처 28~35cm · 미디엄 35~45cm · 스탠더드 45~62cm",
    );
    expect(getBreedLifespanDisplay(poodle)).toBe("10~18년");
    expect(getBreedFactPresentation(poodle).height).toBeUndefined();
    expect(getBreedFactPresentation(poodle).weight).toBeUndefined();
  });

  it("separates height and weight for the first five-breed rollout batch", () => {
    const expected = {
      beagle: { size: "33~40cm · 9~14kg", height: "33~40cm", weight: "9~14kg" },
      "english-cocker-spaniel": { size: "38~41cm · 12~15kg", height: "38~41cm", weight: "12~15kg" },
      "labrador-retriever": { size: "55~62cm · 25~36kg", height: "55~62cm", weight: "25~36kg" },
      "golden-retriever": { size: "55~61cm · 25~34kg", height: "55~61cm", weight: "25~34kg" },
    } as const;

    for (const [slug, facts] of Object.entries(expected)) {
      expect(getBreedFactPresentation(getBreed(slug)!)).toMatchObject(facts);
    }

    expect(getBreedSizeDisplay(getBreed("dachshund")!)).toBe(
      "래빗 25~32cm · 미니어처 30~37cm · 스탠더드 35~47cm(가슴둘레)",
    );
  });

  it("presents verified measurements for the second five-breed rollout batch", () => {
    const expected = {
      "german-shepherd-dog": { size: "55~65cm · 22~40kg", height: "55~65cm", weight: "22~40kg" },
      "korea-jindo-dog": { size: "45~55cm · 15~23kg", height: "45~55cm", weight: "15~23kg" },
      "siberian-husky": { size: "50.5~60cm · 15.5~28kg", height: "50.5~60cm", weight: "15.5~28kg" },
      whippet: { size: "44~51cm · 11~18kg", height: "44~51cm", weight: "11~18kg" },
      "pyrenean-mountain-dog": {
        size: "65~80cm · 암컷 약 39kg · 수컷 약 45kg",
        height: "65~80cm",
        weight: "암컷 약 39kg · 수컷 약 45kg",
      },
      "french-bulldog": { size: "24~35cm · 8~14kg", height: "24~35cm", weight: "8~14kg" },
      basenji: { size: "40~43cm · 9.5~11kg", height: "40~43cm", weight: "9.5~11kg" },
      "welsh-corgi-pembroke": { size: "25~30cm · 9~12kg", height: "25~30cm", weight: "9~12kg" },
      "miniature-schnauzer": { size: "30~35cm · 4~8kg", height: "30~35cm", weight: "4~8kg" },
      "yorkshire-terrier": { size: "약 20cm · 3.2kg 이하", height: "약 20cm", weight: "3.2kg 이하" },
      shiba: { size: "35~41cm · 7~11kg", height: "35~41cm", weight: "7~11kg" },
      akita: { size: "58~70cm", height: "58~70cm", weight: undefined },
      "bichon-frise": { size: "25~29cm · 약 5kg", height: "25~29cm", weight: "약 5kg" },
      "cavalier-king-charles-spaniel": { size: "30~33cm · 5.4~8kg", height: "30~33cm", weight: "5.4~8kg" },
      pug: { size: "25~33cm · 6.3~8.1kg", height: "25~33cm", weight: "6.3~8.1kg" },
    } as const;

    for (const [slug, facts] of Object.entries(expected)) {
      expect(getBreedFactPresentation(getBreed(slug)!)).toMatchObject(facts);
    }
  });

  it("presents compact measurements for the current five-breed rollout batch", () => {
    const expected = {
      "bernese-mountain-dog": { size: "58~70cm · 35~55kg", height: "58~70cm", weight: "35~55kg" },
      dobermann: { size: "63~72cm · 32~45kg", height: "63~72cm", weight: "32~45kg" },
      "german-spitz": { size: "18~24cm · 1.4~3.2kg", height: "18~24cm", weight: "1.4~3.2kg" },
      "shetland-sheepdog": { size: "33~41cm · 7~11kg", height: "33~41cm", weight: "7~11kg" },
      "australian-shepherd": { size: "46~58cm · 18~29kg", height: "46~58cm", weight: "18~29kg" },
    } as const;

    for (const [slug, facts] of Object.entries(expected)) {
      expect(getBreedFactPresentation(getBreed(slug)!)).toMatchObject(facts);
    }
  });

  it("keeps source and editorial wording out of every visible fact", () => {
    const bannedCopy = /(참고|출처|검토|확인|상담|개체|자료|알려짐)/u;

    for (const breed of breeds) {
      const facts = getBreedFactPresentation(breed);
      if (facts.size) {
        expect(facts.size, `${breed.slug} size`).toMatch(/\d/u);
        expect(facts.size, `${breed.slug} size`).toMatch(/(cm|kg)/u);
        expect(facts.size, `${breed.slug} size`).not.toMatch(bannedCopy);
      }
      if (facts.lifespan) {
        expect(facts.lifespan, `${breed.slug} lifespan`).toMatch(/^\d+(?:\.\d+)?(?:~\d+(?:\.\d+)?)?년(?:\s*(?:이상|이하))?$/u);
        expect(facts.lifespan, `${breed.slug} lifespan`).not.toMatch(bannedCopy);
      }
    }
  });

  it("does not invent measurements when a verified numeric range is absent", () => {
    expect(getBreedSizeDisplay(getBreed("goldendoodle")!)).toBeUndefined();
    expect(getBreedLifespanDisplay(getBreed("goldendoodle")!)).toBeUndefined();
  });

  it("shows both height and weight for every familiar breed without a variety selector", () => {
    const varietySelectorSlugs = new Set(["poodle", "dachshund"]);

    for (const { slug } of familiarKoreaBreeds) {
      if (varietySelectorSlugs.has(slug)) continue;
      const facts = getBreedFactPresentation(getBreed(slug)!);
      expect(facts.height, `${slug} height`).toBeTruthy();
      expect(facts.weight, `${slug} weight`).toBeTruthy();
    }

    expect(poodleDetail.heroSizeRows).toEqual([
      { label: "구분", value: "4가지" },
      { label: "체고", value: "23~62cm" },
    ]);
    expect(getStandardBreedDetail("dachshund")?.sizeVarieties?.summaryRows).toHaveLength(3);
  });

  it("gives every standard detail a structured size row instead of raw copy", () => {
    const exceptions = new Set(["poodle", "dachshund", "pyrenean-mountain-dog", "mongolian-bankhar"]);
    const standardBreeds = breeds.filter((breed) => breed.slug === "poodle" || getStandardBreedDetail(breed.slug));

    expect(standardBreeds).toHaveLength(184);
    for (const breed of standardBreeds) {
      if (exceptions.has(breed.slug)) continue;
      const rows = getBreedSizeFactRows(getBreedFactPresentation(breed));
      expect(rows.length, breed.slug).toBeGreaterThan(0);
      rows.forEach((row) => expect(row.value, `${breed.slug} ${row.label}`).not.toMatch(/(?:cm|kg)(?:이상|이하)/u));
    }
  });

  it("shows height and weight for every post-100 expansion, with an explicit landrace basis", () => {
    const numericSizeSlugs = [
      "american-cocker-spaniel",
      "belgian-groenendael",
      "caucasian-shepherd-dog",
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
    ];

    numericSizeSlugs.forEach((slug) => {
      const facts = getBreedFactPresentation(getBreed(slug)!);
      expect(facts.height, `${slug} height`).toBeTruthy();
      expect(facts.weight, `${slug} weight`).toBeTruthy();
    });

    const bankharSize = getStandardBreedDetail("mongolian-bankhar")?.heroSizeDetails;
    expect(bankharSize?.summaryRows).toEqual([
      { label: "기준", value: "보존 프로젝트 평균" },
      { label: "체고", value: "수컷 약 76cm" },
      { label: "몸무게", value: "암컷 약 45kg · 수컷 약 54kg" },
    ]);
    expect(bankharSize?.items).toHaveLength(2);
  });

  it("normalizes the previously inconsistent size cards", () => {
    expect(getBreedSizeFactRows(getBreedFactPresentation(getBreed("bull-terrier")!))).toEqual([
      { label: "체고", value: "53~56cm" },
      { label: "몸무게", value: "23~32kg" },
    ]);
    expect(getBreedSizeFactRows(getBreedFactPresentation(getBreed("boston-terrier")!))).toEqual([
      { label: "몸무게", value: "11kg 이하" },
    ]);
    expect(getBreedSizeFactRows(getBreedFactPresentation(getBreed("borzoi")!))[0]?.value).toContain("암컷 66cm 이상");
    expect(getBreedSizeFactRows(getBreedFactPresentation(getBreed("old-english-sheepdog")!))[0]?.value).toContain("암컷 56cm 이상");
    expect(getBreedSizeFactRows(getBreedFactPresentation(getBreed("maltipoo")!))).toEqual([
      { label: "예상 크기", value: "부모 크기에 따라 다름" },
    ]);
    });
  });

  it("keeps batch-03 official size distinctions instead of filling absent standards", () => {
    expect(getBreedFactPresentation(getBreed("cairn-terrier")!)).toMatchObject({
      height: "약 28~31cm",
      weight: "6~7.5kg",
    });
    expect(getBreedFactPresentation(getBreed("norfolk-terrier")!)).toMatchObject({
      height: "이상적 체고 약 25cm",
      weight: "5~6kg",
    });
    expect(getBreedFactPresentation(getBreed("norwich-terrier")!)).toMatchObject({
      height: "이상적 체고 약 25cm",
      weight: "5~6kg",
    });
    expect(getBreedFactPresentation(getBreed("miniature-bull-terrier")!)).toMatchObject({
      height: "25.4~35.6cm",
      weight: "고정 기준 없음",
    });
  });
