"""Second sculpt pass, retaining the first study for comparison."""
import bpy,bmesh,sys,math,json
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
SOURCE=Path(__file__).resolve().parent
PHASE=sys.argv[sys.argv.index('--')+1] if '--' in sys.argv else 'shape'
sys.argv=['refine.py'];sys.path.insert(0,str(SOURCE))
import build as b
ROOT=SOURCE/'v2';b.ROOT=ROOT
for folder in ['stages','previews','textures','exports','reports']:(ROOT/folder).mkdir(parents=True,exist_ok=True)

def shape():
    bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'exports'/'labrador-puppy-base.blend'))
    # Remove previous bake nodes; this revision will get a new complete atlas.
    for mat in bpy.data.materials:
        if not mat.use_nodes:continue
        old=mat.node_tree.nodes.get('Principled BSDF')
        if old is None:continue
        values={socket.name:socket.default_value[:] if hasattr(socket.default_value,'__len__') else socket.default_value for socket in old.inputs if hasattr(socket,'default_value')}
        mat.node_tree.nodes.clear();p=mat.node_tree.nodes.new('ShaderNodeBsdfPrincipled');out=mat.node_tree.nodes.new('ShaderNodeOutputMaterial')
        mat.node_tree.links.new(p.outputs[0],out.inputs['Surface'])
        for key,value in values.items():
            try:p.inputs[key].default_value=value
            except (TypeError,ValueError,KeyError):pass
    for image in list(bpy.data.images):
        if image.source=='FILE':bpy.data.images.remove(image)
    old=bpy.data.objects.get('Puppy_HighPoly')
    if old:bpy.data.objects.remove(old,do_unlink=True)
    pieces=[];deps=bpy.context.evaluated_depsgraph_get()
    for name in ['Puppy_RenderMesh','Eye_-1_quad_lids','Eye_1_quad_lids']:
        original=bpy.data.objects[name]
        if 'quad_lids' in name:
            for mod in original.modifiers:
                if mod.type=='SOLIDIFY':mod.thickness=.004;mod.offset=-1
            bpy.context.view_layer.update()
        evaluated=original.evaluated_get(deps)
        data=bpy.data.meshes.new_from_object(evaluated);o=bpy.data.objects.new('Skin union input',data);bpy.context.scene.collection.objects.link(o);o.matrix_world=original.matrix_world
        pieces.append(o);bpy.data.objects.remove(original,do_unlink=True)
    bpy.ops.object.select_all(action='DESELECT')
    for o in pieces:o.select_set(True)
    bpy.context.view_layer.objects.active=pieces[0];bpy.ops.object.join();body=bpy.context.object;body.name='Puppy_Sculpt'
    mod=body.modifiers.new('Continuous facial skin','REMESH');mod.mode='VOXEL';mod.voxel_size=.00055;bpy.ops.object.modifier_apply(modifier=mod.name)
    # Relax only the broad lid-to-cheek transition; keep the wet aperture intact.
    bm=bmesh.new();bm.from_mesh(body.data)
    region=[]
    for v in bm.verts:
        p=v.co/b.S;rad=((abs(p.x)-.345)/.19)**2+((p.z-2.84)/.145)**2
        inner=((abs(p.x)-.345)/.123)**2+((p.z-2.84)/.080)**2
        if p.y<-1.45 and .25<rad<2.5 and inner>1.12 and v.link_edges:region.append((v,.8*min(1,(inner-1.12)/.7)))
    for _ in range(45):
        changes=[]
        for v,weight in region:
            avg=sum((e.other_vert(v).co for e in v.link_edges),Vector())/len(v.link_edges)
            changes.append((v,v.co.lerp(avg,weight)))
        for v,co in changes:v.co=co
    bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
    bmesh.ops.dissolve_degenerate(bm,edges=list(bm.edges),dist=.000001)
    loose=[v for v in bm.verts if not v.link_faces]
    if loose:bmesh.ops.delete(bm,geom=loose,context='VERTS')
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(body.data);bm.free()
    body.data.materials.clear();body.data.materials.append(bpy.data.materials['Puppy skin'])
    for poly in body.data.polygons:poly.use_smooth=True
    # Recess the concha behind the flap so it cannot read as a pink cheek spot.
    for side in [-1,1]:
        concha=bpy.data.objects.get('Ear_'+str(side)+'_concha')
        if concha:concha.location.y+=.009;concha.scale*=.83
        ear=bpy.data.objects['Ear_'+('L' if side==-1 else 'R')]
        inv=ear.matrix_world.inverted()
        for v in ear.data.vertices:
            p=ear.matrix_world@v.co;q=p/b.S;t=max(0,min(1,(3.05-q.z)/.65))
            p.x+=side*.0014*math.sin(t*math.pi)*math.sin((q.y+1.40)*7)
            p.y+=.0015*math.sin(t*math.pi)*(1-t);v.co=inv@p
    b.studio();b.save(2)
    for view in ['front','side','face','three-quarter']:b.render(view,2)
    (ROOT/'reports'/'02-refinement.json').write_text(json.dumps({'facial_skin_faces':len(body.data.polygons),'change':'Body and both eyelid skins joined into one closed sculpt; local smoothing outside eyelid aperture; recessed ear concha; mild ear curvature variation','method':'Voxel union then local vertex relaxation; not production retopology'},indent=2),encoding='utf-8')

