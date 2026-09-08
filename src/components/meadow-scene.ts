import * as THREE from "three";
import { addMiniatureYard } from "./miniature-yard";
import { createPlayBall } from "./play-ball";
import { createTennisBall } from "./tennis-ball";

export function createMeadow(host: HTMLDivElement) {
  const mobile = matchMedia("(max-width: 767px)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.setClearColor(0xffffff, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.dataset.renderer = "three";
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 4, -4, 0.1, 60);
  camera.position.set(0, 10, 11);
  camera.lookAt(0, 0, 0);
  const disposeYard = addMiniatureYard(scene);
  scene.add(new THREE.HemisphereLight(0xfff7df, 0xa5957a, 1.35));
  const sun = new THREE.DirectionalLight(0xffead0, 3.2);
  sun.position.set(-4, 8, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 5;
  sun.shadow.camera.bottom = -5;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.018;
  sun.shadow.radius = 3;
  scene.add(sun);
  const tennis = createTennisBall();
  const ball = tennis.ball;
  const physics = createPlayBall();
  ball.position.copy(physics.body.position);
  physics.body.quaternion.setFromEuler(0.45, 0.2, -0.35);
  scene.add(ball);
  const shadowGeometry = new THREE.CircleGeometry(0.32, 24);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x605d42,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(ball.position.x + 0.05, 0.008, 1.2);
  shadow.scale.y = 0.8;
  scene.add(shadow);
  let visible = false,
    disposed = false,
    frame = 0,
    last = 0;

  const ballTarget = document.createElement("button");
  ballTarget.type = "button";
  ballTarget.setAttribute("aria-label", "공 던지기");
  ballTarget.title = "공을 끌었다 놓아보세요";
  ballTarget.dataset.ball = "true";
  host.appendChild(ballTarget);
  const projected = new THREE.Vector3();
  const draw = () => {
    ball.position.copy(physics.body.position);
    ball.quaternion.copy(physics.body.quaternion);
    shadow.position.set(ball.position.x + 0.06, 0.008, ball.position.z);
    shadowMaterial.opacity = 0.2 / (1 + ball.position.y);
    shadow.scale.setScalar(1 + ball.position.y * 0.3);
    projected.copy(ball.position).project(camera);
    ballTarget.style.left = `${(projected.x + 1) * 0.5 * host.clientWidth}px`;
    ballTarget.style.top = `${(1 - projected.y) * 0.5 * host.clientHeight}px`;
    ballTarget.disabled = reduced.matches;
    renderer.render(scene, camera);
  };
  const tick = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    if (reduced.matches) {
      sync();
      return;
    }
    if (now - last >= 1000 / 30) {
      const dt = Math.min((now - last) / 1000, 0.05);
      physics.step(dt);

      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    ballTarget.disabled = reduced.matches;
    if ((!visible || document.hidden || reduced.matches) && held !== null) {
      const pointerId = held;
      held = null;
      physics.cancel();
      ballTarget.dataset.held = "false";
      if (ballTarget.hasPointerCapture(pointerId))
        ballTarget.releasePointerCapture(pointerId);
    }
    host.dataset.motion =
      visible && !document.hidden && !reduced.matches ? "running" : "paused";
    if (visible && !document.hidden) {
      draw();
      if (!reduced.matches) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
  };
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    renderer.setPixelRatio(
      Math.min(
        devicePixelRatio,
        mobile ? 1.25 : 1.5,
        Math.sqrt(650000 / (w * h)),
      ),
    );
    renderer.setSize(w, h);
    const half = Math.max(3.1, (6.8 * h) / w);
    camera.left = (-half * w) / h;
    camera.right = (half * w) / h;
    camera.top = half;
    camera.bottom = -half;
    physics.setWidth(5.65);
    camera.updateProjectionMatrix();
    if (visible) draw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  const ray = new THREE.Raycaster(),
    point = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let held: number | null = null;
  const lastPoint = new THREE.Vector2(),
    velocity = new THREE.Vector2();
  let lastMove = 0,
    moved = false;
  const hitGround = (e: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    ray.setFromCamera(
      new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((e.clientY - rect.top) / rect.height) * 2,
      ),
      camera,
    );
    return ray.ray.intersectPlane(plane, point);
  };
  const down = (e: PointerEvent) => {
    if (reduced.matches || held !== null || e.button !== 0) return;
    held = e.pointerId;
    moved = false;
    velocity.set(0, 0);
    ballTarget.setPointerCapture(e.pointerId);
    if (hitGround(e)) {
      lastPoint.set(point.x, point.z);
      physics.hold(point.x, point.z);
    }
    lastMove = performance.now();
    ballTarget.dataset.held = "true";
    draw();
  };
  const drag = (e: PointerEvent) => {
    if (e.pointerId !== held || !hitGround(e)) return;
    const now = performance.now(),
      dt = Math.max(0.016, (now - lastMove) / 1000);
    velocity.set((point.x - lastPoint.x) / dt, (point.z - lastPoint.y) / dt);
    moved ||= lastPoint.distanceTo(new THREE.Vector2(point.x, point.z)) > 0.04;
    physics.hold(point.x, point.z);
    lastPoint.set(point.x, point.z);
    lastMove = now;
    draw();
  };
  const release = (e: PointerEvent) => {
    if (e.pointerId !== held) return;
    held = null;
    ballTarget.dataset.held = "false";
    if (e.type !== "pointerup") physics.cancel();
    else if (!moved) physics.launch(1, -2.5);
    else
      physics.launch(
        performance.now() - lastMove < 120 ? velocity.x : 0,
        performance.now() - lastMove < 120 ? velocity.y : 0,
      );
    if (ballTarget.hasPointerCapture(e.pointerId))
      ballTarget.releasePointerCapture(e.pointerId);
  };
  const keyboard = (e: MouseEvent) => {
    if (e.detail === 0 && !reduced.matches) {
      physics.launch(1, -2.5);
    }
  };
  ballTarget.addEventListener("pointerdown", down);
  ballTarget.addEventListener("pointermove", drag);
  ballTarget.addEventListener("pointerup", release);
  ballTarget.addEventListener("pointercancel", release);
  ballTarget.addEventListener("lostpointercapture", release);
  ballTarget.addEventListener("click", keyboard);
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
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      for (const resource of [shadowGeometry, shadowMaterial])
        resource.dispose();
      tennis.dispose();
      ballTarget.remove();
      disposeYard();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
