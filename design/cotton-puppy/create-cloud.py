"""Cloud-volume puppy study, guided by the user's rounded clump reference."""
import bpy, math
from mathutils import Vector
from pathlib import Path

OUT=Path(__file__).resolve().parent
bpy.ops.wm.read_factory_settings(use_empty=True)
scene=bpy.context.scene

def material(name,color,rough=.85):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    shader=m.node_tree.nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value=(*color,1)
    shader.inputs['Roughness'].default_value=rough
    return m

coat=material('Warm ivory cloud coat',(.86,.825,.72),.93)
face=material('Cream puppy face',(.93,.895,.80),.86)
ear_inside=material('Soft biscuit ear',(.64,.47,.34),.93)
ink=material('Cocoa facial details',(.045,.028,.018),.36)

def puff(name,xyz,scale,mat=coat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=20,location=xyz)
    o=bpy.context.object;o.name=name;o.scale=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def join(objects,name,voxel=None):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0]
    if len(objects)>1:bpy.ops.object.join()
    o=bpy.context.object;o.name=name
    if voxel:
        m=o.modifiers.new('Continuous cloud volume','REMESH');m.mode='VOXEL';m.voxel_size=voxel
        bpy.ops.object.modifier_apply(modifier=m.name)
        m=o.modifiers.new('Soft valleys','SMOOTH');m.factor=.85;m.iterations=3
        bpy.ops.object.modifier_apply(modifier=m.name)
        m=o.modifiers.new('Compact surface','DECIMATE');m.ratio=.45
        bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    return o

def line(name,points,radius,mat):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=radius;c.bevel_resolution=3
    p=c.splines.new('BEZIER');p.bezier_points.add(len(points)-1)
    for v,xyz in zip(p.bezier_points,points):v.co=xyz;v.handle_left_type='AUTO';v.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);c.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.convert(target='MESH');return bpy.context.object

# A low seated cloud body: large connected cushions, not individual strands.
clouds=[puff('Seated cloud core',(0,.16,.78),(.75,.61,.60))]
for row,z in enumerate([.43,.78,1.12]):
    for j in range(9):
        a=math.tau*(j+row*.37)/9
        x=.55*math.cos(a);y=.18+.43*math.sin(a)
        o=puff('Body cloud fold',(x,y,z),(.34,.30,.27))
        o.rotation_euler.z=a;clouds.append(o)

# Side cheeks and a wide U-shaped ruff cradle the small face.
for j in range(9):
    a=-.20+(math.pi+.40)*j/8
    x=.59*math.cos(a);z=1.22-.44*math.sin(a)
    o=puff('Pillow ruff',(x,-.48,z),(.285,.275,.27))
    o.rotation_euler.y=a*.3;clouds.append(o)
for side in [-1,1]:
    clouds.append(puff('Soft side ruff',(side*.54,-.26,1.43),(.29,.30,.27)))
    clouds.append(puff('Shoulder cloud',(side*.46,.04,1.37),(.33,.33,.28)))

# Little paws peek from beneath the coat, with no long exposed legs.
for x,y in [(-.28,-.38),(.28,-.38),(-.57,.16),(.57,.16)]:
    puff('Small rounded paw',(x,y,.12),(.16,.22,.14),face)

# Curled spitz tail becomes a few soft cushions against the rear silhouette.
for j in range(7):
    a=-.5+j*.48
    clouds.append(puff('Cloud tail',(.66+.18*math.cos(a),.39,.71+.23*math.sin(a)),(.21,.24,.23)))
join(clouds,'Cloud coat',.022)

# Smooth small face recessed into the cloud collar, with a short canine muzzle.
head=[puff('Puppy face',(0,-.45,1.46),(.425,.315,.40),face),
      puff('Short muzzle',(0,-.735,1.32),(.155,.115,.105),face)]
join(head,'Puppy face',.016)

def ear(side):
    verts=[];faces=[]
    for z,rx,ry,cx in [(1.69,.17,.105,.29),(1.81,.15,.09,.33),(1.98,.074,.046,.39),(2.04,.012,.013,.405)]:
        for j in range(24):
            a=j*math.tau/24
            verts.append((side*cx+rx*math.cos(a),-.36+ry*math.sin(a),z))
    for k in range(3):
        for j in range(24):
            a=k*24+j;b=k*24+(j+1)%24;faces.append((a,b,b+24,a+24))
    faces.append(tuple(reversed(range(24))))
    mesh=bpy.data.meshes.new('Rounded small spitz ear');mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new('Small upright ear',mesh);scene.collection.objects.link(o);mesh.materials.append(face)
    m=o.modifiers.new('Rounded ear tip','SUBSURF');m.levels=2
    bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    o=puff('Inner ear',(side*.35,-.437,1.86),(.058,.015,.086),ear_inside);o.rotation_euler.y=side*.24

for side in [-1,1]:
    ear(side)
    puff('Small puppy eye',(side*.155,-.751,1.49),(.047,.026,.056),ink)
nose=puff('Little nose',(0,-.85,1.355),(.048,.031,.034),ink)
for v in nose.data.vertices:v.co.x*=.85+.3*v.co.z/.034
line('Tiny mouth',[(0,-.852,1.33),(0,-.848,1.303)],.004,ink)
for side in [-1,1]:
    line('Mouth corner',[(0,-.848,1.303),(side*.035,-.835,1.289),(side*.061,-.815,1.30)],.004,ink)

# Merge by material for a compact original GLB.
for mat in [coat,face,ear_inside,ink]:
    objects=[o for o in list(scene.objects) if o.type=='MESH' and o.data.materials and o.data.materials[0]==mat]
    if objects:join(objects,mat.name)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'cotton-puppy.blend'),compress=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'cotton-puppy.glb'),export_format='GLB',export_apply=True)

# Actual model render, not a generated bitmap edit.
ground=material('Slate studio floor',(.29,.34,.35),1)
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(ground)
scene.world=bpy.data.worlds.new('Studio world');scene.world.color=(.20,.20,.20)
def light(name,xyz,energy,size):
    data=bpy.data.lights.new(name,'AREA');data.energy=energy;data.shape='DISK';data.size=size
    o=bpy.data.objects.new(name,data);scene.collection.objects.link(o);o.location=xyz
    o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
light('Soft key',(-3,-4,5),400,4)
light('Gentle fill',(4,-3,2.8),100,3)
light('Cloud rim',(2,3,4),420,3)
cam=bpy.data.cameras.new('Study camera');o=bpy.data.objects.new('Study camera',cam);scene.collection.objects.link(o)
o.location=(3,-7,2.8);o.rotation_euler=(Vector((.04,0,1.02))-o.location).to_track_quat('-Z','Y').to_euler()
cam.type='ORTHO';cam.ortho_scale=2.8;scene.camera=o
scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
scene.render.resolution_x=800;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.filepath=str(OUT/'preview-v3.png')
bpy.ops.render.render(write_still=True)
print('CLOUD_PUPPY_EXPORTED')
