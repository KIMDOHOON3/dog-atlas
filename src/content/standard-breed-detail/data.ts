import { standardBreedDetailSchema } from "./schema";
import { familiarStandardBreedDetails } from "./familiar-data";

const japaneseSpitzDetail = standardBreedDetailSchema.parse({
  slug: "japanese-spitz",
  nameKo: "재패니즈 스피츠",
  metadataDescription: "사람 곁의 반려견으로 자리 잡은 배경과 주변 변화를 알아차리는 경향, 매일 필요한 활동과 풍성한 이중모 관리를 살펴봅니다.",
  heroStatement: "사람 곁의 반려견으로 자리 잡은 흰 스피츠예요.",
  story: {
    title: "왜 가족의 움직임과 주변 변화에 관심을 보일까요?",
    description: "형성 배경을 알면 사람 곁에서 보이는 관심과 알림 반응을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "형성 배경",
        eyebrow: "1단계 · 어떻게 자리 잡았을까?",
        title: "일본에서 반려견으로 자리 잡았어요.",
        body: "재패니즈 스피츠는 20세기 일본에서 여러 흰 스피츠 타입의 개를 바탕으로 형성됐어요.",
        image: "/illustrations/v3/japanese-spitz-history.webp",
        imageAlt: "일본식 주택 마당에서 사람 곁에 서 있는 흰 재패니즈 스피츠 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "사람 곁의 움직임에 관심을 보일 수 있어요.",
        body: "사람과 가까이 지내온 배경은 산책이나 놀이에 함께 참여하고 가족의 움직임을 살피는 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/japanese-spitz-feature-companionship.webp",
        imageAlt: "보호자 곁을 따라 걸으며 얼굴을 바라보는 재패니즈 스피츠 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "주변 변화를 알아차리면 소리로 알릴 수 있어요.",
        body: "현관 소리나 창밖 움직임에 귀를 기울인 뒤 짖을 수 있어요. 소리를 들은 다음 보호자에게 돌아오거나 자기 자리에서 쉬는 순서를 차분히 연습해 주세요.",
        image: "/illustrations/v4/japanese-spitz-feature-calm-alert.webp",
        imageAlt: "닫힌 현관문 밖의 소리를 차분히 알아차리는 재패니즈 스피츠 삽화",
      },
    ],
    caution: "견종의 형성 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "재패니즈 스피츠의 생활 현실",
  realities: [
    {
      id: "daily-activity",
      title: "작은 외형과 별개인 활동 리듬",
      body: "작아 보이더라도 매일 산책하고 함께 놀 시간이 필요해요. 냄새를 맡고 주변을 살피는 여유도 일상에 포함해보세요.",
      image: "/illustrations/v4/japanese-spitz-feature-play.webp",
      imageAlt: "야외에서 보호자와 활기차게 놀이하는 재패니즈 스피츠 삽화",
    },
    {
      id: "double-coat",
      title: "풍성한 이중모 관리",
      body: "짧고 촘촘한 속털과 풍성한 겉털을 함께 지녀요. 특히 털갈이 시기에는 빠진 속털을 규칙적으로 빗어내야 해요.",
      image: "/illustrations/v4/japanese-spitz-feature-double-coat.webp",
      imageAlt: "보호자가 재패니즈 스피츠의 풍성한 이중모를 빗는 삽화",
    },
  ],
  readinessTitle: "재패니즈 스피츠와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "매일 산책과 놀이를 함께할 시간을 만들 수 있나요?",
    "현관과 창밖 소리에 반응할 때 생활 환경을 함께 조율할 수 있나요?",
    "털갈이 시기까지 규칙적인 빗질을 이어갈 수 있나요?",
  ],
  relatedTitle: "재패니즈 스피츠가 마음에 들지만 망설여진다면",
  relatedDescription: "다른 체격과 피모 관리 조건을 가진 견종도 함께 살펴보세요.",
  relatedDifferences: {
    samoyed: "같은 흰 스피츠형 외모지만 체격과 활동 규모, 더위와 털 관리 부담이 더 커요.",
    maltese: "가정에서 가까이 지내는 흰 소형견이지만 피모 구조와 주변 변화에 대한 반응이 달라요.",
  },
});

