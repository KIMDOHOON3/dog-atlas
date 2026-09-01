import { z } from "zod";

export const dogAtlasSizeClassSchema = z.enum([
  "extra-small",
  "small",
  "medium",
  "large",
  "giant",
]);

export const breedSizeStatusSchema = z.enum([
  "confirmed",
  "provisional",
  "varieties",
  "variable-parentage",
  "conflict",
  "missing",
]);

export const sizeConflictKindSchema = z.enum([
  "rounding",
  "minor",
  "meaning-difference",
  "true-conflict",
]);

export const sizeConflictReviewSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  kind: sizeConflictKindSchema,
  outcome: z.enum(["confirmed", "provisional", "conflict"]),
  selectedLocation: z.enum([
    "identity.size",
    "breedFactOverrides",
    "heroSizeDetails",
    "sizeVarieties",
    "dedicated-detail",
  ]),
  note: z.string().min(10),
});

export const measurementSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("range"), min: z.number().nonnegative(), max: z.number().nonnegative() }),
  z.object({ kind: z.literal("representative"), value: z.number().nonnegative() }),
  z.object({ kind: z.literal("lower-bound"), value: z.number().nonnegative() }),
  z.object({ kind: z.literal("upper-bound"), value: z.number().nonnegative() }),
]);

export const sizeEvidenceSchema = z.object({
  location: z.enum([
    "identity.size",
    "breedFactOverrides",
    "heroSizeDetails",
    "sizeVarieties",
    "dedicated-detail",
    "external-official",
  ]),
  raw: z.string().min(1),
  sourceUrls: z.array(z.url()),
});

export const externalSizeSourceSchema = z.object({
  organization: z.string().min(2),
  documentTitle: z.string().min(2),
  url: z.url(),
  checkedAt: z.iso.date(),
  rawValue: z.string().min(1),
  meaning: z.enum([
    "official-standard-range",
    "official-ideal-with-tolerance",
    "official-breed-information-range",
    "official-general-adult-range",
  ]),
});

export const externalDimensionSupplementSchema = z.object({
  measurement: measurementSchema,
  source: externalSizeSourceSchema,
  sexMeasurements: z.object({
    male: measurementSchema.optional(),
    female: measurementSchema.optional(),
  }).optional(),
});

export const externalBreedSizeSupplementSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  height: externalDimensionSupplementSchema.optional(),
  weight: externalDimensionSupplementSchema.optional(),
  resolvesConflict: z.boolean().default(false),
  note: z.string().min(10),
});

const varietySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  heightCm: measurementSchema.optional(),
  weightKg: measurementSchema.optional(),
  otherMeasurement: z.string().min(1).optional(),
  note: z.string().min(1).optional(),
  sources: z.array(externalSizeSourceSchema).optional(),
});

export const breedSizeProfileSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nameKo: z.string().min(1),
  status: breedSizeStatusSchema,
  heightCm: measurementSchema.optional(),
  weightKg: measurementSchema.optional(),
  varieties: z.array(varietySchema).min(2).optional(),
  note: z.string().min(1).optional(),
  reviewFlags: z.array(z.string().min(1)).default([]),
  evidence: z.array(sizeEvidenceSchema),
}).superRefine((profile, context) => {
  if (profile.status === "confirmed") {
    const completeKinds = new Set(["range", "representative"]);
    if (!profile.heightCm || !profile.weightKg || !completeKinds.has(profile.heightCm.kind) || !completeKinds.has(profile.weightKg.kind)) {
      context.addIssue({
        code: "custom",
        message: "confirmed 견종은 완전한 체고와 체중 값이 모두 필요합니다.",
      });
    }
  }

  if (profile.status === "varieties" && !profile.varieties) {
    context.addIssue({ code: "custom", message: "varieties 견종은 두 개 이상의 크기 유형이 필요합니다." });
  }

  if (profile.status !== "varieties" && profile.varieties) {
    context.addIssue({ code: "custom", message: "크기 유형은 varieties 상태에서만 저장할 수 있습니다." });
  }
});

export const breedSizeCollectionSchema = z.array(breedSizeProfileSchema).superRefine((profiles, context) => {
  const slugs = profiles.map((profile) => profile.slug);
  if (new Set(slugs).size !== slugs.length) {
    context.addIssue({ code: "custom", message: "크기 데이터의 slug는 중복될 수 없습니다." });
  }
});

export type DogAtlasSizeClass = z.infer<typeof dogAtlasSizeClassSchema>;
export type BreedSizeStatus = z.infer<typeof breedSizeStatusSchema>;
export type Measurement = z.infer<typeof measurementSchema>;
export type SizeEvidence = z.infer<typeof sizeEvidenceSchema>;
export type BreedSizeProfile = z.infer<typeof breedSizeProfileSchema>;
export type BreedSizeVariety = z.infer<typeof varietySchema>;
export type SizeConflictKind = z.infer<typeof sizeConflictKindSchema>;
export type SizeConflictReview = z.infer<typeof sizeConflictReviewSchema>;
export type ExternalBreedSizeSupplement = z.infer<typeof externalBreedSizeSupplementSchema>;
