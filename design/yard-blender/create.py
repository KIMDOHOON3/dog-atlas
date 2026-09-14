import bpy, math
from mathutils import Vector
from pathlib import Path
OUT=Path('C:/Users/김도훈/Desktop/강아지')
# Rebuild the active playground from this source; run in its dedicated Blender file.
for ob in list(bpy.data.objects):bpy.data.objects.remove(ob,do_unlink=True)
for material in list(bpy.data.materials):bpy.data.materials.remove(material)
for blocks in [bpy.data.meshes,bpy.data.curves]:
    for data in list(blocks):
        if data.users==0:blocks.remove(data)
s=bpy.data.scenes.new('Atlas open lawn');bpy.context.window.scene=s
def mat(name,color,rough=.8,metal=0):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    p=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
    return m
oak=mat('Yard oak',(.49,.29,.135));edge=mat('Oak end grain',(.36,.20,.10));iron=mat('Warm graphite',(.075,.082,.072),.6,.25);bolt=mat('Aged bronze',(.30,.23,.13),.42,.55)
cream=mat('Natural cotton',(.62,.52,.36));rust=mat('Clay cotton',(.30,.13,.075))
def block(name,loc,scale,material,bevel=.02):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.scale=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
    m=o.modifiers.new('Crafted edge','BEVEL');m.width=bevel;m.segments=3;bpy.ops.object.modifier_apply(modifier=m.name)
    m=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=m.name)
    return o
bench=[]
for i in range(5):bench.append(block('Rounded seat slat',(0,-.32+i*.155,.61),(2.4,.135,.085),oak,.022))
for i in range(3):
    o=block('Reclined back slat',(0,.36+i*.035,.87+i*.18),(2.4,.078,.145),oak,.025);o.rotation_euler.x=math.radians(-10);bench.append(o)
for x in [-.91,.91]:
    for y in [-.24,.29]:
        o=block('Splayed leg',(x,y,.29),(.08,.09,.58),iron,.015);o.rotation_euler.y=(-1 if x<0 else 1)*.09;bench.append(o)
    bench.append(block('Seat cross rail',(x,0,.52),(.09,.78,.075),iron,.012))
    o=block('Back upright',(x,.385,.91),(.075,.07,.68),iron,.014);o.rotation_euler.x=-.10;bench.append(o)
    bench.append(block('Armrest',(x,0,.88),(.105,.73,.065),oak,.025))
    bench.append(block('Arm support',(x,-.22,.75),(.055,.06,.28),iron,.012))
    for z in [.87,1.05,1.23]:
        bpy.ops.mesh.primitive_uv_sphere_add(segments=10,ring_count=6,location=(x,.305+(z-.87)*.2,z));o=bpy.context.object;o.scale=(.016,.008,.016);o.data.materials.append(bolt);bench.append(o)
for o in bench:
    x,y,z=o.location;angle=.22;o.location=(-4.4+x*math.cos(angle)-y*math.sin(angle),3.4+x*math.sin(angle)+y*math.cos(angle),z);o.rotation_euler.z+=angle

def tube(name,pts,r,material):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=1;c.bevel_depth=r;c.bevel_resolution=2
    p=c.splines.new('POLY');p.points.add(len(pts)-1)
    for v,co in zip(p.points,pts):v.co=(*co,1)
    o=bpy.data.objects.new(name,c);s.collection.objects.link(o);c.materials.append(material)
    bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False)
# Three intertwined cords form a small dog tug, resting beside the bench.
for strand in range(3):
    pts=[]
    for i in range(161):
        t=i/160;a=t*2*math.pi
        center=Vector((-6.1+.40*math.cos(a),2.5+.22*math.sin(a),.09))
        phase=a*16+strand*2*math.pi/3
        center+=Vector((math.cos(a)*math.cos(phase),math.sin(a)*math.cos(phase),math.sin(phase)))*.027
        pts.append(center)
    tube('Braided cotton tug',pts,.022,cream if strand!=1 else rust)
