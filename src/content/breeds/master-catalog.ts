import { masterInventorySeeds, type VerificationFlag } from "./master-inventory";
import {
  getFciGroupDefinition,
  masterBreedCollectionSchema,
  type BreedVariety,
  type FciGroupNumber,
  type InclusionType,
  type MasterBreed,
} from "./master-schema";

type RegistryStatus = MasterBreed["registryStatus"];
type InclusionDetails = {
  inclusionType: InclusionType;
  evidenceAuthority: string;
};

const nonFciInclusionDetails: Record<string, InclusionDetails> = {
  "american-pit-bull-terrier": {
    inclusionType: "international-registered",
    evidenceAuthority: "United Kennel Club (UKC)",
  },
  "american-bully": {
    inclusionType: "international-registered",
    evidenceAuthority: "United Kennel Club (UKC)",
  },
  boerboel: {
    inclusionType: "international-registered",
    evidenceAuthority: "Kennel Union of Southern Africa (KUSA)·American Kennel Club (AKC)",
  },
  "anatolian-shepherd-dog": {
    inclusionType: "international-registered",
    evidenceAuthority: "American Kennel Club (AKC)",
  },
  bulgae: {
    inclusionType: "documented-population",
    evidenceAuthority: "국립축산과학원·동료평가 연구",
  },
  sapsaree: {
    inclusionType: "national-heritage",
    evidenceAuthority: "국가유산청",
  },
  donggyeongi: {
    inclusionType: "national-heritage",
    evidenceAuthority: "국가유산청",
  },
  "mongolian-bankhar": {
    inclusionType: "verified-landrace",
    evidenceAuthority: "현지 보존사업·동료평가 연구",
  },
  "pungsan-dog": {
    inclusionType: "documented-population",
    evidenceAuthority: "한국애견연맹(KKF) 공개 목록",
  },
  "jeju-dog": {
    inclusionType: "documented-population",
    evidenceAuthority: "한국애견연맹(KKF) 공개 목록",
  },
  goldendoodle: {
    inclusionType: "designer-cross",
    evidenceAuthority: "GANA·동료평가 행동 연구",
  },
  maltipoo: {
    inclusionType: "designer-cross",
    evidenceAuthority: "부모견 등록자료·수의학 자료",
  },
};

function getInclusionDetails(slug: string, status: RegistryStatus): InclusionDetails {
  if (status === "definitive" || status === "provisional") {
    return {
      inclusionType: "international-registered",
      evidenceAuthority: "Fédération Cynologique Internationale (FCI)",
    };
  }

  return nonFciInclusionDetails[slug] ?? {
    inclusionType: "unverified-name",
    evidenceAuthority: "추가 검증 필요",
  };
}

