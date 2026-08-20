import { breedFeatureCollectionSchema } from "./schema";

export const breedFeatureSets = breedFeatureCollectionSchema.parse([
  {
    slug: "japanese-spitz",
    intro: "사람과의 관계, 주변 변화에 대한 반응, 매일 체감할 털 관리 부담을 먼저 살펴보세요.",
    cards: [
      {
        eyebrow: "사람과의 관계",
        title: "사람 곁에서 함께 움직이길 좋아해요.",
        description: "사람을 좋아하고 보호자와 산책하거나 놀이하는 시간을 즐기는 영리하고 쾌활한 반려견이에요. 다만 사람과 가까워지는 속도와 애정을 표현하는 방식은 강아지마다 달라요.",
        image: "/illustrations/v4/japanese-spitz-feature-companionship.webp",
        alt: "사람 곁을 따라 걸으며 얼굴을 바라보는 재패니즈 스피츠 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/japanese-spitz/"],
      },
      {
        eyebrow: "짖음과 알림",
        title: "작은 변화에도 먼저 반응할 수 있어요.",
        description: "현관 소리나 창밖 움직임에 반응해 짖을 수 있어요. 짖음이 길어지지 않도록 소리가 들린 뒤 조용히 기다리는 연습을 어릴 때부터 해두면 좋아요.",
        image: "/illustrations/v4/japanese-spitz-feature-calm-alert.webp",
        alt: "닫힌 문밖의 작은 소리를 조용히 알아차린 재패니즈 스피츠 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/japanese-spitz/", "https://www.ukcdogs.com/breed-groups/japanese-spitz"],
      },
      {
        eyebrow: "털 관리 부담",
        title: "풍성한 이중모는 꾸준한 빗질이 필요해요.",
        description: "짧고 촘촘한 속털과 풍성한 겉털을 함께 가진 견종이에요. 특히 털갈이 시기에는 빠진 속털이 엉키지 않도록 규칙적인 빗질을 생활에 포함해야 해요.",
        image: "/illustrations/v4/japanese-spitz-feature-double-coat.webp",
        alt: "빠진 속털을 브러시로 빗어 관리하는 재패니즈 스피츠 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/japanese-spitz/", "https://www.ukcdogs.com/breed-groups/japanese-spitz"],
      },
    ],
  },
  {
    slug: "maltese",
    intro: "사람과 가까이 지내는 방식, 작은 체구의 생활 안전, 긴 피모 관리 부담을 먼저 살펴보세요.",
    cards: [
      {
        eyebrow: "사람과의 관계",
        title: "사람 가까이에서 시간을 보내길 좋아해요.",
        description: "가족과 가까이 머물며 함께 시간을 보내는 것을 좋아하는 모습을 보일 수 있어요. 함께하는 시간뿐 아니라 짧고 편안한 혼자 쉬기도 천천히 익혀주세요.",
        image: "/illustrations/v4/maltese-feature-companionship.webp",
        alt: "앉아 있는 사람 가까이에서 얼굴을 바라보는 성견 말티즈 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/maltese/", "https://www.akc.org/expert-advice/dog-breeds/maltese-right-for-you/"],
      },
      {
        eyebrow: "작은 체구와 안전",
        title: "작은 몸에 맞는 생활 동선이 필요해요.",
        description: "높은 가구에서 뛰어내리거나 거친 상호작용은 작은 몸에 부담이 될 수 있어요. 발이 닿는 바닥과 오르내리는 높이, 아이와 만나는 방식을 차분히 살펴주세요.",
        image: "/illustrations/v4/maltese-feature-small-body-safety.webp",
        alt: "낮은 반려견 계단 옆에서 사람의 안내를 받는 성견 말티즈 삽화",
        sourceUrls: ["https://www.akc.org/expert-advice/dog-breeds/maltese-right-for-you/"],
      },
      {
        eyebrow: "피모 관리 부담",
        title: "긴 실키 코트는 매일 엉킴을 살펴야 해요.",
        description: "길고 곧은 흰 피모를 유지하려면 피부 가까이까지 부드럽게 빗고 엉킨 곳을 확인하는 시간이 필요해요. 빗질과 목욕, 피모 관리를 편안한 일상으로 익혀주세요.",
        image: "/illustrations/v4/maltese-feature-coat-care.webp",
        alt: "긴 흰 피모를 금속 빗으로 차분히 관리받는 성견 말티즈 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/maltese/"],
      },
    ],
  },
  {
    slug: "border-collie",
    intro: "움직임을 읽는 몰이 행동, 빠른 학습에 맞는 과제, 활동 뒤 차분히 쉬는 리듬을 먼저 살펴보세요.",
    cards: [
      {
        eyebrow: "몰이와 움직임",
        title: "움직이는 대상을 먼저 읽고 따라갈 수 있어요.",
        description: "양 떼의 방향을 읽고 모으도록 발달한 목양견이에요. 달리는 사람이나 놀이하는 아이처럼 빠르게 움직이는 대상에 시선이 고정되거나 따라가려는 모습이 보이면 거리를 두고 보호자에게 돌아오는 신호를 연습해주세요.",
        image: "/illustrations/v4/border-collie-feature-herding-focus.webp",
        alt: "공원에서 멀리 지나가는 사람과 자전거를 알아차린 뒤 보호자를 바라보는 성견 보더콜리 삽화",
        sourceUrls: ["https://images.akc.org/pdf/breeds/standards/Border_Collie.pdf", "https://www.akc.org/expert-advice/dog-breeds/border-collie-right-for-you/"],
      },
      {
        eyebrow: "배움과 과제",
        title: "빠르게 배우는 만큼 생각할 일이 필요해요.",
        description: "신호를 익히고 문제를 해결하는 활동에 적극적으로 참여할 수 있어요. 같은 공 던지기만 오래 반복하기보다 냄새 찾기, 짧은 협력 훈련, 규칙이 있는 놀이를 번갈아 제공해주세요.",
        image: "/illustrations/v4/border-collie-feature-thinking-tasks.webp",
        alt: "사람의 손 신호를 바라보며 냄새 상자와 훈련 도구 사이에서 과제를 기다리는 성견 보더콜리 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/border-collie/", "https://www.akc.org/expert-advice/dog-breeds/border-collie-right-for-you/"],
      },
      {
        eyebrow: "활동과 휴식",
        title: "많이 움직인 뒤 쉬는 법도 함께 배워야 해요.",
        description: "활동량이 높은 편이지만 자극을 계속 늘리는 것만으로 생활이 편안해지지는 않아요. 산책과 과제 뒤에는 소리와 움직임이 적은 자리에서 흥분을 낮추고 쉬는 시간을 일상에 넣어주세요.",
        image: "/illustrations/v4/border-collie-feature-calm-rest.webp",
        alt: "산책 도구와 장난감이 정리된 방에서 매트 위에 편안히 쉬는 성견 보더콜리 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/border-collie/", "https://www.akc.org/expert-advice/dog-breeds/border-collie-right-for-you/"],
      },
    ],
  },
  {
    slug: "greyhound",
    intro: "움직임을 보는 시선, 짧게 속도를 내고 쉬는 리듬, 얇은 피모에 맞는 보온 준비를 먼저 살펴보세요.",
    cards: [
      {
        eyebrow: "시각과 추적",
        title: "멀리 움직이는 대상을 먼저 발견할 수 있어요.",
        description: "눈으로 움직임을 찾고 빠르게 쫓도록 발달한 시각 하운드예요. 산책 중 작은 동물이나 빠르게 지나가는 대상에 주의가 쏠릴 수 있으니, 안전한 리드를 사용하고 실제 반응을 살펴주세요.",
        image: "/illustrations/v4/greyhound-feature-visual-tracking.webp",
        alt: "현대 공원에서 멀리 지나가는 자전거를 알아차리고 보호자 곁에 서 있는 성견 그레이하운드 삽화",
        sourceUrls: ["https://www.greyhoundtrust.org.uk/assets/000/004/111/training_tips_original.pdf?1581612710="],
      },
      {
        eyebrow: "질주와 휴식",
        title: "빠르게 달리는 능력과 하루 종일 바쁜 생활은 달라요.",
        description: "짧게 속도를 내는 순간과 편안히 쉬는 시간이 함께 필요한 견종이에요. 안전하게 달릴 수 있는 통제된 기회와 냄새 맡는 산책을 마련하고, 활동 뒤에는 조용히 회복할 자리를 준비해주세요.",
        image: "/illustrations/v4/greyhound-feature-sprint-rest.webp",
        alt: "안전하게 울타리가 설치된 공원 운동장에서 짧게 달리는 성견 그레이하운드 삽화",
        sourceUrls: ["https://www.greyhoundtrust.org.uk/home-a-greyhound/all-about-greyhounds"],
      },
      {
        eyebrow: "얇은 피모와 온도",
        title: "짧은 털은 추운 날 더 세심한 준비가 필요해요.",
        description: "피모가 짧고 몸에 지방이 적은 편이라 추운 날씨와 차가운 바닥을 불편해할 수 있어요. 기온과 개별 반응에 맞춰 보온 의류를 사용하고, 몸을 받쳐주는 따뜻한 휴식 자리를 마련해주세요.",
        image: "/illustrations/v4/greyhound-feature-cold-weather.webp",
        alt: "쌀쌀한 늦가을 공원에서 몸에 맞는 보온 코트를 입고 산책하는 성견 그레이하운드 삽화",
        sourceUrls: ["https://www.greyhoundtrust.org.uk/about-us/news/3908-quick-tips-to-keep-your-greyhound-healthy-in-winter"],
      },
    ],
  },
  {
    slug: "yakutian-laika",
    intro: "사람과 함께 움직이는 방식, 몸과 판단을 쓰는 활동, 풍성한 이중모의 계절 관리를 먼저 살펴보세요.",
    cards: [
      {
        eyebrow: "사람과의 협력",
        title: "사람 가까이에서 함께 움직이려 해요.",
        description: "사람과 가까이 지내고 함께 역할을 수행하는 데 적극적으로 참여할 수 있어요. 산책과 짧은 신호 놀이를 함께하며 보호자에게 시선을 돌리고 차분히 기다리는 경험도 만들어주세요.",
        image: "/illustrations/v4/yakutian-laika-feature-cooperation.webp",
        alt: "현대 공원에서 벤치에 앉은 보호자의 손 신호를 바라보는 성견 야쿠티안 라이카 삽화",
        sourceUrls: ["https://www.fci.be/Nomenclature/Standards/365g05-en.pdf", "https://www.akc.org/dog-breeds/yakutian-laika/"],
      },
      {
        eyebrow: "활동과 과제",
        title: "움직임과 생각할 일을 함께 채워야 해요.",
        description: "활동량과 에너지가 높은 편이라 걷기만 길게 반복하기보다 냄새 찾기, 방향 신호, 안전한 하네스 운동처럼 몸과 판단을 함께 쓰는 과제를 번갈아 제공해주세요.",
        image: "/illustrations/v4/yakutian-laika-feature-purposeful-activity.webp",
        alt: "숲길에서 몸에 맞는 하네스를 착용하고 보호자와 함께 달리는 성견 야쿠티안 라이카 삽화",
        sourceUrls: ["https://www.akc.org/dog-breeds/yakutian-laika/", "https://www.akc.org/expert-advice/dog-breeds/yakutian-laika-breed-history/"],
      },
      {
        eyebrow: "이중모와 계절",
        title: "풍성한 이중모는 털갈이와 더위 준비가 필요해요.",
        description: "굵은 겉털과 촘촘한 속털이 추운 환경을 견디도록 발달한 견종이에요. 피부 가까이까지 규칙적으로 빗고, 더운 계절에는 선선한 시간대의 활동과 편안한 실내 온도를 마련해주세요.",
        image: "/illustrations/v4/yakutian-laika-feature-double-coat.webp",
        alt: "선선한 실내에서 풍성한 이중모를 브러시로 관리받는 성견 야쿠티안 라이카 삽화",
        sourceUrls: ["https://www.fci.be/Nomenclature/Standards/365g05-en.pdf", "https://www.akc.org/expert-advice/dog-breeds/yakutian-laika-breed-history/"],
      },
    ],
  },
]);

const breedFeaturesBySlug = new Map(breedFeatureSets.map((featureSet) => [featureSet.slug, featureSet]));

export function getBreedFeatures(slug: string) {
  return breedFeaturesBySlug.get(slug);
}