for j in range(9):
    pts=[(-5.70+j*.006,2.5,.07),(-5.62+j*.006,2.46+j*.008,.055),(-5.51+j*.008,2.43+j*.012,.04)]
    tube('Tug fringe',pts,.008,cream if j%3 else rust)
# Original pet objects. Blender Z-up becomes Three.js Y-up (Blender Y = -Z).
sage=mat('Sage silicone',(.22,.34,.27),.68)
ceramic=mat('Warm ivory ceramic',(.79,.72,.57),.28)
clay=mat('Terracotta rubber',(.55,.22,.12),.72)
water=mat('Still blue water',(.18,.38,.40),.21,.12)

def lathe(name, profile, center, material, segments=64):
    vertices=[];faces=[]
    for radius,z in profile:
        for j in range(segments):
            a=2*math.pi*j/segments
            vertices.append((center[0]+radius*math.cos(a),center[1]+radius*math.sin(a),center[2]+z))
    for k in range(len(profile)-1):
        for j in range(segments):
            a=k*segments+j;b=k*segments+(j+1)%segments
            faces.append((a,b,b+segments,a+segments))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(vertices,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);s.collection.objects.link(o);mesh.materials.append(material)
    for p in mesh.polygons:p.use_smooth=True
    return o

# A paired ceramic feeding station on a softly rounded silicone mat.
block('Feeding mat',(4.05,1.8,.045),(2.05,1.05,.09),sage,.12)
bowl_profile=[(0,0),(.30,0),(.36,.015),(.41,.055),(.46,.26),(.46,.30),(.445,.33),(.415,.335),(.39,.31),(.365,.12),(.31,.08),(0,.08)]
for x in [3.53,4.57]:
    lathe('Ceramic pet bowl',bowl_profile,(x,1.8,.09),ceramic)
    lathe('Bowl foot',[(.30,0),(.33,0),(.345,.015),(.33,.035),(.30,.035)],(x,1.8,.085),clay)
lathe('Water surface',[(0,0),(.381,0)],(4.57,1.8,.255),water)
# A few rounded kibble pieces in the other bowl, readable even from above.
for j in range(13):
    a=j*2.4;r=.07+.19*math.sqrt(j/13)
    o=block('Kibble',(3.53+r*math.cos(a),1.8+r*math.sin(a),.195),(.09,.07,.045),edge,.02);o.rotation_euler.z=a

# Shallow flying disc with a rolled rim and two fine concentric grip rings.
lathe('Flying disc',[(0,.025),(.36,.025),(.49,.045),(.55,.075),(.56,.105),(.54,.135),(.49,.135),(.46,.105),(.34,.09),(0,.09)],(-3.5,-1.6,0),clay)
for r in [.30,.37]:
    tube('Disc grip ring',[(-3.5+r*math.cos(j*2*math.pi/96),-1.6+r*math.sin(j*2*math.pi/96),.095) for j in range(97)],.006,clay)

# One continuous, rounded chew toy: joined volumes remeshed in Blender.
bpy.ops.object.select_all(action='DESELECT');parts=[]
parts.append(block('Chew toy core',(3.15,-1.5,.145),(.94,.26,.25),sage,.11))
for dx in [-.46,.46]:
    for dy in [-.115,.115]:
        bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=12,location=(3.15+dx,-1.5+dy,.145))
        o=bpy.context.object;o.scale=(.215,.185,.14);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(sage);parts.append(o)
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();o=bpy.context.object;o.name='Soft bone chew'
m=o.modifiers.new('Unified silicone','REMESH');m.mode='VOXEL';m.voxel_size=.023;bpy.ops.object.modifier_apply(modifier=m.name)
m=o.modifiers.new('Soft finish','SMOOTH');m.factor=1.2;m.iterations=4;bpy.ops.object.modifier_apply(modifier=m.name)
for p in o.data.polygons:p.use_smooth=True

# Consolidate the feeding and play objects into one quiet rear corner.
for ob in s.objects:
    if ob.type!='MESH' or ob in bench: continue
    if ob.name.startswith(('Feeding mat','Ceramic pet bowl','Bowl foot','Water surface','Kibble')):
        ob.location.x-=5.75;ob.location.y+=2.2
    elif ob.name.startswith(('Flying disc','Disc grip ring')):
        ob.location.x-=1.2;ob.location.y+=3.5
    elif ob.name.startswith('Soft bone chew'):
        ob.location.x-=5.95;ob.location.y+=4.15