const aliasesKo: Partial<Record<string, string[]>> = {
  beauceron: ["보스롱"],
  "icelandic-sheepdog": ["아이슬란딕 시프도그"],
  "portuguese-water-dog": ["포르투갈 워터 도그"],
  "chinese-crested-dog": ["차이니즈 크레스티드 도그"],
  "belgian-groenendael": ["벨지안 셰퍼드", "벨지안 셰퍼드 독", "벨지언 쉽독", "벨지안 그로넨달"],
  "belgian-laekenois": ["벨지안 셰퍼드", "벨지안 셰퍼드 독", "라케누아", "벨지안 라케노이즈"],
  "belgian-malinois": ["벨지안 셰퍼드", "벨지안 셰퍼드 독", "말리누아", "벨지언 말리노이즈", "벨지안 말리노이즈"],
  "belgian-tervueren": ["벨지안 셰퍼드", "벨지안 셰퍼드 독", "테르뷔렌", "터뷰렌", "벨지안 테르뷰런"],
  "german-shepherd-dog": ["저먼 세퍼드", "독일 셰퍼드"],
  "old-english-sheepdog": ["올드 잉글리시 쉽독", "올드 잉글리쉬 쉽독"],
  "shetland-sheepdog": ["셰틀랜드 쉽독", "셔틀랜드 쉽독", "셸티", "쉘티"],
  "miniature-pinscher": ["미니핀"],
  "welsh-corgi-pembroke": ["웰시 코기", "웰시코기"],
  "west-highland-white-terrier": ["웨스티"],
  "yorkshire-terrier": ["요키", "요크셔"],
  dachshund: ["미니어처 닥스훈트", "카니헨 닥스훈트", "장모 닥스훈트", "단모 닥스훈트", "와이어 닥스훈트"],
  "german-spitz": ["저먼 스피츠", "포메라니안", "포메라니언", "포메리안", "포메라이언", "포메", "키스혼드", "울프스피츠"],
  "korea-jindo-dog": ["진도개", "진도견", "코리아 진도 독"],
  donggyeongi: ["동경이"],
  xoloitzcuintle: ["솔로이츠퀸틀리", "숄로이츠퀸틀리"],
  "labrador-retriever": ["라브라도 리트리버", "래브라도", "라브라도", "랩"],
  "bichon-frise": ["비숑", "비숑프리제"],
  maltese: ["몰티즈"],
  boerboel: ["보어보벨", "보어보얼", "남아프리칸 보어보엘", "사우스 아프리칸 보어보엘"],
  "anatolian-shepherd-dog": ["아나톨리안 셰퍼드 독", "아나톨리안 셰퍼드 도그", "아나톨리아 셰퍼드", "아나톨리아 목양견"],
  bulgae: ["영주 불개", "영주불개"],
  "central-asian-shepherd-dog": ["알라바이", "알라바이견", "투르크멘 알라바이", "중앙아시아 셰퍼드", "중앙아시아 목양견"],
  "french-bulldog": ["프렌치 불독"],
  poodle: ["스탠더드 푸들", "미디엄 푸들", "미니어처 푸들", "토이 푸들", "토이푸들"],
  "pyrenean-mountain-dog": ["피레니언 마운틴 독", "피레니안 마운틴독"],
  "continental-toy-spaniel": ["빠삐용", "파렌", "파렌느"],
  whippet: ["휘핏"],
  "italian-sighthound": ["이탈리언 그레이하운드", "이태리 그레이하운드", "이탈리언 사이트하운드", "IG"],
};

const aliasesEn: Partial<Record<string, string[]>> = {
  "belgian-groenendael": ["Belgian Sheepdog", "Groenendael"],
  "belgian-laekenois": ["Belgian Laekenois", "Laekenois"],
  "belgian-malinois": ["Belgian Malinois", "Malinois"],
  "belgian-tervueren": ["Belgian Tervuren", "Tervuren", "Tervueren"],
  "german-spitz": ["Pomeranian", "Keeshond", "Wolfspitz"],
  "continental-toy-spaniel": ["Papillon", "Phalene"],
  "italian-sighthound": ["Italian Greyhound"],
  "central-asian-shepherd-dog": ["Alabai", "Turkmen Alabay", "Central Asian Ovcharka"],
  bulgae: ["Yeongju Bulgae", "Bul-Gae"],
};

function variety(
  id: string,
  nameKo: string,
  nameEn: string,
  varietyAliasesKo: string[] = [],
  varietyAliasesEn: string[] = [],
): BreedVariety {
  return { id, nameKo, nameEn, aliasesKo: varietyAliasesKo, aliasesEn: varietyAliasesEn };
}

const varieties: Partial<Record<string, BreedVariety[]>> = {
  dachshund: [
    variety("standard-smooth", "스탠더드 단모", "Standard Smooth-haired", ["단모 닥스훈트"]),
    variety("standard-long", "스탠더드 장모", "Standard Long-haired", ["장모 닥스훈트"]),
    variety("standard-wire", "스탠더드 와이어", "Standard Wire-haired", ["와이어 닥스훈트"]),
    variety("miniature-smooth", "미니어처 단모", "Miniature Smooth-haired"),
    variety("miniature-long", "미니어처 장모", "Miniature Long-haired"),
    variety("miniature-wire", "미니어처 와이어", "Miniature Wire-haired"),
    variety("rabbit-smooth", "카니헨 단모", "Rabbit Smooth-haired"),
    variety("rabbit-long", "카니헨 장모", "Rabbit Long-haired"),
    variety("rabbit-wire", "카니헨 와이어", "Rabbit Wire-haired"),
  ],
  "german-spitz": [
    variety("wolfspitz", "울프스피츠", "Wolfspitz", ["키스혼드"], ["Keeshond"]),
    variety("giant", "자이언트 스피츠", "Giant Spitz"),
    variety("medium", "미디엄 스피츠", "Medium Size Spitz"),
    variety("miniature", "미니어처 스피츠", "Miniature Spitz"),
    variety("pomeranian", "포메라이언", "Pomeranian", ["포메", "포메라니안", "포메라니언", "포메리안"]),
  ],
  poodle: [
    variety("standard", "스탠더드 푸들", "Standard Poodle"),
    variety("medium", "미디엄 푸들", "Medium Poodle"),
    variety("miniature", "미니어처 푸들", "Miniature Poodle"),
    variety("toy", "토이 푸들", "Toy Poodle", ["토이푸들"]),
  ],
  "continental-toy-spaniel": [
    variety("papillon", "파피용", "Papillon", ["빠삐용"]),
    variety("phalene", "파렌", "Phalene", ["파렌느"], ["Phalène"]),
  ],
};

