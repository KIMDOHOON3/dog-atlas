import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useInfiniteBatch } from "./use-infinite-batch";

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function setup(total = 110) {
  const element = document.createElement("div");
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({ top: 0 } as DOMRect);
  return renderHook(({ total }) => {
    const [count, setCount] = useState(48);
    const ref = useInfiniteBatch(count, total, 48, setCount);
    // Attach the test sentinel before the hook's effect runs.
    ref.current = element;
    return { count, ref };
  }, { initialProps: { total } });
}

describe("shared infinite batches", () => {
  it("loads once per observer batch, caps count and ignores disposed callbacks", () => {
    const callbacks: IntersectionObserverCallback[] = [];
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { callbacks.push(callback); }
      observe = vi.fn();
      disconnect = disconnect;
    });
    const events = vi.spyOn(window, "addEventListener");
    const hook = setup();
    const notify = (index: number) => callbacks[index]([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(events).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    act(() => { notify(0); notify(0); });
    expect(hook.result.current.count).toBe(96);
    act(() => notify(1));
    expect(hook.result.current.count).toBe(110);
    expect(callbacks).toHaveLength(2);
    hook.unmount();
    act(() => notify(1));
    expect(disconnect).toHaveBeenCalled();
  });

  it("works without an observer and cleans up its fallback", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", vi.fn((cb: FrameRequestCallback) => { frames.push(cb); return frames.length; }));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");
    const hook = setup();
    expect(add).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    act(() => frames[0](0));
    expect(hook.result.current.count).toBe(96);
    hook.unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it("throttles the WebView safety path and still loads if observer notifications are missing", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", class { observe = vi.fn(); disconnect = vi.fn(); });
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", vi.fn((cb: FrameRequestCallback) => { frames.push(cb); return frames.length; }));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    const hook = setup();
    const bounds = vi.mocked(hook.result.current.ref.current!.getBoundingClientRect);
    bounds.mockReturnValue({ top: 9999 } as DOMRect);
    act(() => frames[0](0));
    bounds.mockClear();
    for (let i = 0; i < 50; i++) window.dispatchEvent(new Event("scroll"));
    expect(vi.getTimerCount()).toBe(1);
    act(() => vi.advanceTimersByTime(150));
    expect(frames).toHaveLength(2);
    bounds.mockReturnValue({ top: 0 } as DOMRect);
    act(() => frames[1](0));
    expect(bounds).toHaveBeenCalledTimes(1);
    expect(hook.result.current.count).toBe(96);
    window.dispatchEvent(new Event("scroll"));
    hook.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not observe an already complete result set", () => {
    const constructor = vi.fn();
    vi.stubGlobal("IntersectionObserver", constructor);
    setup(12);
    expect(constructor).not.toHaveBeenCalled();
  });
});
