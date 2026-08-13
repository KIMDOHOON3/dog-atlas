import { z } from "zod";

export const fciGroupDefinitions = [
  { number: 1, labelKey: "sheepdogs-cattledogs" },
  { number: 2, labelKey: "pinscher-schnauzer-molossoid-swiss" },
  { number: 3, labelKey: "terriers" },
  { number: 4, labelKey: "dachshunds" },
  { number: 5, labelKey: "spitz-primitive" },
  { number: 6, labelKey: "scenthounds-related" },
  { number: 7, labelKey: "pointing-dogs" },
  { number: 8, labelKey: "retrievers-flushing-water" },
  { number: 9, labelKey: "companion-toy" },
  { number: 10, labelKey: "sighthounds" },
] as const;

export type FciGroupNumber = (typeof fciGroupDefinitions)[number]["number"];

const fciGroupLabelKeys = fciGroupDefinitions.map((group) => group.labelKey) as [
  (typeof fciGroupDefinitions)[number]["labelKey"],
  ...(typeof fciGroupDefinitions)[number]["labelKey"][],
];

export const fciGroupLabelKeySchema = z.enum(fciGroupLabelKeys);

export const fciGroupSchema = z.object({
  number: z.number().int().min(1).max(10),
  labelKey: fciGroupLabelKeySchema,
}).superRefine((group, context) => {
  const expected = fciGroupDefinitions.find((definition) => definition.number === group.number);
  if (expected?.labelKey !== group.labelKey) {
    context.addIssue({
      code: "custom",
      path: ["labelKey"],
      message: `FCI ${group.number}그룹의 labelKey는 ${expected?.labelKey}이어야 합니다.`,
    });
  }
});

export const breedVarietySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  aliasesKo: z.array(z.string().min(1)).default([]),
  aliasesEn: z.array(z.string().min(1)).default([]),
});

export const inclusionTypeSchema = z.enum([
  "international-registered",
  "national-heritage",
  "national-registered",
  "verified-landrace",
  "documented-population",
  "designer-cross",
  "unverified-name",
]);

export const masterBreedSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  aliasesKo: z.array(z.string().min(1)).default([]),
  aliasesEn: z.array(z.string().min(1)).default([]),
  varieties: z.array(breedVarietySchema).default([]),
  fciGroup: fciGroupSchema.nullable(),
  registryStatus: z.enum(["definitive", "provisional", "non-fci", "verification-needed"]),
  inclusionType: inclusionTypeSchema,
  evidenceAuthority: z.string().min(1),
  detailPriority: z.enum(["core", "next", "later"]),
  detailStatus: z.enum(["published", "planned", "none"]),
  sourceIds: z.array(z.string().min(1)).min(1),
  verificationNotes: z.array(z.string().min(1)).default([]),
});

export const masterBreedCollectionSchema = z.array(masterBreedSchema).superRefine((entries, context) => {
  const slugs = entries.map((entry) => entry.slug);
  if (new Set(slugs).size !== slugs.length) {
    context.addIssue({
      code: "custom",
      message: "마스터 카탈로그의 견종 slug는 중복될 수 없습니다.",
    });
  }

  entries.forEach((entry, entryIndex) => {
    const varietyIds = entry.varieties.map((variety) => variety.id);
    if (new Set(varietyIds).size !== varietyIds.length) {
      context.addIssue({
        code: "custom",
        path: [entryIndex, "varieties"],
        message: `${entry.slug}의 바라이어티 ID는 중복될 수 없습니다.`,
      });
    }
  });
});

export type FciGroup = z.infer<typeof fciGroupSchema>;
export type BreedVariety = z.infer<typeof breedVarietySchema>;
export type InclusionType = z.infer<typeof inclusionTypeSchema>;
export type MasterBreed = z.infer<typeof masterBreedSchema>;

export function getFciGroupDefinition(number: FciGroupNumber): FciGroup {
  const definition = fciGroupDefinitions.find((group) => group.number === number);

  if (!definition) {
    throw new Error(`알 수 없는 FCI 그룹 번호입니다: ${number}`);
  }

  return definition;
}
