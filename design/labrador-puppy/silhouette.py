"""V3 silhouette study, informed visually by the user's downloaded retriever.

Input geometry is exclusively our v2 native file. The downloaded asset is not
loaded, transferred, or included in the output. Run with -- shape or -- finish.
"""
import bpy,sys,json,shutil
import numpy as np
from pathlib import Path
from mathutils import Matrix
from mathutils.kdtree import KDTree
SOURCE=Path(__file__).resolve().parent
PHASE=sys.argv[sys.argv.index('--')+1] if '--' in sys.argv else 'shape'
sys.argv=['silhouette.py'];sys.path.insert(0,str(SOURCE))
import build as b
ROOT=SOURCE/'v3';b.ROOT=ROOT
PROFILE=None
for folder in ['stages','previews','textures','exports','reports']:(ROOT/folder).mkdir(parents=True,exist_ok=True)

def smooth(a,lo,hi):
    t=np.clip((a-lo)/(hi-lo),0,1);return t*t*(3-2*t)

def deform(coords):
    p=np.asarray(coords,dtype=np.float64)/b.S
    x,y,z=p.T;out=p.copy()
    # Lower and seat the head into the neck; preserve its internal relationships.
    head=smooth(z,1.80,2.62)*(1-smooth(y,-.25,.50))
    out[:,2]-=.27*head
    out[:,1]+=.04*head
    # Bring the withers into the upper neck instead of leaving a V-shaped notch.
    withers=np.exp(-((y+.36)/.49)**2)*smooth(z,2.08,2.53)
    out[:,2]+=.30*withers
    # Raise the hanging brisket and support the belly toward the groin.
    midline=1-smooth(np.abs(x),.22,.42)
    low=1-smooth(z,1.28,1.96)
    brisket=np.exp(-((y+.66)/.43)**2)*smooth(z,.70,1.10)*low
    out[:,2]+=.34*brisket
    abdomen=np.exp(-((y-.82)/.65)**2)*smooth(z,.65,1.08)*(1-smooth(z,1.50,2.00))*midline
    out[:,2]+=.16*abdomen
    out[:,1]-=.18*smooth(y,1.10,1.62)*smooth(z,.65,1.05)*(1-smooth(z,1.70,2.00))
    # Extend the back between the shoulder and pelvis without lengthening the head.
    out[:,1]+=.27*smooth(y,-.25,1.10)
    # Forward stifle, rearward hock, short near-vertical rear pastern.
    rear=smooth(y,.25,.65)*smooth(np.abs(x),.24,.43)
    out[:,1]+=rear*(.29*(1-smooth(z,.50,1.10))-.09*np.exp(-((z-1.28)/.29)**2))
    # Slightly less ball-shaped cranial crown; muzzle and eye placement stay put.
    crown=smooth(z,2.98,3.32)*(1-smooth(y,-.75,-.40))
    out[:,2]-=.045*crown
    if PROFILE is not None:
        grid,ceiling=PROFILE
        top=np.interp(y,grid,ceiling)
        knots=np.array([-1.40,-1.10,-.90,-.70,-.40,-.10,.30,.70,1.10,1.45])
        heights=np.array([3.01,2.97,2.84,2.69,2.56,2.51,2.50,2.46,2.39,2.24])
        slope=np.gradient(heights,knots)
        idx=np.clip(np.searchsorted(knots,y)-1,0,len(knots)-2)
        width=knots[idx+1]-knots[idx];t=np.clip((y-knots[idx])/width,0,1)
        target=(2*t**3-3*t**2+1)*heights[idx]+(t**3-2*t**2+t)*width*slope[idx]+(-2*t**3+3*t**2)*heights[idx+1]+(t**3-t**2)*width*slope[idx+1]
        envelope=smooth(y,-1.42,-1.23)*(1-smooth(y,1.15,1.45))
        influence=smooth(out[:,2],1.80,np.maximum(1.9,top-.015))
        out[:,2]+=(target-top)*envelope*influence
    return out*b.S

def apply_field():
    global PROFILE
    body=bpy.data.objects['Puppy_RenderMesh'];a=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',a);a=a.reshape(-1,3)
    raw=deform(a)/b.S;original=a/b.S
    grid=np.linspace(-1.55,1.55,311);ceiling=np.full(len(grid),np.nan)
    for i,yy in enumerate(grid):
        mask=(np.abs(original[:,1]-yy)<.014)&(np.abs(original[:,0])<.14)
        if np.any(mask):ceiling[i]=np.max(raw[mask,2])
    valid=np.isfinite(ceiling);ceiling=np.interp(grid,grid[valid],ceiling[valid])
    kernel=np.exp(-.5*(np.arange(-30,31)/12)**2);kernel/=kernel.sum()
    ceiling=np.convolve(np.pad(ceiling,(30,30),mode='edge'),kernel,mode='valid')
    PROFILE=(grid,ceiling)
    for o in list(bpy.context.scene.objects):
        if o.get('studio') or o.type not in ['MESH','CURVES']:continue
        matrix=np.array(o.matrix_world,dtype=np.float64)
        if o.type=='MESH':
            values=np.empty(len(o.data.vertices)*3);o.data.vertices.foreach_get('co',values)
        else:
            values=np.empty(len(o.data.points)*3);o.data.attributes['position'].data.foreach_get('vector',values)
        coords=values.reshape(-1,3)@matrix[:3,:3].T+matrix[:3,3]
        moved=deform(coords).astype(np.float32).reshape(-1)
        if o.type=='MESH':o.data.vertices.foreach_set('co',moved);o.data.update()
        else:o.data.attributes['position'].data.foreach_set('vector',moved)
        o.matrix_world=Matrix.Identity(4)

