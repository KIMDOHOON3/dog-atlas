"""Refine rest silhouette, isolate limb influence and articulate the neck."""
import sys,math,json,shutil
from pathlib import Path
import bpy
import numpy as np

ROOT=Path(__file__).resolve().parent
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['build']
sys.argv=['build_anatomy.py','--','library']
sys.path.insert(0,str(ROOT.parent/'motion-physics'));sys.path.insert(0,str(ROOT.parent/'motion-refined'))
import build_physics as physics
from dual_quaternion import build_group
m=physics.m;r=physics.r;m.ROOT=ROOT
for folder in ['exports','textures','reports','checks','frames/side','frames/three-quarter']:(ROOT/folder).mkdir(parents=True,exist_ok=True)


def reshape(p):
    p=np.asarray(p);single=p.ndim==1;p=p.reshape(-1,3);out=p.copy();x,y,z=p.T
    torso=m.smooth(y,-.09,-.035)*(1-m.smooth(y,.13,.18))*m.smooth(z,.115,.165)
    out[:,0]*=1-.14*torso
    out[:,2]+=.016*torso*(1-m.smooth(z,.205,.255))
    belly=m.smooth(y,-.025,.012)*(1-m.smooth(y,.10,.155))*(1-m.smooth(abs(x),.025,.048))*m.smooth(z,.06,.095)
    out[:,2]+=.012*belly*(1-m.smooth(z,.15,.20))
    # Lift/retract the head without pitching the muzzle; interpolate through neck.
    neck=(1-m.smooth(y,-.10,-.027))*m.smooth(z,.158,.242)
    out[:,1]+=.013*neck;out[:,2]+=.034*neck
    return out[0] if single else out


def distance_to_segment(p,a,b):
    ab=b-a;t=np.clip(((p-a)@ab)/np.dot(ab,ab),0,1)
    return np.linalg.norm(p-(a+t[:,None]*ab),axis=1)


def weights(ob,p,original):
    out={name:values.copy() for name,values in original.items()}
    total=np.maximum(sum(out.values()),1e-8)
    out={name:value/total for name,value in out.items()}
    out['neck_base']=np.zeros(len(p));out['neck_tip']=np.zeros(len(p))
    if 'Ear_' in ob.name:return out
    for name,limb in ORIGINAL_LIMBS.items():
        a,k,c=limb['points'];fore=limb['kind']=='fore'
        distance=distance_to_segment(p,a,k)
        radius=(.030 if fore else .041)
        envelope=1-m.smooth(distance,radius*.65,radius*1.45)
        isolate=1-m.smooth(p[:,2],.09,.135)*(1-envelope)
        # The brisket remains attached to the chest; only the limb envelope folds.
        if fore:isolate*=1-m.smooth(p[:,2],.10,.15)*(1-m.smooth(p[:,1],-.088,-.055))
        total=(out[name+'_upper']+out[name+'_lower'])*isolate
        upper=m.smooth(p[:,2],k[2]-.022,k[2]+.022)
        out[name+'_upper']=total*upper;out[name+'_lower']=total*(1-upper)
    # Recompute remaining body mass after removing stray limb influence.
    out['chest']*=0;out['pelvis']*=0
    head=out['head'].copy()
    head_top=m.smooth(p[:,2],.223,.259)*(1-m.smooth(p[:,1],-.090,-.055))
    out['head']=head*head_top
    neck_region=(1-m.smooth(p[:,1],-.063,-.015))*m.smooth(p[:,2],.166,.225)
    remaining=np.maximum(0.,1-sum(out.values()))
    neck=remaining*neck_region
    tip=m.smooth(p[:,2],.195,.245)
    out['neck_base']=neck*(1-tip);out['neck_tip']=neck*tip
    remaining=np.maximum(0.,1-sum(out.values()));pelvis=m.smooth(p[:,1],-.01,.12)
    out['chest']=remaining*(1-pelvis);out['pelvis']=remaining*pelvis
    total=sum(out.values());assert np.max(abs(total-1))<2e-5,(ob.name,float(total.min()),float(total.max()),list(original))
    return out


ORIGINAL_LIMBS={name:{**limb,'points':limb['points'].copy()} for name,limb in m.LIMBS.items()}


