"""Original seated cotton-cloud puppy. No imported dog meshes or textures."""
import bpy, math, random, bisect
from mathutils import Vector
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'design/cotton-puppy'
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def material(name, color, roughness=.8):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    shader = m.node_tree.nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value = (*color, 1)
    shader.inputs['Roughness'].default_value = roughness
    return m

fur = material('Warm cotton coat', (.89, .87, .82), .94)
face = material('Soft white muzzle', (.97, .94, .88), .88)
pink = material('Warm ear velvet', (.70, .51, .45), .94)
ink = material('Deep cocoa eyes and nose', (.019, .015, .012), .21)
mouth = material('Soft mouth line', (.13, .095, .075), .8)
glint = material('Eye catchlight', (1, .97, .9), .1)

def sphere(name, xyz, scale, mat=fur, segments=32, rings=20):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=xyz)
    o = bpy.context.object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(mat)
    for p in o.data.polygons: p.use_smooth = True
    return o

def unify(name, objects, voxel=.035):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects: o.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    o = bpy.context.object
    o.name = name
    mod = o.modifiers.new('Continuous soft volume', 'REMESH')
    mod.mode = 'VOXEL'; mod.voxel_size = voxel
    bpy.ops.object.modifier_apply(modifier=mod.name)
    mod = o.modifiers.new('Gentle sculpt smoothing', 'SMOOTH')
    mod.factor = .9; mod.iterations = 5
    bpy.ops.object.modifier_apply(modifier=mod.name)
    mod = o.modifiers.new('Web surface budget', 'DECIMATE')
    mod.ratio = .48
    bpy.ops.object.modifier_apply(modifier=mod.name)
    for p in o.data.polygons: p.use_smooth = True
    return o

def tube(name, points, radius, mat):
    curve = bpy.data.curves.new(name, 'CURVE')
    curve.dimensions = '3D'; curve.bevel_depth = radius; curve.bevel_resolution = 3
    spline = curve.splines.new('BEZIER'); spline.bezier_points.add(len(points)-1)
    for p, xyz in zip(spline.bezier_points, points):
        p.co = xyz; p.handle_left_type = 'AUTO'; p.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(name, curve)
    scene.collection.objects.link(o); curve.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True)
    bpy.context.view_layer.objects.active = o; bpy.ops.object.convert(target='MESH')
    return bpy.context.object

# Seated pear-shaped body, broad haunches and short forelegs, all planted.
body_parts = [sphere('Pear body', (0,.12,.69), (.53,.44,.65)),
              sphere('Soft chest', (0,-.16,.94), (.46,.37,.46))]
for side in [-1,1]:
    body_parts.append(sphere('Seated haunch', (side*.39,.11,.35), (.32,.36,.34)))
    body_parts.append(sphere('Back paw', (side*.43,-.20,.13), (.245,.31,.135)))
    body_parts.append(sphere('Short foreleg', (side*.21,-.31,.48), (.145,.17,.39)))
    body_parts.append(sphere('Round front paw', (side*.21,-.43,.12), (.18,.23,.13)))
body = unify('Puppy body', body_parts)

# Broad cloud-like head with restrained cheek lobes instead of individual hair spikes.
head_parts = [sphere('Round head', (0,-.10,1.66), (.68,.55,.64))]
for side in [-1,1]:
    head_parts.append(sphere('Cheek cloud', (side*.45,-.12,1.48), (.25,.33,.28)))
    head_parts.append(sphere('Cheek lower tuft', (side*.35,-.03,1.28), (.26,.27,.25)))
    head_parts.append(sphere('Neck ruff', (side*.29,.07,1.14), (.28,.29,.23)))
head = unify('Puppy head', head_parts, .026)

def ear(side):
    verts=[]; faces=[]
    # Rounded pointed ears partially tucked into the fluffy head.
    for z, rx, ry, shift in [(1.96,.18,.13,0),(2.07,.14,.10,.025),(2.19,.075,.055,.055),(2.26,.022,.02,.068),(2.265,.002,.002,.068)]:
        for j in range(24):
            a=j*2*math.pi/24
            verts.append((side*(.40+shift)+rx*math.cos(a), .025+ry*math.sin(a), z))
    for k in range(4):
        for j in range(24):
            a=k*24+j; b=k*24+(j+1)%24
            faces.append((a,b,b+24,a+24))
    faces.append(tuple(reversed(range(24))))
    mesh=bpy.data.meshes.new('Soft spitz ear'); mesh.from_pydata(verts,[],faces); mesh.update()
    o=bpy.data.objects.new('Small upright ear',mesh);scene.collection.objects.link(o);mesh.materials.append(fur)
    for p in mesh.polygons:p.use_smooth=True
    mod=o.modifiers.new('Rounded ear', 'SUBSURF'); mod.levels=2
    bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
    return o

for side in [-1,1]:
    ear(side)
    o=sphere('Inner ear', (side*.452,-.071,2.16), (.035,.013,.035),pink)
    o.rotation_euler.y=side*-.20