const publishedSourceIds: Partial<Record<string, string>> = {
  "japanese-spitz": "fci-standard-262",
  maltese: "fci-standard-65",
  "border-collie": "fci-standard-297",
  greyhound: "fci-standard-158",
  samoyed: "fci-standard-212",
};

function getSourceIds(slug: string, groupNumber: FciGroupNumber | null, status: RegistryStatus) {
  if (status === "non-fci") {
    if (slug === "goldendoodle") return ["gana-goldendoodle-health-standard", "goldendoodle-behavior-study"];
    if (slug === "maltipoo") return ["petmd-maltipoo-guide", "akc-breed-list"];
    if (slug === "mongolian-bankhar") return ["mongolian-bankhar-project", "bankhar-predation-study"];
    if (slug === "american-bully") return ["ukc-american-bully"];
    if (slug === "american-pit-bull-terrier") return ["ukc-american-pit-bull-terrier"];
    if (slug === "boerboel") return ["kusa-boerboel", "akc-breed-list"];
    if (slug === "anatolian-shepherd-dog") return ["akc-anatolian-shepherd-dog", "fci-kangal-shepherd-dog"];
    if (slug === "bulgae") return ["nias-korean-native-dogs", "bulgae-genetic-study"];
    if (slug === "sapsaree") return ["heritage-sapsaree", "kkf-non-fci-breeds"];
    if (slug === "donggyeongi") return ["heritage-donggyeongi", "kkf-non-fci-breeds"];
    return ["kkf-non-fci-breeds"];
  }

  const sourceIds = ["fci-nomenclature", `kkf-group-${groupNumber}`];
  if (status === "provisional") sourceIds.push("fci-provisional");
  const standardSourceId = publishedSourceIds[slug];
  if (standardSourceId) sourceIds.push(standardSourceId);
  return sourceIds;
}

function getVerificationNotes(slug: string, status: RegistryStatus, flags: readonly VerificationFlag[]) {
  const notes: string[] = [];
  if (status === "provisional") {
    notes.push("FCI 잠정 인정 상태이므로 발행 전에 최신 인정 상태를 다시 확인해야 합니다.");
  }
  if (status === "non-fci") {
    if (slug === "goldendoodle" || slug === "maltipoo") {
      notes.push("FCI 미인정 디자이너 교배견이며, 부모견 조합과 교배 세대에 따른 편차를 개체별로 확인해야 합니다.");
    } else {
      notes.push("FCI 미인정 견종이며, 다른 등록 단체의 정의와 국내 법적 맥락을 별도로 검수해야 합니다.");
    }
  }
  if (flags.includes("fci-varieties")) {
    notes.push("FCI가 여러 바라이어티를 한 품종으로 분류합니다. 상세 정보는 타입별 차이를 구분해야 합니다.");
  }
  if (flags.includes("ko-name-review")) {
    notes.push("국내 공개 전 한글 통용명 표기를 추가 검수해야 합니다.");
  }
  return notes;
}

