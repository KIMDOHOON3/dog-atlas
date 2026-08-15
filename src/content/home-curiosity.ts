import { z } from "zod";
import { sourceSchema, type Breed } from "@/content/breeds/schema";
import { getBreedFilterValue } from "@/lib/breed-filters";

const curiositySourceSchema = sourceSchema.extend({
  label: z.string().min(2),
});

const curiosityItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  fact: z.string().min(8),
});

const homeCuriosityThemeSchema = z.object({
  key: z.enum([
    "giant-build",
    "small-build",
    "wrinkled-skin",
    "distinctive-coats",
    "regulated-care",
    "westminster-stories",
  ]),
  catalogRule: z.enum(["large-and-giant", "small-and-companion"]).optional(),
  label: z.string().min(2),
  thumbnailSlug: z.string().regex(/^[a-z0-9-]+$/),
  heading: z.string().min(10),
  description: z.string().min(20),
  collectionTitle: z.string().min(10),
  collectionDescription: z.string().min(20),
  selectionNote: z.string().min(20),
  moreLabel: z.string().min(4),
  items: z.array(curiosityItemSchema).default([]),
  sources: z.array(curiositySourceSchema).min(1),
}).refine((theme) => theme.catalogRule || theme.items.length >= 6, {
  message: "A curiosity theme needs a catalog rule or at least six curated items.",
});

const checkedAt = "2026-08-12";

export type HomeCuriosityTheme = z.infer<typeof homeCuriosityThemeSchema>;
export type HomeCuriosityThemeKey = HomeCuriosityTheme["key"];

