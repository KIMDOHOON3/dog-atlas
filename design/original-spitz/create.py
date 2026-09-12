"""Independent procedural Japanese Spitz. No imported meshes, textures or motion.
Run Blender --background --python design/original-spitz/create.py.
"""
import bpy, math, random
from mathutils import Vector
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'design/original-spitz'
OUT.mkdir(parents=True, exist_ok=True)
random.seed(20260912)
bpy.ops.wm.read_factory_settings(use_empty=True)

def material(name, color, rough=.7):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1); p.inputs['Roughness'].default_value=rough
    return m
coat=material('Ivory white double coat',(.88,.875,.84),.88)
face=coat
inner=material('Soft warm inner ear',(.58,.40,.36),.9)
rim=material('Dark eyelid and lip',(.023,.019,.017),.65)
eye=material('Deep brown eye',(.033,.018,.009),.19)
nosemat=material('Charcoal nose',(.017,.014,.014),.34)

body_parts=[]; all_meshes=[]; rigid={}
def sphere(name,p,s,mat=coat,body=False,bone=None,segments=32,rings=20):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=rings,location=p)
    o=bpy.context.object;o.name=name;o.scale=s
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    for poly in o.data.polygons:poly.use_smooth=True
    all_meshes.append(o)
    if body:body_parts.append(o)
    if bone:rigid[o.name]=bone
    return o

def capsule(name,a,b,r1,r2,body=True):
    a,b=Vector(a),Vector(b); direction=b-a
    o=sphere(name,(a+b)/2,(r1,r2,direction.length/2+min(r1,r2)*.55),body=body)
    o.rotation_euler=direction.to_track_quat('Z','Y').to_euler()
    return o

sphere('Ribcage',(0,-.08,1.00),(.30,.59,.35),body=True)
sphere('Tucked waist',(0,.30,1.02),(.235,.38,.27),body=True)
sphere('Pelvis',(0,.48,1.00),(.275,.29,.30),body=True)
sphere('Brisket',(0,-.42,.93),(.285,.24,.36),body=True)
capsule('Rising neck',(0,-.40,1.12),(0,-.62,1.44),.29,.285)
sphere('Skull',(0,-.71,1.55),(.235,.25,.235),body=True)
sphere('Brow plane',(0,-.81,1.60),(.195,.19,.15),body=True)
sphere('Muzzle bridge',(0,-.963,1.48),(.131,.228,.111),body=True)
sphere('Lower jaw',(0,-.974,1.407),(.108,.185,.049),body=True)

legs={}
for side,x in [('L',-.22),('R',.22)]:
    for kind in ['front','hind']:
        if kind=='front':
            a=(x,-.43,1.05);b=(x,-.33,.58);c=(x,-.45,.17);d=(x,-.52,.085)
            radii=(.125,.074,.063)
        else:
            a=(x,.47,1.01);b=(x,.25,.61);c=(x,.53,.25);d=(x,.43,.085)
            radii=(.155,.097,.068)
        key=f'{kind}.{side}';legs[key]=(a,b,c,d)
        capsule(key+' muscle',a,b,radii[0],radii[0])
        capsule(key+' lower',b,c,radii[1],radii[1])
        capsule(key+' pastern',c,d,radii[2],radii[2])
        sphere(key+' paw',(x,d[1]-.045,.075),(.088,.13,.065),body=True)

# Fuse only our own anatomical primitives into a continuous skin.
bpy.ops.object.select_all(action='DESELECT')
for o in body_parts:o.select_set(True)
bpy.context.view_layer.objects.active=body_parts[0];bpy.ops.object.join()
skin=bpy.context.object;skin.name='Original continuous skin'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
remesh=skin.modifiers.new('Continuous anatomical surface','REMESH');remesh.mode='VOXEL';remesh.voxel_size=.018
bpy.ops.object.modifier_apply(modifier=remesh.name)
smooth=skin.modifiers.new('Soft transitions','SMOOTH');smooth.factor=1.0;smooth.iterations=4
bpy.ops.object.modifier_apply(modifier=smooth.name)
dec=skin.modifiers.new('Web surface','DECIMATE');dec.ratio=.65
bpy.ops.object.modifier_apply(modifier=dec.name)
for p in skin.data.polygons:p.use_smooth=True
all_meshes=[skin]

