import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  readHistoryEntryValue,
  useHistoryEntryState,
  writeHistoryEntryValue,
} from "./history-entry-state";

const isVisibleCount = (value: unknown): value is number =>
  Number.isInteger(value) && Number(value) >= 48;

describe("history entry state", () => {
  beforeEach(() => {
    window.history.replaceState({ __NA: true, routeMarker: "home" }, "", "/");
  });

  it("merges view state without removing Next.js history fields", () => {
    writeHistoryEntryValue("discoverVisibleCount", 96);

    expect(window.history.state).toMatchObject({
      __NA: true,
      routeMarker: "home",
      __dogAtlasView: {
        discoverVisibleCount: 96,
      },
    });
    expect(readHistoryEntryValue("discoverVisibleCount")).toBe(96);
  });

  it("restores a valid value and writes later changes to the same entry", () => {
    writeHistoryEntryValue("discoverVisibleCount", 144);

    const { result } = renderHook(() =>
      useHistoryEntryState("discoverVisibleCount", 48, isVisibleCount),
    );

    expect(result.current[0]).toBe(144);

    act(() => result.current[1]((count) => count + 48));

    expect(result.current[0]).toBe(192);
    expect(readHistoryEntryValue("discoverVisibleCount")).toBe(192);
  });

  it("uses and records the default when an entry has no valid value", () => {
    writeHistoryEntryValue("discoverVisibleCount", 12);

    const { result } = renderHook(() =>
      useHistoryEntryState("discoverVisibleCount", 48, isVisibleCount),
    );

    expect(result.current[0]).toBe(48);
    expect(readHistoryEntryValue("discoverVisibleCount")).toBe(48);
  });
});
