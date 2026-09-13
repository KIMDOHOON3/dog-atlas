import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/** A physical timber sign: lettering shares the scene's lighting and projection. */
export function addYardSign(
  scene: THREE.Scene,
  host: HTMLDivElement,
  camera: THREE.OrthographicCamera,
  invalidate: () => void,
) {
  const root = new THREE.Group();
  root.name = "Pet place timber sign";
  root.position.set(-6.6, 0, -2.6);
  root.rotation.y = 0.12;
  scene.add(root);
  const wood = new THREE.MeshStandardMaterial({
    color: 0x996033,
    roughness: 0.88,
  });
  const endGrain = new THREE.MeshStandardMaterial({
    color: 0x6b422a,
    roughness: 0.94,
  });
  const brass = new THREE.MeshStandardMaterial({
    color: 0x695340,
    roughness: 0.6,
    metalness: 0.35,
  });
  const box = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
  ) => {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 2, 0.025),
      material,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };
  for (const x of [-0.84, 0.84]) box(0.13, 1.6, 0.15, x, 0.8, -0.06, endGrain);
  const board = box(2.55, 0.94, 0.19, 0, 1.52, 0, wood);
  box(2.65, 0.08, 0.25, 0, 2.02, 0, endGrain);
  for (const x of [-1.14, 1.14])
    for (const y of [1.19, 1.85]) {
      const screw = new THREE.Mesh(
        new THREE.SphereGeometry(0.027, 8, 6),
        brass,
      );
      screw.position.set(x, y, 0.099);
      screw.scale.z = 0.35;
      root.add(screw);
    }
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 384;
  const context = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const paint = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    roughness: 0.92,
    depthWrite: false,
  });
  const lettering = new THREE.Mesh(new THREE.PlaneGeometry(2.36, 0.84), paint);
  lettering.name = "Painted Korean lettering";
  lettering.position.set(0, 1.52, 0.097);
  root.add(lettering);
  let disposed = false;
  const drawLetters = () => {
    context.clearRect(0, 0, 1024, 384);
    context.fillStyle = "#fff2d6";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '700 166px Arial, "Malgun Gothic", sans-serif';
    context.fillText("함께 갈 곳", 460, 192);
    context.strokeStyle = "#fff2d6";
    context.lineWidth = 16;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(885, 245);
    context.lineTo(960, 155);
    context.moveTo(895, 155);
    context.lineTo(960, 155);
    context.lineTo(960, 220);
    context.stroke();
    texture.needsUpdate = true;
  };
  drawLetters();
  void document.fonts?.ready.then(() => {
    if (!disposed) {
      drawLetters();
      invalidate();
    }
  });

  // Semantic navigation is retained for keyboard/screen-reader users only.
  const link = host.querySelector<HTMLAnchorElement>("[data-yard-sign]");
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const touchTarget = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 0.22),
    new THREE.MeshBasicMaterial(),
  );
  touchTarget.position.copy(board.position);
  touchTarget.visible = false;
  root.add(touchTarget);
  const hit = (event: PointerEvent) => {
    if (
      host.dataset.renderer !== "three" ||
      (event.target instanceof Element && event.target.closest("button,a"))
    )
      return false;
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((event.clientY - rect.top) / rect.height) * 2,
    );
    const pixelsPerUnit = rect.width / (camera.right - camera.left);
    touchTarget.scale.set(
      Math.max(2.55, 44 / pixelsPerUnit),
      Math.max(0.94, 50 / pixelsPerUnit),
      1,
    );
    root.updateMatrixWorld(true);
    ray.setFromCamera(pointer, camera);
    return (
      ray.intersectObject(event.pointerType === "touch" ? touchTarget : board)
        .length > 0
    );
  };
  let focused = false,
    hovered = false;
  const highlight = () => {
    wood.emissive.setHex(focused ? 0x604522 : hovered ? 0x251608 : 0);
    invalidate();
  };
  let press: { x: number; y: number; id: number } | null = null;
  const controller = new AbortController();
  const options = { signal: controller.signal };
  host.addEventListener(
    "pointerdown",
    (event) => {
      press =
        event.isPrimary && event.button === 0 && hit(event)
          ? { x: event.clientX, y: event.clientY, id: event.pointerId }
          : null;
    },
    options,
  );
  host.addEventListener(
    "pointermove",
    (event) => {
      if (
        press &&
        Math.hypot(event.clientX - press.x, event.clientY - press.y) > 8
      )
        press = null;
      if (event.pointerType === "touch") return;
      const next = hit(event);
      if (next !== hovered) {
        hovered = next;
        host.style.cursor = next ? "pointer" : "";
        highlight();
      }
    },
    options,
  );
  host.addEventListener(
    "pointerup",
    (event) => {
      const activate =
        press?.id === event.pointerId &&
        Math.hypot(event.clientX - press.x, event.clientY - press.y) <= 8 &&
        hit(event);
      press = null;
      if (activate) link?.click();
    },
    options,
  );
  host.addEventListener(
    "pointercancel",
    () => {
      press = null;
    },
    options,
  );
  host.addEventListener(
    "pointerleave",
    () => {
      press = null;
      hovered = false;
      host.style.cursor = "";
      highlight();
    },
    options,
  );
  link?.addEventListener(
    "focus",
    () => {
      focused = true;
      highlight();
    },
    options,
  );
  link?.addEventListener(
    "blur",
    () => {
      focused = false;
      highlight();
    },
    options,
  );
  return {
    root,
    board,
    dispose() {
      disposed = true;
      controller.abort();
      host.style.cursor = "";
      scene.remove(root);
      const geometries = new Set<THREE.BufferGeometry>();
      root.traverse((o) => {
        if (o instanceof THREE.Mesh) geometries.add(o.geometry);
      });
      geometries.forEach((g) => g.dispose());
      [wood, endGrain, brass, paint, touchTarget.material].forEach((m) =>
        m.dispose(),
      );
      texture.dispose();
    },
  };
}
