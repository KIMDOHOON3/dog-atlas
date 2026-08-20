# 야쿠티안 라이카 이미지 제작 기록

> 제작일: 2026-08-20
>
> 적용 상세: `/breeds/yakutian-laika`
>
> 제작 방식: ImageGen 신규 생성, 대표 이미지의 개체 외형을 나머지 네 장의 참조로 사용

## 조사 근거와 외형 기준

- [FCI Standard No. 365](https://www.fci.be/Nomenclature/Standards/365g05-en.pdf): 중형의 탄탄하고 근육질인 몸, 넓은 쐐기형 머리, 아몬드형 눈, 직립 또는 반직립 귀, 흰 바탕의 모든 반점, 촘촘한 이중모와 등 위로 말리는 풍성한 꼬리.
- [FCI breed page](https://fci.be/en/nomenclature/YAKUTIAN-LAIKA-365.html): 잠정 승인된 북유럽 썰매견, 원산지 러시아.
- [AKC breed page](https://www.akc.org/dog-breeds/yakutian-laika/): 썰매·사냥·순록 몰이와 사람 곁의 다목적 협력.
- [AKC breed history](https://www.akc.org/expert-advice/dog-breeds/yakutian-laika-breed-history/): 사하 지역의 운송·사냥 생활, 20세기 감소와 1990년대 복원, 현대 활동.
- [Yakutian Laika National Breed Club standard commentary](https://yakutian-laika.com/en/content/breed-standard-comments): 털에 가려지지 않는 탄탄한 몸, 머리·가슴·피모의 세부 비율과 작업 기능.

기존 대표 카드는 머리와 몸이 지나치게 둥글고 짧아 작은 허스키형 스피츠로 보였고, 역사 장면은 순백색 개와 순록 썰매가 중심이라 야쿠티안 라이카의 대표 모색과 개썰매 역할이 약했다. 새 세트는 같은 흰 바탕 검정·회색 반점 개체를 모든 장면의 기준으로 사용한다.

## 최종 파일

- 대표: `public/illustrations/v2/yakutian-laika-card.webp` — 1200×1200 WebP
- 역사: `public/illustrations/v3/yakutian-laika-history.webp` — 1200×800 WebP
- 사람과의 협력: `public/illustrations/v4/yakutian-laika-feature-cooperation.webp` — 1200×900 WebP
- 활동과 과제: `public/illustrations/v4/yakutian-laika-feature-purposeful-activity.webp` — 1200×900 WebP
- 이중모와 계절: `public/illustrations/v4/yakutian-laika-feature-double-coat.webp` — 1200×900 WebP

## 최종 프롬프트 세트

### 대표

`Use case: illustration-story. Create a square Dog Atlas portrait of one adult Yakutian Laika with a medium strong compact athletic body, moderately long legs, broad wedge-shaped head, clearly defined stop, almond eyes, small high-set erect or half-pricked ears, thick straight Arctic double coat and a feathered tail curled in a loose semicircle over the back. Predominantly white with an irregular charcoal patch over the left ear and eye, grey at the right ear base, a broken charcoal-and-grey saddle, white legs and tail tip, and subtle one-blue-one-brown eyes. Warm ivory editorial watercolor and colored pencil. Not a Husky, Malamute, Samoyed, Border Collie, Akita, Pomeranian or wolf; no symmetrical Husky mask, toy proportions, text or watermark.`

### 역사

`Use case: historical-scene. Use the portrait dog as the identity reference. Show four credible Yakutian Laikas pulling a low wooden cargo sled across a snowy river route in Sakha/Yakutia, with a Sakha traveler walking beside the sled. The nearest dog matches the reference; the others have varied white-and-patched coats. Emphasize dogs transporting goods with readable practical traces. Respectful documentary watercolor, wide Arctic landscape, 3:2 safe crop. No harnessed reindeer, Huskies, Malamutes, modern race gear, text or watermark.`

### 사람과의 협력

`Use case: illustration-story. Use the portrait dog as the identity reference. In a modern quiet park after a walk, the adult Yakutian Laika stands close beside a guardian seated on a low bench and looks at a gentle open-hand cue; the leash remains loose. Show calm voluntary connection and accurate medium scale. Editorial watercolor, 4:3 safe crop. No sled, pulling, competition, other dogs, text or watermark.`

### 활동과 과제

`Use case: illustration-story. Use the portrait dog as the identity reference. Show safe modern canicross-style exercise on a cool forest trail: the Yakutian Laika trots in a fitted pulling harness connected by one bungee line to an adult guardian's waist belt. Steady cooperative pace, realistic equipment and full-body anatomy. Editorial watercolor, 4:3 safe crop. No snow sled, race crowd, wheeled vehicle, prey, other dogs, text or watermark.`

### 이중모와 계절

`Use case: illustration-story. Use the portrait dog as the identity reference. Show a calm seasonal grooming session in a cool shaded room: the dog stands on a non-slip mat while a guardian gently brushes the shoulder and side; a small amount of loose undercoat is visible, with an open window and water bowl. No shaving, restraint or excessive fur cloud. Editorial watercolor, 4:3 safe crop, no text or watermark.`

## 검수 결과

- 다섯 장 모두 같은 얼굴 반점·등의 새들 패턴·오드아이와 중형의 탄탄한 체형을 유지한다.
- 대표는 작은 포메라니안형 실루엣을 벗어났고, 역사 장면은 순록이 아닌 야쿠티안 라이카 팀이 물자 썰매를 끈다.
- 현대의 협력, 하네스 활동, 이중모 관리 장면은 역사 이미지와 구분된다.
- 필수 귀·발·꼬리와 장비 연결이 크롭 안에 있고 이미지 안에 글자·워터마크가 없다.
