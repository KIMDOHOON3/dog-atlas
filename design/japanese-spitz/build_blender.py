"""Reference-led static Spitz study. Run stages in the connected Blender.

Native Blender route explicitly requested by the user; this is not a completed
img2threejs TypeScript factory or a validated animation rig.
Coordinates: X lateral, -Y muzzle direction, Z up; metres.
"""
import bpy, math, json
from pathlib import Path
from mathutils import Vector, Quaternion

ROOT=Path('C:/Users/김도훈/Desktop/강아지/design/japanese-spitz')
PREFIX='Spitz | '

def material(name,color,roughness=.62):
    m=bpy.data.materials.get(PREFIX+name) or bpy.data.materials.new(PREFIX+name)
    m.diffuse_color=(*color,1);m.use_nodes=True
    p=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
    if p is None:
        p=m.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
        output=m.node_tree.nodes.new('ShaderNodeOutputMaterial')
        m.node_tree.links.new(p.outputs['BSDF'],output.inputs['Surface'])
    p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Roughness'].default_value=roughness
    return m

def smooth(obj,mat=None):
    for p in obj.data.polygons:p.use_smooth=True
    if mat:obj.data.materials.append(mat)
    return obj

def ellipsoid(name,loc,scale,mat=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40,ring_count=24,location=loc)
    o=bpy.context.object;o.name=PREFIX+name;o.scale=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    return smooth(o,mat)

def sample_path(points,sub=6):
    out=[]
    for k in range(len(points)-1):
        a=Vector(points[max(k-1,0)]);b=Vector(points[k]);c=Vector(points[k+1]);d=Vector(points[min(k+2,len(points)-1)])
        for i in range(sub):
            t=i/sub
            out.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t))
    out.append(Vector(points[-1]));return out

