"""Reopen the native animated file and inspect evaluated frames, not rest meshes."""
import bpy,bmesh,json,math
import numpy as np
from pathlib import Path
ROOT=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
scene=bpy.context.scene;body=bpy.data.objects['Puppy_RenderMesh'];manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
report={'frames':[],'scope':'Evaluated skin surface, controller keys, loop closure and texture paths. Not a full collision or production skinning audit.'}
rest=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',rest);rest=rest.reshape(-1,3)
masks={}
for name in ['fore_1','fore_-1','hind_1','hind_-1']:
    w=np.empty(len(body.data.vertices));body.data.attributes['motion_'+name+'_paw'].data.foreach_get('value',w);masks[name]=(w>.98)&(rest[:,2]<.026)
first=None;last=None
tail_mask=rest[:,1]>rest[:,1].max()-.012
assert tail_mask.any()
for frame in range(1,50):
    scene.frame_set(frame);ev=body.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();a=np.empty(len(me.vertices)*3);me.vertices.foreach_get('co',a);a=a.reshape(-1,3)
    if frame==1:first=a.copy()
    if frame==49:last=a.copy()
    feet={name:{'min_z_m':float(a[mask,2].min()),'center_y_m':float(a[mask,1].mean())} for name,mask in masks.items()}
    report['frames'].append({'frame':frame,'nonfinite_vertices':int(np.sum(~np.isfinite(a).all(axis=1))),'min_skin_z_m':float(a[:,2].min()),'tail_tip_center_x_m':float(a[tail_mask,0].mean()),'feet':feet});ev.to_mesh_clear()
report['loop_max_vertex_delta_m']=float(np.max(np.abs(last-first)))
report['missing_textures']=[i.filepath for i in bpy.data.images if i.source=='FILE' and not Path(bpy.path.abspath(i.filepath)).is_file()]
report['hair_objects']=sum(o.type=='CURVES' for o in scene.objects)
report['hair_strands']=sum(len(o.data.curves) for o in scene.objects if o.type=='CURVES')
report['keyframed_controls']=sum(bool(o.get('motion_control')) and bool(o.animation_data and o.animation_data.action) for o in scene.objects)
report['max_stance_vertical_range_m']={}
for name in masks:
    heights=[row['feet'][name]['min_z_m'] for row in report['frames'][:48] if manifest['poses'][row['frame']-1]['limbs'][name].startswith('지지')]
    report['max_stance_vertical_range_m'][name]=max(heights)-min(heights)
report['nonfinite_vertices_total']=sum(r['nonfinite_vertices'] for r in report['frames'])
tail_x=[r['tail_tip_center_x_m'] for r in report['frames'][:48]]
report['tail_tip_lateral_span_m']=max(tail_x)-min(tail_x)
report['facial_mesh_checks']={}
for name in ['Puppy_RenderMesh','Mouth inner lining','Tongue']:
    ob=bpy.data.objects[name];bm=bmesh.new();bm.from_mesh(ob.data)
    report['facial_mesh_checks'][name]={'nonmanifold_edges':sum(not e.is_manifold for e in bm.edges),'zero_area_faces':sum(f.calc_area()<1e-14 for f in bm.faces)};bm.free()
report['facial_loop_max_delta_m']=0.;report['facial_nonfinite_vertices']=0
for ob in scene.objects:
    if ob.type!='MESH' or not ob.name.startswith(('Eye_','Upper lip','Mouth','Tongue','Nose')):continue
    ends=[]
    for f in [1,13,25,37,49]:
        scene.frame_set(f);ev=ob.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();p=np.empty(len(me.vertices)*3);me.vertices.foreach_get('co',p)
        report['facial_nonfinite_vertices']+=int(np.sum(~np.isfinite(p)))
        if f in [1,49]:ends.append(p.copy())
        ev.to_mesh_clear()
    report['facial_loop_max_delta_m']=max(report['facial_loop_max_delta_m'],float(np.max(np.abs(ends[0]-ends[1]))))
(ROOT/'reports/verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('MOTION_CHECK',json.dumps({k:v for k,v in report.items() if k!='frames'}),flush=True)
assert report['loop_max_vertex_delta_m']<1e-6 and not report['missing_textures'] and report['nonfinite_vertices_total']==0
assert report['tail_tip_lateral_span_m']>.04 and report['facial_loop_max_delta_m']<1e-6 and report['facial_nonfinite_vertices']==0
