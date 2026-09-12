"""Native Blender expression revision. Start from saved 05, run apply() once.

Preserves approved body coordinates. Static design study, not an animation rig.
"""
import bpy, math, json, importlib.util, shutil, hashlib
import numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree

ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('face_previous',ROOT/'refine_face_groom.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
b=m.b;P=m.P
OUT=ROOT/'soft-expression'
for d in ['exports','previews','reports']:(OUT/d).mkdir(parents=True,exist_ok=True)

def smoothstep(a,b,x):
    t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)

def warp(points):
    p=np.asarray(points,dtype=float).copy();x,y,z=p.T
    w=(1-smoothstep(-.304,-.260,y))*smoothstep(.370,.392,z)*(1-smoothstep(.432,.447,z))
    p[:,2]+=(.428-z)*.48*w
    # Softly lifted mouth corners, restricted to the facial opening.
    p[:,2]+=.0020*np.exp(-((y+.293)/.014)**2-((z-.422)/.015)**2)*w
    return p

def warp_mesh(obj):
    mat=obj.matrix_world.copy();inv=mat.inverted()
    xyz=np.asarray([mat@v.co for v in obj.data.vertices]);q=warp(xyz)
    for v,old,new in zip(obj.data.vertices,xyz,q):
        if np.any(old!=new):v.co=inv@Vector(new)
    obj.data.update()

def warp_curve(obj):
    inv=obj.matrix_world.inverted()
    for spline in obj.data.splines:
        if spline.type=='BEZIER':continue
        coords=[obj.matrix_world@Vector(p.co[:3]) for p in spline.points]
        for p,q in zip(spline.points,warp(coords)):p.co=(*(inv@Vector(q)),1)

def surface_tree(obj):
    ev=obj.evaluated_get(bpy.context.evaluated_depsgraph_get());me=ev.to_mesh();me.calc_loop_triangles()
    tree=BVHTree.FromPolygons([obj.matrix_world@v.co for v in me.vertices],[t.vertices[:] for t in me.loop_triangles],all_triangles=True)
    ev.to_mesh_clear();return tree

def shade(name,color,rough=.5,spec=.25):
    mat=b.material(name,color,rough);p=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    p.inputs['Specular IOR Level'].default_value=spec
    return mat

def eyes():
    m.drop([f'{stem} {sign}' for sign in [-1,1] for stem in ['Almond eye','Eyelid margin','Iris','Pupil']])
    tree=surface_tree(bpy.data.objects[P+'Coat silhouette'])
    eye_mat=shade('Soft eye continuous cornea',(.02,.011,.006),.27,.23)
    nodes=eye_mat.node_tree.nodes;links=eye_mat.node_tree.links
    shader=next(n for n in nodes if n.type=='BSDF_PRINCIPLED')
    attr=nodes.new('ShaderNodeVertexColor');attr.layer_name='Eye pigment'
    links.new(attr.outputs['Color'],shader.inputs['Base Color'])
    shader.inputs['Coat Weight'].default_value=.05
    shader.inputs['Coat Roughness'].default_value=.16
    lid=shade('Soft eyelid tissue',(.023,.017,.013),.58,.18)
    for sign in [-1,1]:
        centre=Vector((sign*.0405,-.289,.4678))
        n=Vector((sign*.53,-.848,.025)).normalized();u=Vector((sign*.848,.53,0)).normalized()
        up=n.cross(u)*sign
        if up.z<0:up=-up
        def project(q,offset=.00035):
            hit=tree.ray_cast(q+n*.05,-n,.13)
            if hit[0] is None:raise RuntimeError('Eye projection missed coat')
            return hit[0]+n*offset
        c=project(centre);verts=[c+n*.0024];uv=[(0,0)];boundary=[]
        steps=96;rings=18;width=.0128;height=.0091
        for ring in range(1,rings+1):
            r=ring/rings
            for j in range(steps):
                t=math.tau*j/steps;xx=width*r*math.cos(t)
                zz=height*r*math.sin(t)-.00025*r*math.cos(t)
                q=project(centre+u*xx+up*zz)+n*(.0024*(1-r*r))
                verts.append(q);uv.append((xx,zz))
                if ring==rings:boundary.append(q)
        faces=[(0,1+j,1+(j+1)%steps) for j in range(steps)]
        for ring in range(rings-1):
            for j in range(steps):
                a=1+ring*steps+j;z=1+ring*steps+(j+1)%steps;faces.append((a,z,z+steps,a+steps))
        obj=m.mesh(f'Soft eye {sign}',verts,faces,eye_mat)
        col=obj.data.color_attributes.new(name='Eye pigment',type='FLOAT_COLOR',domain='POINT')
        for datum,(xx,zz) in zip(col.data,uv):
            # Circular pupil/iris pigment in one continuously curved ocular surface.
            r=math.hypot(xx+.0009,zz-.00035)/.0085
            angle=math.atan2(zz,xx)
            iris=np.array((.030,.011,.0035))*(.88+.12*math.sin(angle*39))
            pupil=np.array((.003,.0025,.002));outer=np.array((.012,.008,.005))
            color=pupil*(1-smoothstep(.66,.74,r))+iris*smoothstep(.66,.74,r)
            color=color*(1-smoothstep(.86,1.03,r))+outer*smoothstep(.86,1.03,r)
            datum.color=(*color,1)
        m.stroke(f'Soft eyelid margin {sign}',boundary+[boundary[0]],.00040,lid)
        # Thin outer tissue transition follows the actual coat rather than a thick wire.
        rimverts=[];rimfaces=[]
        for row,factor in enumerate([1,1.06,1.16]):
            for j in range(steps):
                t=math.tau*j/steps;q=centre+u*(width*factor*math.cos(t))+up*(height*factor*math.sin(t)-.00025*math.cos(t))
                rimverts.append(project(q,.00030 if row==0 else .00012))
        for row in range(2):
            for j in range(steps):
                a=row*steps+j;z=row*steps+(j+1)%steps;rimfaces.append((a,z,z+steps,a+steps))
        rim=m.mesh(f'Eyelid skin transition {sign}',rimverts,rimfaces,bpy.data.materials[P+'Warm white coat'])
        rim['scope']='Static open surface over coat; not retopologized orbital anatomy'

