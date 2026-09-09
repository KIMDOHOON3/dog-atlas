# Blender playground furniture

Original bench and braided cotton tug created through Blender MCP. Rebuild with `create.py` in Blender 4.5; editable source is `playground.blend`. Export: `public/models/yard-furniture.glb` (439,808 bytes, five material groups). No third-party models or textures.

The browser applies its existing procedural wood grain and loads the GLB only when the footer scene mounts. The procedural bench remains as loading/error fallback. Assets refresh the static shadow map once; there is no additional render loop. Cotton tug is decorative, not an interactive physics object.

Turf remains instanced Three.js geometry with Lambert lighting, shorter blades and reduced counts (34,000 desktop / 16,000 mobile). The existing ball controls and physics are unchanged in this visual pass.
