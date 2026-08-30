import { standardBreedDetailSchema } from "./schema";

export const icelandicSheepdogDetail = standardBreedDetailSchema.parse({
  slug: "icelandic-sheepdog",
  nameKo: "아이슬란딕 시프도그",
  metadataDescription: "아이슬란드 농장에서 양과 말을 모으고 흩어진 가축을 소리로 알리던 아이슬란딕 시프도그의 배경과 오늘의 방향 과제, 발성 전환, 이중모 관리를 살펴봅니다.",
  heroStatement: "아이슬란드의 거친 농경지에서 양과 말을 모으고 흩어진 가축의 위치를 소리로 알리던 목양 스피츠예요.",
  story: {
    title: "아이슬란딕 시프도그의 밝은 목소리는 어떤 일에서 시작됐을까요?",
    description: "가축을 찾고 이동을 알리던 역할을 오늘의 방향 협력과 차분한 휴식으로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "바람 센 농장에서 양과 말을 모으고 뒤처진 가축을 찾아 알렸어요.",
        body: "아이슬란딕 시프도그는 목자와 함께 거친 지형을 오가며 가축의 방향을 바꾸고, 멀어진 개체를 발견하면 목소리로 위치를 전했어요.",
        image: "/illustrations/v3/icelandic-sheepdog-history.webp",
        imageAlt: "아이슬란드의 바람 부는 농경지에서 목자와 함께 양과 말을 모으는 성견 아이슬란딕 시프도그 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "움직이는 대상을 쫓기 전에 사람의 방향 신호를 확인하게 해요.",
        body: "낮은 표식 세 개 바깥을 돌다가 보호자의 몸 방향을 보고 안쪽 길로 돌아오는 짧은 순서를 알려주세요.",
        image: "/illustrations/v4/icelandic-sheepdog-feature-marker-return.webp",
        imageAlt: "울타리 안에서 낮은 표식 바깥을 돌다가 보호자의 방향 신호를 보고 돌아오는 성견 아이슬란딕 시프도그 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "움직임이 끝난 뒤에도 주변을 알리지 않도록 쉬는 순서를 만들어요.",
        body: "표식과 긴 줄을 수납한 뒤 창에서 떨어진 매트로 이동해, 바깥 움직임을 계속 확인하지 않고 몸을 낮추는 흐름을 반복해주세요.",
        image: "/illustrations/v4/icelandic-sheepdog-feature-route-to-rest.webp",
        imageAlt: "보호자가 표식과 긴 줄을 수납하는 동안 창에서 떨어진 매트에 쉬는 성견 아이슬란딕 시프도그 삽화",
      },
    ],
    caution: "목양 배경이 모든 개체의 발성이나 움직임 추적을 뜻하지는 않아요. 반응의 크기와 회복 속도는 경험과 환경에 따라 달라요.",
  },
  realitiesTitle: "함께 살면 목소리와 북방 피모를 어떻게 관리할까요?",
  realities: [
    {
      id: "door-alert-return",
      title: "현관 소리를 확인하면 문 앞으로 달려가기보다 사람에게 돌아오게 해요.",
      body: "초인종이나 복도 소리가 들릴 때 문과 떨어진 표식에서 보호자를 바라보는 행동을 보상하고, 방문객 동선은 안전문으로 나눠주세요.",
      image: "/illustrations/v4/icelandic-sheepdog-feature-door-alert-return.webp",
      imageAlt: "닫힌 현관문과 안전문에서 떨어진 바닥 표식 위에서 보호자를 바라보는 성견 아이슬란딕 시프도그 삽화",
    },
    {
      id: "weather-coat-care",
      title: "풍성한 털은 비와 진흙 뒤 속털과 발까지 나누어 살펴요.",
      body: "겉만 닦고 끝내지 말고 겨드랑이와 꼬리 아래의 젖은 속털을 말린 뒤, 발가락 사이에 낀 작은 자갈과 진흙도 확인해주세요.",
      image: "/illustrations/v4/icelandic-sheepdog-feature-weather-coat-care.webp",
      imageAlt: "현관 매트에서 보호자가 젖은 성견 아이슬란딕 시프도그의 속털과 발가락 사이를 확인하는 삽화",
    },
  ],
  readinessTitle: "아이슬란딕 시프도그와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기와 방향 과제를 제공하고 끝난 뒤 조용히 쉬는 흐름까지 알려줄 수 있나요?",
    "현관과 창밖 움직임을 알릴 때 안전문과 사람에게 돌아오는 자리를 마련할 수 있나요?",
    "비와 털갈이 뒤 촘촘한 속털과 발을 나누어 확인하고 완전히 말릴 수 있나요?",
  ],
  relatedTitle: "목소리를 쓰는 북유럽 견종도 역할은 서로 달라요.",
  relatedDescription: "사냥감의 위치를 알린 견종과 가축의 이동을 전한 견종을 같은 발성만으로 묶지 말고 비교해보세요.",
  relatedDifferences: {
    "finnish-spitz": "둘 다 북유럽 스피츠이고 목소리를 많이 활용하지만 핀니시 스피츠는 나무 위 새를 알린 사냥견이고 아이슬란딕 시프도그는 가축을 모은 목양견이에요.",
    "shetland-sheepdog": "섬 환경의 목양과 알림은 닮았지만 아이슬란딕 시프도그는 말린 꼬리와 북방 스피츠형 이중모가 뚜렷해요.",
  },
});

