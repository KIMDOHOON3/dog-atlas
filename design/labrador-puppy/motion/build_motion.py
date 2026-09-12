"""48-frame suspended-trot study using native keyframed control transforms.
Geometry Nodes applies identical weighted transforms to mesh and hair points.
This is a motion study, not a production character rig.
"""
import bpy,sys,math,json,shutil
import numpy as np
from pathlib import Path
from mathutils import Vector,Matrix,Euler
ROOT=Path(__file__).resolve().parent;SOURCE=ROOT.parent
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['build']
sys.argv=['build_motion.py'];sys.path.insert(0,str(SOURCE));sys.path.insert(0,str(ROOT));import build as b
for d in ['exports','textures','frames/side','frames/three-quarter','checks','reports']:(ROOT/d).mkdir(parents=True,exist_ok=True)
N=48;FPS=60;STANCE=.42;TRAVEL=.055

def smooth(x,a,b):
    t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)

LIMBS={}
for side in [-1,1]:
    for kind in ['fore','hind']:
        if kind=='fore':points=[(side*.037,-.043,.190),(side*.043,-.043,.118),(side*.043,-.058,.031)]
        else:points=[(side*.040,.123,.183),(side*.049,.095,.121),(side*.048,.159,.054)]
        LIMBS[f'{kind}_{side}']={'points':np.array(points),'phase':0 if (kind=='fore' and side==1) or (kind=='hind' and side==-1) else .5,'kind':kind,'side':side}
PARTS=[f'{name}_{part}' for name in LIMBS for part in ['upper','lower','paw']]+['head','tail','tail_tip']

def weights(p):
    x,y,z=(p/.1).T;result={}
    for name,limb in LIMBS.items():
        side=limb['side'];fore=limb['kind']=='fore'
        mask=smooth(side*x,.14,.35)*(1-smooth(z,1.15,1.98))
        mask*=1-smooth(y,-.02,.34) if fore else smooth(y,.25,.70)
        paw=1-smooth(z,.27,.46 if fore else .68)
        upper=smooth(z,.93,1.34)
        lower=(1-paw)*(1-upper)
        result[name+'_upper']=mask*(1-paw)*upper
        result[name+'_lower']=mask*lower
        result[name+'_paw']=mask*paw
    result['head']=smooth(z,1.95,2.42)*(1-smooth(y,-.78,-.30))
    tail=smooth(y,1.65,2.06)*smooth(z,1.65,1.95)
    tip=smooth(y,2.30,2.86)
    result['tail']=tail*(1-tip);result['tail_tip']=tail*tip
    total=sum(result.values());factor=np.maximum(1,total)
    return {name:(value/factor).astype(np.float32) for name,value in result.items()}

def foot_path(q,kind):
    if q<STANCE:return -.5*TRAVEL+TRAVEL*q/STANCE,0.,0.,'지지 · 뒤로 밀기'
    t=(q-STANCE)/(1-STANCE);m=TRAVEL*(1-STANCE)/STANCE
    y=(2*t**3-3*t**2+1)*TRAVEL/2+(t**3-2*t**2+t)*m+(-2*t**3+3*t**2)*(-TRAVEL/2)+(t**3-t**2)*m
    lift=(.030 if kind=='fore' else .028)*math.sin(math.pi*t)**2
    angle=-.30*math.sin(math.pi*t)**2
    return y,lift,angle,'접어 회수' if t<.7 else '착지 준비'

def rotate(angle):return np.array([[1,0,0],[0,math.cos(angle),-math.sin(angle)],[0,math.sin(angle),math.cos(angle)]])

def rigid(a,b,c,d):
    u=b-a;v=d-c;angle=math.atan2(v[2],v[1])-math.atan2(u[2],u[1]);r=rotate(angle)
    return r,c-r@a,angle

def pose(phase):
    bob=-.010+.002*math.cos(phase*4*math.pi);root=np.array([0.,0.,bob]);transforms={};status={};joints={}
    for name,limb in LIMBS.items():
        q=(phase+limb['phase'])%1;y,lift,paw_angle,label=foot_path(q,limb['kind'])
        a,bp,c=limb['points'];aa=a+root;cc=c+np.array([0,y,lift])
        l1=np.linalg.norm(bp[1:]-a[1:]);l2=np.linalg.norm(c[1:]-bp[1:]);delta=cc[1:]-aa[1:];dist=np.linalg.norm(delta)
        if dist>=l1+l2:raise RuntimeError(f'Unreachable {name}: {dist} >= {l1+l2}')
        unit=delta/dist;along=(l1*l1-l2*l2+dist*dist)/(2*dist);height=math.sqrt(max(0,l1*l1-along*along));perp=np.array([-unit[1],unit[0]])
        bb=bp.copy();bb[1:]=aa[1:]+unit*along+perp*height*(1 if limb['kind']=='fore' else -1)
        transforms[name+'_upper']=rigid(a,bp,aa,bb)
        transforms[name+'_lower']=rigid(bp,c,bb,cc)
        r=rotate(paw_angle);transforms[name+'_paw']=(r,cc-r@c,paw_angle)
        status[name]=label;joints[name]=[aa.tolist(),bb.tolist(),cc.tolist()]
    for name,pivot,angle in [('head',np.array([0,-.09,.235]),-.035+.025*math.sin(phase*4*math.pi+.4))]:
        r=rotate(angle);transforms[name]=(r,pivot+root-r@pivot,angle)
    # Two overlapping tail transforms give a soft delayed tip, on a closed loop.
    pivot=np.array([0,.172,.217]);tip_pivot=np.array([0,.245,.254]);cycle=phase*2*math.pi
    angles=(.045*math.sin(cycle),0.,.34*math.sin(cycle))
    r=np.array(Euler(angles).to_matrix());t=pivot+root-r@pivot
    transforms['tail']=(r,t,angles)
    tip_r=r@np.array(Euler((.025*math.sin(cycle-.55),0.,.23*math.sin(cycle-.65))).to_matrix())
    tip_t=r@tip_pivot+t-tip_r@tip_pivot
    transforms['tail_tip']=(tip_r,tip_t,tuple(Matrix(tip_r).to_euler()))
    return root,transforms,status,joints

