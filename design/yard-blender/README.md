# Interactive dog playground — Blender source

The oval lawn has a deeper rounded ivory foundation and three pieces of dog-agility equipment: an open-ended tunnel, a low striped hurdle and three weave poles. The bench and feeding station remain at the back, with a clear central play area.

`playground.blend` is the editable source; `create.py` rebuilds this dedicated workspace, clearing existing objects/materials. `preview.png` is a Cycles render. No downloaded models or textures are used.

## Asset and layout

- Lawn radii 9.2 × 6.1; base depth 0.5. GLB 1,358,240 bytes, 17 mesh objects, 47,264 triangles.
- `Throw_tug`, `Throw_disc`, `Throw_bone` are independent roots with local pivots. Each pickup is consolidated by material without being merged into static furniture.
- Shared world coordinates and static collision boxes are in `yard-layout.ts`. Toys sit along the near edge with separate 48px touch targets.
- Static furniture casts cached shadows; moving items use lightweight contact shadows so their starting positions do not leave baked shadows behind.

## Interaction

- Ball, bone, disc and tug share a single Cannon world. Shape proxies are a sphere, compound bone, shallow cylinder and compound rope loop respectively. Collisions are rigid-body approximations; cloth deformation and aerodynamic lift are not simulated.
- Per-item controls support drag/lift/throw, airborne catches, keyboard activation and pointer cancellation. The disc spins around its face. Each item uses its own resting height and edge inset.
- A reset button returns all items to their initial positions. Touch outside an item retains normal page scrolling.
- Full oval framing, footer text clearance, offscreen/hidden-tab pauses, reduced motion, lazy loading and disposal are retained. The web drawing buffer now follows device pixel ratio up to 2, capped at 1.4 million pixels on mobile and 3 million on desktop; the former 650,000-pixel limit undersampled wide desktop views.
- Web exposure is 0.95 with hemisphere fill 1.05 and directional light 2.2, retaining colour and shaded volume instead of the previous washed-out fill. This is a runtime lighting adjustment; the Blender geometry/source render is unchanged.
- The web lawn texture uses green `#518744` with matching green grain and `#60944d` fibres. This replaces the desaturated olive palette; runtime material overrides apply to the loaded Blender lawn and the loading fallback alike.
- Static load failure retains the fallback bench, lawn and playable ball; additional toy controls become available once their Blender models load.
- Playground-directory navigation has no specified destination yet; this change adds the scene and interaction only.

## Verification

Finite vertices, independent pickup roots and triangle/file counts are in `verification.json`. Blender render inspected. Desktop1440/mobile320px: separate bone/disc/tug drags and releases, reset, readable controls, no horizontal overflow/browser errors. ESLint, TypeScript, 55 test files/1,675 tests and production build pass. Added tests cover toy-specific settling/cancellation, spinning disc, inter-item collision, keyboard/reset/disposal and reduced motion. These are browser viewport checks, not physical-device performance measurements.
