import { standardBreedDetailSchema } from "./schema";

type Scene = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

type Reality = Scene & { id: string };

type ExpansionDetailInput = {
  slug: string;
  nameKo: string;
  metadataDescription: string;
  heroStatement: string;
  storyTitle: string;
  past: Scene;
  current: Scene;
  life: Scene;
  realitiesTitle: string;
  realities: [Reality, Reality];
  readinessTitle: string;
  readinessQuestions: [string, string, string];
  relatedTitle: string;
  relatedDescription: string;
  relatedDifferences: Record<string, string>;
};

const tendencyCaution =
  "견종의 과거 역할은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 실제 모습은 달라질 수 있어요.";

function createExpansionDetail(input: ExpansionDetailInput) {
  return standardBreedDetailSchema.parse({
    slug: input.slug,
    nameKo: input.nameKo,
    metadataDescription: input.metadataDescription,
    heroStatement: input.heroStatement,
    story: {
      title: input.storyTitle,
      description: "과거의 역할부터 지금 함께 살 때 체감하는 장면까지 한 흐름으로 살펴보세요.",
      steps: [
        {
          navLabel: "과거의 역할",
          eyebrow: "1단계 · 무엇을 하던 개일까?",
          ...input.past,
        },
        {
          navLabel: "현재의 경향",
          eyebrow: "2단계 · 그 목적은 지금 어떻게 나타날까?",
          ...input.current,
        },
        {
          navLabel: "생활의 현실",
          eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
          ...input.life,
        },
      ],
      caution: tendencyCaution,
    },
    realitiesTitle: input.realitiesTitle,
    realities: input.realities,
    readinessTitle: input.readinessTitle,
    readinessQuestions: input.readinessQuestions,
    relatedTitle: input.relatedTitle,
    relatedDescription: input.relatedDescription,
    relatedDifferences: input.relatedDifferences,
  });
}

export const belgianMalinoisDetail = createExpansionDetail({
  slug: "belgian-malinois",
  nameKo: "말리노이즈",
  metadataDescription: "벨기에 농장에서 양 떼를 모으고 주변을 지키던 단모 목양견 말리노이즈의 빠른 방향 전환, 활동 뒤 휴식, 움직이는 자극과 전신 관리까지 살펴봅니다.",
  heroStatement: "양 떼를 모으고 농장 경계를 살피며 빠르게 방향을 바꾸던 단모 목양견이에요.",
  storyTitle: "말리노이즈는 왜 움직임과 사람의 신호에 빠르게 반응할까요?",
  past: {
    title: "양 떼를 모으고 농장 주변을 지켰어요.",
    body: "벨지안 셰퍼드는 가축을 모으고 지키며 사람과 여러 작업을 맞추던 목양견이에요.",
    image: "/illustrations/v3/belgian-malinois-history.webp",
    imageAlt: "벨기에 농장에서 양 떼의 이동을 돕는 황갈색 단모 말리노이즈 삽화",
  },
  current: {
    title: "짧고 정확한 방향 전환에 깊게 참여할 수 있어요.",
    body: "사람의 몸짓과 이동을 빠르게 읽고 이어질 활동을 기다리는 경향으로 나타날 수 있어요.",
    image: "/illustrations/v4/belgian-malinois-feature-direction-markers.webp",
    imageAlt: "들판 표지 사이에서 보호자의 방향 신호를 따라 움직이는 말리노이즈 삽화",
  },
  life: {
    title: "운동량만 늘리면 오히려 쉴 줄 모를 수 있어요.",
    body: "짧은 탐색과 학습 뒤 도구를 치우고 매트에서 쉬는 종료 순서를 함께 가르쳐야 해요.",
    image: "/illustrations/v4/belgian-malinois-feature-task-to-rest.webp",
    imageAlt: "보호자가 작업 도구를 정리하는 동안 매트에서 쉬는 말리노이즈 삽화",
  },
  realitiesTitle: "빠른 반응을 일상에서 어떻게 다뤄야 할까요?",
  realities: [
    {
      id: "moving-stimulus-distance",
      title: "움직이는 자극과 거리를 먼저 벌려야 해요.",
      body: "자전거나 달리는 사람을 발견하면 가까이 버티게 하기보다 반응 전 돌아설 여유를 만들어 주세요.",
      image: "/illustrations/v4/belgian-malinois-feature-bicycle-distance.webp",
      imageAlt: "멀리 지나가는 자전거 대신 보호자에게 몸을 돌리는 말리노이즈 삽화",
    },
    {
      id: "short-coat-body-check",
      title: "짧은 털도 활동 뒤 전신 확인이 필요해요.",
      body: "빠르게 달린 날에는 발바닥과 발가락 사이, 피부와 귀를 차분히 확인하는 습관이 필요해요.",
      image: "/illustrations/v4/belgian-malinois-feature-body-check.webp",
      imageAlt: "활동 뒤 서 있는 말리노이즈의 발과 짧은 털을 확인하는 보호자 삽화",
    },
  ],
  readinessTitle: "말리노이즈와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 운동뿐 아니라 냄새 탐색과 짧은 학습, 충분한 회복까지 구성할 수 있나요?",
    "자전거와 달리는 사람을 만났을 때 거리를 벌리고 돌아서는 연습을 할 수 있나요?",
    "빠른 반응과 큰 힘을 벌이 아닌 보상 기반 교육으로 다룰 준비가 되어 있나요?",
  ],
  relatedTitle: "같은 작업견이라도 생활 리듬은 달라요.",
  relatedDescription: "벨지안 셰퍼드의 다른 피모 변종과 비슷한 작업견 사이에서 관리 부담을 비교해 보세요.",
  relatedDifferences: {
    "belgian-tervueren": "같은 벨지안 셰퍼드 계통이지만 긴 털과 풍성한 목털이 더해져 일상 피모 관리가 달라져요.",
    "dutch-shepherd-dog": "빠른 협업과 높은 작업 욕구는 닮았지만 품종 배경과 피모 유형을 따로 살펴봐야 해요.",
  },
});

