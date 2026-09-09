import bpy, math
from mathutils import Vector
from pathlib import Path
root=Path('C:/Users/김도훈/Desktop/강아지')
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.view_layer.update()
for ob in list(bpy.data.objects): bpy.data.objects.remove(ob,do_unlink=True)
bpy.ops.import_scene.gltf(filepath=str(root/'public/models/yard-spitz-clean.glb'))
bpy.context.view_layer.update()
for ob in list(bpy.data.objects):
    if ob.type=='MESH' and ob.name.startswith('Cube'): bpy.data.objects.remove(ob,do_unlink=True)
bpy.context.view_layer.update()
meshes=[o for o in bpy.context.view_layer.objects if o.type=='MESH']
for ob in list(meshes):
    if ob.name == 'Cube':
        meshes.remove(ob); bpy.data.objects.remove(ob,do_unlink=True)
for o in meshes:
    bpy.context.view_layer.objects.active=o;o.select_set(True)
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.select_set(False)
arm=bpy.data.armatures.new('Spitz skeleton');rig=bpy.data.objects.new('Spitz rig',arm);bpy.context.collection.objects.link(rig)
bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
def bone(name,a,b,parent=None):
    e=arm.edit_bones.new(name);e.head=a;e.tail=b
    if parent:e.parent=arm.edit_bones[parent]
    return e
bone('body',(0,.3,.85),(0,-.25,1.06))
bone('neck',(0,-.25,1.06),(0,-.5,1.44),'body')
bone('head',(0,-.5,1.44),(0,-.82,1.53),'neck')
bone('tail',(0,.57,1.07),(0,.54,1.48),'body')
for side,x in [('L',-.225),('R',.225)]:
    bone('shoulder'+side,(x,-.27,.96),(x,-.31,.53),'body')
    bone('forearm'+side,(x,-.31,.53),(x,-.34,.17),'shoulder'+side)
    bone('forepaw'+side,(x,-.34,.17),(x,-.44,.065),'forearm'+side)
    bone('thigh'+side,(x,.46,.87),(x,.38,.48),'body')
    bone('shin'+side,(x,.38,.48),(x,.58,.22),'thigh'+side)
    bone('hindpaw'+side,(x,.58,.22),(x,.49,.065),'shin'+side)
bpy.ops.object.mode_set(mode='OBJECT')
def smooth(a,b,x):
    t=max(0,min(1,(x-a)/(b-a)));return t*t*(3-2*t)
def dist(p,b):
    a=b.head_local;c=b.tail_local;v=c-a;t=max(0,min(1,(p-a).dot(v)/v.length_squared));return (p-a-v*t).length
for ob in meshes:
    groups={b.name:ob.vertex_groups.new(name=b.name) for b in arm.bones}
    for v in ob.data.vertices:
        p=v.co;x,y,z=p
        if 'Curled' in ob.name:weights={'tail':1}
        elif any(t in ob.name for t in ['eye','Nose','Mouth','ear']):weights={'head':1}
        else:
            head=smooth(1.18,1.5,z)*(1-smooth(-.35,-.05,y))
            neck=smooth(.95,1.4,z)*(1-head)*(1-smooth(-.25,.1,y))
            weights={'head':head,'neck':neck,'body':max(0,1-head-neck)}
            leg=(1-smooth(.65,1.0,z))*smooth(.08,.18,abs(x))
            if leg>0:
                side='L' if x<0 else 'R';names=([n+side for n in ['shoulder','forearm','forepaw']] if y<.08 else [n+side for n in ['thigh','shin','hindpaw']])
                scores=[1/(dist(p,arm.bones[n])+.035)**4 for n in names];total=sum(scores)
                weights={n:w*(1-leg) for n,w in weights.items()}
                for n,w in zip(names,scores):weights[n]=w/total*leg
        top=sorted(weights.items(),key=lambda it:it[1],reverse=True)[:4];total=sum(w for _,w in top)
        for n,w in top:
            if w>0:groups[n].add([v.index],w/total,'REPLACE')
    m=ob.modifiers.new('Joint deformation','ARMATURE');m.object=rig
    ob.parent=rig
scene=bpy.context.scene;scene.render.fps=30;scene.frame_start=1;scene.frame_end=25
for frame in range(1,26):
    t=(frame-1)/24*math.tau
    for pb in rig.pose.bones:pb.rotation_mode='XYZ';pb.rotation_euler=(0,0,0);pb.location=(0,0,0)
    for side,offset in [('L',0),('R',.3)]:
        f=t+offset;h=t+2.15+offset
        rig.pose.bones['shoulder'+side].rotation_euler.x=.48*math.sin(f)
        rig.pose.bones['forearm'+side].rotation_euler.x=-.48*max(0,math.cos(f))
        rig.pose.bones['forepaw'+side].rotation_euler.x=.22*math.sin(f-.5)
        rig.pose.bones['thigh'+side].rotation_euler.x=.52*math.sin(h)
        rig.pose.bones['shin'+side].rotation_euler.x=.52*max(0,math.cos(h))
        rig.pose.bones['hindpaw'+side].rotation_euler.x=-.25*max(0,math.cos(h))
    rig.pose.bones['body'].rotation_euler.x=.045*math.sin(t)
    rig.pose.bones['neck'].rotation_euler.x=-.025*math.sin(t-.3)
    rig.pose.bones['head'].rotation_euler.x=.025*math.sin(t-.7)
    rig.pose.bones['tail'].rotation_euler.y=.1*math.sin(t-.6)
    for pb in rig.pose.bones:pb.keyframe_insert(data_path='rotation_euler',frame=frame)
rig.animation_data.action.name='Run'
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=str(root/'design/blender-spitz/rigged-spitz.blend'))
bpy.ops.export_scene.gltf(filepath=str(root/'public/models/yard-spitz-rigged.glb'),export_format='GLB',export_animations=True,export_frame_range=True,export_force_sampling=True,export_skins=True,export_all_influences=False,export_cameras=False,export_lights=False)
print('RIGGED_BYTES', (root/'public/models/yard-spitz-rigged.glb').stat().st_size)



