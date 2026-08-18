import type { Breed } from "./schema";

const checkedAt = "2026-08-18";

export const detailBatchU = [
  {
    slug: "bulgae",
    contentStatus: "mvp-editorial-draft",
    nameKo: "불개",
    nameEn: "Bulgae",
    tagline: "경북 영주에서 보존 기록이 이어진 붉은 토종개 집단으로, 전승과 확인된 연구 결과를 나누어 살펴봐야 해요.",
    palette: { primary: "#a85f39", secondary: "#e7d4bd", ink: "#3b3029" },
    illustration: "/illustrations/v2/bulgae-card.webp",
    catalog: { group: "spitz-primitive", discoveryTags: ["한국 토종견", "경북 영주", "붉은 털과 희소 집단"] },
    historyVisual: {
      src: "/illustrations/v3/bulgae-history.webp",
      alt: "경북 영주의 산자락 마을에서 붉은 불개와 보존자가 마주 보는 모습을 그린 편집 수채화",
    },
    identity: {
      origin: "대한민국 경상북도 영주",
      lineage: "영주 지역에서 기록·보존된 희소 개 집단",
      originalRole: "지역 생활 속 경계와 동행",
      size: "중형 · 공인 품종 표준 수치 없음",
      lifespan: "신뢰할 수 있는 공인 수명 범위를 확인하지 못해 표시하지 않음",
    },
    behaviorClues: {
      originalRole: "국립축산과학원 자료는 영주 불개를 경계심과 야성이 강하고 발을 잘 쓰는 개로 전하지만, 이는 표준화된 행동 평가가 아니라 보존 집단에 관한 기록입니다.",
      today: "개체 수와 연구 표본이 적어 현대 반려생활에서의 성향을 견종명만으로 예측하기 어렵습니다. 실제 개체의 사람·동물·소리 반응과 회복 속도를 먼저 확인해야 합니다.",
      guardianContext: "희귀하다는 이유만으로 선택하기보다 출처가 분명한 개체인지, 사회화와 건강 기록이 있는지, 보호자가 안정적인 생활 경계를 제공할 수 있는지 확인해야 합니다.",
    },
    story: {
      opening: "불개는 경상북도 영주와 연결해 기록되는 붉은 개 집단입니다. 국립축산과학원 자료는 털과 눈, 코가 붉은 점을 대표적인 외형으로 소개하고 개체 수가 매우 적다고 설명합니다. 소백산의 늑대와 민가의 개 사이에서 생겼다는 이야기도 함께 전하지만, 이는 유전적으로 확정된 기원으로 보아서는 안 됩니다.",
      roleToHome: "2014년 동료평가 연구에서는 영주 농장의 불개 17개체가 다른 견종들과 함께 분석됐습니다. 이 표본은 연구의 비교 집단으로 존재가 확인됐지만, 분석에서는 진도개·동경이 등 토종견 집단과 가까운 군집으로 나타나지 않았습니다. 따라서 ‘한국 토종견’이라는 지역·문화적 기록과 유전적 계통에 대한 과학적 결론을 구분해 읽는 것이 중요합니다.",
      reality: "공인 표준과 충분한 집단 연구가 마련된 견종처럼 체격·수명·성격을 단정하기 어렵습니다. 실제로 함께 살 계획이라면 희소성보다 개체의 건강검진, 사회화 이력, 일상 반응과 보호 경로를 확인하고 보상 기반 교육을 천천히 시작하세요.",
    },
    tendencies: {
      activity: { label: "개체별 확인 필요", note: "공인 활동 기준이 없으므로 나이와 건강, 실제 산책 반응에 맞춰 운동량을 조절해야 합니다." },
      mentalStimulation: { label: "중간", note: "냄새 탐색과 짧은 협력 과제로 새로운 환경을 차분하게 살피는 경험을 제공하세요." },
      independence: { label: "개체별 확인 필요", note: "지역 보존 집단의 특성을 모든 개체에 적용하지 말고 보호자와 떨어졌을 때의 반응을 직접 확인하세요." },
      socialConnection: { label: "개체별 확인 필요", note: "사람과의 유대와 낯선 대상에 대한 반응은 성장 환경과 사회화 이력에 따라 달라질 수 있습니다." },
      alerting: { label: "높은 편", note: "기록에는 경계심이 언급되지만 실제 짖음과 회복 속도는 개체별로 확인하고 중단 신호를 알려주세요." },
      grooming: { label: "개체별 확인 필요", note: "공인 피모 표준이 없으므로 실제 털 길이와 밀도, 계절 변화에 맞춰 빗질 빈도를 정하세요." },
    },
    careNotes: [
      "분양·입양 경로와 혈통 주장만 믿지 말고 개체 식별, 건강검진과 예방 관리 기록을 확인하세요.",
      "낯선 사람과 동물을 갑자기 가까이 붙이지 말고 충분한 거리에서 관찰한 뒤 보호자에게 돌아오는 연습을 진행하세요.",
      "희소 집단의 보존과 반려 적합성은 다른 문제이므로 번식이나 보존을 계획한다면 관련 기관과 수의학 전문가의 검토를 받으세요.",
    ],
    healthEditorialNote: "불개에 관한 충분한 수의학 표본과 공인 건강 기준을 확인하기 어렵습니다. 품종명으로 질환을 예측하지 말고 개체별 건강검진과 진료 기록을 기준으로 판단하세요.",
    daySnapshot: [
      { time: "탐색", title: "차분히 냄새 맡으며 걷기", description: "정해진 운동량보다 실제 호흡과 걸음, 주변 반응을 보며 산책해요." },
      { time: "휴식", title: "경계에서 벗어나 쉬기", description: "현관과 창가에서 떨어진 조용한 자리에서 긴장을 풀게 해요." },
      { time: "교감", title: "짧은 협력 연습", description: "보호자에게 돌아오기와 몸을 살피는 연습을 보상과 함께 진행해요." },
    ],
    related: [
      { slug: "korea-jindo-dog", reason: "한국 토종견으로 기록되는 공통점과 공인 표준·보존 체계의 차이를 함께 살펴보세요." },
      { slug: "donggyeongi", reason: "경상북도 지역의 토종개라는 연결점이 있지만 유전 연구와 국가유산 지정 여부는 다르게 확인해야 해요." },
      { slug: "sapsaree", reason: "한국의 토종개 보존이라는 맥락은 닮았지만 피모와 공인 보존 지위에는 큰 차이가 있어요." },
    ],
    sources: [
      { title: "한국 토종개 유전자원의 보호·육성 자료", organization: "국립축산과학원", url: "https://www.nias.go.kr/front/soboarddown.do?boardSeqNum=3339&cmCode=M090814150850297&fileSeqNum=2030", checkedAt },
      { title: "Molecular Genetic Diversity of the Gyeongju Donggyeong Dog in Korea", organization: "Journal of Veterinary Medical Science", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4221169/", checkedAt },
      { title: "한국 토종견 전시 안내", organization: "서울대공원", url: "https://grandpark.seoul.go.kr/conts/contsView.do?lang=en&menu_id=S002002004002012", checkedAt },
    ],
  },
] satisfies Breed[];
