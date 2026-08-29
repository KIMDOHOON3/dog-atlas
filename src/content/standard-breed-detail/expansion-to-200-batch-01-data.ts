import { standardBreedDetailSchema } from "./schema";

export const puliDetail = standardBreedDetailSchema.parse({
  slug: "puli",
  nameKo: "풀리",
  metadataDescription: "헝가리 목초지에서 양 떼 가까이 빠르게 방향을 바꾸던 풀리의 역할 배경과 오늘의 협력 활동, 알림 전환과 코드 피모 관리의 현실을 살펴봅니다.",
  heroStatement: "양 떼 가까이에서 빠르게 방향을 바꾸며 무리를 모으던 헝가리 목양견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 39~45cm · 몸무게 13~15kg" },
      { id: "female-size", label: "암컷", value: "체고 36~42cm · 몸무게 10~13kg" },
    ],
  },
  story: {
    title: "풀리의 빠른 목양 움직임은 오늘의 생활에서 어떻게 이어질까요?",
    description: "양 가까이에서 방향을 바꾸던 역할부터 활동을 끝내고 쉬는 과정까지 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "헝가리 목초지에서 양 떼의 방향을 빠르게 바꿨어요.",
        body: "풀리는 목동과 가까이 협력하며 양 사이를 민첩하게 오가고, 흩어진 개체를 다시 무리로 모으던 목양견이에요.",
        image: "/illustrations/v3/puli-history.webp",
        imageAlt: "헝가리 목초지에서 목동의 방향을 따라 양 떼 앞을 가로지르는 검은 성견 풀리 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "사람의 신호를 보며 짧고 빠른 방향 과제에 참여할 수 있어요.",
        body: "움직임을 따라가기만 하게 두기보다 낮은 표식 사이를 곡선으로 돌고 보호자에게 돌아오는 순서를 함께 알려주세요.",
        image: "/illustrations/v4/puli-feature-curve-return.webp",
        imageAlt: "울타리 안에서 두 표식 사이를 곡선으로 돈 뒤 보호자의 돌아오라는 손짓을 바라보는 검은 성견 풀리 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "빠르게 참여하는 만큼 활동을 끝내고 쉬는 순서도 필요해요.",
        body: "짧은 방향 과제가 끝나면 표식과 긴 줄을 보이지 않게 정리하고, 다음 움직임을 기다리지 않도록 자기 매트에서 쉬게 해주세요.",
        image: "/illustrations/v4/puli-feature-work-to-rest.webp",
        imageAlt: "보호자가 표식과 줄을 수납하는 동안 현관 안쪽 매트에서 쉬는 검은 성견 풀리 삽화",
      },
    ],
    caution: "목양 배경은 행동을 이해하는 단서일 뿐이에요. 움직임을 따라가는 강도와 발성, 사람과 협력하는 방식은 경험과 환경, 개체에 따라 달라요.",
  },
  realitiesTitle: "풀리와 살면 특히 무엇을 자주 관리할까요?",
  realities: [
    {
      id: "visitor-buffer",
      title: "방문객을 확인한 뒤 사람에게 돌아올 거리를 먼저 만들어요.",
      body: "주변 변화를 빠르게 알릴 수 있어요. 외부 문과 실내 사이를 안전문으로 한 번 더 나누고, 방문객에게 다가가기보다 보호자를 확인하는 행동을 보상해주세요.",
      image: "/illustrations/v4/puli-feature-visitor-buffer.webp",
      imageAlt: "닫힌 현관문과 안전문에서 떨어져 보호자의 보상을 기다리는 검은 성견 풀리 삽화",
    },
    {
      id: "cord-care",
      title: "코드는 빗는 대신 나누고, 젖은 뒤에는 속까지 말려요.",
      body: "성숙한 코드 피모는 피부 가까이 서로 붙지 않도록 손으로 나누고 이물질을 확인해야 해요. 젖으면 수건으로 눌러 물기를 빼고 속까지 완전히 건조해주세요.",
      image: "/illustrations/v4/puli-feature-cord-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 검은 성견 풀리의 코드를 손으로 나누고 수건으로 말리는 삽화",
    },
  ],
  readinessTitle: "풀리와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기와 함께 짧은 방향 과제를 제공하고 끝난 뒤 쉬는 순서까지 알려줄 수 있나요?",
    "방문객과 바깥 움직임을 확인할 때 안전문과 충분한 거리를 먼저 마련할 수 있나요?",
    "코드를 피부 가까이 나누고 목욕이나 비에 젖은 뒤 속까지 완전히 말릴 수 있나요?",
  ],
  relatedTitle: "비슷해 보이는 목양견과 무엇이 다를까요?",
  relatedDescription: "목양에 참여하는 속도와 방식뿐 아니라 피모가 형성되는 구조와 관리 시간도 함께 비교해보세요.",
  relatedDifferences: {
    "border-collie": "사람과 목양 과제에 빠르게 참여한다는 점은 닮았지만 풀리는 자연 코드 피모와 발성, 가까운 방향 전환의 생활 부담이 달라요.",
    komondor: "헝가리의 코드 피모를 공유하지만 풀리는 더 작고 양 떼를 모는 목양견이며, 코몬도르는 무리를 지키는 대형 보호견이에요.",
  },
});