const publishedExpansionSlugs = new Set([
  "welsh-corgi-pembroke", "miniature-schnauzer", "yorkshire-terrier", "shiba", "akita",
  "bichon-frise", "cavalier-king-charles-spaniel", "pug", "bernese-mountain-dog", "dobermann",
  "german-spitz", "shetland-sheepdog", "australian-shepherd", "rottweiler", "boxer",
  "great-dane", "alaskan-malamute", "jack-russell-terrier", "boston-terrier", "newfoundland",
  "dalmatian", "italian-sighthound", "continental-toy-spaniel", "chow-chow", "saint-bernard",
  "weimaraner", "nova-scotia-duck-tolling-retriever", "old-english-sheepdog", "cane-corso", "bull-terrier",
  "australian-kelpie", "miniature-pinscher", "airedale-terrier", "welsh-corgi-cardigan", "finnish-spitz",
  "basset-hound", "german-short-haired-pointing-dog", "english-springer-spaniel", "havanese", "borzoi",
  "australian-cattle-dog", "giant-schnauzer", "scottish-terrier", "norwegian-elkhound-grey", "bloodhound",
  "vizsla", "flat-coated-retriever", "coton-de-tulear", "afghan-hound", "lhasa-apso",
  "beauceron", "bullmastiff", "border-terrier", "icelandic-sheepdog", "rhodesian-ridgeback",
  "english-setter", "chesapeake-bay-retriever", "portuguese-water-dog", "chinese-crested-dog", "saluki",
  "dutch-shepherd-dog", "briard", "collie-rough", "puli", "schnauzer",
  "shar-pei", "mastiff", "leonberger", "west-highland-white-terrier", "staffordshire-bull-terrier",
  "soft-coated-wheaten-terrier", "karelian-bear-dog", "norwegian-lundehund", "xoloitzcuintle", "otterhound",
  "brittany-spaniel", "irish-red-setter", "lagotto-romagnolo", "pekingese", "irish-wolfhound",
  "belgian-groenendael", "belgian-laekenois", "belgian-malinois", "belgian-tervueren",
  "czechoslovakian-wolfdog", "bearded-collie", "white-swiss-shepherd-dog", "bouvier-des-flandres",
  "miniature-american-shepherd", "dogo-argentino", "dogue-de-bordeaux", "bulldog", "neapolitan-mastiff",
  "tibetan-mastiff", "continental-bulldog", "smooth-fox-terrier", "wire-fox-terrier", "kerry-blue-terrier",
  "cairn-terrier", "norfolk-terrier", "norwich-terrier", "miniature-bull-terrier", "american-staffordshire-terrier",
  "australian-silky-terrier", "finnish-lapponian-dog", "swedish-vallhund", "italian-volpino", "eurasier",
  "american-akita", "hokkaido", "kai", "kishu", "shikoku", "canaan-dog", "yakutian-laika",
  "harrier", "english-foxhound", "petit-basset-griffon-vendeen", "finnish-hound", "alpine-dachsbracke",
  "bavarian-mountain-scent-hound", "german-wire-haired-pointing-dog", "italian-pointing-dog", "small-munsterlander",
  "wire-haired-pointing-griffon-korthals", "english-pointer", "curly-coated-retriever", "clumber-spaniel",
  "american-cocker-spaniel", "barbet", "irish-water-spaniel", "spanish-water-dog", "american-water-spaniel",
  "bolognese", "tibetan-spaniel", "tibetan-terrier", "japanese-chin", "prague-ratter", "azawakh", "sloughi", "galgo-espanol",
  "bergamasco-shepherd", "mudi", "schipperke", "slovakian-cuvac", "polish-lowland-sheepdog",
  "appenzeller-cattle-dog", "entlebucher-mountain-dog", "greater-swiss-mountain-dog", "german-pinscher", "kangal-shepherd-dog",
  "bedlington-terrier", "parson-russell-terrier", "sealyham-terrier", "manchester-terrier", "cesky-terrier",
  "thai-ridgeback", "portuguese-podengo", "greenland-dog", "peruvian-hairless-dog", "cirneco-dell-etna",
  "gascon-saintongeois", "grand-basset-griffon-vendeen", "schweizer-laufhund", "porcelaine", "petit-bleu-de-gascogne",
  "gordon-setter", "german-long-haired-pointer", "french-spaniel", "braque-saint-germain", "blue-picardy-spaniel",
  "field-spaniel", "sussex-spaniel", "wetterhoun", "kooikerhondje", "drentsche-patrijshond",
  "griffon-bruxellois", "petit-brabancon", "russian-toy", "lowchen", "english-toy-spaniel",
  "scottish-deerhound", "hungarian-greyhound",
  "catalan-sheepdog", "croatian-sheepdog", "komondor", "kuvasz", "schapendoes", "portuguese-sheepdog",
  "maremma-sheepdog", "polish-tatra-sheepdog", "romanian-mioritic-shepherd-dog", "romanian-carpathian-shepherd-dog",
  "broholmer", "fila-brasileiro", "hovawart", "landseer", "pyrenean-mastiff", "sarplaninac", "tosa", "tornjak",
  "central-asian-shepherd-dog", "spanish-mastiff", "australian-terrier", "irish-terrier", "lakeland-terrier", "skye-terrier",
  "dandie-dinmont-terrier", "glen-of-imaal-terrier", "japanese-terrier", "german-hunting-terrier", "norwegian-buhund",
  "russian-european-laika", "east-siberian-laika", "west-siberian-laika", "norrbottenspets", "jamthund", "ariegeois",
  "anglo-francais-de-petite-venerie", "billy", "briquet-griffon-vendeen", "dunker", "halden-hound", "hygen-hound",
  "transylvanian-hound", "tyrolean-hound", "braque-francais-type-gascogne", "braque-d-auvergne", "german-stichelhaar",
  "spinone-italiano", "large-munsterlander", "irish-red-and-white-setter", "hungarian-wirehaired-vizsla",
  "berger-picard", "pumi", "pyrenean-sheepdog", "lancashire-heeler", "saarloos-wolfdog",
  "aidi", "caucasian-shepherd-dog", "presa-canario", "black-russian-terrier", "austrian-pinscher",
  "danish-swedish-farmdog", "estrela-mountain-dog", "welsh-terrier", "brazilian-terrier", "english-toy-terrier",
  "pharaoh-hound", "ibizan-hound", "lapponian-herder", "swedish-lapphund", "podenco-canario",
  "austrian-black-and-tan-hound", "styrian-coarse-haired-hound", "slovakian-hound", "posavac-hound",
  "bosnian-broken-haired-hound", "serbian-hound", "montenegrin-mountain-hound", "greek-harehound", "italian-segugio",
  "spanish-hound", "grand-bleu-de-gascogne", "basset-bleu-de-gascogne", "basset-fauve-de-bretagne", "basset-artesien-normand",
  "poitevin", "hamiltonstovare", "schillerstovare", "smaland-hound", "drever", "old-danish-pointer",
  "slovakian-wirehaired-pointer", "burgos-pointer", "picardy-spaniel", "pont-audemer-spaniel", "stabyhoun",
  "welsh-springer-spaniel", "affenpinscher", "kromfohrlander", "biewer-terrier", "polish-greyhound",
  "smooth-collie", "bouvier-des-ardennes", "majorca-shepherd-dog", "south-russian-shepherd-dog", "chodsky-pes",
  "dutch-smoushond", "saint-miguel-cattle-dog", "majorca-mastiff", "cimarron-uruguayo", "castro-laboreiro-dog",
  "rafeiro-do-alentejo", "romanian-bucovina-shepherd-dog", "karst-shepherd-dog", "canadian-eskimo-dog", "norwegian-elkhound-black",
  "thai-bangkaew-dog", "taiwan-dog", "brazilian-tracker", "french-tricolour-hound", "french-white-and-black-hound",
  "french-white-and-orange-hound", "great-anglo-french-tricolour-hound", "great-anglo-french-white-and-black-hound", "great-anglo-french-white-and-orange-hound",
  "polish-hound", "american-foxhound", "black-and-tan-coonhound", "beagle-harrier", "griffon-blue-gascony",
  "griffon-fauve-de-bretagne", "griffon-nivernais", "hellenic-hound", "serbian-tricolour-hound", "german-hound",
  "westphalian-dachsbracke", "small-swiss-hound", "hanoverian-scent-hound", "artois-hound", "istrian-short-haired-hound",
  "istrian-wire-haired-hound", "braque-francais-type-pyrenees", "braque-bourbonnais", "ariege-pointing-dog", "portuguese-pointing-dog",
  "pudelpointer", "bohemian-wire-haired-pointing-griffon", "german-spaniel", "king-charles-spaniel", "griffon-belge",
  "eesti-hound", "kintamani-bali-dog", "kazakh-tazy", "ratonero-bodeguero-andaluz", "valencian-terrier",
  "romanian-raven-shepherd-dog", "tatra-hound", "transmontano-mastiff", "brazilian-campeiro-bulldog", "segugio-dell-appennino",
  "sabueso-fino-colombiano", "macedonian-shepherd-dog-karaman", "sapsaree", "pungsan-dog", "donggyeongi", "jeju-dog",
  "american-pit-bull-terrier", "american-bully", "mongolian-bankhar",
  "boerboel", "anatolian-shepherd-dog", "bulgae",
]);