export const belgianTervuerenDetail = createExpansionDetail({
  slug: "belgian-tervueren",
  nameKo: "테르뷰런",
  metadataDescription: "벨기에의 황갈색 장모 목양견 테르뷰런이 양 떼와 농장 주변에서 맡았던 역할부터 빠른 협업, 방문객 거리와 긴 털 관리까지 살펴봅니다.",
  heroStatement: "양 떼를 모으고 농장을 살피던 황갈색 장모 벨지안 셰퍼드예요.",
  storyTitle: "테르뷰런의 긴 털 안에는 왜 빠른 작업 리듬이 있을까요?",
  past: {
    title: "양 떼의 방향을 바꾸고 농장 주변을 살폈어요.",
    body: "테르뷰런은 벨지안 셰퍼드의 장모 변종으로 사람과 호흡을 맞추며 가축을 다뤘어요.",
    image: "/illustrations/v3/belgian-tervueren-history.webp",
    imageAlt: "벨기에 목초지에서 양 떼의 방향을 돕는 황갈색 장모 테르뷰런 삽화",
  },
  current: {
    title: "긴 털 아래에도 빠른 방향 전환과 집중이 있어요.",
    body: "차분해 보이는 외모와 별개로 사람의 움직임을 읽고 과제에 빠르게 참여할 수 있어요.",
    image: "/illustrations/v4/belgian-tervueren-feature-pasture-direction.webp",
    imageAlt: "목초지 표지 사이에서 보호자의 방향 신호를 따르는 테르뷰런 삽화",
  },
  life: {
    title: "활동이 끝났다는 순서까지 배워야 편히 쉬어요.",
    body: "긴 산책만 반복하기보다 짧은 학습 뒤 리드줄을 치우고 쉬는 흐름을 매일 만들어 주세요.",
    image: "/illustrations/v4/belgian-tervueren-feature-line-to-rest.webp",
    imageAlt: "보호자가 리드줄을 정리하는 동안 매트에서 쉬는 장모 테르뷰런 삽화",
  },
  realitiesTitle: "빠른 경계와 긴 털을 함께 관리하려면",
  realities: [
    {
      id: "door-buffer",
      title: "현관에서는 먼저 물리적 여유를 만들어 주세요.",
      body: "방문객이 들어온 뒤 붙잡으려 하지 말고 안전문 너머에서 보고 냄새 맡을 시간을 주세요.",
      image: "/illustrations/v4/belgian-tervueren-feature-door-buffer.webp",
      imageAlt: "방문객과 거리를 둔 안전문 안쪽에서 보호자를 바라보는 테르뷰런 삽화",
    },
    {
      id: "long-coat-care",
      title: "목둘레와 꼬리 털을 구역별로 나누어 빗어야 해요.",
      body: "풍성한 장모는 겉만 훑으면 안쪽 엉킴을 놓치기 쉬워 피부까지 나누어 확인해야 해요.",
      image: "/illustrations/v4/belgian-tervueren-feature-long-coat-care.webp",
      imageAlt: "보호자가 테르뷰런의 목둘레와 긴 꼬리 털을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "테르뷰런과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 움직임과 냄새 과제 뒤 조용히 쉬는 종료 루틴까지 제공할 수 있나요?",
    "방문객과 낯선 자극을 안전문과 충분한 거리로 소개할 수 있나요?",
    "풍성한 장모를 피부까지 나누어 규칙적으로 빗을 수 있나요?",
  ],
  relatedTitle: "같은 벨지안 셰퍼드도 털과 생활은 달라요.",
  relatedDescription: "같은 계통 안에서 피모 길이와 색이 일상 관리에 만드는 차이를 비교해 보세요.",
  relatedDifferences: {
    "belgian-groenendael": "같은 장모 변종이지만 검은 피모와 황갈색 피모가 보여 주는 오염과 엉킴의 체감이 달라요.",
    "belgian-malinois": "작업 배경은 같지만 단모인 말리노이즈보다 빗질과 건조에 더 많은 시간이 필요해요.",
  },
});

export const komondorDetail = createExpansionDetail({
  slug: "komondor",
  nameKo: "코몬도르",
  metadataDescription: "헝가리 목초지에서 가축 곁을 지키던 코몬도르의 독립적인 경계, 울타리 생활과 이중문, 줄처럼 형성되는 독특한 피모 관리까지 살펴봅니다.",
  heroStatement: "헝가리 목초지에서 가축 곁을 지키던, 줄처럼 형성되는 피모의 수호견이에요.",
  storyTitle: "코몬도르는 왜 양 떼 가까이에서 주변을 오래 살필까요?",
  past: {
    title: "가축 무리 곁에 머물며 위험을 먼저 살폈어요.",
    body: "코몬도르는 헝가리 목초지에서 사람의 계속된 지시 없이 가축을 지키도록 길러진 수호견이에요.",
    image: "/illustrations/v3/komondor-history.webp",
    imageAlt: "헝가리 목초지에서 양 떼 가까이 머물며 주변을 살피는 코몬도르 삽화",
  },
  current: {
    title: "무리를 몰기보다 경계 바깥을 오래 관찰해요.",
    body: "가족과 공간의 경계를 스스로 판단하려는 모습으로 이어질 수 있어 낯선 접근을 서두르면 안 돼요.",
    image: "/illustrations/v4/komondor-feature-flock-perimeter.webp",
    imageAlt: "양 떼 가장자리에서 먼 경계를 바라보는 흰색 코몬도르 삽화",
  },
  life: {
    title: "넓은 마당보다 매일 확인하는 안전 설비가 먼저예요.",
    body: "튼튼한 울타리와 잠금 상태, 물과 그늘을 보호자가 직접 확인하는 일상이 필요해요.",
    image: "/illustrations/v4/komondor-feature-fence-water-check.webp",
    imageAlt: "보호자가 울타리와 물그릇을 확인하는 동안 곁에 서 있는 코몬도르 삽화",
  },
  realitiesTitle: "큰 수호견과 독특한 피모를 위한 준비",
  realities: [
    {
      id: "double-gate",
      title: "방문객보다 먼저 이중문과 분리 공간을 준비하세요.",
      body: "현관에서 즉흥적으로 통제하기보다 두 개의 경계와 익숙한 휴식 공간으로 동선을 나누는 편이 안전해요.",
      image: "/illustrations/v4/komondor-feature-double-gate.webp",
      imageAlt: "이중문 안쪽의 분리 공간에서 보호자와 기다리는 코몬도르 삽화",
    },
    {
      id: "cord-drying",
      title: "빗는 털이 아니라 코드를 나누고 말리는 털이에요.",
      body: "형성되는 피모 다발을 손으로 나누고 젖은 뒤에는 속까지 충분히 말릴 시간과 공간이 필요해요.",
      image: "/illustrations/v4/komondor-feature-cord-drying.webp",
      imageAlt: "보호자가 코몬도르의 피모 다발을 나누고 수건과 바람으로 말리는 삽화",
    },
  ],
  readinessTitle: "코몬도르와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "큰 수호견이 돌아서고 쉴 수 있는 동선과 튼튼한 이중 경계를 마련할 수 있나요?",
    "낯선 사람을 바로 만나게 하지 않고 분리 공간에서 천천히 소개할 수 있나요?",
    "코드를 나누고 목욕 뒤 속까지 완전히 말리는 긴 관리 시간을 감당할 수 있나요?",
  ],
  relatedTitle: "가축 수호견은 닮아 보여도 관리가 달라요.",
  relatedDescription: "독립적인 경계 방식과 체격, 피모 구조가 생활 환경에 만드는 차이를 함께 살펴보세요.",
  relatedDifferences: {
    kuvasz: "헝가리 가축 수호견이라는 배경은 닮았지만 코몬도르의 코드 피모는 전혀 다른 손질과 건조가 필요해요.",
    "pyrenean-mountain-dog": "가축 주변을 지키는 역할은 비슷해도 피모 구조와 형성 지역, 일상 손질 방법이 달라요.",
  },
});

