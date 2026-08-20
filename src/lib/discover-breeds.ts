import type { Breed } from "@/content/breeds/schema";

type DiscoverTendency = Pick<Breed["tendencies"]["activity"], "label">;

export type DiscoverBreed = Pick<Breed, "slug" | "nameKo" | "nameEn" | "tagline"> & {
  identity: Pick<Breed["identity"], "origin" | "size">;
  tendencies: {
    activity: DiscoverTendency;
    mentalStimulation: DiscoverTendency;
    independence: DiscoverTendency;
    socialConnection: DiscoverTendency;
    alerting: DiscoverTendency;
    grooming: DiscoverTendency;
  };
};

export function toDiscoverBreed(breed: Breed): DiscoverBreed {
  return {
    slug: breed.slug,
    nameKo: breed.nameKo,
    nameEn: breed.nameEn,
    tagline: breed.tagline,
    identity: {
      origin: breed.identity.origin,
      size: breed.identity.size,
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
