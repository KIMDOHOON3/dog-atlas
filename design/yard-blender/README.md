# Interactive dog playground — Blender source

The oval lawn has a rounded ivory foundation, a low striped hurdle and three weave poles. The large tunnel was removed from the Blender source, export and collision layout at the user's request. The bench and feeding station remain at the back, with an open central play area.

`playground.blend` is the editable source; `create.py` rebuilds this dedicated workspace, clearing existing objects/materials. `preview.png` is a Cycles render. No downloaded models or textures are used.

## Asset and layout

- Lawn radii 9.2 × 6.1; base depth 0.5. GLB 1,330,920 bytes, 18 mesh objects, 41,084 triangles.
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
- Web exposure is 0.95 with hemisphere fill 1.05 and directional light 2.2, retaining colour and shaded volume instead of the previous washed-out fill. This is a runtime lighting adjustment; the Blender geometry/source render is unchanged.
- Restore the pre-expansion lawn texture from `8f7973f`: 42,000 grain marks, 4×2 repeats, 0.012 bump depth, natural olive/green variation and 34,000 desktop / 16,000 mobile fibres with the original height variation. Keep the white material multiplier under the current lighting.
- The exported Blender lawn has no texture coordinates. The loader now supplies planar X/Z UVs before applying the turf material; previously the colour and bump maps sampled one texel, making the lawn appear flat. The loading fallback already has UVs. Geometry, gameplay and the sharper drawing buffer remain unchanged.
- For the reported bright speckles on phone startup, individual grass blades start hidden and are enabled only when their maximum projected height reaches 1.5 CSS pixels. Smaller views keep mipmapped turf colour/bump detail without subpixel triangles. Larger views use rough Standard shading and a lower-contrast blade palette. Camera resize reevaluates detail before drawing. Regression coverage checks startup, mobile/desktop/mobile transitions and disposal; the supplied physical phone has not been retested.
- Static load failure retains the fallback bench, lawn and playable ball; additional toy controls become available once their Blender models load.
- The timber sign is built entirely in Three.js, including lit lettering on its face, and ray-picked to open `/places`. The old Blender sign and visible HTML overlay were removed. A hidden semantic link supports keyboard/screen readers, with focus shown on the 3D board, and appears only as a WebGL fallback. Touch hit area, drag/cancel handling and cleanup are tested. A cream eight-panel parasol, round table, two chairs and partial rear fence form the cafe corner. New simplified collision boxes share the layout; the central play space stays open.

## Verification

Finite vertices, independent pickup roots and triangle/file counts are in `verification.json`. Blender render inspected. Desktop1440/mobile320px: separate bone/disc/tug drags and releases, reset, readable controls, no horizontal overflow/browser errors. ESLint, TypeScript, 60 test files/1,692 tests and production build pass. Added tests cover toy-specific settling/cancellation, spinning disc, inter-item collision, keyboard/reset/disposal and reduced motion. These are browser viewport checks, not physical-device performance measurements.
