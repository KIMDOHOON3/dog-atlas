import type { Breed } from "@/content/breeds/schema";
import type { BreedContentAuditStatus } from "@/content/breed-content-audit";
import type { DogAtlasSizeClass } from "@/content/breed-sizes/schema";
import { getBreedSizePresentation } from "@/lib/breed-size-presentation";

type DiscoverTendency = Pick<Breed["tendencies"]["activity"], "label">;

export type DiscoverBreed = Pick<Breed, "slug" | "nameKo" | "nameEn" | "tagline"> & {
  contentAuditStatus: BreedContentAuditStatus | null;
  identity: Pick<Breed["identity"], "origin">;
  sizeClasses: DogAtlasSizeClass[];
  sizeDisplay?: string;
  tendencies: {
    activity: DiscoverTendency;
    mentalStimulation: DiscoverTendency;
    independence: DiscoverTendency;
    socialConnection: DiscoverTendency;
    alerting: DiscoverTendency;
    grooming: DiscoverTendency;
  };
};

export function toDiscoverBreed(breed: Breed, contentAuditStatus: BreedContentAuditStatus | null = null): DiscoverBreed {
  const size = getBreedSizePresentation(breed.slug);
  return {
    slug: breed.slug,
    nameKo: breed.nameKo,
    nameEn: breed.nameEn,
    tagline: breed.tagline,
    contentAuditStatus,
    sizeClasses: size.filterClasses,
    sizeDisplay: size.displayLabel,
    identity: {
      origin: breed.identity.origin,
    },
    tendencies: {
      activity: { label: breed.tendencies.activity.label },
      mentalStimulation: { label: breed.tendencies.mentalStimulation.label },
      independence: { label: breed.tendencies.independence.label },
      socialConnection: { label: breed.tendencies.socialConnection.label },
      alerting: { label: breed.tendencies.alerting.label },
      grooming: { label: breed.tendencies.grooming.label },
    },
  };
}

export function filterBreedsByContentAuditStatus<T extends Pick<DiscoverBreed, "contentAuditStatus">>(
  breeds: readonly T[],
  status: BreedContentAuditStatus | null,
): T[] {
  return status ? breeds.filter((breed) => breed.contentAuditStatus === status) : [...breeds];
}
