"""Inspect each evaluated frame once and verify the accepted front is preserved."""
import bpy,json
import numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parent;SOURCE=ROOT.parent/'motion-anatomy'

def actions():
    return {ob.name:[(fc.data_path,fc.array_index,[(tuple(k.co),k.interpolation) for k in fc.keyframe_points]) for fc in ob.animation_data.action.fcurves] for ob in bpy.context.scene.objects if ob.get('motion_control') and not ob.name.startswith('Motion_hind')}

def body_points(body):
    ev=body.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=ev.to_mesh();p=np.empty(len(mesh.vertices)*3);mesh.vertices.foreach_get('co',p);ev.to_mesh_clear();return p.reshape(-1,3)

bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'exports/puppy-run-study.blend'))
before_actions=actions();body=bpy.data.objects['Puppy_RenderMesh'];rest=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',rest);rest=rest.reshape(-1,3)
fore=rest[:,1]<0.;old={}
for f in [5,20,39]:bpy.context.scene.frame_set(f);old[f]=body_points(body)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
assert before_actions==actions()
body=bpy.data.objects['Puppy_RenderMesh'];actual_rest=np.empty(rest.size);body.data.vertices.foreach_get('co',actual_rest);assert np.array_equal(rest.reshape(-1),actual_rest)
scene=bpy.context.scene;report={'preserved_nonhind_controller_actions':len(before_actions),'unchanged_body_rest_mesh':True,'frames':[],'front_surface_max_delta_m':0.,'hair_samples':[],'missing_textures':[img.filepath for img in bpy.data.images if img.source=='FILE' and not Path(bpy.path.abspath(img.filepath)).is_file()]}
pads=[ob for ob in scene.objects if ob.type=='MESH' and ('_pad' in ob.name or '_claw' in ob.name)];report['pad_claw_min_z_m']=1.
first=None;first_hair={};report['hair_loop_max_delta_m']=0.
for f in range(1,50):
    scene.frame_set(f);deps=bpy.context.evaluated_depsgraph_get();p=body_points(body);assert np.isfinite(p).all()
    if f==1:first=p.copy()
    if f==49:report['body_loop_max_delta_m']=float(abs(p-first).max())
    if f in old:report['front_surface_max_delta_m']=max(report['front_surface_max_delta_m'],float(abs(p[fore]-old[f][fore]).max()))
    report['frames'].append({'frame':f,'min_skin_z_m':float(p[:,2].min())})
    for ob in pads:
        ev=ob.evaluated_get(deps);me=ev.to_mesh();points=np.empty(len(me.vertices)*3);me.vertices.foreach_get('co',points);ev.to_mesh_clear();assert np.isfinite(points).all();report['pad_claw_min_z_m']=min(report['pad_claw_min_z_m'],float(points.reshape(-1,3)[:,2].min()))
    if f in [1,5,10,20,27,35,39,48,49]:
        ev=body.evaluated_get(deps);me=ev.to_mesh();tree=BVHTree.FromPolygons([v.co for v in me.vertices],[poly.vertices[:] for poly in me.polygons]);ev.to_mesh_clear()
        for ob in scene.objects:
            if ob.type!='CURVES':continue
            curves=ob.evaluated_get(deps).data;points=np.empty(len(curves.points)*3);curves.attributes['position'].data.foreach_get('vector',points);assert np.isfinite(points).all()
            if f==1:first_hair[ob.name]=points.copy()
            if f==49:report['hair_loop_max_delta_m']=max(report['hair_loop_max_delta_m'],float(abs(points-first_hair[ob.name]).max()))
            if 'Groom_Puppy_RenderMesh' not in ob.name:continue
            ids=[curves.curves[i].first_point_index for i in range(0,len(curves.curves),max(1,len(curves.curves)//1500))];points=points.reshape(-1,3)
            distances=[tree.find_nearest(Vector(points[i]))[3] for i in ids];report['hair_samples'].append({'frame':f,'count':len(ids),'max_root_distance_m':float(max(distances))});assert max(distances)<.001
    print('VERIFY_FRAME',f,flush=True)
report['scope']='Evaluated skin/pads, unchanged front controller keys and selected front surface frames, sampled body-groom roots. Not full self-collision or anatomical validation.'
assert not report['missing_textures'] and report['body_loop_max_delta_m']<1e-6 and report['hair_loop_max_delta_m']<1e-6
assert report['front_surface_max_delta_m']<1e-7 and report['pad_claw_min_z_m']>-.001
assert min(x['min_skin_z_m'] for x in report['frames'])>-.002
(ROOT/'reports/verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='frames'},indent=2),flush=True)
