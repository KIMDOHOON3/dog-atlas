import { z } from "zod";

const standardStoryStepSchema = z.object({
  navLabel: z.string().min(4),
  eyebrow: z.string().min(5),
  title: z.string().min(10),
  body: z.string().min(25),
  image: z.string().startsWith("/").endsWith(".webp"),
  imageAlt: z.string().min(15),
});

const standardRealitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(4),
  body: z.string().min(25),
  image: z.string().startsWith("/").endsWith(".webp"),
  imageAlt: z.string().min(15),
});

export const standardBreedDetailSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nameKo: z.string().min(2),
  metadataDescription: z.string().min(50),
  heroStatement: z.string().min(15),
  story: z.object({
    title: z.string().min(15),
    description: z.string().min(20),
    steps: z.array(standardStoryStepSchema).length(3),
    caution: z.string().min(30),
  }),
  realitiesTitle: z.string().min(6),
  realities: z.array(standardRealitySchema).length(2),
  readinessTitle: z.string().min(10),
  readinessQuestions: z.array(z.string().endsWith("?")).length(3),
  relatedTitle: z.string().min(10),
  relatedDescription: z.string().min(15),
  relatedDifferences: z.record(z.string(), z.string().min(20)),
});

export type StandardBreedDetail = z.infer<typeof standardBreedDetailSchema>;
