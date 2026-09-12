"""Reduced vertical/pitch dynamics with scheduled, actuated compliant legs.

SI units. This is an animation-assist solver, not a full articulated animal.
Feet follow an authored gait; unilateral leg support drives trunk acceleration.
"""
import math
import json
from pathlib import Path

CONTACT={'hind_-1':0.,'hind_1':.07,'fore_-1':.47,'fore_1':.54}
STANCE=.36
PERIOD=.48
MASS=3.
GRAVITY=9.81
INERTIA=.025
STIFFNESS=800.
DAMPING=40.
ARMS={'hind_-1':.083,'hind_1':.083,'fore_-1':-.083,'fore_1':-.083}


def forces(phase,z,v,pitch,omega,gravity=GRAVITY,stiffness=STIFFNESS,enabled=True):
    result={}
    for name,offset in CONTACT.items():
        q=(phase-offset)%1
        if q>=STANCE or not enabled:
            result[name]=0.
            continue
        s=q/STANCE
        # Muscle-controlled rest length extends late in stance. Ground cannot pull.
        rest=-.002+.013*math.sin(math.pi*s/2)**2
        arm=ARMS[name]
        compression=rest-(z+arm*math.sin(pitch))
        speed=v+arm*math.cos(pitch)*omega
        fade=min(1.,s/.055,(1-s)/.12)
        result[name]=max(0.,min(85.,stiffness*compression-DAMPING*speed))*fade
    total=sum(result.values())
    torque=sum(ARMS[n]*math.cos(pitch)*f for n,f in result.items())
    # Active posture controller represents muscular balance, not passive contact.
    posture=-65.*pitch-2.*omega
    return (total/MASS-gravity),(torque+posture)/INERTIA,result,posture


def simulate(substeps=32,cycles=35,gravity=GRAVITY,stiffness=STIFFNESS,enabled=True):
    dt=PERIOD/(48*substeps)
    z,v,pitch,omega=-.03,0.,0.,0.
    head,hv,ear,ev,tip,tv=0.,0.,.35,0.,0.,0.
    samples=[];dense=[];previous_start=None
    for i in range((cycles+1)*48*substeps+1):
        phase=(i%(48*substeps))/(48*substeps)
        acc,alpha,contact,posture=forces(phase,z,v,pitch,omega,gravity,stiffness,enabled)
        if i==cycles*48*substeps:previous_start=[z,v,pitch,omega,head,hv,ear,ev,tip,tv]
        if i>=cycles*48*substeps:
            row={'phase':phase,'z':z,'v':v,'pitch':pitch,'omega':omega,'acceleration':acc,'angular_acceleration':alpha,'forces':contact,'posture_torque':posture,'head':head,'ear':ear,'ear_tip':tip}
            if i%substeps==0:samples.append(row)
            dense.append(row)
        # Damped inertial appendages respond to trunk acceleration and rotation.
        ha=95.*(-.65*pitch-head)-15.*hv-.10*alpha
        ea=100.*(.28-ear)-9.*ev-.022*acc-.32*alpha
        ta=145.*(.6*(ear-.28)-tip)-10.*tv-.13*ea
        hv+=ha*dt;head+=hv*dt;ev+=ea*dt;ear+=ev*dt;tv+=ta*dt;tip+=tv*dt
        v+=acc*dt;z+=v*dt;omega+=alpha*dt;pitch+=omega*dt
        if not all(math.isfinite(a) for a in [z,v,pitch,omega,head,ear,tip]):raise RuntimeError('Nonfinite simulation')
    end=[samples[-1][k] for k in ['z','v','pitch','omega','head']]
    summary={'mass_kg':MASS,'gravity_m_s2':gravity,'inertia_kg_m2':INERTIA,'leg_stiffness_n_m':stiffness,'leg_damping_ns_m':DAMPING,'timestep_s':dt,'period_s':PERIOD,'z_range_m':[min(r['z'] for r in dense),max(r['z'] for r in dense)],'pitch_range_rad':[min(r['pitch'] for r in dense),max(r['pitch'] for r in dense)],'loop_state_error':max(abs(a-b) for a,b in zip(end,previous_start[:5])),'mean_support_n':sum(sum(r['forces'].values()) for r in dense[:-1])/len(dense[:-1]),'max_support_n':max(sum(r['forces'].values()) for r in dense)}
    return samples,summary,dense


if __name__=='__main__':
    rows,summary,_=simulate()
    print(json.dumps(summary,indent=2))
    print([(i+1,round(r['z'],3),round(r['pitch'],3),round(sum(r['forces'].values()),1)) for i,r in enumerate(rows[:-1])][::4])