export const boerboelDetail = createExpansionDetail({
  slug: "boerboel",
  nameKo: "보어보엘",
  metadataDescription: "남아프리카의 외딴 농장에서 가족과 재산을 지키던 보어보엘의 경계 성향, 거대한 체격의 실내 동선, 방문객 분리와 활동 뒤 관리까지 살펴봅니다.",
  heroStatement: "남아프리카의 외딴 농장에서 가족과 재산을 지키던 거대한 농장 수호견이에요.",
  storyTitle: "보어보엘은 왜 집과 가족의 경계를 또렷하게 살필까요?",
  past: {
    title: "외딴 농장에서 사람과 가축, 재산을 지켰어요.",
    body: "보어보엘은 남아프리카 농장의 넓은 생활권에서 여러 위험을 경계하던 강건한 농장견이에요.",
    image: "/illustrations/v3/boerboel-history.webp",
    imageAlt: "남아프리카 농장 경계에서 집과 가축 주변을 살피는 보어보엘 삽화",
  },
  current: {
    title: "자기 생활권의 변화를 오래 관찰할 수 있어요.",
    body: "낯선 차량이나 사람이 다가오면 먼저 위치를 잡고 살피려는 경향으로 이어질 수 있어요.",
    image: "/illustrations/v4/boerboel-feature-farm-boundary.webp",
    imageAlt: "보호자 곁에서 농장 입구의 변화를 차분히 바라보는 보어보엘 삽화",
  },
  life: {
    title: "거대한 몸이 편히 지나는 실내 동선부터 필요해요.",
    body: "미끄럽지 않은 바닥과 넓은 회전 공간을 마련하고 좁은 문에서는 보호자와 천천히 움직여야 해요.",
    image: "/illustrations/v4/boerboel-feature-wide-doorway.webp",
    imageAlt: "넓은 출입문과 미끄럼 방지 바닥을 보호자와 천천히 지나는 보어보엘 삽화",
  },
  realitiesTitle: "큰 힘과 영역 경계를 안전하게 다루려면",
  realities: [
    {
      id: "visitor-buffer",
      title: "방문객을 현관에서 바로 마주치게 하지 마세요.",
      body: "문을 열기 전에 보어보엘을 익숙한 분리 공간으로 안내하고 방문객과의 거리를 단계적으로 줄여야 해요.",
      image: "/illustrations/v4/boerboel-feature-visitor-buffer.webp",
      imageAlt: "안전문 안쪽에서 보호자와 방문객을 멀리 바라보는 보어보엘 삽화",
    },
    {
      id: "heat-paw-check",
      title: "더운 날에는 발과 짧은 털 아래 피부도 확인하세요.",
      body: "활동 시간을 서늘한 때로 옮기고 돌아온 뒤 발바닥과 피부 주름, 짧은 피모를 살펴야 해요.",
      image: "/illustrations/v4/boerboel-feature-paw-coat-check.webp",
      imageAlt: "그늘에서 보호자가 보어보엘의 발과 짧은 털 아래 피부를 확인하는 삽화",
    },
  ],
  readinessTitle: "보어보엘과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "거대한 몸이 미끄러지지 않고 방향을 바꿀 수 있는 집과 차량 동선을 만들 수 있나요?",
    "방문객이 오기 전에 안전문과 별도 휴식 공간으로 먼저 분리할 수 있나요?",
    "큰 힘을 억누르기보다 보상 기반 교육과 일관된 생활 규칙으로 다룰 수 있나요?",
  ],
  relatedTitle: "대형 수호견도 원래 일과 체감은 달라요.",
  relatedDescription: "체격만 보지 말고 형성 지역과 경계 방식, 방문객 관리 조건을 함께 비교해 보세요.",
  relatedDifferences: {
    "cane-corso": "가족과 재산을 지키는 배경은 닮았지만 형성 지역과 체형, 일상에서 드러나는 움직임을 따로 봐야 해요.",
    bullmastiff: "큰 체격의 수호견이라는 공통점이 있어도 원래 역할과 활동 리듬, 피모와 체형 부담은 같지 않아요.",
  },
});

