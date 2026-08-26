import { getBreedFeatures } from "@/content/breed-features/data";
import { getBreed } from "@/content/breeds/data";
import { withAndParticle } from "@/lib/korean-particles";
import { standardBreedDetailSchema, type StandardBreedDetail } from "./schema";

type EditorialCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const fallbackCards: Record<string, [EditorialCard, EditorialCard, EditorialCard]> = {
  maltipoo: [
    {
      eyebrow: "고정되지 않은 교배 특성",
      title: "부모견의 특성이 한 모습으로 고정되지는 않아요.",
      description: "말티푸는 독립된 품종 표준이 없는 교배 유형이에요. 털의 굵기와 곱슬 정도, 체격과 생활 반응은 부모견과 교배 세대, 개체에 따라 달라질 수 있어요.",
      image: "/illustrations/v4/maltipoo-feature-individual-variation.webp",
      alt: "현대 가정에서 보호자 곁에 서 있는 흰색과 살구색 성견 말티푸 삽화",
    },
    {
      eyebrow: "엉킴과 정기 미용",
      title: "털 빠짐에 대한 기대보다 실제 피모를 먼저 봐야 해요.",
      description: "곧은 털부터 곱슬 털까지 피모가 다양하게 나타날 수 있어요. 귀 뒤와 겨드랑이를 피부 가까이까지 빗고 실제 털 길이에 맞춰 미용 주기를 정해야 해요.",
      image: "/illustrations/v4/maltipoo-feature-coat-care.webp",
      alt: "보호자가 성견 말티푸의 물결 모양 피모를 작은 구역으로 나누어 빗는 삽화",
    },
    {
      eyebrow: "작은 몸의 생활 안전",
      title: "작은 체구에 맞춘 낮고 미끄럽지 않은 동선이 필요해요.",
      description: "작은 몸은 높은 가구에서의 점프와 미끄러운 바닥에 더 세심한 준비가 필요할 수 있어요. 부모견의 건강검사 기록과 실제 성견 크기도 함께 확인해야 해요.",
      image: "/illustrations/v4/maltipoo-feature-small-body-safety.webp",
      alt: "낮은 반려견 계단과 미끄럼 방지 매트에서 보호자의 안내를 받는 성견 말티푸 삽화",
    },
  ],
  pekingese: [
    {
      eyebrow: "교감과 자기 거리",
      title: "사람 곁에 있으면서도 스스로 거리를 정할 수 있어요.",
      description: "오랫동안 사람 가까이 지낸 반려 배경이 있지만 모든 접촉을 원하는 것은 아니에요. 가까운 자기 자리에서 편히 쉬고 접촉을 선택할 수 있게 해주세요.",
      image: "/illustrations/v4/pekingese-feature-companion-distance.webp",
      alt: "보호자 가까운 낮은 쿠션에서 자기 거리를 두고 쉬는 성견 페키니즈 삽화",
    },
    {
      eyebrow: "호흡과 더위",
      title: "짧은 주둥이를 고려해 활동보다 회복을 먼저 살펴요.",
      description: "더운 날과 습한 환경에서는 짧은 활동 뒤에도 호흡 회복을 세심하게 봐야 해요. 시원한 실내와 그늘, 물을 가까이 두고 무리한 움직임을 피하세요.",
      image: "/illustrations/v4/pekingese-feature-heat-recovery.webp",
      alt: "그늘진 공간의 쿨매트에서 보호자와 함께 쉬는 성견 페키니즈 삽화",
    },
    {
      eyebrow: "눈·얼굴과 장모",
      title: "눈 주변과 얼굴 주름, 긴 피모를 매일 부드럽게 확인해요.",
      description: "돌출된 눈과 짧은 얼굴 주변은 마찰과 습기를 살펴야 해요. 갈기처럼 긴 피모도 작은 구역으로 나누어 엉킴 없이 관리해야 해요.",
      image: "/illustrations/v4/pekingese-feature-face-coat-care.webp",
      alt: "보호자가 성견 페키니즈의 눈과 얼굴 주변, 긴 피모를 부드럽게 살피는 삽화",
    },
  ],
  "continental-toy-spaniel": [
    {
      eyebrow: "민첩한 학습 참여",
      title: "작은 몸으로도 사람과 주고받는 과제에 적극적일 수 있어요.",
      description: "사람 곁의 토이 스패니얼 배경은 짧은 학습과 놀이에 민첩하게 참여하는 모습으로 나타날 수 있어요. 성공하기 쉬운 과제와 조용한 휴식을 번갈아 주세요.",
      image: "/illustrations/v4/continental-toy-spaniel-feature-cooperative-learning.webp",
      alt: "낮은 표식 사이에서 보호자의 손 신호를 바라보는 성견 파피용 삽화",
    },
    {
      eyebrow: "초소형 체구 안전",
      title: "높은 곳과 거친 상호작용을 작은 몸에 맞춰 조정해요.",
      description: "작고 가는 체구에는 높은 가구에서의 낙상과 사람 발에 부딪히는 동선이 부담이 될 수 있어요. 낮은 계단과 미끄럼 방지 바닥을 준비하세요.",
      image: "/illustrations/v4/continental-toy-spaniel-feature-small-body-safety.webp",
      alt: "낮은 반려견 계단과 미끄럼 방지 매트에서 보호자에게 다가가는 성견 파피용 삽화",
    },
    {
      eyebrow: "귀 장식털 관리",
      title: "큰 귀 뒤와 가는 장식털의 엉킴을 나누어 살펴요.",
      description: "나비처럼 큰 귀와 가는 장식털은 파피용을 구별하는 외형이에요. 귀 뒤와 다리의 긴 털을 잡아당기지 않도록 작은 구역씩 빗어주세요.",
      image: "/illustrations/v4/continental-toy-spaniel-feature-ear-coat-care.webp",
      alt: "보호자가 성견 파피용의 큰 귀 뒤와 가는 장식털을 부드럽게 빗는 삽화",
    },
  ],
  "italian-sighthound": [
    {
      eyebrow: "시각 추적과 질주",
      title: "빠르게 움직이는 대상을 눈으로 쫓고 달리려 할 수 있어요.",
      description: "작은 시각하운드의 배경은 멀리 움직이는 대상에 빠르게 반응하는 모습으로 나타날 수 있어요. 안전한 리드와 닫힌 공간 안에서 움직임을 제공하세요.",
      image: "/illustrations/v4/italian-sighthound-feature-visual-chase.webp",
      alt: "울타리 안 공원에서 움직이는 대상을 본 뒤 보호자를 돌아보는 성견 이탈리안 그레이하운드 삽화",
    },
    {
      eyebrow: "가는 다리와 낙상",
      title: "높은 점프와 미끄러운 바닥을 가는 체형에 맞춰 줄여요.",
      description: "길고 가는 다리는 높은 가구에서의 낙상과 거친 놀이에 세심한 감독이 필요해요. 낮은 경사로와 미끄럼 방지 바닥으로 생활 동선을 정리하세요.",
      image: "/illustrations/v4/italian-sighthound-feature-small-body-safety.webp",
      alt: "낮은 소파 경사로와 미끄럼 방지 매트에서 걷는 성견 이탈리안 그레이하운드 삽화",
    },
    {
      eyebrow: "얇은 피모와 추위",
      title: "몸에 붙은 짧은 털은 추운 날 충분한 보온이 되지 않아요.",
      description: "매우 짧고 얇은 피모는 체형을 그대로 드러내며 추운 날 체온 유지 부담을 높일 수 있어요. 활동 시간을 조절하고 편안한 보온 환경을 마련하세요.",
      image: "/illustrations/v4/italian-sighthound-feature-cold-weather.webp",
      alt: "가을 산책 전 보호자가 성견 이탈리안 그레이하운드에게 가벼운 보온 옷을 입히는 삽화",
    },
  ],
  "jack-russell-terrier": [
    {
      eyebrow: "냄새 추적과 파기",
      title: "냄새를 따라 좁은 곳을 찾고 땅을 파는 일에 몰입할 수 있어요.",
      description: "굴 사냥을 돕던 배경은 냄새를 집요하게 쫓거나 땅을 파는 모습으로 나타날 수 있어요. 안전한 파기 공간과 찾기 과제로 행동의 출구를 마련하세요.",
      image: "/illustrations/v4/jack-russell-terrier-feature-scent-digging.webp",
      alt: "지정된 모래 공간에서 냄새 주머니를 찾는 성견 잭 러셀 테리어 삽화",
    },
    {
      eyebrow: "출입과 추적 안전",
      title: "문이 열리기 전 멈추고 보호자를 확인하는 흐름을 만들어요.",
      description: "작은 움직임을 쫓는 반응이 강한 개체는 열린 문과 느슨한 울타리에서 빠르게 멀어질 수 있어요. 안전문과 하네스, 긴 줄을 일상적으로 사용하세요.",
      image: "/illustrations/v4/jack-russell-terrier-feature-entry-safety.webp",
      alt: "닫힌 현관 안전문 앞에서 보호자의 손 신호를 바라보는 성견 잭 러셀 테리어 삽화",
    },
    {
      eyebrow: "과제 뒤 회복",
      title: "끝까지 몰입하는 힘만큼 일을 마치고 쉬는 전환이 중요해요.",
      description: "계속 공을 던지는 활동은 흥분만 높일 수 있어요. 냄새 찾기나 방향 과제를 짧게 마친 뒤 매트에서 호흡을 낮추는 순서까지 알려주세요.",
      image: "/illustrations/v4/jack-russell-terrier-feature-work-to-rest.webp",
      alt: "냄새 과제를 마친 뒤 보호자 곁의 매트에서 쉬는 성견 잭 러셀 테리어 삽화",
    },
  ],
  rottweiler: [
    {
      eyebrow: "침착한 힘과 협업",
      title: "큰 힘을 사람과 주고받는 짧은 과제로 조절하는 경험이 필요해요.",
      description: "가축 이동과 운반을 돕던 배경은 몸을 써서 일하고 보호자의 신호를 확인하는 모습으로 나타날 수 있어요. 힘겨루기보다 예측 가능한 규칙과 보상으로 협력하세요.",
      image: "/illustrations/v4/rottweiler-feature-cooperative-strength.webp",
      alt: "가벼운 빈 바구니를 옮긴 뒤 보호자의 손 신호를 확인하는 성견 롯트와일러 삽화",
    },
    {
      eyebrow: "낯선 접근과 거리",
      title: "바로 만나게 하기보다 차분히 살필 수 있는 거리를 먼저 줘요.",
      description: "낯선 상황을 신중히 보는 개체는 가까운 인사를 강요받을 때 부담이 커질 수 있어요. 안전문과 충분한 거리를 두고 보호자에게 돌아오는 행동을 보상하세요.",
      image: "/illustrations/v4/rottweiler-feature-visitor-distance.webp",
      alt: "현관 안전문 안에서 보호자 곁에 머물며 방문객과 거리를 둔 성견 롯트와일러 삽화",
    },
    {
      eyebrow: "대형견 이동 동선",
      title: "차량과 병원 이동을 아프기 전에 넓은 경사로에서 연습해요.",
      description: "큰 체격은 차량 탑승과 진료 이동에도 별도 장비와 사람이 필요해요. 넓은 미끄럼 방지 경사로에 천천히 오르고 머무는 경험을 평소에 만들어주세요.",
      image: "/illustrations/v4/rottweiler-feature-large-dog-route.webp",
      alt: "넓은 차량 경사로에 천천히 오르는 연습을 하는 성견 롯트와일러 삽화",
    },
  ],
  dalmatian: [
    {
      eyebrow: "오래 움직이는 리듬",
      title: "짧은 질주만으로 끝내기보다 꾸준히 움직일 시간이 필요할 수 있어요.",
      description: "마차 가까이에서 장거리를 이동한 배경은 꾸준한 활동 참여로 나타날 수 있어요. 안전한 보행과 냄새 탐색, 회복 시간을 한 일정으로 구성하세요.",
      image: "/illustrations/v4/dalmatian-feature-endurance.webp",
      alt: "넓은 산책로에서 보호자와 느슨한 리드로 꾸준히 걷는 성견 달마시안 삽화",
    },
    {
      eyebrow: "보이는 신호와 과제",
      title: "소리만이 아니라 손 신호와 위치 단서도 함께 사용할 수 있어요.",
      description: "개체별 청각 반응을 살피면서 시각 신호와 냄새 과제를 함께 마련하면 의사소통 선택지가 넓어져요. 성공하기 쉬운 거리에서 짧게 연습하세요.",
      image: "/illustrations/v4/dalmatian-feature-hand-signal.webp",
      alt: "공원의 냄새 상자 옆에서 보호자의 손 신호를 바라보는 성견 달마시안 삽화",
    },
    {
      eyebrow: "닫힌 공간의 달리기",
      title: "달리는 활동은 닫힌 울타리와 안전한 출입 안에서 제공해요.",
      description: "빠르게 움직이는 시간에는 리드와 출입문 관리가 작은 실수를 줄여요. 닫힌 공간인지 먼저 확인하고 활동 뒤에는 차분히 쉬는 시간을 주세요.",
      image: "/illustrations/v4/dalmatian-feature-safe-running.webp",
      alt: "닫힌 출입문이 있는 울타리 운동장에서 안전하게 달리는 성견 달마시안 삽화",
    },
  ],
  "great-dane": [
    {
      eyebrow: "초대형 몸의 조절",
      title: "차분한 움직임도 넉넉한 회전 공간과 협력 연습이 필요해요.",
      description: "사람 가까이에서 침착한 개체도 몸집만으로 가구와 사람을 밀 수 있어요. 넓은 동선에서 멈추기와 방향 바꾸기를 보상으로 짧게 연습하세요.",
      image: "/illustrations/v4/great-dane-feature-body-control.webp",
      alt: "넓은 거실에서 보호자의 손 신호에 맞춰 천천히 방향을 바꾸는 성견 그레이트 덴 삽화",
    },
    {
      eyebrow: "초대형견 이동 동선",
      title: "차량과 병원까지 이어지는 넓은 이동 경로를 미리 준비해요.",
      description: "초대형 체격은 차량 탑승과 아픈 날의 이동에 큰 장비와 도움이 필요해요. 넓은 경사로와 미끄럽지 않은 바닥을 건강할 때부터 익혀주세요.",
      image: "/illustrations/v4/great-dane-feature-large-dog-route.webp",
      alt: "대형 차량의 넓은 미끄럼 방지 경사로를 연습하는 성견 그레이트 덴 삽화",
    },
    {
      eyebrow: "식사와 조용한 회복",
      title: "식사 전후에는 격한 움직임 대신 충분히 쉬는 흐름을 만들어요.",
      description: "큰 식사와 격한 활동이 바로 이어지지 않도록 하루 일정을 나누어야 해요. 갑작스러운 복부 팽창이나 불편이 보이면 즉시 진료가 필요해요.",
      image: "/illustrations/v4/great-dane-feature-meal-rest.webp",
      alt: "식사 뒤 큰 낮은 침대에서 보호자 곁에 조용히 쉬는 성견 그레이트 덴 삽화",
    },
  ],
  "saint-bernard": [
    {
      eyebrow: "사람 곁의 큰 휴식",
      title: "온화한 교감에도 초대형 몸을 위한 넓은 자기 자리가 필요해요.",
      description: "사람 가까이 머무는 개체도 몸을 완전히 펴고 방해받지 않을 큰 휴식 공간이 필요해요. 접촉과 휴식을 스스로 선택할 수 있게 해주세요.",
      image: "/illustrations/v4/saint-bernard-feature-companionship.webp",
      alt: "넓은 거실의 큰 침대에서 보호자 가까이 쉬는 성견 세인트 버나드 삽화",
    },
    {
      eyebrow: "두꺼운 피모와 더위",
      title: "짧은 활동 뒤에도 서늘한 곳에서 호흡 회복을 확인해요.",
      description: "크고 두꺼운 몸과 피모는 더운 날 열을 식히는 데 부담이 될 수 있어요. 시원한 실내와 물을 준비하고 가장 더운 시간의 활동을 피하세요.",
      image: "/illustrations/v4/saint-bernard-feature-heat-recovery.webp",
      alt: "그늘진 현관의 쿨매트에서 보호자와 함께 쉬는 성견 세인트 버나드 삽화",
    },
    {
      eyebrow: "초대형견 이동 계획",
      title: "차량과 병원 이동은 건강할 때 넓은 경사로부터 익혀요.",
      description: "초대형 체격은 아픈 날 사람이 들어 옮기기 어려워요. 넓은 미끄럼 방지 경사로와 차량 공간을 먼저 확보하고 천천히 접근하는 연습을 해주세요.",
      image: "/illustrations/v4/saint-bernard-feature-large-dog-route.webp",
      alt: "대형 차량의 넓은 경사로에 보호자와 함께 접근하는 성견 세인트 버나드 삽화",
    },
  ],
};

