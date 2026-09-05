import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCardTransitionRenderer } from "@/lib/card-transition";
import { createFoilRenderer } from "@/lib/card-foil";
import { FoilCard } from "./foil-card";

vi.mock("@/lib/card-transition", () => ({
  createCardTransitionRenderer: vi.fn(() => null),
}));
vi.mock("@/lib/card-foil", () => ({ createFoilRenderer: vi.fn() }));
const frames = new Map<number, FrameRequestCallback>();
let id = 0;
let reduced = false;
const renderer = { draw: vi.fn(), resize: vi.fn(), dispose: vi.fn() };
function firstFrame(time = 20) {
  act(() => {
    const pending = [...frames.entries()];
    frames.clear();
    pending.forEach(([, callback]) => callback(time));
  });
}
function completeTurn() {
  const start = performance.now();
  for (let elapsed = 0; elapsed <= 1100; elapsed += 20)
    firstFrame(start + elapsed);
}

beforeEach(() => {
  reduced = false;
  frames.clear();
  vi.clearAllMocks();
  vi.mocked(createFoilRenderer).mockReturnValue(renderer);
  vi.mocked(createCardTransitionRenderer).mockReturnValue(null);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.set(++id, callback);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (key: number) => frames.delete(key));
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(() => vi.unstubAllGlobals());

describe("single breed foil study", () => {
  it("responds in the controls at card selection and retains the icon pose after landing", async () => {
    render(<FoilCard />);
    firstFrame();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "그레이트 데인" }));
    });
    expect(
      screen.getByRole("button", { name: "그레이트 데인" }),
    ).toHaveAttribute("data-selected", "true");
    expect(
      screen.getByRole("heading", { name: "그레이트 데인" }),
    ).toBeVisible();
    completeTurn();
    const flip = screen.getByRole("button", { name: "뒤집어서 알아보기" });
    fireEvent.click(flip);
    expect(flip).toHaveAttribute("data-back", "true");
    expect(flip).toHaveAttribute("aria-pressed", "false");
    expect(flip.querySelector('[data-visible="true"]')).toHaveTextContent(
      "그림으로 돌아가기",
    );
    completeTurn();
    expect(flip).toHaveAttribute("data-turning", "false");
    expect(flip).toHaveAttribute("data-back", "true");
    fireEvent.click(flip);
    expect(flip).toHaveAttribute("data-back", "false");
    completeTurn();
    expect(flip).toHaveAttribute("aria-pressed", "false");
  });

  it("reaches the eighth breed and shows missing lifespan without inventing a number", async () => {
    reduced = true;
    const { container } = render(<FoilCard />);
    firstFrame();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "몽골 방카르" }));
    });
    expect(screen.getByRole("button", { name: "다음 견종" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "이전 견종" })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: "뒤집어서 알아보기" }));
    expect(screen.getByText("자료 부족")).toBeVisible();
    expect(screen.getByText("자료 부족").parentElement).toHaveTextContent(
      /^자료 부족$/,
    );
    expect(screen.getByText(/몽골의 유목민과 함께/)).toBeVisible();
    expect(container.querySelectorAll("canvas")).toHaveLength(2);
    expect(createFoilRenderer).toHaveBeenCalledOnce();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "티베탄 마스티프" }));
    });
    fireEvent.click(screen.getByRole("button", { name: "뒤집어서 알아보기" }));
    expect(screen.getByText("암컷 / 수컷 · 최소 높이")).toBeVisible();
  });

  it("moves the old card over the incoming card, locks repeated input, and uses only one idle-stopping renderer", async () => {
    const { container } = render(<FoilCard />);
    firstFrame();
    renderer.draw.mockClear();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" })),
    );
    expect(
      screen.getByRole("heading", { name: "세인트 버나드" }),
    ).toBeVisible();
    const outgoing = container.querySelector('[data-departing="true"]');
    expect(outgoing).toHaveTextContent("그레이트 피레니즈");
    expect(outgoing).toHaveAttribute("aria-hidden", "true");
    const start = performance.now();
    fireEvent.click(screen.getByRole("button", { name: "그레이트 데인" }));
    firstFrame(start + 300);
    expect(outgoing).toHaveAttribute("data-slide-direction", "next");
    expect(
      container.querySelector('[role="group"][data-slide-direction]'),
    ).toHaveAttribute("data-slide-direction", "next");
    expect(renderer.draw).not.toHaveBeenCalled();
    expect(
      container.querySelector("canvas:not([data-transition-canvas])"),
    ).toHaveStyle({ opacity: "0" });
    expect(
      screen.getByRole("heading", { name: "세인트 버나드" }),
    ).toBeVisible();
    for (let elapsed = 320; elapsed <= 1100; elapsed += 20)
      firstFrame(start + elapsed);
    expect(container.querySelector('[data-departing="true"]')).toBeNull();
    expect(screen.getByRole("button", { name: "다음 견종" })).toHaveAttribute(
      "aria-disabled",
      "false",
    );
    expect(
      container.querySelector("canvas:not([data-transition-canvas])"),
    ).toHaveStyle({ opacity: "1" });
    expect(renderer.draw).toHaveBeenCalled();
    expect(frames.size).toBe(0);
    expect(container.querySelectorAll("canvas")).toHaveLength(2);
    expect(createFoilRenderer).toHaveBeenCalledOnce();
  });

  it("returns the previous card from the left over the current card, then clears motion state", async () => {
    const { container } = render(<FoilCard />);
    firstFrame();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" })),
    );
    completeTurn();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "이전 견종" })),
    );
    const returning = screen.getByRole("group", {
      name: "그레이트 피레니즈 홀로그램 카드",
    });
    expect(returning).toHaveAttribute("data-slide-direction", "previous");
    const outgoing = container.querySelector('[data-departing="true"]');
    expect(outgoing).toHaveTextContent("세인트 버나드");
    expect(outgoing).toHaveAttribute("data-slide-direction", "previous");
    renderer.draw.mockClear();
    firstFrame(performance.now() + 300);
    expect(renderer.draw).not.toHaveBeenCalled();
    completeTurn();
    expect(returning).not.toHaveAttribute("data-slide-direction");
    expect(container.querySelector('[data-departing="true"]')).toBeNull();
    expect(screen.getByRole("button", { name: "이전 견종" })).toBeDisabled();
    expect(frames.size).toBe(0);
  });

  it("uses prepared GPU textures during motion without drawing the foil, then restores DOM and stops the mesh", async () => {
    const mesh = {
      prepare: vi.fn(async () => true),
      settle: vi.fn(async () => {}),
      start: vi.fn(() => true),
      draw: vi.fn(),
      stop: vi.fn(),
      dispose: vi.fn(),
    };
    vi.mocked(createCardTransitionRenderer).mockReturnValue(mesh);
    const { container, unmount } = render(<FoilCard />);
    firstFrame();
    renderer.draw.mockClear();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" })),
    );
    expect(mesh.start).toHaveBeenCalledOnce();

    expect(container.querySelector('[data-departing="true"]')).toBeNull();
    const surface = screen.getByRole("group", {
      name: "세인트 버나드 홀로그램 카드",
    });
    expect(surface).toHaveStyle({ opacity: "0" });
    const uploads = mesh.prepare.mock.calls.length;
    const start = performance.now();
    for (let time = 4; time <= 600; time += 4) firstFrame(start + time);
    expect(mesh.draw.mock.calls.length).toBeGreaterThan(10);
    expect(mesh.draw.mock.calls.length).toBeLessThan(42);
    expect(mesh.prepare).toHaveBeenCalledTimes(uploads);
    expect(renderer.draw).not.toHaveBeenCalled();
    firstFrame(start + 900);
    expect(surface).toHaveStyle({ opacity: "1" });
    expect(mesh.stop).toHaveBeenCalled();
    expect(frames.size).toBe(0);
    unmount();
    expect(mesh.dispose).toHaveBeenCalledOnce();
  });

  it("restores the destination when the mesh context is lost mid-transition", async () => {
    const mesh = {
      prepare: vi.fn(async () => true),
      settle: vi.fn(async () => {}),
      start: vi.fn(() => true),
      draw: vi.fn(),
      stop: vi.fn(),
      dispose: vi.fn(),
    };
    vi.mocked(createCardTransitionRenderer).mockReturnValue(mesh);
    const { container } = render(<FoilCard />);
    firstFrame();
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" })),
    );
    fireEvent(
      container.querySelector("[data-transition-canvas]")!,
      new Event("webglcontextlost", { cancelable: true }),
    );
    expect(
      screen.getByRole("heading", { name: "세인트 버나드" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "다음 견종" })).toHaveAttribute(
      "aria-disabled",
      "false",
    );
    expect(mesh.dispose).toHaveBeenCalledOnce();
  });

  it("changes breeds immediately with reduced motion and preserves foil-off state", async () => {
    reduced = true;
    const { container } = render(<FoilCard />);
    firstFrame();
    fireEvent.click(screen.getByRole("button", { name: /홀로그램 켜짐/ }));
    renderer.draw.mockClear();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "그레이트 데인" }));
    });
    expect(
      screen.getByRole("heading", { name: "그레이트 데인" }),
    ).toBeVisible();
    expect(container.querySelector("[data-foil]")).toHaveAttribute(
      "data-foil",
      "false",
    );
    expect(screen.getByRole("button", { name: "이전 견종" })).toBeEnabled();
    expect(renderer.draw).not.toHaveBeenCalled();
    expect(frames.size).toBe(0);
  });

  it("finishes an interrupted slide on tab hiding instead of leaving a blank or locked card", async () => {
    const { container } = render(<FoilCard />);
    firstFrame();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "그레이트 데인" }));
    });
    firstFrame(performance.now() + 100);
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(
      screen.getByRole("heading", { name: "그레이트 데인" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "이전 견종" })).toBeEnabled();
    expect(
      container.querySelector("canvas:not([data-transition-canvas])"),
    ).toHaveStyle({ opacity: "1" });
    expect(frames.size).toBe(0);
    hidden.mockRestore();
  });

  it("switches breeds during a flip without accumulating renderers or losing foil preferences", async () => {
    const { container } = render(<FoilCard />);
    firstFrame();
    expect(screen.getByRole("button", { name: "이전 견종" })).toBeDisabled();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /뒤집어서 알아보기/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" }));
    });
    completeTurn();
    expect(
      screen.getByRole("heading", { name: "세인트 버나드" }),
    ).toBeVisible();
    expect(
      screen.getByRole("group", { name: /홀로그램 카드/ }),
    ).toHaveAttribute("data-side", "front");
    fireEvent.click(screen.getByRole("button", { name: /뒤집어서 알아보기/ }));
    completeTurn();
    expect(screen.getByText(/알프스의 수도사들과/)).toBeVisible();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "다음 견종" }));
    });
    completeTurn();
    expect(
      screen.getByRole("heading", { name: "그레이트 데인" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "다음 견종" })).toBeEnabled();
    expect(screen.getByRole("slider")).toHaveValue("40");
    expect(renderer.draw).toHaveBeenLastCalledWith(
      expect.any(Number),
      expect.any(Number),
      0.4,
      false,
      true,
    );
    expect(container.querySelectorAll("canvas")).toHaveLength(2);
    expect(createFoilRenderer).toHaveBeenCalledOnce();
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: "그레이트 피레니즈" }),
      );
    });
    completeTurn();
    expect(
      screen.getByRole("heading", { name: "그레이트 피레니즈" }),
    ).toBeVisible();
    expect(renderer.draw).toHaveBeenLastCalledWith(
      expect.any(Number),
      expect.any(Number),
      0.4,
      false,
      false,
    );
  });

  it("preserves the starting tilt and ignores repeated flips until landing", () => {
    const { container } = render(<FoilCard />);
    firstFrame(performance.now());
    const card = screen.getByRole("group", { name: /홀로그램 카드/ });
    const surface = container.querySelector<HTMLElement>("[data-foil]")!;
    const pose = surface.style.transform;
    fireEvent.keyDown(card, { key: "Enter" });
    fireEvent.keyDown(card, { key: "Enter" });
    expect(surface.style.transform).toBe(pose);
    completeTurn();
    expect(card).toHaveAttribute("data-side", "back");
    expect(surface).toHaveAttribute("data-turning", "false");
    expect(surface.style.transform).toBe(pose);
    expect(frames.size).toBe(0);
  });

  it("flips without WebGL, exposes only the active face, and returns with Escape", () => {
    vi.mocked(createFoilRenderer).mockReturnValue(null);
    render(<FoilCard />);
    firstFrame();
    const card = screen.getByRole("group", { name: /홀로그램 카드/ });
    fireEvent.keyDown(card, { key: "Enter" });
    completeTurn();
    expect(card).toHaveAttribute("data-side", "back");
    expect(
      screen.queryByRole("img", { name: /전신 수채화/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /나란히 선 어른/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "성견 크기" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "그레이트 피레니즈" }),
    ).toBeInTheDocument();
    fireEvent.keyDown(card, { key: "Escape" });
    completeTurn();
    expect(card).toHaveAttribute("data-side", "front");
    expect(screen.getByRole("img", { name: /전신 수채화/ })).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "성견 크기" }),
    ).not.toBeInTheDocument();
  });

  it("keeps drags and cancelled gestures from flipping but accepts the next tap", () => {
    vi.stubGlobal("PointerEvent", MouseEvent);
    render(<FoilCard />);
    firstFrame();
    const card = screen.getByRole("group", { name: /홀로그램 카드/ });
    card.setPointerCapture = vi.fn();
    card.hasPointerCapture = () => true;
    card.releasePointerCapture = vi.fn();
    fireEvent.pointerDown(card, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(card, { clientX: 130, clientY: 100 });
    fireEvent.pointerMove(card, { clientX: 100, clientY: 100 });
    fireEvent.pointerUp(card, { clientX: 100, clientY: 100 });
    fireEvent.click(card, { detail: 1 });
    expect(card).toHaveAttribute("data-side", "front");
    fireEvent.pointerDown(card, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerCancel(card);
    fireEvent.click(card, { detail: 1 });
    expect(card).toHaveAttribute("data-side", "front");
    fireEvent.pointerDown(card, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerUp(card, { clientX: 101, clientY: 101 });
    fireEvent.click(card, { detail: 1 });
    completeTurn();
    expect(card).toHaveAttribute("data-side", "back");
  });

  it("shares one renderer across faces, bounds flip draws, and enables back tilt and controls", () => {
    const { container } = render(<FoilCard />);
    const start = performance.now() + 100;
    firstFrame(start);
    fireEvent.click(screen.getByRole("button", { name: /빛 움직여 보기/ }));
    firstFrame(start + 20);
    fireEvent.click(screen.getByRole("button", { name: /뒤집어서 알아보기/ }));
    renderer.draw.mockClear();
    for (let time = 40; time < 1000; time += 20) firstFrame(start + time);
    expect(renderer.draw.mock.calls.length).toBeLessThanOrEqual(2);
    expect(renderer.draw).toHaveBeenLastCalledWith(
      expect.any(Number),
      expect.any(Number),
      0.7,
      true,
      false,
    );
    expect(frames.size).toBe(0);
    expect(
      screen.getByRole("button", { name: /빛 움직여 보기/ }),
    ).toBeEnabled();
    expect(container.querySelectorAll("canvas")).toHaveLength(2);
    expect(createFoilRenderer).toHaveBeenCalledOnce();
    expect(
      container.querySelectorAll("[data-flipped] > [hidden]"),
    ).toHaveLength(1);
    renderer.draw.mockClear();
    fireEvent.keyDown(screen.getByRole("group", { name: /홀로그램 카드/ }), {
      key: "ArrowLeft",
    });
    for (let time = 1020; time <= 2020; time += 20) firstFrame(start + time);
    expect(renderer.draw).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      0.7,
      true,
      false,
    );
    fireEvent.click(screen.getByRole("button", { name: /홀로그램 켜짐/ }));
    renderer.draw.mockClear();
    fireEvent.keyDown(screen.getByRole("group", { name: /홀로그램 카드/ }), {
      key: "ArrowRight",
    });
    completeTurn();
    expect(renderer.draw).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /홀로그램 꺼짐/ }));
    fireEvent.click(screen.getByRole("button", { name: /그림으로 돌아가기/ }));
    completeTurn();
    expect(renderer.draw).toHaveBeenLastCalledWith(
      expect.any(Number),
      expect.any(Number),
      0.7,
      false,
      false,
    );
  });

  it("keeps the breed readable and disables unavailable coating controls without WebGL", () => {
    vi.mocked(createFoilRenderer).mockReturnValue(null);
    render(<FoilCard />);
    firstFrame();
    expect(
      screen.getByRole("heading", { name: "그레이트 피레니즈" }),
    ).toBeVisible();
    expect(screen.getByRole("img", { name: /전신 수채화/ })).toBeVisible();
    expect(screen.getByText(/기본 그림을 보여드려요/)).toBeVisible();
    expect(screen.getByRole("button", { name: /홀로그램/ })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /빛 움직여 보기/ }),
    ).toBeDisabled();
  });

  it("honors reduced motion while allowing a static foil comparison and frees GPU resources", () => {
    reduced = true;
    const { container, unmount } = render(<FoilCard />);
    firstFrame();
    expect(
      screen.getByRole("button", { name: /빛 움직여 보기/ }),
    ).toBeDisabled();
    const card = container.querySelector("[data-foil]") as HTMLElement;
    const transform = card.style.transform;
    fireEvent.keyDown(screen.getByRole("group", { name: /홀로그램 카드/ }), {
      key: "ArrowRight",
    });
    firstFrame();
    expect(card.style.transform).toBe(transform);
    expect(transform).toContain("rotateY(0deg)");
    const drawsBeforeOff = renderer.draw.mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: /홀로그램 켜짐/ }));
    expect(screen.getByRole("slider")).toBeDisabled();
    expect(renderer.draw).toHaveBeenCalledTimes(drawsBeforeOff);
    expect(card).toHaveAttribute("data-foil", "false");
    fireEvent.click(screen.getByRole("button", { name: /뒤집어서 알아보기/ }));
    expect(
      screen.getByRole("region", { name: "성견 크기" }),
    ).toBeInTheDocument();
    expect(card.style.transform).toContain("rotateY(0deg)");
    unmount();
    expect(renderer.dispose).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);
  });

  it("bounds GPU submissions on a 240Hz input stream and stops when settled or off", () => {
    render(<FoilCard />);
    const start = performance.now() + 100;
    firstFrame(start);
    renderer.draw.mockClear();
    const card = screen.getByRole("group", { name: /홀로그램 카드/ });
    for (let time = 5; time <= 1005; time += 4) {
      fireEvent.keyDown(card, {
        key: time % 8 === 1 ? "ArrowLeft" : "ArrowRight",
      });
      firstFrame(start + time);
    }
    expect(renderer.draw.mock.calls.length).toBeGreaterThan(10);
    expect(renderer.draw.mock.calls.length).toBeLessThanOrEqual(33);
    for (let time = 1010; time <= 2010; time += 4) firstFrame(start + time);
    expect(frames.size).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: /홀로그램 켜짐/ }));
    renderer.draw.mockClear();
    fireEvent.keyDown(card, { key: "ArrowUp" });
    for (let time = 2020; time <= 3020; time += 4) firstFrame(start + time);
    expect(renderer.draw).not.toHaveBeenCalled();
    expect(frames.size).toBe(0);
  });
});
