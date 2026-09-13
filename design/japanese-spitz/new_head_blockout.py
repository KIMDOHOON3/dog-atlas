"""Fresh native Blender head blockout. No inherited head deformation or groom.

The photographs show fur; the underlying cranial widths are inferred, not measured.
All original body and head studies remain on disk unchanged.
"""
import bpy,bmesh,math,json,hashlib,importlib.util
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'head-blockout'
for d in ['exports','previews','reports']:(OUT/d).mkdir(parents=True,exist_ok=True)
s=importlib.util.spec_from_file_location('head_helpers',ROOT/'build_blender.py')
b=importlib.util.module_from_spec(s);s.loader.exec_module(b);b.PREFIX='Head study | '
P=b.PREFIX

def normals(obj):
    bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(obj.data);bm.free();obj.data.update()

def mesh(name,vertices,faces,mat):
    data=bpy.data.meshes.new(P+name);data.from_pydata(vertices,[],faces);data.update()
    obj=bpy.data.objects.new(P+name,data);bpy.context.scene.collection.objects.link(obj);b.smooth(obj,mat);normals(obj);return obj

def loft(name,sections,mat,steps=64,sub=8):
    # y, half-width, top, bottom. Each ring gives the frontal and profile shape.
    rings=b.sample_path(sections,sub);verts=[];faces=[]
    for y,width,top,bottom in rings:
        centre=(top+bottom)*.5;radius=(top-bottom)*.5
        for j in range(steps):
            t=math.tau*j/steps
            x=width*math.cos(t);z=centre+radius*math.sin(t)
            verts.append((x,y,z))
    for i in range(len(rings)-1):
        for j in range(steps):
            a=i*steps+j;q=i*steps+(j+1)%steps;faces.append((a,q,q+steps,a+steps))
    faces += [tuple(reversed(range(steps))),tuple((len(rings)-1)*steps+j for j in range(steps))]
    return mesh(name,verts,faces,mat)

def boolean(obj,tool,operation='DIFFERENCE'):
    bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);bpy.context.view_layer.objects.active=obj
    modifier=obj.modifiers.new('Local anatomical opening','BOOLEAN');modifier.operation=operation;modifier.solver='EXACT';modifier.object=tool
    bpy.ops.object.modifier_apply(modifier=modifier.name);bpy.data.objects.remove(tool,do_unlink=True);normals(obj)

def studio():
    scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48
    scene.render.resolution_x=1000;scene.render.resolution_y=900;scene.render.resolution_percentage=100
    scene.view_settings.view_transform='AgX';scene.view_settings.exposure=-.3
    scene.world=bpy.data.worlds.new('Head study world');scene.world.use_nodes=True
    bg=next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND');bg.inputs[0].default_value=(.18,.20,.21,1);bg.inputs[1].default_value=.35
    for name,loc,power,size in [('Key',(-.7,-1.0,1.1),80,.65),('Fill',(.8,-.6,.6),25,.8),('Rim',(.2,.7,.9),65,.65)]:
        data=bpy.data.lights.new(P+name,'AREA');data.energy=power;data.shape='DISK';data.size=size
        obj=bpy.data.objects.new(P+name,data);scene.collection.objects.link(obj);obj.location=loc
        obj.rotation_euler=(Vector((0,-.27,.46))-obj.location).to_track_quat('-Z','Y').to_euler()
    bpy.ops.object.camera_add();scene.camera=bpy.context.object;scene.camera.name=P+'Camera';scene.camera.data.type='ORTHO'
    try:
        pref=bpy.context.preferences.addons['cycles'].preferences;pref.compute_device_type='OPTIX';pref.get_devices()
        for device in pref.devices:device.use=device.type=='OPTIX'
        if any(d.use for d in pref.devices):scene.cycles.device='GPU'
    except Exception:pass

