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
  "icelandic-sheepdog": { size: "42~46cm · 9~14kg", height: "42~46cm", weight: "9~14kg" },
  "dutch-shepherd-dog": { size: "55~62cm · 19~34kg", height: "55~62cm", weight: "19~34kg" },
  mastiff: { size: "70cm 이상 · 54~104kg", height: "70cm 이상", weight: "54~104kg" },
  "soft-coated-wheaten-terrier": { size: "43~48cm · 14~18kg", height: "43~48cm", weight: "14~18kg" },
  otterhound: { size: "61~69cm · 36~52kg", height: "61~69cm", weight: "36~52kg" },
  "belgian-laekenois": { size: "56~66cm · 20~30kg", height: "56~66cm", weight: "20~30kg" },
  "czechoslovakian-wolfdog": { size: "60cm 이상 · 20kg 이상", height: "60cm 이상", weight: "20kg 이상" },
  "bouvier-des-flandres": { size: "59~68cm · 27~40kg", height: "59~68cm", weight: "27~40kg" },
  "miniature-american-shepherd": { size: "33~46cm · 9~18kg", height: "33~46cm", weight: "9~18kg" },
  "dogo-argentino": { size: "61~67cm · 40~45kg", height: "61~67cm", weight: "40~45kg" },
  puli: { size: "36~45cm · 10~15kg", height: "36~45cm", weight: "10~15kg" },
  "white-swiss-shepherd-dog": { size: "53~66cm · 25~40kg", height: "53~66cm", weight: "25~40kg" },
  "welsh-corgi-cardigan": { size: "27~32cm · 11~17kg", height: "27~32cm", weight: "11~17kg" },
  "shar-pei": { size: "44~51cm · 20~27kg", height: "44~51cm", weight: "20~27kg" },
  bulldog: { size: "31~40cm · 18~25kg", height: "31~40cm", weight: "18~25kg" },
  "american-akita": { size: "61~71cm · 32~59kg", height: "61~71cm", weight: "32~59kg" },
  "finnish-spitz": { size: "39~50cm · 9~15kg", height: "39~50cm", weight: "9~15kg" },
  "karelian-bear-dog": { size: "49~60cm · 17~28kg", height: "49~60cm", weight: "17~28kg" },
  "lhasa-apso": { size: "25~28cm · 5~8kg", height: "25~28cm", weight: "5~8kg" },
  "tibetan-spaniel": { size: "24~26cm · 4~7kg", height: "24~26cm", weight: "4~7kg" },
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
  "german-shepherd-dog": {
    size: "55~65cm · 22~40kg",
    height: "55~65cm",
    weight: "22~40kg",
  },
  "korea-jindo-dog": {
    size: "45~55cm · 15~23kg",
    height: "45~55cm",
    weight: "15~23kg",
  },
  "siberian-husky": {
    size: "50.5~60cm · 15.5~28kg",
    height: "50.5~60cm",
    weight: "15.5~28kg",
  },
  whippet: {
    size: "44~51cm · 11~18kg",
    height: "44~51cm",
    weight: "11~18kg",
  },
  "pyrenean-mountain-dog": {
    size: "65~80cm · 암컷 약 39kg · 수컷 약 45kg",
    height: "65~80cm",
    weight: "암컷 약 39kg · 수컷 약 45kg",
  },
  "french-bulldog": {
    size: "24~35cm · 8~14kg",
    height: "24~35cm",
    weight: "8~14kg",
  },
  basenji: {
    size: "40~43cm · 9.5~11kg",
    height: "40~43cm",
    weight: "9.5~11kg",
  },
  "welsh-corgi-pembroke": {
    size: "25~30cm · 9~12kg",
    height: "25~30cm",
    weight: "9~12kg",
  },
  "miniature-schnauzer": {
    size: "30~35cm · 4~8kg",
    height: "30~35cm",
    weight: "4~8kg",
  },
  "yorkshire-terrier": {
    size: "약 20cm · 3.2kg 이하",
    height: "약 20cm",
    weight: "3.2kg 이하",
  },
  maltipoo: {
    height: "부모 크기에 따라 다름",
    weight: "부모 크기에 따라 다름",
  },
  shiba: {
    size: "35~41cm · 7~11kg",
    height: "35~41cm",
    weight: "7~11kg",
  },
  akita: {
    size: "58~70cm",
    height: "58~70cm",
  },
  "bichon-frise": {
    size: "25~29cm · 약 5kg",
    height: "25~29cm",
    weight: "약 5kg",
  },
  "cavalier-king-charles-spaniel": {
    size: "30~33cm · 5.4~8kg",
    height: "30~33cm",
    weight: "5.4~8kg",
  },
  pug: {
    size: "25~33cm · 6.3~8.1kg",
    height: "25~33cm",
    weight: "6.3~8.1kg",
  },
  "bernese-mountain-dog": {
    size: "58~70cm · 35~55kg",
    height: "58~70cm",
    weight: "35~55kg",
  },
  dobermann: {
    size: "63~72cm · 32~45kg",
    height: "63~72cm",
    weight: "32~45kg",
  },
  "german-spitz": {
    size: "18~24cm · 1.4~3.2kg",
    height: "18~24cm",
    weight: "1.4~3.2kg",
  },
  "shetland-sheepdog": {
    size: "33~41cm · 7~11kg",
    height: "33~41cm",
    weight: "7~11kg",
  },
  "australian-shepherd": {
    size: "46~58cm · 18~29kg",
    height: "46~58cm",
    weight: "18~29kg",
  },
  boxer: {
    size: "53~63cm",
    height: "53~63cm",
  },
  "alaskan-malamute": {
    size: "58~64cm",
    height: "58~64cm",
  },
  "boston-terrier": {
    size: "11kg 이하",
    weight: "11kg 이하",
  },
  "chow-chow": {
    size: "46~56cm",
    height: "46~56cm",
  },
  weimaraner: {
    size: "57~70cm",
    height: "57~70cm",
  },
  "nova-scotia-duck-tolling-retriever": {
    size: "45~51cm",
    height: "45~51cm",
  },
  "old-english-sheepdog": {
    size: "수컷 61cm 이상 · 암컷 56cm 이상",
    height: "수컷 61cm 이상 · 암컷 56cm 이상",
  },
  borzoi: {
    size: "수컷 71cm 이상 · 암컷 66cm 이상 · 약 27~48kg",
    height: "수컷 71cm 이상 · 암컷 66cm 이상",
    weight: "약 27~48kg",
  },
  "bull-terrier": {
    size: "53~56cm · 23~32kg",
    height: "53~56cm",
    weight: "23~32kg",
  },
  "continental-toy-spaniel": {
    size: "20~28cm · 2.3~4.5kg",
    height: "20~28cm",
    weight: "2.3~4.5kg",
  },
  "italian-sighthound": {
    size: "32~38cm · 5kg 이하",
    height: "32~38cm",
    weight: "5kg 이하",
  },
  "jack-russell-terrier": {
    size: "25~30cm · 5~6kg",
    height: "25~30cm",
    weight: "5~6kg",
  },
  rottweiler: {
    size: "56~69cm · 36~61kg",
    height: "56~69cm",
    weight: "36~61kg",
  },
  dalmatian: {
    size: "54~62cm · 20~32kg",
    height: "54~62cm",
    weight: "20~32kg",
  },
  "great-dane": {
    size: "72~90cm · 50~79kg",
    height: "72~90cm",
    weight: "50~79kg",
  },
  "saint-bernard": {
    size: "65~90cm · 54~82kg",
    height: "65~90cm",
    weight: "54~82kg",
  },
  boerboel: {
    size: "암컷 56~64cm · 수컷 61~69cm · 68~91kg",
    height: "암컷 56~64cm · 수컷 61~69cm",
    weight: "68~91kg",
  },
};