export const dutchShepherdDogDetail = standardBreedDetailSchema.parse({
  slug: "dutch-shepherd-dog",
  nameKo: "더치 셰퍼드 독",
  metadataDescription: "네덜란드 농경지에서 양 떼가 작물로 들어가지 않도록 경계를 오가던 더치 셰퍼드 독의 역할과 오늘의 경계선 과제, 자전거 거리, 피모 변종 관리를 살펴봅니다.",
  heroStatement: "네덜란드 농경지의 길과 밭 경계를 오가며 양 떼가 작물 안으로 들어가지 않게 하던 다목적 목양견이에요.",
  story: {
    title: "더치 셰퍼드 독은 왜 밭의 경계를 오래 오갔을까요?",
    description: "농작물과 양 떼 사이를 지키던 움직임을 오늘의 선 따라 걷기와 휴식으로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "양 떼가 농작물로 들어가지 않도록 길과 밭 사이를 순찰했어요.",
        body: "더치 셰퍼드 독은 양의 이동을 조절하는 일뿐 아니라 젖소를 모으고 농장 변화를 알리는 여러 작업을 맡았어요.",
        image: "/illustrations/v3/dutch-shepherd-dog-history.webp",
        imageAlt: "네덜란드 농경지에서 목자와 함께 밭 경계를 따라 양 떼의 이동을 조절하는 브린들 성견 더치 셰퍼드 독 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "달리는 양을 대신해 두 선 사이에서 속도와 방향을 바꿔요.",
        body: "평행한 두 줄 사이를 걷다가 보호자의 정지 신호에서 멈추고, 다른 색 표식 쪽으로 방향을 바꾸는 협력 과제를 짧게 진행해주세요.",
        image: "/illustrations/v4/dutch-shepherd-dog-feature-boundary-switch.webp",
        imageAlt: "울타리 안 두 평행선 사이에서 보호자의 정지 신호를 보고 다른 색 표식으로 방향을 바꾸는 브린들 성견 더치 셰퍼드 독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "과제가 끝났다는 단서가 보여야 스스로 다음 움직임을 만들지 않아요.",
        body: "바닥 줄과 표식을 닫힌 상자에 넣고 물을 마신 뒤, 출입구에서 떨어진 넓은 매트에 옆으로 눕는 순서를 일정하게 유지해주세요.",
        image: "/illustrations/v4/dutch-shepherd-dog-feature-boundary-to-rest.webp",
        imageAlt: "보호자가 바닥 줄과 표식을 상자에 넣는 동안 출입구에서 떨어진 매트에 눕는 브린들 성견 더치 셰퍼드 독 삽화",
      },
    ],
    caution: "농장 작업 배경이 모든 개체의 몰이나 경계를 보장하지 않아요. 집중 강도와 낯선 움직임에 대한 반응은 개체별로 확인해야 해요.",
  },
  realitiesTitle: "높은 작업 집중을 일상에서 어디에 먼저 써야 할까요?",
  realities: [
    {
      id: "cyclist-side-path",
      title: "자전거를 따라가게 두기 전에 옆길로 빠지는 선택을 알려줘요.",
      body: "자전거가 보이면 넓은 화단 뒤나 갈라진 길로 먼저 이동하고, 바퀴 대신 보호자의 낮은 표식을 확인하면 보상해주세요.",
      image: "/illustrations/v4/dutch-shepherd-dog-feature-cyclist-side-path.webp",
      imageAlt: "공원의 갈라진 옆길에서 멀리 지나가는 자전거 대신 보호자의 낮은 표식을 보는 브린들 성견 더치 셰퍼드 독 삽화",
    },
    {
      id: "coat-type-care",
      title: "단모·장모·거친 털은 같은 브린들이어도 손질 방식이 달라요.",
      body: "실제 피모 변종을 먼저 확인하고 단모는 빠진 속털, 장모는 장식털 엉킴, 거친 털은 결을 해치지 않는 전문 관리 계획을 세워주세요.",
      image: "/illustrations/v4/dutch-shepherd-dog-feature-coat-type-care.webp",
      imageAlt: "세 가지 피모 도구가 정리된 매트에서 보호자가 거친 털 브린들 성견 더치 셰퍼드 독의 털 결을 확인하는 삽화",
    },
  ],
  readinessTitle: "더치 셰퍼드 독과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "긴 산책만 반복하지 않고 방향·정지·냄새 과제를 섞어 집중을 안전하게 사용할 수 있나요?",
    "자전거와 달리는 사람을 따라가기 전에 옆길과 충분한 거리를 선택할 수 있나요?",
    "실제 피모 변종을 확인하고 그에 맞는 빗질과 전문 관리 시간을 마련할 수 있나요?",
  ],
  relatedTitle: "비슷한 셰퍼드형 작업견과 무엇이 다를까요?",
  relatedDescription: "작업 강도만 비교하지 말고 농장 경계를 다룬 방식과 피모 변종, 생활 속 회복까지 함께 살펴보세요.",
  relatedDifferences: {
    "german-shepherd-dog": "다목적 작업과 사람과의 협력은 닮았지만 더치 셰퍼드 독은 브린들 색과 세 가지 피모 변종, 네덜란드 농경지 경계 작업이 특징이에요.",
    "belgian-malinois": "빠른 학습과 높은 작업 집중은 닮았지만 말리노이즈는 벨지안 셰퍼드의 단모 변종이고 더치 셰퍼드는 별도 네덜란드 견종이에요.",
  },
});

export const mastiffDetail = standardBreedDetailSchema.parse({
  slug: "mastiff",
  nameKo: "마스티프",
  metadataDescription: "영국의 집과 영지 가까이에서 존재감으로 접근을 막던 마스티프의 경비 배경과 오늘의 자리 이동, 방문객 이중 경계, 초대형견 이동 준비를 살펴봅니다.",
  heroStatement: "영국의 집과 영지 가까이에 머물며 압도적인 크기와 침착한 존재감으로 낯선 접근을 막던 초대형 경비견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별 최소 기준" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 76cm 이상 · 약 73~104kg" },
      { id: "female-size", label: "암컷", value: "체고 70cm 이상 · 약 54~77kg" },
    ],
  },
  story: {
    title: "마스티프의 큰 몸은 오늘의 집에서 어떤 책임이 될까요?",
    description: "영지를 지키던 존재감을 힘으로 밀어붙이지 않고 자리 이동과 안전한 경계로 바꿔봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "집과 재산 가까이에 머물며 낯선 접근을 조용히 막았어요.",
        body: "마스티프는 넓게 뛰어다니기보다 지켜야 할 공간 곁에 서서 주변을 살피고, 큰 체격 자체로 접근을 억제하는 역할을 했어요.",
        image: "/illustrations/v3/mastiff-history.webp",
        imageAlt: "영국 영지의 출입문 가까이에서 관리인과 함께 낯선 접근을 살피는 황갈색 성견 마스티프 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "문을 몸으로 막기 전에 넓은 자리로 이동하는 신호를 익혀요.",
        body: "문이 열리지 않은 상태에서 현관 옆 큰 매트로 천천히 이동하고, 네 발과 몸통이 모두 올라가면 편안히 머무는 연습을 해주세요.",
        image: "/illustrations/v4/mastiff-feature-doorway-mat.webp",
        imageAlt: "닫힌 현관문 옆의 매우 넓은 매트로 천천히 이동해 네 발을 올린 황갈색 성견 마스티프와 보호자 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "짧은 이동도 미끄럽지 않은 길과 충분히 큰 회전 공간이 필요해요.",
        body: "좁은 가구 사이를 비우고 미끄럼 방지 러너를 이어, 큰 몸이 벽과 사람을 밀지 않고 침대까지 돌아갈 수 있는 동선을 확보해주세요.",
        image: "/illustrations/v4/mastiff-feature-wide-home-route.webp",
        imageAlt: "가구 사이 넓은 미끄럼 방지 러너를 따라 큰 침대로 이동하는 황갈색 성견 마스티프와 보호자 삽화",
      },
    ],
    caution: "경비 배경과 큰 체격이 모든 마스티프의 낯선 사람 반응을 뜻하지 않아요. 실제 성향과 이동 능력은 개체별로 확인해야 해요.",
  },
  realitiesTitle: "초대형 체격은 집과 외출 준비를 얼마나 바꿀까요?",
  realities: [
    {
      id: "visitor-double-boundary",
      title: "방문객과 마주치기 전에 닫힌 문과 안전문 두 경계를 사용해요.",
      body: "큰 몸이 한 번 앞으로 움직이면 사람이 막기 어려워요. 방문객이 들어오기 전 별도 방이나 넓은 매트에 머물게 하고 통로를 이중으로 나눠주세요.",
      image: "/illustrations/v4/mastiff-feature-visitor-double-boundary.webp",
      imageAlt: "닫힌 실내문과 안전문 뒤 넓은 매트에서 보호자와 기다리는 황갈색 성견 마스티프 방문객 안전 삽화",
    },
    {
      id: "vehicle-ramp",
      title: "아플 때도 사람이 안아 들 수 없으니 차량 경사로를 미리 익혀요.",
      body: "넓고 완만한 미끄럼 방지 경사로와 큰 차량 공간을 준비하고, 평소에도 천천히 오르고 멈추는 순서를 짧게 반복해주세요.",
      image: "/illustrations/v4/mastiff-feature-vehicle-ramp.webp",
      imageAlt: "주차된 큰 차량의 넓고 완만한 경사로를 보호자와 천천히 오르는 황갈색 성견 마스티프 삽화",
    },
  ],
  readinessTitle: "마스티프와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "성견의 몸 전체가 올라가는 매트와 넓고 미끄럽지 않은 실내 동선을 마련할 수 있나요?",
    "방문객이 오기 전에 닫힌 문과 안전문으로 큰 몸의 접근을 이중으로 관리할 수 있나요?",
    "사람이 들 수 없는 성견을 위해 차량 공간과 넓은 경사로를 미리 준비할 수 있나요?",
  ],
  relatedTitle: "마스티프형 초대형견도 크기와 형성 목적이 달라요.",
  relatedDescription: "무거운 몸이라는 공통점만 보지 말고 최소 체고와 이동 규모, 경비 역할이 형성된 환경을 비교해보세요.",
  relatedDifferences: {
    bullmastiff: "영국의 경비 배경과 검은 마스크는 닮았지만 불마스티프는 마스티프와 불독 계통으로 더 작고 민첩한 영지 경비견으로 형성됐어요.",
    "great-dane": "둘 다 초대형이지만 그레이트 데인은 더 높고 가벼운 윤곽의 사냥·경비 계통이며 마스티프는 깊고 넓은 몸의 묵직한 경비견이에요.",
  },
});

