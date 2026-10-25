# Interactive dog playground — Blender source

The oval lawn has a rounded ivory foundation and a quiet cafe layout. The tunnel, hurdle and weave poles were removed from the Blender source, export and collision layout at the user's request. The bench/feeding station sit at the rear left, the parasol/table/chairs at the rear right, and a short fence provides a background. Toys flank a central Three.js entrance sign.

`playground.blend` is the editable source; `create.py` rebuilds this dedicated workspace, clearing existing objects/materials. `preview.png` is a Cycles render. No downloaded models or textures are used.

## Asset and layout

- Lawn radii 9.2 × 6.1; base depth 0.5. Source GLB 1,143,420 bytes, 16 mesh objects, 38,072 triangles.

### Lossless delivery export — 2026-10-24

`yard-furniture.source.glb` preserves the original Blender export (SHA-256 `211577bb42c6fc3dbee831779d16c7b5a1db7efe2f0202314b003e6f99f29f88`). Run `pnpm assets:yard` after exporting from Blender. This generates `public/models/yard-furniture.glb` using KHR_meshopt_compression: 633,616 bytes, or 357,581 bytes with gzip (original gzip: 480,664). No vertex quantization, mesh simplification, index reordering, texture resize or material changes are performed. The script verifies all 59 decoded buffers byte for byte; the asset regression test compares geometry, materials and transforms through the real Three.js loader. The browser uses the decoder already bundled with Three.js; meshoptimizer is a pinned development-only encoder dependency. Its MIT notice is included in the software notices.
- The cream Three.js sign is at front center with dark painted lettering. A 5.6-second subtle surface brightness cycle runs on PC and mobile in the existing visible-only update loop; reduced motion uses steady brightness. No additional RAF loop or bloom pass is introduced.
- Web camera looks from the front at about 26° desktop / 28° mobile above the ground (previously 40° / 51°). Aim at height 0.25 and tighten vertical framing to show the furniture fronts while retaining the lawn top and full oval. The existing camera-derived interaction bounds follow the new view. The offline Blender preview retains its studio camera.
- `Throw_tug`, `Throw_disc`, `Throw_bone` are independent roots with local pivots. Each pickup is consolidated by material without being merged into static furniture.
- Shared world coordinates and static collision boxes are in `yard-layout.ts`. Toys sit along the near edge with separate 48px touch targets.
- Static furniture casts cached shadows; moving items use lightweight contact shadows so their starting positions do not leave baked shadows behind.

## Interaction

- Ground-contact motion drives a shared 128×96 direction/pressure texture. The four toys use different contact widths; the turf shader changes its nap/shading and readable grass blades bend in the travel direction. Pressure recovers exponentially and stops uploading/rendering after recovery. Only actual Cannon floor contacts produce marks, so airborne arcs, sleeping objects and reset jumps do not paint trails. Reset and reduced motion clear the field. This is visual grass response, not two-way soft-body physics.
- The user confirmed the preceding mobile bright-speckle fix. Keep subpixel blades disabled on small screens; grass response there uses the textured ground instead. CPU regression tests include actual rolling floor contacts, opposing directions, no airborne bridging, full recovery, reset/teleport handling and different footprint widths.
- Ball, bone, disc and tug share a single Cannon world. Shape proxies are a sphere, compound bone, shallow cylinder and compound rope loop respectively. Collisions are rigid-body approximations; cloth deformation and aerodynamic lift are not simulated.
- Per-item controls support drag/lift/throw, airborne catches, keyboard activation and pointer cancellation. The disc spins around its face. Each item uses its own resting height and edge inset.
- A reset button returns all items to their initial positions. Touch outside an item retains normal page scrolling.
- Full oval framing, footer text clearance, offscreen/hidden-tab pauses, reduced motion, lazy loading and disposal are retained. The web drawing buffer now follows device pixel ratio up to 2, capped at 1.4 million pixels on mobile and 3 million on desktop; the former 650,000-pixel limit undersampled wide desktop views.
- The earlier web exposure was 0.95 with hemisphere fill 1.05 and directional light 2.2. These runtime settings are superseded by the 2026-10-26 lighting update below; the Blender geometry/source render is unchanged.
- Restore the pre-expansion lawn texture from `8f7973f`: 42,000 grain marks, 4×2 repeats, 0.012 bump depth, natural olive/green variation and 34,000 desktop / 16,000 mobile fibres with the original height variation. Keep the white material multiplier under the current lighting.
- The exported Blender lawn has no texture coordinates. The loader now supplies planar X/Z UVs before applying the turf material; previously the colour and bump maps sampled one texel, making the lawn appear flat. The loading fallback already has UVs. Geometry, gameplay and the sharper drawing buffer remain unchanged.
- For the reported bright speckles on phone startup, individual grass blades start hidden and are enabled only when their maximum projected height reaches 1.5 CSS pixels. Smaller views keep mipmapped turf colour/bump detail without subpixel triangles. Larger views use rough Standard shading and a lower-contrast blade palette. Camera resize reevaluates detail before drawing. Regression coverage checks startup, mobile/desktop/mobile transitions and disposal; the supplied physical phone has not been retested.
- During loading or a WebGL/model failure, a static render of the complete yard remains visible with a working HTML places link. Toy controls are exposed only after all furniture is rendered.
- The timber sign is built entirely in Three.js, including lit lettering on its face, and ray-picked to open `/places`. The old Blender sign and visible HTML overlay were removed. A hidden semantic link supports keyboard/screen readers, with focus shown on the 3D board, and appears only as a WebGL fallback. Touch hit area, drag/cancel handling and cleanup are tested. A cream eight-panel parasol, round table, two chairs and partial rear fence form the cafe corner. New simplified collision boxes share the layout; the central play space stays open.

