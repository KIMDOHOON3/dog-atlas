import bpy, math
from mathutils import Vector
from pathlib import Path
OUT=Path('C:/Users/김도훈/Desktop/강아지')
s=bpy.data.scenes.new('Atlas playground furniture');bpy.context.window.scene=s
def mat(name,color,rough=.8,metal=0):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
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
    x,y,z=o.location;angle=.22;o.location=(-3.9+x*math.cos(angle)-y*math.sin(angle),2.25+x*math.sin(angle)+y*math.cos(angle),z);o.rotation_euler.z+=angle

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
        center=Vector((-2.65+.40*math.cos(a),.8+.22*math.sin(a),.09))
        phase=a*16+strand*2*math.pi/3
        center+=Vector((math.cos(a)*math.cos(phase),math.sin(a)*math.cos(phase),math.sin(phase)))*.027
        pts.append(center)
    tube('Braided cotton tug',pts,.022,cream if strand!=1 else rust)
for j in range(9):
    pts=[(-2.25+j*.006,.8,.07),(-2.17+j*.006,.76+j*.008,.055),(-2.06+j*.008,.73+j*.012,.04)]
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

# Merge by material to keep static draw calls low.
for material in [oak,edge,iron,bolt,cream,rust,sage,ceramic,clay,water]:
    obs=[o for o in s.objects if o.type=='MESH' and o.data.materials and o.data.materials[0]==material]
    if not obs:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();bpy.context.object.name=material.name
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'design/yard-blender/playground.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'public/models/yard-furniture.glb'),export_format='GLB',use_active_scene=True,export_apply=True)
print('YARD_FURNITURE_EXPORTED')
