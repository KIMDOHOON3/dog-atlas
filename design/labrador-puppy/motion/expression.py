"""Local expression sculpt in v3 world coordinates (metres).

The same smooth field moves skin, wet lid margins, lips and their hair.
A shared lower-pole adjustment keeps the eyeball layers aligned behind the lid.
"""
import numpy as np


def relaxed_mouth(b):
    """Open a shallow real oral cavity and retain a separate inner lining/tongue."""
    import bpy
    body=bpy.data.objects['Puppy_RenderMesh']
    cutter=b.ellipsoid('Relaxed mouth opening',(0,-1.94,2.19),(.315,.395,.045),segments=64)
    b.difference(body,cutter)
    dark=b.material('Relaxed mouth interior',(.032,.011,.013),.55)
    b.ellipsoid('Mouth inner lining',(0,-1.94,2.187),(.310,.390,.038),dark,64)
    tongue=bpy.data.objects['Tongue']
    # v3 is already in world coordinates, including the separate tongue mesh.
    coords=np.empty(len(tongue.data.vertices)*3)
    tongue.data.vertices.foreach_get('co',coords);coords=coords.reshape(-1,3)
    center=coords.mean(axis=0)
    coords[:,0]=center[0]+(coords[:,0]-center[0])*.66
    coords[:,1]=center[1]+(coords[:,1]-center[1])*1.18-.019
    coords[:,2]=center[2]+(coords[:,2]-center[2])*1.6-.0003
    tongue.data.vertices.foreach_set('co',coords.astype(np.float32).ravel());tongue.data.update()


def smooth(x,a,b):
    t=np.clip((x-a)/(b-a),0,1)
    return t*t*(3-2*t)


def brighten(points,name):
    p=points.copy();x,y,z=p.T
    eyeball=name.startswith('Eye_') and not name.endswith('wet_margin')
    if eyeball:
        # Seat the lower eyeball pole behind the lifted lower lid. Apply the
        # same field to all eye layers so the cornea and iris remain aligned.
        side=-1 if name.startswith('Eye_-1_') else 1
        cz=.257+side*.0003
        lower=1-smooth(z,cz-.005,cz-.001)
        p[:,1]+=.006*lower
    else:
        # Open the upper aperture, support the lower rim and remove its droop.
        for side in [-1,1]:
            cx=side*.0345;cz=.257+side*.0003
            dx=x-cx;dz=z-cz
            region=np.exp(-(dx/.018)**4-((y+.178)/.025)**4-(dz/.024)**4)
            upper=smooth(dz,-.001,.006)
            p[:,2]+=region*(.0038*upper+.0010*(1-upper)+side*dx*.065)
        # Lift the lip commissures and the soft cheek, leaving the nose in place.
        corner=np.exp(-((np.abs(x)-.030)/.014)**2-((y+.182)/.032)**2-((z-.225)/.022)**2)
        p[:,2]+=.0055*corner
        # A small, soft drop of the chin gives a relaxed mouth silhouette.
        chin=(1-smooth(z,.219,.227))*(1-smooth(y,-.178,-.149))*(1-smooth(np.abs(x),.020,.034))
        chin*=smooth(z,.195,.208)
        p[:,2]-=.0015*chin
    return p
