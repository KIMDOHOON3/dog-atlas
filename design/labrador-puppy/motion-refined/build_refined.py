"""Preserve the accepted run and improve its skin deformation in a separate file."""
import sys,json,shutil
from pathlib import Path
import bpy
ROOT=Path(__file__).resolve().parent;SOURCE=ROOT.parent/'motion-run'
ARGS=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['build']
sys.argv=['build_refined.py','--','library'];sys.path.insert(0,str(ROOT.parent/'motion'));sys.path.insert(0,str(ROOT))
import build_motion as m
m.ROOT=ROOT
for folder in ['exports','textures','checks','reports','frames/side','frames/three-quarter']:(ROOT/folder).mkdir(parents=True,exist_ok=True)

def build():
    bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'exports/puppy-run-study.blend'))
    controls={ob.name.removeprefix('Motion_'):ob for ob in bpy.context.scene.objects if ob.get('motion_control')}
    parts=[name for name in controls if name!='body']
    from dual_quaternion import build_group
    group=build_group(parts,controls)
    for ob in bpy.context.scene.objects:
        if ob.get('studio') or ob.type not in ['MESH','CURVES']:continue
        for mod in list(ob.modifiers):
            if mod.type=='NODES':ob.modifiers.remove(mod)
        mod=ob.modifiers.new('Volume-preserving deformation','NODES');mod.node_group=group
    for path in (SOURCE/'textures').glob('*.png'):shutil.copy2(path,ROOT/'textures'/path.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    bpy.context.scene.frame_set(1);m.camera('side');bpy.context.preferences.filepaths.save_version=0
    bpy.context.scene['motion_status']='Dual quaternion deformation study; original run timing retained. Production topology and anatomical rig remain unfinished.'
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'),compress=True)
    manifest=json.loads((SOURCE/'manifest.json').read_text(encoding='utf-8'));manifest['revision']='volume-preserving-run'
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'manifest.js').write_text('window.MOTION='+json.dumps(manifest,ensure_ascii=False)+';',encoding='utf-8')
    m.b.studio();m.floor_guide()
    for view in ['side','three-quarter']:m.render_frames(view,[1,10,20,27,35,44],True)

if __name__=='__main__':
    if ARGS[0]=='build':build()
    elif ARGS[0]=='render':
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'));m.b.studio();m.floor_guide();m.render_frames(ARGS[1],range(1,49))
