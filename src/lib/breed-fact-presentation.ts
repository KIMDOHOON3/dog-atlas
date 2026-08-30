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
  "bedlington-terrier": { size: "약 41cm · 8~10kg", height: "약 41cm", weight: "8~10kg" },
  "manchester-terrier": { size: "38~41cm · 고정 기준 없음", height: "38~41cm", weight: "고정 기준 없음" },
  "cesky-terrier": { size: "25~32cm · 6~10kg", height: "25~32cm", weight: "6~10kg" },
  "thai-ridgeback": { size: "48.5~63.5cm · 고정 기준 없음", height: "48.5~63.5cm", weight: "고정 기준 없음" },
  "portuguese-podengo": { size: "유형별 20~70cm · 4~30kg", height: "유형별 20~70cm", weight: "유형별 4~30kg" },
  "greenland-dog": { size: "암컷 55cm 이상 · 수컷 60cm 이상 · 고정 기준 없음", height: "암컷 55cm 이상 · 수컷 60cm 이상", weight: "고정 기준 없음" },
  "peruvian-hairless-dog": { size: "유형별 25~65cm · 4~30kg", height: "유형별 25~65cm", weight: "유형별 4~30kg" },
  "cirneco-dell-etna": { size: "42~52cm · 8~13kg", height: "42~52cm", weight: "8~13kg" },
  "gascon-saintongeois": { size: "유형·성별 54~72cm · 고정 기준 없음", height: "유형·성별 54~72cm", weight: "고정 기준 없음" },
  "grand-basset-griffon-vendeen": { size: "38~45cm · 고정 기준 없음", height: "38~45cm", weight: "고정 기준 없음" },
  "schweizer-laufhund": { size: "47~59cm · 고정 기준 없음", height: "47~59cm", weight: "고정 기준 없음" },
  porcelaine: { size: "53~58cm · 고정 기준 없음", height: "53~58cm", weight: "고정 기준 없음" },
  "petit-bleu-de-gascogne": { size: "50~58cm · 고정 기준 없음", height: "50~58cm", weight: "고정 기준 없음" },
  "gordon-setter": { size: "62~66cm · 25.5~29.5kg", height: "62~66cm", weight: "25.5~29.5kg" },
  "german-long-haired-pointer": { size: "58~70cm · 평균 약 30kg", height: "58~70cm", weight: "평균 약 30kg" },
  "french-spaniel": { size: "54~63cm · 고정 기준 없음", height: "54~63cm", weight: "고정 기준 없음" },
  "braque-saint-germain": { size: "54~64cm · 고정 기준 없음", height: "54~64cm", weight: "고정 기준 없음" },
  "irish-water-spaniel": { size: "51~59cm · 20~31kg", height: "51~59cm", weight: "20~31kg" },
  "spanish-water-dog": { size: "40~50cm · 14~22kg", height: "40~50cm", weight: "14~22kg" },
  "american-water-spaniel": { size: "38~46cm · 11~20kg", height: "38~46cm", weight: "11~20kg" },
  "tibetan-terrier": { size: "수컷 36~41cm · 암컷은 약간 작음 · 8~14kg", height: "수컷 36~41cm · 암컷은 약간 작음", weight: "8~14kg" },
  "japanese-chin": { size: "수컷 약 25cm · 암컷은 약간 작음 · 3.2~5kg", height: "수컷 약 25cm · 암컷은 약간 작음", weight: "3.2~5kg" },
  "prague-ratter": { size: "20~24cm · 약 2.6kg", height: "20~24cm", weight: "약 2.6kg" },
  azawakh: { size: "60~74cm · 15~25kg", height: "60~74cm", weight: "15~25kg" },
  sloughi: { size: "61~72cm · 20~29kg", height: "61~72cm", weight: "20~29kg" },
  "galgo-espanol": { size: "60~70cm · 몸무게 고정 기준 없음", height: "60~70cm", weight: "고정 기준 없음" },
  "bergamasco-shepherd": { size: "54~62cm · 26~38kg", height: "54~62cm", weight: "26~38kg" },
  schipperke: { size: "고정 기준 없음 · 3~9kg", height: "고정 기준 없음", weight: "3~9kg" },
  "slovakian-cuvac": { size: "59~70cm · 31~44kg", height: "59~70cm", weight: "31~44kg" },
  "polish-lowland-sheepdog": { size: "42~50cm · 14~23kg", height: "42~50cm", weight: "14~23kg" },
  "appenzeller-cattle-dog": { size: "48~58cm · 고정 기준 없음", height: "48~58cm", weight: "고정 기준 없음" },
  "entlebucher-mountain-dog": { size: "42~52cm · 18~29kg", height: "42~52cm", weight: "18~29kg" },
  "greater-swiss-mountain-dog": { size: "60~72cm · 39~64kg", height: "60~72cm", weight: "39~64kg" },
  "german-pinscher": { size: "45~50cm · 14~20kg", height: "45~50cm", weight: "14~20kg" },
  "kangal-shepherd-dog": { size: "65~78cm · 40~60kg", height: "65~78cm", weight: "40~60kg" },
  "parson-russell-terrier": { size: "31~38cm · 약 6~8kg", height: "31~38cm", weight: "약 6~8kg" },
  "sealyham-terrier": { size: "31cm 이하 · 약 8.2~9kg", height: "31cm 이하", weight: "약 8.2~9kg" },
  harrier: { size: "48~55cm · 20~27kg", height: "48~55cm", weight: "20~27kg" },
  "english-foxhound": { size: "약 58~64cm · 27~34kg", height: "약 58~64cm", weight: "27~34kg" },
  "petit-basset-griffon-vendeen": { size: "33~39cm · 11~18kg", height: "33~39cm", weight: "11~18kg" },
  "finnish-hound": { size: "52~61cm · 몸무게 고정 기준 없음", height: "52~61cm", weight: "고정 기준 없음" },
  "alpine-dachsbracke": { size: "34~42cm · 몸무게 고정 기준 없음", height: "34~42cm", weight: "고정 기준 없음" },
  "bavarian-mountain-scent-hound": { size: "44~52cm · 17~30kg", height: "44~52cm", weight: "17~30kg" },
  "german-wire-haired-pointing-dog": { size: "57~68cm · 23~32kg", height: "57~68cm", weight: "23~32kg" },
  "small-munsterlander": { size: "50~56cm · 18~27kg", height: "50~56cm", weight: "18~27kg" },
  "wire-haired-pointing-griffon-korthals": { size: "50~60cm · 16~32kg", height: "50~60cm", weight: "16~32kg" },
  "english-pointer": { size: "61~69cm · 20~34kg", height: "61~69cm", weight: "20~34kg" },
  "american-staffordshire-terrier": { size: "43~48cm · 몸무게 고정 기준 없음", height: "43~48cm", weight: "고정 기준 없음" },
  "australian-silky-terrier": { size: "23~26cm · 약 4.5kg", height: "23~26cm", weight: "약 4.5kg" },
  "swedish-vallhund": { size: "30~35cm · 9~16kg", height: "30~35cm", weight: "9~16kg" },
  "italian-volpino": { size: "25~30cm · 3.6~7.3kg", height: "25~30cm", weight: "3.6~7.3kg" },
  eurasier: { size: "48~60cm · 18~30kg", height: "48~60cm", weight: "18~30kg" },
  hokkaido: { size: "45.5~51.5cm · 20~30kg", height: "45.5~51.5cm", weight: "20~30kg" },
  kai: { size: "42~53cm · 11.3~18.1kg", height: "42~53cm", weight: "11.3~18.1kg" },
  kishu: { size: "46~55cm · 13.6~27.2kg", height: "46~55cm", weight: "13.6~27.2kg" },
  shikoku: { size: "46~55cm · 15.9~24.9kg", height: "46~55cm", weight: "15.9~24.9kg" },
  "canaan-dog": { size: "50~60cm · 18~25kg", height: "50~60cm", weight: "18~25kg" },
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
  "dogue-de-bordeaux": { size: "58~68cm · 45kg 이상", height: "58~68cm", weight: "45kg 이상" },
  "neapolitan-mastiff": { size: "60~75cm · 50~70kg", height: "60~75cm", weight: "50~70kg" },
  "continental-bulldog": { size: "40~50cm · 20~30kg", height: "40~50cm", weight: "20~30kg" },
  "smooth-fox-terrier": { size: "수컷 39cm 이하 · 암컷은 조금 작음 · 7~8kg", height: "수컷 39cm 이하 · 암컷은 조금 작음", weight: "7~8kg" },
  "wire-fox-terrier": { size: "수컷 39cm 이하 · 암컷은 조금 작음 · 약 8kg", height: "수컷 39cm 이하 · 암컷은 조금 작음", weight: "약 8kg" },
  "kerry-blue-terrier": { size: "44.5~49.5cm · 수컷 15~18kg", height: "44.5~49.5cm", weight: "수컷 15~18kg" },
  "cairn-terrier": { size: "약 28~31cm · 6~7.5kg", height: "약 28~31cm", weight: "6~7.5kg" },
  "norfolk-terrier": { size: "이상적 체고 약 25cm", height: "이상적 체고 약 25cm" },
  "norwich-terrier": { size: "이상적 체고 약 25cm", height: "이상적 체고 약 25cm" },
  "miniature-bull-terrier": { size: "25.4~35.6cm · 체고에 맞는 균형", height: "25.4~35.6cm", weight: "고정 기준 없음" },
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