const malteseDetail = standardBreedDetailSchema.parse({
  slug: "maltese",
  nameKo: "말티즈",
  metadataDescription: "중앙 지중해에서 오랫동안 사람 곁에 머문 배경과 오늘날의 교감 경향, 작은 체구의 생활 안전과 길고 곧은 피모 관리를 살펴봅니다.",
  heroStatement: "오랫동안 사람 곁에서 살아온 작은 반려견이에요.",
  story: {
    title: "말티즈는 왜 가족 가까이에 있으려 할까요?",
    description: "오랜 반려의 배경을 알면 사람 곁에서 보이는 관심과 매일 필요한 교감을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "오랜 반려의 배경",
        eyebrow: "1단계 · 어디에서 함께했을까?",
        title: "중앙 지중해의 도시에서 사람과 살아왔어요.",
        body: "말티즈의 조상으로 여겨지는 작은 개들은 중앙 지중해의 항구와 해안 도시에서 생활했어요. 고대 로마에는 사람 곁의 반려견으로 기록됐어요.",
        image: "/illustrations/v3/maltese-history.webp",
        imageAlt: "중앙 지중해의 해안 도시에서 사람 곁에 앉아 있는 흰 말티즈 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "가족의 가까운 곳을 선택할 수 있어요.",
        body: "오랫동안 반려견으로 지내온 배경은 가족의 움직임을 살피고 가까이 머무는 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/maltese-feature-companionship.webp",
        imageAlt: "소파에 앉은 보호자 가까이 서서 얼굴을 바라보는 성견 말티즈 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "작은 몸이어도 함께하는 활동은 필요해요.",
        body: "사람 곁에 있는 시간만으로 하루가 채워지는 것은 아니에요. 짧은 산책과 놀이, 편안히 혼자 쉬는 시간을 함께 마련해야 해요.",
        image: "/illustrations/v4/maltese-feature-play.webp",
        imageAlt: "거실 바닥에서 보호자에게 작은 장난감을 가져가는 성견 말티즈 삽화",
      },
    ],
    caution: "견종의 오랜 반려 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "말티즈의 생활 현실",
  realities: [
    {
      id: "small-body-safety",
      title: "작은 몸에 맞춘 생활 동선",
      body: "높은 가구에서 뛰어내리거나 거친 상호작용은 작은 몸에 부담이 될 수 있어요. 바닥과 오르내리는 높이, 함께 지내는 사람의 움직임을 살펴야 해요.",
      image: "/illustrations/v4/maltese-feature-small-body-safety.webp",
      imageAlt: "낮은 반려견 계단 옆에서 보호자의 안내를 받는 성견 말티즈 삽화",
    },
    {
      id: "straight-coat-care",
      title: "길고 곧은 피모 관리",
      body: "긴 흰 피모를 유지하려면 엉킨 곳을 살피는 잦은 빗질과 정기적인 관리가 필요해요. 짧게 다듬어도 빗질 부담이 사라지는 것은 아니에요.",
      image: "/illustrations/v4/maltese-feature-coat-care.webp",
      imageAlt: "보호자가 성견 말티즈의 길고 곧은 흰 피모를 빗으로 관리하는 삽화",
    },
  ],
  readinessTitle: "말티즈와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "높은 곳과 미끄러운 바닥을 작은 체구에 맞게 정리할 수 있나요?",
    "집에서의 빗질과 정기적인 피모 관리를 꾸준히 이어갈 수 있나요?",
    "매일 산책과 놀이, 편안히 혼자 쉬는 시간을 함께 마련할 수 있나요?",
  ],
  relatedTitle: "말티즈가 마음에 들지만 망설여진다면",
  relatedDescription: "비슷한 첫인상 안에서도 다른 체격과 피모 구조를 가진 견종을 살펴보세요.",
  relatedDifferences: {
    "japanese-spitz": "같은 흰 소형 반려견이지만 더 큰 체격과 풍성한 이중모, 주변 변화를 알리는 반응이 달라요.",
    "bichon-frise": "비슷한 흰 소형견이지만 곱슬 피모의 손질 방식과 활동 리듬이 달라요.",
  },
});

