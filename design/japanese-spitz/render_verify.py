import bpy,sys,json,math,importlib.util,bmesh
from pathlib import Path
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('spitz_study',ROOT/'build_blender.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
try:
    prefs=bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type='OPTIX';prefs.get_devices()
    for device in prefs.devices:device.use=device.type=='OPTIX'
    if any(d.use for d in prefs.devices):bpy.context.scene.cycles.device='GPU'
except Exception as error:print('GPU fallback:',error)
report={'renderer':'Cycles','view_transform':'AgX','stage':'static shape study','meshes':[],'limits':['No photo-fidelity pass','No animation or deformation validation','No full inter-object intersection test','Native Blender route; Three.js runtime gates not run']}
for o in bpy.context.scene.objects:
    if o.type!='MESH' or o.name.endswith('Studio ground'):continue
    bm=bmesh.new();bm.from_mesh(o.data)
    report['meshes'].append({'name':o.name,'vertices':len(o.data.vertices),'faces':len(o.data.polygons),'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'zeroAreaFaces':sum(f.calc_area()<1e-12 for f in bm.faces),'finite':all(math.isfinite(c) for v in bm.verts for c in v.co),'hiddenRender':o.hide_render})
    bm.free()
report['missingFileTextures']=[im.filepath for im in bpy.data.images if im.source=='FILE' and not im.packed_file and not Path(bpy.path.abspath(im.filepath)).is_file()]
assert all(v['finite'] and v['zeroAreaFaces']==0 for v in report['meshes'])
assert not report['missingFileTextures']
(ROOT/'reports/mesh-check.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
for view in ['front','side','rear','three-quarter']:
    m.camera(view);bpy.context.scene.render.filepath=str(ROOT/'previews'/f'{view}.png')
    bpy.ops.render.render(write_still=True)
visibility={o.name:o.hide_render for o in bpy.context.scene.objects}
for stage in ['01-body','02-face']:
    for o in bpy.context.scene.objects:
        if o.type!='MESH' or o.name.endswith('Studio ground'):continue
        if stage=='01-body':o.hide_render=o.name!=m.PREFIX+'Continuous base skin'
        else:o.hide_render=o.name in [m.PREFIX+'Coat silhouette',m.PREFIX+'Tail plume silhouette']
    for view in ['front','side']:
        m.camera(view);bpy.context.scene.render.filepath=str(ROOT/'previews'/f'{stage}-{view}.png')
        bpy.ops.render.render(write_still=True)
for o in bpy.context.scene.objects:o.hide_render=visibility[o.name]
m.camera('three-quarter')
print('SPITZ_RENDER_VERIFY_COMPLETE')
