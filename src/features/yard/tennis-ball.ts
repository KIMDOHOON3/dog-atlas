import * as THREE from "three";
import { BALL_RADIUS } from "./play-ball";

export function createTennisBall() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const pixels = ctx.createImageData(512, 256);
  let seed = 83;
  for (let y = 0; y < 256; y++)
    for (let x = 0; x < 512; x++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const grain = (seed / 4294967296 - 0.5) * 22;
      const wear =
        Math.max(0, Math.sin(x * 0.027) * Math.cos(y * 0.04) - 0.35) * 22;
      const i = (y * 512 + x) * 4;
      pixels.data[i] = 179 + grain - wear;
      pixels.data[i + 1] = 182 + grain - wear;
      pixels.data[i + 2] = 77 + grain - wear * 0.5;
      pixels.data[i + 3] = 255;
    }
  ctx.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.004,
    roughness: 1,
    sheen: 0.65,
    sheenColor: 0xd4d29c,
    sheenRoughness: 1,
  });
  const geometry = new THREE.SphereGeometry(BALL_RADIUS, 48, 32);
  const ball = new THREE.Mesh(geometry, material);
  class Seam extends THREE.Curve<THREE.Vector3> {
    constructor() { super(); }
    getPoint(t: number, target = new THREE.Vector3()) {
      const angle = t * Math.PI * 2,
        latitude = 0.68 * Math.sin(angle * 2);
      return target
        .set(
          Math.cos(angle) * Math.cos(latitude),
          Math.sin(latitude),
          Math.sin(angle) * Math.cos(latitude),
        )
        .multiplyScalar(BALL_RADIUS + 0.001);
    }
  }
  const seamGeometry = new THREE.TubeGeometry(new Seam(), 160, 0.01, 6, true);
  const seamMaterial = new THREE.MeshStandardMaterial({
    color: 0xeee6c7,
    roughness: 1,
  });
  ball.add(new THREE.Mesh(seamGeometry, seamMaterial));
  return {
    ball,
    dispose() {
      geometry.dispose();
      material.dispose();
      texture.dispose();
      seamGeometry.dispose();
      seamMaterial.dispose();
    },
  };
}
