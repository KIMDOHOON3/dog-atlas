# Blender Spitz preview

Original Blender model created through the local Blender MCP connection. `create.py` builds a separate study scene; `japanese-spitz.blend` contains the editable model and studio setup. No marketplace model or textures are included.

On 2026-09-09 the user requested testing the last model in the playground. `export-web.py` reads the saved sculpt, reduces dense surfaces and converts parent hairs to tapered mesh ribbons; it exports `public/models/yard-spitz.glb` (3,455,964 bytes). The website loads it only upon footer entry. This is a static appearance test, without a running rig or ball pursuit. Web ribbon fur differs from the Cycles particle-hair render. PC/mobile rendering, loading/disposal integration and offscreen pause were checked; real-device FPS has not been measured. Earlier preview images are not shipped.
