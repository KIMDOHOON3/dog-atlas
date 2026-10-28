import { expect, it, vi } from "vitest";
import { createYardViewControls } from "./yard-view-controls";

function setup() {
  const host = document.createElement("div");
  host.dataset.ready = "true";
  Object.defineProperty(host, "clientWidth", { value: 390 });
  host.setPointerCapture = vi.fn();
  host.hasPointerCapture = vi.fn(() => true);
  host.releasePointerCapture = vi.fn();
  const change = vi.fn();
  const controls = createYardViewControls(host, change);
  function pointer(
    type: string,
    x: number,
    y: number,
    target: HTMLElement = host,
    primary = true,
  ) {
    const event = new MouseEvent(type, {
      clientX: x,
      clientY: y,
      button: 0,
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperties(event, {
      pointerId: { value: primary ? 1 : 2 },
      isPrimary: { value: primary },
    });
    target.dispatchEvent(event);
    return event;
  }
  return { host, change, controls, pointer };
}
it("locks horizontal intent, clamps rotation, and releases capture", () => {
  const { host, change, controls, pointer } = setup();
  pointer("pointerdown", 100, 100);
  pointer("pointermove", 105, 101);
  expect(change).not.toHaveBeenCalled();
  expect(host.setPointerCapture).not.toHaveBeenCalled();
  expect(pointer("pointermove", 140, 102).defaultPrevented).toBe(true);
  expect(change).toHaveBeenLastCalledWith((-40 / 390) * 1.6);
  expect(host.dataset.rotating).toBe("true");
  pointer("pointermove", 900, 100);
  expect(host.dataset.viewAngle).toBe("-24");
  pointer("pointerup", 900, 100);
  expect(host.dataset.rotating).toBeUndefined();
  expect(host.releasePointerCapture).toHaveBeenCalledWith(1);
  controls.dispose();
});
it("leaves vertical gestures to native scrolling even if they later turn horizontal", () => {
  const { host, change, controls, pointer } = setup();
  pointer("pointerdown", 100, 100);
  expect(pointer("pointermove", 103, 130).defaultPrevented).toBe(false);
  pointer("pointermove", 200, 130);
  expect(change).not.toHaveBeenCalled();
  expect(host.setPointerCapture).not.toHaveBeenCalled();
  controls.dispose();
});
it("does not rotate from toy buttons, links, caption, or an unready scene", () => {
  const { host, change, controls, pointer } = setup();
  host.innerHTML =
    '<button data-play-item="bone"><span>뼈다귀</span></button><a href="/places">장소</a><div data-yard-caption>설명</div>';
  for (const target of host.querySelectorAll<HTMLElement>(
    "span,a,[data-yard-caption]",
  )) {
    pointer("pointerdown", 100, 100, target);
    pointer("pointermove", 200, 100);
  }
  delete host.dataset.ready;
  pointer("pointerdown", 100, 100);
  pointer("pointermove", 200, 100);
  expect(change).not.toHaveBeenCalled();
  controls.dispose();
});
it.each(["pointercancel", "lostpointercapture", "blur", "second-touch"])(
  "cancels on %s without a continuing drag",
  (reason) => {
    const { host, change, controls, pointer } = setup();
    pointer("pointerdown", 100, 100);
    pointer("pointermove", 130, 100);
    if (reason === "blur") window.dispatchEvent(new Event("blur"));
    else if (reason === "second-touch")
      pointer("pointerdown", 140, 100, host, false);
    else pointer(reason, 130, 100);
    const count = change.mock.calls.length;
    pointer("pointermove", 200, 100);
    expect(change).toHaveBeenCalledTimes(count);
    expect(host.dataset.rotating).toBeUndefined();
    controls.dispose();
  },
);
it("removes pointer listeners and angle state on disposal", () => {
  const { host, change, controls, pointer } = setup();
  pointer("pointerdown", 100, 100);
  pointer("pointermove", 130, 100);
  expect(change).toHaveBeenCalledOnce();
  controls.dispose();
  const count = change.mock.calls.length;
  pointer("pointerdown", 100, 100);
  pointer("pointermove", 200, 100);
  expect(change).toHaveBeenCalledTimes(count);
  expect(host.dataset.viewAngle).toBeUndefined();
});
