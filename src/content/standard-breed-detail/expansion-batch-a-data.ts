import { standardBreedDetailSchema } from "./schema";

export const belgianGroenendaelDetail = standardBreedDetailSchema.parse({
  slug: "belgian-groenendael",
  nameKo: "그로넨달",
  metadataDescription: "벨기에에서 양 떼를 모으고 농장 주변을 살피던 검은 장모 목양견 그로넨달의 과거와 오늘의 학습 참여, 방문객 거리와 피모 관리를 살펴봅니다.",
  heroStatement: "양 떼를 모으고 농장 주변까지 살피던 검은 장모 목양견이에요.",
  story: {
    title: "그로넨달은 왜 사람의 움직임과 규칙을 빠르게 읽을까요?",
    description: "과거의 역할을 알면 오늘의 행동을 조금 다르게 이해할 수 있어요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "양 떼를 모으며 농장 주변까지 살폈어요.",
        body: "벨지안 셰퍼드는 양 떼를 모으고 지키던 목양견에서 여러 작업을 맡는 개로 발전했어요.",
        image: "/illustrations/v3/belgian-groenendael-history.webp",
        imageAlt: "벨기에 목초지에서 양 떼 주변을 살피며 움직이는 검은 장모 성견 그로넨달 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "사람과 규칙을 맞추는 활동에 빠르게 참여할 수 있어요.",
        body: "그 배경은 오늘날에도 손짓을 따라 방향을 바꾸고 새로운 순서를 배우는 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/belgian-groenendael-feature-cooperative-markers.webp",
        imageAlt: "보호자의 손짓을 보며 세 개의 표식 사이를 이동하는 검은 장모 성견 그로넨달 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "배움이 빠른 만큼 매일 함께할 일이 필요해요.",
        body: "운동만 반복하기보다 짧은 학습과 찾기 뒤에 도구를 정리하고 쉬는 흐름까지 함께 만들어야 해요.",
        image: "/illustrations/v4/belgian-groenendael-feature-task-to-rest.webp",
        imageAlt: "활동을 마친 뒤 매트에서 쉬고 보호자는 도구를 바구니에 정리하는 성견 그로넨달 삽화",
      },
    ],
    caution: "견종의 과거는 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "빠른 배움은 왜 보호자의 몫을 늘릴까요?",
  realities: [
    {
      id: "visitor-buffer",
      title: "낯선 방문은 먼저 거리를 나눠야 해요.",
      body: "주변 변화에 빠르게 반응할 수 있어요. 문을 열기 전 안전문으로 공간을 나누고 차분히 볼 거리를 마련해야 해요.",
      image: "/illustrations/v4/belgian-groenendael-feature-visitor-buffer.webp",
      imageAlt: "보호자가 현관의 방문객을 맞는 동안 실내 안전문 뒤에서 기다리는 검은 장모 성견 그로넨달 삽화",
    },
    {
      id: "black-coat-care",
      title: "검은 장모는 피부까지 나누어 빗어야 해요.",
      body: "겉에서 매끈해 보여도 속털과 긴 장식털은 엉킬 수 있어요. 털을 나누어 빗고 계절 털갈이를 관리해야 해요.",
      image: "/illustrations/v4/belgian-groenendael-feature-black-coat-care.webp",
      imageAlt: "보호자가 검은 장모 성견 그로넨달의 전신 털을 구역별로 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "그로넨달과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기와 함께 짧은 학습이나 찾기 활동을 꾸준히 제공할 수 있나요?",
    "방문객과 낯선 자극 앞에서 안전문과 충분한 거리를 먼저 마련할 수 있나요?",
    "검은 장모와 속털을 구역별로 나누어 규칙적으로 빗을 수 있나요?",
  ],
  relatedTitle: "같은 벨지안 셰퍼드도 무엇이 다를까요?",
  relatedDescription: "같은 작업 배경을 공유해도 피모의 길이와 색, 생활 관리 조건은 달라질 수 있어요.",
  relatedDifferences: {
    "belgian-tervueren": "같은 장모 변종이지만 피모 색과 검은 오버레이가 달라 장모의 인상과 관리 지점을 함께 비교할 수 있어요.",
    "belgian-malinois": "같은 벨지안 셰퍼드 계통이지만 짧은 털을 지녀 피모 관리의 양상과 일상에서 보이는 인상이 달라요.",
  },
});

