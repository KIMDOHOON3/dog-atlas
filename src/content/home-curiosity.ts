import { z } from "zod";
import { sourceSchema, type Breed } from "@/content/breeds/schema";

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
    "names-at-work",
    "westminster-stories",
  ]),
  label: z.string().min(2),
  thumbnailSlug: z.string().regex(/^[a-z0-9-]+$/),
  heading: z.string().min(10),
  description: z.string().min(20),
  collectionTitle: z.string().min(10),
  collectionDescription: z.string().min(20),
  selectionNote: z.string().min(20),
  moreLabel: z.string().min(4),
  items: z.array(curiosityItemSchema).min(6),
  sources: z.array(curiositySourceSchema).min(1),
});

const checkedAt = "2026-08-12";

export type HomeCuriosityTheme = z.infer<typeof homeCuriosityThemeSchema>;
export type HomeCuriosityThemeKey = HomeCuriosityTheme["key"];

export const homeCuriosityThemes = z.array(homeCuriosityThemeSchema).length(6).parse([
  {
    key: "giant-build",
    label: "큰 체구",
    thumbnailSlug: "great-dane",
    heading: "서 있기만 해도 압도적인 체구",
    description: "초대형으로 분류된 견종 중 서로 다른 체형과 역할을 가진 세 견종을 살펴봐요.",
    collectionTitle: "큰 체구 안에도 서로 다른 삶이 있어요.",
    collectionDescription: "키와 몸무게가 큰 견종을 한데 모았어요. 크기만 비슷할 뿐, 형성 지역과 원래 역할, 필요한 생활 준비는 서로 다릅니다.",
    selectionNote: "세계 순위가 아니라 현재 도감의 체구 정보에서 초대형으로 확인되는 견종을 편집해 보여주는 목록입니다.",
    moreLabel: "큰 체구 견종 더 보기",
    items: [
      { slug: "great-dane", fact: "약 72~90cm의 초대형견" },
      { slug: "irish-wolfhound", fact: "약 76~81cm 이상의 시각하운드" },
      { slug: "newfoundland", fact: "약 50~68kg의 수상 작업견" },
      { slug: "saint-bernard", fact: "알프스 산악 작업의 역사를 지닌 큰 개" },
      { slug: "mastiff", fact: "묵직한 체형의 영국 마스티프" },
      { slug: "leonberger", fact: "큰 체격과 풍성한 이중모" },
    ],
    sources: [
      { label: "FCI · Great Dane", title: "Great Dane — Standard No. 235", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/GREAT-DANE-235.html", checkedAt },
      { label: "FCI · Irish Wolfhound", title: "Irish Wolfhound — Standard No. 160", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/IRISH-WOLFHOUND-160.html", checkedAt },
      { label: "FCI · Newfoundland", title: "Newfoundland — Standard No. 50", organization: "Fédération Cynologique Internationale", url: "https://www.fci.be/en/nomenclature/NEWFOUNDLAND-50.html", checkedAt },
    ],
  },
  {
    key: "small-build",
    label: "작은 체구",
    thumbnailSlug: "chihuahua",
    heading: "작지만 존재감은 큰 견종들",
    description: "작은 체구 안에서도 몸의 비율과 역사, 필요한 관리가 얼마나 다른지 만나보세요.",
    collectionTitle: "작은 몸을 같은 생활로 묶을 수는 없어요.",
    collectionDescription: "공식 표준과 도감의 체구 정보에서 작은 편으로 확인되는 견종을 모았어요. 작은 몸이 낮은 활동량이나 쉬운 돌봄을 뜻하지는 않습니다.",
    selectionNote: "정확한 세계 최저 순위가 아니라 체고와 체중이 작은 견종을 서로 다른 계통에서 편집한 목록입니다.",
    moreLabel: "작은 체구 견종 더 보기",
    items: [
      { slug: "chihuahua", fact: "약 1.5~3kg의 초소형 반려견" },
      { slug: "russian-toy", fact: "약 20~28cm, 1.5~3kg" },
      { slug: "prague-ratter", fact: "약 21~23cm, 2~3kg" },
      { slug: "maltese", fact: "사람 곁에서 발전한 초소형 반려견" },
      { slug: "english-toy-terrier", fact: "약 2.7~3.6kg의 작은 테리어" },
      { slug: "japanese-chin", fact: "작고 가벼운 궁정 반려견" },
    ],
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
    key: "names-at-work",
    label: "이름 속 직업",
    thumbnailSlug: "shetland-sheepdog",
    heading: "이름을 읽으면 옛일이 보여요",
    description: "Pointer, Retriever, Setter처럼 이름에 남은 작업의 단서를 세 견종부터 읽어봐요.",
    collectionTitle: "견종 이름에는 사람이 불렀던 일이 남아 있어요.",
    collectionDescription: "가리키고, 되가져오고, 자리를 잡고, 가축과 일하던 방식이 이름에 남은 견종을 한자리에 모았어요.",
    selectionNote: "이름은 역사적 역할을 이해하는 시작점입니다. 같은 이름군의 모든 견종이나 오늘의 개체가 똑같이 행동한다는 뜻은 아닙니다.",
    moreLabel: "이름 속 역할 더 보기",
    items: [
      { slug: "english-pointer", fact: "사냥감 방향을 몸으로 가리키던 이름" },
      { slug: "labrador-retriever", fact: "사냥한 새를 찾아 되가져오던 이름" },
      { slug: "english-setter", fact: "새 앞에서 자리를 잡아 알리던 이름" },
      { slug: "english-cocker-spaniel", fact: "덤불 속 새와 연결된 스패니얼 이름" },
      { slug: "shetland-sheepdog", fact: "양과 가축을 다루던 역할이 남은 이름" },
      { slug: "airedale-terrier", fact: "땅과 굴 작업 계통을 가리키는 이름" },
    ],
    sources: [
      { label: "AKC · Pointer", title: "Get to Know the Pointer Breeds", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/sporting-group-pointer-breeds/", checkedAt },
      { label: "AKC · Retriever", title: "Get to Know the Retriever Breeds", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/meet-retriever-breeds/", checkedAt },
      { label: "AKC · Setter", title: "Get to Know the Setter Breeds", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/meet-setter-breeds/", checkedAt },
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
    selectionNote: "2021~2026 Westminster Best in Show 공식 기록을 사용했습니다. 2024년 수상견은 미니어처 푸들이며, 도감에서는 크기 변종을 함께 다루는 푸들 상세로 연결합니다.",
    moreLabel: "최근 도그쇼 기록 더 보기",
    items: [
      { slug: "dobermann", fact: "2026 Westminster Best in Show" },
      { slug: "giant-schnauzer", fact: "2025 Westminster Best in Show" },
      { slug: "poodle", fact: "2024 미니어처 푸들이 최고상" },
      { slug: "petit-basset-griffon-vendeen", fact: "2023 Westminster Best in Show" },
      { slug: "bloodhound", fact: "2022 Westminster Best in Show" },
      { slug: "pekingese", fact: "2021 Westminster Best in Show" },
    ],
    sources: [
      { label: "WKC · 2026 결과", title: "2026 Best in Show", organization: "The Westminster Kennel Club", url: "https://www.westminsterkennelclub.org/best-in-show-26/", checkedAt },
      { label: "WKC · 역대 수상견", title: "Best in Show Winners", organization: "The Westminster Kennel Club", url: "https://www.westminsterkennelclub.org/conformation-records/best-in-show-winners/", checkedAt },
    ],
  },
]);

export function getHomeCuriosityTheme(key: string) {
  return homeCuriosityThemes.find((theme) => theme.key === key);
}

export function getHomeCuriosityBreeds(theme: HomeCuriosityTheme, allBreeds: readonly Breed[]) {
  const breedsBySlug = new Map(allBreeds.map((breed) => [breed.slug, breed]));
  return theme.items.flatMap((item) => {
    const breed = breedsBySlug.get(item.slug);
    return breed ? [{ breed, fact: item.fact }] : [];
  });
}