def tube(name,points,radii,mat=coat,bone=None,sides=9):
    verts=[];faces=[]
    for i,p in enumerate(points):
        p=Vector(p);t=Vector(points[min(i+1,len(points)-1)])-Vector(points[max(i-1,0)])
        t.normalize();u=t.cross(Vector((1,0,0)))
        if u.length<.01:u=t.cross(Vector((0,1,0)))
        u.normalize();v=t.cross(u)
        for k in range(sides):
            q=p+radii[i]*(math.cos(k*math.tau/sides)*u+math.sin(k*math.tau/sides)*v);verts.append(q)
    for i in range(len(points)-1):
        for k in range(sides):
            a=i*sides+k;b=i*sides+(k+1)%sides;faces.append((a,b,b+sides,a+sides))
    faces.append(tuple(range(sides-1,-1,-1)));faces.append(tuple((len(points)-1)*sides+k for k in range(sides)))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.data.materials.append(mat)
    for p in mesh.polygons:p.use_smooth=True
    all_meshes.append(o)
    if bone:rigid[o.name]=bone
    return o

# Rounded triangular ears, built from cross-sections (not cones).
for sign in [-1,1]:
    x=sign*.164
    verts=[]
    for z,w,y,depth in [(1.67,.107,-.68,.080),(1.76,.078,-.68,.063),(1.85,.028,-.705,.029),(1.89,.003,-.713,.006)]:
        verts.extend([(x-w,y-depth,z),(x+w,y-depth,z),(x+w,y+depth,z),(x-w,y+depth,z)])
    faces=[(0,3,2,1),(12,13,14,15)]
    for i in range(3):
        for k in range(4):faces.append((i*4+k,i*4+(k+1)%4,(i+1)*4+(k+1)%4,(i+1)*4+k))
    mesh=bpy.data.meshes.new('Ear');mesh.from_pydata(verts,[],faces)
    o=bpy.data.objects.new('Upright ear',mesh);bpy.context.collection.objects.link(o);o.data.materials.append(coat)
    sub=o.modifiers.new('Rounded ear edge','SUBSURF');sub.levels=2
    bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=sub.name)
    for p in o.data.polygons:p.use_smooth=True
    all_meshes.append(o);rigid[o.name]='head'
    sphere('Inner ear',(x,-.749,1.76),(.030,.009,.048),inner,bone='head')
    # Dark almond eyes embedded within the brow, with no white eyeball.
    hit,loc,normal,idx=skin.ray_cast(Vector((sign*.125,-2,1.607)),Vector((0,1,0)))
    eye_y=loc.y if hit else -.91
    cutter=sphere('Eye socket tool',(sign*.125,eye_y+.020,1.607),(.059,.047,.038),rim)
    boolean=skin.modifiers.new('Recessed eye socket','BOOLEAN');boolean.operation='DIFFERENCE';boolean.object=cutter
    bpy.context.view_layer.objects.active=skin;bpy.ops.object.modifier_apply(modifier=boolean.name)
    all_meshes.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    o=sphere('Almond lid',(sign*.125,eye_y+.027,1.607),(.055,.032,.031),rim,bone='head');o.rotation_euler[1]=sign*-.17
    o=sphere('Almond eye',(sign*.125,eye_y+.010,1.607),(.045,.018,.026),eye,bone='head');o.rotation_euler[1]=sign*-.17
    tube('Mouth corner',[(sign*.022,-1.174,1.419),(sign*.075,-1.099,1.407),(sign*.108,-1.015,1.423)], [.004,.005,.002],rim,'head',6)
sphere('Rounded triangle nose',(0,-1.175,1.485),(.072,.049,.043),nosemat,bone='head')
for sign in [-1,1]:sphere('Nostril',(sign*.039,-1.212,1.485),(.014,.009,.009),rim,bone='head',segments=16,rings=10)

# Quiet solid tufts: silhouette and overlapping locks, never floating hair ribbons.
for i in range(100):
    theta=random.uniform(0,math.tau);z=random.uniform(.94,1.45)
    radius=.30*(1-.25*max(0,z-1.2))
    x=math.cos(theta)*radius;y=-.43+math.sin(theta)*radius*.79
    root=Vector((x,y,z));direction=Vector((math.cos(theta)*.12,math.sin(theta)*.10+.06,-.17))
    tube('Ruff lock',[root-direction*.3,root,root+direction*.6,root+direction],[.055,.065,.040,.002])
for i in range(50):
    sign=random.choice([-1,1]);y=random.uniform(-.15,.65);z=random.uniform(.91,1.20)
    x=sign*(.245+random.uniform(-.025,.02));p=Vector((x,y,z))
    tube('Coat lock',[p,p+Vector((sign*.035,.075,-.025)),p+Vector((sign*.065,.15,-.10))],[.07,.053,.003])
tail_points=[(0,.63,1.13),(0,.73,1.32),(.025,.65,1.49),(.04,.44,1.52),(.05,.26,1.42),(.06,.20,1.33)]
tube('Plume tail core',tail_points,[.09,.12,.13,.125,.085,.02],bone='tail',sides=16)
for i in range(40):
    t=random.uniform(.1,.85)*(len(tail_points)-1);j=int(t);p=Vector(tail_points[j]).lerp(Vector(tail_points[j+1]),t-j)
    theta=random.uniform(0,math.tau);v=Vector((math.cos(theta),math.sin(theta)*.45,-.45))
    tube('Tail feather',[p,p+v*.10,p+v*.18],[.06,.045,.003],bone='tail')