def build():
    # Clear only the new in-memory working scene after the caller saved a backup.
    for obj in list(bpy.context.scene.objects):bpy.data.objects.remove(obj,do_unlink=True)
    clay=b.material('Neutral clay',(.39,.43,.44),.84)
    eyeclay=b.material('Eye clay',(.28,.32,.33),.72)
    sections=[(-.175,.029,.472,.398),(-.211,.043,.496,.404),(-.244,.045,.501,.412),(-.271,.040,.488,.414),(-.291,.030,.466,.417),(-.307,.024,.452,.421),(-.321,.021,.446,.423),(-.336,.016,.442,.426),(-.343,.011,.440,.428)]
    head=loft('Cranium and muzzle',sections,clay)
    # Restrained open jaw, following a curved lip path rather than a rectangular slot.
    outline=[(-.356,.428),(-.335,.428),(-.315,.427),(-.299,.425),(-.288,.424),(-.286,.418),(-.307,.402),(-.335,.408),(-.356,.414)]
    count=len(outline);vertices=[(x,y,z) for x in [-.09,.09] for y,z in outline]
    faces=[tuple(reversed(range(count))),tuple(range(count,count*2))]+[(i,(i+1)%count,(i+1)%count+count,i+count) for i in range(count)]
    tool=mesh('Oral opening tool',vertices,faces,clay);boolean(head,tool)
    jaw=loft('Mandible',[(-.257,.024,.419,.406),(-.283,.024,.416,.405),(-.307,.021,.412,.404),(-.327,.017,.416,.408),(-.338,.010,.419,.413)],clay,steps=48,sub=8)
    nose=loft('Nose landmark',[(-.335,.0135,.443,.429),(-.344,.015,.445,.427),(-.352,.012,.443,.430),(-.356,.003,.439,.435)],clay,steps=48,sub=6)
    tree=BVHTree.FromPolygons([v.co for v in head.data.vertices],[p.vertices[:] for p in head.data.polygons])
    eye_landmarks=[]
    for sign in [-1,1]:
        n=Vector((sign*.68,-.73,.02)).normalized();u=Vector((sign*.73,.68,0)).normalized();up=Vector((0,0,1))
        guess=Vector((sign*.035,-.280,.466));hit=tree.ray_cast(guess+n*.08,-n,.16)
        if hit[0] is None:raise RuntimeError('Eye surface not found')
        centre=hit[0];outline=[]
        for j in range(64):
            t=math.tau*j/64;q=centre+u*(.0107*math.cos(t))+up*(.0060*math.sin(t)*(.80+.20*abs(math.sin(t)))+.00035*math.cos(t))
            h=tree.ray_cast(q+n*.06,-n,.14)
            outline.append(h[0] if h[0] is not None else q)
        verts=[q+n*.008 for q in outline]+[q-n*.016 for q in outline]
        faces=[tuple(reversed(range(64))),tuple(range(64,128))]+[(j,(j+1)%64,(j+1)%64+64,j+64) for j in range(64)]
        cutter=mesh(f'Eye socket cutter {sign}',verts,faces,clay);boolean(head,cutter)
        eye=b.ellipsoid(f'Eye volume {sign}',centre-n*.0096,(.010,.010,.009),eyeclay)
        eye_landmarks.append({'side':sign,'surfaceCentre':list(centre),'globeCentre':list(eye.location),'apertureWidthMm':21.4,'apertureHeightMm':12.0})
    # Softly rounded ears as closed surfaces, with no fur envelope inflating the skull.
    for sign in [-1,1]:
        outline=[(sign*.014,-.230,.492),(sign*.050,-.228,.490),(sign*.048,-.224,.512),(sign*.039,-.218,.548),(sign*.020,-.226,.516)]
        ring=[]
        for i in range(5):
            a=Vector(outline[(i-1)%5]);q=Vector(outline[i]);c=Vector(outline[(i+1)%5]);d=Vector(outline[(i+2)%5])
            for k in range(16):
                t=k/16;ring.append(.5*((2*q)+(-a+c)*t+(2*a-5*q+4*c-d)*t*t+(-a+3*q-3*c+d)*t*t*t))
        centre=Vector((sign*.033,-.225,.510));verts=[];faces=[];steps=80;rings=10
        for side in [0,1]:
            offset=len(verts);verts.append(centre+Vector((0,.002 if side==0 else .008,0)))
            for r in range(1,rings+1):
                f=r/rings
                for q in ring:verts.append(centre*(1-f)+q*f+Vector((0,.002*(1-f*f) if side==0 else .002+.006*(1-f*f),0)))
            faces.extend((offset,offset+1+j,offset+1+(j+1)%steps) for j in range(steps))
            for r in range(rings-1):
                for j in range(steps):
                    a=offset+1+r*steps+j;q=offset+1+r*steps+(j+1)%steps;faces.append((a,a+steps,q+steps,q))
        size=1+rings*steps;start=1+(rings-1)*steps
        for j in range(steps):a=start+j;q=start+(j+1)%steps;faces.append((a,q,q+size,a+size))
        mesh(f'Pinna {sign}',verts,faces,clay)
    for obj in [head,jaw,nose]:
        bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001);bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.000001);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(obj.data);bm.free();obj.data.update()
    (OUT/'reports/construction.json').write_text(json.dumps({'headSectionsYWidthTopBottom':sections,'eyeLandmarks':eye_landmarks,'inferredNotMeasured':True,'noFurOrFinishedMaterials':True},indent=2),encoding='utf-8')
    studio();view();save()

