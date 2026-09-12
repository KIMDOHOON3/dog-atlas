"""Seated bear cub: authored mesh study, exported and reimported for render QA."""
import bpy, math
from pathlib import Path
from mathutils import Vector, Matrix

OUT=Path(__file__).resolve().parent
OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene=bpy.context.scene

def material(name,color,roughness):
    m=bpy.data.materials.new(name);m.use_nodes=True;m.diffuse_color=(*color,1)
    p=m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Roughness'].default_value=roughness
    return m

coat=material('Chestnut brown coat',(.235,.111,.052),.92)
muzzle=material('Warm muzzle',(.48,.285,.14),.94)
inner=material('Ear and paw crease',(.115,.047,.023),.93)
black=material('Espresso eyes and nose',(.012,.008,.006),.38)

def ellipsoid(name,center,scale,mat=coat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40,ring_count=28,location=center)
    o=bpy.context.object;o.name=name;o.scale=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def sculpt_join(name,objects,voxel=.022):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0]
    if len(objects)>1:bpy.ops.object.join()
    o=bpy.context.object;o.name=name
    m=o.modifiers.new('Continuous anatomy','REMESH');m.mode='VOXEL';m.voxel_size=voxel
    bpy.ops.object.modifier_apply(modifier=m.name)
    m=o.modifiers.new('Sculpt transitions','SMOOTH');m.factor=.95;m.iterations=5
    bpy.ops.object.modifier_apply(modifier=m.name)
    m=o.modifiers.new('Surface budget','DECIMATE');m.ratio=.55
    bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    return o

def stroke(name,points,radius,mat):
    curve=bpy.data.curves.new(name,'CURVE');curve.dimensions='3D'
    curve.bevel_depth=radius;curve.bevel_resolution=3
    spline=curve.splines.new('BEZIER');spline.bezier_points.add(len(points)-1)
    for p,co in zip(spline.bezier_points,points):p.co=co;p.handle_left_type='AUTO';p.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,curve);scene.collection.objects.link(o);curve.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.convert(target='MESH');return bpy.context.object

def foreleg(side):
    # Deliberately shaped shoulder, elbow and wrist sections, ending in a broad paw.
    rings=[(.95,-.08,.28,.17,.17),(.78,-.17,.30,.18,.18),(.57,-.27,.285,.155,.165),(.35,-.35,.255,.14,.15),(.18,-.40,.25,.15,.17)]
    verts=[];faces=[]
    for z,y,x,rx,ry in rings:
        for j in range(24):
            a=j*math.tau/24;verts.append((side*x+rx*math.cos(a),y+ry*math.sin(a),z))
    for k in range(len(rings)-1):
        for j in range(24):
            a=k*24+j;b=k*24+(j+1)%24;faces.append((a,b,b+24,a+24))
    faces.extend([tuple(reversed(range(24))),tuple(range(96,120))])
    mesh=bpy.data.meshes.new('Shoulder to planted wrist');mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new('Short solid foreleg',mesh);scene.collection.objects.link(o);mesh.materials.append(coat)
    return o

# A bottom-heavy infant torso, broad haunches and four grounded paws.
torso=ellipsoid('Pear torso',(0,.11,.65),(.48,.40,.62))
for v in torso.data.vertices:
    t=max(-1,min(1,v.co.z/.62));v.co.x*=1-.12*t;v.co.y*=1-.10*t
body_parts=[torso,ellipsoid('Chest',(0,-.035,1.02),(.37,.31,.34))]
for side in [-1,1]:
    body_parts.extend([ellipsoid('Seated haunch',(side*.36,.15,.31),(.28,.30,.31)),
                       ellipsoid('Hind paw',(side*.44,-.13,.13),(.22,.29,.145)),
                       foreleg(side),
                       ellipsoid('Front paw',(side*.25,-.44,.115),(.17,.215,.125))])
body_parts.append(ellipsoid('Little bear tail',(0,.49,.26),(.16,.17,.16)))
body=sculpt_join('Bear body',body_parts)

# The forehead is flattened slightly; cheeks widen below the eye line.
head=ellipsoid('Cub skull',(0,-.045,1.61),(.56,.455,.49))
for v in head.data.vertices:
    z=v.co.z/.49
    if z>.55:v.co.z-=.035*((z-.55)/.45)**2
    v.co.x*=1+.055*math.exp(-((z+.25)/.4)**2)
head=sculpt_join('Bear head',[head,
    ellipsoid('Left cheek',(-.33,-.23,1.47),(.235,.255,.235)),
    ellipsoid('Right cheek',(.33,-.23,1.47),(.235,.255,.235))],.018)
head_objects=[head]

