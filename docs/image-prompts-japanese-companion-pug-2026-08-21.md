# 시바·아키타·비숑 프리제·캐벌리어·퍼그 이미지 제작 기록

> 제작일: 2026-08-21
> 생성 방식: Codex 내장 ImageGen 신규 생성
> 적용 페이지: `/breeds/shiba`, `/breeds/akita`, `/breeds/bichon-frise`, `/breeds/cavalier-king-charles-spaniel`, `/breeds/pug`

## 근거와 주제

- 시바: [FCI 표준 257](https://www.fci.be/Nomenclature/Standards/257g05-en.pdf)과 [RKC 소개](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/utility/japanese-shiba-inu/)를 바탕으로 선택권 있는 관계·출입 안전·계절성 이중모를 다뤘다.
- 아키타: [FCI 표준 255](https://www.fci.be/Nomenclature/Standards/255g05-en.pdf)과 [RKC 소개](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/utility/japanese-akita-inu/)를 바탕으로 낯선 대상과의 거리·큰 힘을 다루는 보행·대형견 이동 동선을 다뤘다.
- 비숑 프리제: [FCI 표준 215](https://www.fci.be/Nomenclature/Standards/215g09-en.pdf)과 [RKC 소개](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/toy/bichon-frise/)를 바탕으로 사람 곁의 반려견이라는 배경·빠르고 가벼운 움직임·곱슬 피모의 빗질과 건조를 다뤘다.
- 캐벌리어 킹 찰스 스패니얼: [FCI 표준 136](https://www.fci.be/Nomenclature/Standards/136g09-en.pdf)과 [RKC 소개](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/toy/cavalier-king-charles-spaniel/)를 바탕으로 사람과 가까이 지내는 성향·스패니얼다운 냄새 탐색·긴 귀와 장식털을 다뤘다.
- 퍼그: [FCI 표준 253](https://www.fci.be/Nomenclature/Standards/253g09-en.pdf)과 [RKC 소개](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/toy/pug/)를 바탕으로 활동 뒤 호흡 회복·더위를 피한 짧은 산책·얼굴 주름과 눈 점검을 다뤘다.

## 프롬프트 공통 기준

각 견종의 기존 대표 이미지를 외형 참조로 사용했다. 같은 성견으로 알아볼 수 있는 정확한 체형과 피모, 따뜻한 손그림 구아슈·파스텔 질감, 저채도 크림·세이지·테라코타 색, 텍스트 없는 가로 4:3 생활 장면을 공통으로 요청했다. 한 카드에는 한 가지 생활 질문만 보이도록 인물과 소품을 제한했고, 강제 접촉·살아 있는 사냥감·공포·부상·의료 장비·문자·로고를 제외했다.

## 최종 자산

모든 파일은 `public/illustrations/v4/` 아래의 1200×900 WebP다.

- `shiba-feature-choice-and-trust.webp`, `shiba-feature-entry-safety.webp`, `shiba-feature-seasonal-coat.webp`
- `akita-feature-respectful-distance.webp`, `akita-feature-calm-walking.webp`, `akita-feature-large-dog-route.webp`
- `bichon-frise-feature-independent-rest.webp`, `bichon-frise-feature-cooperative-learning.webp`, `bichon-frise-feature-curly-coat-care.webp`
- `cavalier-king-charles-spaniel-feature-independent-rest.webp`, `cavalier-king-charles-spaniel-feature-scent-walk.webp`, `cavalier-king-charles-spaniel-feature-feathered-coat-care.webp`
- `pug-feature-breathing-recovery.webp`, `pug-feature-cool-walk.webp`, `pug-feature-face-eye-care.webp`

## 생성·검수 메모

초기 배치 뒤 시바가 아키타와 체형·머리 형태가 지나치게 비슷하다는 검수 의견을 반영했다. 시바의 대표·역사·특징 카드 3장을 모두 내장 ImageGen 신규 생성 방식으로 다시 만들고, 사람과의 비율·좁은 여우형 머리·가벼운 골격·빠른 움직임을 명시해 아키타의 넓고 묵직한 체형과 구분했다. 같은 검수에서 반복되는 피모 주제를 줄이기 위해 아키타는 차량 경사로를 활용한 대형견 이동 동선으로 교체했다. 캐벌리어의 긴 귀와 장식털은 견종을 구별하는 특징이자 실제 관리 부담이므로 해당 피모 카드는 유지했다. 최종 WebP의 비율·크기·파일 예산과 화면 크롭을 다시 확인한다.

## 2026-08-25 비숑 프리제 공식 상세 보완

비숑 프리제의 공식 상세 기준 적용에는 역사·현재 경향·생활 현실 두 장과 겹치지 않는 활동 장면이 한 장 더 필요했다. Codex 내장 ImageGen으로 기존 대표 이미지의 작고 균형 잡힌 백색 성견 외형과 기존 특징 카드의 따뜻한 수채화·색연필 질감을 참조해 새 장면을 생성했다.

- 최종 자산: `public/illustrations/v4/bichon-frise-feature-play.webp`
- 규격: 1200×900 WebP
- 장면: 조용한 현대 공원에서 보호자가 굴린 작은 오트밀색 공을 따라 움직이는 성견 비숑 프리제
- 프롬프트 요약: 한 장면에 성견 한 마리와 보호자 한 명만 두고, 전신·검은 코와 눈·촘촘한 흰 코르크스크루 컬·등 위로 말린 꼬리를 유지한다. 미용·훈련 표식·역사 소품 없이 매일의 놀이만 읽히게 하며, 카드 분할·문자·로고·사진풍을 제외한다.
- 검수: 생성 원본을 4:3으로 확인한 뒤 1200×900 WebP로 변환했다. 발·귀·꼬리와 공이 잘리지 않고, 한 마리만 등장하며, 기존 네 콘텐츠 이미지와 의미가 겹치지 않는지 확인했다.