const masterEntries = masterInventorySeeds.map(
  ([slug, nameKo, nameEn, groupNumber, registryStatus, detailPriority, verificationFlags = []]) => {
    const resolvedDetailPriority = publishedExpansionSlugs.has(slug) ? "next" : detailPriority;
    const inclusion = getInclusionDetails(slug, registryStatus);
    return ({
    slug,
    nameKo,
    nameEn,
    aliasesKo: aliasesKo[slug] ?? [],
    aliasesEn: aliasesEn[slug] ?? [],
    varieties: varieties[slug] ?? [],
    fciGroup: groupNumber === null ? null : getFciGroupDefinition(groupNumber),
    registryStatus,
    ...inclusion,
    detailPriority: resolvedDetailPriority,
    detailStatus: resolvedDetailPriority === "core" || resolvedDetailPriority === "next" ? "published" : "none",
    sourceIds: getSourceIds(slug, groupNumber, registryStatus),
    verificationNotes: getVerificationNotes(slug, registryStatus, verificationFlags),
    } satisfies MasterBreed);
  },
);

export const masterCatalog = masterBreedCollectionSchema.parse(masterEntries);

const masterBreedBySlug = new Map(masterCatalog.map((breed) => [breed.slug, breed]));

export function getMasterBreed(slug: string) {
  return masterBreedBySlug.get(slug);
}