export const presaCanarioDetail = createExpansionDetail({
  slug: "presa-canario",
  nameKo: "프레사 카나리오",
  metadataDescription: "카나리아 제도의 농장에서 소를 다루고 재산을 지키던 프레사 카나리오의 강한 체격, 회전 동선, 방문객 거리와 짧은 털 관리까지 살펴봅니다.",
  heroStatement: "카나리아 제도의 농장에서 소를 다루고 재산을 지키던 힘센 농장견이에요.",
  storyTitle: "프레사 카나리오는 왜 가까운 움직임을 묵직하게 통제하려 할까요?",
  past: {
    title: "소의 이동을 돕고 농장의 재산을 지켰어요.",
    body: "카나리아 제도의 농장에서 가축을 다루고 생활권을 경계하는 힘 있는 작업견으로 발달했어요.",
    image: "/illustrations/v3/presa-canario-history.webp",
    imageAlt: "카나리아 제도 농장에서 소의 이동을 돕는 얼룩무늬 프레사 카나리오 삽화",
  },
  current: {
    title: "좁은 통로의 움직임을 몸으로 읽을 수 있어요.",
    body: "사람과 동물이 가까이 움직일 때 위치를 잡고 지켜보려는 경향이 나타날 수 있어요.",
    image: "/illustrations/v4/presa-canario-feature-cattle-lane.webp",
    imageAlt: "보호자의 신호를 보며 넓은 가축 통로 옆을 걷는 프레사 카나리오 삽화",
  },
  life: {
    title: "큰 몸이 돌아설 여유를 생활 공간에 남겨야 해요.",
    body: "현관과 복도, 차량 주변에서 급히 당기지 않고 넓게 회전하는 동선을 반복해 익혀야 해요.",
    image: "/illustrations/v4/presa-canario-feature-wide-turn.webp",
    imageAlt: "보호자와 넓은 곡선을 그리며 출입 공간을 지나는 프레사 카나리오 삽화",
  },
  realitiesTitle: "힘 있는 농장견과 살 때 먼저 준비할 것",
  realities: [
    {
      id: "visitor-buffer",
      title: "첫 만남은 문 앞이 아니라 거리 있는 공간에서 시작하세요.",
      body: "방문객과 바로 맞닥뜨리지 않도록 안전문을 두고 보호자에게 다시 시선을 돌릴 여유를 주세요.",
      image: "/illustrations/v4/presa-canario-feature-visitor-buffer.webp",
      imageAlt: "방문객과 안전문을 사이에 두고 보호자를 바라보는 프레사 카나리오 삽화",
    },
    {
      id: "warm-weather-check",
      title: "따뜻한 날의 활동 뒤 발과 피부를 확인하세요.",
      body: "서늘한 시간에 움직이고 돌아온 뒤 발바닥과 발가락 사이, 짧은 털 아래 피부 상태를 살펴야 해요.",
      image: "/illustrations/v4/presa-canario-feature-paw-coat-care.webp",
      imageAlt: "그늘진 마당에서 보호자가 프레사 카나리오의 발과 피모를 확인하는 삽화",
    },
  ],
  readinessTitle: "프레사 카나리오와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "큰 체격이 안전하게 회전하고 쉴 수 있는 미끄럽지 않은 동선을 마련할 수 있나요?",
    "방문객과 다른 동물을 물리적 경계와 충분한 거리로 소개할 수 있나요?",
    "힘으로 제압하지 않고 보상 기반 교육과 예측 가능한 규칙을 이어갈 수 있나요?",
  ],
  relatedTitle: "힘센 수호견도 작업 배경을 따로 보세요.",
  relatedDescription: "농장과 재산을 지킨 배경 안에서도 체형과 지역, 생활 관리의 차이는 분명해요.",
  relatedDifferences: {
    "cane-corso": "재산을 지킨 대형견이라는 점은 닮았지만 이탈리아와 카나리아라는 형성 배경과 체형이 달라요.",
    boerboel: "농장 경계라는 공통점이 있어도 남아프리카와 카나리아의 작업 환경, 체형과 움직임이 달라요.",
  },
});

