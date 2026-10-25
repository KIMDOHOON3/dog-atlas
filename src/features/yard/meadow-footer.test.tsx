import { act, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MeadowFooter } from "./meadow-footer";

const mocks = vi.hoisted(() => ({
  setVisible: vi.fn(),
  dispose: vi.fn(),
  create: vi.fn(),
  load: vi.fn(),
}));
vi.mock("./yard-model", () => ({ loadYardModel: mocks.load }));
vi.mock("./meadow-scene", () => ({ createMeadow: mocks.create }));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

it("retains the static yard and places link when WebGL cannot start", async () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  mocks.load.mockResolvedValue(new ArrayBuffer(0));
  mocks.create.mockImplementationOnce(() => {
    throw new Error("WebGL unavailable");
  });
  const view = render(<MeadowFooter />);
  const link = view.getByRole("link", { name: /함께 갈 곳/ });
  const host = link.closest("[aria-label]")!;
  await waitFor(() =>
    expect(host.getAttribute("data-renderer")).toBe("fallback"),
  );
  expect(host.hasAttribute("data-ready")).toBe(false);
  expect(link.getAttribute("href")).toBe("/places");
  expect(host.querySelector("picture img")?.getAttribute("src")).toBe(
    "/images/yard/preview-desktop.webp?v=2",
  );
  view.unmount();
});

it("prepares near the footer once, but keeps offscreen animation paused", async () => {
  const observers: {
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;
    disconnect: ReturnType<typeof vi.fn>;
  }[] = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      disconnect = vi.fn();
      observe = vi.fn();
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        observers.push({ callback, options, disconnect: this.disconnect });
      }
    },
  );
  mocks.load.mockResolvedValue(new ArrayBuffer(0));
  mocks.create.mockReturnValue({
    setVisible: mocks.setVisible,
    dispose: mocks.dispose,
  });
  const view = render(<MeadowFooter />);
  const visibility = observers.find((o) => !o.options)!;
  const preparation = observers.find((o) => o.options?.rootMargin)!;
  const notify = (observer: typeof visibility, visible: boolean) =>
    observer.callback(
      [{ isIntersecting: visible }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    );
  expect(mocks.create).not.toHaveBeenCalled();
  await act(async () => notify(preparation, true));
  await waitFor(() => expect(mocks.create).toHaveBeenCalledOnce());
  expect(mocks.setVisible).toHaveBeenLastCalledWith(false);
  expect(mocks.load).toHaveBeenCalledOnce();
  expect(preparation.disconnect).toHaveBeenCalledOnce();
  act(() => notify(visibility, true));
  expect(mocks.setVisible).toHaveBeenLastCalledWith(true);
  act(() => notify(visibility, false));
  expect(mocks.setVisible).toHaveBeenLastCalledWith(false);
  act(() => notify(visibility, true));
  expect(mocks.create).toHaveBeenCalledOnce();
  view.unmount();
  expect(mocks.dispose).toHaveBeenCalledOnce();
  expect(visibility.disconnect).toHaveBeenCalledOnce();
});