const parsedHomeCuriosityThemes = z.array(homeCuriosityThemeSchema).length(6).parse([
  {
    key: "giant-build",
    catalogRule: "large-and-giant",
    label: "큰 체구",
    thumbnailSlug: "great-dane",
    heading: "서 있기만 해도 압도적인 체구",
    description: "현재 도감에서 대형 또는 초대형으로 분류되는 견종을 빠짐없이 살펴봐요.",
    collectionTitle: "큰 체구 안에도 서로 다른 삶이 있어요.",
    collectionDescription: "키와 몸무게가 큰 견종을 한데 모았어요. 크기만 비슷할 뿐, 형성 지역과 원래 역할, 필요한 생활 준비는 서로 다릅니다.",
    selectionNote: "세계 순위가 아니라 현재 370종 도감의 체구 정보에서 대형 또는 초대형으로 분류되는 모든 견종을 보여줍니다.",
    moreLabel: "큰 체구 견종 더 보기",
    sources: [
      { label: "FCI · Great Dane", title: "Great Dane — Standard No. 235", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/GREAT-DANE-235.html", checkedAt },
      { label: "FCI · Irish Wolfhound", title: "Irish Wolfhound — Standard No. 160", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/IRISH-WOLFHOUND-160.html", checkedAt },
      { label: "FCI · Newfoundland", title: "Newfoundland — Standard No. 50", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/NEWFOUNDLAND-50.html", checkedAt },
    ],
  },
  {
    key: "small-build",
    catalogRule: "small-and-companion",
    label: "작은 체구",
    thumbnailSlug: "chihuahua",
    heading: "작지만 존재감은 큰 견종들",
    description: "작은 체구 안에서도 몸의 비율과 역사, 필요한 관리가 얼마나 다른지 만나보세요.",
    collectionTitle: "작은 몸을 같은 생활로 묶을 수는 없어요.",
    collectionDescription: "공식 표준과 도감의 체구 정보에서 작은 편으로 확인되는 견종을 모았어요. 작은 몸이 낮은 활동량이나 쉬운 돌봄을 뜻하지는 않습니다.",
    selectionNote: "현재 370종 도감에서 소형·초소형·토이로 분류되거나 컴패니언 그룹에 속하는 모든 견종을 보여줍니다.",
    moreLabel: "작은 체구 견종 더 보기",
    sources: [
      { label: "FCI · Chihuahua", title: "Chihuahua — Standard No. 218", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/CHIHUAHUA-218.html", checkedAt },
      { label: "FCI · Russian Toy", title: "Russian Toy — Standard No. 352", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/RUSSIAN-TOY-352.html", checkedAt },
      { label: "FCI · Prague Ratter", title: "Prague Ratter — Standard No. 363", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/PRAGUE-RATTER-363.html", checkedAt },
    ],
  },
  {
    key: "wrinkled-skin",
    label: "주름진 얼굴",
    thumbnailSlug: "shar-pei",
    heading: "주름진 얼굴에는 관리도 따라와요",
    description: "주름이 외형의 특징인 세 견종과 피부·눈 주변을 함께 살펴봐요.",
    collectionTitle: "주름은 장식이 아니라 몸의 한 부분이에요.",
    collectionDescription: "머리와 얼굴의 느슨한 피부나 주름이 견종 표준과 설명에 나타나는 견종을 모았어요. 주름의 정도는 개체와 성장 단계에 따라 달라질 수 있습니다.",
    selectionNote: "주름의 많고 적음을 겨루는 순위가 아닙니다. 외형 특징과 함께 피부·눈·호흡 관리까지 확인하기 위한 편집 목록입니다.",
    moreLabel: "주름이 특징인 견종 더 보기",
    items: [
      { slug: "shar-pei", fact: "성견은 머리와 어깨 중심의 주름" },
      { slug: "neapolitan-mastiff", fact: "느슨한 피부와 머리 주름" },
      { slug: "bloodhound", fact: "늘어진 귀와 얼굴의 피부 주름" },
      { slug: "dogue-de-bordeaux", fact: "머리의 주름이 도드라지는 마스티프" },
      { slug: "bulldog", fact: "얼굴과 머리의 주름" },
      { slug: "pug", fact: "이마 주름과 짧은 주둥이" },
    ],
    sources: [
      { label: "FCI · Shar Pei", title: "Shar Pei — Standard No. 309", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/SHAR-PEI-309.html", checkedAt },
      { label: "FCI · Neapolitan Mastiff", title: "Neapolitan Mastiff — Standard No. 197", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/MASTINO-NAPOLETANO-197.html", checkedAt },
      { label: "FCI · Bloodhound", title: "Bloodhound — Standard No. 84", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/BLOODHOUND-84.html", checkedAt },
    ],
  },
  {
    key: "distinctive-coats",
    label: "독특한 털",
    thumbnailSlug: "komondor",
    heading: "털이 이렇게 자란다고?",
    description: "독특한 피모를 가진 세 견종을 만나고, 생김새 뒤의 관리까지 살펴보세요.",
    collectionTitle: "피모의 모양은 살아온 환경과 관리로 이어져요.",
    collectionDescription: "코드, 플록, 무모형처럼 한눈에 구별되는 피모 구조를 가진 견종을 모았어요. 독특한 생김새만큼 건조와 피부 확인, 미용 방식도 서로 다릅니다.",
    selectionNote: "아름다움이나 희귀성 순위가 아니라 공식 표준에서 구별되는 피모 구조를 확인할 수 있는 견종을 편집한 목록입니다.",
    moreLabel: "독특한 피모 견종 더 보기",
    items: [
      { slug: "komondor", fact: "성장하며 끈처럼 형성되는 코디드 코트" },
      { slug: "puli", fact: "코드 또는 빗질한 형태로 관리되는 피모" },
      { slug: "bergamasco-shepherd", fact: "여러 질감의 털이 겹쳐 형성되는 플록" },
      { slug: "chinese-crested-dog", fact: "헤어리스와 파우더퍼프 두 유형" },
      { slug: "xoloitzcuintle", fact: "무모형과 유모형이 함께 존재" },
      { slug: "bedlington-terrier", fact: "부드럽고 곱슬거리는 복합 질감의 피모" },
    ],
    sources: [
      { label: "FCI · Komondor", title: "Komondor — Standard No. 53", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/KOMONDOR-53.html", checkedAt },
      { label: "FCI · Puli", title: "Puli — Standard No. 55", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/PULI-55.html", checkedAt },
      { label: "FCI · Bergamasco", title: "Bergamasco Shepherd Dog — Standard No. 194", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/BERGAMASCO-SHEPHERD-DOG-194.html", checkedAt },
    ],
  },
  {
    key: "regulated-care",
    label: "법과 책임",
    thumbnailSlug: "rottweiler",
    heading: "멋보다 먼저 확인할 책임",
    description: "국내 법령상 맹견과 해외에서 별도 관리되는 견종의 안전 기준을 확인해요.",
    collectionTitle: "키우기 전에 법과 안전 기준부터 확인해요.",
    collectionDescription: "견종의 인상만으로 개체의 행동을 단정할 수는 없지만, 법적 의무와 안전 관리 기준은 보호자가 선택 전에 반드시 알아야 합니다.",
    selectionNote: "대한민국 법령상 맹견 5종과 영국·호주에서 별도 규제되는 견종 중 현재 도감에 있는 항목을 구분해 보여줍니다. 교배견은 외형과 법적 판단에 따라 적용 범위가 달라질 수 있습니다.",
    moreLabel: "법과 안전 기준 보기",
    items: [
      { slug: "tosa", fact: "대한민국 동물보호법령상 맹견" },
      { slug: "american-pit-bull-terrier", fact: "대한민국 동물보호법령상 맹견" },
      { slug: "american-staffordshire-terrier", fact: "대한민국 동물보호법령상 맹견" },
      { slug: "staffordshire-bull-terrier", fact: "대한민국 동물보호법령상 맹견" },
      { slug: "rottweiler", fact: "대한민국 동물보호법령상 맹견" },
      { slug: "dogo-argentino", fact: "영국 금지 유형·호주 수입 금지 견종" },
      { slug: "fila-brasileiro", fact: "영국 금지 유형·호주 수입 금지 견종" },
      { slug: "presa-canario", fact: "호주 수입 금지 견종" },
    ],
    sources: [
      { label: "국가법령정보센터 · 동물보호법령", title: "동물보호법 및 시행규칙의 맹견 기준", organization: "대한민국 국가법령정보센터", url: "https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1028781793", checkedAt: "2026-08-16" },
      { label: "찾기쉬운 생활법령 · 맹견 사육", title: "맹견의 사육과 관리", organization: "대한민국 법제처", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=2&csmSeq=1968&menuType=cnpcls&popMenu=ov", checkedAt: "2026-08-16" },
      { label: "영국 정부 · 금지견", title: "Controlling your dog in public: banned dogs", organization: "GOV.UK", url: "https://www.gov.uk/control-dog-public/banned-dogs", checkedAt: "2026-08-16" },
      { label: "호주 연방법 · 수입 금지견", title: "Customs (Prohibited Imports) Regulations 1956", organization: "Australian Government", url: "https://www.legislation.gov.au/F1996B03651/latest/text", checkedAt: "2026-08-16" },
    ],
  },
  {
    key: "westminster-stories",
    label: "도그쇼 이야기",
    thumbnailSlug: "poodle",
    heading: "최근 무대의 주인공은 누구였을까요?",
    description: "최근 웨스트민스터 Best in Show 기록을 연도와 함께 살펴봐요.",
    collectionTitle: "한 대회의 기록으로 도그쇼 역사를 읽어봐요.",
    collectionDescription: "웨스트민스터 켄넬 클럽이 공개한 최근 Best in Show 수상 견종을 연도순으로 모았어요. 대회 수상은 반려 적합성이나 견종의 우열을 뜻하지 않습니다.",
    selectionNote: "2015~2026 Westminster Best in Show 공식 기록을 빠짐없이 사용했습니다. 푸들의 크기 변종과 비글의 규격은 도감의 통합 상세로 연결합니다.",
    moreLabel: "최근 도그쇼 기록 더 보기",
    items: [
      { slug: "dobermann", fact: "2026 Westminster Best in Show" },
      { slug: "giant-schnauzer", fact: "2025 Westminster Best in Show" },
      { slug: "poodle", fact: "2024 미니어처 푸들이 최고상" },
      { slug: "petit-basset-griffon-vendeen", fact: "2023 Westminster Best in Show" },
      { slug: "bloodhound", fact: "2022 Westminster Best in Show" },
      { slug: "pekingese", fact: "2021 Westminster Best in Show" },
      { slug: "poodle", fact: "2020 스탠더드 푸들이 최고상" },
      { slug: "wire-fox-terrier", fact: "2019 Westminster Best in Show" },
      { slug: "bichon-frise", fact: "2018 Westminster Best in Show" },
      { slug: "german-shepherd-dog", fact: "2017 Westminster Best in Show" },
      { slug: "german-short-haired-pointing-dog", fact: "2016 Westminster Best in Show" },
      { slug: "beagle", fact: "2015 15인치 비글이 최고상" },
    ],
    sources: [
      { label: "WKC · 2026 결과", title: "2026 Best in Show", organization: "The Westminster Kennel Club", url: "https://www.westminsterkennelclub.org/best-in-show-26/", checkedAt },
      { label: "WKC · 역대 수상견", title: "Best in Show Winners", organization: "The Westminster Kennel Club", url: "https://www.westminsterkennelclub.org/conformation-records/best-in-show-winners/", checkedAt },
    ],
  },
]);

const curiosityThemeOrder: HomeCuriosityThemeKey[] = [
  "regulated-care",
  "giant-build",
  "small-build",
  "wrinkled-skin",
  "distinctive-coats",
  "westminster-stories",
];

export const homeCuriosityThemes = parsedHomeCuriosityThemes.sort(
  (a, b) => curiosityThemeOrder.indexOf(a.key) - curiosityThemeOrder.indexOf(b.key),
);

export function getHomeCuriosityTheme(key: string) {
  return homeCuriosityThemes.find((theme) => theme.key === key);
}

export function getHomeCuriosityBreeds(theme: HomeCuriosityTheme, allBreeds: readonly Breed[]) {
  if (theme.catalogRule) {
    return allBreeds
      .filter((breed) => {
        const sizes = getBreedFilterValue(breed, "size");
        if (theme.catalogRule === "large-and-giant") return sizes.includes("large") || sizes.includes("giant");
        return sizes.includes("small") || breed.catalog.group === "companion";
      })
      .sort((a, b) => a.nameKo.localeCompare(b.nameKo, "ko"))
      .map((breed) => ({ breed, fact: breed.identity.size }));
  }

  const breedsBySlug = new Map(allBreeds.map((breed) => [breed.slug, breed]));
  return theme.items.flatMap((item) => {
    const breed = breedsBySlug.get(item.slug);
    return breed ? [{ breed, fact: item.fact }] : [];
  });
}