def mouth_details():
    # Keep teeth as separate objects, but tuck their crowns behind the upper lip.
    for o in bpy.context.scene.objects:
        if o.name.startswith(P+'Upper tooth') or o.name.startswith(P+'Canine'):
            mat=o.matrix_world.copy();inv=mat.inverted()
            for v in o.data.vertices:
                p=mat@v.co;p.z=.4265+(p.z-.4265)*.28;p.x*=.85
                v.co=inv@p
    tongue=bpy.data.objects[P+'Tongue'];tongue.data=tongue.data.copy()
    for v in tongue.data.vertices:v.co.x*=1.13
    tongue.location.y-=.002
    tongue.data.materials.clear();tongue.data.materials.append(shade('Relaxed tongue',(.53,.18,.23),.55,.22))
    jaw=bpy.data.objects[P+'Lower jaw'];jaw.data.update()
    for p in jaw.data.polygons:
        # The broad outside of the jaw is fur-bearing ivory, not exposed gum.
        p.material_index=len(jaw.data.materials)-1 if p.normal.z>.55 else 0
    for stem in ['Upper lip','Lower lip']:
        for sign in [-1,1]:bpy.data.objects[P+f'{stem} {sign}'].data.bevel_depth*=.70
    bpy.data.objects[P+'Front lower lip'].data.bevel_depth*=.65
    m.drop(['Philtrum'])
    # Natural small central cleft, with no dangling geometry below the nose.
    m.stroke('Soft philtrum',[(0,-.365,.4305),(0,-.364,.428),(0,-.359,.4275)],.00038,bpy.data.materials[P+'Moist lip'])

def ears_and_nose():
    for sign in [-1,1]:
        for kind in ['shell','inset']:
            o=bpy.data.objects[P+f'Ear {kind} {sign}']
            for v in o.data.vertices:
                h=max(0,v.co.z-.489);v.co.z-=h*.12
                v.co.x+=sign*.002*smoothstep(.012,.055,h)
                v.co.y+=.003*smoothstep(.012,.055,h)
            for mod in o.modifiers:
                if mod.type=='BEVEL':mod.width=.0022 if kind=='shell' else .0012;mod.segments=4
        inner=bpy.data.objects[P+f'Ear inset {sign}'];inner.data.materials.clear()
        inner.data.materials.append(shade('Pale warm ear',(.58,.39,.35),.87,.18))
    nose=bpy.data.objects[P+'Nose'];nose.scale=(.94,.84,.84)
    mat=nose.data.materials[0];shader=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    shader.inputs['Roughness'].default_value=.52;shader.inputs['Specular IOR Level'].default_value=.20