export const sapsareeDetail = createExpansionDetail({
  slug: "sapsaree",
  nameKo: "삽살개",
  metadataDescription: "한국 사람 곁에서 집과 마을 주변을 함께 살피던 삽살개의 생활 배경, 문 앞 전환과 휴식, 긴 털에 붙는 이물질과 얼굴 피모 관리까지 살펴봅니다.",
  heroStatement: "한국 사람 곁에서 집과 마을 주변을 함께 살피며 살아온 긴 털의 토종견이에요.",
  storyTitle: "삽살개는 왜 사람 곁을 따르면서도 주변 변화를 살필까요?",
  past: {
    title: "사람 곁에서 집과 마을 주변을 살폈어요.",
    body: "삽살개는 한국의 생활 공간에서 사람과 함께 지내며 집 주변을 살피던 토종견으로 전해져요.",
    image: "/illustrations/v3/sapsaree-history.webp",
    imageAlt: "한국 옛 마을길에서 사람 곁을 걸으며 주변을 살피는 긴 털 삽살개 삽화",
  },
  current: {
    title: "익숙한 사람과 걸으며 주변 냄새를 확인해요.",
    body: "보호자 가까이 움직이면서도 길과 사람의 변화를 천천히 살피려는 모습이 나타날 수 있어요.",
    image: "/illustrations/v4/sapsaree-feature-village-walk.webp",
    imageAlt: "보호자와 마을길을 걸으며 주변 냄새를 살피는 삽살개 삽화",
  },
  life: {
    title: "문 앞의 관심을 휴식으로 전환하는 연습이 필요해요.",
    body: "바깥 소리를 확인한 뒤 보호자를 따라 매트로 이동하고 쉬는 순서를 짧게 반복해 주세요.",
    image: "/illustrations/v4/sapsaree-feature-door-to-rest.webp",
    imageAlt: "문 앞을 확인한 뒤 보호자를 따라 실내 매트로 이동하는 삽살개 삽화",
  },
  realitiesTitle: "긴 털 때문에 매일 달라지는 생활 관리",
  realities: [
    {
      id: "debris-removal",
      title: "산책 뒤에는 털 속 씨앗과 잔가지를 먼저 찾아요.",
      body: "긴 털은 작은 이물질을 감추기 쉬워 발과 배, 겨드랑이와 꼬리를 손으로 나누어 확인해야 해요.",
      image: "/illustrations/v4/sapsaree-feature-debris-removal.webp",
      imageAlt: "산책 뒤 보호자가 삽살개의 긴 털에서 잔가지와 씨앗을 제거하는 삽화",
    },
    {
      id: "face-coat-care",
      title: "눈을 덮는 얼굴 털은 매일 상태를 확인하세요.",
      body: "눈 주변을 무작정 짧게 자르기보다 털을 나누어 눈과 피부를 보고 청결과 빗질을 유지해 주세요.",
      image: "/illustrations/v4/sapsaree-feature-face-coat-care.webp",
      imageAlt: "보호자가 삽살개의 얼굴 털을 나누어 눈과 피부 상태를 살피는 삽화",
    },
  ],
  readinessTitle: "삽살개와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기 뒤 긴 털을 손으로 나누어 이물질과 피부를 확인할 수 있나요?",
    "문밖 소리에 반응한 뒤 보호자에게 돌아와 쉬는 순서를 연습할 수 있나요?",
    "얼굴 털과 눈 주변을 서두르지 않고 협조 관리로 돌볼 수 있나요?",
  ],
  relatedTitle: "한국 토종견도 살아온 역할은 서로 달라요.",
  relatedDescription: "같은 지역의 토종견이라는 이름보다 체형과 피모, 사람과 공간을 살핀 방식을 비교해 보세요.",
  relatedDifferences: {
    "korea-jindo-dog": "한국 토종견이라는 공통점이 있지만 진돗개의 스피츠형 단모와 삽살개의 긴 피모는 관리가 크게 달라요.",
    donggyeongi: "오랜 한국 생활 배경은 공유하지만 동경이의 자연 단미 외형과 삽살개의 긴 털은 전혀 다른 관찰 지점을 만들어요.",
  },
});

