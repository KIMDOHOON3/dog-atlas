import { z } from "zod";
import { sourceSchema } from "../breeds/schema";

const growthStageSchema = z.object({
  label: z.string().min(2),
  ageGuide: z.string().min(4),
  title: z.string().min(10),
  description: z.string().min(30),
  image: z.string().startsWith("/").endsWith(".webp"),
  alt: z.string().min(10),
  actions: z.array(z.string().min(15)).min(2).max(4),
});

export const breedGrowthGuideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  intro: z.string().min(30),
  stages: z.array(growthStageSchema).length(3),
  medicalNote: z.string().min(30),
  sources: z.array(sourceSchema).min(2),
});

export const breedGrowthGuideCollectionSchema = z.array(breedGrowthGuideSchema).superRefine((guides, context) => {
  const slugs = guides.map((guide) => guide.slug);
  if (new Set(slugs).size !== slugs.length) {
    context.addIssue({ code: "custom", message: "성장 가이드 견종 slug는 중복될 수 없습니다." });
  }
});

export type BreedGrowthGuide = z.infer<typeof breedGrowthGuideSchema>;