def move_existing_fur():
    for obj in list(bpy.context.scene.objects):
        if obj.type!='CURVES':continue
        if 'Ear ' in obj.name:
            bpy.data.objects.remove(obj,do_unlink=True);continue
        if not ('Coat silhouette' in obj.name or 'Lower jaw' in obj.name or 'Muzzle whiskers' in obj.name):continue
        attr=obj.data.attributes['position'];data=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',data)
        pts=data.reshape(-1,8 if obj.name.endswith('Muzzle whiskers') else 6,3)
        old=pts.copy();pts[:]=warp(pts.reshape(-1,3)).reshape(pts.shape)
        changed=np.any(pts[:,0]!=old[:,0],axis=1)
        tree=surface_tree(obj.data.surface)
        # Reproject changed roots to exactly the deformed rendered triangles.
        for i in np.flatnonzero(changed):
            hit=tree.find_nearest(Vector(pts[i,0]));shift=np.asarray(hit[0])+np.asarray(hit[1])*.000008-pts[i,0]
            pts[i]+=shift
        attr.data.foreach_set('vector',pts.reshape(-1))
    mat=bpy.data.materials[P+'Ivory guard hair']
    for sign in [-1,1]:
        for kind,count in [('shell',8500),('inset',3200)]:
            obj=bpy.data.objects[P+f'Ear {kind} {sign}']
            m.groom_object(obj,count,mat,920+sign+(10 if kind=='inset' else 0),'ear')
            fur=bpy.data.objects[P+'Fur '+obj.name]
            attr=fur.data.attributes['position'];p=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',p)
            p=p.reshape(-1,6,3);root=p[:,0:1].copy();p[:]=root+(p-root)*1.8
            attr.data.foreach_set('vector',p.reshape(-1))

def apply():
    if Path(bpy.data.filepath).name!='05-face-groom.blend':raise RuntimeError('Start from saved 05-face-groom.blend')
    shutil.copy2(ROOT/'face-groom/reports/protected-baseline.json',OUT/'reports/protected-baseline.json')
    for o in list(bpy.context.scene.objects):
        if not o.name.startswith(P):continue
        if o.name in [P+n for n in ['Continuous base skin','Curled tail core','Tail plume silhouette','Studio ground']]:continue
        if o.type=='MESH' and not any(s in o.name for s in ['Ear ','Almond eye','Iris','Pupil','Nose']):warp_mesh(o)
        if o.type=='CURVE':warp_curve(o)
    bpy.context.view_layer.update()
    eyes();mouth_details();ears_and_nose();bpy.context.view_layer.update();move_existing_fur()
    m.face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/06-soft-expression.blend'),compress=True)
    print('SOFT_EXPRESSION_APPLIED')

def soften_corners():
    """Run once after apply: cover cut corners with small fur-bearing commissures."""
    # Replace the ocular pass so material/iris edits remain reproducible from 05.
    m.drop([f'{stem} {sign}' for sign in [-1,1] for stem in ['Soft eye','Soft eyelid margin','Eyelid skin transition']])
    eyes()
    white=bpy.data.materials[P+'Warm white coat'];hair=bpy.data.materials[P+'Ivory guard hair']
    report=[]
    for sign in [-1,1]:
        cheek=b.ellipsoid(f'Soft mouth corner {sign}',(sign*.035,-.294,.426),(.013,.018,.0115),white)
        cheek.rotation_euler[0]=-.25
        # Slight upper-lip volume hides cut-plane edges and most of the dental arcade.
        lip=b.tube(f'Furred upper muzzle lip {sign}',[(sign*.010,-.357,.429,.0032,.0032),(sign*.022,-.340,.4285,.0040,.0033),(sign*.031,-.317,.4290,.0050,.0040),(sign*.035,-.299,.431,.0070,.0045)],white,sides=24,sub=8)
        for obj,count,seed in [(cheek,3000,1010+sign),(lip,3600,1020+sign)]:
            report.append(m.groom_object(obj,count,hair,seed,'jaw'))
    # A small forward, relaxed tongue tip; no exposed long fangs.
    tongue=bpy.data.objects[P+'Tongue'];mat=tongue.matrix_world.copy();inv=mat.inverted()
    for v in tongue.data.vertices:
        p=mat@v.co;w=1-smoothstep(-.365,-.344,p.y);p.y-=.003*w;p.z-=.0015*w
        v.co=inv@p
    bpy.data.objects[P+'Tongue centre groove'].hide_render=True
    m.face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/06-soft-expression.blend'),compress=True)

