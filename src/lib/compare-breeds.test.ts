import { describe, expect, it } from "vitest";
import { resolveComparisonSelection } from "./compare-breeds";

describe("resolveComparisonSelection", () => {
  it("keeps two or three valid breeds in query order", () => {
    expect(resolveComparisonSelection("greyhound,maltese").breeds.map((breed) => breed.slug)).toEqual(["greyhound", "maltese"]);
    expect(resolveComparisonSelection("samoyed,border-collie,maltese").breeds.map((breed) => breed.slug)).toEqual(["samoyed", "border-collie", "maltese"]);
  });

  it("keeps a valid insufficient selection for the empty state", () => {
    expect(resolveComparisonSelection("greyhound").breeds.map((breed) => breed.slug)).toEqual(["greyhound"]);
    expect(resolveComparisonSelection(undefined).breeds).toEqual([]);
  });

  it("falls back safely when the query contains an invalid breed", () => {
    const result = resolveComparisonSelection("unknown,maltese");
    expect(result.usedFallback).toBe(true);
    expect(result.breeds.map((breed) => breed.slug)).toEqual(["japanese-spitz", "samoyed"]);
  });
});
