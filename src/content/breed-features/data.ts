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
        description: "오랫동안 사람 곁의 반려견으로 지내온 만큼 가족과 가까이 머무는 경향이 있어요. 함께하는 시간뿐 아니라 짧고 편안한 혼자 쉬기도 천천히 익혀주세요.",
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
]);

const breedFeaturesBySlug = new Map(breedFeatureSets.map((featureSet) => [featureSet.slug, featureSet]));

export function getBreedFeatures(slug: string) {
  return breedFeaturesBySlug.get(slug);
}
