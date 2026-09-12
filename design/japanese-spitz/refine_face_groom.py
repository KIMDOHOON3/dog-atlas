"""Native Blender face/groom pass on the user's approved static proportions.
Run face(), groom(), verify(), render_views() in order in the connected Blender.
No animation rig or full img2threejs runtime-quality claim is made.
"""
import bpy, math, json, hashlib, importlib.util
import numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree

ROOT=Path(__file__).resolve().parent
P='Spitz | '
s=importlib.util.spec_from_file_location('spitz_base',ROOT/'build_blender.py')
b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
OUT=ROOT/'face-groom'
for d in ['previews','reports','exports']:(OUT/d).mkdir(parents=True,exist_ok=True)

def drop(names):
    for name in names:
        o=bpy.data.objects.get(P+name)
        if o:bpy.data.objects.remove(o,do_unlink=True)

def coords(obj):
    data=np.empty(len(obj.data.vertices)*3,dtype=np.float32);obj.data.vertices.foreach_get('co',data)
    return data.reshape(-1,3)

def signature(obj,body_only=False):
    xyz=coords(obj)
    if body_only:xyz=xyz[(xyz[:,1]>-.260)|(xyz[:,2]<.370)]
    xyz=xyz[np.lexsort((xyz[:,2],xyz[:,1],xyz[:,0]))]
    return {'vertices':len(xyz),'sha256':hashlib.sha256(xyz.tobytes()).hexdigest()}

def record_baseline():
    result={name:signature(bpy.data.objects[P+name],name=='Coat silhouette') for name in ['Continuous base skin','Coat silhouette','Tail plume silhouette','Curled tail core']}
    (OUT/'reports/protected-baseline.json').write_text(json.dumps(result,indent=2),encoding='utf-8')

def mesh(name,verts,faces,mat):
    data=bpy.data.meshes.new(P+name);data.from_pydata(verts,[],faces);data.update()
    o=bpy.data.objects.new(P+name,data);bpy.context.scene.collection.objects.link(o)
    b.smooth(o,mat);return o

def stroke(name,points,radius,mat):
    if 2<len(points)<12:points=[p[:] for p in b.sample_path(points,8)]
    data=bpy.data.curves.new(P+name,'CURVE');data.dimensions='3D';data.bevel_depth=radius;data.bevel_resolution=3
    spline=data.splines.new('POLY');spline.points.add(len(points)-1)
    for p,co in zip(spline.points,points):p.co=(*co,1)
    o=bpy.data.objects.new(P+name,data);bpy.context.scene.collection.objects.link(o);data.materials.append(mat);return o

