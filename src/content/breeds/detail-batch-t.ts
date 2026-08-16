import type { Breed } from "./schema";

const checkedAt = "2026-08-17";

export const detailBatchT = [
  {
    slug: "anatolian-shepherd-dog",
    contentStatus: "mvp-editorial-draft",
    nameKo: "아나톨리안 셰퍼드",
    nameEn: "Anatolian Shepherd Dog",
    tagline: "넓은 목초지에서 스스로 위험을 판단해 온 가축보호견이라, 큰 체격보다 먼저 독립성과 경계 행동을 이해해야 해요.",
    palette: { primary: "#9e8969", secondary: "#dfe5dc", ink: "#31352f" },
    illustration: "/illustrations/v2/anatolian-shepherd-dog-card.webp",
    catalog: { group: "guardian-working", discoveryTags: ["아나톨리아 가축보호견", "초대형 체구", "독립적인 경계"] },
    historyVisual: {
      src: "/illustrations/v3/anatolian-shepherd-dog-history.webp",
      alt: "아나톨리아 고원에서 양 떼의 바깥을 살피는 아나톨리안 셰퍼드를 그린 편집 수채화",
    },
    identity: {
      origin: "튀르키예 아나톨리아 지역",
      lineage: "가축보호견·AKC 워킹 그룹",
      originalRole: "양 떼와 함께 지내며 포식자와 외부 위협을 경계하는 가축보호견",
      size: "초대형 · 수컷 약 74cm·50~68kg, 암컷 약 69cm·36~54kg",
      lifespan: "11~13년",
    },
    behaviorClues: {
      originalRole: "목자의 지시만 기다리기보다 가축 곁에서 주변을 살피고 위협을 스스로 판단하도록 발달한 가축보호견의 배경이 있습니다.",
      today: "가족에게 침착하고 충실할 수 있지만 낯선 사람·동물과 영역 변화에는 보호 행동이나 거리 확보가 나타날 수 있습니다.",
      guardianContext: "캉갈과 역사적 배경이 겹치지만 모든 등록단체가 두 이름을 같은 표준으로 다루지는 않습니다. 이 항목은 AKC의 아나톨리안 셰퍼드 기준이며 FCI 캉갈 항목과 분리해 읽어야 합니다.",
    },
    story: {
      opening: "아나톨리안 셰퍼드는 아나톨리아 고원의 가혹한 기후와 넓은 목축 환경에서 가축을 지키던 개들을 바탕으로 미국에서 정립된 등록명입니다. 다양한 무리와 환경을 반영해 모색 범위가 넓고, 큰 몸에도 민첩한 윤곽이 특징으로 소개됩니다.",
      roleToHome: "가축과 함께 지내며 경계를 스스로 판단한 역사는 오늘의 독립성, 영역 의식과 주변 관찰로 이어질 수 있습니다. 복종 동작을 빠르게 반복시키는 것보다 보호자와의 신뢰, 예측 가능한 경계와 차분한 중단 신호를 만드는 일이 중요합니다.",
      reality: "멋진 외형만으로 선택하기에는 관리 책임이 큽니다. 성견 체격을 감당할 울타리와 리드 장비, 방문객 동선, 다른 동물과의 안전한 거리, 어린 시기의 폭넓고 강압적이지 않은 사회화를 입양 전에 구체적으로 준비해야 합니다.",
    },
    tendencies: {
      activity: { label: "중간", note: "장거리 이동을 견딘 작업 배경이 있어 무리한 반복 달리기보다 꾸준한 걷기와 넓은 냄새 탐색이 필요합니다." },
      mentalStimulation: { label: "높은 편", note: "주변을 살피고 선택할 수 있는 탐색, 경계에서 물러나는 연습과 보호자에게 돌아오는 과제를 구성하세요." },
      independence: { label: "높은 편", note: "혼자 판단해 가축을 지킨 배경이 강해 명령 반복보다 일관된 기준과 신뢰 형성이 중요합니다." },
      socialConnection: { label: "개체별 확인 필요", note: "가족에 대한 충실함과 낯선 대상에 대한 유보적인 태도가 함께 나타날 수 있어 실제 거리 반응을 확인해야 합니다." },
      alerting: { label: "높은 편", note: "영역과 움직임의 변화를 빠르게 감지할 수 있어 방문객 동선과 중단 신호를 생활 속에서 준비해야 합니다." },
      grooming: { label: "중간", note: "짧거나 중간 길이의 이중모는 정기적인 빗질이 필요하며 계절 털갈이에는 빈도를 늘려야 합니다." },
    },
    careNotes: [
      "성견의 힘을 고려해 높은 울타리와 이중 출입문, 튼튼한 리드 장비를 준비하고 마당만으로 운동을 대신하지 마세요.",
      "방문객과 다른 동물을 갑자기 가까이 붙이지 말고 충분한 거리에서 관찰한 뒤 보호자에게 돌아오는 연습을 반복하세요.",
      "어린 시기부터 다양한 사람·소리·장소를 강요 없이 경험하게 하되, 독립적인 경계 행동을 벌로 억누르기보다 안전한 대안을 알려주세요.",
    ],
    healthEditorialNote: "건강 정보는 품종명만으로 질환을 예측하거나 진단하지 않습니다. 초대형견의 성장 속도와 체중, 관절·보행 상태는 수의사와 개별적으로 확인하세요.",
    daySnapshot: [
      { time: "탐색", title: "넓게 냄새 맡으며 걷기", description: "속도를 재촉하기보다 주변을 살피고 보호자에게 돌아오는 리듬을 만들어요." },
      { time: "휴식", title: "경계에서 떨어져 쉬기", description: "현관과 창문을 계속 지키지 않아도 되는 조용한 휴식 자리를 마련해요." },
      { time: "관리", title: "출입 동선과 장비 점검", description: "문과 울타리, 리드 연결부를 확인하고 짧은 중단 신호 연습으로 마무리해요." },
    ],
    related: [
      { slug: "kangal-shepherd-dog", reason: "아나톨리아의 가축보호견이라는 배경은 겹치지만 AKC와 FCI가 사용하는 등록명·표준 범위는 같다고 단정할 수 없어요." },
      { slug: "central-asian-shepherd-dog", reason: "독립적인 가축보호 작업과 큰 체격을 공유하지만 지역적 형성과 외형 표준의 차이를 함께 살펴보세요." },
      { slug: "caucasian-shepherd-dog", reason: "강한 경계 본능을 생활에서 다루는 책임은 비슷하지만 피모와 체형, 작업 환경이 달라요." },
    ],
    sources: [
      { title: "Anatolian Shepherd Dog Breed Information", organization: "American Kennel Club (AKC)", url: "https://www.akc.org/dog-breeds/anatolian-shepherd-dog/", checkedAt },
      { title: "Anatolian Shepherd Dog History", organization: "American Kennel Club (AKC)", url: "https://www.akc.org/expert-advice/dog-breeds/anatolian-shepherd-dog-history/", checkedAt },
      { title: "Kangal Shepherd Dog — FCI Standard No. 331", organization: "Fédération Cynologique Internationale (FCI)", url: "https://www.fci.be/en/nomenclature/KANGAL-SHEPHERD-DOG-331.html", checkedAt },
    ],
  },
] satisfies Breed[];
