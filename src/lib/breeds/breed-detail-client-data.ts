import type { StandardBreedDetail } from "@/content/standard-breed-detail/schema";

// Explicit projections: TypeScript's Pick alone does not strip server-only
// fields from objects serialized across a React server/client boundary.
export function toStoryClientData(detail: Pick<StandardBreedDetail, "slug" | "nameKo" | "story">) {
  return { slug: detail.slug, nameKo: detail.nameKo, story: { steps: detail.story.steps } };
}

export function toReadinessClientData(detail: Pick<StandardBreedDetail, "slug" | "nameKo" | "readinessQuestions">) {
  return { slug: detail.slug, nameKo: detail.nameKo, readinessQuestions: detail.readinessQuestions };
}

export function toRealityClientData(detail: Pick<StandardBreedDetail, "nameKo" | "realities" | "sizeVarieties">) {
  return { nameKo: detail.nameKo, realities: detail.realities, sizeVarieties: detail.sizeVarieties };
}