def mouth():
    coat=bpy.data.objects[P+'Coat silhouette'];white=bpy.data.materials[P+'Warm white coat']
    dark=b.material('Moist lip',(.012,.009,.008),.36)
    gum=b.material('Mouth lining',(.070,.018,.022),.6)
    pink=b.material('Tongue pink',(.47,.12,.16),.48)
    tooth=b.material('Ivory teeth',(.79,.73,.61),.32)
    # A real opening cut through the lower muzzle, restricted to the facial region.
    outline=[(-.382,.426),(-.354,.427),(-.321,.424),(-.296,.427),(-.284,.418),(-.303,.398),(-.348,.387),(-.382,.394)]
    verts=[(x,y,z) for x in [-.09,.09] for y,z in outline];n=len(outline)
    faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    cutter=mesh('Mouth opening tool',verts,faces,dark)
    import bmesh
    bm=bmesh.new();bm.from_mesh(cutter.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(cutter.data);bm.free()
    bpy.ops.object.select_all(action='DESELECT');coat.hide_set(False);coat.select_set(True);bpy.context.view_layer.objects.active=coat
    mod=coat.modifiers.new('Open relaxed mouth - facial region only','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
    bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cutter,do_unlink=True)
    jaw=b.tube('Lower jaw',[(0,-.285,.416,.021,.013),(0,-.309,.399,.025,.010),(0,-.338,.393,.021,.010),(0,-.354,.399,.012,.006)],white,sides=32,sub=7)
    b.ellipsoid('Mouth cavity',(0,-.307,.412),(.030,.027,.014),gum)
    # Lower lips and gums follow the jaw's sides rather than drawing a smile on skin.
    for sign in [-1,1]:
        stroke(f'Lower lip {sign}',[(sign*.009,-.358,.403),(sign*.021,-.343,.402),(sign*.026,-.319,.409),(sign*.029,-.301,.420)],.0019,dark)
        stroke(f'Upper lip {sign}',[(sign*.012,-.358,.427),(sign*.025,-.337,.426),(sign*.032,-.314,.425),(sign*.030,-.296,.427)],.0016,dark)
        for j in range(4):
            y=-.346+j*.011;x=sign*(.017+j*.0038);z=.423
            b.ellipsoid(f'Upper tooth {sign} {j}',(x,y,z-.0025),(.0028,.003,.004),tooth)
        b.tube(f'Canine {sign}',[(sign*.026,-.319,.425,.0032,.0032),(sign*.027,-.322,.418,.0028,.0026),(sign*.026,-.325,.413,.0007,.0007)],tooth,sides=14,sub=4)
    tongue=b.ellipsoid('Tongue',(0,-.345,.403),(.0125,.022,.0038),pink)
    tongue.rotation_euler[0]=-.14
    stroke('Tongue centre groove',[(0,-.360,.406),(0,-.352,.407),(0,-.342,.407)],.0003,b.material('Tongue groove',(.24,.055,.07),.6))

def eyes():
    coat=bpy.data.objects[P+'Coat silhouette'];tree=BVHTree.FromPolygons([v.co for v in coat.data.vertices],[p.vertices[:] for p in coat.data.polygons],all_triangles=False)
    black=b.material('Eyelid black',(.009,.006,.004),.38)
    iris=b.material('Warm brown iris',(.095,.040,.013),.27)
    pupil=b.material('Pupil',(.002,.0015,.001),.16)
    lens=b.material('Eye wet surface',(.010,.007,.004),.17)
    for sign in [-1,1]:
        centre=Vector((sign*.042,-.286,.467));n=Vector((sign*.67,-.74,.04)).normalized();u=Vector((sign*.741,.67,0));up=Vector((0,0,1))
        def surface(q):
            hit=tree.ray_cast(q+n*.045,-n,.10)
            return hit[0]+n*.00065 if hit[0] is not None else q
        c=surface(centre);verts=[c+n*.002];boundary=[];steps=48
        for j in range(steps):
            t=math.tau*j/steps
            q=centre+u*(.013*math.cos(t))+up*(.0067*math.sin(t)*(.75+.25*abs(math.sin(t)))+.001*math.cos(t))
            boundary.append(surface(q))
        for ring in range(1,6):
            a=ring/5
            verts += [c*(1-a)+q*a+n*(.002*(1-a*a)) for q in boundary]
        faces=[(0,1+j,1+(j+1)%steps) for j in range(steps)]
        for ring in range(4):
            for j in range(steps):
                a=1+ring*steps+j;z=1+ring*steps+(j+1)%steps
                faces.append((a,z,z+steps,a+steps))
        eye=mesh(f'Almond eye {sign}',verts,faces,lens)
        stroke(f'Eyelid margin {sign}',boundary+[boundary[0]],.00085,black)
        # Corneal highlight comes from scene lights, not painted-on white dots.
        for name,radius,depth,mat in [('Iris',.0048,.0014,iris),('Pupil',.0027,.0006,pupil)]:
            o=b.ellipsoid(f'{name} {sign}',c+n*(.0022 if name=='Iris' else .0034),(radius,radius,depth),mat)
            o.rotation_euler=n.to_track_quat('Z','Y').to_euler()

def nose_ears():
    nose=bpy.data.objects[P+'Nose'];nose.data=nose.data.copy()
    # The lower half tapers, retaining a rounded triangular profile.
    for v in nose.data.vertices:
        z=v.co.z/.014
        v.co.x*=.84+.16*(z+1)/2
    mat=b.material('Nose textured',(.009,.008,.007),.38);nose.data.materials.clear();nose.data.materials.append(mat)
    nodes=mat.node_tree.nodes;links=mat.node_tree.links
    shader=next(n for n in nodes if n.type=='BSDF_PRINCIPLED')
    tex=nodes.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=115
    bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.24;bump.inputs['Distance'].default_value=.00035
    links.new(tex.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],shader.inputs['Normal'])
    for sign in [-1,1]:
        for kind in ['shell','inset']:
            o=bpy.data.objects[P+f'Ear {kind} {sign}'];o.data=o.data.copy()
            for v in o.data.vertices:
                centre=-.229+(v.co.z-.490)*.12
                v.co.y=centre+(v.co.y-centre)*.40-(.0008 if kind=='inset' else 0)
            for mod in o.modifiers:
                if mod.type=='BEVEL':mod.width=.0013 if kind=='shell' else .0007
        inside=bpy.data.objects[P+f'Ear inset {sign}']
        inside.data.materials.clear();inside.data.materials.append(b.material('Soft pink inner ear',(.46,.29,.26),.82))