export const whiteSwissShepherdDogDetail = standardBreedDetailSchema.parse({
  slug: "white-swiss-shepherd-dog",
  nameKo: "화이트 스위스 셰퍼드 독",
  metadataDescription: "북미의 화이트 셰퍼드 계통이 스위스에서 별도 견종으로 자리 잡은 배경과 오늘의 협력 활동, 낯선 사람과의 거리, 흰 이중모 관리를 살펴봅니다.",
  heroStatement: "북미의 화이트 셰퍼드 계통이 스위스에서 별도 견종으로 자리 잡은 가정·반려견이에요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 58~66cm · 몸무게 약 30~40kg" },
      { id: "female-size", label: "암컷", value: "체고 53~61cm · 몸무게 약 25~35kg" },
    ],
  },
  story: {
    title: "화이트 스위스 셰퍼드 독은 어떻게 별도 견종으로 자리 잡았을까요?",
    description: "형성 배경을 과장하지 않고 오늘의 협력 활동과 휴식까지 연결해 봐요.",
    steps: [
      {
        navLabel: "형성의 배경",
        eyebrow: "1단계 · 어디에서 출발했을까?",
        title: "북미의 화이트 셰퍼드들이 스위스로 건너가 새 견종의 기반이 됐어요.",
        body: "미국과 캐나다에서 이어지던 화이트 셰퍼드 계통이 1970년대 스위스로 들어왔고, 여러 세대를 거쳐 화이트 스위스 셰퍼드 독으로 등록됐어요.",
        image: "/illustrations/v3/white-swiss-shepherd-dog-history.webp",
        imageAlt: "1970년대 스위스의 생활 공간에서 사람과 함께 걷는 흰 셰퍼드형 성견을 그린 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
        title: "사람의 작은 신호를 보며 차분한 협력 과제에 참여할 수 있어요.",
        body: "빠른 운동만 늘리기보다 낮은 표식 사이를 S자로 걷고 보호자의 방향 신호를 확인하는 활동으로 몸과 머리를 함께 쓰게 해주세요.",
        image: "/illustrations/v4/white-swiss-shepherd-dog-feature-cooperative-route.webp",
        imageAlt: "울타리 안에서 낮은 표식 사이를 S자로 걸으며 보호자의 손 신호를 확인하는 성견 화이트 스위스 셰퍼드 독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "함께한 과제가 끝나면 다음 일을 기다리지 않고 쉬게 해요.",
        body: "냄새 상자와 긴 줄을 수납장에 넣고 시야를 차분하게 정리한 뒤, 큰 몸을 편히 펼 수 있는 매트에서 쉬는 시간까지 한 흐름으로 만들어요.",
        image: "/illustrations/v4/white-swiss-shepherd-dog-feature-task-to-rest.webp",
        imageAlt: "보호자가 냄새 상자와 긴 줄을 수납하는 동안 넓은 매트에서 쉬는 성견 화이트 스위스 셰퍼드 독 삽화",
      },
    ],
    caution: "견종 표준의 학습 가능성과 사람에 대한 헌신이 모든 개체의 친화성이나 안정성을 보증하지는 않아요. 실제 반응은 경험과 환경, 개체에 따라 달라요.",
  },
  realitiesTitle: "흰 셰퍼드와 살 때 외형보다 먼저 볼 것은 무엇일까요?",
  realities: [
    {
      id: "pedestrian-distance",
      title: "낯선 사람과 바로 인사시키기보다 지나갈 길을 나눠요.",
      body: "다가오는 사람을 확인하면 화단이나 옆길을 이용해 충분한 거리를 만들고, 상대를 계속 바라보기보다 보호자에게 시선을 돌리는 선택을 보상해주세요.",
      image: "/illustrations/v4/white-swiss-shepherd-dog-feature-pedestrian-distance.webp",
      imageAlt: "공원 옆길에서 멀리 지나가는 사람과 거리를 두고 보호자의 손을 바라보는 성견 화이트 스위스 셰퍼드 독 삽화",
    },
    {
      id: "double-coat-care",
      title: "흰색을 유지하는 것보다 촘촘한 속털과 피부를 살펴요.",
      body: "중간 길이와 장모 모두 촘촘한 이중모예요. 털을 하얗게 보이게 만드는 데 집중하지 말고 작은 구역씩 나누어 빠진 속털, 피부와 발의 이물질을 확인해주세요.",
      image: "/illustrations/v4/white-swiss-shepherd-dog-feature-double-coat-care.webp",
      imageAlt: "현관 매트에서 보호자가 성견 화이트 스위스 셰퍼드 독의 흰 이중모를 나누어 빗고 발을 확인하는 삽화",
    },
  ],
  readinessTitle: "화이트 스위스 셰퍼드 독과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "매일 걷기와 함께 사람의 신호를 확인하는 짧은 협력 과제와 충분한 휴식을 마련할 수 있나요?",
    "낯선 사람과 개를 바로 만나게 하기보다 옆길과 화단을 이용해 편한 거리를 만들 수 있나요?",
    "흰 털의 색보다 이중모 안쪽의 빠진 털과 피부, 네 발을 규칙적으로 확인할 수 있나요?",
  ],
  relatedTitle: "흰색 대형견도 역할과 몸의 구조가 달라요.",
  relatedDescription: "색이 비슷하다는 이유만으로 같은 생활을 예상하지 말고 형성 배경과 꼬리·피모 구조, 필요한 활동을 비교해보세요.",
  relatedDifferences: {
    "german-shepherd-dog": "셰퍼드 계통의 체형과 사람과의 협력은 닮았지만 화이트 스위스 셰퍼드 독은 별도 표준과 형성 기록을 가진 견종이에요.",
    samoyed: "흰 이중모는 닮았지만 사모예드는 말린 꼬리의 북방 스피츠이며 이동·운송 배경과 피모 윤곽이 달라요.",
  },
});

export const welshCorgiCardiganDetail = standardBreedDetailSchema.parse({
  slug: "welsh-corgi-cardigan",
  nameKo: "웰시 코기 카디건",
  metadataDescription: "웨일스 농장에서 소의 이동을 돕던 웰시 코기 카디건의 낮고 긴 체형과 긴 꼬리, 움직이는 대상과의 거리와 낮은 생활 동선을 살펴봅니다.",
  heroStatement: "소의 발길을 피해 낮게 움직이며 가축의 이동을 돕던 긴 꼬리의 웨일스 목양견이에요.",
  story: {
    title: "카디건의 낮고 긴 몸은 어떤 일을 하며 자리 잡았을까요?",
    description: "소의 움직임을 가까이 읽던 배경을 오늘의 바퀴 거리와 과제를 끝내고 쉬는 과정으로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "웨일스 농장에서 소의 발길을 피해 낮게 움직이며 이동을 도왔어요.",
        body: "웰시 코기 카디건은 낮은 몸으로 가축 가까이 움직이며 소를 몰고, 농장 주변을 살피던 오래된 웨일스 목양견이에요.",
        image: "/illustrations/v3/welsh-corgi-cardigan-history.webp",
        imageAlt: "웨일스 농장에서 긴 꼬리의 웰시 코기 카디건이 목동과 함께 소 떼의 이동을 돕는 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "움직이는 물체를 따라가기보다 사람의 신호로 옆길을 선택해요.",
        body: "느리게 끄는 빈 손수레와 나란한 길을 걷다가 보호자의 손을 보고 방향을 바꾸게 해, 바퀴 가까이 붙지 않는 선택을 연습해주세요.",
        image: "/illustrations/v4/welsh-corgi-cardigan-feature-cart-reorientation.webp",
        imageAlt: "빈 손수레와 나뉜 길을 걷다가 보호자의 옆길 손짓으로 방향을 바꾸는 긴 꼬리의 성견 웰시 코기 카디건 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "움직임 과제가 끝나면 손수레와 줄을 치우고 낮은 자리에서 쉬어요.",
        body: "움직이는 도구가 계속 보이면 다시 따라가려 할 수 있어요. 손수레를 세워 두고 줄을 수납한 뒤 오르내릴 필요 없는 낮은 매트에서 쉬게 해주세요.",
        image: "/illustrations/v4/welsh-corgi-cardigan-feature-cart-to-rest.webp",
        imageAlt: "보호자가 손수레와 줄을 정리하는 동안 낮은 매트에 몸을 길게 눕힌 성견 웰시 코기 카디건 삽화",
      },
    ],
    caution: "가축 몰이 배경이 모든 카디건의 바퀴 추적이나 발목 접근을 뜻하지는 않아요. 움직임에 반응하는 방식은 사회화와 경험, 개체에 따라 달라요.",
  },
  realitiesTitle: "펨브로크와 비슷한 외형 너머에 어떤 생활 차이가 있을까요?",
  realities: [
    {
      id: "cyclist-distance",
      title: "자전거를 가까이 견디게 하기보다 분리된 길로 먼저 이동해요.",
      body: "바퀴가 보이면 자전거 도로와 분리된 옆길이나 수풀 뒤로 이동하고, 충분한 거리에서 보호자에게 시선을 돌린 뒤 지나가게 해주세요.",
      image: "/illustrations/v4/welsh-corgi-cardigan-feature-cyclist-distance.webp",
      imageAlt: "분리된 옆길에서 멀리 지나가는 자전거를 본 뒤 보호자를 바라보는 긴 꼬리의 성견 웰시 코기 카디건 삽화",
    },
    {
      id: "low-ramp",
      title: "낮은 몸이 매일 높은 계단과 점프를 반복하지 않게 해요.",
      body: "낮고 긴 몸이 계단과 높은 가구를 계속 오르내리지 않도록 동선을 막고, 필요한 곳에는 넓고 완만한 미끄럼 방지 경사로를 마련해주세요.",
      image: "/illustrations/v4/welsh-corgi-cardigan-feature-low-ramp.webp",
      imageAlt: "막힌 계단 옆의 넓고 완만한 경사로를 보호자와 내려오는 긴 꼬리의 성견 웰시 코기 카디건 삽화",
    },
  ],
  readinessTitle: "웰시 코기 카디건과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "움직이는 바퀴와 사람의 발을 따라가기 전에 거리를 만들고 보호자에게 돌아오는 선택을 알려줄 수 있나요?",
    "매일의 활동이 끝난 뒤 도구를 치우고 낮은 자리에서 충분히 쉬는 흐름을 마련할 수 있나요?",
    "계단과 높은 점프를 줄이고 필요한 장소에 넓고 완만한 경사로를 둘 수 있나요?",
  ],
  relatedTitle: "두 웰시 코기는 어디서 구분할 수 있을까요?",
  relatedDescription: "같은 웨일스 목양견이라는 이름 안에서도 꼬리와 체형, 형성 계통을 먼저 나누어 살펴봐야 해요.",
  relatedDifferences: {
    "welsh-corgi-pembroke": "낮은 목양견이라는 점은 닮았지만 카디건은 긴 여우 같은 꼬리와 둥근 귀, 별도의 오래된 계통으로 구분돼요.",
    dachshund: "낮고 긴 체형은 비슷해 보여도 카디건은 가축 이동을 돕던 목양견이고 닥스훈트는 굴속 사냥 배경을 가진 하운드예요.",
  },
});