const familiarStandardSlugs = [
  "german-spitz",
  "chihuahua",
  "shih-tzu",
  "korea-jindo-dog",
  "yorkshire-terrier",
  "maltipoo",
  "welsh-corgi-pembroke",
  "golden-retriever",
  "dachshund",
  "beagle",
  "miniature-schnauzer",
  "pug",
  "french-bulldog",
  "pekingese",
  "continental-toy-spaniel",
  "italian-sighthound",
  "jack-russell-terrier",
  "labrador-retriever",
  "border-collie",
  "samoyed",
  "siberian-husky",
  "shiba",
  "german-shepherd-dog",
  "dobermann",
  "rottweiler",
  "dalmatian",
  "great-dane",
  "saint-bernard",
] as const;

type FamiliarStandardSlug = (typeof familiarStandardSlugs)[number];
type StandardStoryStep = StandardBreedDetail["story"]["steps"][number];

const storyStepOverrides: Partial<Record<FamiliarStandardSlug, { background?: StandardStoryStep; tendency?: StandardStoryStep }>> = {
  dachshund: {
    background: {
      navLabel: "역할의 배경",
      eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
      title: "오소리와 토끼를 굴속에서 찾던 사냥견이에요.",
      body: "낮고 긴 몸으로 좁은 굴에 들어가 목표를 찾아야 했어요. 지상에서도 냄새 흔적을 따라 이동하는 역할을 맡았습니다.",
      image: "/illustrations/v3/dachshund-history.webp",
      imageAlt: "독일의 숲 가장자리에서 낮은 자세로 땅굴 냄새를 추적하는 닥스훈트를 표현한 편집 삽화",
    },
    tendency: {
      navLabel: "현재의 경향",
      eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
      title: "주변 변화를 알린 뒤 보호자를 확인할 수 있어요.",
      body: "현관 소리나 문밖 움직임을 알아차리고 목소리로 알릴 수 있어요. 소리를 확인한 뒤 보호자에게 시선을 돌리거나 자기 자리로 돌아오는 순서를 연습해 주세요.",
      image: "/illustrations/v6/dachshund-present-alerting.webp",
      imageAlt: "닫힌 현관문 소리를 확인한 뒤 보호자의 차분한 손 신호를 바라보는 성견 닥스훈트 삽화",
    },
  },
  "yorkshire-terrier": {
    background: {
      navLabel: "역할의 배경",
      eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
      title: "좁은 작업 공간에서 작은 동물을 찾던 소형 테리어예요.",
      body: "낮고 작은 몸으로 좁은 곳을 살피고 빠르게 움직이는 대상을 찾아야 했어요. 이런 역할에는 끈기 있게 탐색하는 태도가 중요했습니다.",
      image: "/illustrations/v3/yorkshire-terrier-history.webp",
      imageAlt: "작은 작업 공간에서 주변 움직임을 살피는 요크셔 테리어를 표현한 편집 삽화",
    },
    tendency: {
      navLabel: "현재의 경향",
      eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
      title: "작은 움직임과 냄새를 오래 살필 수 있어요.",
      body: "주변의 작은 변화에 빠르게 주의를 돌리고 한곳을 끈기 있게 확인할 수 있어요. 낮은 냄새 상자나 천 장난감을 찾는 짧은 활동으로 탐색할 기회를 마련해 주세요.",
      image: "/illustrations/v4/yorkshire-terrier-feature-terrier-search.webp",
      imageAlt: "거실 러그 위의 낮은 냄새 상자를 살피는 청색과 황갈색 성견 요크셔 테리어 삽화",
    },
  },
};