def face_view():
    direction=Vector((.78,-1,.16));target=Vector((0,-.245,.449))
    for area in bpy.context.screen.areas:
        if area.type=='VIEW_3D':
            v=area.spaces.active;v.overlay.show_overlays=False;v.shading.type='MATERIAL';v.show_gizmo=False
            v.region_3d.view_location=target;v.region_3d.view_distance=.30;v.region_3d.view_rotation=(-direction).to_track_quat('-Z','Y');v.region_3d.view_perspective='ORTHO'
            area.tag_redraw()
    bpy.ops.object.select_all(action='DESELECT')

def face():
    record_baseline()
    drop([f'{stem} {sign}' for sign in [-1,1] for stem in ['Eye','Upper eyelid','Mouth corner']])
    mouth();eyes();nose_ears();face_view()
    bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/04-face.blend'),compress=True)

def polish_face():
    # Recess the lining behind the dental arcade; avoid a visible solid oral ball.
    cavity=bpy.data.objects[P+'Mouth cavity'];cavity.location=(0,-.289,.416)
    cavity.scale=(.80,.48,.72)
    cavity.data.materials.clear();cavity.data.materials.append(b.material('Deep oral shadow',(.009,.003,.004),.92))
    for o in bpy.context.scene.objects:
        if o.name.startswith(P+'Upper tooth'):o.scale=(.68,.75,.74)
        if o.name.startswith(P+'Lower lip') or o.name.startswith(P+'Upper lip'):
            old=o.data.splines[0];points=[p.co[:3] for p in old.points]
            if len(points)<12:
                sampled=b.sample_path(points,8);o.data.splines.remove(old);spline=o.data.splines.new('POLY');spline.points.add(len(sampled)-1)
                for p,q in zip(spline.points,sampled):p.co=(*q,1)
            o.data.bevel_depth*=.78
    lip=bpy.data.materials[P+'Moist lip']
    stroke('Front lower lip',[(-.009,-.358,.403),(0,-.360,.403),(.009,-.358,.403)],.0014,lip)
    nose=bpy.data.objects[P+'Nose']
    drop(['Nostril -1','Nostril 1'])
    for sign in [-1,1]:
        tool=b.ellipsoid(f'Nostril cutter {sign}',(sign*.0095,-.3735,.444),(.0047,.0047,.0032))
        bpy.ops.object.select_all(action='DESELECT');nose.select_set(True);bpy.context.view_layer.objects.active=nose
        mod=nose.modifiers.new('Recessed nostril','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=tool
        bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(tool,do_unlink=True)
    for name in ['Eye wet surface','Eyelid black']:
        mat=bpy.data.materials[P+name];shader=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
        shader.inputs['Specular IOR Level'].default_value=.23
    face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/04-face.blend'),compress=True)

def hair_mat():
    mat=bpy.data.materials.new(P+'Ivory guard hair');mat.use_nodes=True
    nodes=mat.node_tree.nodes;nodes.clear();links=mat.node_tree.links
    out=nodes.new('ShaderNodeOutputMaterial');h=nodes.new('ShaderNodeBsdfHairPrincipled');h.parametrization='COLOR'
    h.inputs['Roughness'].default_value=.40;h.inputs['Radial Roughness'].default_value=.64
    info=nodes.new('ShaderNodeHairInfo');ramp=nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color=(.64,.60,.52,1);ramp.color_ramp.elements[1].color=(.86,.84,.77,1)
    links.new(info.outputs['Intercept'],ramp.inputs[0]);links.new(ramp.outputs[0],h.inputs['Color']);links.new(h.outputs[0],out.inputs['Surface'])
    return mat

def curves(name,points,radii,mat,surface=None):
    count,segments,_=points.shape
    data=bpy.data.hair_curves.new(P+name);data.add_curves([segments]*count)
    data.attributes['position'].data.foreach_set('vector',np.asarray(points,dtype=np.float32).reshape(-1))
    data.attributes.new('radius','FLOAT','POINT').data.foreach_set('value',np.asarray(radii,dtype=np.float32).reshape(-1))
    data.materials.append(mat)
    obj=bpy.data.objects.new(P+name,data);bpy.context.scene.collection.objects.link(obj)
    if surface:data.surface=surface
    obj['strand_count']=count;obj['binding']='Static roots sampled on final mesh; no animated surface binding validated'
    return obj

def groom_object(obj,count,mat,seed,region='body'):
    rng=np.random.default_rng(seed);ev=obj.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();me.calc_loop_triangles()
    xyz=np.array([obj.matrix_world@v.co for v in me.vertices]);normal_matrix=obj.matrix_world.to_3x3().inverted().transposed()
    norms=np.array([(normal_matrix@v.normal).normalized() for v in me.vertices])
    tris=np.array([t.vertices[:] for t in me.loop_triangles]);tri=xyz[tris]
    area=np.linalg.norm(np.cross(tri[:,1]-tri[:,0],tri[:,2]-tri[:,0]),axis=1);cdf=np.cumsum(area);cdf/=cdf[-1]
    ids=np.searchsorted(cdf,rng.random(count));a=np.sqrt(rng.random(count));z=rng.random(count);bc=np.stack([1-a,a*(1-z),a*z],axis=1)
    root=(tri[ids]*bc[:,:,None]).sum(1);normal=(norms[tris[ids]]*bc[:,:,None]).sum(1);normal/=np.maximum(1e-9,np.linalg.norm(normal,axis=1))[:,None]
    x,y,z=root.T
    mask=z>.010
    if region=='body':
        # No fur across eyelids, nose or carved internal mouth surfaces.
        for sign in [-1,1]:
            eye=((x-sign*.043)/.020)**2+((y+.285)/.022)**2+((z-.468)/.012)**2
            mask &= eye>1
        mask &= ~((y<-.285)&(z<.432))
        mask &= ~((y<-.350)&(z>.428)&(z<.456))
    if region=='jaw':mask &= ~((normal[:,2]>.15)&(y<-.302))
    root=root[mask];normal=normal[mask];x,y,z=root.T;count=len(root)
    flow=np.zeros_like(root);flow[:,1]=1;flow[:,2]=-.30
    length=np.full(count,.014);lift=np.full(count,.25)
    head=(y<-.20)&(z>.39);muzzle=(y<-.283)&(z<.464);ruff=(y<-.06)&(y>-.23)&(z>.20)&(z<.425)
    length[head]=.007;flow[head,0]=np.sign(x[head])*.6;flow[head,2]=np.where(z[head]>.48,.25,-.5)
    length[muzzle]=.0025;flow[muzzle,1]=.7;flow[muzzle,2]=-.1
    length[ruff]=.028;flow[ruff,0]=np.sign(x[ruff])*.25;flow[ruff,1]=.32;flow[ruff,2]=-1
    legs=z<.19;length[legs]=.005;flow[legs]=(0,.08,-1)
    if region=='tail':
        length[:]=.029;flow[:,0]=np.sign(x)*.45;flow[:,1]=-.65;flow[:,2]=-.40;lift[:]=.3
    if region=='ear':
        length[:]=.004;flow[:]=(0,-.12,1);lift[:]=.23
    if region=='jaw':length[:]=.002;flow[:]=(0,.6,-.3)
    under=rng.random(count)<.35;length[under]*=.55
    length*=rng.uniform(.7,1.25,count)
    tangent=flow-normal*(flow*normal).sum(1)[:,None]
    small=np.linalg.norm(tangent,axis=1)<.03;tangent[small]=np.cross(normal[small],np.tile((1,0,0),(small.sum(),1)))
    tangent/=np.maximum(1e-9,np.linalg.norm(tangent,axis=1))[:,None];across=np.cross(normal,tangent)
    clump=.12*np.sin(x*310+y*115+z*135)+rng.normal(0,.045,count)
    ts=np.linspace(0,1,6);pts=[]
    phase=rng.uniform(0,math.tau,count)
    for t in ts:
        outward=length*(lift*t-.12*t*t+.018*np.sin(phase+t*math.tau)*t)
        pts.append(root+normal*(outward+.000008)[:,None]+tangent*(length*t)[:,None]+across*(length*clump*t*t)[:,None])
    radius=rng.uniform(.000023,.000038,count);radius[under]*=.75
    radii=radius[:,None]*(1-.97*ts[None,:])**1.2
    result=curves('Fur '+obj.name,np.stack(pts,axis=1),radii,mat,obj)
    result['region']=region;result['length_min_mm']=float(length.min()*1000);result['length_max_mm']=float(length.max()*1000)
    ev.to_mesh_clear();return {'object':result.name,'count':count,'minLengthMm':float(length.min()*1000),'maxLengthMm':float(length.max()*1000)}

def groom():
    mat=hair_mat();report=[]
    for i,(name,count,region) in enumerate([('Coat silhouette',230000,'body'),('Tail plume silhouette',42000,'tail'),('Ear shell -1',6500,'ear'),('Ear shell 1',6500,'ear'),('Lower jaw',3500,'jaw')]):
        report.append(groom_object(bpy.data.objects[P+name],count,mat,730+i,region))
    (OUT/'reports/groom.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/05-face-groom.blend'),compress=True)

