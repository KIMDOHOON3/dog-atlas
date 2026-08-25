import { getBreedFeatures } from "@/content/breed-features/data";
import { getBreed } from "@/content/breeds/data";
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
      title: "빠르게 움직이는 대상을 눈으로 좇고 달리려 할 수 있어요.",
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
      description: "굴 사냥을 돕던 배경은 냄새를 집요하게 좇거나 땅을 파는 모습으로 나타날 수 있어요. 안전한 파기 공간과 찾기 과제로 행동의 출구를 마련하세요.",
      image: "/illustrations/v4/jack-russell-terrier-feature-scent-digging.webp",
      alt: "지정된 모래 공간에서 냄새 주머니를 찾는 성견 잭 러셀 테리어 삽화",
    },
    {
      eyebrow: "출입과 추적 안전",
      title: "문이 열리기 전 멈추고 보호자를 확인하는 흐름을 만들어요.",
      description: "작은 움직임을 좇는 반응이 강한 개체는 열린 문과 느슨한 울타리에서 빠르게 멀어질 수 있어요. 안전문과 하네스, 긴 줄을 일상적으로 사용하세요.",
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

function createFamiliarStandardDetail(slug: (typeof familiarStandardSlugs)[number]): StandardBreedDetail {
  const breed = getBreed(slug);
  if (!breed) throw new Error(`익숙한 견종 데이터를 찾을 수 없습니다: ${slug}`);
  if (!breed.historyVisual) throw new Error(`익숙한 견종 역사 이미지를 찾을 수 없습니다: ${slug}`);

  const cards = getBreedFeatures(slug)?.cards ?? fallbackCards[slug];
  if (!cards) throw new Error(`표준 상세 카드 데이터를 찾을 수 없습니다: ${slug}`);

  return standardBreedDetailSchema.parse({
    slug,
    nameKo: breed.nameKo,
    metadataDescription: `${breed.nameKo}의 ${breed.identity.originalRole} 배경과 오늘날 나타날 수 있는 경향, ${cards[1].eyebrow}와 ${cards[2].eyebrow}에 필요한 실제 생활 준비를 살펴봅니다.`,
    heroStatement: breed.tagline,
    story: {
      title: `${breed.nameKo}의 과거 배경은 오늘의 생활에서 어떻게 이어질까요?`,
      description: "과거의 역할과 형성 배경을 단서로 삼아 현재 보일 수 있는 경향과 보호자가 체감할 생활 조건을 함께 살펴보세요.",
      steps: [
        {
          navLabel: "역할의 배경",
          eyebrow: "1단계 · 어떤 배경에서 출발했을까?",
          title: `${breed.identity.originalRole}의 배경에서 출발했어요.`,
          body: breed.behaviorClues.originalRole,
          image: breed.historyVisual.src,
          imageAlt: breed.historyVisual.alt,
        },
        {
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
          title: "외형만으로는 매일 필요한 준비를 알 수 없어요.",
          body: breed.story.reality,
          image: `/illustrations/v4/${slug}-feature-daily-rhythm.webp`,
          imageAlt: `보호자와 일상 활동을 마친 뒤 편안한 리듬으로 전환하는 성견 ${breed.nameKo} 삽화`,
        },
      ],
      caution: "견종의 과거 배경은 행동을 이해하는 단서일 뿐이에요. 성장 환경과 경험, 건강 상태와 개체에 따라 다르게 나타날 수 있어요.",
    },
    realitiesTitle: `${breed.nameKo}의 생활 현실`,
    realities: cards.slice(1).map((card, index) => ({
      id: `daily-reality-${index + 1}`,
      title: card.title,
      body: card.description,
      image: card.image,
      imageAlt: card.alt,
    })),
    readinessTitle: `${breed.nameKo}와 보낼 일상을 생각해보세요.`,
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
