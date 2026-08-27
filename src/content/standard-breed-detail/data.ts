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

const whippetDetail = standardBreedDetailSchema.parse({
  slug: "whippet",
  nameKo: "휘펫",
  metadataDescription: "영국에서 작은 사냥감 추적과 직선 경주에 쓰인 배경, 빠른 움직임을 보는 경향과 짧은 질주 뒤 회복, 푹신한 휴식과 보온 준비를 살펴봅니다.",
  heroStatement: "빠른 질주와 포근한 휴식을 오가는 중형 시각하운드예요.",
  story: {
    title: "휘펫은 왜 빠른 움직임에 반응하고 곧 조용히 쉬기도 할까요?",
    description: "영국 시각하운드의 배경을 알면 움직임을 쫓는 시선과 짧게 속도를 낸 뒤 회복하는 리듬을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "사냥과 경주의 배경",
        eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
        title: "영국에서 작은 사냥감 추적과 직선 경주에 쓰였어요.",
        body: "휘펫은 19세기 영국에서 뚜렷한 견종으로 자리 잡았어요. 작은 사냥감을 쫓는 일과 짧은 직선 경주에서 빠른 가속이 중요했어요.",
        image: "/illustrations/v3/whippet-history.webp",
        imageAlt: "19세기 영국 북부의 열린 들판에서 천 조각 루어를 바라보는 성견 휘펫 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "빠르게 지나가는 대상을 먼저 발견할 수 있어요.",
        body: "산책 중 작은 동물이나 자전거처럼 빠른 움직임에 시선이 고정되고 쫓으려 할 수 있어요. 안전한 리드를 유지하고 실제 반응을 살펴야 해요.",
        image: "/illustrations/v4/whippet-feature-visual-tracking.webp",
        imageAlt: "공원에서 멀리 지나가는 자전거를 본 뒤 보호자의 손으로 시선을 돌리는 성견 휘펫 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "짧게 속도를 낸 뒤 천천히 회복하는 시간이 필요해요.",
        body: "완전히 닫힌 안전한 공간에서 짧게 달릴 기회를 마련해요. 활동 뒤에는 물을 마시고 호흡과 움직임이 편안해지는지 살피며 충분히 쉬게 해요.",
        image: "/illustrations/v4/whippet-feature-sprint-recovery.webp",
        imageAlt: "울타리가 닫힌 운동장에서 짧게 달린 뒤 보호자 곁에서 물을 마시며 쉬는 성견 휘펫의 두 장면 삽화",
      },
    ],
    caution: "시각하운드의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "휘펫의 생활 현실",
  realities: [
    {
      id: "soft-rest",
      title: "가는 몸을 받쳐주는 푹신한 휴식 자리",
      body: "딱딱하고 차가운 바닥보다 몸 전체를 편안히 받쳐주는 침구를 마련해요. 활동하지 않을 때 조용히 몸을 말고 쉬는 시간도 방해받지 않게 해주세요.",
      image: "/illustrations/v4/whippet-feature-warm-rest.webp",
      imageAlt: "실내의 두꺼운 원형 침구 위에서 몸을 말고 편안히 쉬는 성견 휘펫 삽화",
    },
    {
      id: "cold-weather",
      title: "짧은 피모에 맞춘 추운 날의 보온",
      body: "매우 짧고 가는 피모는 차가운 바람을 막아주기 어려워요. 기온과 개별 반응에 맞는 옷을 준비하고 산책 뒤 몸이 차갑거나 불편해하지 않는지 살펴요.",
      image: "/illustrations/v4/whippet-feature-cold-weather.webp",
      imageAlt: "쌀쌀한 늦가을 공원에서 몸에 맞는 보온 코트를 입고 보호자와 걷는 성견 휘펫 삽화",
    },
  ],
  readinessTitle: "휘펫과 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "움직이는 대상을 쫓을 수 있는 반응을 고려해 안전한 리드와 닫힌 공간을 준비할 수 있나요?",
    "매일의 산책과 짧은 질주 기회, 활동 뒤의 충분한 회복을 함께 마련할 수 있나요?",
    "몸을 받쳐줄 푹신한 침구와 추운 날의 보온 준비를 이어갈 수 있나요?",
  ],
  relatedTitle: "휘펫이 마음에 들지만 망설여진다면",
  relatedDescription: "같은 시각하운드 안에서도 체격과 주거 동선, 보온 부담의 차이를 살펴보세요.",
  relatedDifferences: {
    greyhound: "질주와 휴식의 리듬은 비슷하지만 더 큰 성견의 이동과 주거 공간 부담을 함께 살펴야 해요.",
    "italian-sighthound": "빠른 시각 반응과 짧은 피모는 닮았지만 훨씬 작은 체격에 맞춘 충돌·낙상 예방이 더 중요해요.",
  },
});