export const softCoatedWheatenTerrierDetail = standardBreedDetailSchema.parse({
  slug: "soft-coated-wheaten-terrier",
  nameKo: "소프트 코티드 휘튼 테리어",
  metadataDescription: "아일랜드 농가에서 해충 수색과 가축 보조, 집 주변 알림을 맡던 소프트 코티드 휘튼 테리어의 배경과 오늘의 냄새 과제, 인사 전환, 밀빛 피모 관리를 살펴봅니다.",
  heroStatement: "아일랜드 소농의 집과 헛간에서 해충을 찾고 가축을 돕고 방문을 알리던 다목적 농장 테리어예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 약 46~48cm · 몸무게 약 16~18kg" },
      { id: "female-size", label: "암컷", value: "체고 약 43~46cm · 몸무게 약 14~16kg" },
    ],
  },
  story: {
    title: "휘튼 테리어는 아일랜드 농가에서 왜 여러 일을 맡았을까요?",
    description: "해충 수색과 알림을 오늘의 닫힌 냄새 과제와 흥분 뒤 휴식으로 나누어 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "작은 농가에서 해충을 찾고 가축과 집 주변을 두루 살폈어요.",
        body: "소프트 코티드 휘튼 테리어는 한 가지 전문 작업보다 설치류 수색, 가축 보조, 낯선 방문 알림을 함께 맡던 생활형 농장견이었어요.",
        image: "/illustrations/v3/soft-coated-wheaten-terrier-history.webp",
        imageAlt: "아일랜드 소농의 헛간에서 농부와 함께 건초 더미 주변을 살피는 밀빛 성견 소프트 코티드 휘튼 테리어 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "빠르게 쫓는 대신 뚜껑 있는 상자의 냄새를 차례로 확인해요.",
        body: "구멍이 난 안전한 상자 세 개 가운데 목표 냄새가 든 하나를 코로 찾고, 앞발로 밀기 전에 보호자를 바라보면 열어주세요.",
        image: "/illustrations/v4/soft-coated-wheaten-terrier-feature-lidded-scent-box.webp",
        imageAlt: "울타리 안에서 구멍 난 뚜껑 상자 세 개의 냄새를 확인한 뒤 보호자를 보는 밀빛 성견 소프트 코티드 휘튼 테리어 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "활기찬 찾기와 놀이 뒤에는 사람에게 달려들지 않고 쉬게 해요.",
        body: "상자와 장난감을 선반에 넣고 낮은 매트에 네 발을 올린 뒤, 물을 마시고 옆으로 눕는 순서를 매번 같게 만들어주세요.",
        image: "/illustrations/v4/soft-coated-wheaten-terrier-feature-search-to-rest.webp",
        imageAlt: "보호자가 냄새 상자와 장난감을 선반에 넣는 동안 낮은 매트에 옆으로 눕는 밀빛 성견 소프트 코티드 휘튼 테리어 삽화",
      },
    ],
    caution: "다목적 농장견이라는 배경이 모든 개체의 추적이나 친화성을 뜻하지 않아요. 흥분의 크기와 낯선 대상 반응은 개체별로 달라요.",
  },
  realitiesTitle: "밝고 부드러운 인상 뒤에 어떤 생활 관리가 필요할까요?",
  realities: [
    {
      id: "visitor-four-paws",
      title: "반가움이 점프로 이어지기 전에 네 발을 둘 자리를 보여줘요.",
      body: "방문객이 들어오기 전 안전문 안쪽 매트에서 네 발을 유지하게 하고, 사람이 먼저 몸을 숙이거나 손을 뻗지 않도록 안내해주세요.",
      image: "/illustrations/v4/soft-coated-wheaten-terrier-feature-visitor-four-paws.webp",
      imageAlt: "안전문 안쪽 매트에 네 발을 둔 밀빛 성견 소프트 코티드 휘튼 테리어와 문 밖에서 기다리는 방문객 삽화",
    },
    {
      id: "soft-coat-combing",
      title: "부드러운 밀빛 털은 겉만 빗으면 안쪽 엉킴이 남아요.",
      body: "털을 작은 구역으로 나누어 피부부터 끝까지 빗고, 겨드랑이와 수염에 남은 습기와 음식물을 확인한 뒤 완전히 말려주세요.",
      image: "/illustrations/v4/soft-coated-wheaten-terrier-feature-soft-coat-combing.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 밀빛 성견 소프트 코티드 휘튼 테리어의 겨드랑이 털과 수염을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "소프트 코티드 휘튼 테리어와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기와 안전한 냄새 찾기를 제공하고 놀이 뒤 차분히 쉬는 순서를 만들 수 있나요?",
    "반가운 사람에게 뛰어오르기 전에 안전문 안쪽 매트에서 네 발을 유지하게 도울 수 있나요?",
    "부드러운 털을 피부부터 나누어 빗고 수염과 겨드랑이의 습기를 매일 확인할 수 있나요?",
  ],
  relatedTitle: "아일랜드 테리어도 피모와 농장 역할이 서로 달라요.",
  relatedDescription: "테리어의 활기만 묶지 말고 어떤 농장 일을 맡았는지와 털의 촉감, 손질 방식까지 비교해보세요.",
  relatedDifferences: {
    "kerry-blue-terrier": "아일랜드 농장 테리어의 다목적성은 닮았지만 케리 블루는 성숙하며 청회색이 되는 곱슬 피모와 다른 손질 윤곽을 가졌어요.",
    "airedale-terrier": "해충 수색과 여러 작업을 맡은 점은 닮았지만 에어데일은 더 크고 거친 와이어 코트를 가진 영국 수변 테리어예요.",
  },
});

