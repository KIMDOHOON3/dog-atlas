import bpy, math
from mathutils import Vector
from pathlib import Path
root=Path('C:/Users/김도훈/Desktop/강아지')
bpy.ops.wm.open_mainfile(filepath=str(root/'design/blender-spitz/japanese-spitz.blend'))
scene=bpy.data.scenes.get('Spitz portrait study');bpy.context.window.scene=scene
bpy.context.view_layer.update()
objects=[o for o in scene.objects if o.type in {'MESH','CURVE'} and o.name!='Plane']
verts=[];faces=[]
deps=bpy.context.evaluated_depsgraph_get()
for ob in objects:
    ev=ob.evaluated_get(deps)
    for ps in ev.particle_systems:
        stride=max(1,len(ps.particles)//4500)
        for i in range(0,len(ps.particles),stride):
            pts=[Vector(ps.co_hair(ev,particle_no=i,step=j)) for j in (0,2,4,6,8)]
            if (pts[-1]-pts[0]).length<.001:continue
            tangent=(pts[-1]-pts[0]).normalized();side=tangent.cross(Vector((0,0,1)))
            if side.length<.01:side=tangent.cross(Vector((1,0,0)))
            side.normalize()
            base=len(verts)
            for j,p in enumerate(pts):
                w=.0025*(1-j/4)+.00015
                verts.extend([p-side*w,p+side*w])
            for j in range(4):
                a=base+j*2;faces.append((a,a+1,a+3,a+2))
    for m in list(ob.modifiers):
        if m.type=='PARTICLE_SYSTEM':ob.modifiers.remove(m)
bpy.ops.object.select_all(action='DESELECT')
for ob in objects:ob.select_set(True)
bpy.context.view_layer.objects.active=objects[0]
bpy.ops.object.convert(target='MESH')
for ob in list(bpy.context.selected_objects):
    if len(ob.data.polygons)>15000:
        bpy.context.view_layer.objects.active=ob
        d=ob.modifiers.new('Web surface budget','DECIMATE');d.ratio=15000/len(ob.data.polygons);bpy.ops.object.modifier_apply(modifier=d.name)
mesh=bpy.data.meshes.new('Baked coat ribbons');mesh.from_pydata(verts,[],faces);mesh.update()
fur=bpy.data.objects.new('Baked coat',mesh);scene.collection.objects.link(fur)
mat=bpy.data.materials.get('Warm white coat').copy();mat.name='Web coat';mat.use_backface_culling=False;mesh.materials.append(mat)
for p in mesh.polygons:p.use_smooth=True
fur.select_set(True)
(root/'public/models').mkdir(exist_ok=True)
bpy.ops.export_scene.gltf(filepath=str(root/'public/models/yard-spitz.glb'),export_format='GLB',use_selection=True,export_apply=True,export_animations=False,export_cameras=False,export_lights=False)
print('FUR',len(verts),len(faces),'GLB', (root/'public/models/yard-spitz.glb').stat().st_size)