def tube(name,points,mat=None,sides=24,sub=6):
    # Each authored ring: x,y,z,lateral radius, profile radius.
    rings=sample_path(points,sub);verts=[];faces=[]
    for i,r in enumerate(rings):
        tangent=Vector(rings[min(i+1,len(rings)-1)][:3])-Vector(rings[max(i-1,0)][:3]);tangent.normalize()
        side=Vector((1,0,0));side=(side-tangent*side.dot(tangent)).normalized()
        up=tangent.cross(side).normalized()
        for j in range(sides):
            angle=math.tau*j/sides
            p=Vector(r[:3])+side*max(.0006,r[3])*math.cos(angle)+up*max(.0006,r[4])*math.sin(angle)
            verts.append(p)
    for i in range(len(rings)-1):
        for j in range(sides):
            a=i*sides+j;b=i*sides+(j+1)%sides
            faces.append((a,b,b+sides,a+sides))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(rings)-1)*sides+j for j in range(sides)))
    mesh=bpy.data.meshes.new(PREFIX+name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(PREFIX+name,mesh);bpy.context.scene.collection.objects.link(o)
    return smooth(o,mat)

def merge_skin(objects):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objects:o.select_set(True)
    bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join()
    o=bpy.context.object;o.name=PREFIX+'Continuous base skin'
    o.data.remesh_voxel_size=.0024
    bpy.ops.object.voxel_remesh()
    sm=o.modifiers.new('Relax merged anatomical junctions','SMOOTH');sm.factor=.65;sm.iterations=10
    bpy.ops.object.modifier_apply(modifier=sm.name)
    smooth(o)
    return o

def setup():
    scene=bpy.context.scene
    scene.render.engine='CYCLES';scene.cycles.samples=32
    scene.render.resolution_x=1000;scene.render.resolution_y=850;scene.render.resolution_percentage=100
    scene.view_settings.view_transform='AgX';scene.view_settings.exposure=0
    scene.world=bpy.data.worlds.new(PREFIX+'Studio World');scene.world.use_nodes=True
    bg=next((n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND'),None)
    if bg is None:
        bg=scene.world.node_tree.nodes.new('ShaderNodeBackground')
        output=scene.world.node_tree.nodes.new('ShaderNodeOutputWorld')
        scene.world.node_tree.links.new(bg.outputs[0],output.inputs['Surface'])
    bg.inputs[0].default_value=(.17,.19,.20,1)
    bg.inputs[1].default_value=.35
    cream=material('Warm white coat',(.82,.80,.75),.78)
    clay=material('Anatomy clay',(.55,.62,.63),.78)
    material('Nose and lips',(.014,.012,.011),.30)
    material('Dark brown eyes',(.032,.020,.012),.18)
    material('Ear interior',(.40,.29,.25),.8)
    material('Ground',(.17,.21,.22),.85)
    for name,loc,power,size in [('Key',(1,-1.2,1.5),110,1),('Fill',(-.8,-.7,.8),65,.9),('Rim',(.2,.9,1.0),130,.7)]:
        data=bpy.data.lights.new(PREFIX+name,'AREA');data.energy=power;data.shape='DISK';data.size=size
        o=bpy.data.objects.new(PREFIX+name,data);scene.collection.objects.link(o);o.location=loc
        o.rotation_euler=(Vector((0,0,.25))-o.location).to_track_quat('-Z','Y').to_euler()
    bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.002))
    floor=bpy.context.object;floor.name=PREFIX+'Studio ground';floor.data.materials.append(material('Ground',(.17,.21,.22),.85))
    bpy.ops.object.camera_add(location=(1,-1,.6));scene.camera=bpy.context.object;scene.camera.name=PREFIX+'Review camera';scene.camera.data.type='ORTHO';scene.camera.data.ortho_scale=.80
    camera('three-quarter');view('three-quarter')

def body():
    clay=bpy.data.materials[PREFIX+'Anatomy clay'];parts=[]
    parts.append(tube('Ribcage to tucked abdomen',[(0,-.180,.285,.002,.005),(0,-.140,.283,.057,.071),(0,-.065,.283,.077,.087),(0,.075,.287,.060,.063),(0,.158,.286,.071,.079),(0,.224,.286,.003,.006)],clay,sides=40))
    parts.append(tube('Rising neck',[(0,-.060,.287,.030,.034),(0,-.137,.337,.058,.064),(0,-.200,.404,.046,.049),(0,-.234,.444,.043,.045)],clay,sides=32))
    parts.append(ellipsoid('Wedge skull',(0,-.251,.453),(.054,.065,.057),clay))
    parts.append(tube('Tapered muzzle',[(0,-.273,.441,.042,.031),(0,-.310,.434,.032,.024),(0,-.349,.436,.021,.019),(0,-.360,.438,.017,.015)],clay,sides=32))
    for sign in [-1,1]:
        x=sign*.052
        parts.append(tube(f'Foreleg {sign}',[(sign*.029,-.102,.307,.016,.025),(sign*.044,-.103,.265,.030,.033),(x,-.095,.229,.026,.030),(x,-.087,.183,.021,.022),(x,-.104,.118,.015,.016),(x,-.119,.051,.012,.014),(x,-.133,.020,.015,.017)],clay))
        parts.append(ellipsoid(f'Front paw {sign}',(x,-.144,.018),(.022,.035,.018),clay))
        parts.append(tube(f'Hindleg {sign}',[(sign*.023,.153,.316,.020,.026),(sign*.045,.146,.267,.040,.048),(sign*.059,.128,.231,.034,.040),(sign*.061,.100,.190,.027,.029),(sign*.064,.158,.143,.019,.024),(sign*.065,.197,.093,.013,.016),(sign*.064,.178,.022,.014,.016)],clay))
        parts.append(ellipsoid(f'Hind paw {sign}',(sign*.064,.162,.017),(.021,.032,.017),clay))
    skin=merge_skin(parts)
    skin['stage']='unrigged anatomical base; under-coat shape is inferred'
    view('side')
    return skin

def ear(name,sign,inner=False):
    # Closed rounded triangular wedge; inner inset follows the front-facing shell.
    inset=.68 if inner else 1
    outline=[(-.024,0),(.023,0),(.017,.020),(.008,.057),(-.011,.030)]
    base=Vector((sign*.034,-.229,.490));verts=[]
    for back in [False,True]:
        for u,z in outline:
            verts.append((base.x+sign*u*inset,base.y+(.008 if back else -.009)+z*.12+(-.0012 if inner else 0),base.z+z*inset+(.007 if inner else 0)))
    n=len(outline);faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]
    for i in range(n):faces.append((i,(i+1)%n,(i+1)%n+n,i+n))
    if sign<0:faces=[tuple(reversed(f)) for f in faces]
    mesh=bpy.data.meshes.new(PREFIX+name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(PREFIX+name,mesh);bpy.context.scene.collection.objects.link(o)
    mat=bpy.data.materials[PREFIX+('Ear interior' if inner else 'Warm white coat')];smooth(o,mat)
    bevel=o.modifiers.new('Soft ear rim','BEVEL');bevel.width=.003 if not inner else .0015;bevel.segments=3
    return o

def details():
    coat=bpy.data.materials[PREFIX+'Warm white coat'];dark=bpy.data.materials[PREFIX+'Nose and lips'];eye=bpy.data.materials[PREFIX+'Dark brown eyes']
    skin=bpy.data.objects[PREFIX+'Continuous base skin'];skin.data.materials.clear();skin.data.materials.append(coat)
    for sign in [-1,1]:
        ear(f'Ear shell {sign}',sign)
        # Small inset only; the full outer ear is never replaced by a brown triangle.
        ear(f'Ear inset {sign}',sign,True)
        e=ellipsoid(f'Eye {sign}',(sign*.042,-.286,.467),(.0095,.008,.0082),eye)
        e.rotation_euler[2]=sign*-.25
        # Lid rims embed into the head; no floating rings or large white sclera.
        tube(f'Upper eyelid {sign}',[(sign*.033,-.291,.469,.0018,.0018),(sign*.042,-.295,.475,.0018,.0018),(sign*.050,-.282,.469,.0015,.0015)],dark,sides=10,sub=5)
        tube(f'Mouth corner {sign}',[(sign*.016,-.355,.426,.0011,.0011),(sign*.027,-.329,.419,.0013,.0013),(sign*.034,-.304,.424,.001,.001)],dark,sides=10,sub=7)
    nose=ellipsoid('Nose',(0,-.363,.440),(.020,.012,.014),dark)
    for sign in [-1,1]:ellipsoid(f'Nostril {sign}',(sign*.011,-.373,.443),(.004,.002,.003),material('Nostril',(.003,.002,.002),.7))
    tube('Philtrum',[(0,-.374,.434,.001,.001),(0,-.370,.426,.001,.001)],dark,sides=8)
    # Tail centreline contains an actual return arc over the back.
    tube('Curled tail core',[(0,.203,.325,.022,.022),(.006,.257,.355,.025,.025),(.014,.269,.408,.023,.023),(.015,.225,.448,.023,.022),(.010,.165,.447,.020,.018),(.007,.130,.417,.009,.011),(.002,.159,.397,.002,.003)],coat,sides=28)
    view('three-quarter')

def coat_shape():
    import math
    skin=bpy.data.objects[PREFIX+'Continuous base skin']
    coat=skin.copy();coat.data=skin.data.copy();coat.name=PREFIX+'Coat silhouette';bpy.context.scene.collection.objects.link(coat)
    coat.hide_render=False;coat.hide_set(False)
    # Keep the uninflated anatomical mesh as a separately inspectable source.
    samples=[(v.co.copy(),v.normal.copy()) for v in coat.data.vertices]
    for v,(position,n) in zip(coat.data.vertices,samples):
        x,y,z=position
        neck=math.exp(-((y+.16)/.095)**2-((z-.345)/.09)**2)
        ruff=math.exp(-((y+.13)/.09)**2-((z-.270)/.08)**2)
        haunch=math.exp(-((y-.15)/.075)**2-((z-.255)/.08)**2)
        cheek=math.exp(-((y+.225)/.055)**2-((z-.447)/.065)**2)
        torso=max(0,min(1,(z-.12)/.10))*max(0,min(1,(y+.28)/.08))
        amount=.0025+.013*torso+.026*neck+.020*ruff+.014*haunch+.008*cheek
        if y<-.275:amount*=.23
        v.co += n*amount
    coat.data.update()
    bpy.ops.object.select_all(action='DESELECT');coat.select_set(True);bpy.context.view_layer.objects.active=coat
    coat.data.remesh_voxel_size=.0028;bpy.ops.object.voxel_remesh()
    sm=coat.modifiers.new('Soft coat contour','SMOOTH');sm.factor=.75;sm.iterations=12;bpy.ops.object.modifier_apply(modifier=sm.name)
    smooth(coat);skin.hide_set(True);skin.hide_render=True
    skin['purpose']='Underlying body, retained separately from coat volume'
    plume=tube('Tail plume silhouette',[(0,.203,.325,.022,.022),(.006,.257,.355,.037,.036),(.014,.269,.408,.052,.048),(.015,.225,.448,.062,.050),(.010,.165,.447,.048,.044),(.007,.130,.417,.025,.032),(.002,.159,.397,.003,.004)],bpy.data.materials[PREFIX+'Warm white coat'],sides=40,sub=8)
    core=bpy.data.objects[PREFIX+'Curled tail core'];core.hide_set(True);core.hide_render=True
    coat['purpose']='Regional coat envelope, not actual body thickness or final hair groom'
    plume['purpose']='Swept return arc for plume envelope, pending groom'
    view('three-quarter')

def camera(view_name):
    scene=bpy.context.scene;cam=scene.camera
    target=Vector((0,-.03,.285))
    positions={'side':(1.2,-.03,.29),'front':(0,-1.4,.31),'rear':(0,1.4,.31),'three-quarter':(.95,-1.2,.63)}
    cam.location=positions[view_name];cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=.76

def view(name):
    target=Vector((0,-.035,.285))
    positions={'side':Vector((1,0,0)),'front':Vector((0,-1,0)),'rear':Vector((0,1,0)),'three-quarter':Vector((.8,-1,.28))}
    rot=(-positions[name]).to_track_quat('-Z','Y')
    for area in bpy.context.screen.areas:
        if area.type=='VIEW_3D':
            s=area.spaces.active;s.overlay.show_overlays=False;s.show_gizmo=False
            s.shading.type='MATERIAL';s.shading.use_scene_world=False;s.shading.use_scene_lights=False
            s.region_3d.view_rotation=rot;s.region_3d.view_location=target;s.region_3d.view_perspective='ORTHO';s.region_3d.view_distance=.80
            area.tag_redraw()
    bpy.ops.object.select_all(action='DESELECT')

def save(name):
    bpy.context.preferences.filepaths.save_version=0
    path=str(ROOT/'exports'/name)
    bpy.data.libraries.write(path,{bpy.context.scene},fake_user=True,compress=True)
    print('Wrote standalone scene:',path)

def save_workspace_checkpoints():
    """Use after opening the standalone study and selecting its scene.

    Saves ordinary user-openable .blend files including viewport workspace,
    rather than leaving the library writer's default empty active scene.
    """
    scene=bpy.context.scene
    original={o.name:(o.hide_render,o.hide_get()) for o in scene.objects}
    for stage,name in [('body','01-body-study.blend'),('face','02-face-study.blend')]:
        for o in scene.objects:
            if o.type!='MESH' or o.name.endswith('Studio ground'):continue
            hidden=(o.name!=PREFIX+'Continuous base skin') if stage=='body' else o.name in [PREFIX+'Coat silhouette',PREFIX+'Tail plume silhouette']
            o.hide_render=hidden;o.hide_set(hidden)
        bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports'/name),copy=True,compress=True)
    for o in scene.objects:
        o.hide_render=original[o.name][0]
        o.hide_set(original[o.name][1])
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports'/'03-coat-shape-study.blend'),compress=True)

def run(stage):
    {'setup':setup,'body':body,'details':details,'coat-shape':coat_shape}[stage]()
    print('Completed visible stage:',stage)

if __name__=='__main__':
    import sys
    run(sys.argv[sys.argv.index('--')+1])