export const otterhoundDetail = standardBreedDetailSchema.parse({
  slug: "otterhound",
  nameKo: "오터하운드",
  metadataDescription: "중세 영국에서 육지와 물을 오가며 수달의 흔적을 추적하던 오터하운드의 배경과 오늘의 물가 냄새 과제, 출입 안전, 거친 방수성 피모와 귀 관리를 살펴봅니다.",
  heroStatement: "영국의 강과 둑을 오가며 수달의 냄새 흔적을 오래 추적하도록 만들어진 크고 거친 털의 후각 하운드예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 약 69cm · 몸무게 약 52kg" },
      { id: "female-size", label: "암컷", value: "체고 약 61cm · 몸무게 약 36kg" },
    ],
  },
  story: {
    title: "오터하운드는 왜 강물과 둑 양쪽의 냄새를 따라갔을까요?",
    description: "현재는 금지된 수달 사냥의 역사를 미화하지 않고 안전한 물가 탐색과 회복으로 바꿔봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "강둑에서 시작한 냄새를 물속에서도 놓치지 않고 추적했어요.",
        body: "오터하운드는 큰 발과 거친 방수성 피모로 육지와 물을 오가며 수달의 흔적을 따라가던 영국의 무리 사냥 하운드였어요.",
        image: "/illustrations/v3/otterhound-history.webp",
        imageAlt: "중세 영국의 넓은 강둑에서 사냥꾼과 함께 물가 냄새를 추적하는 거친 털 성견 오터하운드 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "야생동물 대신 얕은 물의 향 주머니를 찾아 낮은 출구로 돌아와요.",
        body: "안전한 얕은 물에 띄운 냄새 주머니를 긴 줄 안에서 찾고, 정해진 완만한 출구로 나온 뒤 보호자에게 코를 돌리게 해주세요.",
        image: "/illustrations/v4/otterhound-feature-water-scent-return.webp",
        imageAlt: "울타리 친 얕은 물에서 향 주머니를 찾은 뒤 낮은 출구로 보호자에게 돌아오는 거친 털 성견 오터하운드 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "물에서 나온 큰 몸과 젖은 수염을 말리는 시간까지 활동에 포함해요.",
        body: "물가 장비를 치운 뒤 넓은 흡수 매트에서 발과 배, 수염의 물기를 차례로 닦고 완전히 마른 자리에서 쉬게 해주세요.",
        image: "/illustrations/v4/otterhound-feature-water-to-dry-rest.webp",
        imageAlt: "넓은 흡수 매트에서 보호자가 젖은 성견 오터하운드의 발과 배와 수염을 닦는 물놀이 뒤 휴식 삽화",
      },
    ],
    caution: "과거 수달 사냥은 오늘날 재현할 생활 과제가 아니에요. 물과 냄새를 따르는 강도, 돌아오는 반응은 개체에 따라 달라요.",
  },
  realitiesTitle: "큰 후각 하운드가 물 밖의 집에서는 어떤 책임을 만들까요?",
  realities: [
    {
      id: "scent-door-buffer",
      title: "좋은 냄새가 문밖에 있어도 한 번에 빠져나가지 못하게 해요.",
      body: "현관과 마당문 사이에 두 번째 안전문을 두고, 바깥 냄새를 확인한 뒤 보호자에게 돌아와야 바깥문이 열리는 순서를 알려주세요.",
      image: "/illustrations/v4/otterhound-feature-scent-door-buffer.webp",
      imageAlt: "현관 바깥 냄새를 맡지만 두 번째 안전문 안에서 보호자에게 돌아선 거친 털 성견 오터하운드 삽화",
    },
    {
      id: "ear-beard-foot-care",
      title: "긴 귀와 수염, 큰 발은 물과 산책 뒤 함께 말려요.",
      body: "귀 안에 물기가 남지 않았는지 보고 수염을 눌러 말린 뒤, 넓은 발가락 사이의 진흙과 작은 이물질을 하나씩 확인해주세요.",
      image: "/illustrations/v4/otterhound-feature-ear-beard-foot-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 성견 오터하운드의 긴 귀와 수염과 큰 발을 차례로 말리는 삽화",
    },
  ],
  readinessTitle: "오터하운드와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "큰 몸이 안전하게 냄새를 따라갈 긴 줄과 울타리 친 물가 환경을 마련할 수 있나요?",
    "현관과 마당문을 이중으로 나누고 바깥문이 열리기 전 사람에게 돌아오게 할 수 있나요?",
    "물과 산책 뒤 긴 귀·수염·거친 피모와 큰 발을 완전히 말리고 확인할 수 있나요?",
  ],
  relatedTitle: "냄새를 오래 따르는 대형 하운드도 지형과 몸이 달라요.",
  relatedDescription: "추적 시간만 비교하지 말고 물을 오간 몸의 구조와 귀·피모 관리, 안전한 출입 조건을 함께 보세요.",
  relatedDifferences: {
    bloodhound: "강한 장거리 후각과 긴 귀는 닮았지만 오터하운드는 물을 오가기 위한 거친 이중모와 넓은 발, 수영 배경이 두드러져요.",
    "basset-hound": "냄새를 천천히 이어가는 점은 닮았지만 바셋 하운드는 낮고 긴 몸이며 오터하운드는 물과 둑을 오간 훨씬 큰 장각 하운드예요.",
  },
});