def blend_muzzle():
    """Join the added soft tissue into the coat and locally relax the junctions."""
    import bmesh
    coat=bpy.data.objects[P+'Coat silhouette']
    for sign in [-1,1]:
        cheek=bpy.data.objects[P+f'Soft mouth corner {sign}'];cheek.scale.x=.66;cheek.scale.y=.86
        for stem in ['Soft mouth corner','Furred upper muzzle lip']:
            obj=bpy.data.objects[P+f'{stem} {sign}']
            fur=bpy.data.objects.get(P+'Fur '+obj.name)
            if fur:bpy.data.objects.remove(fur,do_unlink=True)
            bpy.ops.object.select_all(action='DESELECT');coat.select_set(True);bpy.context.view_layer.objects.active=coat
            mod=coat.modifiers.new('Join soft muzzle tissue','BOOLEAN');mod.operation='UNION';mod.solver='EXACT';mod.object=obj
            bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(obj,do_unlink=True)
    bm=bmesh.new();bm.from_mesh(coat.data)
    selected=[v for v in bm.verts if v.co.y<-.276 and .416<v.co.z<.437 and abs(v.co.x)>.008]
    for _ in range(14):bmesh.ops.smooth_vert(bm,verts=selected,factor=.32,use_axis_x=True,use_axis_y=True,use_axis_z=True)
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(coat.data);bm.free();coat.data.update()
    bpy.context.view_layer.update();tree=surface_tree(coat)
    for obj in bpy.context.scene.objects:
        if obj.type!='CURVES' or obj.data.surface!=coat:continue
        a=obj.data.attributes['position'];arr=np.empty(len(a.data)*3,dtype=np.float32);a.data.foreach_get('vector',arr)
        arr=arr.reshape(-1,8 if obj.name.endswith('Muzzle whiskers') else 6,3)
        roots=arr[:,0];ids=np.flatnonzero((roots[:,1]<-.266)&(roots[:,2]>.39)&(roots[:,2]<.455))
        for i in ids:
            hit=tree.find_nearest(Vector(arr[i,0]));arr[i]+=np.asarray(hit[0])+np.asarray(hit[1])*.000008-arr[i,0].copy()
        a.data.foreach_set('vector',arr.reshape(-1))
    # Sample just the exterior of the merged muzzle: short transition hairs.
    me=coat.data;me.calc_loop_triangles();verts=np.array([v.co[:] for v in me.vertices])
    tris=np.array([t.vertices[:] for t in me.loop_triangles]);tri=verts[tris];cent=tri.mean(axis=1)
    raw=np.cross(tri[:,1]-tri[:,0],tri[:,2]-tri[:,0]);area=np.linalg.norm(raw,axis=1)
    normals=raw/np.maximum(area[:,None],1e-12)
    # Exclude the original dark internal cut planes.
    exterior=np.array([me.polygons[t.polygon_index].material_index==0 for t in me.loop_triangles])
    keep=exterior&(cent[:,1]<-.278)&(cent[:,2]>.417)&(cent[:,2]<.443)&(abs(cent[:,0])>.008)&(area>1e-12)
    tri=tri[keep];normals=normals[keep];area=area[keep]
    rng=np.random.default_rng(1154);cdf=np.cumsum(area);cdf/=cdf[-1];count=15000
    ix=np.searchsorted(cdf,rng.random(count));a=np.sqrt(rng.random(count));q=rng.random(count)
    root=(tri[ix]*np.stack([1-a,a*(1-q),a*q],axis=1)[:,:,None]).sum(axis=1);n=normals[ix]
    flow=np.tile((0,.65,-.25),(count,1));tangent=flow-n*(n*flow).sum(axis=1)[:,None]
    tangent/=np.maximum(np.linalg.norm(tangent,axis=1)[:,None],1e-9)
    length=rng.uniform(.0012,.0032,count);ts=np.linspace(0,1,6)
    points=np.stack([root+n*.000008+(n*.25+tangent)*(length*t)[:,None] for t in ts],axis=1)
    radii=rng.uniform(.000020,.000029,count)[:,None]*(1-.97*ts[None,:])
    m.curves('Soft muzzle fringe',points,radii,bpy.data.materials[P+'Ivory guard hair'],coat)
    m.face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/06-soft-expression.blend'),compress=True)

