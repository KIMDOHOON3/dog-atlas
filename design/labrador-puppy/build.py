"""Original standing Labrador puppy study. Run each stage separately for visual QA.

Blender 4.5.9: blender --background --factory-startup --python build.py -- 1
Stages retain their own .blend files and orthographic front/side renders.
"""
import bpy, bmesh, math, random, json, sys
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from pathlib import Path

ROOT=Path(__file__).resolve().parent
S=.1
STAGE=int(sys.argv[sys.argv.index('--')+1]) if '--' in sys.argv else 1
random.seed(2434583)
for d in ['stages','previews','textures','exports','reports']:(ROOT/d).mkdir(parents=True,exist_ok=True)

def material(name,color,rough=.5):
    m=bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes=True;m.diffuse_color=(*color,1)
    p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough
    return m

def mesh(name,verts,faces,mat=None):
    d=bpy.data.meshes.new(name);d.from_pydata([tuple(Vector(v)*S) for v in verts],[],faces);d.update()
    o=bpy.data.objects.new(name,d);bpy.context.scene.collection.objects.link(o)
    if mat:d.materials.append(mat)
    bm=bmesh.new();bm.from_mesh(d);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(d);bm.free()
    for p in d.polygons:p.use_smooth=True
    return o

def active(o):
    bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o

def ellipsoid(name,c,r,mat=None,segments=40):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=28,location=Vector(c)*S)
    o=bpy.context.object;o.name=name;o.scale=Vector(r)*S;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if mat:o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def tube(name,rings,mat=None,n=24):
    # Every cross-section follows the limb axis. Consistent rings support joint loops.
    v=[];f=[]
    for k,(c,rx,ry) in enumerate(rings):
        c=Vector(c);t=Vector(rings[min(k+1,len(rings)-1)][0])-Vector(rings[max(0,k-1)][0])
        t.normalize();u=Vector((1,0,0));u=(u-t*t.dot(u)).normalized();w=t.cross(u).normalized()
        for j in range(n):
            a=j*math.tau/n;v.append(c+u*(rx*math.cos(a))+w*(ry*math.sin(a)))
    for k in range(len(rings)-1):
        for j in range(n):a=k*n+j;b=k*n+(j+1)%n;f.append((a,b,b+n,a+n))
    f.extend([tuple(reversed(range(n))),tuple(range((len(rings)-1)*n,len(rings)*n))])
    return mesh(name,v,f,mat)

def stroke(name,coords,radius,mat):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=10;c.bevel_depth=radius*S;c.bevel_resolution=3
    sp=c.splines.new('BEZIER');sp.bezier_points.add(len(coords)-1)
    for p,co in zip(sp.bezier_points,coords):p.co=Vector(co)*S;p.handle_left_type='AUTO';p.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,c);bpy.context.scene.collection.objects.link(o);c.materials.append(mat);return o

def merge_sculpt(name,objects,voxel=.018):
    for part in objects:
        if any(part.name.startswith(n) for n in ['Forelimb','Hindlimb','Neck','Otter tail']):
            active(part);mod=part.modifiers.new('Round anatomical sections','SUBSURF');mod.levels=2;bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join();o=bpy.context.object;o.name=name
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    m=o.modifiers.new('Anatomy union','REMESH');m.mode='VOXEL';m.voxel_size=voxel*S;bpy.ops.object.modifier_apply(modifier=m.name)
    m=o.modifiers.new('Sculpt relaxation','SMOOTH');m.factor=.78;m.iterations=7;bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    return o

def studio():
    scene=bpy.context.scene
    for o in list(scene.objects):
        if o.get('studio'):bpy.data.objects.remove(o,do_unlink=True)
    floor=material('Studio warm grey',(.24,.265,.28),.83)
    bpy.ops.mesh.primitive_plane_add(size=200*S);o=bpy.context.object;o.name='Studio floor';o.data.materials.append(floor);o['studio']=True
    sections=[(5,0),(7,0),(8,.2),(9,.7),(10,1.5),(10.5,3),(10.5,30)]
    verts=[(x,y,z) for y,z in sections for x in [-30,30]];faces=[(2*i,2*i+1,2*i+3,2*i+2) for i in range(len(sections)-1)]
    o=mesh('Seamless studio sweep',verts,faces,floor);o['studio']=True
    m=o.modifiers.new('Curved studio backdrop','SUBSURF');m.levels=2
    world=bpy.data.worlds.new('Neutral soft world');scene.world=world;world.use_nodes=True
    world.node_tree.nodes.get('Background').inputs[0].default_value=(.40,.44,.48,1)
    world.node_tree.nodes.get('Background').inputs[1].default_value=.3
    for name,co,power,size in [('Key',(-4,-5,7),12,5),('Fill',(4,-3,4),4,4),('Rim',(1,4,6),14,3)]:
        d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='DISK';d.size=size*S
        o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=Vector(co)*S;o.rotation_euler=(Vector((0,0,1.6))*S-o.location).to_track_quat('-Z','Y').to_euler();o['studio']=True
    d=bpy.data.cameras.new('Inspection camera');o=bpy.data.objects.new('Inspection camera',d);scene.collection.objects.link(o);o['studio']=True;scene.camera=o
    scene.render.engine='CYCLES';scene.cycles.samples=40;scene.cycles.use_denoising=True
    prefs=bpy.context.preferences.addons['cycles'].preferences
    try:
        prefs.compute_device_type='OPTIX';prefs.get_devices()
        for d in prefs.devices:d.use=d.type=='OPTIX'
        scene.cycles.device='GPU'
    except Exception:scene.cycles.device='CPU'
    scene.view_settings.view_transform='AgX';scene.view_settings.exposure=-.3
    scene.render.image_settings.file_format='PNG';scene.render.resolution_percentage=100
    scene.render.film_transparent=False

