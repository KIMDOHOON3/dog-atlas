# 국내 익숙한 32종 공식 상세 이미지 제작 기록

> 제작일: 2026-08-25
> 생성 방식: Codex 내장 ImageGen 신규 생성
> 적용 범위: `/discover`의 `익숙한 이름` 32종 가운데 기존 공식 상세 4종을 제외한 28종

## 목적과 자산 전략

공식 상세는 대표 이미지와 별개로 역사 1장, 현재 경향 1장, 생활 전환 1장, 생활 현실 2장의 서로 다른 이미지를 사용한다. 기존 특징 카드가 있던 19종은 역사·특징 3장을 재사용하고 `활동 뒤 회복` 장면을 한 장씩 추가했다. 전용 특징 카드가 없던 9종은 현재 경향·생활 현실 두 장·활동 뒤 회복을 합한 네 장씩 새로 제작했다. 총 신규 자산은 55장이다.

외형은 각 견종의 `public/illustrations/v2/*-card*.webp`를 1차 참조로, 기존 역사 또는 특징 이미지를 색감·선·장면 밀도의 2차 참조로 사용했다. 공식 표준의 외형 설명을 텍스트로 보완했으며 공식 삽화나 사진을 복제하지 않았다.

## 공통 프롬프트

```text
Use case: illustration-story.
Asset type: Dog Atlas 4:3 breed-detail card.
Input images: Image 1 is the exact breed morphology reference; Image 2 is project style and identity support.
Style: warm editorial watercolor and colored pencil, cream/oatmeal/sage/caramel palette, soft paper texture, contemporary Korean home or park.
Composition: one continuous landscape scene, full adult dog visible with all four paws, ears, and natural tail inside generous margins.
Constraints: exactly one adult dog and at most one guardian; no puppies, extra animals, split panels, text, logos, watermarks, medical claims, fear, injury, or coercive equipment.
Avoid: photorealism, cartoon exaggeration, cropped anatomy, duplicate limbs, and morphology drift from the reference.
```

견종별 프롬프트에는 아래 장면과 외형 식별점을 추가했다. 단두 견종은 고통 표현 없이 짧은 활동 뒤 편안한 회복을, 대형견은 사람과의 실제 비율과 넓은 이동 동선을, 시각·후각하운드와 테리어는 살아 있는 사냥감 없이 안전한 대체 활동을 요청했다.

## 전용 카드 세트를 새로 만든 9종

- 말티푸: 개체별 피모 차이, 피부 가까이의 빗질, 낮은 동선, 활동 뒤 매트 휴식
  - `maltipoo-feature-individual-variation.webp`
  - `maltipoo-feature-coat-care.webp`
  - `maltipoo-feature-small-body-safety.webp`
  - `maltipoo-feature-daily-rhythm.webp`
- 페키니즈: 교감과 자기 거리, 짧은 활동 뒤 더위 회복, 눈·얼굴·장모 확인, 낮은 동선
  - `pekingese-feature-companion-distance.webp`
  - `pekingese-feature-heat-recovery.webp`
  - `pekingese-feature-face-coat-care.webp`
  - `pekingese-feature-daily-rhythm.webp`
- 파피용: 손 신호 학습, 초소형 체구 안전, 귀 장식털 관리, 냄새 산책 뒤 휴식
  - `continental-toy-spaniel-feature-cooperative-learning.webp`
  - `continental-toy-spaniel-feature-small-body-safety.webp`
  - `continental-toy-spaniel-feature-ear-coat-care.webp`
  - `continental-toy-spaniel-feature-daily-rhythm.webp`
- 이탈리안 그레이하운드: 시각 추적의 안전한 전환, 가는 다리와 낮은 경사로, 추위 보온, 질주 뒤 따뜻한 휴식
  - `italian-sighthound-feature-visual-chase.webp`
  - `italian-sighthound-feature-small-body-safety.webp`
  - `italian-sighthound-feature-cold-weather.webp`
  - `italian-sighthound-feature-daily-rhythm.webp`
- 잭 러셀 테리어: 지정된 파기·냄새 찾기, 출입 안전, 과제 뒤 회복, 긴 줄 냄새 산책
  - `jack-russell-terrier-feature-scent-digging.webp`
  - `jack-russell-terrier-feature-entry-safety.webp`
  - `jack-russell-terrier-feature-work-to-rest.webp`
  - `jack-russell-terrier-feature-daily-rhythm.webp`
- 롯트와일러: 침착한 힘과 협업, 방문객 거리, 차량 경사로, 구조화된 산책 뒤 휴식
  - `rottweiler-feature-cooperative-strength.webp`
  - `rottweiler-feature-visitor-distance.webp`
  - `rottweiler-feature-large-dog-route.webp`
  - `rottweiler-feature-daily-rhythm.webp`
- 달마시안: 꾸준한 보행, 손 신호와 냄새 과제, 닫힌 공간의 달리기, 활동 뒤 회복
  - `dalmatian-feature-endurance.webp`
  - `dalmatian-feature-hand-signal.webp`
  - `dalmatian-feature-safe-running.webp`
  - `dalmatian-feature-daily-rhythm.webp`