const realityCardIndexes: Partial<Record<FamiliarStandardSlug, readonly [number, number]>> = {
  "yorkshire-terrier": [0, 2],
};

const sizeVarietyProfiles: Partial<Record<FamiliarStandardSlug, NonNullable<StandardBreedDetail["sizeVarieties"]>>> = {
  dachshund: {
    summary: "체고 약 13~23cm · 몸무게 약 3.5~14.5kg · 가슴둘레로 3가지 구분",
    measurementLabel: "가슴둘레",
    items: [
      {
        id: "rabbit",
        label: "래빗",
        range: "25~32cm",
        image: "/illustrations/v6/dachshund-size-rabbit.webp",
        imageAlt: "세 크기 중 가장 작은 붉은 단모 래빗 닥스훈트 성견 한 마리가 서 있는 삽화",
      },
      {
        id: "miniature",
        label: "미니어처",
        range: "30~37cm",
        image: "/illustrations/v6/dachshund-size-miniature.webp",
        imageAlt: "래빗보다 크게 표현한 붉은 단모 미니어처 닥스훈트 성견 한 마리가 서 있는 삽화",
      },
      {
        id: "standard",
        label: "스탠더드",
        range: "35~47cm",
        image: "/illustrations/v6/dachshund-size-standard.webp",
        imageAlt: "세 크기 중 가장 큰 붉은 단모 스탠더드 닥스훈트 성견 한 마리가 서 있는 삽화",
      },
    ],
  },
};