def render(view,stage=None,final=False):
    scene=bpy.context.scene;cam=scene.camera
    views={'front':((0,-10,1.75),(0,-.15,1.75),4.05),'side':((10,0,1.75),(0,0,1.75),5.8),'rear':((0,10,1.75),(0,.25,1.75),4.05),'three-quarter':((6,-9,4.0),(0,-.15,1.75),5.8),'face':((3,-8,3.8),(0,-1.6,2.88),2.4)}
    pos,target,span=views[view];cam.location=Vector(pos)*S;cam.rotation_euler=(Vector(target)*S-cam.location).to_track_quat('-Z','Y').to_euler()
    cam.data.type='ORTHO';cam.data.ortho_scale=span*S;cam.data.dof.use_dof=False
    scene.render.resolution_x=1000 if view=='side' else 850;scene.render.resolution_y=850
    if final:
        scene.render.resolution_x=1600;scene.render.resolution_y=1400;scene.cycles.samples=128
        if view in ['three-quarter','face']:
            cam.data.type='PERSP';cam.data.lens=65 if view=='three-quarter' else 85
            direction=(cam.location-Vector(target)*S).normalized();distance=span*S*cam.data.lens/36
            cam.location=Vector(target)*S+direction*distance;cam.data.dof.use_dof=True
            eye_focus=Vector((.345,-1.79,2.84))*S
            cam.data.dof.focus_distance=(cam.location-eye_focus).dot(direction);cam.data.dof.aperture_fstop=8
    name=f'{stage:02d}-{view}' if stage else view
    scene.render.filepath=str(ROOT/'previews'/f'{name}.png');bpy.ops.render.render(write_still=True)
    print('RENDER_READY',name,flush=True)

def save(stage):
    bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'stages'/f'{stage:02d}.blend'),compress=True)

def stage1():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    skin=material('Puppy skin',(.30,.28,.25),.75)
    parts=[ellipsoid('Rib cage',(0,.20,1.88),(.59,.96,.69),skin),ellipsoid('Soft puppy abdomen',(0,.80,1.57),(.55,.78,.50),skin),ellipsoid('Pelvis',(0,1.10,1.89),(.54,.52,.54),skin),ellipsoid('Brisket',(0,-.54,1.63),(.48,.44,.64),skin)]
    parts.append(tube('Neck', [((0,-.48,1.85),.43,.47),((0,-.68,2.25),.43,.43),((0,-.99,2.63),.43,.40),((0,-1.25,2.91),.42,.41)],skin))
    parts.append(ellipsoid('Lumbar transition',(0,.74,1.97),(.53,.68,.52),skin))
    parts += [ellipsoid('Juvenile cranium',(0,-1.31,2.95),(.55,.58,.50),skin),ellipsoid('Occiput',(0,-1.06,2.90),(.49,.44,.42),skin),ellipsoid('Muzzle bridge',(0,-1.78,2.76),(.33,.49,.27),skin),ellipsoid('Mandible',(0,-1.75,2.55),(.315,.43,.16),skin)]
    for side in [-1,1]:
        parts += [ellipsoid('Cheek',(side*.33,-1.49,2.73),(.24,.30,.29),skin),ellipsoid('Whisker bed',(side*.18,-1.96,2.66),(.21,.29,.19),skin)]
        # Mildly staggered feet and unequal shoulder volume, with no mirrored data.
        dy=.035 if side==1 else 0
        parts.append(ellipsoid('Shoulder muscle',(side*.35,-.42,1.88),(.29,.39,.43),skin))
        parts.append(tube('Forelimb', [((side*.33,-.40,2.03),.24,.28),((side*.42,-.43,1.60),.225,.245),((side*.44,-.43,1.15),.175,.18),((side*.43,-.52,.71),.145,.145),((side*.43,-.58+dy,.29),.135,.15)],skin))
        parts.append(ellipsoid('Forepaw',(side*.44,-.73+dy,.16),(.205,.285,.165),skin))
        parts.append(ellipsoid('Carpal transition',(side*.43,-.59+dy,.30),(.138,.16,.21),skin))
        parts.append(ellipsoid('Haunch muscle',(side*.36,1.02,1.72),(.32,.42,.48),skin))
        parts.append(tube('Hindlimb', [((side*.35,1.00,1.95),.26,.34),((side*.45,.88,1.48),.255,.29),((side*.49,.76,1.16),.20,.22),((side*.48,1.15,.66),.14,.15),((side*.48,1.13,.28),.12,.135)],skin))
        parts.append(ellipsoid('Hindpaw',(side*.49,1.00,.15),(.185,.26,.16),skin))
        parts.append(ellipsoid('Hock transition',(side*.48,1.10,.30),(.13,.145,.20),skin))
        for limb,yy,xx in [('Front',-.87+dy,.44),('Hind',.85,.49)]:
            for j in range(4):parts.append(ellipsoid(limb+' toe',(side*xx+(j-1.5)*.087,yy-.025*math.sin((j+.5)*math.pi/4),.105),(.058,.127,.09),skin,24))
    parts.append(tube('Otter tail',[((0,1.45,2.03),.20,.19),((.01,1.77,2.10),.15,.145),((.03,2.08,2.19),.115,.11),((.06,2.38,2.23),.075,.075),((.09,2.56,2.30),.016,.019)],skin))
    body=merge_sculpt('Puppy_Sculpt',parts,.018)
    # Broad floppy ear leaves: curved thickness and uneven tip height.
    for side in [-1,1]:
        rings=[]
        for z,x,y,rx,ry in [(3.22,.45,-1.22,.08,.18),(3.11,.58,-1.28,.10,.29),(2.96,.64,-1.36,.09,.30),(2.77,.65,-1.42,.075,.25),(2.60,.59,-1.51,.067,.19),(2.51,.52,-1.53,.035,.07)]:
            rings.append(((side*x,y,z+(.018 if side==1 else 0)),rx,ry))
        ear=tube('Ear_'+('L' if side<0 else 'R'),rings,skin,32)
        active(ear);m=ear.modifiers.new('Soft ear fold','SUBSURF');m.levels=2;bpy.ops.object.modifier_apply(modifier=m.name)
    marker=material('Temporary eye landmarks',(.045,.026,.015),.3)
    for side in [-1,1]:ellipsoid('Eye_landmark',(side*.345,-1.773,3.00),(.088,.078,.071),marker)
    ellipsoid('Nose_landmark',(0,-2.246,2.766),(.19,.105,.118),marker)
    for o in list(bpy.context.scene.objects):
        if o.type!='MESH':continue
        inv=o.matrix_world.inverted()
        for v in o.data.vertices:
            p=o.matrix_world@v.co;t=max(0,min(1,(p.z/S-2.15)/.55));p.z-=.16*S*t;v.co=inv@p
    studio();save(1)
    render('front',1);render('side',1);render('three-quarter',1)

