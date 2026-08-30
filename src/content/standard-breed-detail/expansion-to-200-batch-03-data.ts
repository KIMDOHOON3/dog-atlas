import { standardBreedDetailSchema } from "./schema";

type StorySeed = {
  navLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  imageId: string;
  imageAlt: string;
};

type RealitySeed = {
  id: string;
  title: string;
  body: string;
  imageAlt: string;
};

type DetailSeed = {
  slug: string;
  nameKo: string;
  metadataDescription: string;
  heroStatement: string;
  heroSizeDetails?: {
    summaryRows: Array<{ label: string; value: string }>;
    detailsLabel: string;
    items: Array<{ id: string; label: string; value: string }>;
  };
  storyTitle: string;
  storyDescription: string;
  story: [StorySeed, StorySeed, StorySeed];
  caution: string;
  realitiesTitle: string;
  realities: [RealitySeed, RealitySeed];
  readinessTitle: string;
  readinessQuestions: [string, string, string];
  relatedTitle: string;
  relatedDescription: string;
  relatedDifferences: Record<string, string>;
};

const seeds = [
  {
    slug: "dogue-de-bordeaux",
    nameKo: "도그 드 보르도",
    metadataDescription: "프랑스에서 집과 가축을 지키고 정육업자의 수레 일을 돕던 도그 드 보르도의 배경과 오늘의 자리 이동, 더위·침 관리, 성별 크기 기준을 살펴봅니다.",
    heroStatement: "프랑스에서 집과 가축을 지키고 정육업자의 무거운 수레 일도 돕던 오래된 마스티프예요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "성별 최소 기준" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 60~68cm · 몸무게 50kg 이상" },
        { id: "female-size", label: "암컷", value: "체고 58~66cm · 몸무게 45kg 이상" },
      ],
    },
    storyTitle: "도그 드 보르도의 묵직한 힘은 어디에 쓰였을까요?",
    storyDescription: "집과 가축을 지키고 수레를 돕던 힘을 오늘의 천천한 이동과 편안한 회복으로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "집과 가축을 지키고 정육업자의 수레 일을 도왔어요.", body: "도그 드 보르도는 프랑스에서 큰 사냥감과 경비에 쓰였고, 19세기에는 정육업자 곁에서 가축을 지키거나 짐수레를 움직이는 일도 맡았어요.", imageId: "history", imageAlt: "19세기 프랑스 정육점 마당에서 정육업자와 작은 짐수레 곁을 지키는 황갈색 성견 도그 드 보르도 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "힘으로 버티기 전에 넓은 자리로 천천히 이동해요.", body: "닫힌 문 옆의 큰 매트로 네 발을 옮기고 보호자를 바라보면 보상해, 출입구를 몸으로 막는 대신 정해진 자리에서 상황을 살피게 해주세요.", imageId: "doorway-mat", imageAlt: "닫힌 현관문 옆 넓은 매트로 이동해 보호자를 바라보는 황갈색 성견 도그 드 보르도 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "짧게 움직인 뒤에도 시원한 바닥과 긴 회복 시간이 필요해요.", body: "더운 시간의 활동을 피하고 물과 미끄럼 방지 길을 준비한 뒤, 목줄을 수납하면 통행에서 떨어진 서늘한 자리에 눕는 흐름을 만들어주세요.", imageId: "cool-route-to-rest", imageAlt: "보호자가 목줄을 수납하는 동안 물그릇 곁의 시원한 큰 매트에 쉬는 황갈색 성견 도그 드 보르도 삽화" },
    ],
    caution: "오래된 경비 배경이 모든 개체의 침착함이나 낯선 사람에 대한 반응을 보장하지 않아요. 거리와 회복은 개체별로 확인해야 해요.",
    realitiesTitle: "무거운 몸과 짧은 주둥이는 집에서 무엇을 바꿀까요?",
    realities: [
      { id: "wide-turning-route", title: "가구 사이에는 몸 전체가 돌아설 폭을 남겨요.", body: "좁은 모서리와 미끄러운 바닥을 피하도록 큰 러너를 이어 깔고, 침대와 물그릇까지 사람을 밀지 않고 이동할 넓은 길을 확보해주세요.", imageAlt: "넓은 미끄럼 방지 러너를 따라 가구 사이를 천천히 돌아가는 황갈색 성견 도그 드 보르도 삽화" },
      { id: "fold-drool-care", title: "입 주변 침과 얼굴 주름은 젖은 채로 두지 않아요.", body: "물과 식사 뒤 부드러운 천으로 입가와 접힌 피부를 닦고 충분히 말리며, 붉어짐이나 냄새처럼 평소와 다른 변화가 없는지 살펴주세요.", imageAlt: "낮은 매트에서 보호자가 황갈색 성견 도그 드 보르도의 입가와 얼굴 주름을 부드럽게 닦는 삽화" },
    ],
    readinessTitle: "도그 드 보르도와 살기 전 확인할 세 가지",
    readinessQuestions: ["큰 몸이 돌아설 넓은 동선과 미끄럽지 않은 바닥을 마련할 수 있나요?", "더운 날 활동을 줄이고 호흡이 편안해질 때까지 충분히 기다릴 수 있나요?", "입가와 피부 주름을 매일 닦고 완전히 말리는 관리를 이어갈 수 있나요?"],
    relatedTitle: "비슷해 보이는 마스티프도 역사와 생활 부담은 달라요.",
    relatedDescription: "경비견이라는 한 단어보다 과거의 작업, 체형과 얼굴 구조, 집 안 동선까지 함께 비교해보세요.",
    relatedDifferences: { bullmastiff: "둘 다 무거운 영지 경비견처럼 보이지만 도그 드 보르도는 프랑스의 정육업·가축 경비 기록과 붉은 황갈색 머리가 뚜렷해요.", mastiff: "마스티프보다 평균 체고는 낮아도 머리와 앞몸이 매우 묵직해, 이동 폭과 더위·침 관리 부담을 따로 봐야 해요." },
  },
  {
    slug: "neapolitan-mastiff",
    nameKo: "네아폴리탄 마스티프",
    metadataDescription: "나폴리 지역의 집과 농장 뜰을 지키던 네아폴리탄 마스티프의 배경과 오늘의 방문객 경계, 짧은 활동과 회복, 주름·눈 주변 관리를 살펴봅니다.",
    heroStatement: "나폴리 지역의 집과 농장 뜰 가까이에 머물며 낯선 접근을 막던 거대한 경비견이에요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "성별로 다름" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 65~75cm · 몸무게 60~70kg" },
        { id: "female-size", label: "암컷", value: "체고 60~68cm · 몸무게 50~60kg" },
      ],
    },
    storyTitle: "네아폴리탄 마스티프는 왜 뜰 가까이에 머물렀을까요?",
    storyDescription: "나폴리의 집과 농장을 지키던 존재감을 오늘의 이중 경계와 예측 가능한 방문 절차로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "나폴리의 집과 농장 뜰에서 출입을 지켰어요.", body: "네아폴리탄 마스티프는 베수비오산 주변 농촌과 나폴리 지역에서 살아남아, 가족의 공간과 재산 가까이에서 낯선 접근을 막는 역할을 했어요.", imageId: "history", imageAlt: "나폴리 지역의 돌담 농장 뜰에서 관리인과 함께 대문을 지키는 청회색 성견 네아폴리탄 마스티프 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "방문객을 만나기 전에 두 겹의 경계 뒤 자리로 이동해요.", body: "현관문이 열리기 전 안전문 안쪽의 큰 매트로 이동하고, 두 번째 문이 닫힌 상태에서 보호자를 바라보는 행동부터 차분히 보상해주세요.", imageId: "double-gate-mat", imageAlt: "닫힌 현관문과 안전문 두 겹 뒤 큰 매트에서 보호자를 보는 청회색 성견 네아폴리탄 마스티프 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "오래 달리기보다 짧게 살핀 뒤 몸을 충분히 내려놓아요.", body: "집 둘레를 짧게 걷고 들어오면 리드를 걸어둔 뒤, 통행과 떨어진 넓고 서늘한 침대에 옆으로 눕는 회복 시간을 길게 확보해주세요.", imageId: "patrol-to-rest", imageAlt: "짧은 집 둘레 산책 뒤 넓고 서늘한 침대에 옆으로 쉬는 청회색 성견 네아폴리탄 마스티프 삽화" },
    ],
    caution: "경비견의 배경이 모든 개체의 용기나 사람 관계를 정하지 않아요. 낯선 사람과 공간에 대한 반응은 실제 개체와 환경에서 확인해야 해요.",
    realitiesTitle: "거대한 체격과 느슨한 피부는 어떤 준비를 요구할까요?",
    realities: [
      { id: "vehicle-ramp-route", title: "차량과 진료 이동은 아프기 전에 연습해요.", body: "몸을 들어 옮기기 어려운 크기이므로 넓고 낮은 경사판을 미끄럽지 않게 고정하고, 스스로 천천히 오르고 멈추는 짧은 연습을 평소에 해주세요.", imageAlt: "낮고 넓은 차량 경사판 앞에서 보호자 신호에 맞춰 천천히 오르는 청회색 성견 네아폴리탄 마스티프 삽화" },
      { id: "wrinkle-eye-check", title: "주름의 깊이보다 피부와 눈이 편안한지 살펴요.", body: "얼굴과 목의 접힌 부위를 벌려 습기와 냄새를 확인하고 말리며, 눈꺼풀과 눈물이 평소보다 불편해 보이면 외형 탓으로 넘기지 마세요.", imageAlt: "밝은 실내 매트에서 보호자가 청회색 성견 네아폴리탄 마스티프의 얼굴 주름과 눈 주변을 살피는 삽화" },
    ],
    readinessTitle: "네아폴리탄 마스티프와 살기 전 확인할 세 가지",
    readinessQuestions: ["방문객 동선을 두 겹으로 나누고 개가 머물 큰 자리를 만들 수 있나요?", "초대형견이 아플 때 차량과 진료실까지 안전하게 이동할 방법이 있나요?", "얼굴·목 주름과 눈 주변을 매일 살피고 젖은 부위를 말릴 수 있나요?"],
    relatedTitle: "이탈리아 경비견도 몸을 쓰는 방식이 같지는 않아요.",
    relatedDescription: "지역과 역할, 체형의 무게와 피부 관리 부담을 함께 놓고 비교해보세요.",
    relatedDifferences: { "cane-corso": "카네 코르소는 더 민첩한 농장 작업과 경비 배경이 두드러지고, 네아폴리탄 마스티프는 훨씬 무거운 몸과 느슨한 피부가 생활을 크게 바꿔요.", mastiff: "둘 다 초대형 마스티프지만 네아폴리탄 마스티프는 나폴리 지역의 경비 배경과 풍부한 주름·늘어진 피부 관리가 특히 뚜렷해요." },
  },
  {
    slug: "continental-bulldog",
    nameKo: "컨티넨탈 불독",
    metadataDescription: "스위스에서 더 기능적인 중형 불독을 목표로 형성된 컨티넨탈 불독의 배경과 오늘의 속도 조절, 더위·호흡 관찰, 성별 크기 기준을 살펴봅니다.",
    heroStatement: "스위스에서 활동적이고 기능적인 중형 불독을 목표로 새롭게 형성된 반려견이에요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "체고에 따라 다름" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 42~50cm · 몸무게 약 30kg" },
        { id: "female-size", label: "암컷", value: "체고 40~48cm · 몸무게 약 25kg" },
      ],
    },
    storyTitle: "컨티넨탈 불독은 왜 비교적 최근에 만들어졌을까요?",
    storyDescription: "중형 불독의 외형과 편안한 움직임을 함께 추구한 배경을 오늘의 규칙적인 활동과 회복으로 연결해봐요.",
    story: [
      { navLabel: "형성의 배경", eyebrow: "1단계 · 왜 새로 형성됐을까?", title: "불독다운 모습과 활동 가능한 몸을 함께 목표로 했어요.", body: "스위스에서는 잉글리시 불독과 조상형 불독 계통을 바탕으로, 중간 크기의 운동 능력과 더 기능적인 체형을 지닌 별도 견종을 형성했어요.", imageId: "history", imageAlt: "스위스의 완만한 공원 길에서 사육자와 힘차게 걷는 브린들 성견 컨티넨탈 불독 형성 배경 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 오늘은 어떻게 움직일까?", title: "빠르기보다 소리 없이 편안한 보폭을 먼저 확인해요.", body: "짧은 직선 길을 걷고 가볍게 속도를 올렸다가 표식에서 멈춰, 움직이는 동안 거친 숨소리 없이 몸이 편안한지 살펴주세요.", imageId: "quiet-trot-check", imageAlt: "평평한 공원 길에서 보호자와 짧게 속도를 바꾸며 걷는 브린들 성견 컨티넨탈 불독 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "활동적인 불독이어도 더위와 회복을 건너뛰면 안 돼요.", body: "기온이 낮은 시간에 짧게 움직이고 그늘의 물그릇 앞에서 호흡을 가다듬은 뒤, 장비를 치우면 시원한 매트로 이동하게 해주세요.", imageId: "shade-recovery", imageAlt: "그늘의 물그릇 곁에서 호흡을 가다듬은 뒤 시원한 매트로 이동하는 브린들 성견 컨티넨탈 불독 삽화" },
    ],
    caution: "기능적인 체형을 목표로 했다는 품종 설명이 모든 개체의 호흡과 운동 능력을 보장하지 않아요. 실제 호흡과 회복을 우선 확인해야 해요.",
    realitiesTitle: "활동적인 불독이라는 말은 일상에서 무엇을 뜻할까요?",
    realities: [
      { id: "steady-weight-route", title: "체중 관리는 긴 달리기보다 꾸준한 걷기로 시작해요.", body: "미끄럽지 않은 평지에서 냄새를 맡을 여유를 주며 규칙적으로 걷고, 운동량을 갑자기 늘리기보다 몸 상태와 회복에 맞춰 조금씩 조절해주세요.", imageAlt: "평평한 산책로에서 냄새를 맡으며 일정한 보폭으로 걷는 브린들 성견 컨티넨탈 불독 삽화" },
      { id: "skin-paw-handling", title: "짧은 털 아래 피부와 발을 만지는 습관을 만들어요.", body: "산책 뒤 겨드랑이와 배, 발가락 사이를 순서대로 살피고, 작은 붉어짐이나 쓸림이 보이면 핥기 전에 깨끗하고 건조하게 관리해주세요.", imageAlt: "현관 매트에서 보호자가 브린들 성견 컨티넨탈 불독의 배 피부와 발가락 사이를 확인하는 삽화" },
    ],
    readinessTitle: "컨티넨탈 불독과 살기 전 확인할 세 가지",
    readinessQuestions: ["매일 규칙적으로 걷되 거친 숨소리와 회복 속도에 맞춰 강도를 낮출 수 있나요?", "더운 시간의 활동을 피하고 그늘과 물, 시원한 휴식 자리를 준비할 수 있나요?", "체중과 피부·발 상태를 일상 핸들링으로 꾸준히 확인할 수 있나요?"],
    relatedTitle: "불독이라는 이름이 같아도 형성 목표와 몸은 달라요.",
    relatedDescription: "얼굴만 보지 말고 만들어진 시기와 기능적 움직임, 실제 호흡과 체격을 함께 비교해보세요.",
    relatedDifferences: { bulldog: "컨티넨탈 불독은 스위스에서 더 활동적인 중형 체형을 목표로 형성됐고, 잉글리시 불독과는 별도 표준과 더 긴 다리 비율을 가졌어요.", "french-bulldog": "둘 다 사람 곁의 불독형 반려견이지만 컨티넨탈 불독은 훨씬 크고 매일 필요한 이동 규모와 힘 관리가 달라요." },
  },
  {
    slug: "smooth-fox-terrier",
    nameKo: "스무드 폭스 테리어",
    metadataDescription: "영국 여우 사냥에서 굴속 여우를 밖으로 몰아내던 스무드 폭스 테리어의 배경과 오늘의 터널 회수, 움직임 거리, 짧은 피모 관리를 살펴봅니다.",
    heroStatement: "영국 여우 사냥에서 좁은 굴로 들어가 여우를 사냥 무리 쪽으로 몰아내던 매끈한 단모 테리어예요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "수컷 39cm 이하" }, { label: "몸무게", value: "성별로 다름" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 39cm 이하 · 몸무게 7.5~8kg" },
        { id: "female-size", label: "암컷", value: "수컷보다 조금 작음 · 몸무게 7~7.5kg" },
      ],
    },
    storyTitle: "스무드 폭스 테리어는 사냥 행렬에서 어떤 일을 했을까요?",
    storyDescription: "여우를 굴 밖으로 몰아내던 빠른 진입과 복귀를 오늘의 짧은 터널 과제로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "사냥개 무리보다 작은 몸으로 여우굴에 들어갔어요.", body: "스무드 폭스 테리어는 영국의 여우 사냥에서 굴로 숨은 여우를 찾아 들어가 바깥으로 몰아내고, 다시 사냥꾼에게 돌아오는 역할을 맡았어요.", imageId: "history", imageAlt: "영국 들판의 여우굴 입구에서 사냥꾼의 신호를 기다리는 흰색과 황갈색 성견 스무드 폭스 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "짧은 천 터널을 통과한 뒤 사람에게 바로 돌아와요.", body: "실제 굴 대신 열린 양쪽이 보이는 짧고 넓은 터널을 지나 낮은 표식을 찾고, 끝에서 주변을 쫓지 않고 보호자에게 돌아오면 보상해주세요.", imageId: "tunnel-return", imageAlt: "울타리 안 짧고 넓은 천 터널을 통과해 보호자에게 돌아오는 흰색과 황갈색 성견 스무드 폭스 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "짧게 폭발한 움직임 뒤에는 장비가 사라져야 쉬어요.", body: "터널과 표식을 접어 닫힌 상자에 넣고 물을 마신 뒤, 창밖 움직임이 보이지 않는 매트에서 몸을 낮추는 순서를 반복해주세요.", imageId: "tunnel-to-rest", imageAlt: "보호자가 천 터널을 접어 상자에 넣는 동안 창에서 떨어진 매트에 쉬는 성견 스무드 폭스 테리어 삽화" },
    ],
    caution: "굴 사냥의 배경이 모든 개체의 추적 강도나 회수 능력을 뜻하지 않아요. 작은 동물과 빠른 움직임에 대한 반응은 개체별로 달라요.",
    realitiesTitle: "매끈한 털 아래 놓치기 쉬운 생활 관리는 무엇일까요?",
    realities: [
      { id: "moving-target-distance", title: "작은 동물과 바퀴가 보이면 먼저 옆길을 선택해요.", body: "리드를 짧게 당겨 버티기보다 화단이나 주차 차량 뒤로 넓게 돌아 시야를 줄이고, 움직임에서 눈을 떼어 보호자를 보면 보상해주세요.", imageAlt: "공원 옆길에서 멀리 지나가는 자전거 대신 보호자를 보는 성견 스무드 폭스 테리어 삽화" },
      { id: "short-coat-body-check", title: "짧은 털은 피부와 작은 상처가 바로 보이는 장점이 있어요.", body: "풀밭 활동 뒤 가슴과 배, 다리 안쪽을 손으로 훑어 긁힘과 붙은 씨앗을 확인하고, 발톱이 길어 빠른 움직임을 방해하지 않는지 살펴주세요.", imageAlt: "밝은 현관에서 보호자가 성견 스무드 폭스 테리어의 짧은 털과 발톱을 살피는 삽화" },
    ],
    readinessTitle: "스무드 폭스 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["짧고 빠른 놀이 뒤 사람에게 돌아오고 쉬는 순서까지 가르칠 수 있나요?", "작은 동물과 바퀴를 마주치기 전에 리드와 시야 가림으로 거리를 만들 수 있나요?", "활동 뒤 짧은 털 아래 피부와 발톱을 빠짐없이 확인할 수 있나요?"],
    relatedTitle: "두 폭스 테리어는 털만 다른 견종일까요?",
    relatedDescription: "공통된 굴 작업 배경과 함께 피모의 질감, 손질 방식과 생활 속 장면을 구분해보세요.",
    relatedDifferences: { "wire-fox-terrier": "같은 폭스 테리어 작업을 공유하지만 스무드는 평평하고 단단한 짧은 털이라 손질보다 활동 뒤 피부 확인이 중심이에요.", "jack-russell-terrier": "둘 다 빠른 굴 작업 테리어지만 스무드 폭스 테리어는 더 길고 반듯한 다리와 전통 여우 사냥 행렬의 역할이 뚜렷해요." },
  },
  {
    slug: "wire-fox-terrier",
    nameKo: "와이어 폭스 테리어",
    metadataDescription: "영국 여우 사냥에서 굴속 여우를 몰아내던 와이어 폭스 테리어의 배경과 오늘의 냄새 경로, 흥분 회복, 거친 이중모 손질을 살펴봅니다.",
    heroStatement: "영국 여우 사냥에서 굴속 여우를 몰아내던 역할과 빽빽하고 거친 털을 함께 지닌 테리어예요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "수컷 39cm 이하" }, { label: "몸무게", value: "성별로 다름" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 39cm 이하 · 이상적 몸무게 8.25kg" },
        { id: "female-size", label: "암컷", value: "수컷보다 조금 작고 가벼움" },
      ],
    },
    storyTitle: "와이어 폭스 테리어의 거친 털은 어떤 일과 어울렸을까요?",
    storyDescription: "덤불과 굴을 오가던 몸과 털을 오늘의 통제된 냄새 경로와 분명한 종료 신호로 연결해봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "덤불을 헤치고 굴에 들어가 여우를 밖으로 몰았어요.", body: "와이어 폭스 테리어는 여우 사냥대와 이동하다가 여우가 굴로 숨으면 좁은 통로에 들어가 밖으로 나오게 하는 작업을 맡았어요.", imageId: "history", imageAlt: "영국의 거친 생울타리와 여우굴 앞에서 사냥꾼의 신호를 기다리는 성견 와이어 폭스 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "덤불 대신 여러 높이의 냄새 통을 차례로 찾아요.", body: "울타리 안 낮은 상자와 솔가지 더미 곁의 닫힌 향 통을 순서대로 찾고, 마지막 통 뒤에는 보호자 손 표적으로 돌아오게 해주세요.", imageId: "brush-scent-route", imageAlt: "울타리 안 솔가지 더미와 낮은 상자 사이의 닫힌 향 통을 찾는 성견 와이어 폭스 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "찾기가 끝난 뒤 코와 몸을 계속 쓰지 않도록 마침표를 보여줘요.", body: "향 통을 모두 뚜껑 있는 상자에 넣고 보호자가 빈 손을 보여준 뒤, 조금 떨어진 매트에서 씹을 것을 받아 쉬는 순서를 유지해주세요.", imageId: "scent-box-to-rest", imageAlt: "보호자가 향 통을 뚜껑 상자에 넣는 동안 떨어진 매트에서 쉬는 성견 와이어 폭스 테리어 삽화" },
    ],
    caution: "굴 작업 배경이 모든 개체의 끈기나 작은 동물 반응을 똑같게 만들지는 않아요. 추적과 회복의 강도는 실제 개체를 관찰해야 해요.",
    realitiesTitle: "빠른 테리어와 거친 털을 함께 관리하려면 무엇이 필요할까요?",
    realities: [
      { id: "garden-dig-zone", title: "정원을 막기만 하지 말고 파도 되는 자리를 정해요.", body: "흙이나 종이를 담은 낮은 파기 상자에 냄새 천을 얕게 숨기고, 찾은 뒤에는 상자를 덮어 활동이 끝났다는 단서를 분명히 보여주세요.", imageAlt: "정원 한쪽 낮은 파기 상자에서 냄새 천을 찾는 성견 와이어 폭스 테리어 삽화" },
      { id: "wire-coat-care", title: "거친 겉털의 결은 빗질과 전문 손질을 나눠 관리해요.", body: "다리와 턱의 긴 털은 작은 구역으로 나누어 엉킴을 풀고, 거친 질감을 유지하는 손질 방식과 주기는 숙련된 미용사와 상의해주세요.", imageAlt: "미용 매트에서 보호자가 성견 와이어 폭스 테리어의 다리와 턱 털을 나누어 빗는 삽화" },
    ],
    readinessTitle: "와이어 폭스 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["추적과 파기 욕구를 안전한 냄새 과제로 바꾸고 종료 신호까지 만들 수 있나요?", "작은 동물과 빠른 움직임을 만날 때 울타리와 리드로 먼저 거리를 지킬 수 있나요?", "일상 빗질과 거친 털의 전문 손질을 꾸준히 계획할 수 있나요?"],
    relatedTitle: "같은 폭스 테리어라도 손에 닿는 털과 관리가 달라요.",
    relatedDescription: "공통된 여우굴 작업을 이해하되 털의 구조와 일상 손질 부담을 별도로 비교해보세요.",
    relatedDifferences: { "smooth-fox-terrier": "작업 배경과 체형은 가깝지만 와이어는 거친 겉털과 부드러운 속털, 다리와 턱의 긴 털 때문에 손질 계획이 더 복잡해요.", "airedale-terrier": "둘 다 거친 털의 영국 테리어지만 에어데일은 훨씬 크고 수상 작업까지 맡은 다목적 배경이라 활동 규모가 달라요." },
  },
  {
    slug: "kerry-blue-terrier",
    nameKo: "케리 블루 테리어",
    metadataDescription: "아일랜드 농장에서 해충·수상 작업·경비를 두루 맡던 케리 블루 테리어의 배경과 오늘의 다단계 과제, 동물 거리, 청회색 피모 관리를 살펴봅니다.",
    heroStatement: "아일랜드 농장에서 해충 사냥부터 물가 작업과 경비까지 여러 일을 맡던 청회색 다목적 테리어예요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "성별로 다름" }, { label: "몸무게", value: "수컷 기준 있음" }],
      detailsLabel: "성별 크기 기준 보기",
      items: [
        { id: "male-size", label: "수컷", value: "체고 45.5~49.5cm · 몸무게 15~18kg" },
        { id: "female-size", label: "암컷", value: "체고 44.5~48cm · 수컷보다 가벼움" },
      ],
    },
    storyTitle: "케리 블루 테리어는 농장에서 한 가지 일만 했을까요?",
    storyDescription: "해충 사냥과 물가 작업, 경비를 오가던 다재다능함을 오늘의 순서 있는 협력 과제로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "해충을 찾고 물에서도 일하며 농장을 지켰어요.", body: "케리 블루 테리어는 아일랜드 농장에서 쥐 같은 해충을 잡고 물속 수달을 상대했으며, 집을 알리고 사람 곁을 지키는 일도 맡았어요.", imageId: "history", imageAlt: "아일랜드 농장의 돌담과 물가 사이에서 농부 곁에 선 청회색 성견 케리 블루 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "찾기와 가져오기, 제자리 놓기를 한 순서로 연결해요.", body: "낮은 풀밭의 파란 천 주머니를 찾아 물지 않고 들어 올린 뒤, 보호자 앞 바구니에 놓고 출발 매트로 돌아오는 과제를 짧게 진행해주세요.", imageId: "find-carry-place", imageAlt: "울타리 안 풀밭에서 파란 천 주머니를 찾아 보호자 앞 바구니에 놓는 청회색 성견 케리 블루 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "여러 일을 할 줄 알아도 활동이 끝났다는 연습은 따로 필요해요.", body: "바구니와 천 주머니를 높은 선반에 치운 뒤 물을 마시고, 사람의 통행에서 떨어진 매트에 옆으로 눕는 순서를 일정하게 유지해주세요.", imageId: "tasks-to-rest", imageAlt: "보호자가 바구니와 천 주머니를 치우는 동안 떨어진 매트에 쉬는 청회색 성견 케리 블루 테리어 삽화" },
    ],
    caution: "다목적 농장견의 배경이 모든 개체의 작업 능력이나 다른 동물 관계를 보장하지 않아요. 집중과 사회적 반응은 개체별로 확인해야 해요.",
    realitiesTitle: "청회색 털과 테리어의 집중은 일상에서 어떻게 드러날까요?",
    realities: [
      { id: "dog-distance-arc", title: "다른 개에게 곧장 다가가기보다 큰 곡선으로 지나가요.", body: "좁은 인도를 고집하지 말고 맞은편 개가 보이면 넓은 잔디 가장자리로 이동해, 상대를 계속 응시하지 않고 보호자와 나란히 걷게 해주세요.", imageAlt: "넓은 잔디 가장자리에서 멀리 있는 다른 개와 큰 곡선으로 지나가는 청회색 성견 케리 블루 테리어 삽화" },
      { id: "blue-coat-care", title: "검게 태어난 털은 자라며 푸른빛으로 바뀌고 계속 손질해야 해요.", body: "부드럽고 물결치는 털은 빠진 털이 눈에 적어도 엉킬 수 있어요. 턱과 다리 안쪽까지 빗고 정기적인 가위 미용 일정을 세워주세요.", imageAlt: "미용 매트에서 보호자가 청회색 성견 케리 블루 테리어의 턱과 다리 안쪽 털을 빗는 삽화" },
    ],
    readinessTitle: "케리 블루 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["찾기와 옮기기 같은 여러 단계의 과제 뒤 충분한 휴식까지 제공할 수 있나요?", "다른 개와 마주칠 때 인사를 강요하지 않고 큰 곡선과 거리를 선택할 수 있나요?", "집에서의 잦은 빗질과 정기적인 전문 미용을 계속할 수 있나요?"],
    relatedTitle: "아일랜드 테리어도 농장에서 맡은 일과 털이 달라요.",
    relatedDescription: "활동성만 묶지 말고 물가 작업을 포함한 역할과 피모 질감, 다른 개와의 생활 관리까지 비교해보세요.",
    relatedDifferences: { "soft-coated-wheaten-terrier": "둘 다 아일랜드 농장견이고 부드러운 털을 지녔지만 케리 블루는 청회색 피모와 더 강한 테리어형 작업 기록이 뚜렷해요.", "airedale-terrier": "다목적 테리어와 물가 작업은 닮았지만 에어데일은 훨씬 큰 체격과 거친 이중모를 지녀 생활 규모가 달라요." },
  },
  {
    slug: "cairn-terrier",
    nameKo: "케언 테리어",
    metadataDescription: "스코틀랜드의 돌무더기에서 해충을 찾아내던 케언 테리어의 배경과 오늘의 돌 틈 냄새 찾기, 정원 파기 구역, 거친 이중모 관리를 살펴봅니다.",
    heroStatement: "스코틀랜드의 돌무더기와 바위틈에 숨은 해충을 찾아 밖으로 몰아내던 작고 단단한 테리어예요.",
    storyTitle: "케언 테리어의 이름은 왜 돌무더기에서 왔을까요?",
    storyDescription: "바위틈을 살피던 작은 몸과 큰 앞발을 오늘의 안전한 돌 모형 냄새 찾기로 연결해봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "스코틀랜드의 케언 사이로 들어가 해충을 찾았어요.", body: "케언은 경계나 무덤을 표시하던 돌무더기를 뜻해요. 케언 테리어는 그 좁은 틈에서 여우와 작은 해충을 찾아내도록 길러졌어요.", imageId: "history", imageAlt: "스코틀랜드 하이랜드의 돌무더기 틈을 농부와 함께 살피는 모래색 성견 케언 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "진짜 돌 틈 대신 가벼운 모형 사이의 냄새를 찾아요.", body: "움직이지 않게 고정한 둥근 폼 블록 세 개 사이에 닫힌 향 통을 숨기고, 찾은 뒤 파헤치지 않고 보호자에게 돌아오면 보상해주세요.", imageId: "cairn-scent-blocks", imageAlt: "울타리 안 둥근 폼 블록 사이의 닫힌 향 통을 찾는 모래색 성견 케언 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "작은 몸도 찾기를 멈추고 쉬는 순서를 배워야 해요.", body: "폼 블록을 접이식 상자에 모두 넣은 뒤 앞발의 흙을 닦고, 창문과 현관에서 떨어진 작은 매트에 몸을 낮추는 흐름을 반복해주세요.", imageId: "blocks-to-rest", imageAlt: "보호자가 폼 블록을 상자에 넣는 동안 작은 매트에 쉬는 모래색 성견 케언 테리어 삽화" },
    ],
    caution: "돌 틈 사냥의 배경이 모든 개체의 파기나 추적 강도를 정하지 않아요. 실제 반응과 멈출 수 있는 거리는 개체별로 달라요.",
    realitiesTitle: "작고 거친 하이랜드 테리어와 살면 무엇을 체감할까요?",
    realities: [
      { id: "garden-dig-border", title: "화단 전체 대신 파도 되는 한 구역을 분명히 나눠요.", body: "낮은 테두리 안에 부드러운 흙이나 종이를 담고 냄새 천을 얕게 숨겨, 허용된 자리에서만 찾은 뒤 덮개를 닫는 규칙을 만들어주세요.", imageAlt: "정원 화단과 나뉜 낮은 파기 상자에서 냄새 천을 찾는 모래색 성견 케언 테리어 삽화" },
      { id: "rough-coat-front-paws", title: "비바람을 막는 이중모와 큰 앞발을 함께 살펴요.", body: "거친 겉털을 과하게 밀지 말고 속털까지 나누어 빗으며, 바위와 흙을 디디던 큰 앞발의 발가락 사이와 발톱도 활동 뒤 확인해주세요.", imageAlt: "현관 매트에서 보호자가 모래색 성견 케언 테리어의 거친 이중모와 큰 앞발을 살피는 삽화" },
    ],
    readinessTitle: "케언 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["안전한 냄새 찾기와 파기 구역을 만들고 끝난 뒤 덮을 수 있나요?", "작은 동물을 마주치기 전에 리드와 울타리로 추적 거리를 관리할 수 있나요?", "거친 이중모와 발가락 사이를 활동 뒤 규칙적으로 확인할 수 있나요?"],
    relatedTitle: "작은 스코틀랜드 테리어도 지형과 외형이 달라요.",
    relatedDescription: "크기만 비교하지 말고 어떤 틈에서 일했는지, 앞발과 피모가 생활 관리에 주는 차이를 살펴보세요.",
    relatedDifferences: { "west-highland-white-terrier": "같은 스코틀랜드 테리어 계통과 돌 틈 작업을 공유하지만 웨스티는 흰 피모로 정립됐고 피부·피모 관찰 지점이 달라요.", "norfolk-terrier": "둘 다 작은 굴 작업 테리어지만 케언은 하이랜드의 돌무더기 배경과 앞발이 뒷발보다 큰 체형이 특히 뚜렷해요." },
  },
  {
    slug: "norfolk-terrier",
    nameKo: "노퍽 테리어",
    metadataDescription: "동앵글리아의 마구간에서 쥐를 찾고 여우굴 작업에 참여하던 노퍽 테리어의 배경과 오늘의 건초 상자 찾기, 무리 생활, 늘어진 귀 관리를 살펴봅니다.",
    heroStatement: "동앵글리아의 마구간에서 쥐를 찾고 여우굴에도 들어가던, 앞으로 접힌 귀의 작은 테리어예요.",
    storyTitle: "노퍽 테리어는 왜 마구간 가까이에서 일했을까요?",
    storyDescription: "해충을 찾고 여러 개와 함께 움직이던 배경을 오늘의 차례 있는 냄새 과제와 휴식으로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 무엇을 하던 개였을까?", title: "마구간의 쥐를 찾고 사냥대와 여우굴에 들어갔어요.", body: "노퍽과 노리치의 조상은 동앵글리아 농장과 마구간의 해충을 줄이고 여우 사냥에 참여했어요. 노퍽은 오늘날 앞으로 접힌 귀로 구분돼요.", imageId: "history", imageAlt: "동앵글리아의 마구간에서 말 장구와 건초 상자 주변을 살피는 붉은 성견 노퍽 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "건초 대신 종이 조각 속 닫힌 향 통을 찾아요.", body: "낮은 나무 상자에 구긴 종이를 넉넉히 담고 닫힌 향 통 하나를 숨겨, 코로 찾은 뒤 상자를 뒤집지 않고 보호자에게 돌아오게 해주세요.", imageId: "stable-box-search", imageAlt: "낮은 나무 상자의 구긴 종이 사이에서 닫힌 향 통을 찾는 붉은 성견 노퍽 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "함께 움직이는 걸 좋아해도 혼자 쉬는 자리가 필요해요.", body: "찾기 상자를 치운 뒤 사람과 다른 반려동물의 통행에서 떨어진 작은 침대로 이동해, 주변을 따라가지 않고 씹을 것을 받으며 쉬게 해주세요.", imageId: "social-to-solo-rest", imageAlt: "보호자가 찾기 상자를 치우는 동안 통행에서 떨어진 작은 침대에 쉬는 붉은 성견 노퍽 테리어 삽화" },
    ],
    caution: "여러 개와 작업한 배경이 모든 노퍽 테리어의 사교성을 보장하지 않아요. 사람과 다른 동물에 대한 실제 반응은 개체별로 확인해야 해요.",
    realitiesTitle: "작고 사교적으로 보여도 놓치면 안 되는 것은 무엇일까요?",
    realities: [
      { id: "small-gap-security", title: "낮은 몸이 빠져나갈 틈을 문과 울타리에서 먼저 찾아요.", body: "현관 안전문 아래와 울타리 모서리를 작은 몸 기준으로 점검하고, 문이 열릴 때는 바닥 표식에서 기다린 뒤 하네스를 연결해주세요.", imageAlt: "현관 안전문에서 떨어진 바닥 표식에 기다리는 붉은 성견 노퍽 테리어 삽화" },
      { id: "drop-ear-wire-coat", title: "접힌 귀 안쪽과 목·어깨의 거친 털을 따로 살펴요.", body: "산책 뒤 귀 덮개를 부드럽게 들어 습기와 이물질을 확인하고, 몸에 붙는 거친 털은 작은 구역으로 나누어 빗어주세요.", imageAlt: "현관 매트에서 보호자가 붉은 성견 노퍽 테리어의 접힌 귀 안쪽과 목의 거친 털을 살피는 삽화" },
    ],
    readinessTitle: "노퍽 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["작은 몸이 빠져나갈 현관과 울타리 틈을 찾아 안전하게 막을 수 있나요?", "냄새 찾기와 사람 곁 활동 뒤 혼자 쉬는 자리까지 마련할 수 있나요?", "앞으로 접힌 귀 안쪽과 거친 털을 규칙적으로 확인할 수 있나요?"],
    relatedTitle: "노퍽과 노리치는 귀만 보면 구분되지만 생활은 더 살펴야 해요.",
    relatedDescription: "공통된 동앵글리아 작업 배경 위에서 귀 형태와 개체별 사회성, 실제 생활 반응을 비교해보세요.",
    relatedDifferences: { "norwich-terrier": "두 견종은 같은 계통에서 갈라졌지만 노퍽은 앞으로 접힌 귀, 노리치는 곧게 선 귀가 표준의 가장 눈에 띄는 차이예요.", "cairn-terrier": "작은 몸과 해충 사냥은 닮았지만 노퍽은 동앵글리아 마구간과 사냥대 배경, 케언은 스코틀랜드 돌무더기 작업이 중심이에요." },
  },
  {
    slug: "norwich-terrier",
    nameKo: "노리치 테리어",
    metadataDescription: "동앵글리아의 마구간과 케임브리지 학생들 곁에서 쥐잡이로 알려진 노리치 테리어의 배경과 오늘의 책상 아래 찾기, 도시 소리, 직립 귀 관리를 살펴봅니다.",
    heroStatement: "동앵글리아의 마구간에서 해충을 찾고 케임브리지 학생들 사이에서도 쥐잡이로 알려졌던 직립 귀 테리어예요.",
    storyTitle: "노리치 테리어는 어떻게 대학가에서도 알려졌을까요?",
    storyDescription: "마구간과 학생 숙소의 작은 해충을 찾던 배경을 오늘의 실내 냄새 퍼즐과 종료 신호로 바꿔봐요.",
    story: [
      { navLabel: "과거의 역할", eyebrow: "1단계 · 어디에서 일했을까?", title: "마구간을 지키고 케임브리지 학생들 곁에서도 쥐를 찾았어요.", body: "동앵글리아의 작은 테리어들은 농장과 마구간에서 해충을 잡았고, 19세기 말에는 케임브리지 학생들 사이에서 작은 쥐잡이개로 인기를 얻었어요.", imageId: "history", imageAlt: "19세기 케임브리지의 마구간 딸린 학생 숙소에서 책과 나무 상자 곁을 살피는 붉은 성견 노리치 테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "책상 아래 작은 상자 중 냄새가 든 하나를 골라요.", body: "넘어지지 않는 낮은 상자 세 개를 책상 아래 넓게 놓고 하나에만 닫힌 향 통을 넣어, 맞힌 뒤 시작 매트로 돌아오면 보상해주세요.", imageId: "study-box-search", imageAlt: "밝은 서재의 책상 아래 낮은 상자 세 개 중 향 통이 든 상자를 찾는 붉은 성견 노리치 테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "실내에서도 계속 찾지 않도록 상자와 냄새를 완전히 치워요.", body: "향 통을 밀폐 용기에 넣고 빈 상자를 선반에 올린 뒤, 책상과 현관에서 떨어진 매트에 누워 주변 소리를 흘려보내는 시간을 마련해주세요.", imageId: "search-to-quiet-mat", imageAlt: "보호자가 빈 상자를 선반에 올리는 동안 서재 밖 작은 매트에 쉬는 붉은 성견 노리치 테리어 삽화" },
    ],
    caution: "쥐잡이 배경이 모든 개체의 추적 강도나 실내 적응을 보장하지 않아요. 소리와 움직임에 대한 반응은 실제 생활에서 확인해야 해요.",
    realitiesTitle: "도시에서도 작고 활동적인 테리어와 살려면 무엇이 필요할까요?",
    realities: [
      { id: "hallway-sound-return", title: "복도 소리를 들으면 문이 아니라 사람에게 돌아오게 해요.", body: "문에서 떨어진 바닥 표식을 정해 발소리가 들릴 때 그곳에서 보호자를 보는 행동을 보상하고, 택배와 방문객 동선은 안전문으로 나눠주세요.", imageAlt: "닫힌 현관문에서 떨어진 바닥 표식 위에서 보호자를 보는 붉은 성견 노리치 테리어 삽화" },
      { id: "prick-ear-wire-coat", title: "선 귀의 가장자리와 목을 감싼 거친 털을 확인해요.", body: "풀밭 활동 뒤 직립 귀의 앞뒤와 가장자리에 붙은 씨앗을 살피고, 목의 거친 러프와 촘촘한 속털은 나누어 빗어주세요.", imageAlt: "현관 매트에서 보호자가 붉은 성견 노리치 테리어의 직립 귀와 목의 거친 털을 살피는 삽화" },
    ],
    readinessTitle: "노리치 테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["작은 냄새 퍼즐 뒤 장비를 완전히 치우고 조용한 휴식까지 연결할 수 있나요?", "복도와 현관 소리에 반응할 때 안전문과 돌아올 표식을 마련할 수 있나요?", "직립 귀 가장자리와 거친 이중모를 활동 뒤 꼼꼼히 확인할 수 있나요?"],
    relatedTitle: "같은 뿌리의 두 테리어를 이름만 바꿔 부르면 안 돼요.",
    relatedDescription: "역사를 공유하지만 공식적으로 분리된 견종이며 귀 형태와 실제 개체의 생활 반응을 각각 확인해야 해요.",
    relatedDifferences: { "norfolk-terrier": "같은 동앵글리아 계통에서 1964년 분리됐고, 노리치는 곧게 선 귀이며 노퍽은 앞으로 접힌 귀예요.", "jack-russell-terrier": "작은 몸의 빠른 추적은 닮았지만 노리치는 마구간과 케임브리지의 쥐잡이 배경, 더 짧고 단단한 체형이 특징이에요." },
  },
  {
    slug: "miniature-bull-terrier",
    nameKo: "미니어처 불테리어",
    metadataDescription: "불테리어의 작은 타입에서 별도 견종으로 정립된 미니어처 불테리어의 배경과 오늘의 바른 헌트 찾기, 놀이 종료, 체고에 비례하는 체중 기준을 살펴봅니다.",
    heroStatement: "불테리어의 달걀형 머리와 단단한 몸을 작은 체고 안에 담아 별도 견종으로 정립한 불 타입 테리어예요.",
    heroSizeDetails: {
      summaryRows: [{ label: "체고", value: "25.4~35.6cm" }, { label: "몸무게", value: "고정 기준 없음" }],
      detailsLabel: "공식 크기 기준 보기",
      items: [
        { id: "height-standard", label: "체고", value: "10~14인치 · 약 25.4~35.6cm" },
        { id: "weight-standard", label: "몸무게", value: "고정 수치 없이 체고와 균형을 이룸" },
      ],
    },
    storyTitle: "미니어처 불테리어는 단순히 작은 불테리어일까요?",
    storyDescription: "불 타입 테리어의 어려운 역사와 작은 쥐잡이 역할을 숨기지 않고, 오늘의 안전한 찾기와 놀이 조절로 연결해봐요.",
    story: [
      { navLabel: "형성의 배경", eyebrow: "1단계 · 어디에서 출발했을까?", title: "초기의 투견 배경을 지나 작은 쥐잡이와 반려견으로 이어졌어요.", body: "19세기 불독과 테리어 계통에서 나온 개들은 투견에 이용된 아픈 역사가 있고, 더 작은 타입은 쥐잡이에도 쓰이다 오늘의 별도 반려 견종으로 정립됐어요.", imageId: "history", imageAlt: "19세기 영국 마구간에서 사람 곁의 나무 상자와 건초 주변 냄새를 살피는 흰 성견 미니어처 불테리어 역사 삽화" },
      { navLabel: "현재의 경향", eyebrow: "2단계 · 그 흔적은 지금 어떻게 나타날까?", title: "실제 동물 대신 밀폐된 향 통을 찾아 표시해요.", body: "안전한 바른 헌트용 통로 끝의 보호된 향 통을 찾아 코로 표시하고, 발로 밀거나 물기 전에 보호자 손 표적으로 돌아오면 보상해주세요.", imageId: "barn-hunt-indicate", imageAlt: "밝은 실내 바른 헌트 통로에서 보호된 향 통을 찾아 코로 표시하는 흰 성견 미니어처 불테리어 삽화" },
      { navLabel: "생활의 현실", eyebrow: "3단계 · 보호자는 무엇을 체감할까?", title: "익살스러운 놀이가 거칠어지기 전에 멈추는 순서를 만들어요.", body: "짧은 당기기 놀이 중 놓기 신호에서 장난감을 상자에 넣고, 물을 마신 뒤 넓은 매트에서 씹을 것을 받아 쉬는 흐름을 반복해주세요.", imageId: "tug-stop-rest", imageAlt: "보호자가 당기기 장난감을 상자에 넣은 뒤 넓은 매트에서 쉬는 흰 성견 미니어처 불테리어 삽화" },
    ],
    caution: "투견과 쥐잡이의 역사를 오늘의 공격성으로 단정하면 안 돼요. 놀이 강도와 다른 동물에 대한 반응은 개체별로 안전하게 확인해야 해요.",
    realitiesTitle: "작은 체고 안의 단단한 몸과 큰 놀이 욕구를 어떻게 다룰까요?",
    realities: [
      { id: "body-play-space", title: "몸으로 부딪는 놀이에는 미끄럽지 않은 빈 공간이 필요해요.", body: "가구 모서리와 깨지는 물건을 치우고 넓은 러너 위에서 짧게 놀며, 사람의 손이나 옷 대신 정해진 장난감을 선택하면 보상해주세요.", imageAlt: "가구를 비운 넓은 러너에서 정해진 장난감을 고르는 흰 성견 미니어처 불테리어 삽화" },
      { id: "white-skin-ear-check", title: "짧은 흰 털 아래 피부와 귀 반응을 함께 살펴요.", body: "햇빛 뒤 귀와 배의 붉어짐을 확인하고, 소리에 반응하는 방향이 달라지거나 불러도 놓치는 변화가 있으면 성격 탓으로 넘기지 마세요.", imageAlt: "밝은 실내 매트에서 보호자가 흰 성견 미니어처 불테리어의 귀와 배 피부를 살피는 삽화" },
    ],
    readinessTitle: "미니어처 불테리어와 살기 전 확인할 세 가지",
    readinessQuestions: ["힘 있는 놀이를 짧게 나누고 놓기와 휴식까지 한 순서로 가르칠 수 있나요?", "다른 동물과의 만남을 개체별로 관찰하며 충분한 거리와 안전 장비를 쓸 수 있나요?", "짧은 털 아래 피부와 귀의 반응 변화를 일상적으로 확인할 수 있나요?"],
    relatedTitle: "작아졌다는 말이 힘과 생활 책임까지 줄여주지는 않아요.",
    relatedDescription: "불 타입 테리어의 공통 외형보다 공식 체고 기준과 실제 힘, 놀이 조절과 안전 책임을 비교해보세요.",
    relatedDifferences: { "bull-terrier": "달걀형 머리와 불테리어형 체격은 같지만 미니어처 불테리어는 약 25.4~35.6cm의 별도 체고 기준을 가진 독립 견종이에요.", "staffordshire-bull-terrier": "둘 다 작은 불 타입 테리어지만 스태퍼드셔 불 테리어는 다른 형성 계통과 넓고 짧은 머리, 별도 체중 기준을 가졌어요." },
  },
] satisfies DetailSeed[];

