import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PageScrollControl } from "./page-scroll-control";

const route = vi.hoisted(() => ({ pathname: "/discover" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

beforeEach(() => {
  vi.useFakeTimers();
  route.pathname = "/discover";
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 16));
  vi.stubGlobal("cancelAnimationFrame", (id: number) => window.clearTimeout(id));
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  vi.stubGlobal("scrollTo", vi.fn());
  vi.stubGlobal("scrollY", 500);
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function showBottomControl() {
  const view = render(<PageScrollControl />);
  act(() => vi.advanceTimersByTime(16));
  vi.stubGlobal("scrollY", 450);
  fireEvent.scroll(window);
  act(() => vi.advanceTimersByTime(16));
  return view;
}

describe("page scroll follow timer", () => {
  it("keeps one interval on repeated clicks and cancels it on unmount", () => {
    const view = showBottomControl();
    const button = screen.getByRole("button", { name: "페이지 맨 아래로 이동" });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(vi.getTimerCount()).toBe(1);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("cancels an old page's interval on navigation", () => {
    const view = showBottomControl();
    fireEvent.click(screen.getByRole("button", { name: "페이지 맨 아래로 이동" }));
    route.pathname = "/breeds/poodle";
    view.rerender(<PageScrollControl />);
    act(() => vi.advanceTimersByTime(16));
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops after the page height stabilizes", () => {
    showBottomControl();
    fireEvent.click(screen.getByRole("button", { name: "페이지 맨 아래로 이동" }));
    act(() => vi.advanceTimersByTime(720));
    expect(vi.getTimerCount()).toBe(0);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 5000, behavior: "auto" });
  });
});
