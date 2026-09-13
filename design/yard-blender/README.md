# Seamless white courtyard — Blender source

`playground.blend` contains the slatted bench, feeding bowls, braided tug, disc and chew toy on a neutral white floor. Grass, grain on the ground, the oval outline and rim are removed. A diagonal perspective camera reveals the bench side, legs and object depth; the web camera fits desktop and mobile separately. `preview.png` is an actual Cycles render with studio lighting; the web uses a transparent shadow floor to match the white page exactly.

Run `create.py` only in this dedicated Blender workspace: it clears current objects/materials before rebuilding. The exported `public/models/yard-furniture.glb` excludes studio lights and camera. No downloaded models or textures.

## Runtime and interaction

- Ground: 80 × 80 world units, cropped to the full width and height of the footer canvas. It extends beyond the camera view rather than showing a floating model edge.
- GLB: 983,820 bytes, 11 mesh/material groups, 32,104 triangles. Current mesh/finite-vertex counts are recorded in `verification.json`.
- The browser supplies a wood map and a transparent `ShadowMaterial` floor, one lazy GLB and loading fallbacks. Grass texture generation and all 22,000/10,000 grass instances are removed. The existing 650,000-pixel cap, static shadows, visibility pauses and reduced motion remain.
- Copyright and breed-variation notices sit at the bottom of the scene, with matching warm text colors. The ball boundary reserves their measured height. Butterflies move automatically with no pause button, retaining reduced motion and offscreen pauses.
- Ball trajectory drawing, simulation and resource allocation have been removed. Drag, lift, throw, catch and keyboard activation remain.
- Camera frustum boundaries are inset to keep the ball/touch target visible. Physics clips/reflections use the current ball height; resize synchronizes both physics and interpolated display poses. Outer rectangular safety bounds stay inside the terrain.
- Furniture collision boxes retain their shared world coordinates in `src/components/yard-layout.ts`.

## Verification

Current Blender render and finite-vertex check, desktop1440/mobile320px and default viewport layout, ball drag/release with no trail and no browser errors. ESLint, TypeScript, 54 test files/1,669 tests and production build pass. Ten ball tests include elevated camera bounds and viewport narrowing. These are browser viewport checks, not physical-device performance measurements.
