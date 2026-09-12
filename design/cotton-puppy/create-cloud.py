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

# One low oval woolly body, with uneven overlapping lobes rather than stacked rings.
clouds=[puff('Woolly oval core',(0,.23,.70),(.73,.80,.55))]
for row,latitude in enumerate([-.67,0,.67]):
    for j in range(9):
        a=math.tau*(j+row*.37)/9
        x=.58*math.cos(a)*math.cos(latitude)
        y=.23+.62*math.sin(a)*math.cos(latitude)
        z=.70+.40*math.sin(latitude)
        size=1+.08*math.sin(j*2.3+row)
        o=puff('Soft wool lobe',(x,y,z),(.32*size,.36*size,.285*size))
        o.rotation_euler.z=a;clouds.append(o)

# Side cheeks and a wide U-shaped ruff cradle the small face.
for j in range(9):
    a=-.20+(math.pi+.40)*j/8
    x=.43*math.cos(a);z=1.06-.30*math.sin(a)
    o=puff('Soft cheek wool',(x,-.68,z),(.235,.22,.22))
    o.rotation_euler.y=a*.3;clouds.append(o)
for side in [-1,1]:
    clouds.append(puff('Soft side ruff',(side*.39,-.47,1.20),(.235,.25,.23)))
    clouds.append(puff('Shoulder cloud',(side*.39,-.17,1.18),(.29,.31,.245)))

# Little paws peek from beneath the coat, with no long exposed legs.
for x,y in [(-.30,-.53),(.30,-.53),(-.43,.52),(.43,.52)]:
    puff('Small rounded paw',(x,y,.12),(.13,.19,.145),face)

# Curled spitz tail becomes a few soft cushions against the rear silhouette.
for j in range(7):
    a=-.5+j*.48
    clouds.append(puff('Cloud tail',(.54+.17*math.cos(a),.77,.70+.19*math.sin(a)),(.19,.22,.20)))
join(clouds,'Cloud coat',.022)

# Smooth small face recessed into the cloud collar, with a short canine muzzle.
head=[puff('Puppy face',(0,-.64,1.27),(.39,.30,.34),face),
      puff('Cheek left',(-.20,-.72,1.17),(.19,.21,.18),face),
      puff('Cheek right',(.20,-.72,1.17),(.19,.21,.18),face),
      puff('Short muzzle',(0,-.912,1.16),(.15,.12,.105),face)]
join(head,'Puppy face',.016)

def ear(side):
    verts=[];faces=[]
    for z,rx,ry,cx in [(1.43,.15,.105,.25),(1.55,.13,.087,.28),(1.70,.065,.046,.32),(1.76,.012,.013,.33)]:
        for j in range(24):
            a=j*math.tau/24
            verts.append((side*cx+rx*math.cos(a),-.55+ry*math.sin(a),z))
    for k in range(3):
        for j in range(24):
            a=k*24+j;b=k*24+(j+1)%24;faces.append((a,b,b+24,a+24))
    faces.append(tuple(reversed(range(24))))
    mesh=bpy.data.meshes.new('Rounded small spitz ear');mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new('Small upright ear',mesh);scene.collection.objects.link(o);mesh.materials.append(face)
    m=o.modifiers.new('Rounded ear tip','SUBSURF');m.levels=2
    bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    o=puff('Inner ear',(side*.295,-.623,1.61),(.047,.015,.067),ear_inside);o.rotation_euler.y=side*.24

for side in [-1,1]:
    ear(side)
    puff('Small puppy eye',(side*.145,-.925,1.32),(.057,.025,.064),ink)
nose=puff('Little nose',(0,-1.032,1.205),(.054,.032,.038),ink)
for v in nose.data.vertices:v.co.x*=.85+.3*v.co.z/.034
line('Tiny mouth',[(0,-1.032,1.178),(0,-1.030,1.15)],.004,ink)
for side in [-1,1]:
    line('Mouth corner',[(0,-1.030,1.15),(side*.033,-1.022,1.137),(side*.063,-1.008,1.153)],.004,ink)

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
o.location=(3.5,-7,2.6);o.rotation_euler=(Vector((.04,.08,.88))-o.location).to_track_quat('-Z','Y').to_euler()
cam.type='ORTHO';cam.ortho_scale=2.7;scene.camera=o
scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
scene.render.resolution_x=900;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.filepath=str(OUT/'preview-v4.png')
bpy.ops.render.render(write_still=True)
print('CLOUD_PUPPY_EXPORTED')
