# Open playground — Blender source

The editable `playground.blend` contains a broad lawn with a thin softened edge, a slatted wood bench with metal supports/bolts, braided cotton tug, ceramic feeding bowls and kibble, water, a rolled-rim flying disc and a rounded chew toy. Objects share one rear corner, leaving the center open. No downloaded models or textures.

Run `create.py` in this dedicated Blender workspace to rebuild it. It clears current scene objects/materials and is not an import tool for unrelated open projects. It exports `public/models/yard-furniture.glb` before adding studio lights and an orthographic camera. `preview.png` is an actual Cycles render. Blender procedural grain is for close inspection; the browser supplies low-contrast turf/wood maps and short grass instances.

## Dimensions and runtime

- Lawn radii: 9.2 × 6.1, up 63.14% in area from 8 × 4.3. Edge depth is about 0.08 world units.
- Export: 1,004,476 bytes, 12 mesh/material groups, 34,476 triangles; no external textures. Reimported with finite vertices verified in `verification.json`.
- Furniture positions agree with `src/components/yard-layout.ts`, used by ball collisions and trajectory previews. Collisions approximate footprints, not detailed mesh surfaces.
- Desktop canvas maximum 1,520px × 650px; mobile uses a higher camera angle. Ball retains its 48px interaction target. Reduced-motion and visibility handling are preserved.
- One lazy GLB; procedural lawn/bench remain on loading failure. Grass uses 22,000 desktop / 10,000 mobile instances, excludes furniture footprints and retains the 650,000-pixel budget. Shadows update on load. Paw stamps were removed.

## Verification

Blender export reimport, actual Cycles preview, desktop 1440px and mobile 390/320px visual checks, no horizontal overflow or browser errors, ball dragging and butterfly pause checked. ESLint and TypeScript pass. Full Vitest run: 1,666 passed and one unrelated readiness UI timeout; that file's five tests passed on isolated rerun. All eight ball tests pass, including the relocated feeding station. Production build passes. Viewport checks are not physical iPhone performance measurements.