def view():
    for area in bpy.context.screen.areas:
        if area.type=='VIEW_3D':
            v=area.spaces.active;v.shading.type='MATERIAL';v.overlay.show_overlays=False;v.show_gizmo=False
            v.region_3d.view_location=(0,-.269,.47);v.region_3d.view_distance=.31
            v.region_3d.view_rotation=(-Vector((.55,-1,.13))).to_track_quat('-Z','Y');v.region_3d.view_perspective='ORTHO';area.tag_redraw()
    bpy.ops.object.select_all(action='DESELECT')

def save():
    bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/09-new-head-blockout.blend'),compress=True)

def render():
    scene=bpy.context.scene
    for name,loc,target,scale in [('front',(0,-1.2,.465),(0,-.27,.465),.245),('side',(1.2,-.265,.466),(0,-.265,.466),.245),('reference-angle',(.48,-1.2,.60),(0,-.26,.466),.245)]:
        c=scene.camera;c.location=loc;c.rotation_euler=(Vector(target)-c.location).to_track_quat('-Z','Y').to_euler();c.data.ortho_scale=scale
        scene.render.filepath=str(OUT/'previews'/f'{name}.png');bpy.ops.render.render(write_still=True)
    view();save()

def verify():
    report={'meshes':[],'scope':'Fresh untextured head blockout only; no final likeness or animation claim'}
    for obj in bpy.context.scene.objects:
        if obj.type!='MESH':continue
        bm=bmesh.new();bm.from_mesh(obj.data);r={'name':obj.name,'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'zeroAreaFaces':sum(f.calc_area()<1e-12 for f in bm.faces)}
        assert r['nonManifoldEdges']==0 and r['zeroAreaFaces']==0,r;bm.free();report['meshes'].append(r)
    report['preserved07Sha256']=hashlib.sha256((ROOT/'face-integration/exports/07-face-integration.blend').read_bytes()).hexdigest()
    (OUT/'reports/verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print('NEW_HEAD_STRUCTURE_PASS')

def compare_previous():
    """Temporary imported copies only: same clay, lights and camera as the new head."""
    original=[(o,o.hide_render) for o in bpy.context.scene.objects if o.type=='MESH']
    for o,_ in original:o.hide_render=True
    stems=['Coat silhouette','Lower jaw','Nose','Soft eye -1','Soft eye 1','Integrated eyelid -1','Integrated eyelid 1','Ear cup -1','Ear cup 1']
    with bpy.data.libraries.load(str(ROOT/'face-integration/exports/07-face-integration.blend'),link=False) as (source,target):
        target.objects=['Spitz | '+name for name in stems if 'Spitz | '+name in source.objects]
    imported=[o for o in target.objects if o]
    for o in imported:
        bpy.context.scene.collection.objects.link(o);o.hide_render=False;o.hide_set(False)
        if o.name.startswith('Spitz | Coat silhouette'):
            bm=bmesh.new();bm.from_mesh(o.data)
            bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=(0,-.175,0),plane_no=(0,1,0),clear_outer=True,clear_inner=False)
            bm.to_mesh(o.data);bm.free()
    scene=bpy.context.scene;layer=bpy.context.view_layer;layer.material_override=bpy.data.materials[P+'Neutral clay']
    for name,loc,target in [('front',(0,-1.2,.465),(0,-.27,.465)),('side',(1.2,-.265,.466),(0,-.265,.466)),('reference-angle',(.48,-1.2,.60),(0,-.26,.466))]:
        c=scene.camera;c.location=loc;c.rotation_euler=(Vector(target)-c.location).to_track_quat('-Z','Y').to_euler();c.data.ortho_scale=.245
        scene.render.filepath=str(OUT/'previews'/f'previous-{name}.png');bpy.ops.render.render(write_still=True)
    layer.material_override=None
    for o in imported:bpy.data.objects.remove(o,do_unlink=True)
    for o,hidden in original:o.hide_render=hidden
    view();save()
