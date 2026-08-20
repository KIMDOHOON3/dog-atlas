import { describe, expect, it } from "vitest";

import { breeds, getBreed } from "@/content/breeds/data";
import {
  getBreedFactPresentation,
  getBreedLifespanDisplay,
  getBreedSizeDisplay,
} from "./breed-fact-presentation";

describe("breed fact presentation", () => {
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
});