export const caucasianShepherdDogDetail = standardBreedDetailSchema.parse({
  slug: "caucasian-shepherd-dog",
  nameKo: "코카시안 셰퍼드",
  metadataDescription: "코카서스 지역에서 가축과 거주지를 지켜 온 거대한 코카시안 셰퍼드의 과거와 오늘의 경계 성향, 이동과 방문객 관리 현실을 살펴봅니다.",
  heroStatement: "가축과 거주지를 지키며 스스로 경계를 판단하던 거대한 수호견이에요.",
  story: {
    title: "코카시안 셰퍼드는 왜 넓은 경계를 오래 바라볼까요?",
    description: "과거의 역할을 알면 오늘의 행동을 조금 다르게 이해할 수 있어요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "코카서스의 가축과 거주지를 지켰어요.",
        body: "코카서스 지역의 개들은 혹독한 기후에서 가축과 거주지를 지키는 경비 역할을 해왔어요.",
        image: "/illustrations/v3/caucasian-shepherd-dog-history.webp",
        imageAlt: "코카서스 산악 목초지에서 가축과 거주지 경계를 지키는 거대한 성견 코카시안 셰퍼드 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "먼 경계의 변화를 스스로 살필 수 있어요.",
        body: "그 배경은 오늘날에도 울타리 밖 움직임을 오래 관찰하고 낯선 접근을 먼저 알아차리는 경향으로 나타날 수 있어요.",
        image: "/illustrations/v4/caucasian-shepherd-dog-feature-boundary-watch.webp",
        imageAlt: "보호자와 함께 넓은 농촌 울타리 바깥을 차분히 살피는 거대한 성견 코카시안 셰퍼드 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "거대한 체격은 일상 동선부터 바꿔요.",
        body: "넓은 문과 회전 공간, 튼튼한 하네스가 필요해요. 보호자는 큰 몸을 흥분하기 전부터 차분히 이동시킬 수 있어야 해요.",
        image: "/illustrations/v4/caucasian-shepherd-dog-feature-wide-route-handling.webp",
        imageAlt: "보호자가 넓은 진입문에서 하네스와 리드줄로 거대한 성견 코카시안 셰퍼드를 이동시키는 삽화",
      },
    ],
    caution: "견종의 과거는 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "거대한 경계견과 사는 준비는 무엇이 다를까요?",
  realities: [
    {
      id: "double-gate-visitor",
      title: "방문객보다 먼저 이중 경계를 준비해야 해요.",
      body: "문 앞에서 통제하려 하기보다 개와 방문객 사이에 두 개의 물리적 경계를 두는 편이 안전해요.",
      image: "/illustrations/v4/caucasian-shepherd-dog-feature-double-gate-visitor.webp",
      imageAlt: "택배 방문객과 보호자 사이의 이중문 안쪽에서 기다리는 거대한 성견 코카시안 셰퍼드 삽화",
    },
    {
      id: "double-coat-care",
      title: "큰 몸의 이중모 관리도 큰 일이에요.",
      body: "풍성한 피모는 계절에 따라 많은 속털이 빠질 수 있어요. 전신을 나누어 빗고 더운 날 쉴 그늘을 마련해야 해요.",
      image: "/illustrations/v4/caucasian-shepherd-dog-feature-double-coat-care.webp",
      imageAlt: "야외 그늘에서 보호자가 거대한 성견 코카시안 셰퍼드의 풍성한 전신 이중모를 빗는 삽화",
    },
  ],
  readinessTitle: "코카시안 셰퍼드와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "거대한 개가 돌아서고 이동할 넓은 동선과 튼튼한 울타리를 마련할 수 있나요?",
    "방문객이 오기 전에 두 개의 물리적 경계와 분리 공간을 운영할 수 있나요?",
    "큰 힘을 흥분 전에 관리하는 일상 연습과 전신 피모 관리를 꾸준히 이어갈 수 있나요?",
  ],
  relatedTitle: "다른 가축수호견과 생활 조건을 비교해보세요.",
  relatedDescription: "큰 체격만 보지 말고 형성 지역, 경계 방식, 피모와 공간 관리 부담을 함께 살펴보세요.",
  relatedDifferences: {
    "central-asian-shepherd-dog": "가축과 거주지를 지키는 독립적인 역할은 닮았지만 형성 지역과 체형, 피모 범위에서 차이를 살펴볼 수 있어요.",
    "anatolian-shepherd-dog": "가축수호 배경을 공유하지만 지역과 체형, 피모의 양이 달라 더위와 일상 관리 조건을 따로 비교해야 해요.",
  },
});

