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
    finalClass: "giant",
    reason: "체고 68~76cm·체중 45~60kg의 높은 체고와 묵직한 작업견 체격을 반영해 Dog Atlas 서비스에서는 초대형으로 분리합니다.",
  },
  {
    slug: "polish-greyhound",
    finalClass: "large",
    reason: "장신·경량 시각하운드 체형이 초대형 생활 체감과 이질적이어서 Dog Atlas 서비스에서는 대형으로 분리합니다.",
  },
  {
    slug: "rafeiro-do-alentejo",
    finalClass: "giant",
    reason: "체고 64~74cm·체중 35~60kg의 큰 범위와 가축 보호견 체격을 반영해 Dog Atlas 서비스에서는 초대형으로 분리합니다.",
  },
  {
    slug: "maremma-sheepdog",
    finalClass: "giant",
    reason: "체고 62~73.5cm·체중 35~52kg의 상단 체격과 대형 가축 보호견의 생활 체감을 반영해 초대형으로 분리합니다.",
  },
  {
    slug: "macedonian-shepherd-dog-karaman",
    finalClass: "giant",
    reason: "체고 60~75cm·체중 35~55kg의 넓은 범위와 산악 가축 보호견 체격을 반영해 초대형으로 분리합니다.",
  },
];

export const breedSizeServiceOverrideBySlug = new Map(
  breedSizeServiceOverrides.map((override) => [override.slug, override]),
);
