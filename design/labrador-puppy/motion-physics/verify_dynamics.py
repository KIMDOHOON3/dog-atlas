"""Check physical invariants and step convergence, independent of rendering."""
import json,math
from pathlib import Path
import dynamics as d

root=Path(__file__).resolve().parent
rows,summary,dense=d.simulate()
fine,_,_=d.simulate(substeps=64)
error=max(abs(a['z']-b['z']) for a,b in zip(rows,fine))
pitch_error=max(abs(a['pitch']-b['pitch']) for a,b in zip(rows,fine))
assert error<.0005 and pitch_error<.002,(error,pitch_error)
loop=max(abs(rows[-1][key]-rows[0][key]) for key in ['z','v','pitch','omega','head','ear','ear_tip'])
assert loop<1e-6
assert abs(summary['mean_support_n']-d.MASS*d.GRAVITY)<.005
assert all(all(f>=0 for f in row['forces'].values()) for row in dense)
flight=[row for row in dense if sum(row['forces'].values())==0]
assert flight and all(abs(row['acceleration']+d.GRAVITY)<1e-12 for row in flight)
for row in dense:
    assert abs(d.MASS*(row['acceleration']+d.GRAVITY)-sum(row['forces'].values()))<1e-10
    for name,force in row['forces'].items():
        assert (row['phase']-d.CONTACT[name])%1<d.STANCE or force==0
assert d.forces(.15,-.03,0.,0.,0.,enabled=False)[0]==-d.GRAVITY
assert d.forces(.15,-.03,0.,0.,0.,enabled=False,gravity=0)[0]==0
softer,_,_=d.simulate(stiffness=d.STIFFNESS*.8)
sensitivity=max(abs(a['z']-b['z']) for a,b in zip(rows,softer))
assert sensitivity>.002
report={'half_step_max_height_difference_m':error,'half_step_max_pitch_difference_rad':pitch_error,'all_appendage_loop_error':loop,'gravity_only_steps':len(flight),'total_steps':len(dense),'mean_support_minus_weight_n':summary['mean_support_n']-d.MASS*d.GRAVITY,'stiffness_20pct_reduction_max_height_difference_m':sensitivity,'unilateral_contact_and_newton_balance':'passed','no_contact_gravity_and_zero_gravity':'passed','scope':'Reduced vertical/pitch solver only; not full multibody collision or biological validation.'}
(root/'reports/dynamics-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