def pose(row):
    root,tr,status,joints=physics.pose(row)
    bend=-.07+.15*math.tanh(row['v']*2.2)
    tr['neck_base']=r.compose(tr['chest'],reshape([0.,-.035,.204]),(.55*bend,0.,0.))
    tr['neck_tip']=r.compose(tr['neck_base'],reshape([0.,-.073,.231]),(.45*bend,0.,0.))
    tr['head']=r.compose(tr['neck_tip'],reshape([0.,-.09,.235]),(-.65*bend+row['head'],0.,0.))
    for side,letter in [(-1,'L'),(1,'R')]:
        tr['ear_'+letter]=r.compose(tr['head'],reshape([side*.048,-.118,.273]),(row['ear']*(1+side*.04),side*.025,0.))
        tr['ear_'+letter+'_tip']=r.compose(tr['ear_'+letter],reshape([side*.062,-.139,.239]),(row['ear_tip'],0.,0.))
    return root,tr,status,joints


def surface_correction(body):
    group=body.modifiers[-1].node_group
    output=next(n for n in group.nodes if n.bl_idname=='NodeGroupOutput')
    source=output.inputs['Geometry'].links[0].from_socket
    store=group.nodes.new('GeometryNodeStoreNamedAttribute');store.data_type='FLOAT_VECTOR';store.domain='POINT';store.inputs['Name'].default_value='before_joint_smooth'
    position=group.nodes.new('GeometryNodeInputPosition')
    group.links.new(source,store.inputs['Geometry']);group.links.new(position.outputs['Position'],store.inputs['Value']);group.links.new(store.outputs['Geometry'],output.inputs['Geometry'])
    p=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',p);p=p.reshape(-1,3)
    weight=np.zeros(len(p))
    for limb in ORIGINAL_LIMBS.values():
        knee=reshape(limb['points'][1]);distance=np.linalg.norm(p-knee,axis=1)
        weight=np.maximum(weight,1-m.smooth(distance,.018,.046))
    vg=body.vertex_groups.new(name='Joint surface correction')
    for i,value in enumerate(weight):
        if value>.001:vg.add([i],float(value),'REPLACE')
    mod=body.modifiers.new('Round compressed joint surfaces','CORRECTIVE_SMOOTH');mod.factor=1.;mod.iterations=40;mod.vertex_group=vg.name;mod.rest_source='ORCO';mod.use_only_smooth=True
    # Follow the evaluated skin correction, in addition to the shared DQS transform.
    g=bpy.data.node_groups.new('Hair follows corrected joint skin','GeometryNodeTree')
    g.interface.new_socket(name='Geometry',in_out='INPUT',socket_type='NodeSocketGeometry');g.interface.new_socket(name='Geometry',in_out='OUTPUT',socket_type='NodeSocketGeometry')
    n=g.nodes;l=g.links;inp=n.new('NodeGroupInput');out=n.new('NodeGroupOutput');obj=n.new('GeometryNodeObjectInfo');obj.transform_space='ORIGINAL';obj.inputs['Object'].default_value=body
    pos=n.new('GeometryNodeInputPosition');before=n.new('GeometryNodeInputNamedAttribute');before.data_type='FLOAT_VECTOR';before.inputs['Name'].default_value='before_joint_smooth'
    delta=n.new('ShaderNodeVectorMath');delta.operation='SUBTRACT';l.new(pos.outputs['Position'],delta.inputs[0]);l.new(before.outputs['Attribute'],delta.inputs[1])
    sample=n.new('GeometryNodeSampleNearestSurface');sample.data_type='FLOAT_VECTOR';l.new(obj.outputs['Geometry'],sample.inputs['Mesh']);l.new(delta.outputs['Vector'],sample.inputs['Value']);l.new(pos.outputs['Position'],sample.inputs['Sample Position'])
    configure_hair_sampling(g)
    setpos=n.new('GeometryNodeSetPosition');l.new(inp.outputs['Geometry'],setpos.inputs['Geometry']);l.new(sample.outputs['Value'],setpos.inputs['Offset']);l.new(setpos.outputs['Geometry'],out.inputs['Geometry'])
    for ob in bpy.context.scene.objects:
        if ob.type=='CURVES':ob.modifiers.new('Follow joint skin correction','NODES').node_group=g


def configure_hair_sampling(g):
    # Query the displacement on the pre-correction surface, where hair was attached.
    n=g.nodes;l=g.links;obj=next(x for x in n if x.bl_idname=='GeometryNodeObjectInfo');sample=next(x for x in n if x.bl_idname=='GeometryNodeSampleNearestSurface')
    before=next(x for x in n if x.bl_idname=='GeometryNodeInputNamedAttribute');delta=next(x for x in n if x.bl_idname=='ShaderNodeVectorMath')
    store=n.new('GeometryNodeStoreNamedAttribute');store.data_type='FLOAT_VECTOR';store.domain='POINT';store.inputs['Name'].default_value='joint_surface_displacement'
    l.new(obj.outputs['Geometry'],store.inputs['Geometry']);l.new(delta.outputs['Vector'],store.inputs['Value'])
    restore=n.new('GeometryNodeSetPosition');l.new(store.outputs['Geometry'],restore.inputs['Geometry']);l.new(before.outputs['Attribute'],restore.inputs['Position'])
    field=n.new('GeometryNodeInputNamedAttribute');field.data_type='FLOAT_VECTOR';field.inputs['Name'].default_value='joint_surface_displacement'
    l.new(restore.outputs['Geometry'],sample.inputs['Mesh']);l.new(field.outputs['Attribute'],sample.inputs['Value'])


