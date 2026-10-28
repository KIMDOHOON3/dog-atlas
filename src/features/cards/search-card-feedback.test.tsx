import { act, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SearchCardFeedback } from "./search-card-feedback";

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function setup(reduced = false) {
  vi.useFakeTimers();
  const cancel = vi.fn();
  const animate = vi.fn(() => ({ cancel }));
  vi.stubGlobal("matchMedia", () => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <div ref={(node) => { if (node) node.animate = animate as unknown as typeof node.animate; }}>{children}</div>
  );
  return { animate, cancel, wrapper };
}

it("clears feedback after a short interval and replays for a new explicit selection", () => {
  const { animate, wrapper } = setup();
  const { container, rerender } = render(<SearchCardFeedback key={1} />, { wrapper });
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(animate).toHaveBeenCalledTimes(1);
  act(() => vi.advanceTimersByTime(1200));
  expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  rerender(<SearchCardFeedback key={2} />);
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(animate).toHaveBeenCalledTimes(2);
});

it("keeps reduced-motion feedback static and still dismisses it", () => {
  const { animate, wrapper } = setup(true);
  const { container } = render(<SearchCardFeedback />, { wrapper });
  expect(animate).not.toHaveBeenCalled();
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  act(() => vi.advanceTimersByTime(1200));
  expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
});

it("cancels motion and the dismiss timer when the selected card is left", () => {
  const { cancel, wrapper } = setup();
  const { unmount } = render(<SearchCardFeedback />, { wrapper });
  unmount();
  expect(cancel).toHaveBeenCalledTimes(1);
  expect(vi.getTimerCount()).toBe(0);
});
