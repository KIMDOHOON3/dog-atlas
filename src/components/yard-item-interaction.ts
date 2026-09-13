import * as THREE from "three";
import { createPlayBall, throwVelocity } from "./play-ball";

export function createYardItem(
  host: HTMLDivElement,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  physics: ReturnType<typeof createPlayBall>,
  id: string,
  label: string,
  reduced: MediaQueryList,
  invalidate: () => void,
) {
  const visual = new THREE.Group();
  scene.add(visual);
  const target = document.createElement("button");
  target.type = "button";
  target.dataset.playItem = id;
  if (id === "ball") target.dataset.ball = "true";
  target.setAttribute("aria-label", `${label} 던지기`);
  target.title = `${label}${id === "bone" || id === "tug" ? "를" : "을"} 잡고 끌어 던져보세요`;
  target.hidden = true;
  target.style.left = "0";
  target.style.top = "0";
  host.appendChild(target);
  const shadowGeometry = new THREE.CircleGeometry(
    id === "ball" ? 0.32 : 0.55,
    24,
  );
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x605d42,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.visible = false;
  scene.add(shadow);
  const projected = new THREE.Vector3(),
    ray = new THREE.Raycaster(),
    point = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    pointer = new THREE.Vector2();
  const lastPoint = new THREE.Vector2(),
    offset = new THREE.Vector2(),
    velocity = new THREE.Vector2();
  const initial = { x: physics.body.position.x, z: physics.body.position.z };
  let held: number | null = null,
    moved = false,
    startY = 0,
    lift = 0,
    catchHeight = physics.restHeight,
    lastMove = 0,
    ready = false;
  const hit = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    ray.setFromCamera(
      pointer.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        1 - ((e.clientY - r.top) / r.height) * 2,
      ),
      camera,
    );
    return ray.ray.intersectPlane(plane, point);
  };
  const cancel = () => {
    if (held === null) return;
    const id = held;
    held = null;
    physics.cancel();
    target.dataset.held = "false";
    if (target.hasPointerCapture(id)) target.releasePointerCapture(id);
    invalidate();
  };
  const abort = new AbortController(),
    signal = abort.signal;
  target.addEventListener(
    "pointerdown",
    (e) => {
      if (reduced.matches || held !== null || e.button !== 0) return;
      held = e.pointerId;
      moved = false;
      velocity.set(0, 0);
      startY = e.clientY;
      lift = 0;
      catchHeight = physics.body.position.y;
      plane.constant = -catchHeight;
      target.setPointerCapture(e.pointerId);
      if (hit(e)) {
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
      target.dataset.held = "true";
      invalidate();
    },
    { signal },
  );
  target.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerId !== held || !hit(e)) return;
      const now = performance.now(),
        dt = Math.max(0.016, (now - lastMove) / 1000),
        smoothing = 1 - Math.exp(-dt / 0.045);
      velocity.x += ((point.x - lastPoint.x) / dt - velocity.x) * smoothing;
      velocity.y += ((point.z - lastPoint.y) / dt - velocity.y) * smoothing;
      moved ||=
        Math.hypot(point.x - lastPoint.x, point.z - lastPoint.y) > 0.025;
      lift = Math.min(
        1.4,
        (Math.max(0, startY - e.clientY) / host.clientHeight) *
          (camera.top - camera.bottom) *
          0.7,
      );
      physics.hold(point.x + offset.x, point.z + offset.y, catchHeight + lift);
      lastPoint.set(point.x, point.z);
      lastMove = now;
      invalidate();
    },
    { signal },
  );
  const release = (e: PointerEvent) => {
    if (e.pointerId !== held) return;
    held = null;
    target.dataset.held = "false";
    if (e.type !== "pointerup") physics.cancel();
    else if (!moved) physics.launch(1, -2.5);
    else {
      const fresh = performance.now() - lastMove < 160,
        v = throwVelocity(fresh ? velocity.x : 0, fresh ? velocity.y : 0, lift);
      physics.launch(v.x, v.z, v.y);
    }
    if (target.hasPointerCapture(e.pointerId))
      target.releasePointerCapture(e.pointerId);
    invalidate();
  };
  for (const name of [
    "pointerup",
    "pointercancel",
    "lostpointercapture",
  ] as const)
    target.addEventListener(name, release, { signal });
  target.addEventListener(
    "click",
    (e) => {
      if (!reduced.matches && e.detail === 0) {
        physics.launch(1, -2.5);
        invalidate();
      }
    },
    { signal },
  );
  return {
    physics,
    get held() {
      return held !== null;
    },
    setModel(model: THREE.Object3D) {
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.castShadow = false;
      });
      model.updateWorldMatrix(true, false);
      visual.position.copy(model.getWorldPosition(new THREE.Vector3()));
      visual.attach(model);
      ready = true;
      shadow.visible = true;
      target.hidden = false;
      invalidate();
    },
    draw(width: number, height: number) {
      visual.position.copy(physics.body.interpolatedPosition);
      visual.quaternion.copy(physics.body.interpolatedQuaternion);
      shadow.position.set(visual.position.x + 0.04, 0.008, visual.position.z);
      shadowMaterial.opacity = 0.16 / (1 + visual.position.y);
      shadow.scale.setScalar(1 + visual.position.y * 0.3);
      projected.copy(visual.position).project(camera);
      target.style.transform = `translate3d(${(projected.x + 1) * 0.5 * width}px,${(1 - projected.y) * 0.5 * height}px,0) translate(-50%,-50%)`;
      target.disabled = reduced.matches || !ready;
    },
    cancel,
    reset() {
      cancel();
      physics.hold(initial.x, initial.z, physics.restHeight);
      physics.cancel();
      invalidate();
    },
    dispose() {
      abort.abort();
      target.remove();
      shadowGeometry.dispose();
      shadowMaterial.dispose();
      scene.remove(shadow, visual);
      // These Blender meshes were detached from the static furniture group.
      if (id !== "ball")
        visual.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : [o.material]).forEach(
              (m) => m.dispose(),
            );
          }
        });
    },
  };
}
