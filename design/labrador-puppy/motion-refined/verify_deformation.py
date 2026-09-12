"""Independent NumPy DQS reference plus fixed-rest-region surface comparison.
The area metric diagnoses collapse; it does not certify anatomical volume.
"""
from pathlib import Path
import bpy,json
import numpy as np
ROOT=Path(__file__).resolve().parent
FRAMES=[1,10,20,27,35,44]
def evaluated(body):
    ob=body.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ob.to_mesh();p=np.empty(len(me.vertices)*3);me.vertices.foreach_get('co',p);ob.to_mesh_clear();return p.reshape(-1,3)
bpy.ops.wm.open_mainfile(filepath=str(ROOT.parent/'motion-run/exports/puppy-run-study.blend'))
old={}
for f in FRAMES:
    bpy.context.scene.frame_set(f);old[f]=evaluated(bpy.data.objects['Puppy_RenderMesh'])
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
body=bpy.data.objects['Puppy_RenderMesh'];rest=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',rest);rest=rest.reshape(-1,3)
parts=[o.name.removeprefix('Motion_') for o in bpy.context.scene.objects if o.get('motion_control') and o.name!='Motion_body']
sample=np.arange(0,len(rest),137);weights=[]
for name in parts:
    a=np.empty(len(rest));body.data.attributes['motion_'+name].data.foreach_get('value',a);weights.append(a[sample])
weights=np.array(weights).T
body.data.calc_loop_triangles();tri=np.array([t.vertices[:] for t in body.data.loop_triangles]);centers=rest[tri].mean(axis=1)
regions={}
for side in [-1,1]:
    for label,z,fore in [('elbow',.118,True),('wrist',.04,True),('knee',.121,False),('hock',.055,False)]:
        regions[f'{label}_{side}']=(centers[:,0]*side>.022)&(np.abs(centers[:,2]-z)<.006)&((centers[:,1]<.02) if fore else (centers[:,1]>.06))
def areas(p):
    t=p[tri];a=np.linalg.norm(np.cross(t[:,1]-t[:,0],t[:,2]-t[:,0]),axis=1)/2
    return {name:float(a[mask].sum()) for name,mask in regions.items()}
rest_area=areas(rest);report={'frames':[],'scope':'Same authored pose and rest-region triangles. Surface area retention is a collapse diagnostic, not an anatomical volume measurement.'}
for f in FRAMES:
    bpy.context.scene.frame_set(f);actual=evaluated(body)
    real=[];dual=[]
    for name in parts:
        ob=bpy.data.objects['Motion_'+name];q=np.array(ob.rotation_euler.to_quaternion());q*=1 if q[0]>=0 else -1;t=np.array(ob.location)
        real.append(q);dual.append(np.r_[-.5*np.dot(t,q[1:]),.5*(q[0]*t+np.cross(t,q[1:]))])
    qr=weights@np.array(real);qd=weights@np.array(dual);norm=np.linalg.norm(qr,axis=1);qr/=norm[:,None];qd/=norm[:,None]
    w=qr[:,:1];v=qr[:,1:];d=qd[:,1:];dw=qd[:,:1];p=rest[sample]
    expected=p+2*np.cross(v,np.cross(v,p)+w*p)+2*(w*d-dw*v+np.cross(v,d))
    error=float(np.max(np.abs(expected-actual[sample])));assert error<1e-6 and norm.min()>.25
    before=areas(old[f]);after=areas(actual)
    report['frames'].append({'frame':f,'numpy_max_error_m':error,'blended_quaternion_min_norm':float(norm.min()),'regions':{name:{'before_area_vs_rest':before[name]/rest_area[name],'after_area_vs_rest':after[name]/rest_area[name]} for name in regions}})
(ROOT/'reports/deformation-comparison.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('DEFORMATION_COMPARE',json.dumps(report),flush=True)
