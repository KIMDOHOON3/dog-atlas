import { z } from "zod";
import { sourceSchema, type Breed } from "@/content/breeds/schema";

const breedNameStoryKeySchema = z.enum(["pointer", "retriever", "setter", "spaniel", "shepherd", "terrier"]);

const exampleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  cue: z.string().min(2),
});

const storySourceSchema = sourceSchema.extend({
  label: z.string().min(2),
});

const breedNameStorySchema = z.object({
  key: breedNameStoryKeySchema,
  term: z.string().min(2),
  meaning: z.string().min(2),
  description: z.string().min(20),
  collectionDescription: z.string().min(20),
  examples: z.array(exampleSchema).length(4),
  sources: z.array(storySourceSchema).min(1),
});

const checkedAt = "2026-08-11";

export type BreedNameStory = z.infer<typeof breedNameStorySchema>;
export type BreedNameStoryKey = z.infer<typeof breedNameStoryKeySchema>;

export const breedNameStories = z.array(breedNameStorySchema).length(6).parse([
  {
    key: "pointer",
    term: "Pointer",
    meaning: "가리키는 개",
    description: "들새 냄새를 찾으면 멈춰 서서 코와 몸으로 방향을 가리키던 작업 방식이 이름이 됐어요.",
    collectionDescription: "이름에 Pointer가 붙었거나 현재 도감에서 포인팅견으로 분류된 견종을 모았어요. Setter와 Spaniel은 각 이름 페이지에서 따로 살펴봅니다.",
    examples: [
      { slug: "english-pointer", cue: "멈춰서 방향 알림" },
      { slug: "german-short-haired-pointing-dog", cue: "육지·물 다목적 포인팅" },
      { slug: "vizsla", cue: "찾기·가리키기·회수" },
      { slug: "weimaraner", cue: "넓은 범위 탐색·포인팅" },
    ],
    sources: [
      {
        label: "AKC · Pointer",
        title: "Get to Know the Pointer Breeds",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/sporting-group-pointer-breeds/",
        checkedAt,
      },
    ],
  },
  {
    key: "retriever",
    term: "Retriever",
    meaning: "다시 가져오는 개",
    description: "사냥 뒤 떨어진 새를 찾아 물이나 들을 건너고, 손상시키지 않은 채 사람에게 다시 가져오는 일을 했어요.",
    collectionDescription: "현재 도감의 영문 견종명에 Retriever가 포함된 견종을 모았어요. 회수 작업을 했더라도 다른 이름을 가진 견종은 이 목록에 자동으로 넣지 않습니다.",
    examples: [
      { slug: "labrador-retriever", cue: "물과 들에서 회수" },
      { slug: "golden-retriever", cue: "사냥감 탐색·회수" },
      { slug: "flat-coated-retriever", cue: "육지와 물의 조류 회수" },
      { slug: "curly-coated-retriever", cue: "곱슬 피모의 수상 회수" },
    ],
    sources: [
      {
        label: "AKC · Retriever",
        title: "Get to Know the Retriever Breeds",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/meet-retriever-breeds/",
        checkedAt,
      },
    ],
  },
  {
    key: "setter",
    term: "Setter",
    meaning: "자리를 잡아 알리는 개",
    description: "새를 찾으면 몸을 낮춰 자리를 잡는 ‘set’ 동작으로 위치를 알리던 방식에서 이름이 나왔어요.",
    collectionDescription: "현재 도감의 영문 견종명에 Setter가 포함된 견종을 모았어요. 모두 포인팅 작업과 연결되지만 지역과 피모, 탐색 방식은 서로 다릅니다.",
    examples: [
      { slug: "english-setter", cue: "몸을 낮춰 위치 알림" },
      { slug: "irish-red-setter", cue: "들새 탐색·포인팅" },
      { slug: "gordon-setter", cue: "스코틀랜드의 포인팅" },
      { slug: "irish-red-and-white-setter", cue: "들판의 위치 알림" },
    ],
    sources: [
      {
        label: "AKC · Setter",
        title: "Get to Know the Setter Breeds",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/meet-setter-breeds/",
        checkedAt,
      },
    ],
  },
  {
    key: "spaniel",
    term: "Spaniel",
    meaning: "‘스페인 개’에서 온 이름",
    description: "이 말 자체는 한 가지 일을 뜻하지 않아요. 많은 스패니얼이 새를 찾아 날아오르게 하거나 회수했고, Springer와 Cocker가 더 구체적인 역할을 알려 줍니다.",
    collectionDescription: "현재 도감의 영문 견종명에 Spaniel이 포함된 견종을 모았어요. 조렵·회수 배경뿐 아니라 오늘날 반려견으로 자리 잡은 계통도 함께 포함됩니다.",
    examples: [
      { slug: "english-springer-spaniel", cue: "spring · 새를 날아오르게 함" },
      { slug: "english-cocker-spaniel", cue: "woodcock · 작은 새 사냥" },
      { slug: "welsh-springer-spaniel", cue: "덤불 속 들새 몰아내기" },
      { slug: "sussex-spaniel", cue: "숲과 덤불의 조렵" },
    ],
    sources: [
      {
        label: "M-W · Spaniel 어원",
        title: "Spaniel — Word History",
        organization: "Merriam-Webster",
        url: "https://www.merriam-webster.com/dictionary/spaniel",
        checkedAt,
      },
      {
        label: "AKC · Springer",
        title: "English Springer Spaniel History",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/english-springer-spaniel-history/",
        checkedAt,
      },
    ],
  },
  {
    key: "shepherd",
    term: "Sheepdog · Shepherd",
    meaning: "양 떼와 함께 일한 개",
    description: "어떤 개는 양 떼를 모아 이동시키고, 어떤 개는 무리 곁에 머물며 포식자를 막았어요. 이름만 보고 모두 몰이견이라고 단정할 수는 없습니다.",
    collectionDescription: "현재 도감의 영문 견종명에 Sheepdog 또는 Shepherd가 포함된 견종을 모았어요. 몰이와 가축 수호처럼 서로 다른 역할을 한 견종이 함께 있습니다.",
    examples: [
      { slug: "german-shepherd-dog", cue: "양 떼 이동·통제" },
      { slug: "australian-shepherd", cue: "목장에서 가축 몰이" },
      { slug: "shetland-sheepdog", cue: "작은 체구의 목양 작업" },
      { slug: "caucasian-shepherd-dog", cue: "가축 곁에서 수호" },
    ],
    sources: [
      {
        label: "AKC · 목양과 수호",
        title: "Sheepdogs and Livestock Guardian Dogs",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/anatolian-shepherd-dog-history/",
        checkedAt,
      },
    ],
  },
  {
    key: "terrier",
    term: "Terrier",
    meaning: "땅으로 들어가는 개",
    description: "라틴어 terra, ‘땅’과 이어지는 이름이에요. 작은 사냥감이나 해충을 따라 굴속으로 들어가던 작업이 남아 있습니다.",
    collectionDescription: "현재 도감의 영문 견종명에 Terrier가 포함된 견종을 모았어요. 이름은 공통되지만 굴 작업, 해충 관리, 농장 작업과 오늘의 역할은 다양합니다.",
    examples: [
      { slug: "border-terrier", cue: "굴과 바위틈 추적" },
      { slug: "jack-russell-terrier", cue: "굴속 여우 추적" },
      { slug: "cairn-terrier", cue: "돌무더기 사이 해충 추적" },
      { slug: "airedale-terrier", cue: "강가와 들의 다목적 작업" },
    ],
    sources: [
      {
        label: "AKC · Terrier 어원",
        title: "Yorkshire Terrier History",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/yorkshire-terrier-history/",
        checkedAt,
      },
      {
        label: "AKC · Terrier 역할",
        title: "History of the AKC Breed Groups",
        organization: "American Kennel Club",
        url: "https://www.akc.org/expert-advice/dog-breeds/history-akc-breed-groups/",
        checkedAt,
      },
    ],
  },
]);

const storyMatchers: Record<BreedNameStoryKey, (breed: Breed) => boolean> = {
  pointer: (breed) => breed.catalog.group === "pointing" && !/\b(?:setter|spaniel)\b/i.test(breed.nameEn),
  retriever: (breed) => /\bretriever\b/i.test(breed.nameEn),
  setter: (breed) => /\bsetter\b/i.test(breed.nameEn),
  spaniel: (breed) => /\bspaniel\b/i.test(breed.nameEn),
  shepherd: (breed) => /\b(?:shepherd|sheepdog)\b/i.test(breed.nameEn),
  terrier: (breed) => /\bterrier\b/i.test(breed.nameEn),
};

export function getBreedNameStory(key: string) {
  return breedNameStories.find((story) => story.key === key);
}

export function getBreedNameStoryBreeds(key: BreedNameStoryKey, allBreeds: readonly Breed[]) {
  return allBreeds.filter(storyMatchers[key]);
}