const pyreneanMountainDogDetail = standardBreedDetailSchema.parse({
  slug: "pyrenean-mountain-dog",
  nameKo: "그레이트 피레니즈",
  metadataDescription: "피레네산맥에서 가축을 지키던 배경과 독립적으로 주변을 살피는 경향, 밤의 알림 환경과 초대형 이동 동선, 풍성한 이중모 관리를 살펴봅니다.",
  heroStatement: "넓은 산지에서 가축 곁을 지키며 스스로 판단하던 초대형 보호견이에요.",
  heroSizeDetails: {
    summary: "체고 65~80cm · 성별 체중 보기",
    items: [
      { id: "female", label: "암컷", value: "체고 65~75cm · 약 39kg" },
      { id: "male", label: "수컷", value: "체고 70~80cm · 약 45kg" },
    ],
  },
  story: {
    title: "그레이트 피레니즈는 왜 주변을 오래 살피고 밤에도 알릴 수 있을까요?",
    description: "산악 가축보호견의 배경을 알면 독립적인 관찰과 가정에서 조율해야 할 알림 행동을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "산악 보호의 배경",
        eyebrow: "1단계 · 어떤 역할에서 출발했을까?",
        title: "피레네산맥에서 가축 무리를 지키던 보호견이에요.",
        body: "그레이트 피레니즈는 산악 목초지에서 가축 곁을 지키고 위험한 접근을 살피는 역할을 했어요. 사람의 즉각적인 지시 없이 주변을 판단해야 했어요.",
        image: "/illustrations/v3/pyrenean-mountain-dog-history.webp",
        imageAlt: "피레네산맥의 목초지에서 양 떼 주변을 지키는 성견 그레이트 피레니즈 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "지시를 기다리기보다 주변을 오래 살필 수 있어요.",
        body: "집과 가족 주변의 소리나 접근을 스스로 확인하려는 모습으로 나타날 수 있어요. 안전한 공간에서 관찰할 시간을 주고 보호자에게 돌아오는 선택을 알려주세요.",
        image: "/illustrations/v4/pyrenean-mountain-dog-feature-independent-watch.webp",
        imageAlt: "안전하게 울타리가 설치된 넓은 정원의 그늘에서 주변을 살피는 성견 그레이트 피레니즈 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "밤의 소리와 움직임을 알릴 이유부터 줄여야 해요.",
        body: "밤에도 창밖 움직임이나 먼 소리를 확인해 알릴 수 있어요. 시야를 가리고 휴식 자리를 창에서 옮긴 뒤 차분히 자기 자리로 돌아오는 순서를 마련해요.",
        image: "/illustrations/v4/pyrenean-mountain-dog-feature-night-alert.webp",
        imageAlt: "밤에 보호자가 암막 커튼을 닫는 동안 창에서 떨어진 큰 매트에서 쉬는 성견 그레이트 피레니즈 삽화",
      },
    ],
    caution: "가축보호견의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 생활 공간과 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "그레이트 피레니즈의 생활 현실",
  realities: [
    {
      id: "giant-scale",
      title: "초대형 성견에 맞춘 이동 동선",
      body: "성견은 안아 옮기기 어려운 크기예요. 현관과 엘리베이터, 차량, 동물병원 출입구를 미리 확인하고 넓고 미끄럽지 않은 경사로와 휴식 공간을 준비해요.",
      image: "/illustrations/v4/pyrenean-mountain-dog-feature-giant-scale.webp",
      imageAlt: "넓고 낮은 미끄럼 방지 경사로를 이용해 큰 차량에 오르는 성견 그레이트 피레니즈 삽화",
    },
    {
      id: "double-coat-care",
      title: "큰 몸 전체의 풍성한 이중모 관리",
      body: "촘촘한 속털과 긴 겉털을 큰 체표 전체에서 나누어 빗어야 해요. 빠진 털과 엉킨 곳을 피부 가까이까지 살피고 젖은 날에는 속까지 충분히 말려주세요.",
      image: "/illustrations/v4/pyrenean-mountain-dog-feature-double-coat-care.webp",
      imageAlt: "서늘한 현관의 큰 미끄럼 방지 매트에서 보호자가 성견 그레이트 피레니즈의 흰 이중모를 빗는 삽화",
    },
  ],
  readinessTitle: "그레이트 피레니즈와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "주변 소리와 접근을 오래 살필 때 시야와 휴식 환경을 조율할 수 있나요?",
    "초대형 성견이 집과 차량, 동물병원을 안전하게 오갈 동선을 준비할 수 있나요?",
    "큰 몸의 이중모를 나누어 빗고 젖은 속털까지 충분히 말릴 수 있나요?",
  ],
  relatedTitle: "그레이트 피레니즈가 마음에 들지만 망설여진다면",
  relatedDescription: "큰 장모견 안에서도 과거 역할과 사람과 협력하는 방식이 다른 견종을 살펴보세요.",
  relatedDifferences: {
    samoyed: "풍성한 밝은 이중모는 닮았지만 북방에서 사람과 이동하며 협업한 배경과 더위 관리가 달라요.",
    "bernese-mountain-dog": "큰 산악견 체형은 비슷하지만 농장 일을 사람 곁에서 보조한 배경과 삼색 장모 관리가 달라요.",
  },
});

