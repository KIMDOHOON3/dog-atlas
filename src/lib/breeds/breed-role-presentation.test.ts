import { describe, expect, it } from "vitest";
import { getBreed } from "@/content/breeds/data";
import { getBreedRoleFacts } from "./breed-role-presentation";

describe("breed role presentation", () => {
  it("separates historical and current roles when they differ", () => {
    expect(getBreedRoleFacts(getBreed("welsh-corgi-pembroke")!)).toEqual([
      { label: "과거 역할", value: getBreed("welsh-corgi-pembroke")!.identity.originalRole },
      { label: "현재 역할", value: "반려견·목양·도그 스포츠" },
    ]);
  });

  it("combines a role that has continued into the present", () => {
    expect(getBreedRoleFacts(getBreed("maltese")!)).toEqual([
      { label: "과거부터 현재까지", value: "반려견" },
    ]);
  });

  it("shows verified present-day work alongside companion life", () => {
    expect(getBreedRoleFacts(getBreed("labrador-retriever")!)[1]).toEqual({
      label: "현재 역할",
      value: "반려견·안내견·탐지견",
    });
  });
});
