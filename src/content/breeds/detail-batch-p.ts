import type { Breed } from "./schema";

const checkedAt = "2026-08-30";

export const detailBatchP = [
  {
    slug: "american-pit-bull-terrier",
    contentStatus: "mvp-editorial-draft",
    nameKo: "아메리칸 핏불 테리어",
    nameEn: "American Pit Bull Terrier",
    tagline: "강한 체격만큼 민첩성과 학습, 안전한 사회화 계획을 함께 살펴봐야 해요.",
    palette: { primary: "#a8795f", secondary: "#e3d8ca", ink: "#352d29" },
    illustration: "/illustrations/v2/american-pit-bull-terrier-card.webp",
    catalog: { group: "terrier", discoveryTags: ["UKC 등록", "불 앤 테리어 계통", "민첩한 작업견"] },
    historyVisual: {
      src: "/illustrations/v3/american-pit-bull-terrier-history.webp",
      alt: "19세기 미국 농장에서 가축 이동을 돕는 아메리칸 핏불 테리어의 편집 수채화 역사 장면",
    },
    identity: {
      origin: "영국·아일랜드·스코틀랜드 계통, 미국에서 발전",
      lineage: "UKC가 등록하는 불 앤 테리어 계통",
      originalRole: "농장 가축 관리, 사냥과 다목적 작업, 가족 동행",
      size: "중형 · UKC 참고 수컷 약 46~53cm·16~27kg, 암컷 약 43~51cm·14~23kg",
      lifespan: "개체와 생활 환경에 따라 달라지므로 수의학적 상담을 함께 확인하세요.",
    },
    behaviorClues: {
      originalRole: "19세기 불도그와 테리어 계통에서 형성된 뒤 미국 농장과 목장에서 가축 관리, 사냥, 가족 동행에 활용된 기록이 있습니다.",
      today: "힘과 민첩성, 과제에 참여하려는 성향은 운동·학습 활동으로 연결될 수 있지만 자극과 다른 개에 대한 반응은 개체별로 확인해야 합니다.",
      guardianContext: "튼튼한 울타리, 리드 관리, 보상 기반 학습을 준비하고 사람·동물과의 거리를 실제 개체의 반응에 맞춰 단계적으로 조절해야 합니다.",
    },
    story: {
      opening: "아메리칸 핏불 테리어는 19세기 영국과 아일랜드·스코틀랜드의 불 앤 테리어 계통이 미국으로 건너가 다목적 농장견으로 발전한 배경을 지닙니다. UKC는 1898년부터 이 견종을 등록했습니다.",
      roleToHome: "가축을 다루고 여러 작업에 참여하던 힘과 끈기는 오늘날 활동적인 놀이와 학습 욕구로 이어질 수 있습니다. 동시에 강한 체격을 안전하게 안내할 보호자의 일관된 관리가 필요합니다.",
      reality: "견종명만으로 사람이나 다른 동물에 대한 행동을 단정할 수 없습니다. 실제 개체의 회복 속도와 사회적 반응을 확인하고, 지역별 사육 규정과 주거 계약도 함께 점검하세요.",
    },
    tendencies: {
      activity: { label: "높은 편", note: "힘과 민첩성을 사용할 규칙적인 신체 활동과 회복 시간이 함께 필요합니다." },
      mentalStimulation: { label: "높은 편", note: "보상 기반 학습과 냄새 찾기, 몸을 안전하게 쓰는 과제를 나누어 제공하세요." },
      independence: { label: "중간", note: "사람과 협력하는 연습과 혼자 차분히 쉬는 연습을 함께 구성하세요." },
      socialConnection: { label: "개체별 확인 필요", note: "사람과 다른 동물에 대한 반응은 성장 경험과 개체 차이를 직접 확인해야 합니다." },
      alerting: { label: "중간", note: "주변 자극에 대한 반응은 생활 환경과 학습 경험에 따라 달라질 수 있습니다." },
      grooming: { label: "낮은 편", note: "짧은 피모지만 피부·발·귀 상태와 발톱은 규칙적으로 확인해야 합니다." },
    },
    careNotes: [
      "강한 체격을 고려해 튼튼한 장비와 안전한 울타리, 보상 기반 리드 연습을 준비하세요.",
      "다른 개와의 만남은 품종명으로 예측하지 말고 실제 반응과 회복 신호에 맞춰 거리를 조절하세요.",
      "거주 지역의 동물 관련 법규, 보험과 주거 계약의 품종 제한 여부를 입양 전에 확인하세요.",
    ],
    healthEditorialNote: "건강 정보는 UKC 체형 기준을 바탕으로 한 편집 초안입니다. 과도한 체중과 비기능적 체형을 피하고 개별 건강 상태는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "힘을 조절하는 산책", description: "냄새 탐색과 보상 기반 리드 연습을 짧게 나누어 진행하세요." },
      { time: "낮", title: "예측 가능한 휴식", description: "외부 자극에서 떨어진 조용한 자리에서 충분히 회복하게 해 주세요." },
      { time: "저녁", title: "협력 과제", description: "찾기와 가져오기, 몸 관리 연습을 성공하기 쉬운 단계로 구성하세요." },
    ],
    related: [
      { slug: "american-bully", reason: "공유하는 계통과 서로 다른 체형·현대 역할을 같은 기준으로 비교해 보세요." },
      { slug: "american-staffordshire-terrier", reason: "가까운 역사적 계통에서 등록 기준과 체형 표현이 어떻게 달라지는지 살펴보세요." },
    ],
    sources: [
      { title: "American Pit Bull Terrier Breed Standard", organization: "United Kennel Club", url: "https://www.ukcdogs.com/american-pit-bull-terrier", checkedAt },
      { title: "Official UKC American Pit Bull Terrier Breed Standard (PDF)", organization: "United Kennel Club", url: "https://www.ukcdogs.com/docs/breeds/american-pit-bull-terrier.pdf", checkedAt },
    ],
  },
  {
    slug: "american-bully",
    contentStatus: "mvp-editorial-draft",
    nameKo: "아메리칸 불리",
    nameEn: "American Bully",
    tagline: "두드러진 체격보다 균형 잡힌 움직임과 반려견으로서의 생활 조건을 먼저 봐야 해요.",
    palette: { primary: "#777674", secondary: "#dddcd5", ink: "#2f302f" },
    illustration: "/illustrations/v2/american-bully-card.webp",
    catalog: { group: "companion", discoveryTags: ["UKC 등록", "현대 반려견", "균형 잡힌 체형"] },
    historyVisual: {
      src: "/illustrations/v3/american-bully-history.webp",
      alt: "2000년대 미국의 가족 반려 환경에서 학습 중인 아메리칸 불리의 편집 수채화 장면",
    },
    identity: {
      origin: "미국",
      lineage: "아메리칸 핏불 테리어를 바탕으로 여러 불독 계통이 영향을 준 현대 견종",
      originalRole: "가족과 생활하는 반려견",
      size: "중형~대형 · UKC의 Pocket, Standard/Classic, XL 크기 유형",
      lifespan: "개체와 체형, 생활 환경에 따라 달라지므로 수의학적 상담을 함께 확인하세요.",
    },
    behaviorClues: {
      originalRole: "아메리칸 핏불 테리어 계통에서 특정 체격과 구조가 발달하고 다른 불독 계통의 영향이 더해져 현대의 독립된 반려 견종으로 구분됐습니다.",
      today: "사람과 생활하는 반려 목적이 중심이지만 힘과 체중, 활동성은 크기 유형과 개체에 따라 크게 달라질 수 있어 실제 움직임을 확인해야 합니다.",
      guardianContext: "머리와 가슴의 크기보다 호흡, 곧은 다리, 자유로운 보행처럼 기능적인 체형을 우선하고 보호자가 힘을 안전하게 안내할 준비가 필요합니다.",
    },
    story: {
      opening: "아메리칸 불리는 아메리칸 핏불 테리어에서 발달한 특정 타입에 여러 불독 계통의 영향이 더해진 현대 미국 견종입니다. UKC는 2013년 별도 견종으로 인정했습니다.",
      roleToHome: "이 견종은 작업 역할보다 가족과 생활하는 반려 목적을 중심으로 발전했습니다. 다만 사람 곁을 선호한다는 설명이 모든 개체의 사회적 반응이나 혼자 있는 능력을 보장하지는 않습니다.",
      reality: "Pocket, Standard/Classic, XL처럼 체격 범위가 넓고 번식 계통에 따라 차이가 큽니다. 과장된 크기나 짧은 주둥이보다 정상적인 호흡과 움직임, 개체의 실제 성향을 먼저 확인하세요.",
    },
    tendencies: {
      activity: { label: "중간", note: "체격에 맞는 규칙적인 산책과 관절에 무리가 없는 놀이를 구성하세요." },
      mentalStimulation: { label: "중간", note: "짧은 보상 기반 학습과 냄새 찾기를 일상에 나누어 제공하세요." },
      independence: { label: "중간", note: "사람과 함께하는 시간과 혼자 편안히 쉬는 시간을 모두 연습해야 합니다." },
      socialConnection: { label: "개체별 확인 필요", note: "반려 목적의 견종이지만 사람과 동물에 대한 반응은 개체와 경험에 따라 다릅니다." },
      alerting: { label: "중간", note: "방문객과 주변 소리에 대한 반응은 주거 환경과 사회화 경험을 함께 확인하세요." },
      grooming: { label: "낮은 편", note: "짧은 피모라도 피부 주름, 발, 귀와 발톱 상태를 규칙적으로 살펴야 합니다." },
    },
    careNotes: [
      "크기 유형 이름보다 실제 체중과 호흡, 보행, 관절 상태를 우선해 확인하세요.",
      "넓은 가슴이나 큰 머리가 움직임과 호흡을 방해하는 과장된 체형은 피해야 합니다.",
      "거주 지역의 동물 관련 법규, 보험과 주거 계약의 품종 제한 여부를 입양 전에 확인하세요.",
    ],
    healthEditorialNote: "UKC는 크기와 질량을 위해 건강·기능을 희생하지 말 것을 명시합니다. 개별 호흡과 피부, 관절, 체중 상태는 수의사에게 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "몸 상태에 맞는 산책", description: "호흡과 보행을 살피며 무리하지 않는 속도로 움직이세요." },
      { time: "낮", title: "조용한 휴식", description: "사람 곁과 독립된 휴식 공간을 오가며 편안히 쉬게 해 주세요." },
      { time: "저녁", title: "관계와 몸 관리", description: "짧은 학습 뒤 피부·발·귀와 움직임을 차분히 확인하세요." },
    ],
    related: [
      { slug: "american-pit-bull-terrier", reason: "형성에 영향을 준 계통과 현재의 체형·역할 차이를 함께 살펴보세요." },
      { slug: "american-staffordshire-terrier", reason: "비슷해 보이는 외형보다 등록 기준과 균형 잡힌 체형의 차이를 비교해 보세요." },
    ],
    sources: [
      { title: "American Bully Breed Standard", organization: "United Kennel Club", url: "https://www.ukcdogs.com/american-bully", checkedAt },
      { title: "American Bully Breed Standard Update", organization: "United Kennel Club", url: "https://www.ukcdogs.com/article/american-bully-breed-standard-update?news_id=3", checkedAt },
    ],
  },
] satisfies Breed[];