const basenjiDetail = standardBreedDetailSchema.parse({
  slug: "basenji",
  nameKo: "바센지",
  metadataDescription: "중앙아프리카에서 시각과 후각으로 사냥을 돕던 배경, 움직임을 추적하는 경향과 독특한 소리 표현, 선택형 탐색과 추운 날의 보온을 살펴봅니다.",
  heroStatement: "시각과 후각을 함께 쓰며 사냥을 돕던 중앙아프리카의 원시견형 사냥견이에요.",
  story: {
    title: "바센지는 왜 주변을 스스로 탐색하고 독특한 소리로 표현할까요?",
    description: "중앙아프리카 사냥견의 배경을 알면 시각·후각 탐색과 일반적인 짖음과 다른 발성을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "사냥의 배경",
        eyebrow: "1단계 · 어떤 역할에서 출발했을까?",
        title: "중앙아프리카에서 시각과 후각으로 사냥을 도왔어요.",
        body: "바센지는 중앙아프리카에서 시각과 후각을 함께 사용해 사냥감을 찾고 사람의 사냥을 돕던 견종이에요. 영국에서는 콩고 지역에서 온 개들을 바탕으로 정립됐어요.",
        image: "/illustrations/v3/basenji-history.webp",
        imageAlt: "중앙아프리카의 숲 가장자리에서 사냥꾼과 함께 길을 찾는 적백색 성견 바센지 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "냄새를 맡는 동안에도 먼 움직임을 함께 살필 수 있어요.",
        body: "산책 중 냄새를 확인하다가 빠르게 움직이는 대상에 시선이 고정될 수 있어요. 몸에 맞는 하네스와 리드를 유지하고 충분한 거리에서 돌아보는 선택을 알려주세요.",
        image: "/illustrations/v4/basenji-feature-tracking-safety.webp",
        imageAlt: "공원에서 냄새를 맡다가 멀리 지나가는 자전거를 바라보며 보호자의 리드 안에 머무는 적백색 성견 바센지 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "일반적인 짖음이 적어도 여러 소리로 표현할 수 있어요.",
        body: "바센지는 요들처럼 들리는 독특한 소리를 비롯해 여러 방식으로 감정과 요구를 표현할 수 있어요. 소리가 나는 상황을 살피고 차분한 휴식으로 전환해주세요.",
        image: "/illustrations/v4/basenji-feature-vocal-expression.webp",
        imageAlt: "거실에서 입을 열어 독특한 소리를 내고 보호자가 차분히 관찰하는 적백색 성견 바센지 삽화",
      },
    ],
    caution: "사냥견의 과거 배경과 독특한 발성은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 생활 조건과 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "바센지의 생활 현실",
  realities: [
    {
      id: "choice-search",
      title: "스스로 방법을 고르는 짧은 탐색",
      body: "같은 동작을 오래 반복하기보다 여러 상자에서 냄새를 찾아보는 짧은 과제를 마련해요. 보호자는 정답을 재촉하지 않고 시도하고 돌아오는 선택을 보상해요.",
      image: "/illustrations/v4/basenji-feature-choice-search.webp",
      imageAlt: "거실에서 세 개의 열린 상자 중 하나의 냄새를 탐색하고 보호자가 거리를 두고 지켜보는 적백색 성견 바센지 삽화",
    },
    {
      id: "cold-weather",
      title: "짧고 고운 피모에 맞춘 추위 관리",
      body: "짧은 피모는 찬 바람을 막아주는 층이 두껍지 않아요. 기온과 개별 반응에 맞는 옷을 사용하고 산책 뒤에는 외풍이 적은 따뜻한 자리에서 쉬게 해주세요.",
      image: "/illustrations/v4/basenji-feature-cold-weather.webp",
      imageAlt: "추운 날 얇은 보온복을 입고 현관 안쪽의 따뜻한 침구로 들어오는 적백색 성견 바센지 삽화",
    },
  ],
  readinessTitle: "바센지와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "빠른 움직임을 추적할 수 있는 반응을 고려해 하네스와 출입 동선을 점검할 수 있나요?",
    "일반적인 짖음과 다른 소리도 생활 속 표현으로 관찰하고 조율할 수 있나요?",
    "선택형 탐색 활동과 추운 날의 보온·따뜻한 휴식을 함께 마련할 수 있나요?",
  ],
  relatedTitle: "바센지가 마음에 들지만 망설여진다면",
  relatedDescription: "사냥 배경을 공유해도 탐색 감각과 관계 방식, 활동 리듬이 다른 견종을 살펴보세요.",
  relatedDifferences: {
    "korea-jindo-dog": "서로 다른 지역의 사냥견으로 독립적인 선택은 닮았지만 관계 형성과 외부 자극을 조율하는 맥락이 달라요.",
    whippet: "빠른 움직임을 추적하는 점은 닮았지만 시각·후각 사용과 질주 뒤 실내 휴식의 리듬이 달라요.",
  },
});