def topology():
    bpy.ops.wm.open_mainfile(filepath=str(ROOT/'stages'/'02.blend'))
    hi=bpy.data.objects['Puppy_Sculpt']
    # Retain the continuous skin. Cage projection folded the eye socket and
    # was rejected. This reduced sculpt is explicitly a static render mesh.
    hi.name='Puppy_HighPoly'
    bm=bmesh.new();bm.from_mesh(hi.data);loose=[v for v in bm.verts if not v.link_faces]
    if loose:bmesh.ops.delete(bm,geom=loose,context='VERTS')
    # Relax the upper left socket transition identified in the groom review.
    dimple=Vector((-.03245,-.17193,.29473))
    patch=[v for v in bm.verts if (v.co-dimple).length<.0045]
    for _ in range(80):bmesh.ops.smooth_vert(bm,verts=patch,factor=.65,use_axis_x=True,use_axis_y=True,use_axis_z=True)
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
    bm.to_mesh(hi.data);bm.free()
    base=hi.copy();base.data=hi.data.copy();bpy.context.scene.collection.objects.link(base);base.name='Puppy_RenderMesh';b.active(base)
    mod=base.modifiers.new('Static sculpt reduction','DECIMATE');mod.ratio=.16;mod.use_collapse_triangulate=True
    bpy.ops.object.modifier_apply(modifier=mod.name)
    base.data.materials.clear();base.data.materials.append(bpy.data.materials['Puppy skin'])
    for poly in base.data.polygons:poly.use_smooth=True
    hi.hide_render=True;hi.hide_set(True)
    # The upper scleral pole protruded through the new forehead skin.
    for side in [-1,1]:bpy.data.objects[f'Eye_{side}_sclera'].scale.z*=.88
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.context.scene.objects:
        if o.type=='MESH' and not o.get('studio') and not o.hide_render:o.select_set(True)
    bpy.context.view_layer.objects.active=base;bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(island_margin=.012);bpy.ops.object.mode_set(mode='OBJECT')
    report={'high_poly_faces':len(hi.data.polygons),'render_faces':len(base.data.polygons),'render_quads':sum(len(p.vertices)==4 for p in base.data.polygons),'method':'Reduced continuous sculpt for static rendering; NOT production quad retopology.','rejected_method':'Projection onto the previous cage caused 551 triangle intersections and was discarded.','deformation_status':'Unfulfilled: manual face/joint retopology, rigging and deformation validation remain required.'}
    (ROOT/'reports'/'03-topology.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    b.studio();b.save(3);b.render('front',3);b.render('side',3);b.render('face',3)

if PHASE=='shape':shape()
elif PHASE=='topology':topology()
elif PHASE=='material':b.stage4()
elif PHASE=='groom':b.stage5()
elif PHASE=='render':b.stage6()