export const expansionTo200Batch03StandardBreedDetails = seeds.map((seed) => standardBreedDetailSchema.parse({
  slug: seed.slug,
  nameKo: seed.nameKo,
  metadataDescription: seed.metadataDescription,
  heroStatement: seed.heroStatement,
  heroSizeDetails: seed.heroSizeDetails,
  story: {
    title: seed.storyTitle,
    description: seed.storyDescription,
    steps: seed.story.map((step) => ({
      navLabel: step.navLabel,
      eyebrow: step.eyebrow,
      title: step.title,
      body: step.body,
      image: `/illustrations/${step.imageId === "history" ? "v3" : "v4"}/${seed.slug}-${step.imageId === "history" ? "history" : `feature-${step.imageId}`}.webp`,
      imageAlt: step.imageAlt,
    })),
    caution: seed.caution,
  },
  realitiesTitle: seed.realitiesTitle,
  realities: seed.realities.map((reality) => ({
    id: reality.id,
    title: reality.title,
    body: reality.body,
    image: `/illustrations/v4/${seed.slug}-feature-${reality.id}.webp`,
    imageAlt: reality.imageAlt,
  })),
  readinessTitle: seed.readinessTitle,
  readinessQuestions: seed.readinessQuestions,
  relatedTitle: seed.relatedTitle,
  relatedDescription: seed.relatedDescription,
  relatedDifferences: seed.relatedDifferences,
}));
