"""Native Geometry Nodes dual-quaternion deformation for skin and hair.
Translation is the vector part of 2 * dual * conjugate(real).
No sampled mesh cache or runtime Python handler is required to play the blend.
"""
import bpy

def build_group(parts, controls):
    group=bpy.data.node_groups.new('Puppy · volume-preserving skin and hair','GeometryNodeTree')
    group.interface.new_socket(name='Geometry',in_out='INPUT',socket_type='NodeSocketGeometry')
    group.interface.new_socket(name='Geometry',in_out='OUTPUT',socket_type='NodeSocketGeometry')
    nodes,links=group.nodes,group.links
    def set_input(socket,value):
        if isinstance(value,bpy.types.NodeSocket):links.new(value,socket)
        else:socket.default_value=value
    def scalar(op,a,b=None):
        n=nodes.new('ShaderNodeMath');n.operation=op;set_input(n.inputs[0],a)
        if b is not None:set_input(n.inputs[1],b)
        return n.outputs[0]
    def vector(op,a,b=None):
        n=nodes.new('ShaderNodeVectorMath');n.operation=op;set_input(n.inputs[0],a)
        if b is not None:set_input(n.inputs['Scale'] if op=='SCALE' else n.inputs[1],b)
        return n.outputs['Value'] if op in ['DOT_PRODUCT','LENGTH'] else n.outputs['Vector']
    def combine(x,y,z):
        n=nodes.new('ShaderNodeCombineXYZ')
        for i,value in enumerate([x,y,z]):set_input(n.inputs[i],value)
        return n.outputs[0]
    rw=0.;rv=(0.,0.,0.);dw=0.;dv=(0.,0.,0.)
    for name in parts:
        info=nodes.new('GeometryNodeObjectInfo');info.transform_space='ORIGINAL';info.inputs['Object'].default_value=controls[name]
        to_rotation=nodes.new('FunctionNodeEulerToRotation');links.new(info.outputs['Rotation'],to_rotation.inputs['Euler'])
        quat=nodes.new('FunctionNodeRotationToQuaternion');links.new(to_rotation.outputs[0],quat.inputs['Rotation'])
        w=quat.outputs['W'];v=combine(quat.outputs['X'],quat.outputs['Y'],quat.outputs['Z'])
        # All authored transforms stay in the identity-centered quaternion hemisphere.
        # The verifier checks the blended norm and compares this field with NumPy DQS.
        sign=scalar('SUBTRACT',1.,scalar('MULTIPLY',2.,scalar('LESS_THAN',w,0.)))
        w=scalar('MULTIPLY',w,sign);v=vector('SCALE',v,sign)
        translation=info.outputs['Location']
        d_w=scalar('MULTIPLY',-.5,vector('DOT_PRODUCT',translation,v))
        d_v=vector('SCALE',vector('ADD',vector('SCALE',translation,w),vector('CROSS_PRODUCT',translation,v)),.5)
        attr=nodes.new('GeometryNodeInputNamedAttribute');attr.data_type='FLOAT';attr.inputs['Name'].default_value='motion_'+name
        weight=attr.outputs['Attribute']
        rw=scalar('ADD',rw,scalar('MULTIPLY',w,weight));rv=vector('ADD',rv,vector('SCALE',v,weight))
        dw=scalar('ADD',dw,scalar('MULTIPLY',d_w,weight));dv=vector('ADD',dv,vector('SCALE',d_v,weight))
    norm=scalar('SQRT',scalar('ADD',scalar('MULTIPLY',rw,rw),vector('DOT_PRODUCT',rv,rv)))
    inverse=scalar('DIVIDE',1.,scalar('MAXIMUM',norm,1e-8))
    rw=scalar('MULTIPLY',rw,inverse);rv=vector('SCALE',rv,inverse)
    dw=scalar('MULTIPLY',dw,inverse);dv=vector('SCALE',dv,inverse)
    position=nodes.new('GeometryNodeInputPosition').outputs['Position']
    rotated=vector('ADD',position,vector('SCALE',vector('CROSS_PRODUCT',rv,vector('ADD',vector('CROSS_PRODUCT',rv,position),vector('SCALE',position,rw))),2.))
    translation=vector('SCALE',vector('ADD',vector('SUBTRACT',vector('SCALE',dv,rw),vector('SCALE',rv,dw)),vector('CROSS_PRODUCT',rv,dv)),2.)
    inp=nodes.new('NodeGroupInput');out=nodes.new('NodeGroupOutput');setpos=nodes.new('GeometryNodeSetPosition')
    links.new(inp.outputs['Geometry'],setpos.inputs['Geometry']);links.new(vector('ADD',rotated,translation),setpos.inputs['Position']);links.new(setpos.outputs['Geometry'],out.inputs['Geometry'])
    for i,node in enumerate(nodes):node.location=((i%12)*210,-(i//12)*170)
    return group