export function getMasterCatalogStats() {
  const byFciGroup = Object.fromEntries(
    Array.from({ length: 10 }, (_, index) => {
      const groupNumber = index + 1;
      return [groupNumber, masterCatalog.filter((breed) => breed.fciGroup?.number === groupNumber).length];
    }),
  ) as Record<number, number>;

  return {
    total: masterCatalog.length,
    byFciGroup,
    registryStatus: {
      definitive: masterCatalog.filter((breed) => breed.registryStatus === "definitive").length,
      provisional: masterCatalog.filter((breed) => breed.registryStatus === "provisional").length,
      nonFci: masterCatalog.filter((breed) => breed.registryStatus === "non-fci").length,
      verificationNeeded: masterCatalog.filter((breed) => breed.registryStatus === "verification-needed").length,
    },
    inclusionType: {
      internationalRegistered: masterCatalog.filter((breed) => breed.inclusionType === "international-registered").length,
      nationalHeritage: masterCatalog.filter((breed) => breed.inclusionType === "national-heritage").length,
      nationalRegistered: masterCatalog.filter((breed) => breed.inclusionType === "national-registered").length,
      verifiedLandrace: masterCatalog.filter((breed) => breed.inclusionType === "verified-landrace").length,
      documentedPopulation: masterCatalog.filter((breed) => breed.inclusionType === "documented-population").length,
      designerCross: masterCatalog.filter((breed) => breed.inclusionType === "designer-cross").length,
      unverifiedName: masterCatalog.filter((breed) => breed.inclusionType === "unverified-name").length,
    },
    detailPriority: {
      core: masterCatalog.filter((breed) => breed.detailPriority === "core").length,
      next: masterCatalog.filter((breed) => breed.detailPriority === "next").length,
      later: masterCatalog.filter((breed) => breed.detailPriority === "later").length,
    },
    detailStatus: {
      published: masterCatalog.filter((breed) => breed.detailStatus === "published").length,
      planned: masterCatalog.filter((breed) => breed.detailStatus === "planned").length,
      none: masterCatalog.filter((breed) => breed.detailStatus === "none").length,
    },
  };
}