export const belgianLaekenoisDetail = standardBreedDetailSchema.parse({
  slug: "belgian-laekenois",
  nameKo: "라케노이즈",
  metadataDescription: "벨기에 라컨 지역에서 양 떼와 들판에 말리던 리넨을 지키던 라케노이즈의 배경과 오늘의 천 경계 과제, 방문객 거리, 거친 피모 관리를 살펴봅니다.",
  heroStatement: "벨기에 라컨 지역에서 가축을 돌보고 들판에 펼쳐 말리던 리넨을 지키던 거친 털의 벨지안 셰퍼드예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 약 60~66cm · 몸무게 약 25~30kg" },
      { id: "female-size", label: "암컷", value: "체고 약 56~62cm · 몸무게 약 20~25kg" },
    ],
  },
  story: {
    title: "라케노이즈는 다른 벨지안 셰퍼드와 무엇이 달랐을까요?",
    description: "공통 목양 배경 안에서도 리넨을 지킨 지역 역할과 거친 털을 오늘의 생활로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "양 떼를 돌보고 들판에 펼친 리넨 가까이의 변화를 살폈어요.",
        body: "라케노이즈는 벨기에 라컨 지역의 목양견으로, 가축을 지키는 일과 함께 햇볕에 말리던 리넨 주변을 감시한 기록으로 알려져 있어요.",
        image: "/illustrations/v3/belgian-laekenois-history.webp",
        imageAlt: "벨기에 라컨의 들판에서 목자와 함께 양 떼와 펼쳐 말리는 리넨 주변을 살피는 거친 황갈색 성견 라케노이즈 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "흔들리는 천을 붙잡기보다 표시된 바깥 경계를 따라 돌아요.",
        body: "낮게 고정한 천 두 장에서 충분히 떨어진 표식 바깥을 걷고, 바람에 천이 움직일 때 보호자의 방향 신호로 돌아오는 과제를 진행해주세요.",
        image: "/illustrations/v4/belgian-laekenois-feature-cloth-boundary.webp",
        imageAlt: "울타리 안 고정된 천에서 떨어진 표식 바깥을 걷다가 보호자의 방향 신호를 보는 거친 황갈색 성견 라케노이즈 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "바람과 움직임을 확인한 뒤 집 안의 정해진 자리로 돌아오게 해요.",
        body: "천과 표식을 접어 닫힌 상자에 넣고 창가 가림막을 내린 뒤, 출입구에서 떨어진 매트에서 몸을 낮추는 순서를 반복해주세요.",
        image: "/illustrations/v4/belgian-laekenois-feature-cloth-to-rest.webp",
        imageAlt: "보호자가 천과 표식을 상자에 정리하는 동안 출입구에서 떨어진 매트에서 쉬는 거친 황갈색 성견 라케노이즈 삽화",
      },
    ],
    caution: "리넨 감시 기록과 목양 배경이 모든 라케노이즈의 경계 반응을 뜻하지 않아요. 낯선 움직임과 사람에 대한 반응은 개체마다 달라요.",
  },
  realitiesTitle: "희귀한 외형보다 먼저 어떤 생활 조건을 봐야 할까요?",
  realities: [
    {
      id: "visitor-observation-distance",
      title: "낯선 사람을 바로 판단하게 두지 말고 관찰 거리를 먼저 만들어요.",
      body: "방문객 동선과 개의 자리를 안전문으로 나누고, 다가가기보다 보호자를 확인하거나 냄새 매트로 이동하는 선택을 보상해주세요.",
      image: "/illustrations/v4/belgian-laekenois-feature-visitor-distance.webp",
      imageAlt: "안전문 안쪽 냄새 매트에서 보호자를 확인하며 멀리 선 방문객과 거리를 둔 거친 황갈색 성견 라케노이즈 삽화",
    },
    {
      id: "rough-coat-care",
      title: "헝클어진 듯한 거친 털의 결을 과도하게 매끈하게 만들지 않아요.",
      body: "빠진 속털과 수염의 이물질을 나누어 확인하고, 피모의 거친 질감을 유지하는 손질 방식과 시기는 전문 관리사와 계획해주세요.",
      image: "/illustrations/v4/belgian-laekenois-feature-rough-coat-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 거친 황갈색 성견 라케노이즈의 수염과 몸통 털을 손으로 나누어 확인하는 삽화",
    },
  ],
  readinessTitle: "라케노이즈와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "바람에 움직이는 천과 사람을 쫓기 전에 경계 바깥을 걷고 돌아오는 과제를 제공할 수 있나요?",
    "방문객과 바로 마주치지 않도록 안전문과 냄새 매트로 충분한 관찰 거리를 만들 수 있나요?",
    "거친 피모의 결을 유지하며 속털과 수염을 관리할 전문 손질 계획을 세울 수 있나요?",
  ],
  relatedTitle: "벨지안 셰퍼드 네 변종은 털만 다른 복사본이 아니에요.",
  relatedDescription: "공통된 체형과 목양 배경 위에서 지역 기록과 피모 질감, 생활 관리가 어떻게 달라지는지 비교해보세요.",
  relatedDifferences: {
    "belgian-malinois": "같은 황갈색 계열과 높은 협력 성향은 닮았지만 말리노이즈는 짧은 털이고 라케노이즈는 헝클어진 거친 털과 라컨 지역 기록이 특징이에요.",
    "belgian-tervueren": "같은 벨지안 셰퍼드 계통이지만 테르뷰런은 풍성한 장모이고 라케노이즈는 거칠고 건조한 피모를 별도로 관리해야 해요.",
  },
});

