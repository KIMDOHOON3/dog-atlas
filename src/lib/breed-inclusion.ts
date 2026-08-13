import type { MasterBreed } from "@/content/breeds/master-schema";

export type BreedInclusionPresentation = {
  label: string;
  authority: string;
  description: string;
};

export function getBreedInclusionPresentation(
  breed: MasterBreed,
): BreedInclusionPresentation {
  if (breed.inclusionType === "international-registered") {
    if (breed.registryStatus === "provisional") {
      return {
        label: "FCI 잠정 인정",
        authority: breed.evidenceAuthority,
        description: "FCI가 잠정적으로 인정하며 현재 상태는 바뀔 수 있어요.",
      };
    }

    return {
      label: breed.evidenceAuthority.includes("UKC") ? "UKC 등록" : "FCI 정식 인정",
      authority: breed.evidenceAuthority,
      description: "국제 등록단체가 품종 표준과 등록 상태를 관리해요.",
    };
  }

  const presentations = {
    "national-heritage": {
      label: "국가유산 토종견",
      description: "국가의 자연유산 제도에서 지정·관리하는 토종견이에요.",
    },
    "national-registered": {
      label: "국가 등록 토종견",
      description: "국가 기관이 독립 개체군으로 등록·관리하는 토종견이에요.",
    },
    "verified-landrace": {
      label: "검증된 지역 랜드레이스",
      description: "지역의 지속된 역할과 개체군을 보존사업·연구 자료로 확인했어요.",
    },
    "documented-population": {
      label: "기록된 토종 개체군",
      description: "지역명과 역할은 확인되지만 독립성·보존체계는 더 검토해야 해요.",
    },
    "designer-cross": {
      label: "디자이너 교배견",
      description: "둘 이상의 등록 견종을 의도적으로 교배한 유형으로, 크기·피모·행동 편차를 개체별로 확인해야 해요.",
    },
    "unverified-name": {
      label: "검증 중인 이름",
      description: "독립된 견종 또는 개체군인지 확인할 근거가 더 필요해요.",
    },
  } as const;
  const presentation = presentations[breed.inclusionType];

  return {
    ...presentation,
    authority: breed.evidenceAuthority,
  };
}