const berneseMountainDogDetail = standardBreedDetailSchema.parse({
  slug: "bernese-mountain-dog",
  nameKo: "버니즈 마운틴 독",
  metadataDescription: "스위스 베른 지역 농장에서 가축 몰이와 수레 끌기, 경비를 돕던 배경과 사람 곁의 협업, 큰 힘의 조절, 삼색 장모와 이동 동선을 살펴봅니다.",
  heroStatement: "스위스 농장에서 사람 곁의 여러 일을 보조하던 크고 튼튼한 작업견이에요.",
  story: {
    title: "버니즈 마운틴 독은 왜 사람 곁에서 함께 움직이고 힘을 조절해야 할까요?",
    description: "농장 작업견의 배경을 알면 사람과 보조를 맞추는 경향과 큰 몸의 힘을 차분히 다루는 생활 준비를 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "농장 일의 배경",
        eyebrow: "1단계 · 어떤 역할에서 출발했을까?",
        title: "스위스 베른 지역 농장에서 여러 일을 도왔어요.",
        body: "버니즈 마운틴 독은 베른 주변과 스위스 알프스 산기슭 농장에서 가축을 몰고 수레를 끌며 농장을 지키는 데 쓰였어요. 튼튼한 몸과 사람 곁의 협업이 중요했어요.",
        image: "/illustrations/v3/bernese-mountain-dog-history.webp",
        imageAlt: "스위스 베른 지역의 농장에서 사람 곁의 일을 돕는 성견 버니즈 마운틴 독 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "가족 가까이에서 함께하는 과제에 참여할 수 있어요.",
        body: "사람 곁에서 여러 일을 보조하던 배경은 가족의 움직임을 따라가거나 함께하는 과제에 참여하는 모습으로 나타날 수 있어요. 속도보다 차분한 협업에 집중해요.",
        image: "/illustrations/v4/bernese-mountain-dog-feature-shared-task.webp",
        imageAlt: "현대의 정원에서 보호자 곁을 걸으며 가벼운 천 바구니를 옮기는 성견 버니즈 마운틴 독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "큰 몸의 힘을 천천히 멈추고 돌리는 연습이 필요해요.",
        body: "차분해 보이는 개체도 성견의 무게와 힘만으로 좁은 동선이나 인사 상황에 부담을 줄 수 있어요. 넓은 회전 공간에서 천천히 멈추고 방향을 바꾸는 경험을 마련해요.",
        image: "/illustrations/v4/bernese-mountain-dog-feature-controlled-strength.webp",
        imageAlt: "넓은 마당의 두 표식 사이를 지난 뒤 보호자 곁에서 차분히 멈춘 성견 버니즈 마운틴 독 삽화",
      },
    ],
    caution: "농장 작업견의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "버니즈 마운틴 독의 생활 현실",
  realities: [
    {
      id: "tricolor-coat-care",
      title: "큰 몸 전체의 장모 삼색 피모 관리",
      body: "길고 풍성한 이중모는 큰 체표 전체를 나누어 빗고 젖은 속까지 말리는 데 시간이 필요해요. 엉킴과 습기를 피부 가까이까지 확인해요.",
      image: "/illustrations/v4/bernese-mountain-dog-feature-tricolor-coat-care.webp",
      imageAlt: "서늘한 현관의 미끄럼 방지 매트에서 보호자가 성견 버니즈 마운틴 독의 장모 삼색 피모를 수건으로 말리는 삽화",
    },
    {
      id: "vehicle-access",
      title: "안아 옮길 수 없는 큰 몸의 이동 계획",
      body: "성견을 사람이 들어 올리는 방식에 기대기 어려워요. 차량과 동물병원 출입을 고려해 넓고 낮은 미끄럼 방지 경사로를 익히고 몸을 누일 공간을 확보해요.",
      image: "/illustrations/v4/bernese-mountain-dog-feature-vehicle-access.webp",
      imageAlt: "넓은 미끄럼 방지 경사로를 천천히 이용해 큰 차량에 오르는 성견 버니즈 마운틴 독 삽화",
    },
  ],
  readinessTitle: "버니즈 마운틴 독과 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "큰 몸과 힘을 고려해 넓은 동선에서 멈추고 방향을 바꾸는 연습을 이어갈 수 있나요?",
    "장모 이중모를 큰 체표 전체에서 나누어 빗고 속까지 충분히 말릴 수 있나요?",
    "성견이 차량과 동물병원을 안전하게 오갈 경사로와 이동 공간을 준비할 수 있나요?",
  ],
  relatedTitle: "버니즈 마운틴 독이 마음에 들지만 망설여진다면",
  relatedDescription: "큰 작업견 안에서도 사람과 협력하는 방식과 경계, 피모 관리가 다른 견종을 살펴보세요.",
  relatedDifferences: {
    "pyrenean-mountain-dog": "큰 산악견 체형은 비슷하지만 가축 곁에서 독립적으로 경계한 배경과 흰 이중모 관리가 달라요.",
    "labrador-retriever": "사람과 함께하는 과제를 즐길 수 있지만 회수견의 활동 리듬과 짧은 피모 관리가 달라요.",
  },
});

