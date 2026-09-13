import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { addYardSign } from "./yard-sign";

afterEach(() => vi.restoreAllMocks());
function setup() {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    clearRect() {},
    fillText() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
  } as unknown as CanvasRenderingContext2D);
  const scene = new THREE.Scene();
  const host = document.createElement("div");
  host.dataset.renderer = "three";
  host.innerHTML = '<a href="/places" data-yard-sign>함께 갈 곳</a>';
  const link = host.querySelector("a")!;
  const click = vi.spyOn(link, "click").mockImplementation(() => {});
  vi.spyOn(host, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width: 400,
    height: 300,
  } as DOMRect);
  const camera = new THREE.OrthographicCamera(-10, 10, 7.5, -7.5, 0.1, 100);
  camera.position.set(0, 7.2, 13);
  camera.lookAt(0, 0.25, 0);
  camera.updateMatrixWorld();
  const sign = addYardSign(scene, host, camera, vi.fn());
  sign.root.updateMatrixWorld(true);
  const p = sign.board.getWorldPosition(new THREE.Vector3()).project(camera);
  const x = (p.x + 1) * 200,
    y = (1 - p.y) * 150;
  const pointer = (type: string, dx = 0, dy = 0, pointerType = "mouse") => {
    const event = new MouseEvent(type, {
      bubbles: true,
      clientX: x + dx,
      clientY: y + dy,
      button: 0,
    });
    Object.defineProperties(event, {
      isPrimary: { value: true },
      pointerId: { value: 1 },
      pointerType: { value: pointerType },
    });
    host.dispatchEvent(event);
  };
  return { sign, scene, link, click, pointer };
}
it("navigates on the physical sign, ignores empty ground and dragging, and removes handlers", () => {
  const { sign, scene, click, pointer } = setup();
  pointer("pointerdown");
  pointer("pointerup");
  expect(click).toHaveBeenCalledOnce();
  pointer("pointerdown", 160);
  pointer("pointerup", 160);
  expect(click).toHaveBeenCalledOnce();
  pointer("pointerdown");
  pointer("pointermove", 0, 25);
  pointer("pointerup");
  expect(click).toHaveBeenCalledOnce();
  sign.dispose();
  pointer("pointerdown");
  pointer("pointerup");
  expect(click).toHaveBeenCalledOnce();
  expect(scene.children).toHaveLength(0);
});
it("supports a forgiving touch target, touch cancellation and visible 3D keyboard focus", () => {
  const { sign, link, click, pointer } = setup();
  pointer("pointerdown", 0, 14, "touch");
  pointer("pointerup", 0, 14, "touch");
  expect(click).toHaveBeenCalledOnce();
  pointer("pointerdown", 0, 0, "touch");
  pointer("pointercancel");
  pointer("pointerup");
  expect(click).toHaveBeenCalledOnce();
  link.dispatchEvent(new FocusEvent("focus"));
  expect(
    (sign.board.material as THREE.MeshStandardMaterial).emissive.getHex(),
  ).not.toBe(0);
  link.dispatchEvent(new FocusEvent("blur"));
  expect(
    (sign.board.material as THREE.MeshStandardMaterial).emissive.getHex(),
  ).toBe(0);
  sign.dispose();
});