export const mongolianBankharDetail = standardBreedDetailSchema.parse({
  slug: "mongolian-bankhar",
  nameKo: "몽골 방카르",
  metadataDescription: "몽골 초원에서 가축 곁을 지키며 포식자를 막아 온 몽골 방카르의 과거와 오늘의 순찰, 가축과의 결속과 계절 피모 관리를 살펴봅니다.",
  heroStatement: "몽골 초원에서 가축 곁을 지키며 포식자를 막아 온 수호견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "기준", value: "보존 프로젝트 평균" },
      { label: "체고", value: "수컷 약 76cm" },
      { label: "몸무게", value: "암컷 약 45kg · 수컷 약 54kg" },
    ],
    detailsLabel: "성별·근거 보기",
    items: [
      { id: "female", label: "암컷", value: "평균 몸무게 약 45kg · 평균 체고는 공개하지 않음" },
      { id: "male", label: "수컷", value: "평균 체고 약 76cm · 평균 몸무게 약 54kg" },
    ],
  },
  story: {
    title: "몽골 방카르는 왜 사람보다 가축 가까이에 머물까요?",
    description: "과거의 역할을 알면 오늘의 행동을 조금 다르게 이해할 수 있어요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "초원의 가축 무리를 포식자로부터 지켰어요.",
        body: "방카르는 몽골 유목 가정의 가축 곁에 머물며 늑대와 눈표범 같은 포식자의 접근을 막아 온 재래 집단이에요.",
        image: "/illustrations/v3/mongolian-bankhar-history.webp",
        imageAlt: "몽골 초원에서 유목 가정의 가축 무리 가까이를 지키는 검정과 황갈색 성견 몽골 방카르 삽화",
      },
      {
        navLabel: "현재의 역할",
        eyebrow: "2단계 · 지금도 무엇을 할까?",
        title: "가축 둘레를 돌며 변화를 먼저 살필 수 있어요.",
        body: "가축을 몰기보다 무리 주변을 순찰하고 낯선 접근을 스스로 판단하는 것이 원래 작업에 가까워요.",
        image: "/illustrations/v4/mongolian-bankhar-feature-livestock-perimeter.webp",
        imageAlt: "몽골 초원에서 양과 염소 무리의 둘레를 유목민과 함께 걷는 성견 몽골 방카르 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "넓은 공간만으로 원래 역할이 채워지지는 않아요.",
        body: "울타리와 물, 가축과의 관계를 매일 점검해야 해요. 마당에 혼자 두는 것과 가축을 지키는 작업은 달라요.",
        image: "/illustrations/v4/mongolian-bankhar-feature-fence-water-check.webp",
        imageAlt: "유목민이 울타리와 물통을 점검하는 동안 가축 곁에 서 있는 성견 몽골 방카르 삽화",
      },
    ],
    caution: "랜드레이스의 작업 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 개체에 따라 다르게 나타날 수 있어요.",
  },
  realitiesTitle: "반려견과 같은 방식으로 생각하면 무엇을 놓칠까요?",
  realities: [
    {
      id: "livestock-bond",
      title: "사람보다 가축과의 결속이 먼저인 작업견이에요.",
      body: "작업 현장의 방카르는 사람 곁에서 지시를 기다리기보다 가축 사이에 머물도록 길러져요. 넓은 마당만으로 이 역할을 대신할 수는 없어요.",
      image: "/illustrations/v4/mongolian-bankhar-feature-livestock-bond.webp",
      imageAlt: "몽골의 밤 우리에서 양 무리 사이에 쉬고 유목민은 문을 확인하는 성견 몽골 방카르 삽화",
    },
    {
      id: "seasonal-coat-care",
      title: "초원의 이중모는 계절 관리가 필요해요.",
      body: "두꺼운 피모는 추위를 견디는 데 도움을 주지만 털갈이철에는 많은 속털이 빠져요. 전신을 빗고 물과 그늘을 살펴야 해요.",
      image: "/illustrations/v4/mongolian-bankhar-feature-seasonal-coat-care.webp",
      imageAlt: "몽골 게르 옆에서 유목민이 성견 몽골 방카르의 전신 이중모를 빗는 삽화",
    },
  ],
  readinessTitle: "몽골 방카르의 작업 환경을 마련할 수 있는지 확인하세요.",
  readinessQuestions: [
    "가축과 결속하고 순찰할 실제 작업 환경을 장기간 제공할 수 있나요?",
    "넓은 경계와 울타리, 물과 그늘을 매일 확인할 책임을 감당할 수 있나요?",
    "독립적으로 판단하는 큰 개를 일반 반려견과 다른 방식으로 관리할 준비가 됐나요?",
  ],
  relatedTitle: "비슷한 가축수호견도 같은 개는 아니에요.",
  relatedDescription: "겉모습보다 랜드레이스 정체성, 형성 지역과 실제 작업 환경의 차이를 먼저 살펴보세요.",
  relatedDifferences: {
    "central-asian-shepherd-dog": "가축을 지키는 독립적인 역할은 닮았지만 방카르는 몽골의 유목 환경에서 이어진 랜드레이스라는 점을 구분해야 해요.",
    "tibetan-mastiff": "풍성한 피모와 높은 지역의 경비 배경은 닮아 보이지만 형성 지역과 작업 맥락, 등록 기준을 같은 것으로 보면 안 돼요.",
  },
});

export const expansionBatchAStandardBreedDetails = [
  belgianGroenendaelDetail,
  caucasianShepherdDogDetail,
  mongolianBankharDetail,
];