const dailyRealityTitles: Record<(typeof familiarStandardSlugs)[number], string> = {
  "german-spitz": "작은 체구의 안전과 풍성한 이중모 관리를 함께 준비해요.",
  chihuahua: "작은 몸에 맞춘 안전과 보온을 따로 준비해야 해요.",
  "shih-tzu": "짧은 얼굴과 긴 피모는 매일 다른 관리 시간을 요구해요.",
  "korea-jindo-dog": "선택 가능한 거리와 안전한 출입 관리가 함께 필요해요.",
  "yorkshire-terrier": "찾기 활동을 짧게 끝내고 편안히 쉬는 흐름이 필요해요.",
  maltipoo: "작은 체구와 적은 털 빠짐이 가벼운 관리를 뜻하지 않아요.",
  "welsh-corgi-pembroke": "낮고 긴 몸에 맞춘 움직임과 체중 관리가 필요해요.",
  "golden-retriever": "다정한 첫인상과 별개로 활동과 체격 부담은 커요.",
  dachshund: "긴 허리에 맞춘 낮은 동선과 체중 관리가 필요해요.",
  beagle: "냄새 추적과 먹거리 관리는 매일의 환경 조정이 필요해요.",
  "miniature-schnauzer": "활동과 알림 반응, 피모 관리를 한 일정으로 준비해야 해요.",
  pug: "짧은 활동 뒤 호흡 회복과 더위를 먼저 살펴야 해요.",
  "french-bulldog": "운동량보다 호흡 회복과 체온 조절이 먼저예요.",
  pekingese: "작은 체격 안에 호흡·눈·피모 관리가 함께 들어 있어요.",
  "continental-toy-spaniel": "작은 몸에도 산책과 학습, 안전한 휴식이 모두 필요해요.",
  "italian-sighthound": "짧게 달린 뒤 편안히 회복하는 생활 리듬이 필요해요.",
  "jack-russell-terrier": "작은 체격이 적은 활동과 쉬운 양육을 뜻하지 않아요.",
  "labrador-retriever": "큰 체격과 먹거리 관심까지 생활 전체에서 조율해야 해요.",
  "border-collie": "많이 달리는 것만으로 작업 욕구가 채워지지는 않아요.",
  samoyed: "두꺼운 피모와 큰 활동 규모를 계절에 맞춰 조정해야 해요.",
  "siberian-husky": "지구력과 탈출 안전, 더위 관리를 함께 준비해야 해요.",
  shiba: "독립적인 선택과 출입 안전을 함께 존중해야 해요.",
  "german-shepherd-dog": "영리함만으로 큰 체격과 경계 관리가 쉬워지지는 않아요.",
  dobermann: "날렵한 외형 뒤에 운동·사회화·건강 관리 부담이 커요.",
  rottweiler: "큰 체격에 맞는 주거·이동·의료 계획이 필요해요.",
  dalmatian: "눈에 띄는 무늬보다 활동과 의사소통 준비가 먼저예요.",
  "great-dane": "차분해 보여도 초대형견의 공간과 비용 부담은 커요.",
  "saint-bernard": "온화한 이미지가 초대형견의 생활 부담을 줄이지는 않아요.",
};