export const czechoslovakianWolfdogDetail = standardBreedDetailSchema.parse({
  slug: "czechoslovakian-wolfdog",
  nameKo: "체코슬로바키안 울프독",
  metadataDescription: "1950년대 체코슬로바키아 국경 순찰 연구에서 형성된 체코슬로바키안 울프독의 배경과 오늘의 긴 경로 협력, 이중 출입 안전, 계절성 피모 관리를 살펴봅니다.",
  heroStatement: "1950년대 체코슬로바키아 군의 국경 순찰 연구에서 지구력과 작업 능력을 목표로 형성된 견종이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별 최소 기준" },
      { label: "몸무게", value: "성별 최소 기준" },
    ],
    detailsLabel: "성별 최소 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 65cm 이상 · 몸무게 26kg 이상" },
      { id: "female-size", label: "암컷", value: "체고 60cm 이상 · 몸무게 20kg 이상" },
    ],
  },
  story: {
    title: "체코슬로바키안 울프독은 어떤 목적으로 형성됐을까요?",
    description: "군사 연구 배경을 과장하지 않고 오늘의 긴 거리 협력과 안전한 귀가로 연결해 봐요.",
    steps: [
      {
        navLabel: "형성의 배경",
        eyebrow: "1단계 · 어디에서 출발했을까?",
        title: "독일 셰퍼드와 카르파티아 늑대 계통을 국경 순찰 연구에 활용했어요.",
        body: "1950년대 체코슬로바키아에서 지구력과 환경 적응, 작업 가능성을 살피는 군사 실험이 진행됐고 이후 별도 견종으로 정립됐어요.",
        image: "/illustrations/v3/czechoslovakian-wolfdog-history.webp",
        imageAlt: "1950년대 체코슬로바키아 산악 국경 길에서 군인과 함께 이동하는 회색 성견 체코슬로바키안 울프독 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "긴 길을 곧장 벗어나기보다 표식마다 사람을 다시 확인해요.",
        body: "높은 울타리 안 긴 S자 길을 걷고 각 표식에서 보호자를 바라본 뒤, 마지막 표식에서는 왔던 길로 함께 돌아오게 해주세요.",
        image: "/illustrations/v4/czechoslovakian-wolfdog-feature-long-route-checkin.webp",
        imageAlt: "높은 울타리 안 긴 S자 표식 길에서 보호자를 돌아보는 회색 성견 체코슬로바키안 울프독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "밖의 경로가 끝나면 이중문을 지나 장비를 벗고 혼자 쉴 시간을 줘요.",
        body: "바깥문을 닫은 뒤 안쪽 문을 열고 긴 줄과 하네스를 정리한 다음, 사람 통행에서 떨어진 큰 매트에서 방해받지 않게 쉬도록 해주세요.",
        image: "/illustrations/v4/czechoslovakian-wolfdog-feature-double-door-rest.webp",
        imageAlt: "닫힌 바깥문과 안쪽 안전문을 지나 보호자가 긴 줄을 정리하는 동안 큰 매트에서 쉬는 회색 성견 체코슬로바키안 울프독 삽화",
      },
    ],
    caution: "형성 과정의 늑대 계통을 오늘의 행동 예측으로 단순화하면 안 돼요. 실제 사회성, 회복과 사람 협력은 경험과 개체에 따라 달라요.",
  },
  realitiesTitle: "늑대 같은 외형보다 먼저 어떤 안전 조건을 확인할까요?",
  realities: [
    {
      id: "secure-perimeter",
      title: "높이만 큰 울타리보다 문·아래 틈·모서리까지 이어진 경계를 만들어요.",
      body: "울타리 아래를 단단히 막고 모서리에 발판이 될 물건을 두지 않으며, 출입문은 한쪽이 닫힌 뒤 다른 쪽이 열리는 구조로 관리해주세요.",
      image: "/illustrations/v4/czechoslovakian-wolfdog-feature-secure-perimeter.webp",
      imageAlt: "아래 틈이 막힌 높은 울타리와 이중 출입문 안에서 보호자 곁에 선 회색 성견 체코슬로바키안 울프독 삽화",
    },
    {
      id: "seasonal-coat-handling",
      title: "계절성 속털을 다룰 때 몸을 붙잡기보다 짧은 협력부터 만들어요.",
      body: "옆구리 한 구역을 빗고 간식을 둔 손에서 스스로 물러나 쉬게 하는 순서를 반복해, 많은 속털을 한 번에 끝내려 하지 마세요.",
      image: "/illustrations/v4/czechoslovakian-wolfdog-feature-coat-handling.webp",
      imageAlt: "넓은 매트에서 보호자가 회색 성견 체코슬로바키안 울프독의 옆구리 속털 한 구역을 짧게 빗는 삽화",
    },
  ],
  readinessTitle: "체코슬로바키안 울프독과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "긴 거리 활동 중 여러 번 보호자를 확인하고 함께 돌아오는 과정을 꾸준히 만들 수 있나요?",
    "아래 틈과 모서리까지 막힌 높은 울타리와 순차적으로 여는 이중문을 마련할 수 있나요?",
    "접촉을 강요하지 않고 많은 계절성 속털을 짧은 협력 단위로 관리할 수 있나요?",
  ],
  relatedTitle: "셰퍼드형 외모와 지구력만으로 같은 생활을 예상하면 안 돼요.",
  relatedDescription: "형성 목적과 독립적인 이동 범위, 울타리와 접촉 관리처럼 실제 생활 조건을 먼저 비교해보세요.",
  relatedDifferences: {
    "german-shepherd-dog": "독일 셰퍼드 계통의 작업 능력이 형성에 쓰였지만 체코슬로바키안 울프독은 별도 군사 연구와 늑대 계통을 거쳐 다른 사회·환경 관리가 필요해요.",
    "siberian-husky": "지구력과 넓게 이동하려는 경향은 닮을 수 있지만 허스키는 북방 운송견이고 체코슬로바키안 울프독은 국경 순찰 연구에서 형성됐어요.",
  },
});

export const bouvierDesFlandresDetail = standardBreedDetailSchema.parse({
  slug: "bouvier-des-flandres",
  nameKo: "부비에 데 플랑드르",
  metadataDescription: "플랑드르 농장에서 소를 막아 방향을 바꾸고 수레를 끌며 농장을 지키던 부비에 데 플랑드르의 배경과 오늘의 차단 과제, 현관 동선, 거친 피모 관리를 살펴봅니다.",
  heroStatement: "플랑드르 농장에서 선두 소의 길을 막아 무리 방향을 바꾸고 수레와 경비 일까지 맡던 거친 털의 대형 농장견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 약 62~68cm · 몸무게 약 35~40kg" },
      { id: "female-size", label: "암컷", value: "체고 약 59~65cm · 몸무게 약 27~35kg" },
    ],
  },
  story: {
    title: "부비에는 소의 뒤를 쫓기보다 왜 앞길을 막았을까요?",
    description: "플랑드르의 소몰이 방식을 오늘의 차단·우회 협력과 큰 몸의 휴식으로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "선두 소의 앞길을 막고 몸의 위치로 무리 방향을 바꿨어요.",
        body: "부비에 데 플랑드르는 소를 몰고 수레를 끌고 농장을 지키는 여러 일을 맡았으며, 소의 앞을 차단하는 방식으로 이동을 조절했어요.",
        image: "/illustrations/v3/bouvier-des-flandres-history.webp",
        imageAlt: "플랑드르 농장에서 농부와 함께 선두 소의 앞길을 막아 무리 방향을 바꾸는 거친 검회색 성견 부비에 데 플랑드르 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "큰 공을 들이받지 않고 옆길을 막은 뒤 사람에게 돌아와요.",
        body: "천천히 굴러오는 큰 빈 운동 공과 떨어진 표식에 서서 진행 방향을 가로막고, 보호자의 신호에 맞춰 옆으로 빠지는 순서를 알려주세요.",
        image: "/illustrations/v4/bouvier-des-flandres-feature-block-and-yield.webp",
        imageAlt: "울타리 안에서 천천히 굴러오는 큰 빈 운동 공의 옆길을 막은 뒤 보호자에게 돌아가는 거친 검회색 성견 부비에 데 플랑드르 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "힘을 쓴 뒤에는 공과 줄을 치우고 넓은 통로에서 몸을 풀어요.",
        body: "공을 고정해 수납하고 줄을 걸어 둔 뒤, 가구와 벽에 부딪히지 않는 넓은 러너를 따라 천천히 매트로 이동하게 해주세요.",
        image: "/illustrations/v4/bouvier-des-flandres-feature-work-to-rest.webp",
        imageAlt: "보호자가 큰 운동 공과 줄을 수납하는 동안 넓은 러너를 따라 매트로 이동하는 거친 검회색 성견 부비에 데 플랑드르 삽화",
      },
    ],
    caution: "소몰이와 경비 배경이 모든 개체의 차단 행동이나 낯선 사람 반응을 뜻하지 않아요. 힘과 거리 조절은 실제 개체를 보고 판단해야 해요.",
  },
  realitiesTitle: "거친 농장견의 큰 몸은 집 안에서 어디에 드러날까요?",
  realities: [
    {
      id: "doorway-watch-place",
      title: "현관과 계단을 지키는 자리가 가족의 통로를 막지 않게 해요.",
      body: "문과 계단 사이가 아닌 옆 벽에 큰 매트를 두고, 사람이 지나갈 때 몸으로 길을 막기보다 그 자리에서 관찰하도록 알려주세요.",
      image: "/illustrations/v4/bouvier-des-flandres-feature-doorway-watch-place.webp",
      imageAlt: "현관과 계단 통로 옆 큰 매트에 누워 가족이 지나갈 길을 비운 거친 검회색 성견 부비에 데 플랑드르 삽화",
    },
    {
      id: "beard-harsh-coat-care",
      title: "수염의 물기와 거친 이중모 속 엉킴을 서로 따로 확인해요.",
      body: "물을 마신 뒤 수염을 눌러 닦고, 몸통 털은 작은 구역으로 갈라 피부 가까운 속털과 발가락 사이 이물질까지 살펴주세요.",
      image: "/illustrations/v4/bouvier-des-flandres-feature-beard-coat-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 거친 검회색 성견 부비에 데 플랑드르의 젖은 수염과 몸통 속털을 나누어 관리하는 삽화",
    },
  ],
  readinessTitle: "부비에 데 플랑드르와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "큰 몸으로 길을 막는 대신 옆 표식으로 물러나 사람에게 돌아오는 협력을 알려줄 수 있나요?",
    "현관과 계단 통로를 비우고 성견 전체가 쉬는 넓은 매트와 미끄럼 방지 동선을 둘 수 있나요?",
    "물을 마신 뒤 수염과 거친 이중모의 안쪽 엉킴을 나누어 관리할 수 있나요?",
  ],
  relatedTitle: "거친 털의 유럽 농장견도 소를 다룬 방식이 달라요.",
  relatedDescription: "외형의 수염만 보지 말고 소몰이 위치와 수레 작업, 큰 몸이 집 안 통로에 만드는 차이를 비교해보세요.",
  relatedDifferences: {
    "giant-schnauzer": "거친 털과 큰 농장 경비견이라는 인상은 닮았지만 부비에는 소의 앞을 막는 목양과 수레 작업이 중심이었어요.",
    briard: "프랑스·벨기에권의 큰 목양견이라는 점은 닮았지만 브리아드는 긴 장모로 양 떼를 넓게 이동시키고 부비에는 거친 털로 소와 수레 일을 맡았어요.",
  },
});

