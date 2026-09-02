import type { Breed } from "@/content/breeds/schema";

export type CuriosityBreedCard = {
  breed: Pick<Breed, "slug" | "nameKo" | "nameEn"> & { identity: Pick<Breed["identity"], "origin"> };
  fact: string;
};

export function toCuriosityBreedCard({ breed, fact }: { breed: Breed; fact: string }): CuriosityBreedCard {
  return { breed: { slug: breed.slug, nameKo: breed.nameKo, nameEn: breed.nameEn, identity: { origin: breed.identity.origin } }, fact };
}
