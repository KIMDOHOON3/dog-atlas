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

  it("shows compact numeric facts for poodle", () => {
    const poodle = getBreed("poodle")!;

    expect(getBreedSizeDisplay(poodle)).toBe(
      "토이 25cm 이하 · 미니어처 25~38cm · 스탠더드 38cm 초과",
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
