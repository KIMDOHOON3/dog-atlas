"""Whole-body run study. Keeps the earlier trot and its authored face intact.

Native keyframed transforms deform the same rest mesh and Hair Curves field.
Contact order is hind pair, suspension, fore pair, collected suspension.
This is hand-authored animation, not motion capture or a production bone rig.
"""
import sys, math, json, shutil
from pathlib import Path
import bpy
import numpy as np
from mathutils import Matrix, Euler

ROOT = Path(__file__).resolve().parent
OLD = ROOT.parent / 'motion'
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['build']
sys.argv = ['build_run.py', '--', 'library']
sys.path.insert(0, str(OLD))
import build_motion as m
m.ROOT = ROOT
for folder in ['exports', 'textures', 'frames/side', 'frames/three-quarter', 'checks', 'reports']:
    (ROOT / folder).mkdir(parents=True, exist_ok=True)
PARTS = m.PARTS + ['chest', 'pelvis', 'ear_L', 'ear_R', 'ear_L_tip', 'ear_R_tip']
m.PARTS = PARTS
CONTACT = {'hind_-1': 0., 'hind_1': .07, 'fore_-1': .47, 'fore_1': .54}
STANCE = .25

def transform(pivot, angle, offset):
    r = m.rotate(angle)
    return r, pivot + offset - r @ pivot, angle

def compose(parent, pivot, angles):
    r0, t0, _ = parent
    r = r0 @ np.array(Euler(angles).to_matrix())
    return r, r0 @ pivot + t0 - r @ pivot, tuple(Matrix(r).to_euler())

def torso(phase):
    cycle = 2 * math.pi * phase
    # Two flight arcs; compression occurs between paired footfalls.
    bob = -.017 + .010 * math.cos(2 * cycle - 4 * math.pi * .39)
    root = np.array([0., 0., bob])
    gather = math.cos(cycle - 2 * math.pi * .86)
    pitch = .055 * math.sin(cycle - .5)
    chest = transform(np.array([0., -.035, .19]), pitch,
                      root + np.array([0., .007 * gather, .002 * math.sin(cycle)]))
    pelvis = transform(np.array([0., .115, .18]), -.075 * math.sin(cycle - .5),
                       root + np.array([0., -.010 * gather, -.002 * math.sin(cycle)]))
    return root, chest, pelvis

def foot_path(q, fore):
    start, end = (-.030, .052) if fore else (-.068, .022)
    if q < STANCE:
        return start + (end - start) * q / STANCE, 0., 0., '지지 · 충격 흡수' if q < .10 else '지지 · 뒤로 밀기'
    t = (q - STANCE) / (1 - STANCE)
    # C1 tangents preserve backward ground speed through liftoff and touchdown.
    tangent = (end - start) * (1 - STANCE) / STANCE
    y = (2*t**3-3*t**2+1)*end + (t**3-2*t**2+t)*tangent + (-2*t**3+3*t**2)*start + (t**3-t**2)*tangent
    lift = (.049 if fore else .039) * math.sin(math.pi*t)**1.7
    angle = -.52 * math.sin(math.pi*t)**2
    return y, lift, angle, '접어 회수' if t < .68 else '착지 준비'

def pose(phase):
    root, chest, pelvis = torso(phase)
    tr = {'chest': chest, 'pelvis': pelvis}
    status, joints = {}, {}
    for name, limb in m.LIMBS.items():
        fore = limb['kind'] == 'fore'
        q = (phase - CONTACT[name]) % 1
        y, lift, angle, label = foot_path(q, fore)
        a, knee, c = limb['points']
        r, t, _ = chest if fore else pelvis
        aa = r @ a + t
        cc = c + np.array([0., y, lift + .0007])
        l1 = np.linalg.norm(knee[1:] - a[1:]); l2 = np.linalg.norm(c[1:] - knee[1:])
        delta = cc[1:] - aa[1:]; dist = np.linalg.norm(delta)
        if not abs(l1-l2) < dist < l1+l2:
            raise RuntimeError(f'Unreachable {name} phase {phase}: {dist} / {l1+l2}')
        unit = delta / dist; along = (l1*l1-l2*l2+dist*dist)/(2*dist)
        height = math.sqrt(max(0., l1*l1-along*along)); perp = np.array([-unit[1], unit[0]])
        bb = knee.copy(); bb[1:] = aa[1:] + unit*along + perp*height*(1 if fore else -1)
        tr[name+'_upper'] = m.rigid(a, knee, aa, bb)
        tr[name+'_lower'] = m.rigid(knee, c, bb, cc)
        r = m.rotate(angle); tr[name+'_paw'] = (r, cc-r@c, angle)
        status[name] = label; joints[name] = [aa.tolist(), bb.tolist(), cc.tolist()]
    cycle = phase * 2 * math.pi
    tr['head'] = compose(chest, np.array([0., -.09, .235]), (-.035-.045*math.sin(cycle-.85), 0., 0.))
    tr['tail'] = compose(pelvis, np.array([0., .172, .217]), (.075*math.sin(cycle-.5), 0., .28*math.sin(cycle)))
    tr['tail_tip'] = compose(tr['tail'], np.array([0., .245, .254]), (.035*math.sin(cycle-1), 0., .20*math.sin(cycle-.65)))
    for side, letter in [(-1, 'L'), (1, 'R')]:
        # Root stays attached to skull; tip lags the leaf, with slight L/R timing difference.
        delay = .65 + side*.09
        sweep = .48 + .33*math.sin(2*cycle-delay)
        tr['ear_'+letter] = compose(tr['head'], np.array([side*.048, -.118, .273]), (sweep, side*.055*math.sin(2*cycle-delay), 0.))
        tr['ear_'+letter+'_tip'] = compose(tr['ear_'+letter], np.array([side*.062, -.139, .239]), (.15*math.sin(2*cycle-delay-.7), 0., 0.))
    return root, tr, status, joints