const bichonFriseDetail = standardBreedDetailSchema.parse({
  slug: "bichon-frise",
  nameKo: "비숑 프리제",
  metadataDescription: "프랑스와 벨기에에서 반려견으로 정립된 배경과 사람과 함께하는 참여, 활기찬 움직임, 독립 휴식과 곱슬 피모 관리를 살펴봅니다.",
  heroStatement: "사람과 함께하는 활동에 생기 있게 참여하는 작은 반려견이에요.",
  story: {
    title: "비숑 프리제는 왜 사람과 함께하는 활동에 적극적일까요?",
    description: "반려견으로 정립된 배경을 알면 사람과 주고받는 참여와 매일 필요한 활동 리듬을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "반려견의 배경",
        eyebrow: "1단계 · 어떻게 자리 잡았을까?",
        title: "프랑스와 벨기에에서 반려견으로 정립됐어요.",
        body: "비숑 프리제는 지중해 지역의 작은 흰 반려견 계통과 연결되며, 프랑스와 벨기에에서 오늘날의 품종으로 정립됐어요.",
        image: "/illustrations/v3/bichon-frise-history.webp",
        imageAlt: "지중해와 유럽의 생활 공간에서 사람 곁에 머무는 흰 비숑 프리제 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "사람과 주고받는 활동에 참여할 수 있어요.",
        body: "반려견으로 지내온 배경은 보호자의 신호를 살피고 짧은 학습이나 놀이에 적극적으로 참여하는 모습으로 나타날 수 있어요.",
        image: "/illustrations/v4/bichon-frise-feature-cooperative-learning.webp",
        imageAlt: "보호자의 손 신호를 살피며 짧은 이동 과제에 참여하는 흰 성견 비숑 프리제 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "작은 몸에도 매일 움직이고 놀 시간이 필요해요.",
        body: "가볍고 활기차게 움직일 수 있어요. 산책과 놀이를 마련하고, 활동 뒤에는 혼자 편안히 쉬는 리듬도 함께 가르쳐야 해요.",
        image: "/illustrations/v4/bichon-frise-feature-play.webp",
        imageAlt: "조용한 공원에서 보호자가 굴린 공을 따라 활기차게 움직이는 흰 성견 비숑 프리제 삽화",
      },
    ],
    caution: "견종의 반려 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "비숑 프리제의 생활 현실",
  realities: [
    {
      id: "independent-rest",
      title: "사람 곁과 독립 휴식의 균형",
      body: "사람과 함께하는 시간을 즐길 수 있지만 늘 붙어 있는 것만으로 충분하지 않아요. 짧고 성공적인 혼자 쉬기를 일상에서 연습해야 해요.",
      image: "/illustrations/v4/bichon-frise-feature-independent-rest.webp",
      imageAlt: "보호자가 일하는 동안 조금 떨어진 자기 매트에서 편안히 쉬는 흰 성견 비숑 프리제 삽화",
    },
    {
      id: "curly-coat-care",
      title: "속까지 살피는 곱슬 피모 관리",
      body: "부드러운 곱슬 피모는 엉킨 곳을 피부 가까이까지 나누어 빗고, 목욕 뒤 충분히 말리며 정기적으로 다듬는 관리가 필요해요.",
      image: "/illustrations/v4/bichon-frise-feature-curly-coat-care.webp",
      imageAlt: "보호자가 흰 성견 비숑 프리제의 곱슬 피모를 작은 구역으로 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "비숑 프리제와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "매일 산책과 놀이, 짧은 학습 활동을 함께할 수 있나요?",
    "사람 곁에 있는 시간과 혼자 편안히 쉬는 연습을 함께 마련할 수 있나요?",
    "집에서의 빗질과 목욕·건조, 정기적인 미용을 이어갈 수 있나요?",
  ],
  relatedTitle: "비숑 프리제가 마음에 들지만 망설여진다면",
  relatedDescription: "비슷한 흰 소형 반려견 안에서도 피모 구조와 활동 리듬의 차이를 살펴보세요.",
  relatedDifferences: {
    maltese: "같은 흰 소형 반려견이지만 길고 곧은 피모와 작은 체구에 맞춘 생활 동선이 달라요.",
    poodle: "곱슬 피모를 공유하지만 네 가지 크기 범위와 회수견 배경, 학습 활동의 규모가 달라요.",
  },
});