def difference(o,cutter):
    active(o);m=o.modifiers.new('Sculpted cavity','BOOLEAN');m.operation='DIFFERENCE';m.solver='EXACT';m.object=cutter
    bpy.ops.object.modifier_apply(modifier=m.name);bpy.data.objects.remove(cutter,do_unlink=True)

def eye_cap(name,cx,cz,r,depth,mat):
    # A curved spherical patch, so the iris stays behind the eyelids at its edge.
    n=64;steps=12;verts=[(cx,-1.716-depth,cz)];faces=[]
    for k in range(1,steps+1):
        rad=r*k/steps
        for j in range(n):
            a=j*math.tau/n;dx=rad*math.cos(a);dz=rad*math.sin(a)
            y=-1.716-depth*math.sqrt(max(.001,1-(dx/.124)**2-(dz/.114)**2))
            verts.append((cx+dx,y,cz+dz))
    for j in range(n):faces.append((0,1+j,1+(j+1)%n))
    for k in range(steps-1):
        for j in range(n):a=1+k*n+j;b=1+k*n+(j+1)%n;faces.append((a,b,b+n,a+n))
    o=mesh(name,verts,faces,mat);active(o);m=o.modifiers.new('Closed patch backing','SOLIDIFY');m.thickness=.0001;m.offset=-1
    return o