export const sharPeiDetail = standardBreedDetailSchema.parse({
  slug: "shar-pei",
  nameKo: "샤페이",
  metadataDescription: "중국 남부 농촌에서 집과 농장 주변을 살피던 샤페이의 독립적인 판단 배경과 오늘의 냄새 과제, 방문객 거리, 주름과 작은 귀 관리를 살펴봅니다.",
  heroStatement: "중국 남부 농촌에서 집과 농장 주변을 살피던 단단한 중형견이에요.",
  story: {
    title: "샤페이의 신중한 판단은 오늘의 생활에서 어떻게 보일까요?",
    description: "집과 농장 주변을 살피던 배경을 스스로 선택하는 냄새 과제와 끝났음을 알리는 정리 순서로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "중국 남부 농촌에서 집과 농장 주변을 살폈어요.",
        body: "샤페이는 가정과 농장 가까이에서 주변 변화를 살피고 여러 생활 작업에 참여하던 중국의 오래된 중형견으로 전해져요.",
        image: "/illustrations/v3/shar-pei-history.webp",
        imageAlt: "중국 남부 농촌의 집과 밭 사이에서 가족 곁의 주변을 살피는 성견 샤페이 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "지시를 반복하기보다 냄새를 고르고 답을 찾게 해요.",
        body: "닫힌 상자 세 개 가운데 냄새가 든 상자를 스스로 고르게 하고, 찾은 뒤 보호자에게 돌아오면 보상해주세요. 짧고 분명한 선택 과제가 잘 맞을 수 있어요.",
        image: "/illustrations/v4/shar-pei-feature-scent-choice.webp",
        imageAlt: "닫힌 냄새 상자 세 개 가운데 하나를 살피고 보호자의 손 신호를 확인하는 성견 황갈색 샤페이 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "짧은 과제가 끝났다는 신호를 눈에 보이게 정리해요.",
        body: "냄새 상자를 계속 두면 다시 확인할 수 있어요. 상자를 수납하고 손을 씻은 뒤 같은 매트에서 쉬는 순서로 활동의 끝을 알려주세요.",
        image: "/illustrations/v4/shar-pei-feature-search-to-rest.webp",
        imageAlt: "보호자가 냄새 상자를 선반에 수납하는 동안 자기 매트에서 쉬는 성견 황갈색 샤페이 삽화",
      },
    ],
    caution: "가정과 영역을 살피던 배경이 모든 샤페이의 경계 행동이나 독립성을 뜻하지는 않아요. 낯선 대상을 받아들이는 방식은 경험과 환경, 개체에 따라 달라요.",
  },
  realitiesTitle: "샤페이와 살면 어떤 준비가 특히 눈에 보일까요?",
  realities: [
    {
      id: "visitor-buffer",
      title: "방문객과 바로 인사시키기보다 닫힌 안전문 뒤에서 선택하게 해요.",
      body: "보호자와 개는 안전문 안쪽에 함께 머물고 방문객은 반대편에서 시선을 거둔 채 기다리게 해주세요. 개가 보호자에게 돌아오거나 물러나는 선택도 보상해요.",
      image: "/illustrations/v4/shar-pei-feature-visitor-buffer.webp",
      imageAlt: "닫힌 안전문 안쪽에서 보호자와 함께 매트에 서고 반대편 방문객과 거리를 둔 성견 황갈색 샤페이 삽화",
    },
    {
      id: "fold-ear-care",
      title: "주름의 개수보다 접힌 곳과 작은 귀를 짧게 자주 살펴요.",
      body: "목과 얼굴의 접힌 곳을 벌려 습기와 이물질이 남지 않았는지 보고 부드럽게 말려주세요. 작은 귀와 발가락 사이도 만짐에 익숙해지도록 짧게 확인해요.",
      image: "/illustrations/v4/shar-pei-feature-fold-ear-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 성견 황갈색 샤페이의 목 주름을 말리고 작은 귀를 살피는 삽화",
    },
  ],
  readinessTitle: "샤페이와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "낯선 사람과 개에게 다가가게 하기보다 안전문과 충분한 거리에서 선택할 시간을 줄 수 있나요?",
    "반복 지시보다 짧은 냄새 과제와 분명한 종료 순서를 일상에 넣을 수 있나요?",
    "접힌 피부와 작은 귀, 발가락 사이를 짧게 자주 확인하는 관리에 시간을 낼 수 있나요?",
  ],
  relatedTitle: "비슷한 인상을 주는 견종과 무엇이 다를까요?",
  relatedDescription: "중국계 견종이라는 배경이나 묵직한 체형만 보지 말고 피모 구조와 생활 공간, 관리 책임을 함께 비교해보세요.",
  relatedDifferences: {
    "chow-chow": "중국에서 발달했고 낯선 변화에 신중할 수 있다는 점은 닮았지만 차우차우는 풍성한 이중모, 샤페이는 거친 단모와 피부 접힘 관리가 중심이에요.",
    bullmastiff: "집과 영역을 살피던 배경은 닮았지만 불마스티프는 훨씬 크고 무거우며 이동과 생활 공간의 부담도 달라요.",
  },
});