# Independent pickup roots preserve complete geometry and local pivots in glTF.
bpy.context.view_layer.update()
for key,prefixes,old,target in [
    ('tug',('Braided cotton tug','Tug fringe'),(-6.1,2.5,.09),(-5.6,-1.5,.09)),
    ('disc',('Flying disc','Disc grip ring'),(-4.7,1.9,.08),(-3.5,-3.6,.08)),
    ('bone',('Soft bone chew',),(-2.8,2.65,.145),(4,-3.3,.145))]:
    root=bpy.data.objects.new('Throw_'+key,None);s.collection.objects.link(root);root.location=target
    bpy.context.view_layer.update()
    for ob in list(s.objects):
        if ob.type=='MESH' and ob.name.startswith(prefixes):
            matrix=ob.matrix_world.copy();matrix.translation+=Vector(target)-Vector(old)
            ob.parent=root;ob.matrix_world=matrix

# Merge each pickup by material without merging it into static furniture.
for root in [o for o in s.objects if o.name.startswith('Throw_')]:
    materials=set(o.data.materials[0] for o in root.children if o.type=='MESH')
    for material in materials:
        obs=[o for o in root.children if o.type=='MESH' and o.data.materials[0]==material]
        if len(obs)<2:continue
        bpy.ops.object.select_all(action='DESELECT')
        for o in obs:o.select_set(True)
        bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join()

# Muted dog-agility equipment along the rear/right edge.
blue=mat('Agility blue',(.22,.39,.44),.78)
yellow=mat('Agility ochre',(.60,.40,.14),.8)
white=mat('Agility cream',(.84,.78,.65),.9)

# A small cafe corner leaves the middle of the lawn open for play.
for x in [-3,0,3]:
    block('Fence post',(x,4.85,.58),(.12,.12,1.16),oak,.035)
for h in [.38,.84]:block('Rear fence rail',(0,4.85,h),(6.1,.09,.10),oak,.025)
# Round table, two low chairs and a sewn eight-panel parasol.
cx,cy=3.15,3.1
lathe('Cafe table',[(0,0),(.72,0),(.75,.04),(.72,.09),(0,.09)],(cx,cy,.92),oak,48)
tube('Table stem',[(cx,cy,.12),(cx,cy,.94)],.055,iron)
for a in [0,2.094,4.189]:tube('Table foot',[(cx,cy,.2),(cx+.48*math.cos(a),cy+.48*math.sin(a),.06)],.035,iron)
for x in [cx-1.12,cx+1.12]:
    block('Cafe chair seat',(x,cy-.2,.50),(.61,.61,.075),oak,.055)
    block('Cafe chair back',(x,cy+.07,.86),(.61,.08,.43),oak,.05)
    for dx in [-.23,.23]:
        for dy in [-.23,.23]:tube('Cafe chair leg',[(x+dx,cy-.2+dy,.5),(x+dx*1.16,cy-.2+dy*1.16,.04)],.032,iron)
tube('Parasol mast',[(cx,cy,.08),(cx,cy,2.8)],.038,edge)
lathe('Parasol base',[(0,0),(.3,0),(.32,.06),(.27,.12),(0,.12)],(cx,cy,0),ceramic,32)
for panel in range(8):
    vertices=[(cx,cy,2.82)];faces=[]
    for ring,(r,z) in enumerate([(.75,2.64),(1.6,2.23),(1.6,2.14)]):
        for j in range(5):
            a=(panel+j/4)*math.pi/4
            vertices.append((cx+r*math.cos(a),cy+r*math.sin(a),z-(.055*math.sin(j*math.pi/4) if ring else 0)))
    for j in range(4):faces.append((0,1+j,2+j))
    for ring in range(2):
        for j in range(4):
            a=1+ring*5+j;faces.append((a,a+5,a+6,a+1))
    mesh=bpy.data.meshes.new('Canopy panel');mesh.from_pydata(vertices,[],faces);mesh.update()
    ob=bpy.data.objects.new('Canopy panel',mesh);s.collection.objects.link(ob);mesh.materials.append(white if panel%2 else ceramic)
    m=ob.modifiers.new('Cotton thickness','SOLIDIFY');m.thickness=.015;bpy.context.view_layer.objects.active=ob;ob.select_set(True);bpy.ops.object.modifier_apply(modifier=m.name);ob.select_set(False)
    a=panel*math.pi/4;tube('Parasol seam',[(cx,cy,2.83),(cx+.75*math.cos(a),cy+.75*math.sin(a),2.65),(cx+1.6*math.cos(a),cy+1.6*math.sin(a),2.24)],.009,cream)
