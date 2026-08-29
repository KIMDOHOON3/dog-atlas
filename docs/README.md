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
- [`breed-detail-production-gate.md`](breed-detail-production-gate.md) — 새 견종 상세를 추가할 때 이름·수치·고유 원고·이미지 싱크·화면·자동 검사를 한 제작 과정에서 통과시키는 필수 완료 조건
- [`korea-familiar-breed-set.md`](korea-familiar-breed-set.md) — `/discover`의 국내 익숙한 32종 시작 목록, 선정 근거와 노출 원칙
- [`breed-feature-card-rollout.md`](breed-feature-card-rollout.md) — 376개 상세를 견종별 3개 그림 카드로 확장하기 위한 조사·카피·이미지·구현·검증 명세; 사용자 지시 전에는 확장하지 않음
- [`image-prompts-poodle-size-variants-2026-08-23.md`](image-prompts-poodle-size-variants-2026-08-23.md) — 푸들 네 크기 선택용 독립 이미지의 제작 기준과 자산 경로
- [`korean-copy-audit.md`](korean-copy-audit.md) — 368종 한국어 표시 카피 전수 점검, 교정 범위와 재발 방지 테스트
- [`catalog-data-architecture.md`](catalog-data-architecture.md) — 마스터 카탈로그와 상세 콘텐츠 분리 설계
- [`catalog-taxonomy-spec.md`](catalog-taxonomy-spec.md) — 탐색 분류와 통제 어휘
- [`catalog-inclusion-policy.md`](catalog-inclusion-policy.md) — 국제 등록견·국가 보존 토착견·랜드레이스의 포함 및 근거 기준
- [`breed-master-inventory.md`](breed-master-inventory.md) — FCI 중심 마스터 견종 인벤토리와 별칭 후보
- [`catalog-20-proposal.md`](catalog-20-proposal.md) — 초기 20종 확장 제안; 현재 규모를 나타내는 문서는 아님

### UI와 디자인

- [`breed-detail-standard.md`](breed-detail-standard.md) — 푸들 상세에서 확정한 견종 상세의 정보 구조, 디자인, 인터랙션, 적용 체크리스트
- [`redesign-v2.md`](redesign-v2.md) — 현재 화면 방향의 기반이 된 홈·상세 재설계안
- [`shortlist-design-spec.md`](shortlist-design-spec.md) — 현재는 중단된 관심 견종 보관함·2~3종 비교의 역사적 설계 기록
- [`design-redesign-spec.md`](design-redesign-spec.md) — 타이포, 캐러셀, 생활조건 탐색을 포함한 초기 개선 명세
- [`product-icon-guide.md`](product-icon-guide.md) — 재사용 가능한 생활 정보 제품 아이콘의 시각 규격, AI 프롬프트와 검수 기준

### 검증과 출시 준비

- [`release-readiness.md`](release-readiness.md) — 자동 검사, 반응형 QA, 외부 전문가 검수와 배포 차단 기준

### 이미지 제작 기록

- [`image-prompt-home-life-diorama-2026-08-24.md`](image-prompt-home-life-diorama-2026-08-24.md) — 새 홈의 무광 3D 생활 디오라마 자산·프롬프트·화면 검수 기록
- [`image-prompt-home-care-ui-spitz-2026-08-24.md`](image-prompt-home-care-ui-spitz-2026-08-24.md) — 홈 대표 스피츠와 네 돌봄 모듈로 구성한 3D UI 디오라마 프롬프트
- [`breed-visual-audit.md`](breed-visual-audit.md) — 368종 카드 1차 외형 점검과 고위험 묶음별 교체·유지·재확인 상태
- [`image-prompts-sapsaree.md`](image-prompts-sapsaree.md) — 삽살개 카드·역사 이미지 재제작 근거와 전체 프롬프트
- [`image-prompts-breed-visual-replacements-2026-08-11.md`](image-prompts-breed-visual-replacements-2026-08-11.md) — 공식 외형 자료와 대조해 교체한 10종·20개 자산의 생성 방식, 프롬프트와 파일 매핑
- [`image-prompts-breed-visual-replacements-batch-2-2026-08-11.md`](image-prompts-breed-visual-replacements-batch-2-2026-08-11.md) — 후각하운드·흰 가축보호견·스피츠 30종 재검수에서 교체한 11종·13개 자산의 근거와 프롬프트
- [`image-prompts-batch-a.md`](image-prompts-batch-a.md) — 초기 확장 배치 A의 카드·역사 이미지 프롬프트와 QA 기록
- [`image-prompts-batch-b.md`](image-prompts-batch-b.md) — 초기 확장 배치 B의 카드·역사 이미지 프롬프트와 QA 기록
- [`image-prompts-japanese-spitz-features-2026-08-19.md`](image-prompts-japanese-spitz-features-2026-08-19.md) — 견종별 3개 특징 카드 파일럿의 재패니즈 스피츠 이미지 제작 기록
- [`image-prompts-poodle-growth-guide-2026-08-21.md`](image-prompts-poodle-growth-guide-2026-08-21.md) — 푸들 성장 3단계 이미지와 참조 자산·프롬프트·검수 기록
- [`image-prompts-familiar-standard-2026-08-25.md`](image-prompts-familiar-standard-2026-08-25.md) — 국내 익숙한 32종 공식 상세 전환에 추가한 55개 생활 장면과 공통 프롬프트·검수 기록
- [`image-prompts-standard-detail-batch-2026-08-27.md`](image-prompts-standard-detail-batch-2026-08-27.md) — 그레이트 피레니즈·바센지·버니즈 마운틴 독 표준 상세에 추가한 생활 장면 3개의 프롬프트·검수 기록
- [`image-prompts-shetland-sheepdog-standard-2026-08-27.md`](image-prompts-shetland-sheepdog-standard-2026-08-27.md) — 셔틀랜드 시프독 표준 상세에 추가한 냄새 선택 생활 장면의 프롬프트·검수 기록
- [`image-prompts-standard-detail-milestone-100-2026-08-29.md`](image-prompts-standard-detail-milestone-100-2026-08-29.md) — 푸들 기준 표준 상세를 정확히 100종으로 채운 마지막 11종·44개 생활 장면의 제작·검수 기록

배치 A·B 문서는 현재 전체 368종 자산 목록이 아니라 초기 제작 배치의 재현 기록이다. 최신 외형 점검 상태는 `breed-visual-audit.md`를 기준으로 본다.

## 문서 유지 규칙

- 제품 범위, 주요 화면, 아키텍처, 데이터 규모, 자산 범위, 검증 결과가 바뀌면 같은 작업에서 `project-status.md`를 갱신한다.
- 새로운 중요한 판단은 `decisions.md`에 날짜와 이유를 남기고 `project-status.md`에는 현재 결론만 반영한다.
- 세부 설계는 분야별 문서에 기록하고 상태 문서에는 링크와 핵심만 남긴다.
- 완료되지 않은 제안은 현재 기능처럼 쓰지 않는다. `제안`, `진행 중`, `구현됨`을 구분한다.
- 숫자는 가능하면 테스트나 코드의 원본 위치를 함께 적는다.
- 과거 문서는 삭제하기보다 문서 상단이나 이 인덱스에서 역사적 문서임을 명시한다.