export const bulldogDetail = standardBreedDetailSchema.parse({
  slug: "bulldog",
  nameKo: "불독",
  metadataDescription: "과거의 해로운 투우 미끼 경기에서 벗어나 반려견으로 자리 잡은 불독의 변화와 오늘의 짧은 냄새 활동, 더위 회피, 얼굴 접힘 관리를 살펴봅니다.",
  heroStatement: "해로운 투우 미끼 경기의 과거를 지나 사람 곁의 반려견으로 달라진 영국 견종이에요.",
  story: {
    title: "불독의 강한 과거와 오늘의 생활은 어떻게 달라졌을까요?",
    description: "과거의 쓰임을 미화하지 않고, 지금 필요한 짧은 활동과 빠른 회복의 흐름을 살펴봐요.",
    steps: [
      {
        navLabel: "과거와 변화",
        eyebrow: "1단계 · 어떤 과거를 지나왔을까?",
        title: "해로운 오락에 동원된 뒤 사람 곁의 반려견으로 달라졌어요.",
        body: "불독의 조상은 영국의 투우 미끼 경기에 동원됐지만 그 관행이 금지된 뒤, 사람들은 더 차분한 반려견으로 품종을 이어왔어요.",
        image: "/illustrations/v3/bulldog-history.webp",
        imageAlt: "해로운 경기가 사라진 뒤 영국 가정의 마당에서 사람 곁에 머무는 불독의 변화를 보여주는 역사 삽화",
      },
      {
        navLabel: "현재의 활동",
        eyebrow: "2단계 · 지금은 무엇을 함께할까?",
        title: "오래 밀어붙이기보다 짧은 냄새 선택에 참여해요.",
        body: "그늘진 곳에 둔 두 개의 냄새 상자 중 하나를 고르게 하고, 찾은 뒤 보호자의 손을 보면 돌아오는 짧은 순서로 활동을 구성해주세요.",
        image: "/illustrations/v4/bulldog-feature-scent-choice.webp",
        imageAlt: "그늘진 마당에서 냄새 상자 하나를 고른 뒤 보호자의 돌아오라는 손짓을 확인하는 흰색과 적갈색 성견 불독 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "활동 도구를 치운 뒤 서늘한 자리에서 충분히 쉬어요.",
        body: "짧게 움직인 뒤에도 회복 시간을 넉넉히 잡아야 해요. 줄과 냄새 상자를 수납하고 물이 가까운 서늘한 매트에서 쉬는 것으로 끝내주세요.",
        image: "/illustrations/v4/bulldog-feature-activity-to-rest.webp",
        imageAlt: "보호자가 줄과 냄새 상자를 수납하는 동안 물그릇 옆 서늘한 매트에서 쉬는 성견 불독 삽화",
      },
    ],
    caution: "과거의 역할이 오늘 불독의 행동을 결정하지는 않아요. 현재의 활동과 회복 능력은 얼굴과 몸의 구조, 체중, 나이와 개체에 따라 크게 달라요.",
  },
  realitiesTitle: "불독과 살 때 귀여운 인상보다 먼저 볼 것은 무엇일까요?",
  realities: [
    {
      id: "shaded-route",
      title: "긴 햇볕 길보다 짧은 그늘 길을 먼저 선택해요.",
      body: "덥거나 습한 시간은 피하고, 산책 전부터 짧고 그늘진 경로와 돌아올 지점을 정해주세요. 걷는 속도나 회복이 평소와 다르면 더 진행하지 않아요.",
      image: "/illustrations/v4/bulldog-feature-shaded-route.webp",
      imageAlt: "햇볕이 드는 긴 길 대신 나무 그늘의 짧은 길로 방향을 바꾸는 보호자와 성견 불독 삽화",
    },
    {
      id: "fold-paw-care",
      title: "얼굴 접힘과 발가락 사이는 짧게 확인하고 완전히 말려요.",
      body: "부드러운 천으로 접힌 부분의 습기와 이물질을 확인하고 건조해주세요. 발가락 사이도 함께 살피되 억지로 붙잡기보다 짧은 접촉 뒤 보상해요.",
      image: "/illustrations/v4/bulldog-feature-fold-paw-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 성견 불독의 얼굴 접힘을 닦고 앞발을 살피는 삽화",
    },
  ],
  readinessTitle: "불독과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "날씨와 당일 상태에 따라 산책을 짧게 바꾸고 충분한 회복 시간을 줄 수 있나요?",
    "평소의 호흡 소리와 움직임, 잠든 자세를 관찰해 달라진 점을 일찍 알아차릴 수 있나요?",
    "얼굴 접힘과 발가락 사이를 짧게 자주 확인하고 습기가 남지 않게 관리할 수 있나요?",
  ],
  relatedTitle: "다른 짧은 얼굴 반려견과 무엇이 다를까요?",
  relatedDescription: "비슷한 표정보다 체격과 움직임, 더위에 대응할 생활 조건을 구체적으로 비교해보세요.",
  relatedDifferences: {
    "french-bulldog": "짧은 얼굴과 사람 곁의 반려 생활은 닮았지만 불독은 더 넓고 무거운 체형이며 귀 모양과 이동 부담도 달라요.",
    pug: "짧은 얼굴과 피부 접힘 관리를 공유하지만 퍼그는 더 작고 꼬리가 말리며 일상 이동 규모가 달라요.",
  },
});