export const donggyeongiDetail = createExpansionDetail({
  slug: "donggyeongi",
  nameKo: "경주개 동경이",
  metadataDescription: "경주 지역에서 이어져 온 자연적으로 꼬리가 짧거나 없는 토종견 동경이의 마을 생활, 냄새 산책과 안전한 호출, 전신 신호 읽기까지 살펴봅니다.",
  heroStatement: "경주 지역에서 이어져 온, 꼬리가 자연적으로 짧거나 없는 한국 토종견이에요.",
  storyTitle: "경주개 동경이는 왜 꼬리보다 몸 전체를 보고 이해해야 할까요?",
  past: {
    title: "경주 지역의 사람과 생활 공간을 함께했어요.",
    body: "옛 기록과 지역 보존을 통해 경주에서 이어져 온 자연 단미 형태의 한국 토종견이에요.",
    image: "/illustrations/v3/donggyeongi-history.webp",
    imageAlt: "경주의 옛 마을길에서 사람 곁을 걷는 꼬리가 짧은 동경이 삽화",
  },
  current: {
    title: "익숙한 길에서도 냄새를 충분히 확인하려 해요.",
    body: "보호자와 걷다가 냄새를 살핀 뒤 다시 몸을 돌리는 여유 있는 산책이 잘 맞을 수 있어요.",
    image: "/illustrations/v4/donggyeongi-feature-village-sniff.webp",
    imageAlt: "경주 마을길에서 냄새를 맡은 뒤 보호자를 바라보는 동경이 삽화",
  },
  life: {
    title: "짧은 꼬리와 별개로 안전한 호출은 꼭 연습해야 해요.",
    body: "울타리 안에서 긴 줄을 느슨하게 두고 보호자에게 돌아오는 경험을 짧게 쌓아 주세요.",
    image: "/illustrations/v4/donggyeongi-feature-secure-recall.webp",
    imageAlt: "안전한 울타리 안에서 느슨한 긴 줄을 달고 보호자에게 돌아오는 동경이 삽화",
  },
  realitiesTitle: "짧은 꼬리를 오해하지 않고 읽는 방법",
  realities: [
    {
      id: "whole-body-signals",
      title: "기분을 꼬리 하나로만 판단하면 안 돼요.",
      body: "귀와 눈, 입 주변의 긴장, 몸의 방향과 움직임을 함께 봐야 동경이의 의사를 더 정확히 읽을 수 있어요.",
      image: "/illustrations/v4/donggyeongi-feature-whole-body-greeting.webp",
      imageAlt: "보호자와 인사하며 귀와 눈과 몸 전체로 신호를 보이는 동경이 삽화",
    },
    {
      id: "natural-short-tail-check",
      title: "자연적으로 짧은 꼬리는 품종의 외형 특징이에요.",
      body: "다친 꼬리나 임의로 자른 꼬리로 단정하지 말고 허리와 뒷다리, 꼬리 주변 피부를 전신 관리처럼 확인하세요.",
      image: "/illustrations/v4/donggyeongi-feature-body-check.webp",
      imageAlt: "보호자가 서 있는 동경이의 허리와 뒷다리와 짧은 꼬리 주변을 확인하는 삽화",
    },
  ],
  readinessTitle: "경주개 동경이와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "꼬리 모양만으로 감정을 단정하지 않고 귀와 얼굴과 몸 전체를 관찰할 수 있나요?",
    "안전한 울타리와 긴 줄을 이용해 돌아오는 연습을 차분히 이어갈 수 있나요?",
    "한국 토종견이라는 이름보다 실제 개체의 경험과 성향을 먼저 볼 수 있나요?",
  ],
  relatedTitle: "한국 토종견 안에서도 외형과 생활은 달라요.",
  relatedDescription: "지역 보존의 역사와 체형, 피모와 꼬리 형태가 만드는 관찰 차이를 살펴보세요.",
  relatedDifferences: {
    "korea-jindo-dog": "스피츠형 한국 토종견이라는 점은 닮았지만 동경이의 자연 단미 외형은 몸 신호를 읽는 방식에 차이를 만들어요.",
    sapsaree: "한국에서 사람과 살아온 배경은 공유하지만 삽살개의 긴 피모와 동경이의 짧은 피모는 관리 부담이 달라요.",
  },
});