# The interactive timber sign and its painted lettering are built in Three.js.

# Deep rounded ivory foundation under the lawn.

turf=mat('Lawn surface',(.32,.41,.245),1)
border=mat('Lawn edge',(.78,.69,.52),.95)
# Subtle close-view surface grain for the editable Cycles scene.
for material,scale,strength,distance in [(turf,150,.18,.012),(oak,7,.12,.008)]:
    nodes=material.node_tree.nodes;links=material.node_tree.links
    noise=nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=scale
    noise.inputs['Detail'].default_value=2
    bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=strength;bump.inputs['Distance'].default_value=distance
    links.new(noise.outputs['Fac'],bump.inputs['Height'])
    links.new(bump.outputs['Normal'],next(n for n in nodes if n.type=='BSDF_PRINCIPLED').inputs['Normal'])
def oval(name,profile,material):
    ob=lathe(name,profile,(0,0,0),material,160)
    ob.scale.x=9.2;ob.scale.y=6.1
    return ob
oval('Lawn surface',[(0,-.05),(1,-.05),(1,0),(0,0)],turf)
oval('Lawn edge',[(0,-.5),(.97,-.5),(1.015,-.43),(1.025,-.22),(1.02,-.07),(1.003,-.01),(.99,-.02)],border)

# Merge by material to keep static draw calls low.
for material in [oak,edge,iron,bolt,cream,rust,sage,ceramic,clay,water,blue,yellow,white]:
    obs=[o for o in s.objects if o.type=='MESH' and o.parent is None and o.data.materials and o.data.materials[0]==material]
    if not obs:continue
    if len(obs)==1:obs[0].name=material.name;continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();bpy.context.object.name=material.name
bpy.ops.object.select_all(action='DESELECT')
for ob in s.objects:
    if ob.type=='MESH' or ob.name.startswith('Throw_'):ob.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'public/models/yard-furniture.glb'),export_format='GLB',use_selection=True,export_apply=True)

# Studio setup is retained in Blender, excluded from the web asset.
def area(name,location,power,size):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size
    ob=bpy.data.objects.new(name,data);s.collection.objects.link(ob);ob.location=location
    ob.rotation_euler=(Vector((0,0,0))-ob.location).to_track_quat('-Z','Y').to_euler()
area('Large softbox',(-4,-3,12),1800,9)
area('Sky fill',(4,5,8),1000,8)
s.world=bpy.data.worlds.new('Soft daylight');s.world.use_nodes=True
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.82,.86,.91,1)
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.45
cam=bpy.data.objects.new('Playground camera',bpy.data.cameras.new('Playground camera'));s.collection.objects.link(cam)
cam.location=(0,-13,12);cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler()
cam.data.type='ORTHO';cam.data.ortho_scale=20;s.camera=cam
s.render.engine='CYCLES';s.cycles.samples=32;s.cycles.use_denoising=True
s.render.resolution_x=1400;s.render.resolution_y=900;s.render.resolution_percentage=100
s.render.film_transparent=True;s.view_settings.view_transform='AgX'
s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'design/yard-blender/preview.png')
bpy.ops.object.select_all(action='DESELECT')
for old in list(bpy.data.scenes):
    if old!=s:bpy.data.scenes.remove(old)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'design/yard-blender/playground.blend'))
print('YARD_FURNITURE_EXPORTED')