const heroStatementOverrides: Partial<Record<(typeof familiarStandardSlugs)[number], string>> = {
  "german-spitz": "풍성한 이중모와 또렷한 알림 반응을 지닌 작은 스피츠예요.",
  chihuahua: "아주 작은 체구 안에 주변을 빠르게 살피는 반응이 있어요.",
  "shih-tzu": "짧은 얼굴과 긴 피모를 지닌 사람 곁의 소형 반려견이에요.",
  "korea-jindo-dog": "주변을 세심하게 살피고 낯선 상황에서는 스스로 거리를 두고 확인할 수 있어요.",
  "yorkshire-terrier": "작고 가는 체구에도 테리어의 탐색 성향이 남아 있어요.",
  maltipoo: "부모견과 교배 세대에 따라 체격과 피모가 달라지는 교배 유형이에요.",
  "welsh-corgi-pembroke": "낮고 긴 몸으로 움직이는 대상을 살피던 목양견이에요.",
  "golden-retriever": "사람과 협력해 대상을 찾아 회수하도록 발달한 대형견이에요.",
  dachshund: "낮고 긴 몸으로 좁은 굴과 지상의 냄새를 추적하던 하운드예요.",
  beagle: "냄새를 따라 무리와 오래 움직이던 후각 하운드예요.",
  "miniature-schnauzer": "작은 움직임과 주변 변화를 빠르게 알아차리는 농장견 출신이에요.",
  pug: "짧은 얼굴과 단단한 작은 몸을 지닌 오랜 반려견이에요.",
  "french-bulldog": "짧은 얼굴과 단단한 체구를 지닌 도시의 반려견이에요.",
  pekingese: "풍성한 피모와 짧은 얼굴을 지닌 오랜 궁정 반려견이에요.",
  "continental-toy-spaniel": "큰 나비 귀와 민첩한 움직임을 지닌 작은 토이 스패니얼이에요.",
  "italian-sighthound": "가는 체구와 빠른 시각 반응을 지닌 작은 시각하운드예요.",
  "jack-russell-terrier": "굴속의 여우를 찾도록 발달한 작고 활동적인 테리어예요.",
  "labrador-retriever": "물가에서 사람과 협력해 대상을 회수하던 대형 리트리버예요.",
  "border-collie": "양 떼의 방향과 움직임을 읽도록 발달한 목양견이에요.",
  samoyed: "사람과 가까이 지내며 북방의 여러 일을 함께한 작업견이에요.",
  "siberian-husky": "여러 마리가 한 팀으로 먼 거리를 달리던 북방 썰매견이에요.",
  shiba: "산지에서 사람과 사냥에 협력해 온 작은 일본견이에요.",
  "german-shepherd-dog": "목양에서 서비스 작업까지 사람과 협력해 온 다목적 작업견이에요.",
  dobermann: "사람 곁에서 주변을 살피도록 발달한 날렵한 작업견이에요.",
  rottweiler: "가축 이동과 운반에 침착한 힘을 쓰던 대형 작업견이에요.",
  dalmatian: "말과 마차 곁에서 먼 거리를 이동하던 점박이 대형견이에요.",
  "great-dane": "큰 체격과 긴 다리를 지닌 사람 곁의 초대형 동반견이에요.",
  "saint-bernard": "알프스 고개에서 사람을 돕던 두꺼운 피모의 초대형 작업견이에요.",
};