def stage2():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'01.blend'))
    body=bpy.data.objects['Puppy_Sculpt'];skin=bpy.data.materials['Puppy skin']
    for o in list(bpy.context.scene.objects):
        if 'landmark' in o.name:bpy.data.objects.remove(o,do_unlink=True)
    black=material('Nose leather',(.017,.014,.013),.34)
    lips=material('Lip pigment',(.022,.016,.014),.4)
    wet=material('Tear line',(.037,.022,.018),.18)
    sclera=material('Sclera',(.10,.072,.045),.36)
    iris=material('Iris amber brown',(.105,.044,.014),.43)
    pupil=material('Pupil',(.001,.0007,.0005),.24)
    cornea=material('Cornea',(.98,.98,.98),.065)
    p=cornea.node_tree.nodes.get('Principled BSDF');p.inputs['Transmission Weight'].default_value=1;p.inputs['IOR'].default_value=1.376
    pink=material('Inner ear skin',(.34,.22,.20),.63)
    for side in [-1,1]:
        cx=side*.345;cz=2.84+(side*.003)
        cutter=ellipsoid('Eye socket cutter',(cx,-1.77,cz),(.134,.18,.107),segments=48);difference(body,cutter)
        eye=ellipsoid('Eye_'+str(side)+'_sclera',(cx,-1.716,cz),(.123,.123,.113),sclera,48)
        eye['component']='sclera'
        iris_obj=eye_cap('Eye_'+str(side)+'_iris',cx,cz,.105,.1235,iris)
        iris_obj['component']='iris'
        eye_cap('Eye_'+str(side)+'_pupil',cx,cz,.057,.124,pupil)
        # Closed thin corneal shell; the inner surface has reversed winding.
        cap=eye_cap('Eye_'+str(side)+'_cornea',cx,cz,.11,.126,cornea)
        cap.modifiers[0].name='Actual corneal thickness 0.35mm';cap.modifiers[0].thickness=.00035
        # Concentric eyelid rings with an almond opening and a closed back rim.
        v=[];f=[];N=64
        bm=bmesh.new();bm.from_mesh(body.data);bvh=BVHTree.FromBMesh(bm);bm.free()
        for ring in range(4):
            grow=ring*.022
            for j in range(N):
                a=j*math.tau/N;dx=(.113+grow)*math.cos(a);dz=(.063+grow)*math.sin(a)
                dz+=side*dx*.10
                y=-1.784-.063*abs(math.sin(a)) + .015*(ring/3)
                hit=bvh.ray_cast(Vector((cx+dx,-2.5,cz+dz))*S,Vector((0,1,0)))
                if hit[0] is not None:y=y*(1-(ring/3)**2)+(hit[0].y/S-.002)*(ring/3)**2
                v.append((cx+dx,y,cz+dz))
        for k in range(3):
            for j in range(N):a=k*N+j;b=k*N+(j+1)%N;f.append((a,b,b+N,a+N))
        lid=mesh('Eye_'+str(side)+'_quad_lids',v,f,skin);lid['component']='quad eyelid loops'
        active(lid);m=lid.modifiers.new('Eyelid thickness','SOLIDIFY');m.thickness=.001;m.offset=0
        m=lid.modifiers.new('Lid smoothing','SUBSURF');m.levels=1
        coords=[]
        for j in range(65):
            a=j*math.tau/64;dx=.113*math.cos(a);dz=.063*math.sin(a)+side*dx*.10
            coords.append((cx+dx,-1.785-.063*abs(math.sin(a)),cz+dz))
        stroke('Eye_'+str(side)+'_wet_margin',coords,.0065,wet)
        # Ear interior recessed on the medial fold, not a pink plate on the outside.
        ear=ellipsoid('Ear_'+str(side)+'_concha',(side*.50,-1.485,2.65),(.045,.12,.16),pink)
        ear['component']='ear interior'
    nose=ellipsoid('Nose',(0,-2.242,2.606),(.185,.113,.117),black,64)
    for v in nose.data.vertices:
        z=v.co.z/(.117*S);v.co.x*=.9+.16*z
    for side in [-1,1]:
        cutter=ellipsoid('Nostril cavity',(side*.105,-2.328,2.62),(.046,.084,.023),segments=40)
        cutter.rotation_euler.y=side*.20;difference(nose,cutter)
    stroke('Nasal philtrum',[(0,-2.347,2.61),(0,-2.344,2.55),(0,-2.31,2.515)],.006,black)
    for side in [-1,1]:
        stroke('Upper lip_'+str(side),[(0,-2.285,2.455),(side*.12,-2.263,2.439),(side*.24,-2.15,2.43),(side*.30,-1.98,2.44),(side*.335,-1.80,2.46)],.009,lips)
    # Closed-mouth cavity: separate internal oral parts are present in the deliverable.
    difference(body,ellipsoid('Oral cavity cutter',(0,-1.94,2.408),(.255,.29,.012),segments=48))
    gums=material('Gums',(.30,.10,.095),.43);tongue=material('Tongue',(.43,.17,.17),.48)
    ellipsoid('Gums_upper',(0,-1.88,2.43),(.21,.24,.019),gums)
    ellipsoid('Tongue',(0,-1.83,2.402),(.18,.20,.012),tongue)
    pads=material('Paw pads',(.085,.064,.06),.63);claws=material('Claw keratin',(.28,.23,.17),.43)
    for side in [-1,1]:
        for yy,xx,label in [(-.73+(.035 if side==1 else 0),.44,'Front'),(1.0,.49,'Hind')]:
            ellipsoid(label+str(side)+'_metacarpal_pad',(side*xx,yy+.02,.028),(.105,.105,.023),pads)
            for j in range(4):
                x=side*xx+(j-1.5)*.087
                ellipsoid(label+str(side)+'_digital_pad_'+str(j),(x,yy-.13,.029),(.038,.052,.024),pads,24)
                claw=tube(label+str(side)+'_claw_'+str(j),[((x,yy-.20,.115),.025,.025),((x,yy-.26,.09),.021,.02),((x,yy-.29,.065),.007,.006)],claws,16)
                active(claw);m=claw.modifiers.new('Keratin smoothing','SUBSURF');m.levels=2;bpy.ops.object.modifier_apply(modifier=m.name)
    # High-resolution sculpt retained separately from the later quad approximation.
    active(body);m=body.modifiers.new('Watertight sculpt reconstruction','REMESH');m.mode='VOXEL';m.voxel_size=.010*S;bpy.ops.object.modifier_apply(modifier=m.name)
    bm=bmesh.new();bm.from_mesh(body.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(body.data);bm.free()
    m=body.modifiers.new('Sculpt surface relaxation','SMOOTH');m.factor=.5;m.iterations=2;bpy.ops.object.modifier_apply(modifier=m.name)
    studio();save(2);render('front',2);render('side',2);render('face',2)

def stage3():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'02.blend'))
    hi=bpy.data.objects['Puppy_Sculpt'];hi.name='Puppy_HighPoly'
    base=hi.copy();base.data=hi.data.copy();bpy.context.scene.collection.objects.link(base);base.name='Puppy_RenderMesh'
    hi.hide_render=True;hi.hide_set(True);hi['role']='Preserved high-resolution sculpt'
    active(base)
    print('QUADRIFLOW_START',len(base.data.polygons),flush=True)
    bpy.ops.object.quadriflow_remesh(target_faces=20000,use_mesh_symmetry=False,use_preserve_sharp=False,use_preserve_boundary=True,smooth_normals=True,seed=73)
    print('QUADRIFLOW_END',len(base.data.polygons),flush=True)
    if len(base.data.polygons)>50000:raise RuntimeError('QuadriFlow did not produce the requested cage; repair the input before continuing.')
    # Replace the thin tail end with explicit longitudinal quad rings. Automated
    # remeshing can pinch a tail whose diameter is below the target edge length.
    bm=bmesh.new();bm.from_mesh(base.data)
    cut=bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,plane_co=(0,1.69*S,0),plane_no=(0,1,0),clear_outer=True,clear_inner=False)
    boundary=[e for e in bm.edges if e.is_boundary and all(abs(v.co.y-1.69*S)<.00001 for v in e.verts)]
    if boundary:
        ring=boundary
        for yy,cx,cz,rad in [(1.80,.012,2.11,.145),(2.03,.027,2.16,.117),(2.26,.047,2.21,.082),(2.44,.071,2.25,.047),(2.56,.086,2.29,.010)]:
            oldverts=set(v for e in ring for v in e.verts);center=sum((v.co for v in oldverts),Vector())/len(oldverts)
            ex=bmesh.ops.extrude_edge_only(bm,edges=ring);newverts=[v for v in ex['geom'] if isinstance(v,bmesh.types.BMVert)]
            for v in newverts:
                a=math.atan2(v.co.z-center.z,v.co.x-center.x);v.co=(S*(cx+rad*math.cos(a)),S*yy,S*(cz+rad*math.sin(a)))
            newset=set(newverts);ring=[e for e in ex['geom'] if isinstance(e,bmesh.types.BMEdge) and all(v in newset for v in e.verts)]
        bmesh.ops.holes_fill(bm,edges=ring,sides=0)
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(base.data);bm.free()
    # Keep the cage editable and fit it back to the detailed source.
    m=base.modifiers.new('Render subdivision','SUBSURF');m.levels=1;m.render_levels=2
    m=base.modifiers.new('Sculpt surface projection','SHRINKWRAP');m.target=hi;m.wrap_method='NEAREST_SURFACEPOINT';m.wrap_mode='ON_SURFACE';m.offset=.00002
    group=base.vertex_groups.new(name='Projection excludes thin tail tip')
    for v in base.data.vertices:
        weight=max(0,min(1,(1.85-v.co.y/S)/.25))
        if weight>0:group.add([v.index],weight,'REPLACE')
    m.vertex_group=group.name
    # Closely opposed lip surfaces folded under nearest-surface projection in QA.
    # The quad cage already follows the source; retain the modifier disabled.
    m.show_viewport=False;m.show_render=False
    base['retopology']='QuadriFlow initial cage; not certified as an animation production mesh'
    for o in list(bpy.context.scene.objects):
        if o.type=='CURVE' and not o.get('studio'):
            o.data.use_fill_caps=True;active(o);bpy.ops.object.convert(target='MESH')
            bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
            m=o.modifiers.new('Watertight thin tissue','REMESH');m.mode='VOXEL';m.voxel_size=.00016;bpy.ops.object.modifier_apply(modifier=m.name)
            for p in o.data.polygons:p.use_smooth=True
    nose=bpy.data.objects['Nose'];active(nose)
    m=nose.modifiers.new('Nostril surface cleanup','REMESH');m.mode='VOXEL';m.voxel_size=.00026;bpy.ops.object.modifier_apply(modifier=m.name)
    m=nose.modifiers.new('Nasal surface relaxation','SMOOTH');m.factor=.35;m.iterations=2;bpy.ops.object.modifier_apply(modifier=m.name)
    for p in nose.data.polygons:p.use_smooth=True
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.context.scene.objects:
        if o.type=='MESH' and not o.get('studio') and o!=hi:o.select_set(True)
    bpy.context.view_layer.objects.active=base;bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(island_margin=.012);bpy.ops.object.mode_set(mode='OBJECT')
    report={'high_poly_faces':len(hi.data.polygons),'render_cage_faces':len(base.data.polygons),'render_cage_quads':sum(len(p.vertices)==4 for p in base.data.polygons),'facial_loops':'Separate concentric quad eyelid strips','deformation_status':'Unverified. Automated cage is not equivalent to hand-directed facial and joint retopology.'}
    (ROOT/'reports'/'03-topology.json').write_text(json.dumps(report,indent=2),encoding='utf8')
    studio();save(3);render('front',3);render('side',3)

