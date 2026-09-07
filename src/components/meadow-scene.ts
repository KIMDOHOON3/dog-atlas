import * as THREE from "three";
import { createPlayBall, BALL_RADIUS } from "./play-ball";

export function createMeadow(host: HTMLDivElement) {
  const mobile = matchMedia("(max-width: 767px)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0xffffff, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.dataset.renderer = "three";
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 4, -4, 0.1, 60);
  camera.position.set(0, 7, 11);
  camera.lookAt(0, 0, 0);
  const uniforms = {
    time: { value: 0 },
    pressure: { value: 0 },
    pointer: { value: new THREE.Vector2(100, 100) },
  };
  const geometry = new THREE.PlaneGeometry(0.045, 0.12, 1, 1);
  geometry.translate(0, 0.06, 0);
  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.DoubleSide,
    vertexShader: `
      uniform float time; uniform float pressure; uniform vec2 pointer;
      varying float tip; varying float variation;
      void main() {
        vec3 p = position; tip = uv.y;
        p.x *= 1.0 - uv.y * .96;
        vec4 world = instanceMatrix * vec4(p, 1.0);
        vec2 root = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
        float wave = sin(time * 1.1 + root.x * .65 + root.y * .5);
        vec2 away = root - pointer;
        float press = exp(-dot(away, away) * .8) * pressure;
        world.x += (wave * .018 + press * away.x * .08) * tip * tip;
        world.z += (.01 * sin(time + root.x) + press * away.y * .08) * tip * tip;
        world.y -= press * .025 * tip;
        variation = fract(sin(dot(root, vec2(12.9898,78.233))) * 43758.5453);
        gl_Position = projectionMatrix * modelViewMatrix * world;
      }`,
    fragmentShader: `
      varying float tip; varying float variation;
      void main() {
        vec3 base = mix(vec3(.25,.30,.13),vec3(.48,.49,.25),variation);
        vec3 col = mix(base,vec3(.65,.68,.42),tip*.65);
        gl_FragColor = vec4(col,1.0);
        #include <colorspace_fragment>
      }`,
  });
  const count = mobile ? 4500 : 12000;
  const grass = new THREE.InstancedMesh(geometry, material, count);
  grass.frustumCulled = false;
  let seed = 27;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    let x = 0,
      z = 0;
    x = (rand() - 0.5) * (mobile ? 12 : 42);
    z = rand() * 14 - 3.5;
    dummy.position.set(x, 0, z);
    dummy.rotation.y = rand() * Math.PI;
    dummy.scale.setScalar(0.8 + rand() * 0.25);
    dummy.updateMatrix();
    grass.setMatrixAt(i, dummy.matrix);
  }
  scene.add(grass);
  const groundGeometry = new THREE.PlaneGeometry(100, 16);
  const groundMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 v; void main(){
      float x=(v.x-.5)*100.; float z=(.5-v.y)*16.+4.;
      float stripe=step(.5,fract((x+30.)/3.));
      float noise=fract(sin(dot(v,vec2(1383.,497.)))*43758.54);
      vec3 color=mix(vec3(.42,.51,.28),vec3(.48,.56,.33),stripe)+noise*.018;
      float sideline=1.-smoothstep(.035,.07,abs(abs(z-.2)-2.7));
      float middle=1.-smoothstep(.035,.07,abs(x));
      float ring=1.-smoothstep(.035,.07,abs(length(vec2(x,z-.2))-1.2));
      float marking=max(sideline,max(middle,ring));
      color=mix(color,vec3(.92,.91,.81),marking*.8);
      float fade=smoothstep(0.,.10,1.-v.y);
      gl_FragColor=vec4(color,fade);
      #include <colorspace_fragment>
    }`,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.015, 4);
  scene.add(ground);
  scene.add(new THREE.HemisphereLight(0xfff7df, 0x8b825b, 2.2));
  const sun = new THREE.DirectionalLight(0xffead0, 2);
  sun.position.set(-4, 8, 6);
  scene.add(sun);
  const ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 32, 20);
  const ballMaterial = new THREE.MeshStandardMaterial({
    color: 0xc79656,
    roughness: 1,
  });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  const physics = createPlayBall();
  ball.position.copy(physics.body.position);
  ball.rotation.z = 0.45;
  scene.add(ball);
  const seamGeometry = new THREE.TorusGeometry(
    BALL_RADIUS + 0.002,
    0.012,
    6,
    64,
  );
  const seamMaterial = new THREE.MeshStandardMaterial({
    color: 0xeee0c6,
    roughness: 1,
  });
  const seam = new THREE.Mesh(seamGeometry, seamMaterial);
  ball.add(seam);
  const seam2 = seam.clone();
  seam2.rotation.y = Math.PI / 2;
  ball.add(seam2);
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
  let hovering = false;
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
      uniforms.time.value += dt;
      last = now;
      uniforms.pressure.value +=
        ((hovering ? 1 : 0) - uniforms.pressure.value) * 0.15;
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
    const half = 3;
    camera.left = (-half * w) / h;
    camera.right = (half * w) / h;
    camera.top = half;
    camera.bottom = -half;
    physics.setWidth(Math.min(10, camera.right - 0.65));
    camera.updateProjectionMatrix();
    if (visible) draw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  const ray = new THREE.Raycaster(),
    point = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || reduced.matches) return;
    hovering = true;
    const rect = host.getBoundingClientRect();
    ray.setFromCamera(
      new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((event.clientY - rect.top) / rect.height) * 2,
      ),
      camera,
    );
    if (ray.ray.intersectPlane(plane, point))
      uniforms.pointer.value.set(point.x, point.z);
  };
  const leave = () => {
    hovering = false;
  };
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
    if (e.detail === 0 && !reduced.matches) physics.launch(1, -2.5);
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
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerleave", leave);
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
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      for (const resource of [
        geometry,
        material,
        groundGeometry,
        groundMaterial,
        ballGeometry,
        ballMaterial,
        seamGeometry,
        seamMaterial,
        shadowGeometry,
        shadowMaterial,
      ])
        resource.dispose();
      ballTarget.remove();
      grass.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