# Short muzzle, small charcoal nose and fine closed smile. No human-like teeth.
unify('Puffy muzzle', [sphere('Muzzle left',(-.075,-.60,1.43),(.16,.115,.13),face),
                      sphere('Muzzle right',(.075,-.60,1.43),(.16,.115,.13),face),
                      sphere('Muzzle bridge',(0,-.58,1.52),(.14,.12,.13),face)],.018)
o=sphere('Tiny velvet nose',(0,-.73,1.51),(.075,.045,.055),ink)
for v in o.data.vertices:
    v.co.x *= .75+.35*(v.co.z/.055+.5)
tube('Philtrum',[(0,-.739,1.48),(0,-.733,1.425)],.006,mouth)
for side in [-1,1]:
    tube('Closed puppy smile',[(0,-.733,1.425),(side*.045,-.727,1.40),(side*.085,-.710,1.41)],.006,mouth)
    eye=sphere('Glossy puppy eye',(side*.235,-.616,1.70),(.061,.034,.065),ink)
    eye.rotation_euler.z=side*-.12
    sphere('Tiny eye highlight',(side*.235-.014,-.648,1.722),(.013,.007,.014),glint,16,10)

# A broad curled tail rests beside the seated body.
tail_parts=[]
for j in range(17):
    a=-1.0+j/16*math.pi*1.72
    radius=.22
    tail_parts.append(sphere('Tail puff',(.52+radius*math.cos(a),.29,.42+radius*math.sin(a)),(.19,.23,.19),fur,20,12))
unify('Curled cotton tail',tail_parts,.032)

# Bake a gentle three-quarter pose; keep every part authored locally.
meshes=[o for o in scene.objects if o.type=='MESH']
for o in meshes:
    o.select_set(False)
for mat in [fur,face,pink,ink,mouth,glint]:
    objects=[o for o in list(scene.objects) if o.type=='MESH' and o.data.materials and o.data.materials[0]==mat]
    if not objects:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0]
    if len(objects)>1:bpy.ops.object.join()
    bpy.context.object.name=mat.name

# Short tapered coat fibres soften the silhouette; exported as static geometry.
coat=bpy.data.objects.get('Warm cotton coat')
coat.data.calc_loop_triangles()
triangles=list(coat.data.loop_triangles); cumulative=[]; total=0
for tri in triangles:
    total+=tri.area;cumulative.append(total)
rng=random.Random(32);verts=[];faces=[]
for j in range(16000):
    tri=triangles[bisect.bisect_left(cumulative,rng.random()*total)]
    a,b,c=[coat.data.vertices[i] for i in tri.vertices]
    u=math.sqrt(rng.random());v=rng.random();weights=(1-u,u*(1-v),u*v)
    p=sum((q.co*w for q,w in zip([a,b,c],weights)),Vector())
    n=sum((q.normal*w for q,w in zip([a,b,c],weights)),Vector()).normalized()
    p=coat.matrix_world@p;n=(coat.matrix_world.to_3x3()@n).normalized()
    # Keep muzzle/eyes readable and avoid fibres under the ground.
    if p.z<.08 or (p.y<-.45 and abs(p.x)<.36 and 1.28<p.z<1.88):continue
    tangent=n.cross(Vector((0,0,1)))
    if tangent.length<.01:tangent=Vector((1,0,0))
    tangent.normalize();cross=n.cross(tangent).normalized()
    length=.014+rng.random()*.024; width=.0008+rng.random()*.0007
    tip=p+n*length+Vector((0,0,-length*.18))
    k=len(verts)
    verts.extend([p-tangent*width,p+tangent*width,tip,p-cross*width,p+cross*width,tip])
    faces.extend([(k,k+1,k+2),(k+3,k+4,k+5)])
mesh=bpy.data.meshes.new('Short cotton fibres');mesh.from_pydata(verts,[],faces);mesh.update()
o=bpy.data.objects.new('Cotton silhouette fibres',mesh);scene.collection.objects.link(o);mesh.materials.append(fur)

bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'cotton-puppy.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'cotton-puppy.glb'),export_format='GLB',export_apply=True)

# A true Blender render for checking the face before placing the small model in the yard.
ground=material('Studio sand',(.71,.67,.57),1)
bpy.ops.mesh.primitive_plane_add(size=200)
bpy.context.object.data.materials.append(ground)
scene.world=bpy.data.worlds.new('Warm studio world')
scene.world.color=(.75,.75,.75)
def area(name,xyz,power,size):
    d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='DISK';d.size=size
    o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=xyz
    o.rotation_euler=(Vector((0,0,1.2))-o.location).to_track_quat('-Z','Y').to_euler()
area('Large softbox',(-3,-4,6),450,4)
area('Face fill',(3,-4,3),200,3)
area('Soft rim',(2,3,4),500,3)
cam=bpy.data.cameras.new('Portrait camera');o=bpy.data.objects.new('Portrait camera',cam);scene.collection.objects.link(o)
o.location=(3,-7,3.2);o.rotation_euler=(Vector((.08,0,1.22))-o.location).to_track_quat('-Z','Y').to_euler()
cam.type='ORTHO';cam.ortho_scale=3.15;scene.camera=o
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.resolution_x=800;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX'
scene.render.filepath=str(OUT/'preview.png')
bpy.ops.render.render(write_still=True)
print('COTTON_PUPPY_EXPORTED')
