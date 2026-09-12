# Footer golden retriever — 2026-09-12

User selected the downloaded golden retriever for optimized footer placement.

- Creator: iRahulRajput (@rt699448).
- Source: https://sketchfab.com/3d-models/golden-retriever-dog-3d-model-free-4d32f856099c4baca05da2da485c24c1
- License: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ (verified on the model page).
- Source page marks the asset as AI generated. This decorative model is not reviewed breed anatomy.
- Original user archive: `golden-retriever-dog-3d-model-free.zip`; source GLB 31,105,600 bytes. Original remains in the user's Downloads; temporary working copy is ignored under `tmp/golden/`.
- Published file: `public/models/yard-golden-retriever.glb`, 2,193,100 bytes.
- Mesh: 701,574 → 44,878 triangles, 43,377 vertices; UV-aware meshoptimizer simplification with reported error 0.001119. Four embedded JPEG textures resized to at most 1024×1024, quality 88. Geometry normals and source materials retained.
- No skeleton or animation exists in the source. Display the original standing pose; do not apply the former spitz follower to an unrigged mesh.
- Source attribution, license link and modification notice appear in the footer and GLB asset metadata.

## Reproduction

`node scripts/optimize-yard-golden.mjs <original.glb>` writes the published asset. The script uses local meshoptimizer 1.1.1 and sharp 0.34.5 packages from the pnpm store; these are offline asset-processing tools, not additions to the application bundle. It intentionally accepts this source's packed float attributes and unsigned 32-bit indices rather than acting as a general glTF optimizer.

## Runtime and verification

The existing footer intersection observer loads the model only on entering the footer. Normalize height to 1.65 scene units and place the lowest point on the grass. Shadow is baked by the existing one-shot shadow refresh. No animation or continuous dog update. Geometry, materials, textures and ImageBitmap images are released, including late completion after disposal.

PC and 390px/320px browser checks: visible textured model, grounded placement, source links, no horizontal overflow at 320px, working ball click and no logged browser errors. Existing reduced-motion and offscreen scene gates retained by inspection; no new real-device FPS measurement. Lint, typecheck, all 1,661 tests and 385-page production build pass. Existing unrelated Next Image quality warning appears during tests.
