"""07 native Blender face integration. Start from saved 06; apply once."""
import bpy, bmesh, math, json, hashlib, shutil, importlib.util
import numpy as np
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('expression_previous',ROOT/'soften_expression.py')
old=importlib.util.module_from_spec(s);s.loader.exec_module(old)
m=old.m;b=old.b;P=old.P
OUT=ROOT/'face-integration'
for name in ['exports','previews','reports']:(OUT/name).mkdir(parents=True,exist_ok=True)

def normals(obj):
    bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(obj.data);bm.free();obj.data.update()

def sockets():
    coat=bpy.data.objects[P+'Coat silhouette'];tree=old.surface_tree(coat)
    white=bpy.data.materials[P+'Warm white coat']
    lidmat=old.shade('Integrated lid tissue',(.022,.014,.011),.64,.14)
    eye_material=bpy.data.materials[P+'Soft eye continuous cornea']
    shader=next(n for n in eye_material.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    shader.inputs['Roughness'].default_value=.32;shader.inputs['Specular IOR Level'].default_value=.12
    shader.inputs['Coat Weight'].default_value=.0
    for sign in [-1,1]:
        eye=bpy.data.objects[P+f'Soft eye {sign}'];eye.data=eye.data.copy()
        n=Vector((sign*.53,-.848,.025)).normalized()
        centre=Vector((sign*.0405,-.289,.4678));boundary=[v.co.copy() for v in eye.data.vertices[-96:]]
        # Cut a real shallow pocket under the ocular surface, wholly inside the head region.
        vertices=[q+n*.006 for q in boundary]+[q-n*.013 for q in boundary]
        count=len(boundary);faces=[tuple(reversed(range(count))),tuple(range(count,count*2))]
        faces += [(j,(j+1)%count,(j+1)%count+count,j+count) for j in range(count)]
        cutter=m.mesh(f'Eye pocket cutter {sign}',vertices,faces,white);normals(cutter)
        bpy.ops.object.select_all(action='DESELECT');coat.select_set(True);bpy.context.view_layer.objects.active=coat
        mod=coat.modifiers.new('Inset ocular pocket','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
        bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(cutter,do_unlink=True)
        for i,v in enumerate(eye.data.vertices):
            ring=0 if i==0 else (i-1)//96+1;r=ring/18
            v.co-=n*(.0010+.0009*(1-r*r))
        # The inherited cap had opposite winding on its fan and annular quads.
        # Unify the open front normals before giving it any thickness.
        bm=bmesh.new();bm.from_mesh(eye.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
        if sum(f.normal.dot(n)*f.calc_area() for f in bm.faces)<0:bmesh.ops.reverse_faces(bm,faces=list(bm.faces))
        bm.to_mesh(eye.data);bm.free();eye.data.update()
        # Close the previously open ocular cap behind the visible front surface.
        solid=eye.modifiers.new('Closed ocular volume','SOLIDIFY');solid.thickness=.009;solid.offset=-1
        bpy.ops.object.select_all(action='DESELECT');eye.select_set(True);bpy.context.view_layer.objects.active=eye
        bpy.ops.object.modifier_apply(modifier=solid.name);normals(eye)
        m.drop([f'Soft eyelid margin {sign}',f'Eyelid skin transition {sign}'])
        # Curved lid skin joins the inset eye edge to the uncut outer cheek surface.
        vertices=[];faces=[];rows=7
        for row in range(rows):
            t=row/(rows-1)
            for q in boundary:
                outer=centre+(q-centre)*1.20
                hit=tree.ray_cast(outer+n*.05,-n,.13)
                if hit[0] is None:raise RuntimeError('Outer eyelid projection missed')
                a=q-n*.00085;z=hit[0]+n*.00010
                vertices.append(a*(1-t)+z*t+n*(.00060*math.sin(math.pi*t)))
        for row in range(rows-1):
            for j in range(96):
                a=row*96+j;z=row*96+(j+1)%96;faces.append((a,z,z+96,a+96))
        skin=m.mesh(f'Integrated eyelid {sign}',vertices,faces,white)
        skin['scope']='Static eyelid bridge; not production facial deformation topology'
        inner=[q-n*.00073 for q in boundary]
        m.stroke(f'Fine tear line {sign}',inner+[inner[0]],.00022,lidmat)
    bpy.context.view_layer.update()

def lower_mouth():
    m.drop(['Fur '+P+'Lower jaw','Lower jaw','Front lower lip','Lower lip -1','Lower lip 1','Tongue centre groove'])
    white=bpy.data.materials[P+'Warm white coat']
    jaw=b.tube('Lower jaw',[(0,-.281,.420,.021,.008),(0,-.307,.4135,.022,.0055),(0,-.336,.4105,.0185,.0045),(0,-.354,.4130,.010,.0032)],white,sides=40,sub=10)
    # A thin oral floor rests within the jaw. Exterior stays fur bearing.
    floor=old.shade('Soft oral floor',(.022,.006,.008),.78,.14)
    normals(jaw);jaw.data.materials.append(floor)
    for polygon in jaw.data.polygons:
        if polygon.normal.z>.42:polygon.material_index=1
    b.ellipsoid('Lower oral floor',(0,-.331,.4141),(.018,.027,.0019),floor)
    lipmat=old.shade('Natural lower lip',(.017,.012,.010),.57,.16)
    # Continuous U-shaped lip, fitted to the slimmer jaw instead of separate dangling strips.
    points=[(-.030,-.298,.424),(-.022,-.313,.4188),(-.019,-.337,.4156),(-.009,-.357,.4152),(0,-.359,.4150),(.009,-.357,.4152),(.019,-.337,.4156),(.022,-.313,.4188),(.030,-.298,.424)]
    m.stroke('Continuous lower lip',points,.00073,lipmat)
    m.groom_object(jaw,4500,bpy.data.materials[P+'Ivory guard hair'],1311,'jaw')
    # The old cavity is recessed farther than the floor so it cannot read as a gum lump.
    cavity=bpy.data.objects[P+'Mouth cavity'];cavity.location.y+=.002;cavity.scale.z*=.78
    # Avoid excessive gloss on the small tongue tip.
    mat=bpy.data.objects[P+'Tongue'].data.materials[0]
    shader=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    shader.inputs['Roughness'].default_value=.62;shader.inputs['Specular IOR Level'].default_value=.16

def rebind_orbit_hair():
    coat=bpy.data.objects[P+'Coat silhouette'];tree=old.surface_tree(coat)
    obj=bpy.data.objects[P+'Fur '+P+'Coat silhouette'];attr=obj.data.attributes['position']
    a=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',a);a=a.reshape(-1,6,3)
    r=obj.data.attributes['radius'];rad=np.empty(len(r.data),dtype=np.float32);r.data.foreach_get('value',rad);rad=rad.reshape(-1,6)
    keep=np.ones(len(a),dtype=bool)
    # Respect the aperture after the pocket cut: no hairs rooted in the new eye pocket.
    for sign in [-1,1]:
        n=np.array((sign*.53,-.848,.025));n/=np.linalg.norm(n);u=np.array((sign*.848,.53,0));u/=np.linalg.norm(u)
        up=np.cross(n,u)*sign
        if up[2]<0:up=-up
        c=np.array(bpy.data.objects[P+f'Soft eye {sign}'].data.vertices[0].co[:])
        delta=a-c;xx=delta@u;zz=delta@up;d=delta@n
        keep &= ~np.any(((xx/.0132)**2+(zz/.0095)**2<1)&(d>-.007)&(d<.010),axis=1)
    ids=np.flatnonzero(keep&(a[:,0,1]<-.263)&(a[:,0,2]>.447)&(a[:,0,2]<.489))
    for i in ids:
        hit=tree.find_nearest(Vector(a[i,0]));a[i]+=np.asarray(hit[0])+np.asarray(hit[1])*.000008-a[i,0].copy()
    mat=obj.data.materials[0];name=obj.name[len(P):];bpy.data.objects.remove(obj,do_unlink=True)
    m.curves(name,a[keep],rad[keep],mat,coat)
    return int((~keep).sum())

def apply():
    if Path(bpy.data.filepath).name!='06-soft-expression.blend':raise RuntimeError('Start from saved 06')
    shutil.copy2(ROOT/'soft-expression/reports/protected-baseline.json',OUT/'reports/protected-baseline.json')
    sockets();lower_mouth();removed=rebind_orbit_hair()
    (OUT/'reports/revision.json').write_text(json.dumps({'source':'06-soft-expression.blend','eyePocketDepthMm':13,'eyeCentreInsetMm':1.9,'removedOrbitalHairs':removed,'scope':'Static eyelid pocket and bridge; slimmer jaw and continuous lip'},indent=2),encoding='utf-8')
    save()

def ear_cups():
    """Replace the flat ear prisms with rounded, shallow, closed pinna bowls."""
    hair=bpy.data.materials[P+'Ivory guard hair']
    ear_mat=old.shade('Pinna skin and coat',(.80,.77,.71),.84,.17)
    nodes=ear_mat.node_tree.nodes;links=ear_mat.node_tree.links
    shader=next(n for n in nodes if n.type=='BSDF_PRINCIPLED')
    attr=nodes.new('ShaderNodeVertexColor');attr.layer_name='Pinna color';links.new(attr.outputs['Color'],shader.inputs['Base Color'])
    for sign in [-1,1]:
        source=bpy.data.objects[P+f'Ear shell {sign}'];outline=[source.data.vertices[i].co.copy() for i in range(5)]
        # Periodic Catmull-Rom boundary retains the original five landmarks.
        boundary=[]
        for i in range(5):
            a=outline[(i-1)%5];q=outline[i];c=outline[(i+1)%5];d=outline[(i+2)%5]
            for k in range(20):
                t=k/20;boundary.append(.5*((2*q)+(-a+c)*t+(2*a-5*q+4*c-d)*t*t+(-a+3*q-3*c+d)*t*t*t))
        centre=Vector((sign*.0355,-.227,.507));verts=[];colors=[];faces=[];steps=len(boundary);rings=14
        cream=np.array((.82,.80,.75));pink=np.array((.56,.34,.30))
        for side in [0,1]:
            offset=len(verts);mid=centre.copy();mid.y+=.0038 if side==0 else .010
            verts.append(mid);colors.append(pink if side==0 else cream)
            for ring in range(1,rings+1):
                r=ring/rings
                for q in boundary:
                    v=centre*(1-r)+q*r
                    v.y+=(.0038*(1-r*r)) if side==0 else (.0024+.0076*(1-r*r))
                    verts.append(v)
                    blend=(1-old.smoothstep(.50,.82,r))*old.smoothstep(.491,.502,v.z) if side==0 else 0
                    colors.append(cream*(1-blend)+pink*blend)
            faces.extend((offset,offset+1+j,offset+1+(j+1)%steps) for j in range(steps))
            for ring in range(rings-1):
                for j in range(steps):
                    a=offset+1+ring*steps+j;z=offset+1+ring*steps+(j+1)%steps
                    faces.append((a,a+steps,z+steps,z))
        size=1+rings*steps;start=1+(rings-1)*steps
        for j in range(steps):
            a=start+j;z=start+(j+1)%steps;faces.append((a,z,z+size,a+size))
        for stem in ['Ear shell','Ear inset']:
            m.drop([f'Fur {P}{stem} {sign}',f'{stem} {sign}'])
        obj=m.mesh(f'Ear cup {sign}',verts,faces,ear_mat);normals(obj)
        col=obj.data.color_attributes.new(name='Pinna color',type='FLOAT_COLOR',domain='POINT')
        for datum,color in zip(col.data,colors):datum.color=(*color,1)
        m.groom_object(obj,15500,hair,1400+sign,'ear')
        fur=bpy.data.objects[P+'Fur '+obj.name];a=fur.data.attributes['position'];data=np.empty(len(a.data)*3,dtype=np.float32);a.data.foreach_get('vector',data)
        data=data.reshape(-1,6,3);root=data[:,0:1].copy();factor=1.12-.82*old.smoothstep(.527,.540,root[:,0,2])
        data[:]=root+(data-root)*factor[:,None,None];a.data.foreach_set('vector',data.reshape(-1))
    save()

def lid_fringe():
    """Fine hairs on the outer lid transition, directed away from the aperture."""
    rng=np.random.default_rng(1610);hair=bpy.data.materials[P+'Ivory guard hair']
    for sign in [-1,1]:
        obj=bpy.data.objects[P+f'Integrated eyelid {sign}'];me=obj.data;me.calc_loop_triangles()
        xyz=np.array([v.co[:] for v in me.vertices]);tris=np.array([t.vertices[:] for t in me.loop_triangles])
        # Last four of seven radial rows: keep the tear line clear.
        tris=tris[np.min(tris,axis=1)>=96*2];tri=xyz[tris]
        raw=np.cross(tri[:,1]-tri[:,0],tri[:,2]-tri[:,0]);area=np.linalg.norm(raw,axis=1);normal=raw/np.maximum(area[:,None],1e-12)
        forward=np.array((sign*.53,-.848,.025));normal[(normal@forward)<0]*=-1
        cdf=np.cumsum(area);cdf/=cdf[-1];count=1400;ix=np.searchsorted(cdf,rng.random(count))
        a=np.sqrt(rng.random(count));q=rng.random(count);bc=np.stack([1-a,a*(1-q),a*q],axis=1)
        roots=(tri[ix]*bc[:,:,None]).sum(axis=1);n=normal[ix]
        c=np.array(bpy.data.objects[P+f'Soft eye {sign}'].data.vertices[0].co[:]);flow=roots-c;flow-=n*(flow*n).sum(axis=1)[:,None]
        flow/=np.maximum(np.linalg.norm(flow,axis=1)[:,None],1e-9);length=rng.uniform(.0007,.0016,count);ts=np.linspace(0,1,6)
        points=np.stack([roots+n*.000008+(flow+n*.10)*(length*t)[:,None] for t in ts],axis=1)
        radii=rng.uniform(.000015,.000024,count)[:,None]*(1-.97*ts[None,:])
        m.curves(f'Eyelid fringe {sign}',points,radii,hair,obj)
    save()

def settle_roots():
    """Re-seat all facial roots after Boolean triangle tessellation changes."""
    coat=bpy.data.objects[P+'Coat silhouette'];tree=old.surface_tree(coat);changed=0
    for obj in bpy.context.scene.objects:
        if obj.type!='CURVES' or obj.data.surface!=coat:continue
        attr=obj.data.attributes['position'];data=np.empty(len(attr.data)*3,dtype=np.float32);attr.data.foreach_get('vector',data)
        data=data.reshape(-1,8 if obj.name.endswith('Muzzle whiskers') else 6,3)
        ids=np.flatnonzero((data[:,0,1]<-.260)&(data[:,0,2]>.370))
        for i in ids:
            hit=tree.find_nearest(Vector(data[i,0]));delta=np.asarray(hit[0])+np.asarray(hit[1])*.000008-data[i,0].copy()
            if np.linalg.norm(delta)>.000020:data[i]+=delta;changed+=1
        attr.data.foreach_set('vector',data.reshape(-1))
    (OUT/'reports/root-settle.json').write_text(json.dumps({'facialRootsReseated':changed,'reason':'Final Boolean evaluated triangles differ from source tessellation'},indent=2),encoding='utf-8');save()

def save():
    m.face_view();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'exports/07-face-integration.blend'),compress=True)

def render(names=('face','front','side','body')):
    old.OUT=OUT;old.render(names)

def verify():
    m.OUT=OUT;m.verify()
    report=json.loads((OUT/'reports/verification.json').read_text(encoding='utf-8'))
    report['ocularMeshes']=[]
    for sign in [-1,1]:
        obj=bpy.data.objects[P+f'Soft eye {sign}'];bm=bmesh.new();bm.from_mesh(obj.data)
        item={'name':obj.name,'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'zeroAreaFaces':sum(f.calc_area()<1e-12 for f in bm.faces)}
        assert item['nonManifoldEdges']==0 and item['zeroAreaFaces']==0,item
        report['ocularMeshes'].append(item);bm.free()
    report['earMeshes']=[]
    for sign in [-1,1]:
        obj=bpy.data.objects.get(P+f'Ear cup {sign}')
        if obj is None:continue
        bm=bmesh.new();bm.from_mesh(obj.data)
        item={'name':obj.name,'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'zeroAreaFaces':sum(f.calc_area()<1e-12 for f in bm.faces)}
        assert item['nonManifoldEdges']==0 and item['zeroAreaFaces']==0,item
        report['earMeshes'].append(item);bm.free()
    report['source06Sha256']=hashlib.sha256((ROOT/'soft-expression/exports/06-soft-expression.blend').read_bytes()).hexdigest()
    report['furStrands']=sum(len(o.data.curves) for o in bpy.context.scene.objects if o.type=='CURVES' and not o.name.endswith('Muzzle whiskers'))
    report['whiskers']=len(bpy.data.objects[P+'Muzzle whiskers'].data.curves)
    report['scope']='Static mesh/roots and approved body preservation; no animation binding, global self collision or photographic fidelity gate.'
    (OUT/'reports/verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8');save()