const dailyRealityBodyOverrides: Partial<Record<(typeof familiarStandardSlugs)[number], string>> = {
  "german-spitz": "소파나 침대에서 반복해 뛰어내리지 않도록 낮은 발판과 미끄럽지 않은 동선을 마련해요. 풍성한 이중모는 피부 가까이까지 나누어 빗고, 소리에 반응한 뒤에는 보호자에게 돌아와 쉬는 순서를 연습해 주세요.",
  chihuahua: "작은 체구는 추위와 거친 접촉에 더 세심한 준비가 필요할 수 있어요. 따뜻한 휴식 자리와 부드러운 신체 다루기, 어린이나 다른 동물과 천천히 만나는 환경을 마련해 주세요.",
  "korea-jindo-dog": "낯선 사람과 동물에 대한 반응과 회복 속도는 개체마다 다르게 나타나요. 억지 인사보다 편안한 거리를 확보하고, 현관과 산책에서는 이중 안전장치와 몸에 맞는 장비를 확인해 주세요.",
  "yorkshire-terrier": "냄새를 찾는 활동에 오래 몰입하면 스스로 멈추기 어려울 수 있어요. 짧은 과제를 마친 뒤 장난감을 정리하고 편안한 자리에서 쉬는 순서까지 한 흐름으로 알려주세요.",
  pug: "짧은 산책도 선선한 시간에 하고, 호흡이 편안해질 때까지 시원한 실내에서 쉬게 해요. 움직임을 더 권하기보다 그날의 반응에 맞춰 일정을 줄여야 해요.",
  "french-bulldog": "기온과 습도가 높다면 산책 시간을 줄이고 시원한 실내에서 회복을 우선해요. 짧은 활동 뒤에도 호흡이 편안해지는지 살피며 하루 일정을 조정해야 해요.",
  "italian-sighthound": "움직이는 대상에 반응해 순간적으로 속도를 낼 수 있지만, 활동 뒤에는 사람 가까운 조용한 자리에서 오래 쉬기도 해요. 닫힌 공간에서 짧게 움직인 뒤 방해받지 않고 회복하는 흐름을 마련해 주세요.",
  rottweiler: "큰 체격에 맞는 주거 규정과 이동 동선, 교육 지원을 입양 전에 확인해야 해요. 차량 탑승과 병원 이동에 필요한 장비와 의료비도 함께 계획해 주세요.",
};

