export function createSpitzFollow() {
  const state = { x: 1.55, z: -0.45, yaw: -0.85, speed: 0, phase: 0 };
  return {
    state,
    step(dt: number, ball: { x: number; z: number }) {
      dt = Math.min(0.05, Math.max(0, dt));
      let tx = ball.x,
        tz = ball.z;
      const edge = Math.hypot(tx / 4.8, tz / 1.85);
      if (edge > 1) {
        tx /= edge;
        tz /= edge;
      }
      // The space behind the bench is too narrow for the dog; approach its front.
      if (tx < -0.6 && tz < -0.25) tz = -0.25;
      let dx = tx - state.x,
        dz = tz - state.z;
      const distance = Math.hypot(dx, dz);
      const desired = Math.min(2.3, Math.max(0, distance - 0.9) * 2);
      state.speed += (desired - state.speed) * (1 - Math.exp(-dt * 6));
      const move = Math.min(state.speed * dt, Math.max(0, distance - 0.85));
      if (distance > 0.01) {
        const angle = Math.atan2(dx, dz);
        const delta = Math.atan2(
          Math.sin(angle - state.yaw),
          Math.cos(angle - state.yaw),
        );
        state.yaw += delta * (1 - Math.exp(-dt * 8));
        dx /= distance;
        dz /= distance;
        state.x += dx * move;
        state.z += dz * move;
        if (state.x < -0.6 && state.z < -0.25) state.z = -0.25;
        state.phase += move * 11;
      }
      return state;
    },
  };
}
