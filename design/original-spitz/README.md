# Independently authored Japanese Spitz

Created 2026-09-12 for Dog Atlas. `create.py` constructs every vertex from numerical primitives and procedural curves in an empty Blender scene. It imports no downloaded dog mesh, texture, rig, motion clip, or earlier spitz sculpt. None of the Sketchfab dog files are a base for this asset. The reference pages below inform general animal anatomy and proportions; their imagery is not embedded, projected, traced, or redistributed in the model.

## Files and reproduction

- `create.py`: complete geometry, material, skin-weight, rig, IK, animation, export and review-render recipe. Blender 4.5.9 LTS.
- `original-spitz.blend`: editable model with 18 bones and the baked `Run` action.
- `front.png`, `side.png`, `three-quarter.png`: neutral-pose Cycles previews.
- `run-contact.png`, `run-recovery.png`: mid-cycle deformation previews.
- Runtime: `public/models/yard-original-spitz.glb`, 1,998,340 bytes, 60,375 triangles, five material primitives, no texture images, one 0.8-second Run animation.

Run `blender --background --python design/original-spitz/create.py` from any working directory. Outputs resolve relative to this script. Blender's portable runtime and its download are kept only in ignored `tmp/`; they are not application dependencies. `.blend1` is a local backup and is not part of delivery.

## Anatomy and movement references

- FCI Japanese Spitz standard: https://www.fci.be/Nomenclature/Standards/262g05-en.pdf — pointed muzzle, dark almond eyes, erect small ears, white ruff and plume tail.
- AKC Japanese Spitz: https://www.akc.org/dog-breeds/japanese-spitz/ — the standing three-quarter photograph was inspected in the browser for muzzle, ear, neck and tail proportions.
- University of Minnesota veterinary anatomy, Ungulate & Carnivore Gallop Comparison: https://vanat.ahc.umn.edu/run/plate1.html — browser video inspection included the dog segment at about 1:51–1:52; limb recovery and body flexion informed the original animation. No motion data were extracted.

## Animation and web behavior

Pelvis, spine, neck, head, tail, plus upper/lower/paw bones for each leg and a root. Ankle targets follow a support/recovery trajectory with front/hind and left/right offsets. Blender IK is baked into portable bone transforms, with normalized skin weights. The web mixer blends the Run action with the rest pose based on speed, varies playback rate, and adds modest turn lean. Ground-level ball following reuses the existing bounded follower, including bench avoidance and acceleration/deceleration. Moving contact shadow, visibility gating and reduced-motion handling remain.

This is a stylized solid-coat procedural model and an authored approximation of a run. It is not photorealistic fur, motion capture, muscle simulation or expert-reviewed anatomy. Paw slip during tight turns and visual refinement remain limitations; the source makes further sculpting and rig refinement possible.

## Provenance and attribution

The active footer no longer loads the downloaded golden retriever, so its visible credit block was removed with replacement. The historical golden asset and its embedded attribution/provenance record remain unchanged; its CC BY terms still apply if reused. This record describes the new model's actual production process; it does not assert exclusive legal ownership or a blanket copyright clearance for unrelated assets.

## Verification

Blender neutral front/side/three-quarter and two Run poses rendered and inspected. GLB inspected for one skin with 18 joints, five primitives and a Run clip with 54 transform channels. PC and 390px browser: visible model, ball drag followed by joint-driven movement and approach/stop, no logged browser errors. Lint, typecheck, all 1,661 tests and 385-page production build pass. Reduced-motion/offscreen gates retained by code inspection. Real-device FPS and precise foot-contact biomechanics were not measured.