def node_group(controls,root_control):
    g=bpy.data.node_groups.new('Puppy motion · shared mesh and hair skinning','GeometryNodeTree')
    g.interface.new_socket(name='Geometry',in_out='INPUT',socket_type='NodeSocketGeometry');g.interface.new_socket(name='Geometry',in_out='OUTPUT',socket_type='NodeSocketGeometry')
    n=g.nodes;l=g.links;inp=n.new('NodeGroupInput');out=n.new('NodeGroupOutput');pos=n.new('GeometryNodeInputPosition')
    root=n.new('GeometryNodeObjectInfo');root.transform_space='ORIGINAL';root.inputs['Object'].default_value=root_control
    base=n.new('ShaderNodeVectorMath');base.operation='ADD';l.new(pos.outputs['Position'],base.inputs[0]);l.new(root.outputs['Location'],base.inputs[1]);acc=base.outputs['Vector']
    for name in PARTS:
        ob=n.new('GeometryNodeObjectInfo');ob.transform_space='ORIGINAL';ob.inputs['Object'].default_value=controls[name]
        rot=n.new('ShaderNodeVectorRotate');rot.rotation_type='EULER_XYZ';l.new(pos.outputs['Position'],rot.inputs['Vector']);l.new(ob.outputs['Rotation'],rot.inputs['Rotation'])
        target=n.new('ShaderNodeVectorMath');target.operation='ADD';l.new(rot.outputs['Vector'],target.inputs[0]);l.new(ob.outputs['Location'],target.inputs[1])
        delta=n.new('ShaderNodeVectorMath');delta.operation='SUBTRACT';l.new(target.outputs['Vector'],delta.inputs[0]);l.new(base.outputs['Vector'],delta.inputs[1])
        attr=n.new('GeometryNodeInputNamedAttribute');attr.data_type='FLOAT';attr.inputs['Name'].default_value='motion_'+name
        mul=n.new('ShaderNodeVectorMath');mul.operation='SCALE';l.new(delta.outputs['Vector'],mul.inputs[0]);l.new(attr.outputs['Attribute'],mul.inputs['Scale'])
        add=n.new('ShaderNodeVectorMath');add.operation='ADD';l.new(acc,add.inputs[0]);l.new(mul.outputs['Vector'],add.inputs[1]);acc=add.outputs['Vector']
    setpos=n.new('GeometryNodeSetPosition');l.new(inp.outputs['Geometry'],setpos.inputs['Geometry']);l.new(acc,setpos.inputs['Position']);l.new(setpos.outputs['Geometry'],out.inputs['Geometry'])
    return g

def camera(view):
    scene=bpy.context.scene;cam=scene.camera;target=Vector((0,.025,.145));pos=Vector((1.0,.025,.220)) if view=='side' else Vector((.65,-.95,.43))
    cam.location=pos;cam.rotation_euler=(target-pos).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=.67;cam.data.dof.use_dof=False
    scene.render.resolution_x=960;scene.render.resolution_y=720;scene.render.resolution_percentage=100;scene.cycles.samples=24

def render_frames(view,frames,check=False):
    scene=bpy.context.scene;camera(view)
    for f in frames:
        scene.frame_set(f);scene.render.filepath=str(ROOT/('checks' if check else 'frames/'+view)/(f'{view}-{f:03d}.png' if check else f'{f:03d}.png'))
        bpy.ops.render.render(write_still=True);print('MOTION_FRAME',view,f,flush=True)