def oral_finish():
    dark=b.material('Oral tissue',(.030,.008,.011),.77)
    # Assign internal cut faces and the top of the lower jaw to oral tissue.
    for name in ['Coat silhouette','Lower jaw']:
        obj=bpy.data.objects[P+name];obj.data.materials.append(dark);index=len(obj.data.materials)-1
        for poly in obj.data.polygons:
            centre=obj.matrix_world@poly.center
            if name=='Coat silhouette':inside=centre.y<-.283 and .386<centre.z<.430
            else:inside=poly.normal.z>.12
            if inside:poly.material_index=index
    for name in ['Nose textured','Eyelid black','Eye wet surface','Warm brown iris','Pupil']:
        mat=bpy.data.materials[P+name];shader=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
        shader.inputs['Specular IOR Level'].default_value=.18
        shader.inputs['Roughness'].default_value=.47 if name=='Nose textured' else .36
        if name=='Warm brown iris':shader.inputs['Base Color'].default_value=(.040,.015,.004,1)
    for sign in [-1,1]:
        pupil=bpy.data.objects[P+f'Pupil {sign}'];pupil.scale=(1.35,1.35,1)
    bpy.context.scene.view_settings.exposure=-.45
    # Regenerate only the two groom regions affected by the mouth mask.
    mat=bpy.data.materials[P+'Ivory guard hair']
    report=json.loads((OUT/'reports/groom.json').read_text(encoding='utf-8'))
    for name,seed,count,region in [('Coat silhouette',730,230000,'body'),('Lower jaw',734,3500,'jaw')]:
        old=bpy.data.objects[P+'Fur '+P+name];bpy.data.objects.remove(old,do_unlink=True)
        entry=groom_object(bpy.data.objects[P+name],count,mat,seed,region)
        report=[entry if r['object']==entry['object'] else r for r in report]
    (OUT/'reports/groom.json').write_text(json.dumps(report,indent=2),encoding='utf-8')

