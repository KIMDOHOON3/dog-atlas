import { poodleDetail } from "@/content/poodle-detail/data";
import type { Breed } from "@/content/breeds/schema";
import { StandardBreedDetailExperience } from "./breed-detail-standard";
import { PoodleRealityCards } from "./poodle-detail-interactions";

type RelatedBreed = { breed: Breed; reason: string };

export function PoodleDetailExperience({ related }: { related: RelatedBreed[] }) {
  return (
    <StandardBreedDetailExperience
      detail={{
        slug: "poodle",
        nameKo: "푸들",
        story: poodleDetail.story,
        realitiesTitle: "푸들의 생활 현실",
        readinessTitle: "푸들과 보낼 일상을 생각해보세요.",
        readinessQuestions: poodleDetail.readinessQuestions,
        relatedTitle: "푸들이 마음에 들지만 망설여진다면",
        relatedDescription: "다른 생활 조건을 가진 견종도 함께 살펴보세요.",
        relatedDifferences: poodleDetail.relatedDifferences,
      }}
      related={related}
      realityCards={<PoodleRealityCards />}
    />
  );
}
