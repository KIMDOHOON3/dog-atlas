import bpy, math, random
from mathutils import Vector
from pathlib import Path

OUT=Path('C:/Users/김도훈/Desktop/강아지/design/blender-spitz')
scene=bpy.data.scenes.new('Spitz portrait study')
bpy.context.window.scene=scene
random.seed(92)
def material(name,color,rough=.5):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Roughness'].default_value=rough
    return m
white=material('Warm white coat',(.79,.77,.71),.78)
black=material('Soft black leather',(.012,.009,.008),.36)
eye=material('Deep brown cornea',(.019,.011,.006),.14)
eye.node_tree.nodes.get('Principled BSDF').inputs['Coat Weight'].default_value=.7
pink=material('Ear interior',(.36,.235,.20),.9)
parts=[]
def ell(name,loc,scale,mat=white,join=False):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=20,location=loc)
    ob=bpy.context.object;ob.name=name;ob.scale=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    ob.data.materials.append(mat)
    for p in ob.data.polygons:p.use_smooth=True
    if join:parts.append(ob)
    return ob
ell('Torso',(0,.11,.91),(.32,.62,.34),join=True)
ell('Chest',(0,-.30,1.03),(.32,.32,.40),join=True)
ell('Neck',(0,-.46,1.30),(.235,.245,.32),join=True)
ell('Skull',(0,-.54,1.57),(.245,.235,.255),join=True)
ell('Cheek L',(-.13,-.61,1.46),(.145,.17,.14),join=True)
ell('Cheek R',(.13,-.61,1.46),(.145,.17,.14),join=True)
ell('Tapered muzzle',(0,-.795,1.49),(.118,.24,.105),join=True)
ell('Lower jaw',(0,-.765,1.421),(.092,.20,.05),join=True)
for side in [-1,1]:
    x=side*.225
    ell('Shoulder',(x,-.28,.75),(.09,.12,.29),join=True)
    ell('Foreleg',(x,-.32,.36),(.058,.066,.28),join=True)
    ell('Front paw',(x,-.385,.085),(.083,.123,.074),join=True)
    ell('Haunch',(x,.48,.72),(.14,.205,.26),join=True)
    ell('Hind upper',(x,.43,.43),(.082,.12,.18),join=True)
    ell('Hock',(x,.58,.24),(.052,.064,.18),join=True)
    ell('Back paw',(x,.51,.073),(.078,.115,.067),join=True)
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();body=bpy.context.object;body.name='Continuous sculpted Spitz'
rem=body.modifiers.new('Continuous skin','REMESH');rem.mode='VOXEL';rem.voxel_size=.014;rem.use_smooth_shade=True
bpy.ops.object.modifier_apply(modifier=rem.name)
sm=body.modifiers.new('Relax surface','SMOOTH');sm.factor=1.2;sm.iterations=5;bpy.ops.object.modifier_apply(modifier=sm.name)
sub=body.modifiers.new('Smooth skin','SUBSURF');sub.levels=1

def fur(ob,count,length,children,face_weights=False):
    bpy.context.view_layer.objects.active=ob
    bpy.ops.object.select_all(action='DESELECT');ob.select_set(True)
    bpy.ops.object.particle_system_add()
    ps=ob.particle_systems[-1].settings;ps.type='HAIR';ps.count=count;ps.hair_length=length;ps.hair_step=3
    ps.child_type='INTERPOLATED';ps.child_percent=children;ps.rendered_child_count=children
    ps.clump_factor=.12;ps.roughness_1=.008;ps.roughness_endpoint=.013
    ps.root_radius=.007;ps.tip_radius=.001;ps.radius_scale=.12
    if face_weights:
        vg=ob.vertex_groups.new(name='Short face long ruff')
        for v in ob.data.vertices:
            p=ob.matrix_world@v.co
            w=1
            if p.z>1.37: w=.14 if p.y<-.56 else .45
            if p.z<.60:w=.17
            vg.add([v.index],w,'REPLACE')
        ob.particle_systems[-1].vertex_group_length=vg.name
    return ps
fur(body,14000,.10,9,True)

def curve(name,points,r,mat):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=16;c.bevel_depth=r;c.bevel_resolution=4
    sp=c.splines.new('BEZIER');sp.bezier_points.add(len(points)-1)
    for v,p in zip(sp.bezier_points,points):v.co=p;v.handle_left_type='AUTO';v.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);c.materials.append(mat);return o