const greyhoundDetail = standardBreedDetailSchema.parse({
  slug: "greyhound",
  nameKo: "그레이하운드",
  metadataDescription: "시각으로 사냥감을 찾고 짧게 질주하던 배경과 현대의 추적 경향, 편안한 휴식 공간과 충분한 보온 준비를 살펴봅니다.",
  heroStatement: "빠른 질주와 긴 휴식의 리듬을 함께 지닌 대형 시각하운드예요.",
  story: {
    title: "그레이하운드는 왜 빠른 움직임을 쫓고 오래 쉬기도 할까요?",
    description: "시각하운드의 배경을 알면 움직임에 반응하는 방식과 짧은 질주 뒤의 회복 리듬을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "사냥의 배경",
        eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
        title: "눈으로 사냥감을 찾고 빠르게 뒤쫓던 시각하운드예요.",
        body: "그레이하운드는 넓은 지형에서 멀리 움직이는 대상을 발견하고 빠르게 추적하도록 발달했어요. 영국에서 사냥용 시각하운드로 정립된 배경이 있어요.",
        image: "/illustrations/v3/greyhound-history.webp",
        imageAlt: "건조한 들판에서 먼 대상을 바라보는 사람과 성견 그레이하운드를 그린 편집 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "멀리 움직이는 대상을 먼저 발견할 수 있어요.",
        body: "산책 중 작은 동물이나 빠르게 지나가는 대상에 시선이 고정되고 쫓으려 할 수 있어요. 안전한 리드를 사용하고 실제 반응을 살펴야 해요.",
        image: "/illustrations/v4/greyhound-feature-visual-tracking.webp",
        imageAlt: "현대 공원에서 멀리 지나가는 자전거를 알아차리고 보호자 곁에 서 있는 성견 그레이하운드 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "짧게 속도를 낸 뒤에는 충분한 회복이 필요해요.",
        body: "안전하게 닫힌 공간에서 짧게 달릴 기회와 매일 냄새를 맡는 산책을 마련해요. 활동 뒤에는 조용히 쉬며 회복할 시간을 주어야 해요.",
        image: "/illustrations/v4/greyhound-feature-sprint-rest.webp",
        imageAlt: "안전하게 울타리가 설치된 공원 운동장에서 짧게 달리는 성견 그레이하운드 삽화",
      },
    ],
    caution: "시각하운드의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "그레이하운드의 생활 현실",
  realities: [
    {
      id: "independent-rest",
      title: "긴 몸을 내려놓는 조용한 휴식 공간",
      body: "대형견의 긴 다리와 몸통을 편안히 둘 수 있는 넓고 부드러운 자리를 마련해요. 사람의 동선에서 살짝 벗어나 방해받지 않고 쉬는 시간도 필요해요.",
      image: "/illustrations/v4/greyhound-feature-independent-rest.webp",
      imageAlt: "거실 한쪽의 넓고 부드러운 침대에서 보호자와 거리를 두고 편안히 쉬는 성견 그레이하운드 삽화",
    },
    {
      id: "cold-weather",
      title: "짧은 피모에 맞춘 기온 관리",
      body: "피모가 짧고 몸에 지방이 적은 편이라 추운 날씨와 차가운 바닥을 불편해할 수 있어요. 기온과 개별 반응에 맞춰 보온 의류와 따뜻한 쉬는 자리를 준비해요.",
      image: "/illustrations/v4/greyhound-feature-cold-weather.webp",
      imageAlt: "쌀쌀한 늦가을 공원에서 몸에 맞는 보온 코트를 입고 산책하는 성견 그레이하운드 삽화",
    },
  ],
  readinessTitle: "그레이하운드와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "움직이는 대상을 쫓을 수 있는 반응을 고려해 안전한 리드와 닫힌 공간을 준비할 수 있나요?",
    "매일의 산책과 짧은 질주 기회, 활동 뒤의 충분한 휴식을 함께 마련할 수 있나요?",
    "긴 몸을 받쳐줄 휴식 자리와 추운 날의 보온 준비를 이어갈 수 있나요?",
  ],
  relatedTitle: "그레이하운드가 마음에 들지만 망설여진다면",
  relatedDescription: "같은 시각하운드 안에서도 체격과 활동, 보온 부담이 다른 견종을 살펴보세요.",
  relatedDifferences: {
    whippet: "질주와 휴식의 리듬은 비슷하지만 성견의 체격과 이동·주거 공간의 부담이 달라요.",
    "italian-sighthound": "빠른 시각 반응과 짧은 피모는 닮았지만 훨씬 작은 체격에 맞는 보온과 안전 동선이 필요해요.",
  },
});

const standardBreedDetails = new Map(
  [japaneseSpitzDetail, malteseDetail, bichonFriseDetail, greyhoundDetail, ...familiarStandardBreedDetails].map((detail) => [detail.slug, detail]),
);

export function getStandardBreedDetail(slug: string) {
  return standardBreedDetails.get(slug);
}

export function getAllStandardBreedDetails() {
  return [...standardBreedDetails.values()];
}

export { bichonFriseDetail, greyhoundDetail, japaneseSpitzDetail, malteseDetail };