function normalizeRange(value: string) {
  return value.replace(/[–—-]/gu, "~").replace(/\s*~\s*/gu, "~");
}

function normalizeMeasurementValue(value: string) {
  return value
    .replace(/\s*~\s*/gu, "~")
    .replace(/\s*(cm|kg)/gu, "$1")
    .replace(/(cm|kg)\s*(이상|이하)/gu, "$1 $2")
    .trim();
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
  const measurements = normalizeRange(breed.identity.size)
    .split(/[·,]/u)
    .map((part) => part.trim());
  const height = measurements.find((part) => /cm/u.test(part))
    ?.replace(/^.*?(?=\d)/u, "")
    .replace(/^약\s*/u, "약 ");
  const weight = measurements.find((part) => /kg/u.test(part))
    ?.replace(/^.*?(?=(?:최대\s*)?(?:약\s*)?\d)/u, "")
    .replace(/^최대\s*약\s*/u, "최대 ")
    .replace(/^약\s*/u, "약 ");

  return {
    size: getBreedSizeDisplay(breed),
    height: override?.height ?? (height ? normalizeMeasurementValue(height) : undefined),
    weight: override?.weight ?? (weight ? normalizeMeasurementValue(weight) : undefined),
    lifespan: getBreedLifespanDisplay(breed),
  };
}

export type BreedSizeFactRow = { label: string; value: string };

export function getBreedSizeFactRows(facts: ReturnType<typeof getBreedFactPresentation>): BreedSizeFactRow[] {
  if (facts.height && facts.height === facts.weight) {
    return [{ label: "예상 크기", value: facts.height }];
  }

  return [
    ...(facts.height ? [{ label: "체고", value: facts.height }] : []),
    ...(facts.weight ? [{ label: "몸무게", value: facts.weight }] : []),
  ];
}
