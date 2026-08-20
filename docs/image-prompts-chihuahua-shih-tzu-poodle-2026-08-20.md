# 치와와·시추·푸들 이미지 제작 기록

> 제작일: 2026-08-20
> 생성 방식: Codex 내장 ImageGen 신규 생성
> 적용 페이지: `/breeds/chihuahua`, `/breeds/shih-tzu`, `/breeds/poodle`

## 근거와 선택한 주제

- 치와와: [FCI 표준 218](https://www.fci.be/Nomenclature/Standards/218g09-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/chihuahua/)를 바탕으로 거의 정사각형인 작은 체형, 사과형 머리, 크고 곧은 귀, 단모·장모 두 피모 유형을 확인했다. 특징 카드는 작은 몸의 생활 안전, 소리와 알림, 피모와 보온으로 나눴다.
- 시추: [FCI 표준 208](https://www.fci.be/Nomenclature/Standards/208g09-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/shih-tzu/)를 바탕으로 키보다 긴 튼튼한 몸, 짧고 넓은 주둥이, 눈을 가리지 않는 풍성한 피모를 확인했다. 특징 카드는 사람과의 관계, 짧은 얼굴과 더위, 피모와 얼굴 관리로 나눴다.
- 푸들: [FCI 표준 172](https://www.fci.be/Nomenclature/Standards/172g09-en.pdf), [AKC 견종 소개](https://www.akc.org/dog-breeds/poodle-standard/), [AKC 역사](https://www.akc.org/expert-advice/dog-breeds/poodle-history/)를 바탕으로 워터 리트리버 체형, 길고 곧은 주둥이, 촘촘한 곱슬 피모와 네 크기 바라이어티를 확인했다. 특징 카드는 네 가지 크기, 회수와 배움, 곱슬 피모 관리로 나눴다.

건강·유전질환을 대표 특징으로 제시하지 않았고, 각 카드는 같은 페이지의 역사 장면과 다른 현대 생활 질문에 답하도록 구성했다.

## 최종 저장 경로

### 치와와

- `public/illustrations/v2/chihuahua-card.webp` — 1200×1200 대표 카드
- `public/illustrations/v3/chihuahua-history.webp` — 1200×800 역사 장면
- `public/illustrations/v4/chihuahua-feature-small-body-safety.webp` — 1200×900 작은 몸과 안전
- `public/illustrations/v4/chihuahua-feature-alert-response.webp` — 1200×900 소리와 알림
- `public/illustrations/v4/chihuahua-feature-coat-warmth.webp` — 1200×900 피모와 보온

### 시추

- `public/illustrations/v2/shih-tzu-card.webp` — 1200×1200 대표 카드
- `public/illustrations/v3/shih-tzu-history.webp` — 1200×800 역사 장면
- `public/illustrations/v4/shih-tzu-feature-companionship.webp` — 1200×900 사람과의 관계
- `public/illustrations/v4/shih-tzu-feature-heat-care.webp` — 1200×900 짧은 얼굴과 더위
- `public/illustrations/v4/shih-tzu-feature-coat-face-care.webp` — 1200×900 피모와 얼굴 관리

### 푸들

- `public/illustrations/v2/poodle-card.webp` — 1200×1200 대표 카드
- `public/illustrations/v3/poodle-history.webp` — 1200×800 역사 장면
- `public/illustrations/v4/poodle-feature-four-sizes.webp` — 1200×900 네 가지 크기
- `public/illustrations/v4/poodle-feature-learning-retrieval.webp` — 1200×900 회수와 배움
- `public/illustrations/v4/poodle-feature-coat-care.webp` — 1200×900 곱슬 피모 관리

## 최종 프롬프트 요약

모든 이미지는 따뜻한 아이보리 종이에 그린 편집형 구아슈·수채화 질감, 텍스트와 워터마크가 없는 구성으로 생성했다. 대표 이미지는 성견 한 마리의 실제 비율을 정사각 프레임에서 보여주고, 역사 이미지는 3:2, 특징 이미지는 넉넉한 안전 여백을 둔 4:3으로 최적화했다.

- 치와와 대표는 황갈색 단모 성견의 작은 정사각형 체형과 곧은 귀를 강조했다. 역사는 고대 계보를 사실처럼 재현하지 않고 19세기 말 멕시코 북부의 생활 장면으로 제한했다. 현대 장면은 낮은 발판과 미끄럼 방지 바닥, 현관 소리 뒤 매트로 돌아오기, 단모·장모와 따뜻한 휴식 준비를 각각 분리했다.
- 시추 대표는 흰색과 금색의 튼튼한 성견, 보이는 눈, 과도하게 바닥을 끌지 않는 피모를 우선했다. 역사는 20세기 초 중국 궁정 정원, 현대 장면은 보호자 곁의 자율적인 휴식, 그늘과 물이 있는 여름 산책, 빗질과 얼굴 닦기로 구분했다.
- 푸들 대표는 실용적인 미용을 한 살구색 미니어처 성견의 운동성 있는 체형을 사용했다. 역사는 스탠더드 푸들의 물 회수 작업을 살아 있는 사냥감 없이 표현했다. 현대 장면은 네 크기의 성견을 같은 바닥에 배치한 비교, 회수용 더미를 이용한 협력 과제, 빗과 클리퍼가 준비된 정기 관리로 구분했다.

## 시각 검수

- 15개 결과를 원본 크기로 확인하고 머리·귀·주둥이·몸통·다리·꼬리·피모가 각 견종의 핵심 실루엣과 충돌하지 않는지 살폈다.
- 치와와 역사 장면이 불확실한 고대 혈통을 단정하지 않는지, 시추 피모가 움직임과 눈을 막지 않는지, 푸들 네 마리가 새끼가 아니라 서로 다른 크기의 성견으로 읽히는지 확인했다.
- 각 특징 이미지의 행동과 소품이 카드 설명과 일치하고, 같은 견종 안에서 장면이 반복되지 않는지 확인했다.
- 최종 자산은 WebP로 변환해 대표 1200×1200, 역사 1200×800, 특징 카드 1200×900으로 저장했다.
