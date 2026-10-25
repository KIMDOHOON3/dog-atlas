import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { createPlayBall } from "./play-ball";
import { createYardItem } from "./yard-item-interaction";

describe("yard item controls", () => {
  it("lifts a toy on pickup and restores it on cancellation without throwing", () => {
    const host = document.createElement("div");
    vi.spyOn(host, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 400,
      height: 300,
    } as DOMRect);
    const camera = new THREE.OrthographicCamera(-10, 10, 7.5, -7.5, 0.1, 100);
    camera.position.set(0, 7, 13);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const physics = createPlayBall({ kind: "tug", x: 0, z: 0 });
    const item = createYardItem(
      host,
      new THREE.Scene(),
      camera,
      physics,
      "tug",
      "터그",
      { matches: false } as MediaQueryList,
      vi.fn(),
    );
    item.setModel(new THREE.Group());
    const button = host.querySelector("button")!;
    button.setPointerCapture = vi.fn();
    button.hasPointerCapture = () => true;
    button.releasePointerCapture = vi.fn();
    const pointer = (type: string) => {
      const event = new MouseEvent(type, {
        clientX: 200,
        clientY: 150,
        button: 0,
      });
      Object.defineProperty(event, "pointerId", { value: 1 });
      button.dispatchEvent(event);
    };
    pointer("pointerdown");
    expect(item.held).toBe(true);
    expect(physics.body.position.y).toBeCloseTo(physics.restHeight + 0.28);
    expect(button.dataset.held).toBe("true");
    pointer("pointercancel");
    expect(item.held).toBe(false);
    expect(button.dataset.held).toBe("false");
    expect(physics.body.position.y).toBe(physics.restHeight);
    expect(physics.body.velocity.length()).toBe(0);
    expect(button.releasePointerCapture).toHaveBeenCalledWith(1);
    physics.hold(0, 0, 2);
    pointer("pointerdown");
    expect(physics.body.position.y).toBe(2);
    item.reset();
    expect(item.held).toBe(false);
    expect(physics.body.position.y).toBe(physics.restHeight);
    item.dispose();
  });
  it("loads an independent keyboard target, resets it and cleans up", () => {
    const host = document.createElement("div"),
      scene = new THREE.Scene(),
      camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.1, 100);
    camera.position.set(0, 12, 13);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const physics = createPlayBall({ kind: "bone", x: 2, z: 2.5 });
    const item = createYardItem(
      host,
      scene,
      camera,
      physics,
      "bone",
      "뼈다귀",
      { matches: false } as MediaQueryList,
      vi.fn(),
    );
    const button = host.querySelector("button")!;
    expect(button.hidden).toBe(true);
    item.setModel(new THREE.Group());
    item.draw(500, 350);
    expect(button.hidden).toBe(false);
    expect(button.getAttribute("aria-label")).toBe("뼈다귀 던지기");
    button.dispatchEvent(new MouseEvent("click", { detail: 0 }));
    expect(physics.body.velocity.y).toBeGreaterThan(0);
    for (let i = 0; i < 15; i++) physics.step(1 / 60);
    expect(physics.body.position.z).not.toBe(2.5);
    item.reset();
    expect(physics.body.position.x).toBe(2);
    expect(physics.body.position.z).toBe(2.5);
    expect(physics.body.position.y).toBe(physics.restHeight);
    item.dispose();
    expect(host.children.length).toBe(0);
    expect(scene.children.length).toBe(0);
    button.dispatchEvent(new MouseEvent("click", { detail: 0 }));
    expect(physics.body.velocity.length()).toBe(0);
  });
  it("keeps reduced-motion items still and disables their controls", () => {
    const host = document.createElement("div"),
      scene = new THREE.Scene(),
      camera = new THREE.OrthographicCamera();
    const physics = createPlayBall({ kind: "disc" });
    const item = createYardItem(
      host,
      scene,
      camera,
      physics,
      "disc",
      "원반",
      { matches: true } as MediaQueryList,
      vi.fn(),
    );
    item.setModel(new THREE.Group());
    item.draw(500, 350);
    const button = host.querySelector("button")!;
    expect(button.disabled).toBe(true);
    button.dispatchEvent(new MouseEvent("click", { detail: 0 }));
    expect(physics.body.velocity.length()).toBe(0);
    item.dispose();
  });
});
