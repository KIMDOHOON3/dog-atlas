"""Lower the raised hind knees by moving their foot paths rearward.

Preserves the accepted front, neck, rest mesh, weights and surface correction.
"""
import sys,json,math,shutil
from pathlib import Path
import bpy
import numpy as np
ROOT=Path(__file__).resolve().parent;SOURCE=ROOT.parent/'motion-anatomy'
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['build']
sys.argv=['build_hindlegs.py','--','library'];sys.path.insert(0,str(SOURCE))
import build_anatomy as a
m=a.m;m.ROOT=ROOT
SHIFT=.035
for folder in ['exports','textures','reports','checks','frames/side','frames/three-quarter']:(ROOT/folder).mkdir(parents=True,exist_ok=True)


def solve(points,joints):
    start,knee,end=points;aa,old_knee,old_end=np.asarray(joints);cc=old_end+np.array([0.,SHIFT,0.])
    l1=np.linalg.norm(knee[1:]-start[1:]);l2=np.linalg.norm(end[1:]-knee[1:]);delta=cc[1:]-aa[1:];dist=np.linalg.norm(delta)
    if not abs(l1-l2)<dist<l1+l2:raise RuntimeError(f'Unreachable hind foot: {dist}/{l1+l2}')
    unit=delta/dist;along=(l1*l1-l2*l2+dist*dist)/(2*dist);height=math.sqrt(max(0,l1*l1-along*along));bb=old_knee.copy();bb[1:]=aa[1:]+unit*along-np.array([-unit[1],unit[0]])*height
    return aa,bb,cc,dist/(l1+l2)


def build():
    manifest=json.loads((SOURCE/'manifest.json').read_text(encoding='utf-8'))
    rest={name:a.reshape(limb['points']) for name,limb in a.ORIGINAL_LIMBS.items() if name.startswith('hind')}
    # Check interpolated samples as well as the authored 48 frames.
    max_reach=0.
    for i in range(48):
        for t in [0.,.25,.5,.75]:
            for name,points in rest.items():
                j0=np.array(manifest['poses'][i]['joints'][name]);j1=np.array(manifest['poses'][(i+1)%48]['joints'][name])
                *_,reach=solve(points,j0*(1-t)+j1*t);max_reach=max(max_reach,reach)
    bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'exports/puppy-run-study.blend'))
    controls={ob.name.removeprefix('Motion_'):ob for ob in bpy.context.scene.objects if ob.get('motion_control')}
    # Only six hind-limb controller actions are replaced.
    for name in rest:
        for part in ['upper','lower','paw']:controls[name+'_'+part].animation_data_clear()
    report={'rearward_foot_shift_m':SHIFT,'dense_max_reach_fraction':max_reach,'frames':[]}
    for f in range(1,50):
        row=manifest['poses'][(f-1)%48]
        # The duplicate loop endpoint uses the unmodified first joint positions.
        original_row=json.loads((SOURCE/'manifest.json').read_text(encoding='utf-8'))['poses'][(f-1)%48] if f==49 else row
        result={}
        for name,points in rest.items():
            original=original_row['joints'][name];aa,bb,cc,_=solve(points,original)
            start,knee,end=points
            transforms={'upper':m.rigid(start,knee,aa,bb),'lower':m.rigid(knee,end,bb,cc)}
            phase=row['physics']['phase'];q=(phase-a.physics.d.CONTACT[name])%1
            _,_,angle=a.physics.foot(q,False);rot=m.rotate(angle);transforms['paw']=(rot,cc-rot@end,angle)
            for part,(_,loc,angle) in transforms.items():
                ob=controls[name+'_'+part];ob.location=loc;ob.rotation_euler=(angle,0,0);ob.keyframe_insert('location',frame=f);ob.keyframe_insert('rotation_euler',frame=f)
            result[name]={'before_hip_knee_drop_m':float(original[0][2]-original[1][2]),'after_hip_knee_drop_m':float(aa[2]-bb[2]),'foot_height_delta_m':float(cc[2]-original[2][2])}
            if f<49:row['joints'][name]=[aa.tolist(),bb.tolist(),cc.tolist()]
        if f<49:report['frames'].append({'frame':f,'limbs':result})
    for name in rest:
        for part in ['upper','lower','paw']:
            for fc in controls[name+'_'+part].animation_data.action.fcurves:
                for key in fc.keyframe_points:key.interpolation='LINEAR'
    manifest['revision']='lower-hind-knees'
    for source in (SOURCE/'textures').glob('*.png'):shutil.copy2(source,ROOT/'textures'/source.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    scene=bpy.context.scene;scene['motion_status']='Hind foot paths shifted rearward 35mm; original front/neck and body dynamics retained. Experimental surface rig.'
    m.b.studio();m.floor_guide();scene.frame_set(1);m.camera('side');bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8');(ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    (ROOT/'reports/hindleg-positions.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    for view in ['side','three-quarter']:m.render_frames(view,[5,10,20,27,35,39],True)


if __name__=='__main__':
    if ARGS[0]=='build':build()
    elif ARGS[0]=='render':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));m.b.studio();m.floor_guide();m.render_frames(ARGS[1],range(1,49))
    elif ARGS[0]=='render-both':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));m.b.studio();m.floor_guide()
        for f in range(1,49):
            bpy.context.scene.frame_set(f)
            for view in ['side','three-quarter']:
                m.camera(view);bpy.context.scene.render.filepath=str(ROOT/'frames'/view/f'{f:03d}.png');bpy.ops.render.render(write_still=True)
            print('HINDLEG_FRAME',f,flush=True)
