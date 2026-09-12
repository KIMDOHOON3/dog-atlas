"""Encode actual Blender frames and package the complete portable motion study.

Run with Python + Pillow after both 48-frame render jobs finish.
"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from PIL import Image

ROOT = Path(__file__).resolve().parent
for view in ['side', 'three-quarter']:
    for frame in range(1, 49):
        assert (ROOT / 'frames' / view / f'{frame:03d}.png').stat().st_mtime >= (ROOT / 'exports/puppy-run-study.blend').stat().st_mtime, 'Render predates latest Blender model'
        with Image.open(ROOT / 'frames' / view / f'{frame:03d}.png') as image:
            assert image.size == (960, 720)
            image.verify()

for name, view, duration in [
    ('preview-normal.webp', 'side', 480),
    ('preview-quarter.webp', 'side', 1920),
    ('preview-three-quarter.webp', 'three-quarter', 1920),
    ('preview-three-quarter-normal.webp', 'three-quarter', 480),
]:
    frames = []
    for frame in range(1, 49):
        with Image.open(ROOT / 'frames' / view / f'{frame:03d}.png') as image:
            frames.append(image.convert('RGB'))
    durations = [round((i + 1) * duration / 48) - round(i * duration / 48) for i in range(48)]
    frames[0].save(ROOT / name, save_all=True, append_images=frames[1:], duration=durations, loop=0, quality=82, method=4)
    with Image.open(ROOT / name) as image:
        assert image.n_frames == 48
        total = 0
        for frame in range(48):
            image.seek(frame)
            image.load()
            total += image.info['duration']
        assert total == duration
    print(name, (ROOT / name).stat().st_size, 'bytes;', total, 'ms')

archive = ROOT.parent / 'puppy-hindlegs-run.zip'
with ZipFile(archive, 'w', compression=ZIP_DEFLATED, compresslevel=6) as output:
    for source in sorted(ROOT.rglob('*')):
        relative = source.relative_to(ROOT)
        if not source.is_file() or any(part in ['checks', '__pycache__'] for part in relative.parts) or source.name == '.gitignore':
            continue
        output.write(source, 'motion-hindlegs/' + relative.as_posix())
    # Keep the same-frame comparison functional when the ZIP is unpacked alone.
    for source in sorted((ROOT.parent / 'motion-anatomy/frames').rglob('*.png')):
        output.write(source, 'motion-anatomy/frames/' + source.relative_to(ROOT.parent / 'motion-anatomy/frames').as_posix())
with ZipFile(archive) as check:
    assert check.testzip() is None
    print('ZIP verified:', len(check.namelist()), 'files;', archive.stat().st_size, 'bytes')
