import { standardBreedDetailSchema } from "./schema";

export const americanCockerSpanielDetail = standardBreedDetailSchema.parse({
  slug: "american-cocker-spaniel",
  nameKo: "아메리칸 코커 스패니얼",
  metadataDescription: "낮은 덤불에서 새를 찾아 날아오르게 하던 아메리칸 코커 스패니얼의 과거와 오늘의 활동, 피모 관리를 살펴봅니다.",
  heroStatement: "낮은 덤불에서 새를 찾아 날아오르게 하던 작은 조렵견이에요.",
  story: {
    title: "코커 스패니얼은 왜 찾고 물어오는 일에 관심을 보일까요?",
    description: "과거의 역할을 알면 오늘의 행동을 조금 다르게 이해할 수 있어요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "낮은 덤불에서 새를 찾아 날아오르게 했어요.",
        body: "코커 스패니얼은 덤불에서 작은 새를 찾아 날아오르게 하고, 사냥한 새를 회수하던 조렵견이에요.",
        image: "/illustrations/v3/american-cocker-spaniel-history.webp",
        imageAlt: "낮은 풀과 덤불이 있는 들판에서 새가 날아오르는 방향을 살피며 움직이는 황금색 성견 아메리칸 코커 스패니얼 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "가까운 구역을 코로 살피는 활동에 참여할 수 있어요.",
        body: "그 배경은 오늘날에도 가까운 곳을 코로 살피고, 찾은 물건을 사람과 주고받는 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/american-cocker-spaniel-feature-close-search.webp",
        imageAlt: "울타리가 있는 낮은 풀밭에서 보호자와 긴 줄을 연결한 채 캔버스 냄새 주머니를 가까이 살피는 황금색 성견 아메리칸 코커 스패니얼 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "작은 몸이라고 활동이 적은 건 아니에요.",
        body: "산책만으로 활동이 채워지지는 않아요. 보호자는 찾기와 가져오기 같은 활동에 매일 시간을 낼 수 있는지 살펴야 해요.",
        image: "/illustrations/v4/american-cocker-spaniel-feature-daily-interaction.webp",
        imageAlt: "집 안에서 황금색 성견 아메리칸 코커 스패니얼이 부드러운 캔버스 회수 도구를 보호자가 내민 손에 건네는 삽화",
      },
    ],
    caution: "견종의 과거는 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "왜 ‘악마견’이라는 별명이 붙었을까요?",
  realities: [
    {
      id: "devil-dog-nickname",
      title: "활동이 부족할 때 붙은 별명이에요.",
      body: "물건을 물고 다니거나 계속 놀자고 보채는 모습이 과장돼 붙었어요. 모든 개체를 뜻하지는 않아요.",
      image: "/illustrations/v4/american-cocker-spaniel-feature-household-redirect.webp",
      imageAlt: "집 안 양말을 물고 다니는 황금색 성견 아메리칸 코커 스패니얼에게 보호자가 장난감 바구니의 부드러운 회수 도구를 건네는 삽화",
    },
    {
      id: "stacked-daily-work",
      title: "활동과 피모 관리를 함께 챙겨야 해요.",
      body: "매일 몸과 머리를 쓰는 활동이 필요하고, 긴 피모는 빗질과 정기적인 미용이 필요해요.",
      image: "/illustrations/v4/american-cocker-spaniel-feature-coat-care.webp",
      imageAlt: "집 안 미끄럼 방지 매트에서 보호자가 황금색 성견 아메리칸 코커 스패니얼의 전신 장식털을 빗는 삽화",
    },
  ],
  readinessTitle: "아메리칸 코커 스패니얼과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "산책 외에도 매일 짧은 찾기와 가져오기 활동을 함께할 시간이 있나요?",
    "풍성한 피모를 구역별로 빗고 정기적인 미용 비용과 시간을 감당할 수 있나요?",
    "활동과 피모 관리가 같은 날 겹쳐도 꾸준히 이어갈 생활 리듬을 만들 수 있나요?",
  ],
  relatedTitle: "비슷해 보여도 생활 조건은 어떻게 다를까요?",
  relatedDescription: "긴 귀와 풍성한 피모만 보지 말고 원래 역할, 체격, 활동과 관리 부담을 함께 비교해 보세요.",
  relatedDifferences: {
    "english-cocker-spaniel": "같은 코커 조렵견의 뿌리를 공유하지만 아메리칸 코커가 대체로 더 작고 머리와 주둥이 비율, 피모의 풍성함이 달라요.",
    "cavalier-king-charles-spaniel": "긴 귀와 사람 곁 생활은 닮았지만 캐벌리어는 토이 스패니얼이고, 아메리칸 코커는 새를 찾아 날아오르게 하던 조렵견 배경을 지녀요.",
  },
});
