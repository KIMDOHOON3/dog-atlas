import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { breeds } from "@/content/breeds/data";
import { toDiscoverBreed } from "@/lib/discover-breeds";
import { DiscoverResultGrid, type SelectedEntry } from "./discover-result-grid";

const visual = vi.hoisted(() => ({ render: vi.fn() }));
vi.mock("./breed-visual", () => ({ BreedVisual: ({ breed }: { breed: { slug: string } }) => { visual.render(breed.slug); return null; } }));
const cards = breeds.slice(0, 3).map(toDiscoverBreed);
const noSelection: SelectedEntry[] = [];
beforeEach(() => visual.render.mockClear());

describe("memoized discovery grid", () => {
  it("skips unchanged cards when unrelated parent state changes", () => {
    const view = render(<DiscoverResultGrid breeds={cards} selectedEntries={noSelection} />);
    expect(visual.render).toHaveBeenCalledTimes(3);
    view.rerender(<DiscoverResultGrid breeds={cards} selectedEntries={noSelection} />);
    expect(visual.render).toHaveBeenCalledTimes(3);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("updates cards and highlights when filters or the visible list change", () => {
    const view = render(<DiscoverResultGrid breeds={cards} selectedEntries={noSelection} />);
    const selected: SelectedEntry[] = [{ key: "size", value: cards[0].sizeClasses[0], label: "선택한 체구" }];
    view.rerender(<DiscoverResultGrid breeds={cards.slice(0, 1)} selectedEntries={selected} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("선택한 체구")).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute("href", `/breeds/${cards[0].slug}`);
  });
});