def procedural_materials():
    mats=[m for m in bpy.data.materials if m.use_nodes and m.name not in ['Studio warm grey','Temporary eye landmarks']]
    sockets={}
    for m in mats:
        n=m.node_tree.nodes;l=m.node_tree.links;p=n.get('Principled BSDF')
        if not p:continue
        pos=n.new('ShaderNodeNewGeometry');fine=n.new('ShaderNodeTexNoise');fine.inputs['Scale'].default_value=1900;fine.inputs['Detail'].default_value=2
        l.new(pos.outputs['Position'],fine.inputs['Vector'])
        broad=n.new('ShaderNodeTexNoise');broad.inputs['Scale'].default_value=35;broad.inputs['Detail'].default_value=3;l.new(pos.outputs['Position'],broad.inputs['Vector'])
        color=n.new('ShaderNodeValToRGB');c=tuple(p.inputs['Base Color'].default_value[:3])
        if m.name=='Puppy skin':
            c=(.62,.54,.45);a=(.39,.31,.28);b=(.69,.63,.54);p.inputs['Subsurface Weight'].default_value=.055
        elif m.name=='Nose leather':a=(.009,.007,.007);b=(.028,.022,.021)
        else:a=tuple(v*.78 for v in c);b=tuple(min(1,v*1.12+.003) for v in c)
        color.color_ramp.elements[0].color=(*a,1);color.color_ramp.elements[1].color=(*b,1);l.new(broad.outputs['Fac'],color.inputs[0]);l.new(color.outputs[0],p.inputs['Base Color'])
        height=fine.outputs['Fac']
        if m.name=='Nose leather':
            cells=n.new('ShaderNodeTexVoronoi');cells.feature='DISTANCE_TO_EDGE';cells.inputs['Scale'].default_value=1850;l.new(pos.outputs['Position'],cells.inputs['Vector']);height=cells.outputs['Distance']
        if m.name=='Iris amber brown':
            sep=n.new('ShaderNodeSeparateXYZ');l.new(pos.outputs['Position'],sep.inputs[0])
            def mathnode(op,a,b=None):
                q=n.new('ShaderNodeMath');q.operation=op
                if hasattr(a,'node'):l.new(a,q.inputs[0])
                else:q.inputs[0].default_value=a
                if b is not None:
                    if hasattr(b,'node'):l.new(b,q.inputs[1])
                    else:q.inputs[1].default_value=b
                return q.outputs[0]
            dx=mathnode('SUBTRACT',mathnode('ABSOLUTE',sep.outputs['X']),.0345);dz=mathnode('SUBTRACT',sep.outputs['Z'],.284)
            angle=mathnode('ARCTAN2',dz,dx);fibres=mathnode('SINE',mathnode('MULTIPLY',angle,137))
            l.new(fibres,color.inputs[0]);color.color_ramp.elements[0].color=(.016,.007,.003,1);color.color_ramp.elements[1].color=(.12,.051,.015,1)
        rough=n.new('ShaderNodeMapRange');rough.inputs['From Min'].default_value=0;rough.inputs['From Max'].default_value=1
        rv=p.inputs['Roughness'].default_value;rough.inputs['To Min'].default_value=max(.03,rv-.07);rough.inputs['To Max'].default_value=min(1,rv+.07)
        l.new(fine.outputs['Fac'],rough.inputs['Value']);l.new(rough.outputs[0],p.inputs['Roughness'])
        bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.32;bump.inputs['Distance'].default_value=.00022 if m.name=='Nose leather' else .00007
        l.new(height,bump.inputs['Height'])
        if m.name not in ['Cornea','Pupil','Sclera']:l.new(bump.outputs[0],p.inputs['Normal'])
        sockets[m.name]={'BaseColor':color.outputs[0],'Roughness':rough.outputs[0],'Displacement':height}
    return sockets