const shetlandSheepdogDetail = standardBreedDetailSchema.parse({
  slug: "shetland-sheepdog",
  nameKo: "셔틀랜드 시프독",
  metadataDescription: "셰틀랜드 제도의 작은 농가 동물을 살피던 배경과 움직임·소리에 대한 빠른 반응, 짧은 협업 과제와 긴 이중모 관리를 살펴봅니다.",
  heroStatement: "섬의 농가에서 작은 가축과 주변 변화를 세밀하게 살피던 목양견이에요.",
  story: {
    title: "셔틀랜드 시프독은 왜 움직임과 작은 소리를 빠르게 알아차릴 수 있을까요?",
    description: "섬 지역 목양견의 배경을 알면 움직임을 읽는 집중과 가정에서 조율할 알림 반응을 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "섬 목양의 배경",
        eyebrow: "1단계 · 어떤 역할에서 출발했을까?",
        title: "셰틀랜드 제도의 작은 농가 동물을 살피던 목양견이에요.",
        body: "셔틀랜드 시프독은 스코틀랜드 북쪽 섬 농가에서 양과 다른 작은 가축의 움직임을 관리하고 주변 변화를 알리는 일을 했어요. 작고 민첩한 몸으로 사람의 신호를 읽는 능력이 중요했어요.",
        image: "/illustrations/v3/shetland-sheepdog-history.webp",
        imageAlt: "셰틀랜드 제도의 바람 센 농가에서 양 떼의 움직임을 살피는 세이블 앤 화이트 성견 셔틀랜드 시프독 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "달리는 대상의 경로를 읽고 빠르게 집중할 수 있어요.",
        body: "가축의 방향을 살피던 배경은 자전거와 달리는 사람, 다른 동물의 움직임에 주의를 기울이는 모습으로 나타날 수 있어요. 충분한 거리를 두고 움직임을 본 뒤 보호자를 확인하는 선택을 알려주세요.",
        image: "/illustrations/v4/shetland-sheepdog-feature-alert-reorientation.webp",
        imageAlt: "공원에서 멀리 지나가는 자전거를 확인한 뒤 보호자의 손 신호를 바라보는 세이블 앤 화이트 성견 셔틀랜드 시프독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "작은 소리를 알아차린 뒤 다시 쉬는 흐름이 필요해요.",
        body: "현관 소리나 가족의 작은 움직임에도 빠르게 반응해 목소리로 알릴 수 있어요. 조용한 휴식 자리를 마련하고 소리를 확인한 뒤 짧은 신호에 집중해 다시 쉬는 순서를 연습해요.",
        image: "/illustrations/v4/shetland-sheepdog-feature-sound-cue.webp",
        imageAlt: "조용한 현관에서 복도 소리를 확인한 뒤 보호자의 손 신호를 바라보는 세이블 앤 화이트 성견 셔틀랜드 시프독 삽화",
      },
    ],
    caution: "목양견의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 움직임과 소리에 대한 반응은 성장 환경과 경험, 생활 조건과 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "셔틀랜드 시프독의 생활 현실",
  realities: [
    {
      id: "scent-choice",
      title: "짧게 선택하고 끝내는 협업 과제",
      body: "여러 냄새 상자 중 하나를 고르는 짧은 과제로 몸과 머리를 함께 써요. 정답을 재촉하기보다 스스로 확인하고 보호자에게 돌아온 뒤 편안히 쉬는 흐름까지 한 세트로 구성해요.",
      image: "/illustrations/v4/shetland-sheepdog-feature-scent-choice.webp",
      imageAlt: "거실의 세 냄새 상자 중 하나를 코로 확인하고 보호자가 조용히 지켜보는 세이블 앤 화이트 성견 셔틀랜드 시프독 삽화",
    },
    {
      id: "long-coat-care",
      title: "귀 뒤와 겨드랑이를 나누어 보는 긴 이중모 관리",
      body: "긴 겉털 아래에는 부드럽고 촘촘한 속털이 있어요. 마찰이 잦은 귀 뒤와 겨드랑이, 다리 장식털을 작은 구역으로 나누어 빗고 피부 가까이의 엉킴을 확인해요.",
      image: "/illustrations/v4/shetland-sheepdog-feature-long-coat-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 세이블 앤 화이트 성견 셔틀랜드 시프독의 귀 뒤와 긴 장식털을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "셔틀랜드 시프독과 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "자전거와 달리는 사람을 향한 집중을 안전거리와 보호자 확인으로 전환할 수 있나요?",
    "작은 소리에 반응한 뒤 조용한 자리로 돌아와 쉬는 순서를 꾸준히 연습할 수 있나요?",
    "짧은 협업 과제와 귀 뒤·겨드랑이를 포함한 긴 이중모 관리를 함께 이어갈 수 있나요?",
  ],
  relatedTitle: "셔틀랜드 시프독이 마음에 들지만 망설여진다면",
  relatedDescription: "목양견 안에서도 체격과 움직임 집중, 활동 뒤 회복과 피모 관리가 다른 견종을 살펴보세요.",
  relatedDifferences: {
    "border-collie": "가축의 움직임을 읽는 배경은 닮았지만 체격과 작업 집중의 강도, 긴 피모를 관리하는 생활 리듬이 달라요.",
    "australian-shepherd": "사람과 협력하는 목양견이지만 더 큰 체격과 지속적인 과제 요구, 피모와 활동 규모를 따로 비교해야 해요.",
  },
});

