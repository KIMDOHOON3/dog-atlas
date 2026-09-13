import * as THREE from "three";
import { addMiniatureYard } from "./miniature-yard";
import { createPlayBall, createPlaygroundWorld } from "./play-ball";
import { createYardItem } from "./yard-item-interaction";
import { YARD_TOYS } from "./yard-layout";
import { createTennisBall } from "./tennis-ball";
import { addYardButterflies } from "./yard-butterflies";

export function createMeadow(host: HTMLDivElement) {
  const mobileQuery = matchMedia("(max-width: 767px)");
  let mobile = mobileQuery.matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.setClearColor(0xffffff, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.dataset.renderer = "three";
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 4, -4, 0.1, 120);
  camera.position.set(0, 6.5, 13);
  camera.lookAt(0, 0.25, 0);
  // Lower the fill so wood, grass and equipment retain their colour and depth.
  scene.add(new THREE.HemisphereLight(0xfffcf4, 0x819073, 1.05));
  const sun = new THREE.DirectionalLight(0xfff6e6, 2.2);
  sun.position.set(-4, 8, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -10;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.018;
  sun.shadow.radius = 3;
  scene.add(sun);
  const butterflies = addYardButterflies(scene, mobile);
  const tennis = createTennisBall();
  const environment = createPlaygroundWorld();
  const items = [
    createYardItem(
      host,
      scene,
      camera,
      createPlayBall({ x: 5.3, z: 0.9 }, environment),
      "ball",
      "공",
      reduced,
      () => {
        dirty = true;
      },
    ),
    ...YARD_TOYS.map((toy) =>
      createYardItem(
        host,
        scene,
        camera,
        createPlayBall({ kind: toy.id, x: toy.x, z: toy.z }, environment),
        toy.id,
        toy.label,
        reduced,
        () => {
          dirty = true;
        },
      ),
    ),
  ];
  let visible = false,
    disposed = false,
    frame = 0,
    last = 0,
    nextRender = 0;
  let width = host.clientWidth,
    height = host.clientHeight,
    dirty = true;

  items[0].setModel(tennis.ball);
  const draw = () => {
    for (const item of items) item.draw(width, height);
    renderer.render(scene, camera);
    dirty = false;
  };
  const yard = addMiniatureYard(scene, (models) => {
    YARD_TOYS.forEach((toy, i) => {
      const model = models.get(toy.id);
      if (model) items[i + 1].setModel(model);
    });
    renderer.shadowMap.needsUpdate = true;
    host.dataset.furniture = "blender";
    if (visible && !document.hidden) draw();
  });
  const tick = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    if (reduced.matches) {
      sync();
      return;
    }
    // Keep ball interaction at 60Hz; quiet ambient flight only needs 30Hz.
    if (now + 0.5 < nextRender) {
      frame = requestAnimationFrame(tick);
      return;
    }
    const interval =
      1000 /
      (items.some((item) => item.physics.body.sleepState !== 2 || item.held)
        ? 60
        : 30);
    nextRender = now + interval - (Math.max(0, now - nextRender) % interval);
    const dt = Math.min((now - last) / 1000, 0.05);
    const ballMoving = items.some((item) => item.physics.body.sleepState !== 2);
    environment.world.step(1 / 60, dt, 3);
    for (const item of items) item.physics.step(dt, false);
    const grassMoving = yard.updateGrass(
      dt,
      items.map((item) => {
        const { body, kind } = item.physics;
        const grounded =
          !item.held &&
          environment.world.contacts.some(
            (contact) =>
              (contact.bi === body && contact.bj === environment.floor) ||
              (contact.bj === body && contact.bi === environment.floor),
          );
        return {
          id: kind,
          x: body.position.x,
          z: body.position.z,
          vx: body.velocity.x,
          vz: body.velocity.z,
          grounded,
          radius:
            kind === "ball"
              ? 0.24
              : kind === "disc"
                ? 0.48
                : kind === "tug"
                  ? 0.4
                  : 0.32,
        };
      }),
    );
    const fluttering = butterflies.update(dt);
    last = now;
    if (
      dirty ||
      ballMoving ||
      grassMoving ||
      fluttering ||
      items.some((item) => item.held)
    )
      draw();
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (reduced.matches) {
      butterflies.rest();
      yard.resetGrass();
    }
    if (!visible || document.hidden || reduced.matches)
      for (const item of items) item.cancel();
    host.dataset.motion =
      visible && !document.hidden && !reduced.matches ? "running" : "paused";
    if (visible && !document.hidden) {
      draw();
      if (!reduced.matches) {
        last = performance.now();
        nextRender = last;
        frame = requestAnimationFrame(tick);
      }
    }
  };
  const caption = host.querySelector<HTMLElement>("[data-yard-caption]");
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    width = w;
    height = h;
    if (!w || !h) return;
    // Resolve fine edges on Retina screens without an unbounded GPU buffer.
    // The former 650k cap even undersampled a 1440px-wide desktop canvas.
    renderer.setPixelRatio(
      Math.min(
        devicePixelRatio,
        2,
        Math.sqrt((mobile ? 1400000 : 3000000) / (w * h)),
      ),
    );
    renderer.setSize(w, h);
    const captionHeight = caption?.offsetHeight ?? 0;
    const playHeight = Math.max(140, h - captionHeight - 24);
    // A low front view exposes the equipment faces while retaining the lawn top.
    camera.position.set(0, mobile ? 7.2 : 6.5, 13);
    camera.lookAt(0, 0.25, 0);
    const half = Math.max((3.8 * h) / playHeight, (9.7 * h) / w);
    camera.left = (-half * w) / h;
    camera.right = (half * w) / h;
    camera.top = half;
    camera.bottom = -half;
    yard.setViewScale(w / (camera.right - camera.left));
    camera.updateProjectionMatrix();
    // Center the oval above the footer notices.
    camera.projectionMatrix.elements[13] = captionHeight / h;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    camera.updateMatrixWorld();
    // Keep the whole ball and its touch target inside this cropped camera view.
    const safeProjection = camera.projectionMatrix.clone();
    safeProjection.elements[0] /= 1 - Math.max(0.06, 56 / w);
    // Reserve the caption below the play area, including the 48px touch target.
    const topInset = Math.max(28, h * 0.05);
    const bottomInset = Math.min(h * 0.55, (caption?.offsetHeight ?? 0) + 28);
    const verticalScale = 1 - (topInset + bottomInset) / h;
    const verticalCenter = (bottomInset - topInset) / h;
    safeProjection.elements[5] /= verticalScale;
    safeProjection.elements[13] =
      (safeProjection.elements[13] - verticalCenter) / verticalScale;
    const frustum = new THREE.Frustum().setFromProjectionMatrix(
      safeProjection.multiply(camera.matrixWorldInverse),
    );
    const bounds = frustum.planes.slice(0, 4).map(({ normal, constant }) => ({
      x: normal.x,
      y: normal.y,
      z: normal.z,
      constant,
    }));
    for (const item of items) item.physics.setViewBounds(bounds);
    if (visible) draw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  if (caption) observer.observe(caption);
  resize();
  const changeMode = () => {
    mobile = mobileQuery.matches;
    butterflies.resize(mobile);
    for (const item of items) item.cancel();
    resize();
    host.dataset.interaction = "drag";
    sync();
  };
  changeMode();
  mobileQuery.addEventListener("change", changeMode);
  const reset = () => {
    for (const item of items) item.reset();
    yard.resetGrass();
    if (visible) draw();
  };
  host.addEventListener("yard-reset", reset);
  const lost = (event: Event) => {
    event.preventDefault();
    visible = false;
    sync();
    host.dataset.renderer = "fallback";
  };

  renderer.domElement.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  return {
    setVisible(value: boolean) {
      visible = value;
      sync();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();

      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      mobileQuery.removeEventListener("change", changeMode);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      host.removeEventListener("yard-reset", reset);
      for (const item of items) item.dispose();
      tennis.dispose();
      butterflies.dispose();
      yard.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
