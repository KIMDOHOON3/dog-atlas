import { describe, expect, it } from "vitest";
import { presentBreedOrigin } from "./breed-origin-presentation";

describe("presentBreedOrigin", () => {
  it("removes registry sponsor wording from user-facing origin labels", () => {
    expect(presentBreedOrigin("중동 · FCI 후원")).toBe("중동");
    expect(presentBreedOrigin("아프가니스탄 · 영국 후원")).toBe("아프가니스탄");
    expect(presentBreedOrigin("중앙아프리카 · FCI 후원국 영국")).toBe("중앙아프리카");
  });

  it("keeps the historical origin when the FCI standard country is editorial context", () => {
    expect(presentBreedOrigin("FCI 표준상 기원국은 미국 · 역사적 뿌리는 시베리아 북동부")).toBe("시베리아 북동부");
  });

  it("keeps ordinary multi-region labels", () => {
    expect(presentBreedOrigin("영국 · 웨일스")).toBe("영국 · 웨일스");
  });
});
