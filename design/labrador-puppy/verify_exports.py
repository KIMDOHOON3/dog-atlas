"""Reopen both native files and import OBJ in clean scenes; do not resave them."""
import bpy,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent
if '--' in sys.argv:ROOT=ROOT/sys.argv[sys.argv.index('--')+1]
report={}
for name in ['labrador-puppy-fur.blend','labrador-puppy-base.blend']:
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports'/name))
    report[name]={'meshes':sum(o.type=='MESH' and not o.get('studio') for o in bpy.context.scene.objects),'hair_objects':sum(o.type=='CURVES' for o in bpy.context.scene.objects),'missing_textures':[i.filepath for i in bpy.data.images if i.source=='FILE' and not Path(bpy.path.abspath(i.filepath)).is_file()]}
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=str(ROOT/'exports'/'labrador-puppy.obj'))
report['OBJ_roundtrip']={'meshes':sum(o.type=='MESH' for o in bpy.context.scene.objects),'vertices':sum(len(o.data.vertices) for o in bpy.context.scene.objects if o.type=='MESH'),'faces':sum(len(o.data.polygons) for o in bpy.context.scene.objects if o.type=='MESH'),'missing_textures':[i.filepath for i in bpy.data.images if i.source=='FILE' and not Path(bpy.path.abspath(i.filepath)).is_file()]}
(ROOT/'reports'/'07-reopen.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('EXPORT_REOPEN_CHECK',json.dumps(report),flush=True)
