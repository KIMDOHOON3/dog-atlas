import { describe, expect, it } from "vitest";

import { getMasterBreed } from "@/content/breeds/master-catalog";
import { getBreedInclusionPresentation } from "./breed-inclusion";

describe("breed inclusion presentation", () => {
  it("distinguishes definitive, provisional, heritage, landrace, and documented populations", () => {
    expect(getBreedInclusionPresentation(getMasterBreed("border-collie")!).label).toBe("FCI 정식 인정");
    expect(getBreedInclusionPresentation(getMasterBreed("kazakh-tazy")!).label).toBe("FCI 잠정 인정");
    expect(getBreedInclusionPresentation(getMasterBreed("sapsaree")!).label).toBe("국가유산 토종견");
    expect(getBreedInclusionPresentation(getMasterBreed("mongolian-bankhar")!).label).toBe("검증된 지역 랜드레이스");
    expect(getBreedInclusionPresentation(getMasterBreed("jeju-dog")!).label).toBe("기록된 토종 개체군");
  });

  it("names the non-FCI international registry instead of implying FCI recognition", () => {
    const presentation = getBreedInclusionPresentation(getMasterBreed("american-bully")!);
    expect(presentation.label).toBe("UKC 등록");
    expect(presentation.authority).toContain("UKC");
  });
});