# Integrate tufts into two continuous soft masses instead of separate spikes.
for names,result_name,fixed in [(['Original continuous skin','Ruff lock','Coat lock'],'Continuous coat',None),(['Plume tail core','Tail feather'],'Soft plume','tail')]:
    parts=[o for o in all_meshes if any(o.name.startswith(n) for n in names)]
    bpy.ops.object.select_all(action='DESELECT')
    for o in parts:o.select_set(True)
    bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();joined=bpy.context.object;joined.name=result_name
    remesh=joined.modifiers.new('Integrated fur mass','REMESH');remesh.mode='VOXEL';remesh.voxel_size=.014
    bpy.ops.object.modifier_apply(modifier=remesh.name)
    sm=joined.modifiers.new('Soften fur locks','SMOOTH');sm.factor=1;sm.iterations=5;bpy.ops.object.modifier_apply(modifier=sm.name)
    dec=joined.modifiers.new('Web detail','DECIMATE');dec.ratio=.45;bpy.ops.object.modifier_apply(modifier=dec.name)
    for p in joined.data.polygons:p.use_smooth=True
    all_meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
    if fixed:rigid[joined.name]=fixed
    else:skin=joined

# Skeleton with real upper/lower limbs and separate paws.
arm=bpy.data.armatures.new('Original Spitz anatomy');rig=bpy.data.objects.new('Original Spitz rig',arm);bpy.context.collection.objects.link(rig)
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
def bone(name,a,b,parent=None):
    o=arm.edit_bones.new(name);o.head=a;o.tail=b
    if parent:o.parent=arm.edit_bones[parent]
bone('root',(0,0,.1),(0,0,.35))
bone('pelvis',(0,.48,1.0),(0,.15,1.03),'root')
bone('spine',(0,.15,1.03),(0,-.40,1.10),'pelvis')
bone('neck',(0,-.40,1.10),(0,-.64,1.46),'spine')
bone('head',(0,-.64,1.46),(0,-1.06,1.49),'neck')
bone('tail',tail_points[0],tail_points[2],'pelvis')
for key,(a,b,c,d) in legs.items():
    parent='spine' if key.startswith('front') else 'pelvis'
    bone(key+'.upper',a,b,parent);bone(key+'.lower',b,c,key+'.upper');bone(key+'.paw',c,d,key+'.lower')
bpy.ops.object.mode_set(mode='OBJECT')

def dist_segment(p,a,b):
    d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));return (p-a-t*d).length
deform=[b for b in arm.bones if b.name!='root']
for o in all_meshes:
    bpy.context.view_layer.objects.active=o;o.select_set(True)
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.select_set(False)
    groups={b.name:o.vertex_groups.new(name=b.name) for b in deform}
    fixed=rigid.get(o.name)
    for v in o.data.vertices:
        p=v.co
        if fixed:weights=[(fixed,1)]
        elif p.y<-.72 and p.z>1.28:weights=[('head',1)]
        elif p.z<.80 and abs(p.x)>.10:
            side='L' if p.x<0 else 'R';kind='front' if p.y<-.08 else 'hind';key=f'{kind}.{side}'
            chosen=[b for b in deform if b.name.startswith(key)]
            vals=sorted([(b.name,dist_segment(p,b.head_local,b.tail_local)) for b in chosen],key=lambda a:a[1])[:2]
            raw=[1/(d+.018)**5 for n,d in vals];weights=[(vals[i][0],w/sum(raw)) for i,w in enumerate(raw)]
        else:
            chosen=[b for b in deform if b.name in ['pelvis','spine','neck','head'] or b.name.endswith('.upper')]
            vals=sorted([(b.name,dist_segment(p,b.head_local,b.tail_local)) for b in chosen],key=lambda a:a[1])[:3]
            raw=[1/(d+.04)**5 for n,d in vals];weights=[(vals[i][0],w/sum(raw)) for i,w in enumerate(raw)]
        for n,w in weights:groups[n].add([v.index],w,'REPLACE')
    mod=o.modifiers.new('Anatomical skin','ARMATURE');mod.object=rig;o.parent=rig

