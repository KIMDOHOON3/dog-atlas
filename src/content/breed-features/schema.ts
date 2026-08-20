import { z } from "zod";

export const breedFeatureCardSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(10),
  description: z.string().min(30),
  image: z.string().startsWith("/").endsWith(".webp"),
  alt: z.string().min(10),
  sourceUrls: z.array(z.url()).min(1),
});

export const breedFeatureSetSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  intro: z.string().min(20),
  cards: z.array(breedFeatureCardSchema).length(3),
}).superRefine((featureSet, context) => {
  const titles = featureSet.cards.map((card) => card.title);
  const descriptions = featureSet.cards.map((card) => card.description);

  if (new Set(titles).size !== titles.length) {
    context.addIssue({ code: "custom", message: "한 견종의 특징 카드 제목은 중복될 수 없습니다." });
  }
  if (new Set(descriptions).size !== descriptions.length) {
    context.addIssue({ code: "custom", message: "한 견종의 특징 카드 설명은 중복될 수 없습니다." });
  }
});

export const breedFeatureCollectionSchema = z.array(breedFeatureSetSchema).superRefine((featureSets, context) => {
  const slugs = featureSets.map((featureSet) => featureSet.slug);
  if (new Set(slugs).size !== slugs.length) {
    context.addIssue({ code: "custom", message: "특징 카드 견종 slug는 중복될 수 없습니다." });
  }
});

export type BreedFeatureSet = z.infer<typeof breedFeatureSetSchema>;