def tidy_groom():
    """Clear the enlarged eye aperture and shorten stray ear-apex hairs."""
    obj=bpy.data.objects[P+'Fur '+P+'Coat silhouette'];a=obj.data.attributes['position']
    points=np.empty(len(a.data)*3,dtype=np.float32);a.data.foreach_get('vector',points);points=points.reshape(-1,6,3)
    r=obj.data.attributes['radius'];radii=np.empty(len(r.data),dtype=np.float32);r.data.foreach_get('value',radii);radii=radii.reshape(-1,6)
    keep=np.ones(len(points),dtype=bool)
    for sign in [-1,1]:
        eye=bpy.data.objects[P+f'Soft eye {sign}'];c=np.array(eye.data.vertices[0].co[:])
        n=np.array((sign*.53,-.848,.025));n/=np.linalg.norm(n);u=np.array((sign*.848,.53,0));u/=np.linalg.norm(u)
        up=np.cross(n,u)*sign
        if up[2]<0:up=-up
        delta=points-c;xx=delta@u;zz=delta@up;depth=delta@n
        inside=(xx/.0133)**2+(zz/.0096)**2<1
        keep &= ~np.any(inside&(depth>-.0035)&(depth<.012),axis=1)
    name=obj.name[len(P):];mat=obj.data.materials[0];surface=obj.data.surface
    removed=int((~keep).sum());bpy.data.objects.remove(obj,do_unlink=True)
    m.curves(name,points[keep],radii[keep],mat,surface)
    for obj in bpy.context.scene.objects:
        if obj.type!='CURVES' or 'Ear ' not in obj.name:continue
        attr=obj.data.attributes['position'];arr=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',arr);arr=arr.reshape(-1,6,3)
        root=arr[:,0:1].copy();weight=smoothstep(.524,.539,root[:,0,2])
        factor=.80-.56*weight
        arr[:]=root+(arr-root)*factor[:,None,None];attr.data.foreach_set('vector',arr.reshape(-1))
    bpy.data.objects[P+'Tongue centre groove'].hide_set(True)
    (OUT/'reports/groom-cleanup.json').write_text(json.dumps({'eyeCrossingStrandsRemoved':removed,'earTipLengthFactor':'.80 to .24'},indent=2),encoding='utf-8')
    m.face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/06-soft-expression.blend'),compress=True)

def render(names=('face','front','side','body')):
    scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48
    scene.render.resolution_x=1000;scene.render.resolution_y=900
    for name,loc,target,scale in [('face',(.75,-1,.57),(0,-.25,.445),.265),('front',(0,-1.4,.46),(0,-.24,.44),.28),('side',(1.2,-.23,.46),(0,-.24,.44),.30),('body',(.95,-1.2,.63),(0,-.03,.285),.76)]:
        if name not in names:continue
        cam=scene.camera;cam.location=loc;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=scale
        scene.render.filepath=str(OUT/'previews'/f'{name}.png');bpy.ops.render.render(write_still=True)
    m.face_view()

def verify():
    m.OUT=OUT;m.verify()
    report=json.loads((OUT/'reports/verification.json').read_text(encoding='utf-8'))
    report['source05Sha256']=hashlib.sha256((ROOT/'face-groom/exports/05-face-groom.blend').read_bytes()).hexdigest()
    report['scene']=bpy.data.filepath
    report['furStrands']=sum(len(o.data.curves) for o in bpy.context.scene.objects if o.type=='CURVES' and not o.name.endswith('Muzzle whiskers'))
    report['whiskers']=len(bpy.data.objects[P+'Muzzle whiskers'].data.curves)
    report['scope']='Static soft expression. Body preserved; no full collision, rig or photoreal gate validation.'
    (OUT/'reports/verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/06-soft-expression.blend'),compress=True)
