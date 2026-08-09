# Dog Atlas 문서 안내

이 디렉터리의 문서는 작성 시점과 목적이 서로 다르다. 현재 상태를 파악할 때는 파일 이름순으로 읽지 말고 아래 순서를 따른다.

## 모든 작업자가 먼저 읽을 문서

1. [`project-status.md`](project-status.md) — 현재 제품, 디자인, 코드, 콘텐츠, 검증 상태의 단일 진입점
2. [`product-brief.md`](product-brief.md) — 변하지 않는 제품 목적과 사용자 변화
3. [`mvp-scope.md`](mvp-scope.md) — MVP 포함·제외 범위와 상세 콘텐츠 확장 기록
4. [`decisions.md`](decisions.md) — 날짜별 주요 제품·기술 결정
5. [`design-visual-guide.md`](design-visual-guide.md) — 이미지 역할, 시각 자산, 접근성 원칙

현재 코드와 문서가 충돌하면 `project-status.md`에 차이를 기록하고, 코드와 테스트를 사실 확인의 기준으로 삼는다. 제품 원칙이 충돌하면 `product-brief.md`와 `decisions.md`를 우선한다.

## 분야별 참고 문서

### 콘텐츠와 데이터

- [`content-copy-guide.md`](content-copy-guide.md) — 단정적 추천을 피하는 카피 규칙과 검수 기준
- [`catalog-data-architecture.md`](catalog-data-architecture.md) — 마스터 카탈로그와 상세 콘텐츠 분리 설계
- [`catalog-taxonomy-spec.md`](catalog-taxonomy-spec.md) — 탐색 분류와 통제 어휘
- [`catalog-inclusion-policy.md`](catalog-inclusion-policy.md) — 국제 등록견·국가 보존 토착견·랜드레이스의 포함 및 근거 기준
- [`breed-master-inventory.md`](breed-master-inventory.md) — FCI 중심 마스터 견종 인벤토리와 별칭 후보
- [`catalog-20-proposal.md`](catalog-20-proposal.md) — 초기 20종 확장 제안; 현재 규모를 나타내는 문서는 아님

### UI와 디자인

- [`redesign-v2.md`](redesign-v2.md) — 현재 화면 방향의 기반이 된 홈·상세 재설계안
- [`shortlist-design-spec.md`](shortlist-design-spec.md) — 관심 견종 보관함과 2~3종 비교 설계
- [`design-redesign-spec.md`](design-redesign-spec.md) — 타이포, 캐러셀, 생활조건 탐색을 포함한 초기 개선 명세

### 이미지 제작 기록

- [`image-prompts-batch-a.md`](image-prompts-batch-a.md) — 초기 확장 배치 A의 카드·역사 이미지 프롬프트와 QA 기록
- [`image-prompts-batch-b.md`](image-prompts-batch-b.md) — 초기 확장 배치 B의 카드·역사 이미지 프롬프트와 QA 기록

두 이미지 문서는 현재 전체 365종 자산 목록이 아니라 초기 제작 배치의 재현 기록이다.

## 문서 유지 규칙

- 제품 범위, 주요 화면, 아키텍처, 데이터 규모, 자산 범위, 검증 결과가 바뀌면 같은 작업에서 `project-status.md`를 갱신한다.
- 새로운 중요한 판단은 `decisions.md`에 날짜와 이유를 남기고 `project-status.md`에는 현재 결론만 반영한다.
- 세부 설계는 분야별 문서에 기록하고 상태 문서에는 링크와 핵심만 남긴다.
- 완료되지 않은 제안은 현재 기능처럼 쓰지 않는다. `제안`, `진행 중`, `구현됨`을 구분한다.
- 숫자는 가능하면 테스트나 코드의 원본 위치를 함께 적는다.
- 과거 문서는 삭제하기보다 문서 상단이나 이 인덱스에서 역사적 문서임을 명시한다.