export const americanAkitaDetail = standardBreedDetailSchema.parse({
  slug: "american-akita",
  nameKo: "아메리칸 아키타",
  metadataDescription: "일본 아키타 계통이 북미에서 큰 골격의 별도 타입으로 발전한 아메리칸 아키타의 배경과 경계 확인, 방문객 거리, 큰 이중모 관리를 살펴봅니다.",
  heroStatement: "일본 아키타 계통에서 갈라져 북미에서 큰 골격과 넓은 머리의 타입으로 발전한 대형 스피츠예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 66~71cm · 몸무게 약 45~59kg" },
      { id: "female-size", label: "암컷", value: "체고 61~66cm · 몸무게 약 32~45kg" },
    ],
  },
  story: {
    title: "아메리칸 아키타는 어떻게 일본 아키타와 다른 모습으로 자리 잡았을까요?",
    description: "북미에서 별도 타입으로 발전한 배경을 오늘의 주변 확인과 보호자에게 돌아오는 선택으로 연결해 봐요.",
    steps: [
      {
        navLabel: "형성 배경",
        eyebrow: "1단계 · 어떻게 자리 잡았을까?",
        title: "일본에서 건너간 아키타 계통이 북미에서 별도 타입으로 발전했어요.",
        body: "제2차 세계대전 뒤 미국으로 건너간 아키타 계통은 일본의 복원 방향과 달리 큰 골격과 넓은 머리, 다양한 색을 유지하며 아메리칸 아키타로 구분됐어요.",
        image: "/illustrations/v3/american-akita-history.webp",
        imageAlt: "20세기 중반 북미 가정의 넓은 마당에서 사람 곁에 선 큰 골격과 복색 피모의 아메리칸 아키타 형성 배경 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "주변을 확인한 뒤 보호자에게 돌아오는 선택을 알려줘요.",
        body: "안전하게 닫힌 마당에서 긴 줄을 연결하고 경계를 한 바퀴 살핀 뒤, 돌아오라는 손짓을 보면 방향을 돌려 사람에게 오는 짧은 순서를 연습해주세요.",
        image: "/illustrations/v4/american-akita-feature-perimeter-check-in.webp",
        imageAlt: "닫힌 마당의 경계를 살핀 뒤 보호자의 돌아오라는 손짓으로 몸을 돌리는 큰 복색 성견 아메리칸 아키타 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "경계 확인이 끝나면 큰 장비를 치우고 넓은 자리에서 쉬어요.",
        body: "긴 줄과 표식이 계속 보이면 다시 주변을 확인할 수 있어요. 장비를 수납하고 큰 몸을 펴도 동선과 겹치지 않는 전용 매트에서 쉬게 해주세요.",
        image: "/illustrations/v4/american-akita-feature-task-to-rest.webp",
        imageAlt: "보호자가 긴 줄과 표식을 수납하는 동안 넓은 매트에 몸을 편 복색 성견 아메리칸 아키타 삽화",
      },
    ],
    caution: "경계와 독립성은 견종 배경을 이해하는 단서일 뿐이에요. 낯선 사람이나 동물을 대하는 방식은 사회화와 경험, 개체에 따라 다르게 나타나요.",
  },
  realitiesTitle: "아메리칸 아키타의 큰 몸은 집 안에서 무엇을 바꿀까요?",
  realities: [
    {
      id: "visitor-boundary",
      title: "현관 한 칸이 아니라 닫힌 안전문과 넉넉한 거리를 준비해요.",
      body: "방문객이 들어오기 전 개와 보호자는 큰 매트가 있는 안쪽 공간으로 이동하고 안전문을 닫아주세요. 방문객이 먼저 자리를 잡은 뒤에도 인사는 강요하지 않아요.",
      image: "/illustrations/v4/american-akita-feature-visitor-boundary.webp",
      imageAlt: "닫힌 튼튼한 안전문 안쪽에서 보호자를 확인하고 현관의 방문객과 넉넉한 거리를 둔 복색 성견 아메리칸 아키타 삽화",
    },
    {
      id: "undercoat-care",
      title: "큰 이중모는 털갈이 때 빠지는 양과 관리 공간도 커져요.",
      body: "넓은 미끄럼 방지 매트에서 몸을 구간별로 나눠 빗고, 피부까지 보며 빠진 속털을 걷어주세요. 한 번에 끝내려 하지 말고 쉬는 시간을 둬요.",
      image: "/illustrations/v4/american-akita-feature-undercoat-care.webp",
      imageAlt: "넓은 미끄럼 방지 매트에서 보호자가 큰 복색 성견 아메리칸 아키타의 속털을 나누어 빗는 삽화",
    },
  ],
  readinessTitle: "아메리칸 아키타와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "큰 몸을 힘으로 제지하지 않고 긴 줄과 보상 신호로 방향을 바꾸는 연습을 이어갈 수 있나요?",
    "방문객과 다른 동물이 있는 상황에서 닫힌 안전문과 넉넉한 거리를 먼저 마련할 수 있나요?",
    "몸을 펴고 쉬는 큰 자리와 털갈이 때 전신을 나누어 빗을 관리 공간을 확보할 수 있나요?",
  ],
  relatedTitle: "일본 아키타와 어디서 구분할 수 있을까요?",
  relatedDescription: "같은 뿌리만 보지 말고 머리와 골격, 허용되는 색, 실제 생활 공간을 함께 비교해보세요.",
  relatedDifferences: {
    akita: "뿌리는 이어지지만 아메리칸 아키타는 더 큰 골격과 넓은 머리, 검은 마스크를 포함한 다양한 색이 허용되는 별도 FCI 견종이에요.",
    "tibetan-mastiff": "큰 몸과 영역을 살피는 경향은 닮았지만 티베탄 마스티프는 고지대 가축 보호견 배경과 훨씬 풍성한 갈기 피모가 중심이에요.",
  },
});

