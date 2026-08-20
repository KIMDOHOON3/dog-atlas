import type { Breed } from "@/content/breeds/schema";

type BreedFactOverride = {
  size?: string;
  height?: string;
  weight?: string;
  lifespan?: string;
};

// Values below normalize measurements already supported by the official
// breed sources linked from each detail page. They are presentation values,
// so source names and editorial caveats stay in the source section.
const breedFactOverrides: Record<string, BreedFactOverride> = {
  "japanese-spitz": {
    size: "30~38cm · 5~11kg",
    height: "30~38cm",
    weight: "5~11kg",
  },
  maltese: {
    size: "18~23cm · 3.2kg 이하",
    height: "18~23cm",
    weight: "3.2kg 이하",
    lifespan: "12~15년",
  },
  "border-collie": {
    size: "46~56cm · 14~25kg",
    height: "46~56cm",
    weight: "14~25kg",
    lifespan: "12~15년",
  },
  greyhound: {
    size: "69~76cm · 27~32kg",
    height: "69~76cm",
    weight: "27~32kg",
  },
  "yakutian-laika": {
    size: "53~59cm · 18~25kg",
    height: "53~59cm",
    weight: "18~25kg",
  },
  samoyed: {
    size: "48~60cm · 16~30kg",
    height: "48~60cm",
    weight: "16~30kg",
  },
  chihuahua: {
    size: "13~20cm · 2.7kg 이하",
    height: "13~20cm",
    weight: "2.7kg 이하",
  },
  "shih-tzu": {
    size: "27cm 이하 · 4.5~8kg",
    height: "27cm 이하",
    weight: "4.5~8kg",
  },
  poodle: {
    size: "토이 23~28cm · 미니어처 28~35cm · 미디엄 35~45cm · 스탠더드 45~62cm",
    lifespan: "10~18년",
  },
  dachshund: { size: "래빗 25~32cm · 미니어처 30~37cm · 스탠더드 35~47cm(가슴둘레)" },
  beagle: {
    size: "33~40cm · 9~14kg",
    height: "33~40cm",
    weight: "9~14kg",
  },
  "english-cocker-spaniel": {
    size: "38~41cm · 12~15kg",
    height: "38~41cm",
    weight: "12~15kg",
  },
  "labrador-retriever": {
    size: "55~62cm · 25~36kg",
    height: "55~62cm",
    weight: "25~36kg",
  },
  "golden-retriever": {
    size: "55~61cm · 25~34kg",
    height: "55~61cm",
    weight: "25~34kg",
  },
  "german-spitz": { size: "바라이어티별 18~55cm" },
  "bull-terrier": { size: "53~56cm · 23~32kg" },
};

function normalizeRange(value: string) {
  return value.replace(/[–—-]/gu, "~").replace(/\s*~\s*/gu, "~");
}

export function getBreedSizeDisplay(breed: Breed): string | undefined {
  const override = breedFactOverrides[breed.slug]?.size;
  if (override) return override;

  const measurements = normalizeRange(breed.identity.size)
    .replace(/\([^)]*\)/gu, "")
    .split(/[·,]/u)
    .map((part) =>
      part
        .trim()
        .replace(/(?:AKC|RKC|UKC|FCI)\s*참고\s*/gu, "")
        .replace(/약\s*/gu, ""),
    )
    .filter((part) => /\d/u.test(part) && /(cm|kg)/u.test(part));

  return measurements.length > 0 ? measurements.join(" · ") : undefined;
}

export function getBreedLifespanDisplay(breed: Breed): string | undefined {
  const override = breedFactOverrides[breed.slug]?.lifespan;
  if (override) return override;

  const normalized = normalizeRange(breed.identity.lifespan);
  const match = normalized.match(/\d+(?:\.\d+)?(?:~\d+(?:\.\d+)?)?년(?:\s*(?:이상|이하))?/u);
  return match?.[0];
}

export function getBreedFactPresentation(breed: Breed) {
  const override = breedFactOverrides[breed.slug];

  return {
    size: getBreedSizeDisplay(breed),
    height: override?.height,
    weight: override?.weight,
    lifespan: getBreedLifespanDisplay(breed),
  };
}
