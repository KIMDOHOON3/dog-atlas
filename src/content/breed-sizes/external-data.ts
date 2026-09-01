import { externalBreedSizeSupplementSchema, type ExternalBreedSizeSupplement, type Measurement } from "./schema";

const checkedAt = "2026-09-01";
const akcWeightUrl = "https://www.akc.org/expert-advice/nutrition/breed-weight-chart/";

function kgFromLb(minLb: number, maxLb: number): Measurement {
  return { kind: "range", min: Math.round(minLb * 0.45359237 * 10) / 10, max: Math.round(maxLb * 0.45359237 * 10) / 10 };
}

function akcWeight(slug: string, minLb: number, maxLb: number, rawValue: string, note: string): ExternalBreedSizeSupplement {
  return {
    slug,
    weight: {
      measurement: kgFromLb(minLb, maxLb),
      source: {
        organization: "American Kennel Club",
        documentTitle: "Breed Weight Chart",
        url: akcWeightUrl,
        checkedAt,
        rawValue,
        meaning: "official-general-adult-range",
      },
    },
    note,
    resolvesConflict: false,
  };
}

const weightSupplements = [
  akcWeight("akita", 70, 130, "70–130 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("alaskan-malamute", 75, 85, "75–85 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("chow-chow", 45, 70, "45–70 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("weimaraner", 55, 90, "55–90 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("nova-scotia-duck-tolling-retriever", 35, 50, "35–50 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("old-english-sheepdog", 60, 100, "60–100 lb", "체중은 보완했지만 공식 체고가 최소 기준이므로 잠정 상태를 유지합니다."),
  akcWeight("miniature-bull-terrier", 18, 28, "18–28 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("appenzeller-cattle-dog", 48, 70, "48–70 lb", "AKC 표의 Appenzeller Sennenhund 체중 범위를 같은 카탈로그 항목에 연결했습니다."),
  akcWeight("thai-ridgeback", 35, 75, "35–75 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("grand-basset-griffon-vendeen", 40, 45, "40–45 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("porcelaine", 55, 62, "55–62 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("french-spaniel", 50, 60, "50–60 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("braque-saint-germain", 40, 58, "40–58 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  {
    ...akcWeight("blue-picardy-spaniel", 45, 55, "male 50–55 lb; female 45–50 lb", "AKC가 성별로 제시한 일반 성견 체중을 원본 성별 범위와 함께 보존했습니다."),
    weight: {
      ...akcWeight("blue-picardy-spaniel", 45, 55, "male 50–55 lb; female 45–50 lb", "성별 범위 보존").weight!,
      sexMeasurements: { male: kgFromLb(50, 55), female: kgFromLb(45, 50) },
    },
  },
  akcWeight("croatian-sheepdog", 29, 44, "29–44 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("schapendoes", 26, 55, "26–55 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("romanian-mioritic-shepherd-dog", 100, 130, "100–130 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("romanian-carpathian-shepherd-dog", 70, 100, "70–100 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("hovawart", 65, 90, "65–90 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("pyrenean-mastiff", 120, 190, "120–190 lb", "체중은 보완했지만 공식 체고가 최소 기준이므로 잠정 상태를 유지합니다."),
  akcWeight("tosa", 100, 200, "100–200 lb", "체중은 보완했지만 공식 체고가 최소 기준이므로 잠정 상태를 유지합니다."),
  akcWeight("tornjak", 62, 110, "62–110 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("spanish-mastiff", 140, 200, "140–200 lb", "체중은 보완했지만 공식 체고가 최소 기준이므로 잠정 상태를 유지합니다."),
  akcWeight("skye-terrier", 35, 45, "35–45 lb", "체중은 보완했지만 성별 한쪽 체고 의미 검수 때문에 잠정 상태를 유지합니다."),
  akcWeight("japanese-terrier", 10, 12, "10–12 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("german-hunting-terrier", 17, 22, "17–22 lb", "AKC 표의 Jagdterrier 체중 범위를 같은 견종 항목에 연결했습니다."),
  akcWeight("norrbottenspets", 20, 30, "20–30 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("irish-red-and-white-setter", 35, 60, "35–60 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("hungarian-wirehaired-vizsla", 45, 65, "45–65 lb", "AKC 표의 Wirehaired Vizsla 체중 범위를 같은 견종 항목에 연결했습니다."),
  akcWeight("berger-picard", 50, 70, "50–70 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("pyrenean-sheepdog", 15, 30, "15–30 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  akcWeight("lancashire-heeler", 9, 17, "9–17 lb", "내부에 없던 일반 성견 체중 범위만 AKC 공식 체중표에서 보완했습니다."),
  {
    ...akcWeight("saarloos-wolfdog", 60, 95, "male 70–95 lb; female 60–80 lb", "AKC가 성별로 제시한 일반 성견 체중을 원본 성별 범위와 함께 보존했습니다."),
    weight: {
      ...akcWeight("saarloos-wolfdog", 60, 95, "male 70–95 lb; female 60–80 lb", "성별 범위 보존").weight!,
      sexMeasurements: { male: kgFromLb(70, 95), female: kgFromLb(60, 80) },
    },
  },
] satisfies ExternalBreedSizeSupplement[];

const resolvedConflicts = [
  { slug: "swedish-vallhund", minLb: 20, maxLb: 35, raw: "20–35 lb", note: "FCI는 이상 체고와 허용오차만 규정합니다. 충돌한 체중은 AKC 공식 일반 성견 범위 20–35lb를 채택합니다." },
  { slug: "italian-volpino", minLb: 8, maxLb: 16, raw: "8–16 lb", note: "2023 FCI 표준은 체중을 체고에 비례한다고만 규정합니다. 충돌한 체중은 AKC 공식 일반 성견 범위 8–16lb를 채택합니다." },
  { slug: "kai", minLb: 25, maxLb: 40, raw: "male 30–40 lb; female 25–35 lb", note: "FCI는 성별 체고와 +3cm 허용만 규정합니다. 체중은 AKC의 성별 일반 범위를 보존해 채택합니다." },
  { slug: "wire-haired-pointing-griffon-korthals", minLb: 35, maxLb: 70, raw: "male 50–70 lb; female 35–50 lb", note: "FCI는 성별 체고만 규정합니다. 체중은 AKC의 성별 일반 범위를 보존해 채택합니다." },
  { slug: "japanese-chin", minLb: 7, maxLb: 11, raw: "7–11 lb", note: "AKC 공식 표준은 이상 체고 8–11in와 체격에 비례한 체중만 명시하며, 공식 체중표의 7–11lb 범위를 채택합니다." },
  { slug: "greater-swiss-mountain-dog", minLb: 85, maxLb: 140, raw: "85–140 lb", note: "FCI는 성별 체고를 규정하고 체중은 규정하지 않습니다. 충돌한 체중은 AKC 공식 일반 성견 범위 85–140lb를 채택합니다." },
  { slug: "boerboel", minLb: 150, maxLb: 200, raw: "150–200 lb", note: "KUSA 최소·이상 체고와 일반 범위를 합치지 않고 기존 AKC 성견 체고 범위와 AKC 공식 일반 체중 범위를 한 체계로 사용합니다." },
].map(({ slug, minLb, maxLb, raw, note }) => {
  const supplement = akcWeight(slug, minLb, maxLb, raw, note);
  if (slug === "kai") {
    supplement.weight!.sexMeasurements = { male: kgFromLb(30, 40), female: kgFromLb(25, 35) };
  }
  if (slug === "wire-haired-pointing-griffon-korthals") {
    supplement.weight!.sexMeasurements = { male: kgFromLb(50, 70), female: kgFromLb(35, 50) };
  }
  if (slug === "japanese-chin") {
    supplement.height = {
      measurement: { kind: "range", min: 20.3, max: 27.9 },
      source: {
        organization: "American Kennel Club",
        documentTitle: "Official Standard of the Japanese Chin",
        url: "https://images.akc.org/pdf/breeds/standards/JapaneseChin.pdf",
        checkedAt,
        rawValue: "ideal size 8–11 inches",
        meaning: "official-ideal-with-tolerance",
      },
    };
  }
  return { ...supplement, resolvesConflict: true };
}) satisfies ExternalBreedSizeSupplement[];

const dimensionSupplements = [
  {
    slug: "boston-terrier",
    height: { measurement: { kind: "range", min: 25.4, max: 30.5 }, source: { organization: "American Kennel Club", documentTitle: "Boston Terrier Dog Breed Information", url: "https://www.akc.org/dog-breeds/boston-terrier/", checkedAt, rawValue: "10–12 inches", meaning: "official-breed-information-range" } },
    weight: { measurement: kgFromLb(12, 25), source: { organization: "American Kennel Club", documentTitle: "Boston Terrier Dog Breed Information", url: "https://www.akc.org/dog-breeds/boston-terrier/", checkedAt, rawValue: "12–25 pounds", meaning: "official-breed-information-range" } },
    note: "내부에 없던 체고와 상한만 있던 체중을 AKC 공식 견종 정보 범위로 보완했습니다.",
    resolvesConflict: false,
  },
  {
    slug: "dandie-dinmont-terrier",
    height: { measurement: { kind: "range", min: 20.3, max: 27.9 }, source: { organization: "American Kennel Club", documentTitle: "Official Standard of the Dandie Dinmont Terrier", url: "https://images.akc.org/pdf/breeds/standards/DandieDinmontTerrier.pdf", checkedAt, rawValue: "8–11 inches", meaning: "official-standard-range" } },
    note: "내부에 없던 체고를 AKC 공식 표준 범위로 보완했습니다.",
    resolvesConflict: false,
  },
  akcWeight("italian-sighthound", 7, 14, "7–14 lb", "기존 최대 체중만 있던 값을 AKC 공식 일반 성견 범위로 보완했습니다."),
  akcWeight("chinese-crested-dog", 8, 12, "8–12 lb", "기존 최대 체중만 있던 값을 AKC 공식 일반 성견 범위로 보완했습니다."),
] satisfies ExternalBreedSizeSupplement[];

export const externalBreedSizeSupplements = externalBreedSizeSupplementSchema.array().parse([
  ...weightSupplements,
  ...resolvedConflicts,
  ...dimensionSupplements,
]);

export const externalBreedSizeSupplementBySlug = new Map(externalBreedSizeSupplements.map((item) => [item.slug, item]));
