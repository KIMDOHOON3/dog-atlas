import type { Breed } from "./schema";

const checkedAt = "2026-08-14";

export const detailBatchR = [
  {
    slug: "goldendoodle",
    contentStatus: "mvp-editorial-draft",
    nameKo: "골든두들",
    nameEn: "Goldendoodle",
    tagline: "골든 리트리버와 푸들의 이름을 함께 가졌지만, 크기와 털·행동은 한 모습으로 고정되지 않아요.",
    palette: { primary: "#c99a62", secondary: "#e7dcc8", ink: "#3b3028" },
    illustration: "/illustrations/v2/goldendoodle-card.webp",
    catalog: { group: "companion", discoveryTags: ["골든 리트리버·푸들 교배", "크기 편차", "높은 피모 관리"] },
    historyVisual: {
      src: "/illustrations/v3/goldendoodle-history.webp",
      alt: "골든 리트리버와 푸들을 바탕으로 형성된 골든두들의 현대적 배경을 그린 편집 수채화",
    },
    identity: {
      origin: "20세기 후반 북미·오스트레일리아에서 널리 알려짐",
      lineage: "골든 리트리버와 푸들을 의도적으로 교배한 디자이너 교배견",
      originalRole: "반려와 보조 활동의 특성을 함께 기대하며 시도된 현대 교배",
      size: "소형·중형·대형까지 · 부모 푸들의 크기와 교배 세대에 따라 큰 차이",
      lifespan: "교배 유형 전체에 적용할 표준 수명 범위는 확립되지 않음",
    },
    behaviorClues: {
      originalRole: "골든 리트리버의 사람과 협력하는 배경과 푸들의 학습·회수 작업 특성을 함께 기대하며 의도적으로 교배해 온 현대적 맥락이 있습니다.",
      today: "사람과 과제에 적극적으로 참여하거나 높은 활동성을 보일 수 있지만, 연구에서도 부모견 사이의 중간값만으로 행동을 예측하기 어렵다고 설명합니다.",
      guardianContext: "두들이라는 이름보다 실제 부모견, 교배 세대, 성장 후 크기와 개별 행동을 확인하고 충분한 활동·휴식·보상 기반 학습 계획을 세워야 합니다.",
    },
    story: {
      opening: "골든두들은 골든 리트리버와 푸들을 의도적으로 교배한 이름입니다. 단일 국제 등록단체가 관리하는 고정 표준견과 달리 교배 세대와 부모 푸들의 크기가 다양합니다.",
      roleToHome: "두 부모견 모두 사람과 협력해 온 배경이 있지만, 그 조합이 모든 골든두들에게 같은 성격이나 학습 반응을 보장하지는 않습니다. 실제 개체의 회복 속도와 자극 반응을 살펴야 합니다.",
      reality: "곱슬거리거나 물결치는 털이 적게 빠져 보일 수 있어도 저알레르기성을 보장할 수 없습니다. 속털 엉킴을 막는 빗질, 정기 미용, 활동 시간과 부모견 건강검사 기록을 함께 준비해야 합니다.",
    },
    tendencies: {
      activity: { label: "높은 편", note: "리트리버와 푸들의 활동적인 배경을 고려해 매일 충분히 움직이고 탐색할 시간을 준비하되 실제 개체에 맞춰 조절해야 합니다." },
      mentalStimulation: { label: "높은 편", note: "회수 놀이, 냄새 찾기와 짧은 협력 과제처럼 사람과 함께 해결하는 활동을 활용할 수 있습니다." },
      independence: { label: "개체별 확인 필요", note: "사람을 따르는 정도와 혼자 쉬는 능력은 부모견·사회화·생활 경험에 따라 달라질 수 있습니다." },
      socialConnection: { label: "개체별 확인 필요", note: "친근하다는 이름표에 기대지 말고 사람과 개를 만날 때의 실제 거리와 회복 반응을 확인해야 합니다." },
      alerting: { label: "개체별 확인 필요", note: "소리와 방문객에 대한 반응은 교배 조합과 경험에 따라 다르므로 실제 생활에서 관찰해야 합니다." },
      grooming: { label: "높은 편", note: "직모·웨이브·곱슬 등 털 형태가 달라도 엉킴 예방 빗질과 정기적인 전문 미용이 필요할 수 있습니다." },
    },
    careNotes: [
      "털이 적게 빠진다는 설명을 저알레르기 보장으로 받아들이지 말고 가족의 알레르기 반응은 실제 개체와 생활 환경에서 확인하세요.",
      "겉만 빗지 말고 피부 가까이까지 엉킴이 없는지 확인하며, 어린 시기부터 빗질·목욕·드라이·미용 도구에 천천히 적응시켜 주세요.",
      "부모견의 고관절·팔꿈치·심장·눈과 유전질환 검사 결과가 공개되어 있는지 교배 세대 설명과 함께 확인하세요.",
    ],
    healthEditorialNote: "골든두들이 교배견이라는 사실만으로 더 건강하다고 단정할 수 없습니다. GANA는 번식견의 관절·심장·눈·슬개골과 부모 계통 관련 유전질환 검사를 요구하며, 개별 결과를 직접 확인해야 합니다.",
    daySnapshot: [
      { time: "아침", title: "움직임과 냄새 탐색", description: "체격과 체력에 맞춰 걷기와 충분한 냄새 맡기를 함께 구성해요." },
      { time: "낮", title: "회수·찾기 과제", description: "사람과 짧게 협력한 뒤 혼자 편안히 쉬는 시간도 만들어요." },
      { time: "저녁", title: "속털까지 빗질", description: "귀 뒤·겨드랑이·다리 안쪽의 엉킴과 피부 상태를 확인해요." },
    ],
    related: [
      { slug: "golden-retriever", reason: "부모견 한쪽의 회수 작업·활동 배경과 골든두들의 개체 편차를 함께 살펴보세요." },
      { slug: "poodle", reason: "푸들의 크기 바라이어티와 곱슬 피모 관리가 교배 결과에 어떻게 달리 나타날 수 있는지 비교해 보세요." },
      { slug: "maltipoo", reason: "푸들 교배견이라는 공통점 안에서도 체격, 활동량과 피모 관리 규모가 크게 달라질 수 있어요." },
    ],
    sources: [
      { title: "Health Testing Standards", organization: "Goldendoodle Association of North America", url: "https://www.goldendoodleassociation.com/for-breeders/health-standards-and-ethical-breeding/", checkedAt },
      { title: "Expression of Behavioural Traits in Goldendoodles and Labradoodles", organization: "Animals (Basel) / PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6940824/", checkedAt },
      { title: "Goldendoodle Dog Breed Health and Care", organization: "PetMD", url: "https://www.petmd.com/dog/breeds/goldendoodle", checkedAt },
      { title: "Hypoallergenic Dogs: Does Such a Thing Really Exist?", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/do-hypoallergenic-dog-exist/", checkedAt },
    ],
  },
  {
    slug: "maltipoo",
    contentStatus: "mvp-editorial-draft",
    nameKo: "말티푸",
    nameEn: "Maltipoo",
    tagline: "작고 둥근 인상보다 먼저, 말티즈와 푸들의 어떤 크기·피모·행동을 물려받았는지 개체별로 확인해야 해요.",
    palette: { primary: "#d9b985", secondary: "#eee3d4", ink: "#3d332b" },
    illustration: "/illustrations/v2/maltipoo-card.webp",
    catalog: { group: "companion", discoveryTags: ["말티즈·푸들 교배", "소형 반려견", "엉킴·미용 관리"] },
    historyVisual: {
      src: "/illustrations/v3/maltipoo-history.webp",
      alt: "말티즈와 토이·미니어처 푸들을 바탕으로 형성된 말티푸의 현대적 배경을 그린 편집 수채화",
    },
    identity: {
      origin: "현대 북미권에서 널리 알려진 교배 유형",
      lineage: "말티즈와 토이 또는 미니어처 푸들을 의도적으로 교배한 디자이너 교배견",
      originalRole: "작은 체격과 사람 곁의 반려 특성을 기대하며 이루어진 현대 교배",
      size: "소형이 일반적이나 부모 푸들의 크기와 교배 세대에 따라 차이",
      lifespan: "교배 유형 전체에 적용할 표준 수명 범위는 확립되지 않음",
    },
    behaviorClues: {
      originalRole: "오랫동안 사람 곁의 반려견이었던 말티즈와 여러 크기로 정립된 푸들을 교배해 작은 반려견을 얻으려는 현대적 맥락이 있습니다.",
      today: "사람을 가까이 따르거나 짧은 학습에 적극적으로 참여할 수 있지만, 혼자 있는 반응과 낯선 자극에 대한 짖음은 개체와 경험에 따라 달라집니다.",
      guardianContext: "작은 체격을 낮은 활동이나 쉬운 관리로 해석하지 말고, 안전한 산책·혼자 쉬기·소리 적응과 매일의 피모·치아 관리를 함께 준비해야 합니다.",
    },
    story: {
      opening: "말티푸는 말티즈와 토이 또는 미니어처 푸들을 교배한 이름입니다. 독립 등록 견종의 고정 표준이 아니므로 털의 굵기와 곱슬 정도, 체형과 성격이 한 모습으로 이어지지 않습니다.",
      roleToHome: "두 부모견 모두 사람 가까이 생활해 온 배경이 있지만, 모든 말티푸가 낯선 사람과 동물에게 같은 반응을 보이는 것은 아닙니다. 사회화와 실제 행동을 개체별로 살펴야 합니다.",
      reality: "작고 털이 적게 빠져 보인다는 이유로 관리가 가벼운 개는 아닙니다. 엉킴 방지 빗질과 정기 미용, 치아·눈·슬개골 관리, 혼자 편히 쉬는 연습이 생활에 들어가야 합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "작은 체격이어도 매일 산책과 냄새 탐색, 실내 놀이가 필요하며 체력은 개체별로 조절해야 합니다." },
      mentalStimulation: { label: "중간", note: "먹이 찾기와 짧은 보상 기반 학습처럼 성공을 자주 경험하는 과제를 활용할 수 있습니다." },
      independence: { label: "개체별 확인 필요", note: "사람과 붙어 있으려는 정도와 혼자 쉬는 반응은 부모견과 초기 경험에 따라 달라질 수 있습니다." },
      socialConnection: { label: "개체별 확인 필요", note: "사람 중심이라는 통념보다 낯선 사람·아이·다른 동물에 대한 실제 반응을 직접 확인하세요." },
      alerting: { label: "개체별 확인 필요", note: "초인종·복도 소리·움직임에 대한 짖음은 개체와 주거 환경에 따라 크게 달라질 수 있습니다." },
      grooming: { label: "높은 편", note: "부드러운 웨이브나 곱슬 털은 피부 가까이 엉킬 수 있어 잦은 빗질과 정기 미용이 필요합니다." },
    },
    careNotes: [
      "매일 또는 생활에 맞는 잦은 빗질로 귀 뒤·겨드랑이·다리 안쪽을 살피고, 엉킨 털을 억지로 잡아당기지 마세요.",
      "작은 입과 치아 배열을 고려해 양치 적응을 일찍 시작하고 정기 검진에서 치아와 잇몸 상태를 확인하세요.",
      "부모 말티즈와 푸들의 슬개골·눈 등 권장 건강검사 결과가 실제 부모견 이름으로 공개되는지 확인하세요.",
    ],
    healthEditorialNote: "말티푸라는 이름만으로 질환이나 건강함을 예측할 수 없습니다. 수의학 자료는 치과 질환, 슬개골과 눈 문제를 주의 항목으로 소개하며 부모견 검사 기록과 개별 검진이 우선입니다.",
    daySnapshot: [
      { time: "아침", title: "작아도 바깥 탐색", description: "안전한 속도로 걷고 새로운 냄새를 충분히 맡게 해요." },
      { time: "낮", title: "혼자 쉬는 연습", description: "사람과 떨어진 편안한 자리에서 짧고 성공적으로 쉬어요." },
      { time: "저녁", title: "털과 치아 관리", description: "놀이 뒤 엉킴을 풀고 양치와 눈 주변 상태를 확인해요." },
    ],
    related: [
      { slug: "maltese", reason: "부모견 말티즈의 작은 체격과 직모 관리가 말티푸에서 어떻게 달리 나타날 수 있는지 살펴보세요." },
      { slug: "poodle", reason: "부모 푸들의 크기와 곱슬 피모, 학습 특성을 그대로 보장된 결과로 보지 않도록 비교해 보세요." },
      { slug: "goldendoodle", reason: "푸들 교배견이라는 이름은 닮았지만 체격, 활동과 미용에 드는 시간의 규모가 달라요." },
    ],
    sources: [
      { title: "Maltipoo Dog Breed Health and Care", organization: "PetMD", url: "https://www.petmd.com/dog/breeds/maltipoo", checkedAt },
      { title: "Diseases in Dogs — CHIC health screening overview", organization: "Orthopedic Foundation for Animals", url: "https://ofa.org/diseases/", checkedAt },
      { title: "Hypoallergenic Dogs: Does Such a Thing Really Exist?", organization: "American Kennel Club", url: "https://www.akc.org/expert-advice/dog-breeds/do-hypoallergenic-dog-exist/", checkedAt },
    ],
  },
] satisfies Breed[];
