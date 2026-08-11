import { describe, expect, it } from "vitest";

import { hasFinalConsonant } from "../../lib/korean-particles";
import { breeds } from "./data";

type CopyEntry = {
  slug: string;
  path: string;
  value: string;
};

const skippedPathParts = new Set([
  "slug",
  "nameEn",
  "palette",
  "illustration",
  "src",
  "sources",
  "contentStatus",
  "group",
]);

function collectDisplayCopy(
  value: unknown,
  slug: string,
  path: string[] = [],
  entries: CopyEntry[] = [],
) {
  if (path.some((part) => skippedPathParts.has(part))) return entries;

  if (typeof value === "string") {
    entries.push({ slug, path: path.join("."), value });
    return entries;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectDisplayCopy(item, slug, [...path, String(index)], entries),
    );
    return entries;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) =>
      collectDisplayCopy(item, slug, [...path, key], entries),
    );
  }

  return entries;
}

const displayCopy = breeds.flatMap((breed) =>
  collectDisplayCopy(breed, breed.slug),
);

const blockedPatterns = [
  /\uFFFD/u,
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u,
  / {2,}/u,
  /\s+[,.!?]/u,
  /([,.!?])\1/u,
  /되요|돼어|몇일|어떻해|역활|금새|안되|않되|할께|할려고/u,
  /기민|다정한 일상|특별한 친구|완벽|항상|절대|잘 맞|키우기 쉬|아파트에 적합|초보자(?:에게)? 추천|궁합|천사/u,
  /(?:Ã.|Â.|â€|ì[\u0080-\u00FF]|ë[\u0080-\u00FF]|ê[\u0080-\u00FF])/u,
];

describe("breed Korean copy quality", () => {
  it("keeps display copy free of known encoding, spacing, typo, and claim issues", () => {
    const findings = displayCopy.filter(({ value }) =>
      blockedPatterns.some((pattern) => pattern.test(value)),
    );

    expect(findings).toEqual([]);
  });

  it("does not leave Korean display fields as English-only copy", () => {
    const findings = displayCopy.filter(
      ({ path, value }) =>
        path !== "identity.lifespan" &&
        /^[\x20-\x7E]+$/u.test(value) &&
        /[A-Za-z]/u.test(value),
    );

    expect(findings).toEqual([]);
  });

  it("uses the natural topic particle after each Korean breed name", () => {
    const findings = breeds.flatMap((breed) => {
      const wrongPrefix = `${breed.nameKo}${hasFinalConsonant(breed.nameKo) ? "는" : "은"}`;
      return collectDisplayCopy(breed, breed.slug).filter(({ value }) =>
        value.startsWith(wrongPrefix),
      );
    });

    expect(findings).toEqual([]);
  });

  it("uses natural object particles in generated role phrases", () => {
    const particlePattern = /([가-힣]+)([을를]) (?=위해|맡으며|해온)/gu;
    const findings = displayCopy.flatMap((entry) =>
      [...entry.value.matchAll(particlePattern)]
        .filter((match) => {
          const [, stem, particle] = match;
          return particle !== (hasFinalConsonant(stem) ? "을" : "를");
        })
        .map((match) => ({ ...entry, match: match[0] })),
    );

    expect(findings).toEqual([]);
  });
});
