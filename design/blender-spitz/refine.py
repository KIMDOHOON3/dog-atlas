import bpy
from mathutils import Vector
from pathlib import Path
scene=bpy.context.scene
for ob in list(scene.objects):
    if ob.name.startswith(('Brow','Lower eye skin','Upper eyelid','Lower eyelid','Quiet ear hollow')):
        bpy.data.objects.remove(ob,do_unlink=True)
eyes=[o for o in scene.objects if o.name.startswith('Recessed brown eye')]
for ob in eyes:
    side=1 if ob.location.x>0 else -1
    ob.location=(side*.167,-.693,1.601)
    ob.scale=(.83,.83,.83)
    bs=ob.data.materials[0].node_tree.nodes.get('Principled BSDF')
    bs.inputs['Roughness'].default_value=.24
    bs.inputs['Coat Weight'].default_value=.15
for ob in scene.objects:
    if ob.name.startswith('Curled plume'):
        for v in ob.data.vertices:
            v.co.z=1.05+(v.co.z-1.05)*.66
        ob.particle_systems[0].settings.hair_length=.11
scene.render.filepath='C:/Users/김도훈/Desktop/강아지/design/blender-spitz/portrait.png'
bpy.ops.wm.save_as_mainfile(filepath='C:/Users/김도훈/Desktop/강아지/design/blender-spitz/japanese-spitz.blend')
