import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { addYardButterflies } from "./yard-butterflies";

describe("yard butterflies", () => {
  it("keeps both butterflies moving smoothly beyond the old 28-second perch cycle", () => {
    const scene = new THREE.Scene();
    const butterflies = addYardButterflies(scene, false);
    const roots = scene.getObjectByName("Bench butterflies")!.children;
    let positions = roots.map((root) => root.position.clone());
    const wingRanges = roots.map(() => ({ min: Infinity, max: -Infinity }));
    for (let frame = 0; frame < 40 * 30; frame++) {
      expect(butterflies.update(1 / 30)).toBe(true);
      roots.forEach((root, index) => {
        const distance = root.position.distanceTo(positions[index]);
        expect(distance).toBeGreaterThan(0.005);
        expect(distance).toBeLessThan(0.05);
        expect(root.position.y).toBeGreaterThan(1.65);
        const wing = root.children[0].rotation.z;
        wingRanges[index].min = Math.min(wingRanges[index].min, wing);
        wingRanges[index].max = Math.max(wingRanges[index].max, wing);
      });
      positions = roots.map((root) => root.position.clone());
    }
    wingRanges.forEach(({ min, max }) =>
      expect(max - min).toBeGreaterThan(0.8),
    );
    butterflies.dispose();
    expect(scene.children).toHaveLength(0);
  });

  it("provides a stable perched pose for reduced motion and can resume flight", () => {
    const scene = new THREE.Scene();
    const butterflies = addYardButterflies(scene, true);
    const roots = scene.getObjectByName("Bench butterflies")!.children;
    butterflies.update(12);
    butterflies.rest();
    const snapshot = roots.map((root) => root.toJSON());
    butterflies.resize(false);
    butterflies.resize(true);
    butterflies.rest();
    expect(roots.map((root) => root.toJSON())).toEqual(snapshot);
    roots.forEach((root) => expect(root.position.y).toBe(1.35));
    butterflies.update(1 / 30);
    roots.forEach((root) => expect(root.position.y).toBeGreaterThan(1.65));
    butterflies.dispose();
  });
});