export const mudiDetail = createExpansionDetail({
  slug: "mudi",
  nameKo: "무디",
  metadataDescription: "헝가리 농장에서 가축을 몰고 주변을 알리던 무디의 빠른 방향 전환, 냄새 과제와 휴식, 경계 소리와 물결 모양 피모 관리까지 살펴봅니다.",
  heroStatement: "헝가리 농장에서 가축을 몰고 주변의 변화를 알리던 민첩한 다목적 목양견이에요.",
  storyTitle: "무디는 왜 빠르게 움직이고 주변 변화를 곧바로 알릴까요?",
  past: {
    title: "가축을 몰고 농장의 여러 일을 도왔어요.",
    body: "무디는 헝가리 농장에서 가축의 방향을 바꾸고 주변 변화를 알리는 다목적 목양견으로 일했어요.",
    image: "/illustrations/v3/mudi-history.webp",
    imageAlt: "헝가리 농장에서 가축의 방향을 바꾸는 물결 모양 털의 검은 무디 삽화",
  },
  current: {
    title: "짧은 신호에도 몸을 빠르게 바꿀 수 있어요.",
    body: "보호자의 위치와 손짓을 읽으며 다음 방향을 예측하고 민첩하게 참여하는 경향이 있어요.",
    image: "/illustrations/v4/mudi-feature-farm-direction.webp",
    imageAlt: "농장 표지 사이에서 보호자의 방향 신호에 몸을 돌리는 검은 무디 삽화",
  },
  life: {
    title: "계속 달리기보다 선택하고 멈추는 과제가 필요해요.",
    body: "여러 냄새 상자 중 하나를 찾고 보호자에게 알린 뒤 끝내는 짧은 과제가 생활 리듬을 만들어요.",
    image: "/illustrations/v4/mudi-feature-scent-box-choice.webp",
    imageAlt: "여러 상자 중 냄새가 든 상자를 찾아 보호자에게 알리는 무디 삽화",
  },
  realitiesTitle: "빠른 몸과 빠른 알림을 함께 조절하려면",
  realities: [
    {
      id: "alert-to-rest",
      title: "알린 뒤 돌아와 쉬는 다음 행동을 가르쳐 주세요.",
      body: "문밖 소리에 짖었다면 혼내는 데서 끝내지 말고 보호자에게 와서 매트에 눕는 순서를 연결해 주세요.",
      image: "/illustrations/v4/mudi-feature-alert-to-rest.webp",
      imageAlt: "문밖 소리를 확인한 뒤 보호자를 따라 매트로 돌아와 쉬는 무디 삽화",
    },
    {
      id: "wavy-coat-care",
      title: "물결 모양 털에는 작은 이물질이 숨어요.",
      body: "들판 활동 뒤 귀 뒤와 겨드랑이, 다리 털을 나누어 씨앗과 잔가지가 없는지 확인해야 해요.",
      image: "/illustrations/v4/mudi-feature-wavy-coat-care.webp",
      imageAlt: "보호자가 무디의 물결 모양 털을 나누어 이물질을 확인하는 삽화",
    },
  ],
  readinessTitle: "무디와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "빠른 운동뿐 아니라 냄새 선택과 신호 학습, 멈추는 과제를 함께 줄 수 있나요?",
    "생활 소리를 알린 뒤 보호자에게 돌아와 쉬는 순서를 반복할 수 있나요?",
    "들판 활동 뒤 물결 모양 털 속 이물질을 구역별로 확인할 수 있나요?",
  ],
  relatedTitle: "민첩한 목양견도 일하는 방식은 달라요.",
  relatedDescription: "비슷한 체격과 활동성보다 가축을 다룬 방식과 소리, 피모 관리의 차이를 비교해 보세요.",
  relatedDifferences: {
    pumi: "헝가리 목양견이라는 공통점이 있지만 귀 모양과 피모, 가축을 움직일 때 쓰는 소리와 방식이 달라요.",
    "australian-kelpie": "민첩한 가축 이동 작업은 닮았지만 형성 지역과 피모, 더위와 활동 환경을 따로 살펴야 해요.",
  },
});

