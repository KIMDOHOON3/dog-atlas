# 닥스훈트·비글·스패니얼·리트리버 이미지 제작 기록

> 제작일: 2026-08-20
> 생성 방식: Codex 내장 ImageGen 신규 생성
> 적용 페이지: `/breeds/dachshund`, `/breeds/beagle`, `/breeds/english-cocker-spaniel`, `/breeds/labrador-retriever`, `/breeds/golden-retriever`

## 근거와 선택한 주제

- 닥스훈트: [FCI 표준 148](https://www.fci.be/Nomenclature/Standards/148g04-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/dachshund/)를 바탕으로 지상·지하의 추적 작업, 세 크기와 세 피모 조합을 확인했다. 특징 카드는 땅굴과 후각, 낮은 몸에 맞는 동선, 아홉 바라이어티로 나눴다.
- 비글: [FCI 표준 161](https://www.fci.be/Nomenclature/Standards/161g06-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/beagle/)를 바탕으로 무리로 냄새를 추적하는 후각 하운드의 역할을 확인했다. 특징 카드는 냄새 산책, 목소리, 먹을거리 관리로 나눴다.
- 잉글리시 코커 스패니얼: [FCI 표준 5](https://www.fci.be/Nomenclature/Standards/005g08-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/english-cocker-spaniel/)를 바탕으로 플러싱 작업, 작업형과 쇼형의 차이, 피모 형태를 확인했다. 특징 카드는 탐색과 회수, 계통 차이, 귀와 장식털 관리로 나눴다.
- 래브라도 리트리버: [FCI 표준 122](https://www.fci.be/Nomenclature/Standards/122g08-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/labrador-retriever/)를 바탕으로 물에서의 회수 역할과 촘촘한 이중모를 확인했다. 특징 카드는 물과 회수, 큰 몸의 인사, 이중모와 물기 관리로 나눴다.
- 골든 리트리버: [FCI 표준 111](https://www.fci.be/Nomenclature/Standards/111g08-en.pdf)과 [AKC 견종 소개](https://www.akc.org/dog-breeds/golden-retriever/)를 바탕으로 물과 육지의 회수 역할, 장식털과 방수성 속털을 확인했다. 특징 카드는 협력과 회수, 큰 몸의 인사, 장식털과 물기 관리로 나눴다.

건강·유전질환은 특징 카드에서 제외했다. 래브라도와 골든 리트리버는 비슷한 생활 질문을 다루더라도 피모 구조와 장면, 설명의 초점을 각각 다르게 구성했다.

## 최종 저장 경로

- 닥스훈트: `dachshund-feature-underground-scent.webp`, `dachshund-feature-safe-routes.webp`, `dachshund-feature-nine-varieties.webp`
- 비글: `beagle-feature-scent-tracking.webp`, `beagle-feature-voice.webp`, `beagle-feature-food-management.webp`
- 잉글리시 코커 스패니얼: `english-cocker-spaniel-feature-search-retrieve.webp`, `english-cocker-spaniel-feature-working-show.webp`, `english-cocker-spaniel-feature-ear-coat-care.webp`
- 래브라도 리트리버: `labrador-retriever-feature-water-retrieval.webp`, `labrador-retriever-feature-calm-greeting.webp`, `labrador-retriever-feature-double-coat-care.webp`
- 골든 리트리버: `golden-retriever-feature-cooperative-retrieval.webp`, `golden-retriever-feature-calm-greeting.webp`, `golden-retriever-feature-feathered-coat-care.webp`

모든 파일은 `public/illustrations/v4/` 아래의 1200×900 WebP다.

## 최종 프롬프트 요약

각 견종의 기존 대표 이미지를 시각 참조로 사용하고 따뜻한 편집형 구아슈·색연필 질감, 텍스트와 워터마크가 없는 4:3 현대 생활 장면으로 생성했다. 닥스훈트는 안전한 후각 상자·경사로·아홉 성견 비교, 비글은 긴 리드 산책·알림 뒤 매트 복귀·닫힌 수납공간이 있는 급여 준비, 코커 스패니얼은 인조 캔버스 더미 회수·작업형과 쇼형 비교·산책 뒤 귀 관리로 구분했다. 래브라도는 물 회수·현관 인사·물놀이 뒤 속털 관리, 골든은 육지 회수·공원에서 거리 두고 인사하기·장식털 관리로 구분했다.

## 시각 검수

- 15개 최종 결과에서 견종별 머리·귀·주둥이·몸통·다리·꼬리·피모가 기존 대표 이미지와 충돌하지 않는지 확인했다.
- 비글의 먹을거리 관리 장면은 수납장과 쓰레기통이 닫힌 버전으로, 코커 스패니얼의 회수 장면은 새가 아닌 원통형 캔버스 더미만 있는 버전으로 다시 생성했다.
- 기존 대표·역사 이미지 10장은 각 견종의 외형과 역사 역할을 분명히 보여주어 교체하지 않았다.
- 최종 자산은 모두 파일당 700KB 이하인지 자동 테스트한다.
