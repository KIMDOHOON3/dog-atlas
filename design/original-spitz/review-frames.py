"""Render every second authored frame for a slow side-view contact review."""
import bpy
from pathlib import Path
from mathutils import Vector

OUT = Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'original-spitz.blend'))
scene = bpy.context.scene
scene.camera.location = (5, 0, 1.05)
scene.camera.rotation_euler = (Vector((0, 0, 1.05)) - scene.camera.location).to_track_quat('-Z', 'Y').to_euler()
scene.camera.data.ortho_scale = 3.0
scene.render.resolution_x = 480
scene.render.resolution_y = 400
scene.cycles.samples = 8
frames = OUT.parent.parent / 'tmp/spitz-gait-frames'
frames.mkdir(parents=True, exist_ok=True)
for frame in range(1, 49, 2):
    scene.frame_set(frame)
    scene.render.filepath = str(frames / f'{frame:02d}.png')
    bpy.ops.render.render(write_still=True)