- 그레이트 덴: 초대형 몸의 방향 전환, 차량 경사로, 식사 뒤 조용한 휴식, 넓은 보행 동선
  - `great-dane-feature-body-control.webp`
  - `great-dane-feature-large-dog-route.webp`
  - `great-dane-feature-meal-rest.webp`
  - `great-dane-feature-daily-rhythm.webp`
- 세인트 버나드: 사람 곁의 큰 휴식 자리, 더위 회복, 차량 경사로, 서늘한 시간의 보행
  - `saint-bernard-feature-companionship.webp`
  - `saint-bernard-feature-heat-recovery.webp`
  - `saint-bernard-feature-large-dog-route.webp`
  - `saint-bernard-feature-daily-rhythm.webp`

## 기존 카드에 생활 전환 장면을 추가한 19종

모든 파일 이름은 `<slug>-feature-daily-rhythm.webp`다.

- `german-spitz`: 현관 소리를 확인한 뒤 보호자 신호와 매트로 전환
- `chihuahua`: 짧은 산책 뒤 따뜻한 낮은 매트에서 휴식
- `shih-tzu`: 그늘 산책 뒤 시원한 실내에서 회복
- `korea-jindo-dog`: 긴 줄 냄새 산책 뒤 자발적으로 보호자에게 돌아오기
- `yorkshire-terrier`: 짧은 냄새 찾기 뒤 과제를 끝내고 휴식
- `welsh-corgi-pembroke`: 방향 전환 보행 뒤 미끄럽지 않은 매트에서 휴식
- `golden-retriever`: 한 번의 회수 과제를 마치고 더미를 정리한 뒤 휴식
- `dachshund`: 낮고 평평한 길의 냄새 산책 뒤 휴식
- `beagle`: 긴 줄 냄새 추적을 마치고 보호자를 확인한 뒤 휴식
- `miniature-schnauzer`: 냄새 상자 과제를 끝내고 매트로 전환
- `pug`: 짧은 그늘 산책 뒤 쿨매트에서 편안한 회복
- `french-bulldog`: 서늘한 시간의 짧은 산책 뒤 실내 회복
- `labrador-retriever`: 한 번의 물가 회수 뒤 마른 매트에서 휴식
- `border-collie`: 방향·냄새 과제를 마치고 표식을 정리한 뒤 휴식
- `samoyed`: 서늘한 날 목적 있는 활동 뒤 하네스를 벗고 휴식
- `siberian-husky`: 닫힌 출입문 안으로 돌아온 뒤 하네스와 함께 휴식
- `shiba`: 선택 가능한 냄새 산책 뒤 자발적으로 매트에 머무르기
- `german-shepherd-dog`: 냄새 상자·방향 과제 뒤 표식을 정리하고 휴식
- `dobermann`: 방향 전환 보행 뒤 보호자 곁에서 차분히 휴식

## 래브라도 리트리버 생활 현실 이미지 교체

사용자 검수에서 기존 노란 래브라도의 물가 회수 장면이 페이지의 검은 래브라도 정체성과 이어지지 않고, `큰 체격·먹거리 관심·활동 뒤 수면`을 설명하는 3단계 원고와도 맞지 않는 문제가 확인됐다. 기존 파일은 보존하고 `labrador-retriever-feature-daily-rhythm-v2.webp`를 새로 연결했다.

- 참조 1: `labrador-retriever-card.webp`의 검은 성견 외형과 피모색
- 참조 2: `labrador-retriever-feature-calm-greeting.webp`의 수채화·색연필 질감과 보호자 표현
- 최종 프롬프트: 따뜻한 아이보리색 한국 가정의 현관·거실에서 산책과 짧은 냄새·회수 과제를 마친 검은 성견 래브라도 한 마리가 낮은 미끄럼 방지 매트에 전신을 편안히 누이고, 보호자는 캔버스 회수 더미를 넣고 뚜껑 있는 먹거리 보관함을 닫는 장면. 정확한 넓은 머리·늘어진 귀·짧고 촘촘한 검은 이중모·깊은 가슴·굵은 수달꼬리, 4:3 가로 구도, 따뜻한 아이보리 종이와 옅은 세이지·오트밀·코코아 수채화. 물가·사냥·회수 진행·흥분·먹이 노출·안내견 하네스·다른 동물·텍스트·노란색 또는 초콜릿색 피모·골든 리트리버형 장모는 제외.
- 결과: 내장 ImageGen PNG를 1200×900 WebP 품질 84로 변환, 199KB. 성견 한 마리, 검은 피모, 전신·꼬리 안전 여백, 보호자 손과 보관함, 활동 뒤 휴식 문맥을 확인했다.

## 변환과 검수

내장 ImageGen의 PNG 원본을 프로젝트용 1200×900 WebP로 변환했다. 55장 모두 4:3, 1200×900이며 가장 큰 파일도 332KB로 카드 예산 550KB 이하다. 다섯 장의 접촉 시트로 한 마리 구성, 전신 크롭, 품종 식별점, 장면 중복과 눈에 띄는 해부학 오류를 검수했다. 데이터 테스트는 각 상세 안의 역사·현재·생활 전환·생활 현실 두 장이 서로 다른 로컬 WebP인지 확인한다.
