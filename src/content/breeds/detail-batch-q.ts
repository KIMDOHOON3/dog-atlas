import type { Breed } from "./schema";

const checkedAt = "2026-08-10";

export const detailBatchQ = [
  {
    slug: "mongolian-bankhar",
    contentStatus: "mvp-editorial-draft",
    nameKo: "몽골 방카르",
    nameEn: "Mongolian Bankhar",
    tagline: "몽골 초원에서 가축 곁을 지켜 온 랜드레이스로, 외형보다 독립적인 판단과 실제 작업 환경을 먼저 이해해야 해요.",
    palette: { primary: "#615145", secondary: "#d8cfba", ink: "#302c27" },
    illustration: "/illustrations/v2/mongolian-bankhar-card.webp",
    catalog: { group: "guardian-working", discoveryTags: ["몽골 랜드레이스", "가축수호견", "초원 작업견"] },
    historyVisual: {
      src: "/illustrations/v3/mongolian-bankhar-history.webp",
      alt: "몽골 초원의 게르와 양·염소 무리 사이에서 주변을 살피는 방카르를 그린 편집 자연사 삽화",
    },
    identity: {
      origin: "몽골 초원 지역",
      lineage: "단일 국제 표준보다 지역과 작업 역할을 통해 이어진 토착 가축수호견 랜드레이스",
      originalRole: "유목 가정의 가축 무리를 포식 위험으로부터 지키고 낯선 접근을 알리는 역할",
      size: "대형 · 표준화된 단일 범위보다 지역과 계통에 따른 차이를 함께 봐야 함",
      lifespan: "랜드레이스 전체에 적용할 신뢰도 높은 표준 수명 자료가 충분하지 않음",
    },
    behaviorClues: {
      originalRole: "사람의 세세한 지시를 계속 기다리기보다 가축 곁에서 넓은 주변을 살피고 위험 가능성을 스스로 판단하는 역할로 이어져 왔습니다.",
      today: "독립성, 영역 인식, 낯선 대상에 대한 경계는 실제 개체와 성장 환경에 따라 다르지만 일반적인 도시 반려 생활에는 큰 관리 부담이 될 수 있습니다.",
      guardianContext: "가축수호견의 침착한 경계와 사회적 적응은 어린 시기의 가축 결속, 안정적인 울타리, 충분한 공간과 경험 있는 보호자의 관리 맥락에서 살펴야 합니다.",
    },
    story: {
      opening: "방카르는 몽골의 유목 생활과 함께 가축을 지켜 온 토착 가축수호견 개체군입니다. 보존단체는 이를 고정된 품종표준의 견종보다 오랜 지역 선택으로 형성된 랜드레이스로 설명합니다.",
      roleToHome: "초원에서 무리와 생활하며 주변 변화를 판단하던 배경은 높은 독립성과 경계 행동으로 이어질 수 있습니다. 이는 단순히 넓은 마당만 제공한다고 충족되는 역할이 아닙니다.",
      reality: "방카르라는 이름만으로 외형과 행동을 하나로 단정할 수 없습니다. 반려를 고려한다면 개체의 사회화 이력, 실제 작업 계통, 생활 공간, 지역 규정과 안전 관리 역량을 먼저 확인해야 합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "고강도 스포츠보다 넓은 영역을 꾸준히 이동하고 살피는 지속적인 활동 맥락에 가깝습니다." },
      mentalStimulation: { label: "중간", note: "반복 명령보다 냄새 탐색, 환경 관찰, 예측 가능한 역할처럼 스스로 판단할 여지가 있는 활동이 중요합니다." },
      independence: { label: "높은 편", note: "가축 곁에서 독립적으로 상황을 판단해 온 작업 배경을 고려해야 합니다." },
      socialConnection: { label: "개체별 확인 필요", note: "가족, 가축, 낯선 사람과 동물에 대한 반응은 초기 경험과 개체에 따라 직접 확인해야 합니다." },
      alerting: { label: "높은 편", note: "영역과 무리 주변의 낯선 접근을 빠르게 감지하고 알리는 행동이 나타날 수 있습니다." },
      grooming: { label: "높은 편", note: "추운 초원 기후에 적응한 촘촘한 이중모는 계절성 털갈이와 정기적인 피모 점검이 필요합니다." },
    },
    careNotes: [
      "일반적인 도심 주거보다 안전한 경계, 넓은 공간, 가축수호견을 이해하는 관리 경험이 중요한 개체군입니다.",
      "두꺼운 이중모와 한랭 적응을 고려해 더운 계절에는 시원한 휴식 공간, 물, 활동 시간 조절과 열 스트레스 관찰이 필요합니다.",
      "낯선 방문객과 동물을 만나는 상황은 튼튼한 울타리와 단계적인 거리 조절을 전제로 개체의 실제 반응에 맞춰 관리하세요.",
    ],
    healthEditorialNote: "방카르 랜드레이스 전체를 대표하는 건강 통계와 표준 검진 지침은 제한적입니다. 출처가 불분명한 장수·질병 주장을 일반화하지 말고, 개체의 체형과 생활 환경에 맞춰 수의사와 검진 계획을 세우세요.",
    daySnapshot: [
      { time: "아침", title: "경계를 따라 천천히", description: "안전한 영역을 차분히 돌며 냄새와 주변 변화를 확인할 시간을 주세요." },
      { time: "낮", title: "그늘에서 관찰", description: "특히 더운 날에는 시원한 자리에서 쉬면서 환경을 살필 수 있게 해주세요." },
      { time: "저녁", title: "예측 가능한 마무리", description: "울타리와 출입 동선을 점검하고 차분한 교감으로 하루의 리듬을 정리하세요." },
    ],
    related: [
      { slug: "central-asian-shepherd-dog", reason: "가축수호 역할은 닮았지만 방카르의 랜드레이스 정체성과 표준 등록 견종의 차이를 비교해 보세요." },
      { slug: "tibetan-mastiff", reason: "시각적으로 혼동되기 쉽지만 지역, 작업 맥락, 등록 기준을 같은 것으로 보지 않아야 합니다." },
    ],
    sources: [
      { title: "Media Kit", organization: "Mongolian Bankhar Dog Project", url: "https://www.bankhar.org/press-kit/", checkedAt },
      { title: "Impact of livestock guardian dogs on livestock predation in rural Mongolia", organization: "Conservation Science and Practice", url: "https://conbio.onlinelibrary.wiley.com/doi/10.1111/csp2.509", checkedAt },
      { title: "몽골 초원의 가축수호견 방카르 생활 사례", organization: "EBS", url: "https://www.youtube.com/watch?v=OhJCHkNyWug", checkedAt: "2026-08-29" },
    ],
  },
] satisfies Breed[];
