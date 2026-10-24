import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { addMiniatureYard } from "./miniature-yard";

vi.mock("./yard-model", () => ({ loadYardModel: () => new Promise(() => {}) }));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("keeps subpixel grass out of startup/mobile frames and restores readable detail", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    fillRect() {},
    createRadialGradient: () => ({ addColorStop() {} }),
  } as unknown as CanvasRenderingContext2D);
  const scene = new THREE.Scene();
  const yard = addMiniatureYard(scene);
  const findBlades = () =>
    scene.children.find(
      (object): object is THREE.InstancedMesh =>
        object instanceof THREE.InstancedMesh,
    );
  expect(findBlades()).toBeUndefined();
  yard.setViewScale(393 / 19.4);
  expect(findBlades()).toBeUndefined();
  // Textured ground remains present even when tiny individual blades are hidden.
  expect(
    scene.children.some(
      (object) =>
        object instanceof THREE.Mesh &&
        object.visible &&
        object.material instanceof THREE.MeshStandardMaterial &&
        object.material.bumpMap !== null,
    ),
  ).toBe(true);
  yard.setViewScale(1425 / 23.4);
  const blades = findBlades()!;
  expect(blades.visible).toBe(true);
  yard.setViewScale(320 / 19.4);
  expect(blades.visible).toBe(false);
  yard.setViewScale(1425 / 23.4);
  expect(findBlades()).toBe(blades);
  const dispose = vi.spyOn(blades.geometry, "dispose");
  yard.dispose();
  expect(dispose).toHaveBeenCalledOnce();
});