export const finnishSpitzDetail = standardBreedDetailSchema.parse({
  slug: "finnish-spitz",
  nameKo: "핀니시 스피츠",
  metadataDescription: "핀란드 숲에서 나무 위 새를 찾아 목소리로 위치를 알리던 핀니시 스피츠의 배경과 오늘의 표적 찾기, 알림 전환, 붉은 이중모 관리를 살펴봅니다.",
  heroStatement: "핀란드 숲에서 나무 위 새를 찾아 시선과 목소리로 위치를 알리던 붉은 스피츠예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "약 9~15kg" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-height", label: "수컷", value: "체고 44~50cm" },
      { id: "female-height", label: "암컷", value: "체고 39~45cm" },
      { id: "weight", label: "몸무게", value: "약 9~15kg" },
    ],
  },
  story: {
    title: "핀니시 스피츠는 왜 높은 곳을 보고 목소리로 알렸을까요?",
    description: "나무 위 새의 위치를 알려주던 독특한 역할을 안전한 표적 찾기와 과제를 끝내고 쉬는 과정으로 바꿔봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "숲에서 나무 위 새를 찾아 사냥꾼에게 위치를 알렸어요.",
        body: "핀니시 스피츠는 새의 움직임을 따라 나무 아래에 머물며 시선과 반복되는 짖음으로 위치를 알려주는 핀란드의 사냥견이에요.",
        image: "/illustrations/v3/finnish-spitz-history.webp",
        imageAlt: "핀란드 숲에서 나무 위 새의 위치를 올려다보며 멀리 선 사냥꾼에게 알리는 붉은 핀니시 스피츠 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "높은 표적을 찾은 뒤 보호자에게 돌아오게 해요.",
        body: "안전하게 닫힌 공간의 나무에 목재 새 표적을 걸고 찾게 한 뒤, 발견하면 긴 줄을 유지한 채 돌아오라는 손짓을 보고 사람에게 오는 순서를 알려주세요.",
        image: "/illustrations/v4/finnish-spitz-feature-tree-target-return.webp",
        imageAlt: "닫힌 숲 훈련장에서 나무의 목재 새 표적을 찾은 뒤 보호자의 돌아오라는 손짓으로 향하는 붉은 성견 핀니시 스피츠 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "표적과 긴 줄을 가방에 넣어 찾기 시간이 끝났음을 알려요.",
        body: "높은 곳을 계속 살피지 않도록 목재 표적과 긴 줄을 보이지 않게 수납하고, 휴대 매트에 누워 주변 소리를 흘려보내는 시간까지 포함해주세요.",
        image: "/illustrations/v4/finnish-spitz-feature-target-to-rest.webp",
        imageAlt: "보호자가 목재 새 표적과 긴 줄을 가방에 넣는 동안 숲의 휴대 매트에서 쉬는 붉은 성견 핀니시 스피츠 삽화",
      },
    ],
    caution: "새 사냥과 발성 배경이 모든 핀니시 스피츠의 추적이나 짖는 횟수를 뜻하지는 않아요. 자극에 반응하고 회복하는 방식은 개체마다 달라요.",
  },
  realitiesTitle: "핀니시 스피츠의 목소리와 붉은 털은 일상에서 어떻게 관리할까요?",
  realities: [
    {
      id: "window-return",
      title: "창밖을 오래 지키게 두기보다 한 번 확인하고 자리로 돌아와요.",
      body: "창 하단에 반투명 필름을 붙여 움직임을 줄이고, 소리를 알아차린 뒤 보호자 손을 보고 창에서 떨어진 매트로 오면 보상해주세요.",
      image: "/illustrations/v4/finnish-spitz-feature-window-return.webp",
      imageAlt: "하단 시야가 가려진 창에서 돌아서 보호자의 손과 떨어진 매트로 이동하는 붉은 성견 핀니시 스피츠 삽화",
    },
    {
      id: "coat-paw-care",
      title: "붉은 겉털 아래 속털과 숲길 뒤 발을 함께 확인해요.",
      body: "털갈이 때는 구간별로 속털을 빗어내고 피부까지 확인해주세요. 숲길을 다녀오면 발가락 사이와 다리 털의 잎·씨앗도 바로 살펴요.",
      image: "/illustrations/v4/finnish-spitz-feature-coat-paw-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 붉은 성견 핀니시 스피츠의 이중모를 빗고 발가락의 이물질을 확인하는 삽화",
    },
  ],
  readinessTitle: "핀니시 스피츠와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "높은 곳의 움직임을 찾는 관심을 긴 줄과 안전한 표적 과제로 바꿔줄 수 있나요?",
    "알림 소리 뒤 창에서 떨어진 자리로 돌아오는 흐름을 이웃과의 생활에 맞춰 연습할 수 있나요?",
    "털갈이 빗질과 야외 활동 뒤 발가락 사이 이물질 확인을 꾸준히 할 수 있나요?",
  ],
  relatedTitle: "비슷한 붉은 스피츠와 무엇이 다를까요?",
  relatedDescription: "여우 같은 외형만 보지 말고 원래 찾던 대상과 발성 방식, 체격을 함께 비교해보세요.",
  relatedDifferences: {
    shiba: "붉은 스피츠 외형은 닮았지만 핀니시 스피츠는 나무 위 새를 목소리로 알리던 역할과 더 긴 체형이 두드러져요.",
    "korea-jindo-dog": "스피츠형 사냥견 배경은 닮았지만 진돗개는 지상 사냥과 가정·마을 생활의 맥락, 체격과 피모 색 범위가 달라요.",
  },
});

export const karelianBearDogDetail = standardBreedDetailSchema.parse({
  slug: "karelian-bear-dog",
  nameKo: "카렐리안 베어 도그",
  metadataDescription: "핀란드와 카렐리아 숲에서 큰 사냥감을 찾아 거리를 두고 위치를 알리던 카렐리안 베어 도그의 배경과 안전한 표적 찾기, 야생동물 회피, 숲길 뒤 관리를 살펴봅니다.",
  heroStatement: "핀란드와 카렐리아의 숲에서 큰 사냥감을 찾아 거리를 두고 위치를 알리던 흑백 사냥 스피츠예요.",
  heroSizeDetails: {
    summaryRows: [
      { label: "체고", value: "성별로 다름" },
      { label: "몸무게", value: "성별로 다름" },
    ],
    detailsLabel: "성별 크기 기준 보기",
    items: [
      { id: "male-size", label: "수컷", value: "체고 54~60cm · 몸무게 약 25~28kg" },
      { id: "female-size", label: "암컷", value: "체고 49~55cm · 몸무게 약 17~20kg" },
    ],
  },
  story: {
    title: "카렐리안 베어 도그는 왜 큰 사냥감과 거리를 두고 움직였을까요?",
    description: "숲에서 흔적을 찾아 위치를 알리던 역할을 실제 야생동물과 맞닥뜨리지 않는 안전한 표적 과제로 바꿔봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "큰 사냥감의 흔적을 찾아 거리를 유지하며 위치를 알렸어요.",
        body: "카렐리안 베어 도그는 핀란드와 카렐리아 숲에서 곰과 엘크 같은 큰 사냥감의 냄새를 따라가고, 가까이 붙잡기보다 움직이며 소리로 위치를 알렸어요.",
        image: "/illustrations/v3/karelian-bear-dog-history.webp",
        imageAlt: "핀란드 숲에서 사냥꾼보다 앞서 큰 사냥감의 흔적을 찾고 충분한 거리를 유지하는 흑백 카렐리안 베어 도그 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "이중 울타리 너머 인공 표적을 찾은 뒤 사람에게 돌아와요.",
        body: "실제 동물 대신 튼튼한 울타리 너머에 곰 모양 냄새 표적을 두고, 긴 줄 안에서 찾게 해주세요. 발견한 뒤 돌아오라는 손짓을 보고 몸을 돌리면 바로 보상해요.",
        image: "/illustrations/v4/karelian-bear-dog-feature-bear-target-return.webp",
        imageAlt: "이중 울타리 너머 목재 곰 냄새 표적을 찾은 뒤 긴 줄을 유지하며 보호자에게 돌아서는 흑백 성견 카렐리안 베어 도그 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "표적과 긴 줄을 잠금 상자에 넣어 추적의 끝을 분명히 해요.",
        body: "찾기 과제가 끝나면 목재 표적과 긴 줄을 뚜껑 있는 상자에 수납하고 울타리 문을 닫아주세요. 개는 표적과 반대 방향의 매트에서 쉬게 해요.",
        image: "/illustrations/v4/karelian-bear-dog-feature-target-to-rest.webp",
        imageAlt: "보호자가 목재 곰 표적과 긴 줄을 장비 상자에 넣는 동안 닫힌 울타리 앞 매트에서 쉬는 흑백 성견 카렐리안 베어 도그 삽화",
      },
    ],
    caution: "큰 사냥감 작업 배경이 모든 개체의 추적 강도나 발성을 보장하지는 않아요. 다만 실제 반응을 알기 전에는 야생동물과의 물리적 거리를 넉넉하게 잡아야 해요.",
  },
  realitiesTitle: "숲을 좋아하는 중형견이라는 말만으로 놓치기 쉬운 책임은 무엇일까요?",
  realities: [
    {
      id: "wildlife-turn",
      title: "야생동물을 본 뒤 호출하기보다 보이기 전에 옆길로 돌아요.",
      body: "높은 야생동물 울타리 너머 움직임을 먼저 발견하면 긴 줄과 보조 연결을 유지한 채 옆길로 방향을 바꿔주세요. 가까이 가서 반응을 시험하지 않아요.",
      image: "/illustrations/v4/karelian-bear-dog-feature-wildlife-turn.webp",
      imageAlt: "높은 야생동물 울타리 너머 먼 사슴을 보고 옆길로 방향을 바꾸는 보호자와 흑백 성견 카렐리안 베어 도그 삽화",
    },
    {
      id: "coat-paw-check",
      title: "숲길 뒤에는 흑백 이중모와 발 사이를 바로 펼쳐 봐요.",
      body: "어두운 겉털 안의 작은 이물질도 피부까지 나누어 확인해주세요. 발가락과 다리 털에 붙은 솔잎·씨앗을 빼고 젖은 부분은 충분히 말려요.",
      image: "/illustrations/v4/karelian-bear-dog-feature-coat-paw-check.webp",
      imageAlt: "숲길 뒤 미끄럼 방지 매트에서 보호자가 흑백 성견 카렐리안 베어 도그의 이중모를 빗고 발의 솔잎을 확인하는 삽화",
    },
  ],
  readinessTitle: "카렐리안 베어 도그와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "야생동물이 있는 곳에서 오프리드로 풀지 않고 긴 줄과 보조 연결, 높은 울타리를 사용할 수 있나요?",
    "실제 동물 대신 차단된 냄새 표적을 찾고 사람에게 돌아오는 과제를 설계할 수 있나요?",
    "숲길 활동 뒤 이중모와 발가락 사이의 이물질과 습기를 바로 확인할 수 있나요?",
  ],
  relatedTitle: "다른 북유럽 사냥 스피츠와 무엇이 다를까요?",
  relatedDescription: "검은색과 흰색 외형뿐 아니라 찾던 사냥감의 크기와 위치를 알리는 방식을 함께 비교해보세요.",
  relatedDifferences: {
    "norwegian-elkhound-grey": "큰 사냥감을 찾고 소리로 위치를 알리던 점은 닮았지만 엘크하운드는 회색 피모와 더 묵직한 체형이 특징이에요.",
    "finnish-spitz": "핀란드 사냥 스피츠의 발성을 공유하지만 핀니시 스피츠는 주로 나무 위 새를 찾았고 체격도 더 작아요.",
  },
});

