# 홈 스피츠 고해상도 레이어 모션

- 제작일: 2026-08-24
- 이미지 제작: Codex 내장 ImageGen
- 모션 방식: CSS 레이어 애니메이션
- 본체: `public/illustrations/v9/home-spitz-tail-free-base.png`
- 꼬리: `public/illustrations/v9/home-spitz-tail.png`
- 돌봄 모듈: `public/illustrations/v9/home-care-*.webp`

APNG 시험은 128색 압축에 따른 털·얼굴 화질 저하와 잘라낸 프레임 경계 문제로 폐기했다. 최종안은 무손실 본체의 웃는 얼굴을 고정하고, 투명 꼬리와 네 모듈만 브라우저에서 움직인다.

## 꼬리 없는 본체 프롬프트

```text
Use case: precise-object-edit
Asset type: high-resolution base layer for a website hero animation
Input images: Image 1 is the exact edit target.
Primary request: Remove only the Japanese Spitz's fluffy curled tail behind its body. Reconstruct the small exposed background and rear-body fur naturally so the dog still looks anatomically complete from this camera angle. Keep the open smiling face unchanged.
Constraints: Preserve the exact 4:3 composition, pixel dimensions, dog identity, face, smile, eyes fully open, ears, head, neck ruff, torso, all four legs, paws, platform, lighting, shadows, material, colors, and camera angle. Do not move or resize anything. No care modules.
Avoid: no new tail, no cropped body, no closed eyes, no expression change, no blur, no artifacts, no text, no watermark.
```

## 투명 꼬리 프롬프트

```text
Use case: background-extraction
Asset type: transparent high-resolution tail layer for a website hero animation
Input images: Image 1 is the exact source.
Primary request: Keep only the Japanese Spitz's complete fluffy curled tail, including every soft outer edge from its attachment point behind the body to the full plume tip. Remove the dog body, platform, background, and all other content to genuine transparency.
Composition/framing: preserve the original 4:3 canvas, exact tail size, exact tail location, and original pixel alignment; do not center, crop, move, rotate, resize, redraw, or restyle the tail.
Constraints: preserve the full uncropped tail silhouette, warm-white fur shading, matte 3D texture, lighting, and soft edge detail exactly. Transparent pixels everywhere outside the tail.
Avoid: no dog body, no modules, no platform, no background color, no shadow plate, no text, no watermark, no clipped tip, no halo.
```

## 돌봄 모듈 프롬프트

```text
Use case: background-extraction
Asset type: four isolated 3D care modules on a real alpha-transparent canvas
Input images: Image 1 is the exact source.
Primary request: Extract only these four complete modules exactly where they are: leash on its upper-left pedestal, brush on its upper-right pedestal, folded cloth on its lower-right pedestal, and water bowl on its lower-left pedestal. Everything else must be actual transparent alpha pixels.
Critical transparency requirement: output a genuine RGBA transparent background. Do not draw or bake a checkerboard or background into the image.
Composition/framing: preserve the original 4:3 canvas, module sizes, locations, attached module shadows, and alignment exactly; no centering or repositioning.
Constraints: preserve complete silhouettes and soft antialiased edges; no dog, tail, central platform, background, text, logo, or watermark; no clipped edges or halo.
```