export const miniatureAmericanShepherdDetail = standardBreedDetailSchema.parse({
  slug: "miniature-american-shepherd",
  nameKo: "미니어처 아메리칸 셰퍼드",
  metadataDescription: "1960년대 미국 로데오와 말 문화에서 작은 오스트레일리안 셰퍼드 계통으로 형성된 미니어처 아메리칸 셰퍼드의 배경과 오늘의 방향 과제, 바퀴 거리, 이중모 관리를 살펴봅니다.",
  heroStatement: "미국 로데오와 말 문화에서 함께 이동하기 쉬우면서도 목양 능력을 유지하도록 작은 오스트레일리안 셰퍼드 계통에서 형성된 견종이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "약 9~18kg" },
    ],
    detailsLabel: "성별 체고 기준 보기",
    items: [
      { id: "male-height", label: "수컷", value: "체고 약 36~46cm" },
      { id: "female-height", label: "암컷", value: "체고 약 33~43cm" },
      { id: "weight", label: "몸무게", value: "성견 약 9~18kg" },
    ],
  },
  story: {
    title: "미니어처 아메리칸 셰퍼드는 왜 작게 형성됐을까요?",
    description: "로데오와 말 곁에서 이동한 형성 배경을 오늘의 짧은 목양형 과제와 휴식으로 연결해 봐요.",
    steps: [
      {
        navLabel: "형성의 배경",
        eyebrow: "1단계 · 어디에서 출발했을까?",
        title: "미국 말 문화에서 이동하기 쉬운 작은 목양견으로 선택됐어요.",
        body: "1960년대 미국에서 작은 오스트레일리안 셰퍼드들이 로데오와 말 행사 사람들의 관심을 받았고, 목양 능력과 작은 체격을 함께 유지하며 별도 견종이 됐어요.",
        image: "/illustrations/v3/miniature-american-shepherd-history.webp",
        imageAlt: "1960년대 미국 로데오장 바깥에서 말을 탄 사람과 함께 이동하는 블루멀 성견 미니어처 아메리칸 셰퍼드 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "작은 몸으로도 여러 표식의 방향을 빠르게 바꿀 수 있어요.",
        body: "낮은 패널 세 개 사이를 천천히 돌며 보호자가 가리킨 색의 바깥을 지나고, 마지막에는 출발 매트로 돌아오는 순서를 알려주세요.",
        image: "/illustrations/v4/miniature-american-shepherd-feature-panel-route.webp",
        imageAlt: "울타리 안 낮은 패널 세 개 사이에서 보호자가 가리킨 방향으로 도는 블루멀 성견 미니어처 아메리칸 셰퍼드 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "작은 체격과 높은 집중은 스스로 쉴 줄 안다는 뜻이 아니에요.",
        body: "접이식 패널을 세워 보이지 않게 하고 작은 장비 가방을 닫은 뒤, 이동용 매트에서 주변을 살피지 않고 눕는 시간을 마련해주세요.",
        image: "/illustrations/v4/miniature-american-shepherd-feature-panels-to-rest.webp",
        imageAlt: "보호자가 접이식 패널과 장비 가방을 정리하는 동안 이동용 매트에서 쉬는 블루멀 성견 미니어처 아메리칸 셰퍼드 삽화",
      },
    ],
    caution: "작게 선택된 목양견이라는 배경이 모든 개체의 작업 욕구나 사람 친화성을 보장하지 않아요. 반응과 회복은 개체별로 달라요.",
  },
  realitiesTitle: "작아진 체격이 줄여주지 않는 생활 책임은 무엇일까요?",
  realities: [
    {
      id: "wheeled-motion-distance",
      title: "바퀴와 달리는 발을 가까이 견디게 하기보다 옆길로 먼저 빠져요.",
      body: "킥보드나 자전거가 보이면 분리된 길로 이동하고, 움직임을 계속 보지 않고 보호자의 표식으로 돌아오면 보상해주세요.",
      image: "/illustrations/v4/miniature-american-shepherd-feature-wheel-distance.webp",
      imageAlt: "분리된 공원 옆길에서 멀리 지나가는 킥보드 대신 보호자의 바닥 표식을 보는 블루멀 성견 미니어처 아메리칸 셰퍼드 삽화",
    },
    {
      id: "double-coat-feathering",
      title: "작은 몸의 이중모도 귀 뒤와 바지 털 안쪽에서 엉켜요.",
      body: "털갈이 때만 겉털을 훑지 말고 귀 뒤, 겨드랑이와 뒷다리 장식털을 작은 구역으로 나누어 피부 가까이 빗어주세요.",
      image: "/illustrations/v4/miniature-american-shepherd-feature-feathering-care.webp",
      imageAlt: "낮은 매트에서 보호자가 블루멀 성견 미니어처 아메리칸 셰퍼드의 귀 뒤와 뒷다리 장식털을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "미니어처 아메리칸 셰퍼드와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "작은 체격만 보고 활동을 줄이지 않고 방향·탐색 과제와 충분한 휴식을 함께 제공할 수 있나요?",
    "킥보드와 자전거를 따라가기 전에 분리된 옆길과 돌아올 표식을 선택할 수 있나요?",
    "귀 뒤와 겨드랑이, 뒷다리 장식털 안쪽까지 이중모를 나누어 빗을 수 있나요?",
  ],
  relatedTitle: "작은 오스트레일리안 셰퍼드라는 별명만으로 이해하면 부족해요.",
  relatedDescription: "형성 과정은 연결되지만 등록명과 체고 기준, 실제 활동과 피모 관리 규모를 따로 비교해보세요.",
  relatedDifferences: {
    "australian-shepherd": "유전적 배경과 목양 외형은 가깝지만 미니어처 아메리칸 셰퍼드는 미국에서 작은 체고 범위로 정립된 별도 견종이에요.",
    "shetland-sheepdog": "작은 목양견의 빠른 학습과 알림은 닮을 수 있지만 셸티는 셰틀랜드 제도의 별도 콜리형 계통과 긴 피모 윤곽을 가졌어요.",
  },
});