def shape():
    bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'v2/exports/labrador-puppy-fur.blend'))
    for path in (SOURCE/'v2/textures').glob('*.png'):shutil.copy2(path,ROOT/'textures'/path.name)
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath=str(ROOT/'textures'/Path(img.filepath).name)
    apply_field()
    # Relax the neck surface itself after the proportion field. A coordinate
    # field alone preserves the old occiput/neck crease too strongly.
    body=bpy.data.objects['Puppy_RenderMesh'];before=np.empty(len(body.data.vertices)*3);body.data.vertices.foreach_get('co',before);before=before.reshape(-1,3)
    for name,iterations in [('Puppy_RenderMesh',500),('Puppy_HighPoly',1000)]:
        ob=bpy.data.objects[name];was_hidden=ob.hide_get();ob.hide_set(False);b.active(ob)
        co=np.empty(len(ob.data.vertices)*3);ob.data.vertices.foreach_get('co',co);co=co.reshape(-1,3)/b.S
        weight=np.exp(-((co[:,1]+.57)/.38)**4)*smooth(co[:,2],1.80,2.12)*(1-smooth(co[:,2],2.97,3.12))
        group=ob.vertex_groups.new(name='Neck surface relaxation');bins=np.rint(weight*32).astype(int)
        for value in range(1,33):
            ids=np.flatnonzero(bins==value).tolist()
            if ids:group.add(ids,value/32,'REPLACE')
        mod=ob.modifiers.new('Relax neck into withers','SMOOTH');mod.factor=.85;mod.iterations=iterations;mod.vertex_group=group.name
        bpy.ops.object.modifier_apply(modifier=mod.name);ob.hide_set(was_hidden)
    after=np.empty(before.size);body.data.vertices.foreach_get('co',after);delta=after.reshape(-1,3)-before
    tree=KDTree(len(before))
    for i,p in enumerate(before):tree.insert(p,i)
    tree.balance()
    hair=bpy.data.objects['Groom_Puppy_RenderMesh'];p=np.empty(len(hair.data.points)*3);hair.data.attributes['position'].data.foreach_get('vector',p);p=p.reshape(-1,6,3)
    roots=p[:,0];mask=(roots[:,1]>-.13)&(roots[:,1]<.02)&(roots[:,2]>.17)
    for i in np.flatnonzero(mask):
        _,nearest,_=tree.find(roots[i]);p[i]+=delta[nearest]
    hair.data.attributes['position'].data.foreach_set('vector',p.astype(np.float32).reshape(-1))
    for img in bpy.data.images:
        if img.source=='FILE':img.filepath='//../textures/'+Path(img.filepath).name
    b.studio();b.save(5)
    for o in bpy.context.scene.objects:
        if o.type=='CURVES':o.hide_render=True
    for mat in bpy.data.materials:
        if mat.name=='Puppy skin':
            p=mat.node_tree.nodes.get('Principled BSDF')
            for socket in ['Base Color','Normal']:
                for link in list(p.inputs[socket].links):mat.node_tree.links.remove(link)
            p.inputs['Base Color'].default_value=(.48,.46,.42,1)
    for view in ['front','side','face','three-quarter']:b.render(view,3)
    b.save(3)
    report={'input':'v2/exports/labrador-puppy-fur.blend','reference':'User-downloaded golden-retriever-dog-3d-model-free.zip, visually inspected in Blender; no reference mesh or textures transferred.','changes':['Lower head into neck','Shape a continuous occiput-withers-back profile','Raise pendulous brisket','Lift central rear belly','Extend shoulder-to-pelvis span','Advance stifle and move hock/pastern rearward'],'method':'Continuous coordinate field applied to own meshes and all hair points; dorsal profile interpolation and local neck surface relaxation; nearby hair strands moved by surface displacement. Original v2 UVs and 4K maps retained.','limits':['Static triangle mesh; not deformation-ready quad topology','No animation','Visual proportions are a study, not measured animal anatomy','Photoreal quality remains unfulfilled']}
    (ROOT/'reports/03-silhouette.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    topology={'high_poly_faces':len(bpy.data.objects['Puppy_HighPoly'].data.polygons),'render_faces':len(body.data.polygons),'render_quads':sum(len(p.vertices)==4 for p in body.data.polygons),'method':'v2 triangle topology retained, positions reshaped and neck surface relaxed. No new retopology.','deformation_status':'Static appearance study; not hand-retopologized, rigged or skinning-approved.'}
    (ROOT/'reports/03-topology.json').write_text(json.dumps(topology,indent=2),encoding='utf-8')

if PHASE=='shape':shape()
elif PHASE=='finish':b.stage6()
