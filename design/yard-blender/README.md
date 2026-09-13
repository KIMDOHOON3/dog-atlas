# Full-width playground — Blender source

`playground.blend` contains the existing slatted bench, feeding bowls, braided tug, disc and chew toy on continuous rectangular turf. The oval outline and rim are removed. A lower diagonal perspective camera makes the bench side, legs and object depth visible; the web camera fits desktop and mobile separately. `preview.png` is an actual Cycles render.

Run `create.py` only in this dedicated Blender workspace: it clears current objects/materials before rebuilding. The exported `public/models/yard-furniture.glb` excludes studio lights and camera. No downloaded models or textures.

## Runtime and interaction

- Ground: 80 × 80 world units, cropped to the full width and height of the footer canvas. It extends beyond the camera view rather than showing a floating model edge.
- GLB: 983,924 bytes, 11 mesh/material groups, 32,104 triangles. Reimport and finite-vertex checks are recorded in `verification.json`.
- The browser supplies low-contrast grass and wood maps, 22,000/10,000 grass instances, one lazy GLB and loading fallbacks. The existing 650,000-pixel cap, static shadows, visibility pauses and reduced motion remain.
- Ball trajectory drawing, simulation and resource allocation have been removed. Drag, lift, throw, catch and keyboard activation remain.
- Camera frustum boundaries are inset to keep the ball/touch target visible. Physics clips/reflections use the current ball height; resize synchronizes both physics and interpolated display poses. Outer rectangular safety bounds stay inside the terrain.
- Furniture collision boxes retain their shared world coordinates in `src/components/yard-layout.ts`.

## Verification

Blender reimport and render, desktop1440/mobile390/320px layout, ball drag/release with no trail, viewport clipping and no horizontal overflow/browser errors. ESLint, TypeScript, 54 test files/1,669 tests and production build pass. Ten ball tests include elevated camera bounds and viewport narrowing. These are browser viewport checks, not physical-device performance measurements.