export const bologneseDetail = createExpansionDetail({
  slug: "bolognese",
  nameKo: "볼로네즈",
  metadataDescription: "이탈리아에서 사람 곁의 반려견으로 사랑받은 볼로네즈의 가까운 교감, 혼자 쉬는 연습, 작은 체구의 이동 동선과 흰 곱슬 피모 관리까지 살펴봅니다.",
  heroStatement: "이탈리아의 집 안에서 사람 가까이 머물며 교감해 온 작고 흰 반려견이에요.",
  storyTitle: "볼로네즈는 왜 사람과 같은 일을 조용히 함께하려 할까요?",
  past: {
    title: "이탈리아의 집 안에서 사람 곁을 지켰어요.",
    body: "볼로네즈는 오랫동안 사람과 가까운 실내에서 교감하도록 길러진 소형 반려견이에요.",
    image: "/illustrations/v3/bolognese-history.webp",
    imageAlt: "이탈리아 옛 실내에서 사람 가까이 조용히 머무는 흰색 볼로네즈 삽화",
  },
  current: {
    title: "보호자와 짧은 신호를 맞추는 일을 즐길 수 있어요.",
    body: "크게 달리는 활동보다 같은 공간에서 표지를 따라 움직이고 교감하는 과제에 잘 참여할 수 있어요.",
    image: "/illustrations/v4/bolognese-feature-shared-markers.webp",
    imageAlt: "거실의 작은 표지 사이를 보호자와 함께 이동하는 흰색 볼로네즈 삽화",
  },
  life: {
    title: "늘 안겨 있기보다 혼자 쉬는 자리도 배워야 해요.",
    body: "보호자가 가까이 있어도 자기 매트에서 쉬고 다시 만나는 짧은 경험을 천천히 늘려 주세요.",
    image: "/illustrations/v4/bolognese-feature-independent-rest.webp",
    imageAlt: "보호자가 근처에 있는 동안 자기 매트에서 편히 쉬는 볼로네즈 삽화",
  },
  realitiesTitle: "작은 몸과 흰 피모를 위한 생활 준비",
  realities: [
    {
      id: "step-ramp",
      title: "높은 가구에는 작은 계단보다 안정적인 경사로가 좋아요.",
      body: "반복해서 뛰어내리지 않도록 미끄럽지 않고 폭이 충분한 이동 경로를 마련해 주세요.",
      image: "/illustrations/v4/bolognese-feature-step-ramp.webp",
      imageAlt: "보호자 곁에서 낮고 미끄럽지 않은 경사로를 이용하는 볼로네즈 삽화",
    },
    {
      id: "white-coat-care",
      title: "흰 곱슬 털은 겉보다 안쪽을 나누어 빗어요.",
      body: "눈가와 입가를 청결하게 유지하고 겨드랑이와 다리 안쪽까지 작은 구역으로 나누어 빗어 주세요.",
      image: "/illustrations/v4/bolognese-feature-white-coat-care.webp",
      imageAlt: "보호자가 흰색 볼로네즈의 곱슬 털을 작은 구역으로 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "볼로네즈와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "사람 곁의 교감과 함께 혼자 매트에서 쉬는 연습도 천천히 가르칠 수 있나요?",
    "높은 가구에서 뛰어내리지 않도록 안정적인 경사로와 바닥을 준비할 수 있나요?",
    "흰 곱슬 털을 피부까지 나누어 빗고 눈가와 입가를 매일 확인할 수 있나요?",
  ],
  relatedTitle: "작고 흰 반려견도 피모와 리듬은 달라요.",
  relatedDescription: "비슷한 외모 안에서 털의 질감과 사람 곁에 머무는 방식, 손질 부담을 비교해 보세요.",
  relatedDifferences: {
    maltese: "작고 흰 반려견이라는 점은 닮았지만 말티즈의 곧고 긴 털과 볼로네즈의 복슬한 털은 손질법이 달라요.",
    "bichon-frise": "흰 곱슬 피모는 비슷해 보여도 털의 질감과 다듬는 방식, 품종의 체형과 생활 리듬이 같지는 않아요.",
  },
});

export const kooikerhondjeDetail = createExpansionDetail({
  slug: "kooikerhondje",
  nameKo: "쿠이커혼제",
  metadataDescription: "네덜란드 오리 유인장에서 가림막 사이를 움직이며 꼬리로 오리의 호기심을 끌던 쿠이커혼제의 역할, 물새 거리와 활동 뒤 휴식, 피모 관리까지 살펴봅니다.",
  heroStatement: "네덜란드 오리 유인장에서 흰 꼬리로 오리의 호기심을 끌던 작고 민첩한 작업견이에요.",
  storyTitle: "쿠이커혼제는 왜 갈대 가림막 사이를 조용히 오갔을까요?",
  past: {
    title: "흰 꼬리를 보이며 오리의 호기심을 끌었어요.",
    body: "오리를 쫓아 사냥한 것이 아니라 가림막 사이를 차분히 움직여 유인장 안쪽으로 관심을 이끌었어요.",
    image: "/illustrations/v3/kooikerhondje-history.webp",
    imageAlt: "네덜란드 오리 유인장의 갈대 가림막 사이를 조용히 걷는 쿠이커혼제 삽화",
  },
  current: {
    title: "사람과 정해진 길을 오가는 섬세한 협업을 해요.",
    body: "보호자의 위치를 살피며 좁은 경로를 조용히 이동하고 다시 돌아오는 과제에 집중할 수 있어요.",
    image: "/illustrations/v4/kooikerhondje-feature-decoy-route.webp",
    imageAlt: "오리를 해치지 않고 갈대 가림막 사이의 정해진 길을 걷는 쿠이커혼제 삽화",
  },
  life: {
    title: "집에서는 활동 도구가 사라져야 쉴 때를 알아요.",
    body: "산책과 냄새 과제 뒤 긴 줄과 도구를 치우고 매트에서 쉬는 종료 신호를 일관되게 보여 주세요.",
    image: "/illustrations/v4/kooikerhondje-feature-task-to-rest.webp",
    imageAlt: "보호자가 젖은 산책 도구를 치우는 동안 매트에서 쉬는 쿠이커혼제 삽화",
  },
  realitiesTitle: "물가의 관심과 장식털을 관리하는 법",
  realities: [
    {
      id: "waterbird-distance",
      title: "물새를 발견하면 추격 전에 다시 돌아설 거리를 주세요.",
      body: "느슨한 긴 줄을 사용해 먼 거리에서 관찰하고 보호자를 향해 몸을 돌리는 순간을 차분히 보상해 주세요.",
      image: "/illustrations/v4/kooikerhondje-feature-waterbird-distance.webp",
      imageAlt: "멀리 있는 물새를 두고 긴 줄 끝의 보호자에게 몸을 돌리는 쿠이커혼제 삽화",
    },
    {
      id: "feathered-coat-care",
      title: "젖은 장식털과 귀는 산책 뒤 바로 확인하세요.",
      body: "귀와 다리, 배와 꼬리의 긴 털을 나누어 이물질을 빼고 습기가 남지 않도록 말려 주세요.",
      image: "/illustrations/v4/kooikerhondje-feature-feathered-coat-care.webp",
      imageAlt: "물가 산책 뒤 보호자가 쿠이커혼제의 귀와 다리와 꼬리 털을 확인하는 삽화",
    },
  ],
  readinessTitle: "쿠이커혼제와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "물새와 작은 동물을 쫓기 전에 거리를 벌리고 돌아오는 연습을 할 수 있나요?",
    "활동 뒤 도구를 치우고 조용히 쉬는 종료 루틴을 매일 이어갈 수 있나요?",
    "젖은 귀와 다리와 꼬리 장식털을 나누어 확인하고 충분히 말릴 수 있나요?",
  ],
  relatedTitle: "물가 작업견도 목표와 움직임은 달라요.",
  relatedDescription: "오리를 유인한 개와 물에서 회수한 개 사이의 역할과 생활 관리 차이를 비교해 보세요.",
  relatedDifferences: {
    "nova-scotia-duck-tolling-retriever": "오리의 관심을 끄는 배경은 닮았지만 체격과 회수 작업, 활동 강도와 피모 관리에서 차이가 있어요.",
    "english-cocker-spaniel": "작고 민첩한 스패니얼형 외모는 비슷해도 덤불 속 수색과 오리 유인이라는 원래 목적이 달라요.",
  },
});

export const expansionBatchBStandardBreedDetails = [
  belgianMalinoisDetail,
  belgianTervuerenDetail,
  komondorDetail,
  boerboelDetail,
  presaCanarioDetail,
  sapsareeDetail,
  donggyeongiDetail,
  mudiDetail,
  bologneseDetail,
  kooikerhondjeDetail,
];
