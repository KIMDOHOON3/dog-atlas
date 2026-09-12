# Cotton puppy — woolly-body study v4

2026-09-12. The user explicitly clarified and confirmed the direction: **a sheep-like, rounded woolly body with a small baby-dog face, ears and short visible paws**. Treat the sheep-like impression as intentional. This version replaces the tall stacked collar/body silhouette with one low oval body, uneven overlapping wool lobes, a smaller collar, short muzzle, wider puppy cheeks, larger eyes and compact paws. It is a stylized hybrid mascot, not a realistic breed model.

- `preview-v4.png`: current 900×900 Cycles render of the actual model.
- `preview.png`, `preview-v2.png`, `preview-v3.png`: earlier studies retained for comparison.
- `cotton-puppy.blend`: current editable Blender 4.5 model, 1,112,089 bytes.
- `cotton-puppy.glb`: current model, 1,115,148 bytes; four mesh objects / four materials, no animation.
- Current builder: `blender --background --python design/cotton-puppy/create-cloud.py`.
- `create.py` is the earlier v2 strand-coat experiment and overwrites the model filenames if run.

The user's real puppy photo informed the facial direction, and the supplied character screenshot informed the large clumped wool treatment. All mesh geometry and materials are authored in Blender; no reference image or downloaded animal mesh is bundled as a runtime asset.

Status: v4 appearance study ready for review. Existing live yard/butterflies remain unchanged. No walking rig, ball-follow behavior or runtime loader is included. Verified Blender rendering and GLB structure; lint, TypeScript, 1,661 tests and 385-page build passed after the asset revision. Actual footer framing/performance has not been tested for this model.