def stage4():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'03.blend'))
    # QA found a sub-millimetre folded quad at the inner left stifle.
    body=bpy.data.objects['Puppy_RenderMesh'];bm=bmesh.new();bm.from_mesh(body.data)
    center=Vector((-.0285,.077,.1125));local=[v for v in bm.verts if (v.co-center).length<.008]
    for _ in range(5):bmesh.ops.smooth_vert(bm,verts=local,factor=.5,use_axis_x=True,use_axis_y=True,use_axis_z=True)
    bm.to_mesh(body.data);bm.free()
    sockets=procedural_materials();scene=bpy.context.scene
    # Freeze evaluated model pieces and bake their shared non-overlapping UV atlas.
    source=[o for o in scene.objects if o.type=='MESH' and not o.get('studio') and not o.hide_render]
    dg=bpy.context.evaluated_depsgraph_get();copies=[]
    for o in source:
        ev=o.evaluated_get(dg);d=bpy.data.meshes.new_from_object(ev);c=bpy.data.objects.new('Bake_'+o.name,d);scene.collection.objects.link(c);c.matrix_world=o.matrix_world;copies.append(c)
        o.hide_render=True
    bpy.ops.object.select_all(action='DESELECT')
    for o in copies:o.select_set(True)
    bpy.context.view_layer.objects.active=copies[0];bpy.ops.object.join();bake=bpy.context.object;bake.name='Temporary texture baker'
    mats=list(bake.data.materials);saved={};emit={}
    for m in mats:
        if not m or m.name in saved:continue
        n=m.node_tree.nodes;l=m.node_tree.links;out=n.get('Material Output');saved[m.name]=out.inputs['Surface'].links[0].from_socket
        emit[m.name]=n.new('ShaderNodeEmission')
    scene.cycles.samples=8;scene.render.bake.margin=12;scene.render.bake.use_selected_to_active=False
    images={}
    for kind in ['BaseColor','Roughness','Normal','Displacement']:
        img=bpy.data.images.new('Puppy_'+kind+'_4K',width=4096,height=4096,alpha=False,float_buffer=False)
        if kind!='BaseColor':img.colorspace_settings.name='Non-Color'
        for m in mats:
            if not m:continue
            n=m.node_tree.nodes;l=m.node_tree.links;out=n.get('Material Output')
            for old in list(out.inputs['Surface'].links):l.remove(old)
            if kind=='Normal':l.new(saved[m.name],out.inputs['Surface'])
            else:
                e=emit[m.name]
                for old in list(e.inputs[0].links):l.remove(old)
                l.new(sockets[m.name][kind],e.inputs[0]);l.new(e.outputs[0],out.inputs['Surface'])
            tex=n.new('ShaderNodeTexImage');tex.name='BAKE_TARGET_'+kind;tex.image=img;n.active=tex
        active(bake);bpy.ops.object.bake(type='NORMAL' if kind=='Normal' else 'EMIT',normal_space='TANGENT')
        img.filepath_raw=str(ROOT/'textures'/f'Puppy_{kind}_4K.png');img.file_format='PNG';img.save();images[kind]=img
        print('TEXTURE_BAKED',kind,flush=True)
    for m in mats:
        if not m:continue
        n=m.node_tree.nodes;l=m.node_tree.links;out=n.get('Material Output');p=n.get('Principled BSDF')
        for old in list(out.inputs['Surface'].links):l.remove(old)
        l.new(saved[m.name],out.inputs['Surface'])
        if m.name=='Cornea':continue
        for kind in ['BaseColor','Roughness']:
            tex=n.new('ShaderNodeTexImage');tex.image=images[kind];tex.label='Baked shared UV atlas';l.new(tex.outputs['Color'],p.inputs['Base Color' if kind=='BaseColor' else 'Roughness'])
        tex=n.new('ShaderNodeTexImage');tex.image=images['Normal'];norm=n.new('ShaderNodeNormalMap');l.new(tex.outputs['Color'],norm.inputs['Color']);l.new(norm.outputs[0],p.inputs['Normal'])
        tex=n.new('ShaderNodeTexImage');tex.image=images['Displacement'];disp=n.new('ShaderNodeDisplacement');disp.inputs['Scale'].default_value=.00012;disp.inputs['Midlevel'].default_value=.5
        l.new(tex.outputs['Color'],disp.inputs['Height']);l.new(disp.outputs[0],out.inputs['Displacement'])
    bpy.data.objects.remove(bake,do_unlink=True)
    for o in source:o.hide_render=False
    for img in images.values():img.filepath='//../textures/'+Path(img.filepath).name
    studio();save(4);render('front',4);render('side',4);render('face',4)