## Verification

### Homepage refinement and poster provenance — updated 2026-10-26

- `/images/yard/preview-mobile.webp` (19,360 bytes) and `/images/yard/preview-desktop.webp` (56,110 bytes) are screenshots of this project's own Three.js scene and original procedural/Blender furniture, not downloaded photographs or third-party artwork. No new external assets or licenses were introduced. The `v=2` URL refreshes cached previews after the lighting/camera change.
- Captured locally at viewport 767×1000 and 1440×1050 with reduced motion, after `data-ready=true` and `document.fonts.ready`. Hide all page UI except `footer canvas`, force a white page background, and crop around the camera's play-area center to **19.4 × 9 world units**. Encode with Sharp WebP quality 88, effort 6. Mobile SHA-256: `949a3cca821f0c80e1b91c80ce8e48aa4dec409b6ccc25b61c354ae2d29c9c85`; desktop: `c3eb0fa5ff771db0de18864192a5af9328d53a9b5309a5e03177adc8d241b0f6`.
- The responsive image uses the same orthographic scale as the live camera: `min(width / 19.4, max(140, height - captionHeight - 24) / 7.6)`. Caption height is measured before the 3D module is ready, preserving framing and layout during the handoff. Regenerate both renders if equipment, camera, lettering or lighting changes. The pictures are decorative; the places link remains accessible without WebGL.
- The sign is wider and taller on mobile, with larger dark lettering and immediate touch-press lighting. Scroll/cancel clears that feedback without navigating. The ambient glow and reduced-motion steady light are retained. Resting toys lift 0.28 world units on pickup, show a small name/ring, and keep a height-dependent ground shadow; airborne catches retain their current height.
- These images improve the loading presentation, not the GLB download time. Live geometry and renderer resolution are unchanged; the current light/turf palette is described below.

### Brighter light and manual view — 2026-10-26

- Supersedes the earlier dark exposure/turf settings: exposure 1.0, hemisphere fill 1.6, sun 2.0 and a cool front fill 0.65 that does not cast additional shadows. Turf uses a lighter green base and lower-contrast grain; texture resolution, bump detail, geometry and pixel budget are retained.
- Camera height is 5.5 on mobile / 4.9 on desktop at horizontal radius 13, aimed at y=0.25. Horizontal dragging turns the camera within ±24 degrees. No zoom, automatic orbit or inertial motion is added. The same projection updates toy hit targets, ray picking and safe visible bounds without reallocating the WebGL drawing buffer on each movement.
- Vertical gestures retain native page scrolling; toy buttons and caption controls are excluded. Pointer cancel, lost capture, a second touch, window blur, offscreen state and resize end an active orbit. Arrow buttons provide keyboard access in 10-degree steps; view reset restores the original angle. Reduced motion permits direct manual adjustment without an animation loop.
- At this lower angle, overlapping 48px toy targets route pickup to the closest projected center rather than DOM paint order. This prevents the bone from intercepting a tap on the ball after rotation.

Finite vertices, independent pickup roots and triangle/file counts are in `verification.json`. Blender render inspected. Desktop1440/mobile320px: separate bone/disc/tug drags and releases, reset, readable controls, no horizontal overflow/browser errors. ESLint, TypeScript, 60 test files/1,692 tests and production build pass. Added tests cover toy-specific settling/cancellation, spinning disc, inter-item collision, keyboard/reset/disposal and reduced motion. These are browser viewport checks, not physical-device performance measurements.
