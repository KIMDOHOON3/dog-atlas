# 표준 상세 100종 마일스톤 이미지 제작 기록

> 제작일: 2026-08-29
> 생성 방식: Codex 내장 ImageGen
> 목적: 푸들 기준 표준 상세를 90종에서 정확히 100종으로 확장하기 위한 현대 생활 장면 제작

## 대상

- 스코티시 테리어
- 노르웨이지안 엘크하운드 그레이
- 살루키
- 아이리시 울프하운드
- 불마스티프
- 스태퍼드셔 불 테리어
- 차이니즈 크레스티드 도그
- 숄로이츠퀸틀레
- 코톤 드 툴레아르
- 노르웨이안 룬데훈트
- 웨스트 하이랜드 화이트 테리어

## 제작 범위

각 견종의 기존 역사 자산은 유지하고 다음 네 의미를 서로 다른 1200×900 WebP로 제작했다.

1. 과거 역할을 생물 추적·공격 없이 바꾼 현재의 짧은 과제
2. 과제를 끝내고 자극과 도구를 치운 뒤 쉬는 전환
3. 출입·차량·기후·체격 중 해당 견종에서 중요한 생활 동선
4. 피모·피부·발·큰 몸 중 반복해서 확인할 관리 현실

코드의 실제 시작점이 문서상 90종이 아니라 푸들 포함 89종임을 회귀 테스트에서 확인해 웨스트 하이랜드 화이트 테리어를 마지막 1종으로 보완했다. 총 44개 자산은 `public/illustrations/v4/`에 `{slug}-feature-{topic}.webp` 형식으로 저장했다. 모든 결과는 한 마리 성견, 전신과 귀·발·꼬리 크롭, 장면 의미 분리, 기존 대표 이미지와의 외형 연결을 접촉 시트로 확인했다.

## 공통 프롬프트 구조

```text
Use case: illustration-story
Asset type: 4:3 Dog Atlas breed-detail daily-life illustration
Primary request: exactly one adult dog performing one safe modern-life action
Input image: the existing breed card is identity reference only; preserve adult proportions, coat, ears, head, tail and characteristic silhouette while creating a new pose and scene
Style/medium: refined natural-history watercolor and colored-pencil on warm ivory paper, subtle sage and beige wash, calm premium editorial atlas
Composition: full body, all ears paws and complete tail visible, generous margins, one clear action
Constraints: calm humane handling; no text, logo, watermark, prey, aggression, other dogs, puppies, cropped anatomy or extra limbs
```

각 호출에는 견종별 외형과 한 장면의 소품·동선만 추가했다. 스태퍼드셔 불 테리어에는 싸움·위협 연출을, 룬데훈트에는 퍼핀·절벽 위험과 과장된 관절 표현을, 헤어리스 견종에는 피부 질환·의료 장면과 문화적 판타지 장식을 명시적으로 제외했다.

## 검수 메모

- 스코티시 테리어: 낮은 체형·직립 귀·검은 와이어 코트 유지
- 엘크하운드: 회색 이중모·검은 주둥이·말린 꼬리 유지
- 살루키: 짧은 몸통 털과 귀·꼬리 장식털, 긴 시각하운드 체형 유지
- 아이리시 울프하운드: 초대형 크기와 거친 회색 피모 유지
- 불마스티프: 검은 마스크·자연 귀·과체중이 아닌 큰 체형 유지
- 스태퍼드셔 불 테리어: 브린들·흰 가슴·자연 귀, 과장된 불리형 체형 제외
- 차이니즈 크레스티드 도그: 헤어리스 개체의 볏털·양말털·깃털 꼬리 유지
- 숄로이츠퀸틀레: 표준 크기 헤어리스 개체의 긴 머리·직립 귀·긴 꼬리 유지
- 코톤 드 툴레아르: 비숑의 강한 곱슬이나 말티즈의 직모와 다른 면 같은 피모 유지
- 룬데훈트: 작은 북유럽 스피츠 체형과 여러 발가락을 비기괴적으로 표현
