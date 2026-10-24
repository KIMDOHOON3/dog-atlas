const koreanManagedBreedSlugs = new Set([
  "tosa",
  "american-pit-bull-terrier",
  "american-staffordshire-terrier",
  "staffordshire-bull-terrier",
  "rottweiler",
]);

export function isKoreanManagedBreed(slug: string) {
  return koreanManagedBreedSlugs.has(slug);
}
