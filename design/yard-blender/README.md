# Restored oval playground — Blender source

The user preferred the earlier oval lawn to the rectangular diorama. `playground.blend`, `create.py`, `preview.png`, the GLB and geometry verification are restored from a6556e5. The bench, feeding bowls, braided tug, disc and chew toy retain their earlier arrangement. Blender is open on the restored file.

Run `create.py` only in this dedicated workspace: it clears scene objects and materials before rebuilding. No downloaded models or textures.

## Runtime

- Lawn radii: 9.2 × 6.1, with a low thin rim. GLB: 1,004,476 bytes, 12 mesh groups, 34,476 triangles.
- Original orthographic viewing angles restored for desktop/mobile; framing reserves the current footer caption height.
- Low-contrast grass texture and 22,000/10,000 short grass instances restored.
- Ball stays within an inset ellipse as well as the visible camera bounds. Diagonal throws are covered by the updated boundary test.
- Recent ball trajectory removal and butterfly button removal remain. Butterflies continue automatically, with reduced motion and visibility pauses.
- Footer copyright and breed-variation text remain below the oval within the footer scene container.
- Lazy loading, fallback furniture, static shadows and the 650,000-pixel cap remain.

## Verification

Original asset verification is preserved in `verification.json`. Restored visuals checked at desktop1440/mobile320px and default viewport; ball drag/release and no browser errors. ESLint, TypeScript, 54 test files/1,669 tests and production build pass.
