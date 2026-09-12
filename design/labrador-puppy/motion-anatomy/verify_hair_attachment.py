"""Sample actual evaluated groom roots against the corrected skin surface."""
import bpy,json
import numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'exports/puppy-run-study.blend'))
body=bpy.data.objects['Puppy_RenderMesh'];report={'scope':'About 1500 body-groom roots per selected frame; not every strand or ear/whisker collision.','frames':[]};first=None
for frame in [1,7,10,20,27,35,44,48,49]:
    bpy.context.scene.frame_set(frame);deps=bpy.context.evaluated_depsgraph_get();ev=body.evaluated_get(deps);mesh=ev.to_mesh()
    tree=BVHTree.FromPolygons([v.co for v in mesh.vertices],[p.vertices[:] for p in mesh.polygons]);ev.to_mesh_clear()
    for ob in bpy.context.scene.objects:
        if ob.type!='CURVES' or 'Groom_Puppy_RenderMesh' not in ob.name:continue
        curves=ob.evaluated_get(deps).data
        indices=[curves.curves[i].first_point_index for i in range(0,len(curves.curves),max(1,len(curves.curves)//1500))]
        p=np.empty(len(curves.points)*3);curves.attributes['position'].data.foreach_get('vector',p);p=p.reshape(-1,3)
        assert np.isfinite(p).all()
        if frame==1:first=p.copy()
        if frame==49:
            report['body_groom_loop_max_delta_m']=float(abs(p-first).max());assert report['body_groom_loop_max_delta_m']<1e-6
        distances=[tree.find_nearest(Vector(p[i]))[3] for i in indices]
        assert max(distances)<.001,(frame,max(distances))
        report['frames'].append({'frame':frame,'sampled_roots':len(indices),'root_distance_p95_m':float(np.percentile(distances,95)),'root_distance_max_m':float(max(distances))})
(ROOT/'reports/hair-attachment.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