def build():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT.parent/'motion-physics/exports/puppy-run-study.blend'))
    controls={ob.name.removeprefix('Motion_'):ob for ob in bpy.context.scene.objects if ob.get('motion_control')}
    for name in ['neck_base','neck_tip']:
        ob=bpy.data.objects.new('Motion_'+name,None);bpy.context.scene.collection.objects.link(ob);ob['motion_control']=True;ob.empty_display_size=.012;controls[name]=ob
    for ob in controls.values():ob.animation_data_clear()
    parts=[name for name in controls if name!='body'];group=build_group(parts,controls)
    for ob in bpy.context.scene.objects:
        if ob.get('studio') or ob.type not in ['MESH','CURVES']:continue
        count=len(ob.data.vertices) if ob.type=='MESH' else len(ob.data.points)
        p=np.empty(count*3)
        if ob.type=='MESH':ob.data.vertices.foreach_get('co',p)
        else:ob.data.attributes['position'].data.foreach_get('vector',p)
        p=p.reshape(-1,3);original={}
        for attr in ob.data.attributes:
            if attr.name.startswith('motion_') and attr.name[7:] in parts:
                values=np.empty(count);attr.data.foreach_get('value',values);original[attr.name[7:]]=values
        values=weights(ob,p,original)
        for name,v in values.items():
            attr=ob.data.attributes.get('motion_'+name) or ob.data.attributes.new('motion_'+name,'FLOAT','POINT');attr.data.foreach_set('value',v.astype(np.float32))
        shaped=reshape(p).astype(np.float32).reshape(-1)
        if ob.type=='MESH':ob.data.vertices.foreach_set('co',shaped);ob.data.update()
        else:ob.data.attributes['position'].data.foreach_set('vector',shaped)
        for mod in list(ob.modifiers):
            if mod.type=='NODES':ob.modifiers.remove(mod)
        mod=ob.modifiers.new('Anatomy and articulated neck','NODES');mod.node_group=group
    surface_correction(bpy.data.objects['Puppy_RenderMesh'])
    for name,limb in m.LIMBS.items():limb['points']=reshape(ORIGINAL_LIMBS[name]['points'])
    rows,_,dense=physics.d.simulate()
    for row in dense:pose(row)
    manifest=json.loads((ROOT.parent/'motion-physics/manifest.json').read_text(encoding='utf-8'));manifest['revision']='neck-and-limb-skinning'
    rows[-1]=dict(rows[0])
    for f,row in enumerate(rows,1):
        root,tr,status,joints=pose(row);controls['body'].location=root;controls['body'].keyframe_insert('location',frame=f)
        for name,(_,loc,angle) in tr.items():
            ob=controls[name];ob.location=loc;ob.rotation_euler=(angle,0,0) if np.isscalar(angle) else angle;ob.keyframe_insert('location',frame=f);ob.keyframe_insert('rotation_euler',frame=f)
        if f<49:manifest['poses'][f-1]['joints']=joints
    for ob in controls.values():
        for fc in ob.animation_data.action.fcurves:
            for key in fc.keyframe_points:key.interpolation='LINEAR'
    for p in (ROOT.parent/'motion-physics/textures').glob('*.png'):shutil.copy2(p,ROOT/'textures'/p.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    scene=bpy.context.scene;scene['motion_status']='Neck and limb weighting revision; contact dynamics timing retained. Experimental surface rig, not production retopology.'
    m.b.studio();m.floor_guide();scene.frame_set(1);m.camera('side');bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8');(ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    for view in ['side','three-quarter']:m.render_frames(view,[1,10,20,27,35,44],True)


if __name__=='__main__':
    if ARGS[0]=='build':build()
    elif ARGS[0]=='render':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));m.b.studio();m.floor_guide();m.render_frames(ARGS[1],range(1,49))
    elif ARGS[0]=='patch-hair':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));configure_hair_sampling(bpy.data.node_groups['Hair follows corrected joint skin']);bpy.context.preferences.filepaths.save_version=0
        bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
