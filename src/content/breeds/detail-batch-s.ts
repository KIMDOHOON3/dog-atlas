import type { Breed } from "./schema";

const checkedAt = "2026-08-17";

export const detailBatchS = [
  {
    slug: "boerboel",
    contentStatus: "mvp-editorial-draft",
    nameKo: "보어보엘",
    nameEn: "Boerboel",
    tagline: "남아프리카 농장을 지켜 온 큰 작업견으로, 외모보다 힘을 안전하게 안내할 경험과 생활 경계를 먼저 살펴봐야 해요.",
    palette: { primary: "#a97752", secondary: "#e4d6c2", ink: "#352f29" },
    illustration: "/illustrations/v2/boerboel-card.webp",
    catalog: { group: "guardian-working", discoveryTags: ["남아프리카공화국", "농장 경비견", "큰 체구와 조기 교육"] },
    historyVisual: {
      src: "/illustrations/v3/boerboel-history.webp",
      alt: "남아프리카 농장의 울타리와 가축 곁에서 주변을 살피는 보어보엘을 그린 편집 자연사 삽화",
    },
    identity: {
      origin: "남아프리카공화국",
      lineage: "남아프리카에서 발전한 마스티프형 농장 작업견",
      originalRole: "농장과 가족, 가축의 경계를 살피는 다목적 경비견",
      size: "대형~초대형 · KUSA 이상적 체고 수컷 66cm·암컷 61cm, 최소 수컷 60cm·암컷 55cm",
      lifespan: "공식 표준에서 확인 가능한 단일 수명 범위를 찾지 못해 표시하지 않음",
    },
    behaviorClues: {
      originalRole: "17세기 이후 남아프리카의 농장 생활에서 집과 가축의 경계를 살피고 농부와 함께 여러 작업을 수행한 배경이 기록되어 있습니다.",
      today: "차분함과 학습 가능성이 소개되지만 강한 보호 행동과 큰 체격은 방문객, 다른 동물, 출입구를 세심하게 관리해야 하는 생활 책임으로 이어질 수 있습니다.",
      guardianContext: "어린 시기부터 보상 기반 교육과 안정적인 사회화, 튼튼한 울타리와 이중 출입 통제를 준비하고 성견의 힘을 보호자가 안전하게 다룰 수 있어야 합니다.",
    },
    story: {
      opening: "보어보엘은 17세기 이후 남아프리카에 정착한 농가에서 다목적 작업견으로 발전했습니다. KUSA 표준은 농장과 가족을 지키고 농부와 사냥에 동행했던 역사적 배경을 설명합니다.",
      roleToHome: "넓은 농장의 경계를 살피고 상황을 판단하던 역할은 오늘날에도 주변 변화에 대한 빠른 인식과 보호 행동으로 나타날 수 있습니다. 학습 능력만큼 일관된 기준과 침착한 안내가 중요합니다.",
      reality: "크고 강하다는 인상만으로 선택할 견종은 아닙니다. 실제 개체의 사회적 반응과 회복 속도를 확인하고, 방문객 동선·울타리·리드 장비·지역 규정까지 입양 전에 구체적으로 준비해야 합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "거대한 체격에 무리를 주는 반복 운동보다 꾸준한 산책과 통제된 작업 활동이 필요합니다." },
      mentalStimulation: { label: "높은 편", note: "보상 기반 복종 연습과 냄새 탐색, 경계에서 보호자에게 돌아오는 과제를 짧게 반복하세요." },
      independence: { label: "중간", note: "스스로 주변을 판단하는 경비 배경과 사람의 안내를 따르는 연습을 함께 고려해야 합니다." },
      socialConnection: { label: "개체별 확인 필요", note: "가족에 대한 유대와 낯선 사람·동물에 대한 반응은 사회화 이력과 개체에 따라 직접 확인해야 합니다." },
      alerting: { label: "높은 편", note: "영역과 출입구의 변화에 빠르게 반응할 수 있어 방문객 관리와 중단 신호 교육이 중요합니다." },
      grooming: { label: "낮은 편", note: "짧고 조밀한 피모는 간단한 빗질로 관리하되 피부, 귀, 발과 발톱을 규칙적으로 확인하세요." },
    },
    careNotes: [
      "성견의 힘을 고려한 튼튼한 리드 장비, 높은 울타리와 문이 연속으로 열리지 않는 출입 구조를 준비하세요.",
      "방문객과 다른 동물을 만나는 상황은 보호자의 통제 아래 충분한 거리에서 시작하고 실제 개체의 반응에 맞춰 조절하세요.",
      "입양 전 거주 지역의 동물 관련 법규와 주거·보험 제한을 확인하고 대형 경비견 교육 경험이 있는 전문가와 계획을 세우세요.",
    ],
    healthEditorialNote: "KUSA 표준은 크기보다 균형, 자유로운 움직임과 기능성을 함께 강조합니다. 건강 위험을 견종명만으로 예측하지 말고 체중·보행·피부 상태는 수의사와 개별 확인하세요.",
    daySnapshot: [
      { time: "아침", title: "통제된 산책과 냄새 탐색", description: "힘으로 당기기 전에 보호자 곁에서 움직이고 돌아오는 연습을 함께 진행하세요." },
      { time: "낮", title: "경계에서 벗어나 쉬기", description: "출입문과 창가에서 떨어진 조용한 자리에서 긴장을 풀고 쉬는 습관을 만드세요." },
      { time: "저녁", title: "출입 동선과 장비 확인", description: "울타리와 문, 리드 장비를 점검하고 짧은 협력 과제로 하루를 마무리하세요." },
    ],
    related: [
      { slug: "bullmastiff", reason: "큰 마스티프형 경비견이라는 공통점과 농장·영지에서 맡아 온 역할의 차이를 비교해 보세요." },
      { slug: "cane-corso", reason: "강한 체격과 보호 작업 배경을 공유하지만 형성 지역과 체형, 일상 관리의 차이를 살펴보세요." },
    ],
    sources: [
      { title: "Boerboel Breed Standard", organization: "Kennel Union of Southern Africa (KUSA)", url: "https://kusa.co.za/images/Gallery/Boerboel%20Breed%20Standard.pdf", checkedAt },
      { title: "Boerboel Dog Breed Information", organization: "American Kennel Club (AKC)", url: "https://www.akc.org/dog-breeds/boerboel/", checkedAt },
    ],
  },
] satisfies Breed[];