def hair_material(name,root,tip):
    m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;l=m.node_tree.links;n.clear()
    out=n.new('ShaderNodeOutputMaterial');p=n.new('ShaderNodeBsdfHairPrincipled');p.parametrization='COLOR'
    p.inputs['Roughness'].default_value=.38;p.inputs['Radial Roughness'].default_value=.62
    info=n.new('ShaderNodeHairInfo');ramp=n.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].color=(*root,1);ramp.color_ramp.elements[1].color=(*tip,1)
    l.new(info.outputs['Intercept'],ramp.inputs[0]);mix=n.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=.13
    l.new(ramp.outputs[0],mix.inputs[1]);l.new(info.outputs['Random'],mix.inputs[2]);l.new(mix.outputs[0],p.inputs['Color']);l.new(p.outputs[0],out.inputs['Surface'])
    return m

def curves_object(name,points,radii,mat,surface=None):
    import numpy as np
    count,segments,_=points.shape;c=bpy.data.hair_curves.new(name);c.add_curves([segments]*count)
    c.attributes['position'].data.foreach_set('vector',np.asarray(points,dtype=np.float32).reshape(-1))
    rad=c.attributes.new('radius','FLOAT','POINT');rad.data.foreach_set('value',np.asarray(radii,dtype=np.float32).reshape(-1))
    c.materials.append(mat);o=bpy.data.objects.new(name,c);bpy.context.scene.collection.objects.link(o)
    if surface:c.surface=surface
    o['strand_count']=count;o['segments_per_strand']=segments
    return o

def groom_surface(surface,count,mat,seed):
    import numpy as np
    rng=np.random.default_rng(seed);dg=bpy.context.evaluated_depsgraph_get();ev=surface.evaluated_get(dg);me=ev.to_mesh();me.calc_loop_triangles()
    xyz=np.array([surface.matrix_world@v.co for v in me.vertices],dtype=np.float32)
    normals=np.array([v.normal for v in me.vertices],dtype=np.float32)
    tris=np.array([t.vertices[:] for t in me.loop_triangles],dtype=np.int32);q=xyz[tris]
    area=np.linalg.norm(np.cross(q[:,1]-q[:,0],q[:,2]-q[:,0]),axis=1);cdf=np.cumsum(area);cdf/=cdf[-1]
    ids=np.searchsorted(cdf,rng.random(count));u=np.sqrt(rng.random(count));v=rng.random(count);bary=np.stack([1-u,u*(1-v),u*v],axis=1)
    roots=(q[ids]*bary[:,:,None]).sum(axis=1);norm=(normals[tris[ids]]*bary[:,:,None]).sum(axis=1);norm/=np.maximum(1e-9,np.linalg.norm(norm,axis=1))[:,None]
    p=roots/S;ear=surface.name.startswith('Ear_');lids='quad_lids' in surface.name
    mask=p[:,2]>.065
    if not ear and not lids:
        for side in [-1,1]:
            eye=((p[:,0]-side*.345)/.135)**2+((p[:,2]-2.84)/.098)**2
            mask &= ~((p[:,1]<-1.55)&(eye<1.03))
        mask &= ~((p[:,1]<-2.1)&(np.abs(p[:,0])<.20)&(p[:,2]>2.50)&(p[:,2]<2.74))
        mask &= ~((p[:,1]<-1.82)&(np.abs(p[:,2]-2.43)<.02))
    roots=roots[mask];norm=norm[mask];p=p[mask];count=len(p)
    flow=np.zeros_like(p);flow[:,1]=1;flow[:,2]=-.25
    length=np.full(count,.066)
    head=(p[:,1]<-1.05)&(p[:,2]>2.25);flow[head,0]=p[head,0]*1.4;flow[head,1]=.8;flow[head,2]=np.where(p[head,2]>2.86,.35,-.45);length[head]=.032
    muzzle=(p[:,1]<-1.73)&(p[:,2]<2.83);length[muzzle]=.012
    chest=(p[:,1]<-.30)&(p[:,1]>-1.1)&(p[:,2]>1.25)&(p[:,2]<2.5);flow[chest,2]=-.95;length[chest]=.085
    legs=(p[:,2]<1.30)&(np.abs(p[:,0])>.26);flow[legs]=(0,.1,-1);length[legs]=.034
    paws=p[:,2]<.30;length[paws]=.020;flow[paws]=(0,-.7,-.5)
    tail=p[:,1]>1.6;flow[tail]=(0,1,.15);length[tail]=.047
    if ear:flow[:]=(0,-.1,-1);length[:]=.024
    if lids:length[:]=.008
    # An undercoat population sits below individually varied guard hairs.
    under=rng.random(count)<.42;length[under]*=.63
    length*=rng.uniform(.72,1.27,count);length*=S
    tangent=flow-norm*(flow*norm).sum(axis=1)[:,None]
    fallback=np.cross(norm,np.tile((1,0,0),(count,1)));small=np.linalg.norm(tangent,axis=1)<.02;tangent[small]=fallback[small]
    tangent/=np.maximum(1e-9,np.linalg.norm(tangent,axis=1))[:,None]
    across=np.cross(norm,tangent)
    # Coherent low-frequency clumping plus small strand-level roughness.
    clump=.13*np.sin(p[:,0]*47+p[:,1]*23+p[:,2]*39)+rng.normal(0,.06,count)
    ts=np.linspace(0,1,6,dtype=np.float32);pts=[]
    for t in ts:
        h=length*(.34*t-.22*t*t);along=length*t
        co=roots+norm*(h+.000006)[:,None]+tangent*along[:,None]+across*(length*clump*t*t)[:,None]
        co+=norm*(length*.025*np.sin(t*math.pi*2+rng.uniform(0,math.tau,count))*t)[:,None];pts.append(co)
    pts=np.stack(pts,axis=1);root_radius=rng.uniform(.000020,.000033,count);root_radius[under]*=.75
    radii=root_radius[:,None]*(1-.94*ts[None,:])**1.2
    o=curves_object('Groom_'+surface.name,pts,radii,mat,surface);o['region_lengths_mm']='muzzle 1.2; paws 2; head 3.2; body 6.6; chest 8.5, before per-strand variation'
    ev.to_mesh_clear();return count