export const lhasaApsoDetail = standardBreedDetailSchema.parse({
  slug: "lhasa-apso",
  nameKo: "라사압소",
  metadataDescription: "티베트의 궁전과 수도원 안에서 작은 소리와 방문을 알리던 라사압소의 배경과 오늘의 알림 전환, 방문객 거리, 긴 피모 관리를 살펴봅니다.",
  heroStatement: "티베트의 궁전과 수도원 안에서 작은 소리와 낯선 방문을 먼저 알리던 소형 감시·반려견이에요.",
  story: {
    title: "라사압소는 왜 작은 몸으로 실내의 변화를 먼저 알렸을까요?",
    description: "궁전과 수도원 내부의 감시·동행 역할을 오늘의 현관 소리 확인과 자리 복귀로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "티베트의 건물 안에서 작은 소리와 방문을 먼저 알렸어요.",
        body: "라사압소는 궁전과 불교 수도원 내부에서 사람 곁에 지내며 복도와 출입구의 작은 변화를 알아차리고 알리는 역할을 했어요.",
        image: "/illustrations/v3/lhasa-apso-history.webp",
        imageAlt: "티베트 수도원 내부 복도에서 승려 곁에 머물며 닫힌 출입문의 소리를 살피는 장모 라사압소 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "현관 소리를 확인한 뒤 사람의 손을 보고 자리로 돌아와요.",
        body: "작은 무선 초인종 소리를 한 번 들려주고 닫힌 현관문을 확인하게 한 뒤, 자리로 오라는 손짓을 보면 문에서 떨어진 낮은 매트로 오는 순서를 알려주세요.",
        image: "/illustrations/v4/lhasa-apso-feature-door-return.webp",
        imageAlt: "닫힌 현관문과 무선 초인종을 확인한 뒤 보호자의 자리로 오라는 손짓과 떨어진 매트로 돌아서는 장모 성견 라사압소 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "소리 연습 도구를 서랍에 넣어 감시 시간이 끝났다고 알려요.",
        body: "무선 초인종과 보상 주머니를 서랍에 넣고 현관에서 떨어진 매트에서 쉬게 해주세요. 집 안 소리를 계속 확인하지 않는 시간도 일과에 포함해요.",
        image: "/illustrations/v4/lhasa-apso-feature-alert-to-rest.webp",
        imageAlt: "보호자가 무선 초인종과 보상 주머니를 서랍에 넣는 동안 현관에서 떨어진 매트에서 쉬는 장모 성견 라사압소 삽화",
      },
    ],
    caution: "실내 감시 역할이 모든 라사압소의 짖음이나 낯가림을 뜻하지는 않아요. 소리에 반응하는 강도와 사람을 받아들이는 속도는 개체마다 달라요.",
  },
  realitiesTitle: "작은 반려견이라는 인상 너머에 어떤 준비가 필요할까요?",
  realities: [
    {
      id: "visitor-distance",
      title: "방문객에게 안겨 보내기보다 닫힌 안전문 뒤에서 선택하게 해요.",
      body: "개와 보호자는 숨을 자리와 매트가 있는 안쪽 공간에 머물고 안전문을 닫아주세요. 방문객은 옆으로 앉아 손을 내밀지 않고, 개가 거리를 줄일지는 기다려요.",
      image: "/illustrations/v4/lhasa-apso-feature-visitor-distance.webp",
      imageAlt: "닫힌 안전문 안쪽에서 보호자와 함께 머물고 현관에 옆으로 앉은 방문객과 거리를 둔 장모 성견 라사압소 삽화",
    },
    {
      id: "section-grooming",
      title: "긴 털은 겉만 훑지 말고 얇은 층으로 나눠 끝부터 빗어요.",
      body: "몸통 털을 좁은 구간씩 들어 올려 끝의 엉킴부터 풀고 피부까지 확인해주세요. 눈을 가리는 얼굴 털은 갈라 주고 젖은 부분은 부드럽게 닦아요.",
      image: "/illustrations/v4/lhasa-apso-feature-section-grooming.webp",
      imageAlt: "넓은 미끄럼 방지 매트에서 보호자가 장모 성견 라사압소의 옆털을 얇게 나눠 끝부터 빗는 삽화",
    },
  ],
  readinessTitle: "라사압소와 살기 전 확인할 세 가지",
  readinessQuestions: [
    "현관과 복도 소리에 반응한 뒤 떨어진 자리로 돌아오는 흐름을 꾸준히 연습할 수 있나요?",
    "방문객과 바로 접촉시키지 않고 닫힌 안전문과 숨을 자리를 준비할 수 있나요?",
    "긴 피모를 얇게 나누어 빗고 눈 주변을 매일 짧게 살필 시간을 낼 수 있나요?",
  ],
  relatedTitle: "비슷한 티베트계 소형견과 무엇이 다를까요?",
  relatedDescription: "긴 털과 작은 몸만 보지 말고 얼굴 구조, 원래 머물던 공간과 감시 역할을 함께 비교해보세요.",
  relatedDifferences: {
    "shih-tzu": "티베트계 소형 장모견이라는 뿌리는 닮았지만 시츄는 중국 궁정의 반려견으로 발전했고 얼굴이 더 짧고 넓어요.",
    "tibetan-spaniel": "수도원에서 알림과 동행을 한 점은 닮았지만 티베탄 스패니얼은 피모가 더 짧고 높은 곳에서 바깥을 살피던 배경이 두드러져요.",
  },
});

