import { z } from "zod";

const tendencySchema = z.object({
  label: z.enum(["낮은 편", "중간", "높은 편", "개체별 확인 필요"]),
  note: z.string().min(10),
});

export const sourceSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  url: z.url(),
  checkedAt: z.iso.date(),
});

export const breedSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  contentStatus: z.literal("mvp-editorial-draft"),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  tagline: z.string().min(10),
  palette: z.object({
    primary: z.string(),
    secondary: z.string(),
    ink: z.string(),
  }),
  illustration: z.string().startsWith("/"),
  catalog: z.object({
    group: z.enum([
      "companion",
      "herding",
      "sighthound",
      "northern-working",
      "dachshund",
      "scent-hound",
      "retriever-spaniel",
      "spitz-primitive",
      "guardian-working",
      "pointing",
      "terrier",
    ]),
    discoveryTags: z.array(z.string().min(1)).min(2),
  }),
  historyVisual: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(1),
  }).optional(),
  historyVisibility: z.enum(["visible", "hidden"]).optional(),
  identity: z.object({
    origin: z.string(),
    lineage: z.string(),
    originalRole: z.string(),
    size: z.string(),
    lifespan: z.string(),
  }),
  behaviorClues: z.object({
    originalRole: z.string().min(20),
    today: z.string().min(20),
    guardianContext: z.string().min(20),
  }),
  story: z.object({
    opening: z.string().min(30),
    roleToHome: z.string().min(30),
    reality: z.string().min(30),
  }),
  tendencies: z.object({
    activity: tendencySchema,
    mentalStimulation: tendencySchema,
    independence: tendencySchema,
    socialConnection: tendencySchema,
    alerting: tendencySchema,
    grooming: tendencySchema,
  }),
  careNotes: z.array(z.string().min(10)).min(2),
  healthEditorialNote: z.string().min(20),
  daySnapshot: z.array(
    z.object({
      time: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ).min(3),
  related: z.array(
    z.object({
      slug: z.string(),
      reason: z.string().min(10),
    }),
  ),
  sources: z.array(sourceSchema).min(1),
});

export const breedCollectionSchema = z
  .array(breedSchema)
  .min(1)
  .superRefine((breeds, context) => {
    const slugs = breeds.map((breed) => breed.slug);
    if (new Set(slugs).size !== slugs.length) {
      context.addIssue({
        code: "custom",
        message: "견종 slug는 중복될 수 없습니다.",
      });
    }
  });

export type Breed = z.infer<typeof breedSchema>;
export type Tendency = z.infer<typeof tendencySchema>;
export type Source = z.infer<typeof sourceSchema>;
