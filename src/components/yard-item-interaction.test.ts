import { describe, it, expect, vi } from "vitest";
import * as THREE from "three";
import { createPlayBall } from "./play-ball";
import { createYardItem } from "./yard-item-interaction";

describe("yard item controls", () => {
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