# IK targets trace a planted support phase and lifted recovery phase.
targets={}
for key,(a,b,c,d) in legs.items():
    target=bpy.data.objects.new(key+' ankle target',None);bpy.context.collection.objects.link(target);target.location=c;targets[key]=target
    ik=rig.pose.bones[key+'.lower'].constraints.new('IK');ik.target=target;ik.chain_count=2
    pole=bpy.data.objects.new(key+' bend direction',None);bpy.context.collection.objects.link(pole)
    pole.location=(a[0], a[1]+(1.8 if key.startswith('front') else -1.8),.5)
    # Rest joints establish the intended bend plane; no pole twist is necessary.
    rig.pose.bones[key+'.lower'].ik_stretch=0
    rig.pose.bones[key+'.upper'].ik_stretch=0

scene=bpy.context.scene;scene.render.fps=30;scene.frame_start=1;scene.frame_end=25
for f in range(1,26):
    phase=(f-1)/24;angle=phase*math.tau
    rig.pose.bones['root'].location.z=.025+.035*math.sin(angle*2)
    rig.pose.bones['root'].keyframe_insert('location',frame=f)
    for n,amount,shift in [('pelvis',.085,0),('spine',-.11,.5),('neck',.05,.3),('head',-.035,.3)]:
        pb=rig.pose.bones[n];pb.rotation_mode='XYZ';pb.rotation_euler.x=amount*math.sin(angle+shift);pb.keyframe_insert('rotation_euler',frame=f)
    pb=rig.pose.bones['tail'];pb.rotation_mode='XYZ';pb.rotation_euler.z=.08*math.sin(angle);pb.keyframe_insert('rotation_euler',frame=f)
    for key,(a,b,c,d) in legs.items():
        shift=(0 if key.startswith('hind') else .48)+(0 if key.endswith('L') else .10)
        t=(phase+shift)%1;stance=.48
        if t<stance:
            progress=t/stance;y=c[1]-.20+.40*progress;z=c[2]
        else:
            progress=(t-stance)/(1-stance);y=c[1]+.20-.40*progress;z=c[2]+.24*math.sin(math.pi*progress)
        targets[key].location=(c[0],y,z);targets[key].keyframe_insert('location',frame=f)
        pb=rig.pose.bones[key+'.paw'];pb.rotation_mode='XYZ';pb.rotation_euler.x=-.24*math.sin(t*math.tau);pb.keyframe_insert('rotation_euler',frame=f)

# Bake constraints to portable bone animation, and remove control empties.
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig
bpy.ops.nla.bake(frame_start=1,frame_end=25,step=1,only_selected=False,visual_keying=True,clear_constraints=True,use_current_action=True,bake_types={'POSE'})
rig.animation_data.action.name='Run'
for o in list(bpy.data.objects):
    if o.type=='EMPTY':bpy.data.objects.remove(o,do_unlink=True)
scene.frame_set(1)

# Export authored rest shape + baked animation. Stage objects added afterwards.
bpy.ops.object.select_all(action='DESELECT')
for o in all_meshes:o.select_set(True)
bpy.context.view_layer.objects.active=skin
bpy.ops.object.join()
all_meshes=[skin]
rig.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(ROOT/'public/models/yard-original-spitz.glb'),export_format='GLB',use_selection=True,export_animations=True,export_skins=True,export_yup=True,export_animation_mode='ACTIONS',export_force_sampling=True)

floor=material('Preview sage',(.18,.23,.21),.9)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.005));bpy.context.object.data.materials.append(floor)
world=bpy.data.worlds.new('Studio world');scene.world=world;world.color=(.25,.25,.25)
def area(name,p,energy,size):
    data=bpy.data.lights.new(name,'AREA');o=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(o);o.location=p;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler();data.energy=energy;data.shape='DISK';data.size=size
area('Soft key',(-3,-4,6),500,4);area('Face fill',(3,-4,3),280,3);area('Rim',(1,3,4),450,3)
data=bpy.data.cameras.new('Review camera');camera=bpy.data.objects.new('Review camera',data);bpy.context.collection.objects.link(camera);scene.camera=camera;data.type='ORTHO';data.ortho_scale=3.1
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.render.resolution_x=900;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX'
rig.animation_data.action=None
for pb in rig.pose.bones:pb.matrix_basis.identity()
scene.frame_set(1)
def render(name,pos,target=(0,-.05,1.0)):
    camera.location=pos;camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler();scene.render.filepath=str(OUT/name);bpy.ops.render.render(write_still=True)
render('three-quarter.png',(3,-5,2.7))
render('front.png',(0,-5,1.8))
render('side.png',(5,0,1.8))
rig.animation_data.action=bpy.data.actions.get('Run');scene.frame_set(8)
render('run-contact.png',(4,-3,2.1))
scene.frame_set(18);render('run-recovery.png',(4,-3,2.1))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'original-spitz.blend'))
print('ORIGINAL_SPITZ_COMPLETE', (ROOT/'public/models/yard-original-spitz.glb').stat().st_size)
