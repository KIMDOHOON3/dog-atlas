# Cotton puppy — appearance study

2026-09-12. The user reopened the puppy idea after removing the previous adult dog experiments, asked for a cotton-candy round shape, then shared [this image reference](https://share.google/N6mkCtk620WWIQc3c) ([original post](https://www.instagram.com/p/C3nEXM0rX3k/)). The image was viewed for broad proportions only and is not bundled or used as a texture.

This first seated appearance study has a round head, short muzzle, small ears, bead-like eyes, broad seated haunches and a fluffy curled tail. All geometry is authored from Blender primitives, remeshing, curves and seeded short coat fibres in `create.py`. No downloaded animal mesh is used. It is a stylized mascot concept, not an anatomical breed illustration.

- `cotton-puppy.blend`: editable Blender 4.5 model, 4,884,523 bytes.
- `cotton-puppy.glb`: appearance-study export, 3,132,828 bytes, seven mesh objects/six materials. Not optimized for a footer release.
- `preview.png`: 800×900 Cycles render of that actual model, not an image-generation mockup.
- Rebuild with Blender 4.5: `blender --background --python design/cotton-puppy/create.py`.

Status: appearance preview only. The existing live yard/butterflies are unchanged. No walking rig, animation, ball-follow behavior or runtime loader is included. A later footer version should be optimized after the appearance direction is settled.
