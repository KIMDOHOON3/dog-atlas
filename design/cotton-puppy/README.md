# Cotton puppy — cloud-volume study v3

2026-09-12. The user's newly attached character image clarified the intended cotton-candy treatment: large connected pillowy clumps surrounding a small face. Replace the v2 fine-strand coat with an original modeled cloud coat, a broad scalloped collar, compact body, small upright canine ears and tiny visible paws. All shapes are authored in Blender; the reference screenshot is not used as a texture or imported model.

- `preview-v3.png`: current 800×900 Cycles render of the actual model.
- `preview.png`, `preview-v2.png`: earlier appearance studies retained for comparison.
- `cotton-puppy.blend`: current editable Blender 4.5 model, 1,235,018 bytes.
- `cotton-puppy.glb`: current cloud-model export, 1,225,648 bytes; four mesh objects / four materials, no animation.
- Current builder: `blender --background --python design/cotton-puppy/create-cloud.py`.
- `create.py` is the earlier v2 strand-coat experiment and overwrites the same model filenames if run.

The earlier [puppy photo](https://share.google/N6mkCtk620WWIQc3c) informed the small white puppy direction. The latest user-supplied character screenshot informed the broad cloud-volume treatment. Neither image is bundled as a runtime asset. This remains a stylized mascot, not a breed-anatomy illustration.

Status: appearance preview only. The existing live yard/butterflies are unchanged. No walking rig, ball-follow behavior or runtime loader is included. Verified the Blender render and GLB structure; lint, TypeScript, 1,661 tests and 385-page build passed after the asset revision. Actual footer appearance/performance has not yet been tested for this model.