# Cup-shaped rounded ears, with a small recessed inner surface.
for side in [-1,1]:
    ear=ellipsoid('Round bear ear',(side*.44,.01,1.98),(.205,.125,.21))
    for v in ear.data.vertices:
        if v.co.y<0:
            radial=(v.co.x/.205)**2+(v.co.z/.21)**2
            v.co.y+=.038*max(0,1-radial)**2
    head_objects.append(ear)
    head_objects.append(ellipsoid('Recessed inner ear',(side*.44,-.092,1.986),(.12,.018,.13),inner))

# A short protruding bear muzzle, with a broad rounded nose and a restrained lip.
snout=sculpt_join('Bear muzzle',[
    ellipsoid('Muzzle bridge',(0,-.41,1.49),(.255,.235,.19),muzzle),
    ellipsoid('Soft chin',(0,-.455,1.38),(.185,.17,.070),muzzle)],.014)
head_objects.append(snout)
nose=ellipsoid('Broad cub nose',(0,-.66,1.505),(.105,.069,.065),black)
for v in nose.data.vertices:v.co.x*=.9+.25*(v.co.z/.065)
head_objects.append(nose)
head_objects.append(stroke('Lip center',[(0,-.662,1.47),(0,-.66,1.425)],.006,inner))
for side in [-1,1]:
    head_objects.append(stroke('Gentle lip',[(0,-.66,1.425),(side*.055,-.648,1.412),(side*.105,-.616,1.429)],.0055,inner))
    # Small almond-shaped dark eyes beneath gently raised brow masses.
    eye=ellipsoid('Cub eye',(side*.242,-.46,1.665),(.054,.032,.061),black)
    eye.rotation_euler.z=-side*.13;head_objects.append(eye)

# Very shallow toe creases: paws read as feet without oversized pads or claws.
for side in [-1,1]:
    for offset in [-.05,.035]:
        x=side*.25+offset
        stroke('Front toe crease',[(x,-.616,.096),(x,-.633,.13),(x,-.62,.16)],.0035,inner)

# Small curious head tilt; bake to vertices, leaving an ordinary static GLB.
pivot=Vector((0,0,1.26));turn=Matrix.Rotation(math.radians(-6),4,'Y')
for o in head_objects:
    for v in o.data.vertices:
        world=o.matrix_world@v.co;world=pivot+turn.to_3x3()@(world-pivot)
        v.co=o.matrix_world.inverted()@world

# Shorten the seated torso and forelimbs; preserve head proportions.
for o in list(scene.objects):
    if o.type!='MESH':continue
    inverse=o.matrix_world.inverted()
    for v in o.data.vertices:
        p=o.matrix_world@v.co
        p.z=p.z*.83 if p.z<1.2 else p.z-.204
        v.co=inverse@p

# Merge by material, then export an independently usable model.
for mat in [coat,muzzle,inner,black]:
    obs=[o for o in list(scene.objects) if o.type=='MESH' and o.data.materials and o.data.materials[0]==mat]
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0]
    if len(obs)>1:bpy.ops.object.join()
    bpy.context.object.name=mat.name
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'bear-cub.blend'),compress=True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'bear-cub.glb'),export_format='GLB',export_apply=True)

# Reimport the actual GLB before rendering so the preview uses the deliverable.
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(OUT/'bear-cub.glb'))
scene=bpy.context.scene
ground=material('Warm stone backdrop',(.48,.46,.40),1)
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(ground)
scene.world=bpy.data.worlds.new('Soft studio world');scene.world.color=(.24,.24,.24)
def area(name,xyz,energy,size):
    light=bpy.data.lights.new(name,'AREA');light.energy=energy;light.shape='DISK';light.size=size
    o=bpy.data.objects.new(name,light);scene.collection.objects.link(o);o.location=xyz
    o.rotation_euler=(Vector((0,0,1.1))-o.location).to_track_quat('-Z','Y').to_euler()
area('Broad soft key',(-3,-4,5),480,4)
area('Gentle fill',(3,-3,2.5),100,3)
area('Warm rim',(2,3,4),500,3)
camera=bpy.data.cameras.new('Portrait');o=bpy.data.objects.new('Portrait',camera);scene.collection.objects.link(o)
o.location=(2.8,-7,2.7);o.rotation_euler=(Vector((0,0,.97))-o.location).to_track_quat('-Z','Y').to_euler()
camera.type='ORTHO';camera.ortho_scale=2.60;scene.camera=o
scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
scene.render.resolution_x=900;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.filepath=str(OUT/'preview.png')
bpy.ops.render.render(write_still=True)
print('BEAR_CUB_GLB_REIMPORTED_AND_RENDERED')