export const tibetanSpanielDetail = standardBreedDetailSchema.parse({
  slug: "tibetan-spaniel",
  nameKo: "티베탄 스패니얼",
  metadataDescription: "티베트 수도원의 높은 담과 창가에서 바깥을 살피고 변화를 알리던 티베탄 스패니얼의 배경과 오늘의 안전한 관찰대, 창문 안전, 피모 관리를 살펴봅니다.",
  heroStatement: "티베트 수도원의 높은 담과 창가에서 바깥을 살피고 변화를 알리던 작은 감시·반려견이에요.",
  story: {
    title: "티베탄 스패니얼은 왜 높은 곳에서 주변을 살폈을까요?",
    description: "수도원의 담과 창가에서 바깥 변화를 알리던 배경을 안전한 낮은 관찰대와 휴식 전환으로 연결해 봐요.",
    steps: [
      {
        navLabel: "과거의 역할",
        eyebrow: "1단계 · 무엇을 하던 개였을까?",
        title: "수도원의 높은 담과 창가에서 바깥 움직임을 살폈어요.",
        body: "티베탄 스패니얼은 티베트의 수도원과 가정에서 사람 곁에 지내며 높은 자리에서 접근하는 사람과 동물을 먼저 보고 알렸다고 전해져요.",
        image: "/illustrations/v3/tibetan-spaniel-history.webp",
        imageAlt: "티베트 수도원의 낮고 넓은 담 위 안전한 자리에서 승려 곁의 계곡 길을 살피는 티베탄 스패니얼 역사 삽화",
      },
      {
        navLabel: "현재의 경향",
        eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?",
        title: "닫힌 창 앞의 낮은 관찰대에서 보고 사람에게 돌아와요.",
        body: "등과 옆이 막힌 낮고 넓은 관찰대에 완만한 경사로를 연결해주세요. 잠깐 밖을 본 뒤 내려오라는 손짓을 보면 경사로로 이동하는 순서를 알려줘요.",
        image: "/illustrations/v4/tibetan-spaniel-feature-lookout-return.webp",
        imageAlt: "닫힌 창 앞의 난간 있는 낮은 관찰대에서 보호자의 손을 보고 완만한 경사로로 돌아서는 성견 티베탄 스패니얼 삽화",
      },
      {
        navLabel: "생활의 현실",
        eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
        title: "커튼을 닫고 경사로를 접으면 관찰 시간이 끝나요.",
        body: "창밖 확인이 길어지지 않도록 커튼을 닫고 관찰대 경사로를 옆에 접어주세요. 개는 창과 떨어진 바닥 매트에서 쉬며 주변 소리를 흘려보내요.",
        image: "/illustrations/v4/tibetan-spaniel-feature-lookout-to-rest.webp",
        imageAlt: "보호자가 커튼을 닫고 관찰대 경사로를 접는 동안 창에서 떨어진 바닥 매트에서 쉬는 성견 티베탄 스패니얼 삽화",
      },
    ],
    caution: "높은 곳을 살피던 배경이 모든 티베탄 스패니얼의 창가 집착이나 발성을 뜻하지는 않아요. 관찰 방식과 회복 속도는 환경과 개체에 따라 달라요.",
  },
  realitiesTitle: "작은 몸으로 높은 곳을 찾을 때 무엇을 먼저 준비할까요?",
  realities: [
    {
      id: "balcony-lock",
      title: "방충망만 믿지 말고 창과 베란다 문에 보조 잠금을 둬요.",
      body: "미닫이문은 완전히 닫고 손이 닿기 어려운 높이에 보조 잠금을 설치해주세요. 방충망도 흔들림을 확인하고 개는 베란다 안으로 내보내지 않아요.",
      image: "/illustrations/v4/tibetan-spaniel-feature-balcony-lock.webp",
      imageAlt: "닫힌 베란다 미닫이문의 높은 보조 잠금과 고정된 방충망을 확인하는 보호자 곁에 안전하게 머무는 성견 티베탄 스패니얼 삽화",
    },
    {
      id: "feathering-care",
      title: "귀 뒤와 가슴의 장식털은 짧게 자주 빗고 발도 살펴요.",
      body: "엉키기 쉬운 귀 뒤와 가슴 털을 손으로 나누고 끝부터 빗어주세요. 작은 발의 털과 이물질도 함께 확인하되 오래 붙잡지 않아요.",
      image: "/illustrations/v4/tibetan-spaniel-feature-feathering-care.webp",
      imageAlt: "미끄럼 방지 매트에서 보호자가 성견 티베탄 스패니얼의 귀 뒤와 가슴 장식털을 빗고 앞발을 살피는 삽화",
    },
  ],
  readinessTitle: "티베탄 스패니얼과 살기 전 확인할 세 가지",
  readinessQuestions: [
    "창문과 베란다 문에 보조 잠금을 두고 안전한 낮은 관찰대를 따로 마련할 수 있나요?",
    "창밖을 잠깐 본 뒤 경사로로 내려와 바닥 매트에서 쉬는 흐름을 알려줄 수 있나요?",
    "귀 뒤와 가슴 장식털, 작은 발을 짧게 자주 관리할 시간을 낼 수 있나요?",
  ],
  relatedTitle: "다른 티베트계 소형견과 무엇이 다를까요?",
  relatedDescription: "작은 체격만 보지 말고 피모 길이와 얼굴 구조, 높은 곳을 활용한 감시 배경을 함께 비교해보세요.",
  relatedDifferences: {
    "lhasa-apso": "수도원에서 알림과 동행을 한 점은 닮았지만 라사압소는 훨씬 길고 무거운 피모와 실내 통로 감시 배경이 두드러져요.",
    pekingese: "작고 긴 장식털과 동아시아 궁정 배경은 닮아 보여도 페키니즈는 더 짧고 납작한 얼굴과 무거운 앞부분 체형이 특징이에요.",
  },
});

export const expansionTo200Batch01StandardBreedDetails = [
  puliDetail,
  whiteSwissShepherdDogDetail,
  welshCorgiCardiganDetail,
  sharPeiDetail,
  bulldogDetail,
  americanAkitaDetail,
  finnishSpitzDetail,
  karelianBearDogDetail,
  lhasaApsoDetail,
  tibetanSpanielDetail,
];
