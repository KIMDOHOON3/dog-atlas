import type { DogAtlasSizeClass } from "./schema";

export type BreedSizeServiceOverride = {
  slug: string;
  finalClass: DogAtlasSizeClass;
  reason: string;
};

export const breedSizeServiceOverrides: readonly BreedSizeServiceOverride[] = [
  {
    slug: "greyhound",
    finalClass: "large",
    reason: "장신·경량 시각하운드 체형이 초대형 생활 체감과 이질적이어서 Dog Atlas 서비스에서는 대형으로 분리합니다.",
  },
  {
    slug: "black-russian-terrier",
    finalClass: "large",
    reason: "수치 계산은 초대형 경계에 걸리지만 Dog Atlas의 탐색 체감에서는 대형 작업견으로 분리합니다.",
  },
  {
    slug: "polish-greyhound",
    finalClass: "large",
    reason: "장신·경량 시각하운드 체형이 초대형 생활 체감과 이질적이어서 Dog Atlas 서비스에서는 대형으로 분리합니다.",
  },
];

export const breedSizeServiceOverrideBySlug = new Map(
  breedSizeServiceOverrides.map((override) => [override.slug, override]),
);
