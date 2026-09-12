"""Geometry and file audit for this asset, run inside Blender."""
import bpy,bmesh,json,math
from pathlib import Path
from mathutils.bvhtree import BVHTree

def audit(root):
    result={'mesh_checks':[],'textures':[],'hair':[],'scope':'Evaluated mesh per object at render subdivision, including preserved high-poly; intended intersections between separate anatomical objects are not certified as collision-free.'}
    old_levels=[]
    for o in bpy.context.scene.objects:
        for mod in o.modifiers:
            if mod.type=='SUBSURF':old_levels.append((mod,mod.levels));mod.levels=mod.render_levels
    bpy.context.view_layer.update()
    deps=bpy.context.evaluated_depsgraph_get()
    for o in bpy.context.scene.objects:
        if o.get('studio') or (o.hide_render and o.name!='Puppy_HighPoly'):continue
        if o.type=='CURVES':
            result['hair'].append({'object':o.name,'curves':len(o.data.curves),'points':len(o.data.points),'nonfinite_points':sum(not all(math.isfinite(v) for v in p.position) for p in o.data.points)})
            continue
        if o.type!='MESH':continue
        ev=o.evaluated_get(deps);me=ev.to_mesh();bm=bmesh.new();bm.from_mesh(me)
        bm.verts.ensure_lookup_table();bm.faces.ensure_lookup_table()
        seen=set();duplicates=0
        for face in bm.faces:
            key=tuple(sorted(tuple(round(c,8) for c in v.co) for v in face.verts))
            duplicates+=key in seen;seen.add(key)
        components=[];remaining=set(bm.faces)
        while remaining:
            seed=remaining.pop();stack=[seed];faces=[seed]
            while stack:
                f=stack.pop()
                for edge in f.edges:
                    for other in edge.link_faces:
                        if other in remaining:remaining.remove(other);stack.append(other);faces.append(other)
            volume=0
            for f in faces:
                a=f.verts[0].co
                for i in range(1,len(f.verts)-1):volume+=a.dot(f.verts[i].co.cross(f.verts[i+1].co))/6
            components.append(volume)
        # BVH triangle intersections; shared vertices are excluded as normal adjacency.
        me.calc_loop_triangles();tri=[tuple(t.vertices) for t in me.loop_triangles];coords=[v.co for v in me.vertices]
        tree=BVHTree.FromPolygons(coords,tri,all_triangles=True,epsilon=0)
        pairs=tree.overlap(tree);intersections=sum(a<b and not set(tri[a]).intersection(tri[b]) for a,b in pairs)
        row={'object':o.name,'vertices':len(bm.verts),'faces':len(bm.faces),'boundary_edges':sum(e.is_boundary for e in bm.edges),'nonmanifold_edges':sum(not e.is_manifold for e in bm.edges),'inconsistent_winding_edges':sum(e.is_manifold and not e.is_contiguous for e in bm.edges),'degenerate_faces':sum(f.calc_area()<1e-14 for f in bm.faces),'duplicate_faces':duplicates,'negative_volume_components':sum(v < -1e-12 for v in components),'disconnected_components':len(components),'nonadjacent_triangle_intersections':intersections}
        result['mesh_checks'].append(row);bm.free();ev.to_mesh_clear()
    for img in bpy.data.images:
        if img.source!='FILE':continue
        path=Path(bpy.path.abspath(img.filepath));result['textures'].append({'name':img.name,'path':str(path),'exists':path.is_file(),'dimensions':list(img.size),'color_space':img.colorspace_settings.name})
    result['totals']={key:sum(m[key] for m in result['mesh_checks']) for key in ['boundary_edges','nonmanifold_edges','inconsistent_winding_edges','degenerate_faces','duplicate_faces','negative_volume_components','nonadjacent_triangle_intersections']}
    result['totals']['missing_textures']=sum(not t['exists'] for t in result['textures'])
    result['quality_limitations']=['Facial and joint edge flow is an automatic quad cage plus separate lid loops, not hand-retopologized or deformation-approved.','No claim of matching the commercial photoreal reference.','Inter-object overlap and skinning deformation require further production review.']
    for mod,level in old_levels:mod.levels=level
    (root/'reports'/'06-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    print('AUDIT_TOTALS',json.dumps(result['totals']),flush=True)
    return result