const modernWorkProfiles: Partial<Record<(typeof familiarStandardSlugs)[number], NonNullable<StandardBreedDetail["modernWork"]>>> = {
  "labrador-retriever": {
    storyStep: {
      navLabel: "현재의 역할",
      eyebrow: "4단계 · 오늘은 어떤 일을 할까?",
      title: "안내와 탐지처럼 사람과 협력하는 일을 맡아요.",
      body: "래브라도 리트리버는 안내견과 냄새 탐지견 등으로 선발되어 환경을 살피고 담당자에게 결과를 알려요. 직업견은 건강·기질 평가와 전문 훈련을 통과한 개체예요.",
      image: "/illustrations/v4/labrador-retriever-feature-modern-detection-work.webp",
      imageAlt: "대중교통 시설의 훈련 공간에서 검은 성견 래브라도 리트리버가 가방의 냄새를 탐지하고 담당자에게 알리는 삽화",
    },
    title: "래브라도 리트리버는 오늘 어떤 일을 맡고 있을까요?",
    description: "회수견의 협력 배경은 오늘날 안내와 탐지처럼 사람과 긴밀히 호흡하는 전문 작업에서도 이어집니다.",
    roles: [
      {
        label: "시각장애인 안내견",
        title: "복잡한 환경에서 사람과 보조를 맞춰 이동해요.",
        body: "삼성화재 안내견학교와 Guide Dogs for the Blind는 래브라도 리트리버를 주요 안내견 견종으로 소개해요. 이 역할에는 자신감과 환경 적응력, 낮은 산만함, 사람의 신호에 반응하는 능력이 요구됩니다.",
        sourceUrls: ["https://www.guidedog.co.kr/mobile/story/guidedog.do", "https://www.guidedogs.com/resources/faqs"],
      },
      {
        label: "냄새 탐지견",
        title: "냄새를 찾되 담당자와 함께 과제를 끝내요.",
        body: "런던 경찰청은 래브라도를 탐지 업무에 투입하는 견종 중 하나로 공개해요. 냄새에 오래 집중하고 배운 신호로 결과를 알리는 과정은 탐색 지속력과 사람 중심 협업을 보여주는 단서입니다.",
        sourceUrls: ["https://www.met.police.uk/foi-ai/metropolitan-police/disclosure-2023/october-2023/canine-breeds-various-tasks-mps/"],
      },
    ],
    caution: "직업견은 건강·기질 평가와 전문 훈련을 통과한 개체예요. 같은 견종이라는 이유만으로 모든 반려견에게 같은 집중력이나 안정성을 기대할 수는 없어요.",
  },
  "golden-retriever": {
    storyStep: {
      navLabel: "현재의 역할",
      eyebrow: "4단계 · 오늘은 어떤 일을 할까?",
      title: "안내견으로 사람과 안전한 이동을 함께해요.",
      body: "골든 리트리버는 안내견으로 선발되어 사람과 한 팀으로 이동하는 일을 맡기도 해요. 모든 개체가 적합한 것은 아니며 전문 기관이 건강·기질·학습 과정을 개별적으로 평가해요.",
      image: "/illustrations/v4/golden-retriever-feature-modern-guide-work.webp",
      imageAlt: "횡단보도 앞 점자 블록에서 시각장애인과 함께 안전하게 멈춘 성견 골든 리트리버 안내견 삽화",
    },
    title: "골든 리트리버는 오늘 어떤 일을 맡고 있을까요?",
    description: "사람과 가까이 협력하며 대상을 부드럽게 회수한 배경은 안내견을 선발하고 훈련하는 과정에서도 중요한 단서가 됩니다.",
    roles: [
      {
        label: "시각장애인 안내견",
        title: "사람과 한 팀이 되어 안전한 이동을 도와요.",
        body: "삼성화재 안내견학교와 Guide Dogs for the Blind는 골든 리트리버도 안내견으로 활동하는 견종이라고 설명해요. 실제 선발에서는 품종명보다 건강, 자신감, 적응력, 관리 가능성과 낮은 산만함을 함께 평가합니다.",
        sourceUrls: ["https://www.guidedog.co.kr/mobile/story/guidedog.do", "https://www.guidedogs.com/resources/faqs"],
      },
    ],
    caution: "부드러운 인상이나 견종의 평판이 안내견 적합성을 보증하지 않아요. 전문 기관은 개체별 건강과 행동, 학습 과정과 복지를 계속 평가합니다.",
  },
  "german-shepherd-dog": {
    storyStep: {
      navLabel: "현재의 역할",
      eyebrow: "4단계 · 오늘은 어떤 일을 할까?",
      title: "경찰 순찰과 수색·구조 현장에서 협력해요.",
      body: "저먼 셰퍼드 독은 경찰 순찰이나 도시 수색·구조 작업에 선발되어 담당자의 신호에 따라 탐색하고 위치를 알려요. 이런 전문 작업은 엄격한 선발과 통제된 훈련을 전제로 하며 반려견에게 공격성을 요구할 근거가 아니에요.",
      image: "/illustrations/v4/german-shepherd-dog-feature-modern-search-rescue.webp",
      imageAlt: "안전하게 통제된 구조 훈련장에서 성견 저먼 셰퍼드 독이 냄새를 찾고 담당자에게 위치를 알리는 삽화",
    },
    title: "저먼 셰퍼드 독은 오늘 어떤 일을 맡고 있을까요?",
    description: "목양과 다목적 작업의 배경은 오늘날 경찰 순찰과 수색·구조처럼 서로 다른 전문 과제에서도 이어집니다.",
    roles: [
      {
        label: "경찰 순찰견",
        title: "담당자의 신호에 맞춰 순찰과 수색을 수행해요.",
        body: "런던 경찰청은 일반 목적 경찰견의 주된 견종으로 저먼 셰퍼드 독을 공개해요. 주변을 살피면서도 담당자와 방향을 맞추는 일은 주의력과 반복 협업, 자극 뒤 다시 집중하는 능력을 요구합니다.",
        sourceUrls: ["https://www.met.police.uk/foi-ai/metropolitan-police/disclosure-2023/october-2023/canine-breeds-various-tasks-mps/"],
      },
      {
        label: "도시 수색·구조견",
        title: "복잡한 현장에서 냄새를 찾고 위치를 알려요.",
        body: "같은 경찰청 자료에는 선발된 저먼 셰퍼드 일반 목적견이 도시 수색·구조 훈련도 받는다고 기록돼요. 이 일에는 낯선 환경에서 움직이는 자신감과 냄새 탐색, 담당자에게 결과를 전달하는 협력이 필요합니다.",
        sourceUrls: ["https://www.met.police.uk/foi-ai/metropolitan-police/disclosure-2023/october-2023/canine-breeds-various-tasks-mps/"],
      },
    ],
    caution: "경찰견의 역할을 가정의 경계 행동과 동일하게 보면 안 돼요. 직업견은 엄격한 선발과 통제된 훈련을 받으며, 반려견에게 공격성이나 과도한 경계를 요구할 근거가 되지 않습니다.",
  },
  dobermann: {
    storyStep: {
      navLabel: "현재의 역할",
      eyebrow: "4단계 · 오늘은 어떤 일을 할까?",
      title: "보호와 추적 작업에서 담당자와 협력해요.",
      body: "도베르만은 보호·추적 작업에서 주변을 살피고 담당자의 신호로 행동을 전환하도록 훈련되기도 해요. 역사적 경찰견 이미지가 모든 도베르만의 현재 직업이나 성격을 뜻하지는 않아요.",
      image: "/illustrations/v4/dobermann-feature-modern-tracking-work.webp",
      imageAlt: "숲길에서 자연 귀와 긴 꼬리의 성견 도베르만이 긴 리드와 추적 하네스를 착용하고 냄새 흔적을 찾는 삽화",
    },
    title: "도베르만은 어떤 작업의 배경을 이어가고 있을까요?",
    description: "경찰견으로 알려진 역사와 오늘날의 보호·추적 작업을 구분해 보면 빠른 반응과 사람 중심 협업을 더 정확히 이해할 수 있습니다.",
    roles: [
      {
        label: "보호·추적 작업견",
        title: "주변을 살피면서도 담당자의 신호로 전환해요.",
        body: "FCI는 도베르만을 반려·보호·작업견으로 분류하고 작업 시험 대상 견종으로 두며, 영국 로열 켄넬 클럽은 경찰·군·경비·추적 등 여러 역할에 활용돼 왔다고 설명해요. 핵심 단서는 경계 자체보다 높은 훈련 가능성과 담당자와의 협업입니다.",
        sourceUrls: ["https://www.fci.be/Nomenclature/Standards/143g02-en.pdf", "https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/working/dobermann/"],
      },
    ],
    caution: "역사적 경찰견 이미지는 모든 도베르만의 현재 직업이나 성격을 뜻하지 않아요. 강한 경계를 부추기기보다 안정적인 사회화와 보호자에게 주의를 돌리는 학습이 먼저입니다.",
  },
};