def stage5():
    import numpy as np
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'04.blend'))
    hair=hair_material('Labrador cream guard hair',(.53,.47,.37),(.82,.78,.67))
    counts={}
    for name,count in [('Puppy_RenderMesh',460000),('Ear_L',28000),('Ear_R',28000),('Eye_-1_quad_lids',3500),('Eye_1_quad_lids',3500)]:
        o=bpy.data.objects.get(name)
        if o:counts[name]=groom_surface(o,count,hair,71+len(counts));print('GROOM_READY',name,counts[name],flush=True)
    whisker_mat=hair_material('Whisker ivory',(.33,.28,.20),(.73,.69,.57));points=[];radii=[]
    surface=bpy.data.objects['Puppy_RenderMesh'];ev=surface.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();bm=bmesh.new();bm.from_mesh(me);root_bvh=BVHTree.FromBMesh(bm);bm.free();ev.to_mesh_clear()
    def attach_root(root):
        hit=root_bvh.ray_cast(Vector((root.x,-2.7,root.z))*S,Vector((0,1,0)))
        if hit[0] is not None:root.y=hit[0].y/S-.00025
        return root
    for side in [-1,1]:
        for j in range(9):
            root=attach_root(Vector((side*(.18+.012*(j%3)),-2.08+.047*(j//3),2.56+.035*(j%3))))
            vec=Vector((side*(.26+.025*j),-.09+.018*j,.02-.017*(j%3)))
            points.append([(root+vec*t+Vector((0,0,-.065*t*t)))*S for t in np.linspace(0,1,8)])
            radii.append([.000035*(1-.96*t) for t in np.linspace(0,1,8)])
        for j in range(4):
            root=attach_root(Vector((side*(.31+j*.023),-1.76,2.956)));vec=Vector((side*.09,-.10,.09+j*.012))
            points.append([(root+vec*t)*S for t in np.linspace(0,1,8)]);radii.append([.000022*(1-.96*t) for t in np.linspace(0,1,8)])
    curves_object('Separate whisker and brow guides',np.array(points),np.array(radii),whisker_mat)
    (ROOT/'reports'/'05-groom.json').write_text(json.dumps({'strands':counts,'whisker_brow_guides':len(points),'method':'Blender native Hair Curves, region-dependent flow and length, two coat populations, tapered radii'},indent=2),encoding='utf8')
    studio();save(5);render('front',5);render('side',5);render('face',5)

def stage6():
    import shutil
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'05.blend'))
    studio()
    for view in ['front','side','rear','face','three-quarter']:
        render(view,final=True)
        if view in ['front','side']:shutil.copyfile(ROOT/'previews'/f'{view}.png',ROOT/'previews'/f'06-{view}.png')
        c=bpy.context.scene.camera.copy();c.data=c.data.copy();c.name='Camera_'+view;c['studio']=True;bpy.context.scene.collection.objects.link(c)
    # Relative texture paths work in both stages/ and exports/.
    bpy.context.scene['asset_status']='Appearance study; commercial photoreal and deformation criteria remain unfulfilled. See README and reports.'
    save(6)
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports'/'labrador-puppy-fur.blend'),compress=True)
    sys.path.insert(0,str(ROOT));from audit import audit
    audit(ROOT)
    for o in list(bpy.context.scene.objects):
        if o.type=='CURVES':bpy.data.objects.remove(o,do_unlink=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports'/'labrador-puppy-base.blend'),compress=True)
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.context.scene.objects:
        if o.type=='MESH' and not o.get('studio') and not o.hide_render:o.select_set(True)
    bpy.ops.wm.obj_export(filepath=str(ROOT/'exports'/'labrador-puppy.obj'),export_selected_objects=True,apply_modifiers=True,export_eval_mode='DAG_EVAL_VIEWPORT',export_uv=True,export_normals=True,export_materials=True,export_pbr_extensions=True,path_mode='RELATIVE')
    print('DELIVERABLES_EXPORTED',flush=True)

if __name__=='__main__':
    {1:stage1,2:stage2,3:stage3,4:stage4,5:stage5,6:stage6}[STAGE]()
