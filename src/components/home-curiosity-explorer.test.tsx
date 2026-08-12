import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { breeds } from "@/content/breeds/data";
import { homeCuriosityThemes } from "@/content/home-curiosity";
import { HomeCuriosityExplorer } from "./home-curiosity-explorer";

describe("HomeCuriosityExplorer", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation(() => ({ matches: false })),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(window, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    });
    Object.defineProperty(window, "cancelAnimationFrame", {
      configurable: true,
      value: vi.fn(),
    });
  });

  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("starts with the distinctive coat story and shows three breeds", () => {
    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    expect(screen.getByRole("button", { name: "독특한 털" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("코몬도르")).toBeInTheDocument();
    expect(screen.getByText("풀리")).toBeInTheDocument();
    expect(screen.getByText("베르가마스코 셰퍼드")).toBeInTheDocument();
  });

  it("changes all featured content when a theme button is pressed", () => {
    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    fireEvent.click(screen.getByRole("button", { name: "큰 체구" }));

    expect(screen.getByRole("button", { name: "큰 체구" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "독특한 털" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("그레이트 덴")).toBeInTheDocument();
    expect(screen.getByText("아이리시 울프하운드")).toBeInTheDocument();
    expect(screen.getByText("뉴펀랜드")).toBeInTheDocument();
  });

  it("links both the cards and collection call to action", () => {
    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    expect(screen.getByRole("link", { name: "코몬도르 상세 정보 보기" })).toHaveAttribute("href", "/breeds/komondor");
    expect(screen.getAllByRole("link", { name: /독특한 피모 견종 더 보기/ })[0]).toHaveAttribute("href", "/curiosity/distinctive-coats");
  });

  it("restores the selected theme when the home history entry mounts again", () => {
    const firstVisit = render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    fireEvent.click(screen.getByRole("button", { name: "큰 체구" }));
    firstVisit.unmount();

    render(<HomeCuriosityExplorer breeds={breeds} themes={homeCuriosityThemes} />);

    expect(screen.getByRole("button", { name: "큰 체구" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("그레이트 덴")).toBeInTheDocument();
  });
});
