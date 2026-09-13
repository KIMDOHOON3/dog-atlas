# Miniature diorama — Blender source

`playground.blend` contains the slatted bench, feeding bowls, braided tug, disc and chew toy on a rounded ivory platform. Sand-colored sides and beveled edges give the base visible thickness. No grass or ground texture is used. `preview.png` is a Cycles render; the website adds the interactive tennis ball and butterflies.

Run `create.py` only in this dedicated Blender workspace: it clears current objects/materials before rebuilding. The exported `public/models/yard-furniture.glb` excludes studio lights and camera. No downloaded models or textures.

## Runtime and interaction

- Platform: 14 × 10 × 0.44 world units, centered at web X -1 / Z -0.5. The top stays at Y 0 so furniture and ball contacts remain aligned.
- GLB: 995,056 bytes, 11 Blender mesh objects, 32,328 triangles. The plinth uses two material primitives. Current finite-vertex counts are in `verification.json`.
- A transparent shadow floor below the platform blends into the white page. A simple rounded platform and bench remain available while loading.
- Perspective framing fits the complete platform and furniture above the measured footer caption on desktop and mobile. Camera inverse projection is updated for pointer dragging.
- Ball bounds are inset from the rounded platform edges (X ±5.4 / Z ±3.6); throw/catch, furniture collisions and camera clipping remain. No trajectory drawing.
- Copyright and breed-variation notices remain below the model in the same white footer. Butterflies move automatically, with offscreen pauses and reduced-motion support.
- Lazy GLB loading, the 650,000-pixel cap, static shadows and resource disposal remain. There are no grass instances.

## Verification

Blender render and finite-vertex check, desktop1440/mobile320px and default viewport layout, ball drag/release beyond the platform boundary, no browser errors. ESLint, TypeScript, 54 test files/1,669 tests and production build pass. These are browser viewport checks, not physical-device performance measurements.
