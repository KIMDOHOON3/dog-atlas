# Blender playground furniture

Original bench, braided cotton tug, paired ceramic bowls on a silicone mat, terracotta flying disc, and sage bone-shaped chew toy. Built in Blender 4.5 with `create.py`; editable source: `playground.blend`. No third-party models or textures.

Export: `public/models/yard-furniture.glb` — 949,424 bytes, ten material groups. The browser applies procedural wood grain and lazily loads the single GLB with the footer. Static shadows refresh once after loading. The procedural bench remains as the loading/error fallback. Resources are disposed on unmount; props add no animation loop.

The lawn radii are now 8 × 4.3 world units (previously 6 × 3), approximately 1.91 times the area. The desktop canvas grows from a 1,100px maximum width / 350px height to 1,360px / up to 510px. Responsive camera framing keeps the oval within 320px and wider screens. The bench sits toward the rear and the center stays open for the ball.

`src/components/yard-layout.ts` shares lawn bounds and simple static box colliders between ball physics and trajectory previews. Props are decorative; the tennis ball remains draggable and throwable. Colliders approximate each prop's footprint rather than its detailed surface. Grass instance counts, pixel budget, offscreen pause and reduced-motion behavior are retained.

Verified: lint, TypeScript, 1,661 tests, 385-page production build; local desktop and 390/320px framing, ball dragging and no browser errors. Automated physics checks cover the enlarged edge and rebound from the feeding station. Mobile viewport checks are browser emulation, not physical-device performance measurements.
