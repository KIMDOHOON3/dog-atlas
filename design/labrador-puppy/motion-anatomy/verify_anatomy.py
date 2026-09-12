"""Compare joint surface roughness with correction disabled/enabled in Blender."""
import bpy,json
import numpy as np
from pathlib import Path
ROOT=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
scene=bpy.context.scene;body=bpy.data.objects['Puppy_RenderMesh'];mod=body.modifiers['Round compressed joint surfaces']
edges=np.empty(len(body.data.edges)*2,dtype=np.int32);body.data.edges.foreach_get('vertices',edges);edges=edges.reshape(-1,2)
left=np.r_[edges[:,0],edges[:,1]];right=np.r_[edges[:,1],edges[:,0]];degree=np.bincount(left,minlength=len(body.data.vertices))
index=body.vertex_groups['Joint surface correction'].index
mask=np.array([any(g.group==index and g.weight>.5 for g in v.groups) for v in body.data.vertices])
unpainted=np.array([not any(g.group==index and g.weight>.001 for g in v.groups) for v in body.data.vertices])

def evaluated():
    body.update_tag();bpy.context.view_layer.update();ev=body.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();p=np.empty(len(me.vertices)*3);me.vertices.foreach_get('co',p);ev.to_mesh_clear();return p.reshape(-1,3)

def roughness(p):
    average=np.column_stack([np.bincount(left,weights=p[right,i],minlength=len(p))/degree for i in range(3)])
    return float(np.percentile(np.linalg.norm(p-average,axis=1)[mask],95))

report={'scope':'Local surface neighbor deviation, not bone exposure detection or anatomical validation.','poses':[]}
for f in [10,27,35,44]:
    scene.frame_set(f);mod.show_viewport=False;before=evaluated();mod.show_viewport=True;after=evaluated()
    b=roughness(before);a=roughness(after);delta=np.linalg.norm(after-before,axis=1)
    assert np.isfinite(after).all() and a<b and delta[unpainted].max()<1e-7,(f,a,b,delta.max())
    report['poses'].append({'frame':f,'joint_neighbor_deviation_p95_before_m':b,'joint_neighbor_deviation_p95_after_m':a,'max_surface_correction_m':float(delta.max()),'unpainted_surface_max_change_m':float(delta[unpainted].max())})
report['neck_control_rotation_range_rad']={}
for name in ['neck_base','neck_tip']:
    ob=bpy.data.objects['Motion_'+name];values=[]
    for f in range(1,49):scene.frame_set(f);values.append(ob.rotation_euler.x)
    report['neck_control_rotation_range_rad'][name]=max(values)-min(values)
    assert max(values)-min(values)>.04
report['normalized_weight_error']=0.
for ob in scene.objects:
    if ob.type not in ['MESH','CURVES'] or ob.get('studio'):continue
    size=len(ob.data.vertices) if ob.type=='MESH' else len(ob.data.points);total=np.zeros(size)
    for controller in [o for o in scene.objects if o.get('motion_control') and o.name!='Motion_body']:
        attr=ob.data.attributes.get('motion_'+controller.name[7:]);assert attr is not None
        a=np.empty(size);attr.data.foreach_get('value',a);assert a.min()>=0;total+=a
    report['normalized_weight_error']=max(report['normalized_weight_error'],float(abs(total-1).max()))
assert report['normalized_weight_error']<2e-5
(ROOT/'reports/anatomy-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