def build():
    bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'v3/exports/labrador-puppy-fur.blend'))
    high=bpy.data.objects.get('Puppy_HighPoly')
    if high:bpy.data.objects.remove(high,do_unlink=True)
    # Quarter-density coat makes interactive timeline evaluation and 96 renders practical.
    for ob in list(bpy.context.scene.objects):
        if ob.type!='CURVES' or not ob.name.startswith('Groom_'):continue
        count=len(ob.data.curves);segments=ob['segments_per_strand'];p=np.empty(len(ob.data.points)*3);ob.data.attributes['position'].data.foreach_get('vector',p)
        radii=np.empty(len(ob.data.points));ob.data.attributes['radius'].data.foreach_get('value',radii)
        name=ob.name;mat=ob.data.materials[0];surface=ob.data.surface;bpy.data.objects.remove(ob,do_unlink=True)
        strands=p.reshape(count,segments,3)[::4];widths=radii.reshape(count,segments)[::4]
        cavity=((strands[:,0]-np.array([0,-.194,.219]))/np.array([.0315,.0395,.0045]))**2
        keep=cavity.sum(axis=1)>1.05
        b.curves_object(name,strands[keep],widths[keep],mat,surface)
    for path in (SOURCE/'v3/textures').glob('*.png'):shutil.copy2(path,ROOT/'textures'/path.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath=str(ROOT/'textures'/Path(img.filepath).name)
    from expression import relaxed_mouth
    relaxed_mouth(b)
    controls={}
    for name in PARTS+['body']:
        o=bpy.data.objects.new('Motion_'+name,None);bpy.context.scene.collection.objects.link(o);o.empty_display_type='PLAIN_AXES';o.empty_display_size=.015;o['motion_control']=True;controls[name]=o
    group=node_group(controls,controls['body'])
    for ob in list(bpy.context.scene.objects):
        if ob.get('studio') or ob.type not in ['MESH','CURVES']:continue
        if ob.type=='MESH':
            # Freeze existing local modifiers before adding the shared skinning field.
            ob.hide_set(False);b.active(ob)
            for mod in list(ob.modifiers):
                if mod.show_viewport:bpy.ops.object.modifier_apply(modifier=mod.name)
                else:ob.modifiers.remove(mod)
            a=np.empty(len(ob.data.vertices)*3);ob.data.vertices.foreach_get('co',a)
        else:a=np.empty(len(ob.data.points)*3);ob.data.attributes['position'].data.foreach_get('vector',a)
        p=a.reshape(-1,3);matrix=np.array(ob.matrix_world);p=p@matrix[:3,:3].T+matrix[:3,3];ob.matrix_world=Matrix.Identity(4)
        from expression import brighten
        p=brighten(p,ob.name)
        if ob.type=='MESH':ob.data.vertices.foreach_set('co',p.astype(np.float32).reshape(-1))
        else:ob.data.attributes['position'].data.foreach_set('vector',p.astype(np.float32).reshape(-1))
        for name,values in weights(p).items():
            attr=ob.data.attributes.new('motion_'+name,'FLOAT','POINT');attr.data.foreach_set('value',values)
        mod=ob.modifiers.new('Joint motion','NODES');mod.node_group=group
    manifest={'frames':N,'fps':FPS,'revision':'smile-wag','gait':'가벼운 달리기 · 대각선 지지','views':['side','three-quarter'],'coat':'v3의 약 1/4 밀도 검토용 털','expression':'밝게 열린 눈 · 살짝 벌린 입 · 좌우 꼬리 흔들기','poses':[]}
    for f in range(1,N+2):
        phase=(f-1)/N;root,transforms,status,joints=pose(phase)
        controls['body'].location=root;controls['body'].keyframe_insert('location',frame=f)
        for name,(_,location,angle) in transforms.items():
            ob=controls[name];ob.location=location;ob.rotation_euler=(angle,0,0) if np.isscalar(angle) else angle;ob.keyframe_insert('location',frame=f);ob.keyframe_insert('rotation_euler',frame=f)
        if f<=N:manifest['poses'].append({'frame':f,'limbs':status,'joints':joints,'body_z':float(root[2])})
    scene=bpy.context.scene;b.studio();floor_guide();scene.frame_start=1;scene.frame_end=N;scene.render.fps=FPS;scene['motion_status']='Experimental native control-keyframe / Geometry Nodes motion study; production rig and deformation quality not approved.'
    for f,label in [(1,'대각선 A 착지'),(11,'A 지지'),(22,'공중 전환'),(25,'대각선 B 착지'),(35,'B 지지'),(46,'공중 전환')]:scene.timeline_markers.new(label,frame=f)
    scene.frame_set(1);camera('side');bpy.context.preferences.filepaths.save_version=0
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8');(ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    render_frames('three-quarter',[1,13,37],True)

def floor_guide():
    mat=b.material('Ground contact guide',(.13,.17,.17),1)
    ob=b.mesh('Ground contact baseline',[(.75,-4,.007),(.78,-4,.007),(.78,4,.007),(.75,4,.007)],[(0,1,2,3)],mat);ob['studio']=True

if ARGS[0]=='build':build()
elif ARGS[0]=='render':
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));b.studio();floor_guide()
    render_frames(ARGS[1],range(1,N+1))
elif ARGS[0]=='details':
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));b.studio();camera('three-quarter')
    scene=bpy.context.scene;scene.frame_set(1);cam=scene.camera;target=Vector((0,-.174,.255))
    cam.location=Vector((.34,-.75,.31));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=.205
    scene.cycles.samples=48;scene.render.filepath=str(ROOT/'face-closeup.png');bpy.ops.render.render(write_still=True)
