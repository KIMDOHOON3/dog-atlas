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
    x,y,z=o.location;angle=.22;o.location=(-2.5+x*math.cos(angle)-y*math.sin(angle),1.5+x*math.sin(angle)+y*math.cos(angle),z);o.rotation_euler.z+=angle

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
        center=Vector((-1.2+.40*math.cos(a),.55+.22*math.sin(a),.09))
        phase=a*16+strand*2*math.pi/3
        center+=Vector((math.cos(a)*math.cos(phase),math.sin(a)*math.cos(phase),math.sin(phase)))*.027
        pts.append(center)
    tube('Braided cotton tug',pts,.022,cream if strand!=1 else rust)
for j in range(9):
    pts=[(-.80+j*.006,.55,.07),(-.72+j*.006,.51+j*.008,.055),(-.61+j*.008,.48+j*.012,.04)]
    tube('Tug fringe',pts,.008,cream if j%3 else rust)
# Merge by material: six static draw calls instead of individual furniture pieces.
for material in [oak,edge,iron,bolt,cream,rust]:
    obs=[o for o in s.objects if o.type=='MESH' and o.data.materials and o.data.materials[0]==material]
    if not obs:continue
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:o.select_set(True)
    bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();bpy.context.object.name=material.name
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'design/yard-blender/playground.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'public/models/yard-furniture.glb'),export_format='GLB',use_active_scene=True,export_apply=True)
print('YARD_FURNITURE_EXPORTED')
