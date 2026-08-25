import type { Breed } from "@/content/breeds/schema";

type CurrentRolePresentation = {
  label: string;
  continuous?: boolean;
};

export type BreedRoleFact = {
  label: "과거 역할" | "현재 역할" | "과거부터 현재까지";
  value: string;
};

const currentRoles: Record<string, CurrentRolePresentation> = {
  "japanese-spitz": { label: "반려견", continuous: true },
  maltese: { label: "반려견", continuous: true },
  "bichon-frise": { label: "반려견", continuous: true },
  poodle: { label: "반려견·도그 스포츠·보조견" },
  "german-spitz": { label: "반려견" },
  chihuahua: { label: "반려견", continuous: true },
  "shih-tzu": { label: "반려견", continuous: true },
  "korea-jindo-dog": { label: "반려견·경비견" },
  "yorkshire-terrier": { label: "반려견·도그 스포츠" },
  maltipoo: { label: "반려견", continuous: true },
  "welsh-corgi-pembroke": { label: "반려견·목양·도그 스포츠" },
  "golden-retriever": { label: "반려견·안내견·보조견" },
  dachshund: { label: "반려견·도그 스포츠" },
  beagle: { label: "반려견·탐지견" },
  "miniature-schnauzer": { label: "반려견·도그 스포츠" },
  pug: { label: "반려견", continuous: true },
  "french-bulldog": { label: "반려견", continuous: true },
  pekingese: { label: "반려견", continuous: true },
  "continental-toy-spaniel": { label: "반려견·도그 스포츠" },
  "italian-sighthound": { label: "반려견·도그 스포츠" },
  "jack-russell-terrier": { label: "반려견·도그 스포츠" },
  "labrador-retriever": { label: "반려견·안내견·탐지견" },
  "border-collie": { label: "목양견·반려견·도그 스포츠" },
  samoyed: { label: "반려견·썰매 스포츠" },
  "siberian-husky": { label: "반려견·썰매 스포츠" },
  shiba: { label: "반려견" },
  "german-shepherd-dog": { label: "반려견·경찰견·수색견" },
  dobermann: { label: "반려견·보호·추적 작업견" },
  rottweiler: { label: "반려견·도그 스포츠" },
  dalmatian: { label: "반려견·도그 스포츠" },
  "great-dane": { label: "반려견" },
  "saint-bernard": { label: "반려견" },
};

export function getBreedRoleFacts(breed: Breed): BreedRoleFact[] {
  const current = currentRoles[breed.slug];

  if (!current) {
    return [
      { label: "과거 역할", value: breed.identity.originalRole },
      { label: "현재 역할", value: "주로 반려견" },
    ];
  }

  if (current.continuous) {
    return [{ label: "과거부터 현재까지", value: current.label }];
  }

  return [
    { label: "과거 역할", value: breed.identity.originalRole },
    { label: "현재 역할", value: current.label },
  ];
}
