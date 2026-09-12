"""Bake reduced contact dynamics into the accepted native DQS character."""
import sys,math,json,shutil
from pathlib import Path
import bpy
import numpy as np

ROOT=Path(__file__).resolve().parent
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['build']
sys.argv=['build_physics.py','--','library']
sys.path.insert(0,str(ROOT.parent/'motion-run'));sys.path.insert(0,str(ROOT))
import build_run as r
import dynamics as d
m=r.m;m.ROOT=ROOT
for folder in ['exports','textures','reports','checks','frames/side','frames/three-quarter']:(ROOT/folder).mkdir(parents=True,exist_ok=True)


def foot(q,fore):
    start=-.026 if fore else -.070
    travel=.09;end=start+travel
    if q<d.STANCE:
        return start+travel*q/d.STANCE,0.,0.
    t=(q-d.STANCE)/(1-d.STANCE);tangent=travel*(1-d.STANCE)/d.STANCE
    y=(2*t**3-3*t**2+1)*end+(t**3-2*t**2+t)*tangent+(-2*t**3+3*t**2)*start+(t**3-t**2)*tangent
    return y,(.028 if fore else .030)*math.sin(math.pi*t)**1.7,-.42*math.sin(math.pi*t)**2


def pose(row):
    phase=row['phase'];root=np.array([0.,0.,row['z']])
    base=r.transform(np.array([0.,.04,.185]),row['pitch'],root)
    ff=sum(f for n,f in row['forces'].items() if n.startswith('fore'))
    hf=sum(f for n,f in row['forces'].items() if n.startswith('hind'))
    chest=r.compose(base,np.array([0.,-.035,.19]),(.028*ff/(d.MASS*d.GRAVITY),0.,0.))
    pelvis=r.compose(base,np.array([0.,.115,.18]),(-.028*hf/(d.MASS*d.GRAVITY),0.,0.))
    tr={'chest':chest,'pelvis':pelvis};status={};joints={}
    for name,limb in m.LIMBS.items():
        fore=limb['kind']=='fore';q=(phase-d.CONTACT[name])%1
        y,lift,angle=foot(q,fore);a,knee,c=limb['points'];rot,translation,_=chest if fore else pelvis
        aa=rot@a+translation;cc=c+np.array([0.,y,lift+.0007])
        l1=np.linalg.norm(knee[1:]-a[1:]);l2=np.linalg.norm(c[1:]-knee[1:]);delta=cc[1:]-aa[1:];dist=np.linalg.norm(delta)
        if not abs(l1-l2)<dist<l1+l2:
            raise RuntimeError(f'Unreachable {name} phase={phase:.4f}: {dist:.4f}/{l1+l2:.4f}; z={row["z"]:.4f}')
        unit=delta/dist;along=(l1*l1-l2*l2+dist*dist)/(2*dist);height=math.sqrt(max(0.,l1*l1-along*along));perp=np.array([-unit[1],unit[0]])
        bb=knee.copy();bb[1:]=aa[1:]+unit*along+perp*height*(1 if fore else -1)
        tr[name+'_upper']=m.rigid(a,knee,aa,bb);tr[name+'_lower']=m.rigid(knee,c,bb,cc)
        rot=m.rotate(angle);tr[name+'_paw']=(rot,cc-rot@c,angle)
        if q<d.STANCE:
            status[name]='지지 · 체중 받기' if row['v']<0 else '지지 · 밀어 도약'
            if row['forces'][name]<.01:status[name]='접지 · 하중 없음'
        else:status[name]='접어 회수' if (q-d.STANCE)/(1-d.STANCE)<.68 else '착지 준비'
        joints[name]=[aa.tolist(),bb.tolist(),cc.tolist()]
    tr['head']=r.compose(chest,np.array([0.,-.09,.235]),(row['head'],0.,0.))
    cycle=2*math.pi*phase
    tr['tail']=r.compose(pelvis,np.array([0.,.172,.217]),(-.15*row['pitch'],0.,.18*math.sin(cycle)))
    tr['tail_tip']=r.compose(tr['tail'],np.array([0.,.245,.254]),(-.1*row['head'],0.,.12*math.sin(cycle-.65)))
    for side,letter in [(-1,'L'),(1,'R')]:
        tr['ear_'+letter]=r.compose(tr['head'],np.array([side*.048,-.118,.273]),(row['ear']*(1+side*.04),side*.025,0.))
        tr['ear_'+letter+'_tip']=r.compose(tr['ear_'+letter],np.array([side*.062,-.139,.239]),(row['ear_tip'],0.,0.))
    return root,tr,status,joints


def build():
    rows,report,dense=d.simulate()
    for row in dense:pose(row)
    assert report['loop_state_error']<1e-5,report
    print('DYNAMICS',json.dumps(report),flush=True)
    bpy.ops.wm.open_mainfile(filepath=str(ROOT.parent/'motion-refined/exports/puppy-run-study.blend'))
    controls={ob.name.removeprefix('Motion_'):ob for ob in bpy.context.scene.objects if ob.get('motion_control')}
    for ob in controls.values():ob.animation_data_clear()
    manifest={'frames':48,'fps':48/d.PERIOD,'revision':'contact-dynamics','views':['side','three-quarter'],'poses':[]}
    # Steady state closes numerically; use identical first/last pose for exact asset loop.
    rows[-1]=dict(rows[0])
    for f,row in enumerate(rows,1):
        root,tr,status,joints=pose(row)
        controls['body'].location=root;controls['body'].keyframe_insert('location',frame=f)
        for name,(_,loc,angle) in tr.items():
            ob=controls[name];ob.location=loc;ob.rotation_euler=(angle,0,0) if np.isscalar(angle) else angle
            ob.keyframe_insert('location',frame=f);ob.keyframe_insert('rotation_euler',frame=f)
        if f<49:
            support=[name for name,force in row['forces'].items() if force>.01]
            label=('착지 · 몸으로 무게 받기' if row['v']<0 else '발로 밀어내며 도약') if support else ('공중 · 중력으로 내려오기' if row['v']<0 else '공중 · 도약 후 상승')
            if not support and any((row['phase']-offset)%1<d.STANCE for offset in d.CONTACT.values()):label='발끝 접촉 · 하중 전환'
            manifest['poses'].append({'frame':f,'limbs':status,'joints':joints,'body_z':row['z'],'support':support,'body_phase':label,'physics':row})
    for ob in controls.values():
        for fc in ob.animation_data.action.fcurves:
            for k in fc.keyframe_points:k.interpolation='LINEAR'
    for p in (ROOT.parent/'motion-refined/textures').glob('*.png'):shutil.copy2(p,ROOT/'textures'/p.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    scene=bpy.context.scene;scene.render.fps=round(48/d.PERIOD);scene.frame_start=1;scene.frame_end=48;scene.timeline_markers.clear()
    scene['motion_status']='Reduced vertical/pitch contact dynamics with active spring legs, authored foot paths and baked inertial appendages. Not a full articulated physics simulation.'
    m.b.studio();m.floor_guide();scene.frame_set(1);m.camera('side');bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    (ROOT/'reports/dynamics.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    for view in ['side','three-quarter']:m.render_frames(view,[1,10,20,27,35,44],True)


if __name__=='__main__':
    if ARGS[0]=='build':build()
    elif ARGS[0]=='render':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));m.b.studio();m.floor_guide();m.render_frames(ARGS[1],range(1,49))