def weights(ob, p):
    result = m.weights(p)
    for name in ['chest', 'pelvis', 'ear_L', 'ear_R', 'ear_L_tip', 'ear_R_tip']:
        result[name] = np.zeros(len(p), dtype=np.float32)
    if 'Ear_' in ob.name:
        letter = 'L' if ('Ear_L' in ob.name or 'Ear_-1' in ob.name) else 'R'
        leaf = 1 - m.smooth(p[:,2], .250, .273)
        tip = 1 - m.smooth(p[:,2], .216, .246)
        result = {name: np.zeros(len(p), dtype=np.float32) for name in PARTS}
        result['head'] = 1-leaf
        result['ear_'+letter] = leaf*(1-tip)
        result['ear_'+letter+'_tip'] = leaf*tip
    else:
        # The medial toes formerly retained torso weights and dipped on compression.
        # Lock the complete distal sole to its own foot, with a smooth ankle transition.
        lock = 1-m.smooth(p[:,2], .026, .045)
        for name in result: result[name] *= 1-lock
        for name, limb in m.LIMBS.items():
            region = (p[:,0]*limb['side']>0) & ((p[:,1]<.035) if limb['kind']=='fore' else (p[:,1]>=.035))
            result[name+'_paw'] += lock*region
        remaining = np.maximum(0., 1-sum(result.values()))
        pelvis = m.smooth(p[:,1], -.01, .12)
        result['chest'] = remaining*(1-pelvis)
        result['pelvis'] = remaining*pelvis
    return result

def build():
    # Test every requested sample before touching the scene or writing deliverables.
    for f in range(193): pose(f/192)
    bpy.ops.wm.open_mainfile(filepath=str(OLD/'exports/puppy-run-study.blend'))
    for ob in list(bpy.context.scene.objects):
        if ob.get('motion_control'): bpy.data.objects.remove(ob, do_unlink=True)
    controls = {}
    for name in PARTS+['body']:
        ob = bpy.data.objects.new('Motion_'+name, None); bpy.context.scene.collection.objects.link(ob)
        ob.empty_display_size=.015; ob['motion_control']=True; controls[name]=ob
    group = m.node_group(controls, controls['body'])
    for ob in list(bpy.context.scene.objects):
        if ob.get('studio') or ob.type not in ['MESH', 'CURVES']: continue
        for mod in list(ob.modifiers):
            if mod.type=='NODES': ob.modifiers.remove(mod)
        count = len(ob.data.vertices) if ob.type=='MESH' else len(ob.data.points)
        p = np.empty(count*3)
        if ob.type=='MESH': ob.data.vertices.foreach_get('co', p)
        else: ob.data.attributes['position'].data.foreach_get('vector', p)
        for attr in list(ob.data.attributes):
            if attr.name.startswith('motion_'): ob.data.attributes.remove(attr)
        for name, values in weights(ob, p.reshape(-1,3)).items():
            attr = ob.data.attributes.new('motion_'+name, 'FLOAT', 'POINT'); attr.data.foreach_set('value', values.astype(np.float32))
        mod=ob.modifiers.new('Whole-body running', 'NODES'); mod.node_group=group
    manifest={'frames':48, 'fps':60, 'revision':'whole-body-run', 'gait':'뒷발 밀기 → 공중 신전 → 앞발 착지 → 공중 회수', 'views':['side','three-quarter'], 'poses':[]}
    for f in range(1,50):
        root, tr, status, joints = pose((f-1)/48)
        controls['body'].location=root; controls['body'].keyframe_insert('location', frame=f)
        for name, (_, loc, angle) in tr.items():
            ob=controls[name]; ob.location=loc; ob.rotation_euler=(angle,0,0) if np.isscalar(angle) else angle
            ob.keyframe_insert('location',frame=f); ob.keyframe_insert('rotation_euler',frame=f)
        if f<49:
            support=[name for name,label in status.items() if label.startswith('지지')]
            manifest['poses'].append({'frame':f,'limbs':status,'joints':joints,'body_z':float(root[2]),'support':support,'body_phase':('뒷발로 밀어내기' if support and support[0].startswith('hind') else '앞발 착지 · 충격 흡수' if support else '몸을 길게 펴며 공중 이동' if f<27 else '몸과 다리를 모아 다음 도약 준비')})
    for source in (OLD/'textures').glob('*.png'): shutil.copy2(source, ROOT/'textures'/source.name)
    for img in bpy.data.images:
        if img.source=='FILE': img.filepath='//../textures/'+Path(img.filepath).name
    scene=bpy.context.scene; scene.timeline_markers.clear()
    for f,label in [(1,'뒷발 착지'),(10,'뒷발 밀기'),(20,'공중 신전'),(27,'앞발 착지'),(35,'앞발 지지'),(44,'공중 회수')]: scene.timeline_markers.new(label,frame=f)
    m.b.studio(); m.floor_guide(); scene.frame_set(1); m.camera('side')
    bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    for view in ['side','three-quarter']: m.render_frames(view,[1,10,20,27,35,44],True)

if ARGS[0]=='build': build()
elif ARGS[0]=='render':
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
    m.b.studio(); m.floor_guide(); m.render_frames(ARGS[1],range(1,49))
