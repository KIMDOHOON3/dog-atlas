# Cotton puppy — appearance study v2

2026-09-12. The user rejected the smooth first study as unlike cotton candy. The new study shortens the trunk by 27%, buries the small ears, merges the muzzle into the coat, reduces eye/nose size and shine, and uses dense fine curved strands for a softer outline. It remains a stylized seated mascot study.

The supplied [image reference](https://share.google/N6mkCtk620WWIQc3c) ([original post](https://www.instagram.com/p/C3nEXM0rX3k/)) was viewed for proportions only and is not bundled or used as a texture. All geometry is authored in Blender through primitives, remeshing, curves and seeded coat fibres in `create.py`. No downloaded animal mesh is used.

- `preview-v2.png`: current 800×900 Cycles render of the actual model.
- `preview.png`: rejected first render, retained for comparison.
- `cotton-puppy.blend`: current editable Blender 4.5 model, 22,310,025 bytes.
- `cotton-puppy.glb`: high-detail study export, 43,305,816 bytes, four mesh objects / three materials; **not suitable for direct footer loading**. Coat geometry needs a separate web optimization pass if this appearance is selected.
- Rebuild: `blender --background --python design/cotton-puppy/create.py`.

Status: appearance preview only. The existing live yard/butterflies are unchanged. No walking rig, animation, ball-follow behavior or runtime loader is included. Verified actual Blender render and GLB structure; lint, TypeScript, 1,661 tests and 385-page build passed after the asset revision.
