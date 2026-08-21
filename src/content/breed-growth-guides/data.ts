import { breedGrowthGuideCollectionSchema } from "./schema";

const checkedAt = "2026-08-21";

export const breedGrowthGuides = breedGrowthGuideCollectionSchema.parse([
  {
    slug: "poodle",
    intro: "달력의 숫자보다 지금 보이는 성장과 편안함을 살피며, 건강 확인·새로운 경험·미용 적응·휴식의 순서를 천천히 만들어주세요.",
    stages: [
      {
        label: "성장 전반",
        ageGuide: "대략 생후 2~4개월",
        title: "안전한 경험과 돌봄의 첫 기준을 만들어요.",
        description: "몸과 행동이 빠르게 변하는 시기예요. 많은 자극을 한꺼번에 주기보다 편안하게 끝낼 수 있는 짧은 경험을 쌓아주세요.",
        image: "/illustrations/v5/poodle-growth-early.webp",
        alt: "상대적으로 큰 머리와 짧은 다리, 부드러운 어린 피모를 지닌 살구색 미니어처 푸들 성장 전반 삽화",
        actions: [
          "기존 기록을 가지고 동물병원을 방문해 예방접종과 기생충 관리 계획을 개별적으로 확인해요.",
          "사람·소리·바닥·이동장을 억지로 마주하게 하지 말고, 먹고 쉬며 회복할 수 있는 안전한 경험으로 소개해요.",
          "배변과 혼자 쉬는 자리를 일관되게 안내하고, 빗·발·귀 접촉은 몇 초의 편안한 연습부터 시작해요.",
        ],
      },
      {
        label: "성장 중반",
        ageGuide: "대략 생후 4~12개월",
        title: "커지는 몸과 감정을 다루는 생활 규칙을 익혀요.",
        description: "다리가 길어지고 활동과 호기심이 커질 수 있어요. 잘하던 행동이 흔들려도 성장 과정으로 보고 환경과 연습 난도를 조정해주세요.",
        image: "/illustrations/v5/poodle-growth-middle.webp",
        alt: "다리와 주둥이가 길어지고 성견 곱슬 피모로 바뀌는 살구색 미니어처 푸들 성장 중반 삽화",
        actions: [
          "씹어도 되는 물건과 닿으면 안 되는 물건을 구분하고, 물기와 점프는 체벌 대신 가능한 다른 행동으로 안내해요.",
          "산책 줄·호출·기다리기를 방해가 적은 곳부터 연습하고, 새로운 과제 뒤에는 자극 없는 휴식을 이어줘요.",
          "빗질·목욕·드라이·클리퍼 소리를 작은 단계로 나눠 익히고, 엉킴을 억지로 당기지 않아요.",
        ],
      },
      {
        label: "성견 이후",
        ageGuide: "대략 생후 12개월 이후",
        title: "지속 가능한 운동과 관리 주기를 정착시켜요.",
        description: "겉모습이 성견에 가까워져도 사회적 성숙과 생활 습관은 계속 변할 수 있어요. 실제 체격과 반응에 맞춰 일정을 조정해주세요.",
        image: "/illustrations/v5/poodle-growth-adult.webp",
        alt: "균형 잡힌 체형과 촘촘한 성견 피모를 지닌 살구색 미니어처 푸들 성견 삽화",
        actions: [
          "토이·미니어처·미디엄·스탠더드를 같은 운동량으로 묶지 말고 체격·체중·회복 속도에 맞춰 활동을 계획해요.",
          "규칙적인 빗질과 전문 미용 주기를 생활비와 일정에 포함하고 피부·귀·치아 상태도 함께 살펴요.",
          "익숙한 학습만 반복하기보다 냄새 찾기와 회수 같은 과제를 바꾸어 제공하고, 아무 일 없이 쉬는 시간도 지켜줘요.",
        ],
      },
    ],
    medicalNote: "표시한 월령은 탐색을 돕는 넓은 범위이며 성장 완료 시점은 크기와 개체에 따라 달라요. 예방접종·급여·중성화·운동 제한은 이 표로 결정하지 말고 담당 수의사와 개별 계획을 세워주세요.",
    sources: [
      {
        title: "2019 Canine Life Stage Guidelines",
        organization: "American Animal Hospital Association",
        url: "https://www.aaha.org/resources/life-stage-canine-2019/life-stage-canine-2019-2/",
        checkedAt,
      },
      {
        title: "Position Statement on Puppy Socialization",
        organization: "American Veterinary Society of Animal Behavior",
        url: "https://avsab.org/wp-content/uploads/2024/12/Puppy-Socialization-Position-Statement-FINAL.pdf",
        checkedAt,
      },
      {
        title: "2024 Guidelines for the Vaccination of Dogs and Cats",
        organization: "World Small Animal Veterinary Association",
        url: "https://wsava.org/wp-content/uploads/2024/04/WSAVA-Vaccination-guidelines-2024.pdf",
        checkedAt,
      },
    ],
  },
]);

export function getBreedGrowthGuide(slug: string) {
  return breedGrowthGuides.find((guide) => guide.slug === slug);
}