export const dogoArgentinoDetail = standardBreedDetailSchema.parse({
  slug: "dogo-argentino",
  nameKo: "도고 아르헨티노",
  metadataDescription: "1920년대 아르헨티나에서 멧돼지와 퓨마 같은 큰 사냥감을 무리로 추적하도록 형성된 도고 아르헨티노의 배경과 오늘의 냄새 추적, 동물과의 거리, 흰 피모 관리를 살펴봅니다.",
  heroStatement: "1920년대 아르헨티나의 넓은 지형에서 멧돼지와 퓨마 같은 큰 사냥감을 무리로 찾고 추적하도록 계획적으로 형성된 대형견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 약 61~67cm · 몸무게 약 40~45kg" },
      { id: "female-size", label: "암컷", value: "체고 약 61~65cm · 몸무게 약 40~43kg" },
    ],
  },
  story: {
    title: "도고 아르헨티노는 어떤 목적을 위해 만들어졌을까요?",
    description: "큰 사냥감 추적의 역사를 오늘의 통제된 냄새 과제와 힘을 내려놓는 휴식으로 바꿔봐요.",
    steps: [
      {
        navLabel: "형성의 배경",
        eyebrow: "1단계 · 어디에서 출발했을까?",
        title: "코르도바에서 강한 체력과 후각, 무리 협력을 목표로 형성됐어요.",
        body: "안토니오 노레스 마르티네스 형제는 1920년대 여러 견종을 계획적으로 교배해 넓은 지형에서 큰 사냥감을 찾고 붙잡는 흰 대형견을 만들었어요.",
        image: "/illustrations/v3/dogo-argentino-history.webp",
        imageAlt: "1920년대 아르헨티나 초원에서 사냥꾼과 함께 멀리 난 큰 사냥감의 흔적을 찾는 흰 성견 도고 아르헨티노 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "실제 동물을 쫓지 않고 무거운 향 주머니의 흔적만 찾아요.",
        body: "높은 울타리 안 짧은 냄새 길 끝의 고정된 천 주머니를 찾고, 물거나 당기기 전에 보호자에게 돌아오면 보상해주세요.",
        image: "/illustrations/v4/dogo-argentino-feature-scent-bag-return.webp",
        imageAlt: "높은 울타리 안 짧은 냄새 길 끝의 고정된 향 주머니를 찾고 보호자에게 돌아서는 흰 성견 도고 아르헨티노 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "큰 힘을 쓴 뒤 장비가 보이지 않아야 몸도 편히 내려놓아요.",
        body: "향 주머니와 긴 줄을 잠금 상자에 넣고 넓은 물그릇을 둔 뒤, 통행에서 떨어진 큰 매트에 옆으로 눕는 시간을 확보해주세요.",
        image: "/illustrations/v4/dogo-argentino-feature-scent-to-rest.webp",
        imageAlt: "보호자가 향 주머니와 긴 줄을 잠금 상자에 넣는 동안 큰 매트에서 옆으로 쉬는 흰 성견 도고 아르헨티노 삽화",
      },
    ],
    caution: "큰 사냥감의 무리 사냥 배경을 오늘의 개나 야생동물 관계로 단정하면 안 돼요. 실제 추적과 사회성은 개체별로 확인해야 해요.",
  },
  realitiesTitle: "강한 체격과 흰 피모는 어떤 일상 준비를 요구할까요?",
  realities: [
    {
      id: "animal-double-distance",
      title: "다른 동물과의 만남은 인사보다 이중 거리 확보가 먼저예요.",
      body: "튼튼한 하네스와 긴 리드를 함께 사용하고, 다른 동물이 보이면 울타리나 차량 같은 시야 가림 뒤로 이동해 지나갈 공간을 넓혀주세요.",
      image: "/illustrations/v4/dogo-argentino-feature-animal-double-distance.webp",
      imageAlt: "공원에서 멀리 있는 다른 개와 차량으로 시야를 나누고 보호자 곁으로 방향을 바꾸는 흰 성견 도고 아르헨티노 삽화",
    },
    {
      id: "white-coat-shade-check",
      title: "짧은 흰 털은 그늘과 피부 상태를 산책 계획에 넣어요.",
      body: "햇빛이 강한 시간은 피하고 나무 그늘과 짧은 경로를 선택하며, 귀와 배처럼 털이 얇은 부위의 붉어짐이나 상처를 산책 뒤 확인해주세요.",
      image: "/illustrations/v4/dogo-argentino-feature-shade-skin-check.webp",
      imageAlt: "나무 그늘의 짧은 산책 경로에서 보호자가 흰 성견 도고 아르헨티노의 귀와 배 피부를 살피는 삽화",
    },
  ],
  readinessTitle: "도고 아르헨티노와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "높은 울타리 안에서 냄새 추적과 보호자에게 돌아오는 과제를 안전하게 제공할 수 있나요?",
    "다른 동물과 마주치기 전에 튼튼한 이중 장비와 시야 가림으로 충분한 거리를 만들 수 있나요?",
    "강한 햇빛을 피한 경로를 선택하고 짧은 흰 피모 아래 피부를 산책 뒤 확인할 수 있나요?",
  ],
  relatedTitle: "큰 사냥감 추적 배경이 있어도 형성 방식과 몸은 달라요.",
  relatedDescription: "강한 힘만 비교하지 말고 어떤 지형과 사냥 방식에 맞춰졌는지, 오늘 필요한 동물 거리와 피모 관리를 함께 보세요.",
  relatedDifferences: {
    "rhodesian-ridgeback": "큰 사냥감과 넓은 지형이라는 배경은 닮았지만 리지백은 남부 아프리카에서 거리를 두고 추적했고 도고는 아르헨티나에서 무리로 찾아 붙잡도록 형성됐어요.",
    "cane-corso": "큰 힘과 사람 곁의 보호 책임은 닮았지만 카네 코르소는 이탈리아의 농장·재산 경비와 가축 작업 계통이고 도고는 큰 사냥감 추적이 중심이에요.",
  },
});

export const expansionTo200Batch02StandardBreedDetails = [
  icelandicSheepdogDetail,
  dutchShepherdDogDetail,
  mastiffDetail,
  softCoatedWheatenTerrierDetail,
  otterhoundDetail,
  belgianLaekenoisDetail,
  czechoslovakianWolfdogDetail,
  bouvierDesFlandresDetail,
  miniatureAmericanShepherdDetail,
  dogoArgentinoDetail,
];