const australianShepherdDetail = standardBreedDetailSchema.parse({
  slug: "australian-shepherd",
  nameKo: "오스트레일리안 셰퍼드",
  metadataDescription: "미국 서부 목장에서 가축을 움직이던 배경과 달리는 대상을 읽는 경향, 사람과 주고받는 과제, 활동 뒤 휴식과 이중모 관리를 살펴봅니다.",
  heroStatement: "미국 서부 목장에서 가축의 흐름과 사람의 신호를 함께 읽던 활동적인 목양견이에요.",
  story: {
    title: "오스트레일리안 셰퍼드는 왜 움직임을 읽고 계속할 과제를 찾을까요?",
    description: "미국 목장견의 배경을 알면 달리는 대상에 집중하는 모습과 사람과 협력한 뒤 쉬는 전환까지 함께 이해할 수 있어요.",
    steps: [
      {
        navLabel: "목장 일의 배경",
        eyebrow: "1단계 · 어떤 역할에서 출발했을까?",
        title: "미국에서 여러 가축을 움직이는 목장견으로 정립됐어요.",
        body: "이름과 달리 오늘날의 오스트레일리안 셰퍼드는 미국에서 정립됐어요. 넓은 목장에서 여러 가축의 흐름을 읽고 사람의 신호에 맞춰 방향을 바꾸는 일을 했어요.",
        image: "/illustrations/v3/australian-shepherd-history.webp",
        imageAlt: "미국 서부의 넓은 목장에서 양 떼와 목장주의 움직임을 살피는 긴 꼬리의 블루멀 성견 오스트레일리안 셰퍼드 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "달리는 대상의 방향을 읽고 앞을 막으려 할 수 있어요.",
        body: "아이와 자전거, 다른 동물처럼 빠르게 움직이는 대상에 집중하거나 경로를 따라가려 할 수 있어요. 넉넉한 거리를 두고 보호자를 확인한 뒤 다른 길로 전환하는 경험을 마련해요.",
        image: "/illustrations/v4/australian-shepherd-feature-movement-focus.webp",
        imageAlt: "공원에서 멀리 지나가는 자전거를 확인한 뒤 보호자의 손 신호를 바라보는 긴 꼬리의 블루멀 성견 오스트레일리안 셰퍼드 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "활동을 마친 뒤 편안히 쉬는 전환까지 필요해요.",
        body: "몸과 머리를 함께 쓰는 활동에 깊이 몰입한 뒤에도 다음 일을 기다릴 수 있어요. 끝 신호 뒤 자기 자리에서 호흡을 낮추고 쉬는 시간까지 한 흐름으로 구성해요.",
        image: "/illustrations/v4/australian-shepherd-feature-work-to-rest.webp",
        imageAlt: "방향 과제를 마친 뒤 현관 매트에 누워 쉬고 보호자가 낮은 표식을 정리하는 긴 꼬리의 블루멀 성견 오스트레일리안 셰퍼드 삽화",
      },
    ],
    caution: "목양견의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 움직임과 과제에 대한 반응은 성장 환경과 경험, 생활 조건과 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "오스트레일리안 셰퍼드의 생활 현실",
  realities: [
    {
      id: "cooperative-task",
      title: "사람과 계속 주고받는 짧은 과제",
      body: "목적 없이 오래 달리기보다 찾기와 구분하기, 멈추기를 짧게 연결해요. 과제의 난도와 시간을 조절하고 마친 뒤에는 흥분이 낮아지는지 함께 살펴요.",
      image: "/illustrations/v4/australian-shepherd-feature-cooperative-task.webp",
      imageAlt: "공원의 낮은 표식 사이에서 보호자의 손 신호를 확인하는 긴 꼬리의 블루멀 성견 오스트레일리안 셰퍼드 삽화",
    },
    {
      id: "double-coat-care",
      title: "장식털 안쪽까지 나누어 보는 이중모 관리",
      body: "중간 길이 겉털 아래의 속털과 가슴·다리 장식털을 작은 구역으로 나누어 빗어요. 털갈이 시기에는 피부 가까이의 엉킴과 빠진 속털을 더 자주 확인해요.",
      image: "/illustrations/v4/australian-shepherd-feature-double-coat-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 긴 꼬리의 블루멀 성견 오스트레일리안 셰퍼드의 가슴 장식털을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "오스트레일리안 셰퍼드와 보낼 일상을 생각해보세요.",
  readinessQuestions: [
    "달리는 대상에 집중할 때 안전거리를 두고 보호자 확인으로 전환할 수 있나요?",
    "찾기·구분하기·멈추기를 연결한 짧은 과제와 활동 뒤 휴식을 매일 마련할 수 있나요?",
    "중간 길이 이중모와 가슴·다리 장식털을 작은 구역으로 나누어 관리할 수 있나요?",
  ],
  relatedTitle: "오스트레일리안 셰퍼드가 마음에 들지만 망설여진다면",
  relatedDescription: "목양견 안에서도 움직임에 집중하는 방식과 체격, 과제와 피모 관리의 규모가 다른 견종을 살펴보세요.",
  relatedDifferences: {
    "border-collie": "가축의 움직임을 읽고 사람과 협력하는 배경은 닮았지만 응시 방식과 작업 리듬, 실제 개체의 회복 속도를 따로 살펴야 해요.",
    "shetland-sheepdog": "움직임과 사람의 신호에 빠르게 반응하는 점은 닮았지만 더 작은 체격과 소리 알림, 긴 피모 관리의 규모가 달라요.",
  },
});

const standardBreedDetails = new Map(
  [
    japaneseSpitzDetail,
    malteseDetail,
    bichonFriseDetail,
    greyhoundDetail,
    whippetDetail,
    pyreneanMountainDogDetail,
    basenjiDetail,
    berneseMountainDogDetail,
    shetlandSheepdogDetail,
    australianShepherdDetail,
    ...familiarStandardBreedDetails,
  ].map((detail) => [detail.slug, detail]),
);

export function getStandardBreedDetail(slug: string) {
  return standardBreedDetails.get(slug);
}

export function getAllStandardBreedDetails() {
  return [...standardBreedDetails.values()];
}

export {
  australianShepherdDetail,
  basenjiDetail,
  berneseMountainDogDetail,
  bichonFriseDetail,
  greyhoundDetail,
  japaneseSpitzDetail,
  malteseDetail,
  pyreneanMountainDogDetail,
  shetlandSheepdogDetail,
  whippetDetail,
};