# Eye orientation follows the skull, rather than two front-facing dark discs.
for side in [-1,1]:
    center=Vector((side*.174,-.722,1.605))
    outward=Vector((side*.48,-.87,.02)).normalized()
    horizontal=Vector((.87,side*.48,0)).normalized()
    up=Vector((0,0,1))
    ob=ell('Recessed brown eye',center,(.041,.041,.041),eye)
    # A soft upper lid covers the upper globe. Only a rounded almond aperture is visible.
    for upper in [True,False]:
        pts=[]
        for i in range(17):
            u=-1+i/8
            h=(.021 if upper else -.026)*math.sqrt(max(0,1-u*u))
            p=center+horizontal*(.039*u)+up*h+outward*(.029-.012*u*u)
            pts.append(p)
        curve('Upper eyelid' if upper else 'Lower eyelid',pts,.003,black)
        # Skin strip tapers from lid to brow/cheek; no circular white ring.
        verts=[];faces=[]
        for row in range(7):
            t=row/6
            for i,p in enumerate(pts):
                u=-1+i/8
                v=p+up*((1 if upper else -1)*.045*t)+horizontal*(u*.02*t)-outward*(.035*t)
                verts.append(v)
                if row<6 and i<16:
                    a=row*17+i;faces.append((a,a+1,a+18,a+17))
        me=bpy.data.meshes.new('Lid skin');me.from_pydata(verts,[],faces);me.update()
        skin=bpy.data.objects.new('Brow' if upper else 'Lower eye skin',me);scene.collection.objects.link(skin);me.materials.append(white)
        for f in me.polygons:f.use_smooth=True
        sol=skin.modifiers.new('Lid thickness','SOLIDIFY');sol.thickness=.005
        su=skin.modifiers.new('Lid smoothing','SUBSURF');su.levels=2
        fur(skin,240,.014,5)
    # Rounded triangular ears, with an interior that recedes into the white rim.
    verts=[(side*.085,-.51,1.70),(side*.285,-.50,1.69),(side*.225,-.46,1.99),(side*.177,-.38,1.76)]
    me=bpy.data.meshes.new('Ear wedge');me.from_pydata(verts,[],[(0,1,2),(0,3,1),(1,3,2),(2,3,0)]);me.update()
    ear=bpy.data.objects.new('Upright ear',me);scene.collection.objects.link(ear);me.materials.append(white)
    bevel=ear.modifiers.new('Soft ear edge','BEVEL');bevel.width=.035;bevel.segments=4
    for f in me.polygons:f.use_smooth=True
    fur(ear,900,.024,5)
    inner=ell('Quiet ear hollow',(side*.205,-.512,1.80),(.041,.008,.092),pink);inner.rotation_euler[1]=side*.20

nose=ell('Nose',(0,-1.014,1.506),(.064,.045,.042),black)
nodes=black.node_tree.nodes;links=black.node_tree.links
noise=nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=115
bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.16;bump.inputs['Distance'].default_value=.008
links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],nodes.get('Principled BSDF').inputs['Normal'])
for side in [-1,1]:
    curve('Mouth crease',[(0,-.995,1.453),(side*.054,-.923,1.424),(side*.102,-.786,1.425)],.0024,black)
# A curled plume resting over the back.
tail=curve('Curled plume',[(0,.65,1.03),(0,.79,1.32),(.03,.62,1.51),(.07,.32,1.45),(.09,.24,1.26)],.092,white)
bpy.context.view_layer.objects.active=tail;tail.select_set(True)
bpy.ops.object.select_all(action='DESELECT');tail.select_set(True);bpy.ops.object.convert(target='MESH');tail=bpy.context.object
fur(tail,3500,.15,10)

floor=material('Studio stone',(.22,.255,.25),.85)
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(floor)
world=bpy.data.worlds.new('Soft studio');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.35,.40,.45,1);world.node_tree.nodes['Background'].inputs[1].default_value=.35;scene.world=world
def area(name,loc,power,size,color):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color
    o=bpy.data.objects.new(name,data);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
area('Broad key',(-3,-4,5),500,4,(1,.91,.80))
area('Cool fill',(3,-1,3),240,3,(.78,.88,1))
area('Ruff rim',(0,3,4),550,3,(1,.94,.84))
cam=bpy.data.objects.new('Portrait camera',bpy.data.cameras.new('Portrait camera'));scene.collection.objects.link(cam);scene.camera=cam
cam.location=(3,-5,2.65);target=Vector((0,-.05,1));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=2.65
scene.render.engine='CYCLES';scene.cycles.samples=40;scene.cycles.use_denoising=True
scene.render.resolution_x=1200;scene.render.resolution_y=1200;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.render.image_settings.file_format='PNG'
scene.render.filepath=str(OUT/'portrait.png')
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'japanese-spitz.blend'))
print('SPITZ_STUDY_SAVED')
