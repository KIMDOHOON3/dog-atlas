# 푸들 성장 가이드 이미지 제작 기록 — 2026-08-21

> 적용 페이지: `/breeds/poodle`
>
> 생성 방식: Codex 내장 ImageGen 신규 생성
>
> 외부 사진·공식 삽화 입력: 없음

## 목적과 근거

공개 화면에서 숨긴 역사 이미지와 역사 소개 두 문단을 대신해, 같은 살구색 미니어처 푸들의 성장 전반·성장 중반·성견 모습을 나란히 보여준다. 이미지는 정확한 월령을 판독하는 자료가 아니라 성장에 따른 비율과 피모 변화를 이해하는 편집 삽화다. 월령 범위와 보호자 행동은 이미지가 아닌 별도 텍스트로 안내한다.

외형과 스타일의 일관성을 위해 프로젝트가 자체 생성한 `public/illustrations/v2/poodle-card.webp`와 이 작업에서 앞서 생성한 단계 이미지만 참조했다. 제3자 사진, 검색 이미지, 기관의 공식 삽화는 참조 이미지로 사용하지 않았다.

## 최종 자산

- `public/illustrations/v5/poodle-growth-early.webp` — 성장 전반, 1200×900
- `public/illustrations/v5/poodle-growth-middle.webp` — 성장 중반, 1200×900
- `public/illustrations/v5/poodle-growth-adult.webp` — 성견 이후, 1200×900

세 파일은 WebP quality 88로 변환했으며 각각 134KB 이하이다.

## 최종 프롬프트

### 성장 전반

```text
Use case: scientific-educational. Asset type: 4:3 horizontal Dog Atlas breed growth-stage card for a Korean web guide. Input image: the existing adult apricot Poodle portrait is a subject identity, coat-color, breed-conformation, and watercolor-style reference only; do not copy its exact composition. Create the same apricot Miniature Poodle as a young puppy in the early growth stage, approximately 2–4 months in developmental appearance. Show one full-body puppy standing naturally in a quiet warm-ivory studio-like space, three-quarter side view, with proportionally larger head, shorter legs and muzzle, soft developing curls, dropped ears, dark oval eyes, and realistic Poodle anatomy. Warm ivory paper, very pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, restrained natural palette. Keep the entire body, ears, paws, and tail safely inside the frame with generous margins. No people, objects, action scene, text, labels, watermark, border, photorealism, elaborate show clip, bow, topknot, exaggerated toy-like cuteness, other dogs, or copied official illustration.
```

### 성장 중반

```text
Use case: scientific-educational. Asset type: 4:3 horizontal Dog Atlas breed growth-stage card for a Korean web guide. Input image 1 is the same apricot Miniature Poodle as a young puppy; input image 2 is its intended mature breed identity and watercolor style. Create the same dog in the middle growth stage, approximately 6–10 months in developmental appearance—not a puppy and not fully mature. Show one full-body adolescent apricot Miniature Poodle standing naturally in the same quiet warm-ivory studio-like space and the same three-quarter side view. Preserve the warm apricot coat, dark oval eyes, dropped ears, black nose, and recognizable face. Make the body slightly lankier, legs and muzzle longer, chest less filled out, and curls transitioning toward the denser adult coat. Warm ivory paper, very pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, restrained natural palette. Keep the entire body, ears, paws, and tail safely inside the frame with generous margins. No people, objects, action scene, text, labels, watermark, border, photorealism, elaborate show clip, bow, topknot, exaggerated cuteness, other dogs, or copied official illustration.
```

### 성견 이후

```text
Use case: scientific-educational. Asset type: 4:3 horizontal Dog Atlas breed growth-stage card for a Korean web guide. Input images 1 and 2 show the same apricot Miniature Poodle at earlier growth stages; input image 3 is its mature breed-conformation and watercolor-style reference. Create that same dog as a fully mature adult Miniature Poodle. Show one full-body adult standing naturally in the same quiet warm-ivory studio-like space and the same three-quarter side view. Preserve the warm apricot coat, dark oval eyes, dropped ears, black nose, and recognizable face. Show balanced square adult proportions, a longer refined muzzle, filled but athletic chest, straight legs, and dense naturally curly adult coat in a simple functional trim. Warm ivory paper, very pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, restrained natural palette. Keep the entire body, ears, paws, and tail safely inside the frame with generous margins. No people, objects, action scene, text, labels, watermark, border, photorealism, elaborate show clip, bow, topknot, exaggerated cuteness, other dogs, or copied official illustration.
```

## 시각 검수

- 세 장 모두 같은 살구색, 검은 코, 짙은 눈, 늘어진 귀와 유사한 얼굴 인상을 유지한다.
- 성장 전반은 상대적으로 큰 머리·짧은 다리·부드러운 피모, 성장 중반은 길어진 다리와 주둥이·가는 몸, 성견은 균형 잡힌 체형과 촘촘한 피모로 구분된다.
- 세 장 모두 한 마리의 전신과 사방 안전 여백을 유지하며 텍스트·워터마크·사람·소품·행동 장면이 없다.
- 미니어처 푸들 한 개체의 예시이며 토이·미디엄·스탠더드의 성장 속도나 모든 개체의 외형을 대표하지 않는다.
