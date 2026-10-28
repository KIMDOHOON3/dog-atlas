/** Horizontal intent only: native vertical scroll and toy drags keep priority. */
export function createYardViewControls(
  host: HTMLDivElement,
  onChange: (angle: number) => void,
) {
  const limit = Math.PI / 7.5; // 24 degrees to either side, no rear view.
  let angle = 0;
  let drag: {
    id: number;
    x: number;
    y: number;
    start: number;
    locked: boolean;
  } | null = null;
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const apply = (value: number) => {
    angle = Math.max(-limit, Math.min(limit, value));
    host.dataset.viewAngle = String(Math.round((angle * 180) / Math.PI));
    onChange(angle);
  };
  const cancel = () => {
    const previous = drag;
    drag = null;
    delete host.dataset.rotating;
    if (previous && host.hasPointerCapture(previous.id))
      host.releasePointerCapture(previous.id);
  };
  host.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.isPrimary) {
        cancel();
        return;
      }
      if (
        event.button !== 0 ||
        host.dataset.ready !== "true" ||
        (event.target instanceof Element &&
          event.target.closest("button,a,[data-yard-caption]"))
      )
        return;
      cancel();
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        start: angle,
        locked: false,
      };
    },
    options,
  );
  host.addEventListener(
    "pointermove",
    (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x,
        dy = event.clientY - drag.y;
      if (!drag.locked) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
          cancel();
          return;
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
        drag.locked = true;
        host.setPointerCapture(event.pointerId);
        host.dataset.rotating = "true";
      }
      event.preventDefault();
      apply(drag.start - (dx / Math.max(240, host.clientWidth)) * 1.6);
    },
    options,
  );
  for (const name of [
    "pointerup",
    "pointercancel",
    "lostpointercapture",
  ] as const)
    host.addEventListener(
      name,
      (event) => {
        if (event.pointerId === drag?.id) cancel();
      },
      options,
    );
  host.addEventListener(
    "pointerleave",
    () => {
      if (!drag?.locked) cancel();
    },
    options,
  );
  window.addEventListener("blur", cancel, options);
  return {
    cancel,
    dispose() {
      cancel();
      controller.abort();
      delete host.dataset.viewAngle;
    },
  };
}
