# 말티즈 특징 카드 이미지 제작 기록

> 제작일: 2026-08-20
>
> 적용 상세: `/breeds/maltese`
>
> 최종 규격: 1200×900 WebP

## 조사 근거와 주제 선정

- [AKC Maltese breed page](https://www.akc.org/dog-breeds/maltese/): 사람 곁의 토이 반려견, 작고 다정한 성향, 길고 곧은 흰 피모와 매일의 엉킴 관리.
- [AKC lifestyle guide](https://www.akc.org/expert-advice/dog-breeds/maltese-right-for-you/): 사람과의 교감, 작은 체구를 고려한 아이와의 상호작용, 매일 필요한 피모 관리.
- [FCI Maltese standard](https://www.fci.be/nomenclature/Standards/065g09-en.pdf): 반려·토이 역할, 작은 체구, 길고 흰 피모의 외형 기준.

페이지의 역사 문단과 겹치는 외형 소개만 반복하지 않고, 실제 생활에서 구분되는 `사람과의 관계`, `작은 체구와 안전`, `피모 관리 부담` 세 주제를 선택했다. 건강·유전질환은 현재 카드 범위에서 제외했다.

## 최종 카피와 출력 파일

1. 사람과의 관계
   - 제목: `사람 가까이에서 시간을 보내길 좋아해요.`
   - 설명: `오랫동안 사람 곁의 반려견으로 지내온 만큼 가족과 가까이 머무는 경향이 있어요. 함께하는 시간뿐 아니라 짧고 편안한 혼자 쉬기도 천천히 익혀주세요.`
   - 파일: `public/illustrations/v4/maltese-feature-companionship.webp`
2. 작은 체구와 안전
   - 제목: `작은 몸에 맞는 생활 동선이 필요해요.`
   - 설명: `높은 가구에서 뛰어내리거나 거친 상호작용은 작은 몸에 부담이 될 수 있어요. 발이 닿는 바닥과 오르내리는 높이, 아이와 만나는 방식을 차분히 살펴주세요.`
   - 파일: `public/illustrations/v4/maltese-feature-small-body-safety.webp`
3. 피모 관리 부담
   - 제목: `긴 실키 코트는 매일 엉킴을 살펴야 해요.`
   - 설명: `길고 곧은 흰 피모를 유지하려면 피부 가까이까지 부드럽게 빗고 엉킨 곳을 확인하는 시간이 필요해요. 빗질과 목욕, 피모 관리를 편안한 일상으로 익혀주세요.`
   - 파일: `public/illustrations/v4/maltese-feature-coat-care.webp`

## 생성 프롬프트

공통으로 재패니즈 스피츠 특징 카드 3장을 시각 참고 자료로 사용했다. 따뜻한 아이보리 종이, 옅은 세이지·베이지 수채 번짐, 섬세한 색연필 질감과 넉넉한 안전 여백을 유지하고 이미지 안의 글자·워터마크·외곽선은 금지했다.

### 사람과의 관계

`Create a 4:3 horizontal editorial illustration for a Korean Dog Atlas breed feature card. Show one adult Maltese standing close beside a seated adult person in a calm ivory living room, looking up at the person's face and choosing to stay nearby. The Maltese must have realistic adult toy-dog proportions and a long, straight, silky pure-white coat; do not make it a puppy, Bichon, or curly-coated dog. Keep the full body, ears, paws, and tail safely inside the frame. Match the reference cards' warm ivory paper, pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, and restrained natural palette. No text, watermark, bow, topknot, card border, photorealism, or exaggerated cuteness.`

### 작은 체구와 안전

`Create a 4:3 horizontal editorial illustration for a Korean Dog Atlas breed feature card. Show one adult Maltese standing safely on the floor beside a low sofa while an adult person kneels and calmly guides the dog; include a small low pet step nearby to communicate a safer route for a tiny body. The scene should feel preventive and reassuring, not alarming. The Maltese must have realistic adult toy-dog proportions and a long, straight, silky pure-white coat, with the full body, ears, paws, and tail inside the frame. Match the reference cards' warm ivory paper, pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, and restrained natural palette. No injury, falling action, child, text, watermark, bow, topknot, card border, or photorealism.`

### 피모 관리 부담

`Create a 4:3 horizontal editorial illustration for a Korean Dog Atlas breed feature card. Show one calm adult Maltese standing on a low grooming mat in a quiet home corner while a person's hand gently combs the long, straight, silky pure-white coat with a simple metal comb. Make the grooming action and the need to check tangles clear without showing discomfort. Use realistic adult toy-dog proportions and keep the full body, ears, paws, and tail safely inside the frame. Match the reference cards' warm ivory paper, pale sage and beige watercolor washes, delicate colored-pencil detail, subtle paper grain, and restrained natural palette. No scissors, bow, topknot, text, watermark, card border, photorealism, or exaggerated cuteness.`

## 검수 결과

- 세 장 모두 성견 말티즈의 작은 체구와 곧고 긴 흰 피모가 구분된다.
- 사람 곁에 머무는 장면, 낮은 계단과 안전한 동선, 빗질 장면이 서로 겹치지 않는다.
- 귀·발·꼬리가 카드 크롭 안에 남고 이미지 안에 글자나 워터마크가 없다.
- 생성 원본 1448×1086 PNG를 왜곡 없는 동일 4:3 비율로 1200×900 WebP로 변환했다.
- 최종 파일은 각각 145KB 이하이며 카드 내용과 이미지 장면이 일치한다.

## 2026-08-25 기준 상세 전환 보완 이미지

공식 상세 구조의 세 단계 이야기와 두 생활 현실에 서로 다른 이미지를 배정하기 위해 `작은 몸에도 필요한 함께하는 활동` 장면을 한 장 추가했다. 기존 교감 카드의 구도를 복제하지 않고, 보호자에게 작은 장난감을 가져가는 성견 말티즈로 산책 외의 짧은 놀이를 표현한다.

- 파일: `public/illustrations/v4/maltese-feature-play.webp`
- 규격: 1200×900 WebP, 136,822 bytes
- 생성 방식: 내장 이미지 생성 도구, 기존 `maltese-feature-companionship.webp`를 시각 스타일 참고로만 사용
- 최종 프롬프트 요약: 따뜻한 아이보리 거실에서 성견 말티즈 한 마리가 작은 장난감을 물고 무릎을 꿇은 성인 보호자에게 다가오는 4:3 편집 삽화. 길고 곧은 흰 피모와 실제 토이견 비율, 수채·색연필·종이 질감을 유지하고 글자·워터마크·리본·탑노트·과장된 아기 얼굴·잘린 신체를 제외한다.
