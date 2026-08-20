# 보더콜리 특징 카드 이미지 제작 기록

> 제작일: 2026-08-20
>
> 적용 상세: `/breeds/border-collie`
>
> 최종 규격: 1200×900 WebP

## 조사 근거와 주제 선정

- [AKC Border Collie breed page](https://www.akc.org/dog-breeds/border-collie/): 높은 에너지와 학습 욕구, 활동 뒤 쉬는 생활 리듬.
- [AKC Border Collie lifestyle guide](https://www.akc.org/expert-advice/dog-breeds/border-collie-right-for-you/): 사람과 동물을 몰 수 있는 경향, 지속적인 신체 활동과 정신적 자극.
- [AKC Official Standard](https://images.akc.org/pdf/breeds/standards/Border_Collie.pdf): 잉글랜드·스코틀랜드 접경 지역의 목양 배경, 강한 시선과 몸을 낮춘 움직임, 작업 능력과 학습성.
- [Royal Kennel Club breed guide](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/pastoral/border-collie/): 양을 모는 작업, 자연스러운 활동성과 지적 참여의 필요.

일반적인 `산책이 필요해요`를 반복하지 않고 보더콜리의 생활을 구체적으로 구분하는 `몰이와 움직임`, `배움과 과제`, `활동과 휴식`을 선택했다. 건강·유전질환은 카드 범위에서 제외했다.

## 최종 카피와 출력 파일

1. 몰이와 움직임
   - 제목: `움직이는 대상을 먼저 읽고 따라갈 수 있어요.`
   - 설명: `양 떼의 방향을 읽고 모으도록 발달한 목양견이에요. 달리는 사람이나 놀이하는 아이처럼 빠르게 움직이는 대상에 시선이 고정되거나 따라가려는 모습이 보이면 거리를 두고 보호자에게 돌아오는 신호를 연습해주세요.`
   - 파일: `public/illustrations/v4/border-collie-feature-herding-focus.webp`
2. 배움과 과제
   - 제목: `빠르게 배우는 만큼 생각할 일이 필요해요.`
   - 설명: `신호를 익히고 문제를 해결하는 활동에 적극적으로 참여할 수 있어요. 같은 공 던지기만 오래 반복하기보다 냄새 찾기, 짧은 협력 훈련, 규칙이 있는 놀이를 번갈아 제공해주세요.`
   - 파일: `public/illustrations/v4/border-collie-feature-thinking-tasks.webp`
3. 활동과 휴식
   - 제목: `많이 움직인 뒤 쉬는 법도 함께 배워야 해요.`
   - 설명: `활동량이 높은 편이지만 자극을 계속 늘리는 것만으로 생활이 편안해지지는 않아요. 산책과 과제 뒤에는 소리와 움직임이 적은 자리에서 흥분을 낮추고 쉬는 시간을 일상에 넣어주세요.`
   - 파일: `public/illustrations/v4/border-collie-feature-calm-rest.webp`

## 생성 프롬프트

### 몰이와 움직임

`Use case: illustration-story. Create a 4:3 horizontal Dog Atlas editorial illustration of one realistic adult black-and-white rough-coated Border Collie in a low controlled crouch, focused on a small group of sheep at a safe distance in an upland pasture with a dry-stone wall. Show the classic stalking herding posture without aggression, accurate athletic proportions, semi-erect ears, a long low-carried tail, and the full body. Use warm ivory paper, pale sage and beige watercolor washes, delicate colored pencil, subtle paper grain, and a restrained natural palette. No text, watermark, border, barking, attack, puppy, photorealism, cropped anatomy, or exaggerated blue eyes.`

### 배움과 과제

`Use case: illustration-story. Create a 4:3 horizontal Dog Atlas editorial illustration of one realistic adult black-and-white rough-coated Border Collie in a quiet indoor room, attentively reading an adult handler's hand signal beside a low scent-search box, two simple muted training cones, and one small task toy. Show focused cooperation rather than frantic excitement, accurate athletic proportions, semi-erect ears, a relaxed long tail, and the full body. Use warm ivory paper, pale sage and beige watercolor washes, delicate colored pencil, subtle paper grain, and a restrained natural palette. No text, letters, watermark, border, agility competition, jumping, puppy, photorealism, cropped anatomy, or exaggerated blue eyes.`

### 활동과 휴식

`Use case: illustration-story. Create a 4:3 horizontal Dog Atlas editorial illustration of one realistic adult black-and-white rough-coated Border Collie lying comfortably awake on a simple sage mat in a quiet ivory living room after activity. A coiled leash and closed puzzle toy are put away on a low shelf. Show loose muscles and a relaxed tail, settling rather than exhaustion, with accurate athletic proportions and the full body. Use warm ivory paper, pale sage and beige watercolor washes, delicate colored pencil, subtle paper grain, and a restrained natural palette. No text, watermark, border, crate, panting, illness, puppy, active play, photorealism, cropped anatomy, or exaggerated blue eyes.`

## 검수 결과

- 세 장 모두 검정·흰색 러프 코트 성견 보더콜리의 중형 운동견 비율, 반직립 귀와 긴 꼬리가 유지된다.
- 몸을 낮춘 몰이, 사람의 손 신호를 읽는 협력 과제, 매트에서 긴장을 낮추는 휴식 장면이 서로 구분된다.
- 귀·발·꼬리가 카드 크롭 안에 남고 이미지 안에 글자·워터마크·외곽선이 없다.
- 생성 원본 1448×1086 PNG를 같은 4:3 비율의 1200×900 WebP로 변환했다.
