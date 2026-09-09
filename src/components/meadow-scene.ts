import * as THREE from "three";
import { addMiniatureYard } from "./miniature-yard";
import { BALL_RADIUS, createPlayBall, throwVelocity } from "./play-ball";
import { createTennisBall } from "./tennis-ball";
import { addYardSpitz } from "./yard-spitz";

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
  const disposeYard = addMiniatureYard(scene, () => {
    renderer.shadowMap.needsUpdate = true;
    host.dataset.furniture = "blender";
    if (visible && !document.hidden) draw();
  });
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
  const pathPositions = new Float32Array(48 * 3);
  const pathGeometry = new THREE.BufferGeometry();
  pathGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(pathPositions, 3).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  const pathMaterial = new THREE.PointsMaterial({
    color: 0x936b43,
    size: 3,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const trajectory = new THREE.Points(pathGeometry, pathMaterial);
  trajectory.visible = false;
  trajectory.frustumCulled = false;
  scene.add(trajectory);
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
  const disposeSpitz = addYardSpitz(scene, () => {
    renderer.shadowMap.needsUpdate = true;
    host.dataset.dog = "blender";
    if (visible && !document.hidden) draw();
  });

  const ballTarget = document.createElement("button");
  ballTarget.type = "button";
  ballTarget.setAttribute("aria-label", "공 던지기");
  ballTarget.title = "천천히 밀면 굴러가고, 위로 쓸면 높이 날아가요";
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
      preview();
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
      trajectory.visible = false;
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
    offset = new THREE.Vector2(),
    pointer = new THREE.Vector2(),
    velocity = new THREE.Vector2();
  let lastMove = 0,
    moved = false,
    startY = 0,
    catchHeight = BALL_RADIUS,
    lift = 0;
  const launchIntent = () => {
    const fresh = performance.now() - lastMove < 160;
    return throwVelocity(fresh ? velocity.x : 0, fresh ? velocity.y : 0, lift);
  };
  const preview = () => {
    if (held === null || !moved) {
      trajectory.visible = false;
      return;
    }
    const v = launchIntent();
    let { x, y, z } = physics.body.position;
    let count = 0;
    // Short free-flight estimate; stop at turf, edge or bench, before any bounce.
    for (let i = 0; i < 96 && count < 48; i++) {
      const dt = 1 / 60,
        damping = Math.pow(0.52, dt);
      v.x *= damping;
      v.z *= damping;
      v.y = (v.y - 9.82 * dt) * damping;
      x += v.x * dt;
      y += v.y * dt;
      z += v.z * dt;
      if (
        y < BALL_RADIUS ||
        Math.hypot(x / 5.65, z / 2.65) > 1 ||
        (x > -4.07 && x < -0.93 && z > -2.3 && z < -0.7 && y < 1.32)
      )
        break;
      if (i % 2 === 0) {
        pathPositions[count * 3] = x;
        pathPositions[count * 3 + 1] = y;
        pathPositions[count * 3 + 2] = z;
        count++;
      }
    }
    pathGeometry.setDrawRange(0, count);
    pathGeometry.attributes.position.needsUpdate = true;
    trajectory.visible = count > 1;
  };
  const hitGround = (e: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    ray.setFromCamera(
      pointer.set(
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
    startY = e.clientY;
    lift = 0;
    catchHeight = physics.body.position.y;
    plane.constant = -catchHeight;
    ballTarget.setPointerCapture(e.pointerId);
    if (hitGround(e)) {
      lastPoint.set(point.x, point.z);
      offset.set(
        physics.body.position.x - point.x,
        physics.body.position.z - point.z,
      );
      physics.hold(
        physics.body.position.x,
        physics.body.position.z,
        catchHeight,
      );
    }
    lastMove = performance.now();
    ballTarget.dataset.held = "true";
    draw();
  };
  const drag = (e: PointerEvent) => {
    if (e.pointerId !== held || !hitGround(e)) return;
    const now = performance.now(),
      dt = Math.max(0.016, (now - lastMove) / 1000);
    const smoothing = 1 - Math.exp(-dt / 0.045);
    velocity.x += ((point.x - lastPoint.x) / dt - velocity.x) * smoothing;
    velocity.y += ((point.z - lastPoint.y) / dt - velocity.y) * smoothing;
    moved ||= Math.hypot(point.x - lastPoint.x, point.z - lastPoint.y) > 0.025;
    lift = Math.min(
      1.4,
      (Math.max(0, startY - e.clientY) / host.clientHeight) *
        (camera.top - camera.bottom) *
        0.7,
    );
    physics.hold(point.x + offset.x, point.z + offset.y, catchHeight + lift);
    lastPoint.set(point.x, point.z);
    lastMove = now;
    preview();
    draw();
  };
  const release = (e: PointerEvent) => {
    if (e.pointerId !== held) return;
    held = null;
    trajectory.visible = false;
    ballTarget.dataset.held = "false";
    if (e.type !== "pointerup") physics.cancel();
    else if (!moved) physics.launch(1, -2.5);
    else {
      const v = launchIntent();
      physics.launch(v.x, v.z, v.y);
    }
    if (ballTarget.hasPointerCapture(e.pointerId))
      ballTarget.releasePointerCapture(e.pointerId);
  };
  const keyboard = (e: MouseEvent) => {
    if (reduced.matches) return;
    if (e.detail === 0) physics.launch(1, -2.5);
  };

  const changeMode = () => {
    mobile = mobileQuery.matches;
    if (held !== null) {
      const id = held;
      held = null;
      if (ballTarget.hasPointerCapture(id))
        ballTarget.releasePointerCapture(id);
      ballTarget.dataset.held = "false";
    }
    physics.cancel();
    trajectory.visible = false;
    host.dataset.interaction = "drag";
    ballTarget.setAttribute("aria-label", "공 던지기");
    ballTarget.title = "공을 잡고 끌어 던져보세요";
    sync();
  };
  changeMode();
  mobileQuery.addEventListener("change", changeMode);
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
      mobileQuery.removeEventListener("change", changeMode);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      for (const resource of [
        shadowGeometry,
        shadowMaterial,
        pathGeometry,
        pathMaterial,
      ])
        resource.dispose();
      tennis.dispose();
      ballTarget.remove();
      disposeYard();
      disposeSpitz();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
