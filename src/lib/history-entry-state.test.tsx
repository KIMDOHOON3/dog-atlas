import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { readHistoryEntryValue, useHistoryEntryState, writeHistoryEntryValue } from "./history-entry-state";

const isVisibleCount = (value: unknown): value is number => Number.isInteger(value) && Number(value) >= 48;
const isString = (value: unknown): value is string => typeof value === "string";

describe("history entry state", () => {
  beforeEach(() => {
    window.history.replaceState({ __NA: true, routeMarker: "home" }, "", "/");
  });

  it("merges view state without removing Next.js history fields", () => {
    writeHistoryEntryValue("homeCarouselSlug", "samoyed");
    writeHistoryEntryValue("homeCuriosityTheme", "giant-build");

    expect(window.history.state).toMatchObject({
      __NA: true,
      routeMarker: "home",
      __dogAtlasView: {
        homeCarouselSlug: "samoyed",
        homeCuriosityTheme: "giant-build",
      },
    });
    expect(readHistoryEntryValue("homeCarouselSlug")).toBe("samoyed");
  });

  it("restores a valid value and writes later changes to the same entry", () => {
    writeHistoryEntryValue("discoverVisibleCount", 144);

    const { result } = renderHook(() => useHistoryEntryState(
      "discoverVisibleCount",
      48,
      isVisibleCount,
    ));

    expect(result.current[0]).toBe(144);

    act(() => result.current[1]((count) => count + 48));

    expect(result.current[0]).toBe(192);
    expect(readHistoryEntryValue("discoverVisibleCount")).toBe(192);
  });

  it("uses and records the default when an entry has no valid value", () => {
    writeHistoryEntryValue("homeCarouselSlug", 12);

    const { result } = renderHook(() => useHistoryEntryState(
      "homeCarouselSlug",
      "japanese-spitz",
      isString,
    ));

    expect(result.current[0]).toBe("japanese-spitz");
    expect(readHistoryEntryValue("homeCarouselSlug")).toBe("japanese-spitz");
  });
});