function createFamiliarStandardDetail(slug: (typeof familiarStandardSlugs)[number]): StandardBreedDetail {
  const breed = getBreed(slug);
  if (!breed) throw new Error(`익숙한 견종 데이터를 찾을 수 없습니다: ${slug}`);
  if (!breed.historyVisual) throw new Error(`익숙한 견종 역사 이미지를 찾을 수 없습니다: ${slug}`);

  const cards = getBreedFeatures(slug)?.cards ?? fallbackCards[slug];
  if (!cards) throw new Error(`표준 상세 카드 데이터를 찾을 수 없습니다: ${slug}`);
  const modernWork = modernWorkProfiles[slug];
  const sizeVarieties = sizeVarietyProfiles[slug];
  const storyOverrides = storyStepOverrides[slug];
  const realityCards = (realityCardIndexes[slug] ?? [1, 2]).map((index) => cards[index]!);

  return standardBreedDetailSchema.parse({
    slug,
    nameKo: breed.nameKo,
    metadataDescription: `${breed.nameKo}의 ${breed.identity.originalRole} 배경과 오늘날 나타날 수 있는 경향, ${cards[1].eyebrow}와 ${cards[2].eyebrow}에 필요한 실제 생활 준비를 살펴봅니다.`,
    heroStatement: heroStatementOverrides[slug] ?? cards[0].title,
    sizeVarieties,
    story: {
      title: `${breed.nameKo}의 과거 배경은 오늘의 생활에서 어떻게 이어질까요?`,
      description: "과거의 역할과 형성 배경을 단서로 삼아 현재 보일 수 있는 경향과 보호자가 체감할 생활 조건을 함께 살펴보세요.",
      steps: [
        storyOverrides?.background ?? {
          navLabel: "역할의 배경",
          eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
          title: `${breed.identity.originalRole}의 배경에서 출발했어요.`,
          body: breed.behaviorClues.originalRole,
          image: breed.historyVisual.src,
          imageAlt: breed.historyVisual.alt,
        },
        storyOverrides?.tendency ?? {
          navLabel: "현재의 경향",
          eyebrow: "2단계 · 오늘은 어떻게 나타날까?",
          title: cards[0].title,
          body: cards[0].description,
          image: cards[0].image,
          imageAlt: cards[0].alt,
        },
        {
          navLabel: "생활의 현실",
          eyebrow: "3단계 · 보호자는 무엇을 체감할까?",
          title: dailyRealityTitles[slug],
          body: dailyRealityBodyOverrides[slug] ?? breed.story.reality,
          image: slug === "labrador-retriever"
            ? "/illustrations/v4/labrador-retriever-feature-daily-rhythm-v2.webp"
            : `/illustrations/v4/${slug}-feature-daily-rhythm.webp`,
          imageAlt: slug === "labrador-retriever"
            ? "산책과 짧은 과제를 마친 뒤 미끄럼 방지 매트에서 쉬고 보호자가 회수 도구와 먹거리 보관함을 정리하는 검은 성견 래브라도 리트리버 삽화"
            : `보호자와 일상 활동을 마친 뒤 편안한 리듬으로 전환하는 성견 ${breed.nameKo} 삽화`,
        },
        ...(modernWork ? [modernWork.storyStep] : []),
      ],
      caution: "견종의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 다르게 나타날 수 있어요.",
    },
    modernWork,
    realitiesTitle: `${breed.nameKo}의 생활 현실`,
    realities: realityCards.map((card, index) => sizeVarieties && index === 1 ? {
      id: "size-varieties",
      title: "성견 가슴둘레로 세 크기를 확인해요.",
      body: "닥스훈트는 한 이름 안에 세 가지 크기가 있어요. 함께 살 개체의 예상 성견 크기를 먼저 확인해야 해요.",
      image: sizeVarieties.items[0].image,
      imageAlt: sizeVarieties.items[0].imageAlt,
    } : {
      id: `daily-reality-${index + 1}`,
      title: card.title,
      body: card.description,
      image: card.image,
      imageAlt: card.alt,
    }),
    readinessTitle: `${withAndParticle(breed.nameKo)} 보낼 일상을 생각해보세요.`,
    readinessQuestions: [
      `매일 ${breed.nameKo}에게 맞는 산책과 활동, 차분한 휴식을 함께 마련할 수 있나요?`,
      `${cards[1].eyebrow}에 필요한 생활 환경과 관리 시간을 꾸준히 마련할 수 있나요?`,
      `${cards[2].eyebrow}에 필요한 반복 관리와 비용을 현실적으로 이어갈 수 있나요?`,
    ],
    relatedTitle: `${breed.nameKo}가 마음에 들지만 망설여진다면`,
    relatedDescription: "비슷한 첫인상보다 체격과 활동, 반복 관리 조건의 차이를 먼저 살펴보세요.",
    relatedDifferences: Object.fromEntries(breed.related.map((related) => [related.slug, related.reason])),
  });
}

export const familiarStandardBreedDetails = familiarStandardSlugs.map(createFamiliarStandardDetail);