def finish_boundaries():
    coat=bpy.data.objects[P+'Coat silhouette']
    dark=bpy.data.materials[P+'Oral tissue'];index=list(coat.data.materials).index(dark)
    outline=[(-.382,.426),(-.354,.427),(-.321,.424),(-.296,.427),(-.284,.418),(-.303,.398),(-.348,.387),(-.382,.394)]
    # Restrict tissue to the actual boolean planes, not coarse exterior polygon rows.
    for poly in coat.data.polygons:
        poly.material_index=0;c=poly.center
        if not(c.y<-.280 and .382<c.z<.433):continue
        for i,(y,z) in enumerate(outline):
            y2,z2=outline[(i+1)%len(outline)];dy=y2-y;dz=z2-z;length=math.hypot(dy,dz)
            normal=Vector((0,-dz/length,dy/length))
            if abs((c-Vector((0,y,z))).dot(normal))<.000008 and abs(poly.normal.dot(normal))>.999:
                poly.material_index=index;break
    mat=bpy.data.materials[P+'Ivory guard hair']
    report=json.loads((OUT/'reports/groom.json').read_text(encoding='utf-8'))
    for sign in [-1,1]:
        obj=bpy.data.objects[P+f'Ear inset {sign}']
        report.append(groom_object(obj,2600,mat,800+sign,'ear'))
    tree=BVHTree.FromPolygons([v.co for v in coat.data.vertices],[p.vertices[:] for p in coat.data.polygons])
    points=[];radii=[];ts=np.linspace(0,1,8)
    for sign in [-1,1]:
        for j in range(6):
            y=-.344+(j//3)*.011;z=.438+(j%3)*.003
            hit=tree.ray_cast(Vector((sign*.12,y,z)),Vector((-sign,0,0)))
            if hit[0] is None:continue
            root=hit[0]+hit[1]*.000008
            vec=Vector((sign*(.024+.002*j),-.008+(j//3)*.006,.003-(j%3)*.004))
            points.append([root+vec*t+Vector((0,0,-.0015*t*t)) for t in ts]);radii.append([.000026*(1-.97*t) for t in ts])
    curves('Muzzle whiskers',np.asarray(points),np.asarray(radii),mat,coat)
    (OUT/'reports/groom.json').write_text(json.dumps(report,indent=2),encoding='utf-8')

def verify():
    baseline=json.loads((OUT/'reports/protected-baseline.json').read_text(encoding='utf-8'))
    current={name:signature(bpy.data.objects[P+name],name=='Coat silhouette') for name in baseline}
    result={'protectedGeometryUnchanged':current==baseline,'protectedGeometry':current,'hair':[],'scope':'Body coordinate signatures and finite hair data; no animation or full collision validation'}
    assert current==baseline,'Approved body geometry changed'
    for obj in bpy.context.scene.objects:
        if obj.type!='CURVES':continue
        attr=obj.data.attributes['position'];data=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',data)
        rad=obj.data.attributes['radius'];r=np.empty(len(rad.data),dtype=np.float32);rad.data.foreach_get('value',r)
        assert np.isfinite(data).all() and np.isfinite(r).all() and (r>0).all()
        segments=8 if obj.name.endswith('Muzzle whiskers') else 6
        roots=data.reshape(-1,segments,3)[:,0]
        source=obj.data.surface;max_root_distance=None
        if source:
            ev=source.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();me.calc_loop_triangles()
            tree=BVHTree.FromPolygons([source.matrix_world@v.co for v in me.vertices],[t.vertices[:] for t in me.loop_triangles],all_triangles=True)
            sampled=roots[::max(1,len(roots)//500)]
            max_root_distance=max(tree.find_nearest(Vector(r))[3] for r in sampled)
            ev.to_mesh_clear();assert max_root_distance<.0001,(obj.name,max_root_distance)
        result['hair'].append({'name':obj.name,'points':len(attr.data),'finite':True,'positiveRadii':True,'sampledRootMaxDistanceM':max_root_distance})
    import bmesh
    result['structuralMeshes']=[]
    for name in ['Coat silhouette','Lower jaw','Nose']:
        obj=bpy.data.objects[P+name];bm=bmesh.new();bm.from_mesh(obj.data)
        item={'name':name,'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'zeroAreaFaces':sum(f.calc_area()<1e-12 for f in bm.faces)}
        assert item['nonManifoldEdges']==0 and item['zeroAreaFaces']==0
        result['structuralMeshes'].append(item);bm.free()
    result['missingFileTextures']=[im.filepath for im in bpy.data.images if im.source=='FILE' and not im.packed_file and not Path(bpy.path.abspath(im.filepath)).is_file()]
    assert not result['missingFileTextures']
    (OUT/'reports/verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    print('FACE_GROOM_PROTECTED_GEOMETRY_PASS')

def render_views():
    scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=40
    scene.render.resolution_x=1000;scene.render.resolution_y=900
    try:
        p=bpy.context.preferences.addons['cycles'].preferences;p.compute_device_type='OPTIX';p.get_devices()
        for d in p.devices:d.use=d.type=='OPTIX'
        if any(d.use for d in p.devices):scene.cycles.device='GPU'
    except Exception:pass
    for name,loc,target,scale in [('face',(.75,-1,.57),(0,-.25,.445),.265),('front',(0,-1.4,.46),(0,-.24,.44),.28),('side',(1.2,-.23,.46),(0,-.24,.44),.30),('body',(.95,-1.2,.63),(0,-.03,.285),.76)]:
        cam=scene.camera;cam.location=loc;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale
        scene.render.filepath=str(OUT/'previews'/f'{name}.png');bpy.ops.render.render(write_still=True)
    face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/05-face-groom.blend'),compress=True)

if __name__=='__main__':
    import sys
    globals()[sys.argv[sys.argv.index('--')+1]]()
