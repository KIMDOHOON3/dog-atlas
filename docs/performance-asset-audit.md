# 성능 및 미사용 이미지 정리 — 2026-09-02

## 범위

- 기준 커밋: `19a4681bd94370bae8c88eafd39d935771324130`.
- 화면 디자인, 견종 카피, 크기 분류, 사용하는 이미지 품질은 변경하지 않았다.
- 사용자 요청대로 `next.config.ts`의 `images.unoptimized: true`를 유지했다.
- `.codex-remote-attachments/`의 사용자 참고 이미지와 비공개 원고가 참조하는 자산은 보존했다.

## 코드 변경

- 검색 이름·별명을 breed options가 바뀔 때 한 번 정규화한다. 입력마다 수행하던 중복 정규화와 전체 견종 객체 복제를 제거했다. 정확 일치 → 접두어 → 한국어 이름 순서, 별명 표시, 최대 6개 제안은 유지한다.
- 표준 상세페이지의 이야기·준비 질문·생활 카드 클라이언트에 필요한 필드만 명시적으로 전달한다. 단순 TypeScript 타입 축소가 아니라 실제 직렬화 객체를 줄였다.
- 정적인 홈 `CategoryExplorer`를 서버 컴포넌트로 처리한다.
- 견종 slug 조회를 배열 순회에서 Map 조회로 바꿨다.
- 견종 발견 및 호기심 컬렉션의 대량 카드 링크는 `prefetch={false}`로 설정했다. 보이는 카드들의 상세페이지를 미리 받지 않으며 클릭 시 요청한다. 네트워크 요청을 줄이는 대신 처음 클릭한 페이지는 미리 로딩되어 있지 않을 수 있다. 실제 요청량/클릭 지연 차이는 이번에 브라우저로 측정하지 않았다.

## 같은 로컬 환경에서의 전후 비교

기준 커밋의 production build를 먼저 실행하고 수정 후 다시 빌드했다. Node 24.19.0, Next 16.2.12. 아래 파일 크기는 압축 전 바이트이며 전송 압축·캐시·회선에 따른 실제 전송량/시간과 다르다.

| 항목 | 변경 전 | 변경 후 | 차이 |
| --- | ---: | ---: | ---: |
| 검색 1,200회 CPU 시간, 7회 중앙값 | 536.17ms | 28.09ms | 약 94.8% 감소 |
| 골든 리트리버 상세 RSC | 24,763 B | 21,225 B | 14.3% 감소 |
| 뉴펀들랜드 상세 RSC | 20,864 B | 19,150 B | 8.2% 감소 |
| 재패니즈 스피츠 상세 RSC | 19,682 B | 18,354 B | 6.7% 감소 |
| 푸들 상세 RSC | 18,817 B | 17,977 B | 4.5% 감소 |
| 견종 상세 377개 RSC 파일 합계(별칭 경로 포함) | 7,564,135 B | 7,111,240 B | 6.0% 감소 |
| 전체 생성 JS 청크 합계 | 1,124,526 B | 1,119,484 B | 5,042 B / 0.45% 감소 |
| public 이미지 수 | 1,803개 | 1,779개 | 24개 삭제 |
| public 이미지 합계 | 452,306,899 B | 449,598,240 B | 2,708,659 B / 2.58MiB 감소 |

- 검색 측정: `node scripts/benchmark-search.mjs`. 기존 검색 알고리즘과 새 알고리즘을 같은 376종·12개 쿼리로 비교하며, 결과 동일성을 확인한 뒤 워밍업하고 100회 반복 × 7표본을 교차 측정한다. 입력 정규화·렌더링·라우팅 시간은 제외한다. 새 인덱스 초기 생성은 이 실행에서 약 0.47ms였다.
- 전체 RSC/JS 합계는 **빌드 산출물 합계**이지 사용자가 첫 방문에 모두 다운로드하는 양이 아니다.
- 미사용 이미지 삭제는 저장/배포 용량 정리다. 이미 사용하지 않던 파일이므로 방문자가 보던 이미지 다운로드 용량은 이 삭제로 줄지 않는다.
- 이번 환경에서 브라우저 연결 목록이 비어 있어 LCP/INP/화면 로딩 시간 및 모바일 시각 검증은 수행하지 못했다. 사이트 전체가 검색 벤치마크 배율만큼 빨라졌다고 해석하지 않는다.

## 이미지 감사 방법

`pnpm audit:images`는 읽기 전용이다. `src`의 TS/TSX 문자열 AST·CSS·JSON 경로와 평가된 모든 content module의 객체/배열/Map/Set을 조사한다. 동적으로 생성하는 상세 이미지, 비공개 원고, `getBreedCardImage()`의 전체 견종 경로도 보존한다. 모듈 평가 실패 시 감사는 실패한다. 삭제는 자동으로 하지 않는다.

후보 24개는 삭제 전 기존 production HTML/RSC/청크에서도 경로가 없는지 재확인했다. 모든 대상이 `public/illustrations/` 안의 Git 추적 파일인지 절대 경로를 검증하고 개별 삭제했다. 추가 동적 경로 생성기를 도입하면 감사 스크립트의 평가 대상도 함께 갱신해야 한다.

삭제 후 감사: 이미지 1,779개 모두 참조 있음, 미사용 후보 0개. 신규 빌드 HTML/RSC 3,547개 파일(세그먼트 포함)에서 추출한 이미지 경로 1,761개는 모두 실제 파일이 존재했다.

### 삭제 목록

모든 경로는 `public/illustrations/` 기준이다. 아래 파일은 위 기준 커밋에 있으므로 Git으로 복원 가능하다. 디스크의 Git 이력은 정리하지 않았다.

- `ui/dog-lifestyle-icons-v3.webp`
- `ui/dog-lifestyle-icons-v4.webp`
- `ui/dog-shortcut-icons-v3.webp`
- `ui/lifestyle-motion/active-run-sprite.webp`
- `ui/lifestyle-motion/calm-base.webp`
- `ui/lifestyle-motion/calm-z.webp`
- `ui/lifestyle-motion/grooming-dog-open.webp`
- `ui/lifestyle-motion/grooming-dog.webp`
- `ui/lifestyle-motion/grooming-hand.webp`
- `ui/lifestyle-motion/independent-base.png`
- `ui/lifestyle-motion/independent-yawn-full.png`
- `ui/lifestyle-motion/independent-yawn-mid.png`
- `ui/lifestyle-motion/social-base.png`
- `ui/lifestyle-motion/social-blink.png`
- `ui/lifestyle-motion/social-hand.png`
- `ui/lifestyle-motion/unfamiliar-base.png`
- `ui/lifestyle-motion/unfamiliar-question.png`
- `ui/lifestyle-motion/unfamiliar-tilt.png`
- `v2/japanese-spitz-hero.webp`
- `v4/german-spitz-feature-five-varieties.webp`
- `v4/japanese-spitz-feature-alert.webp`
- `v4/japanese-spitz-feature-silhouette.webp`
- `v4/labrador-retriever-feature-daily-rhythm.webp`
- `v7/home-life-diorama.webp`

## 검증

- ESLint: 통과.
- TypeScript `tsc --noEmit`: 통과.
- Vitest: 48개 파일 / 1,618개 테스트 통과. 전체 이름·별명 정확 일치, 부분 일치 순서, 클라이언트 전달 필드 제한을 추가 검증했다. 기본 sandbox에서 esbuild의 상위 폴더 접근이 차단되어 전체 테스트는 승인된 제한 외 실행으로 완료했다.
- Production build: 성공, 399개 정적 경로 생성.
- 로컬 production HTTP: 홈, 발견, 초소형 URL, 초대형+활동량 URL, 골든 리트리버·뉴펀들랜드·푸들·불개 상세, 초대형 컬렉션, 초보자 가이드 10개 경로 모두 200. HTML에 `/_next/image?` 요청 없음.
- 위 HTTP 검사는 응답/렌더링 확인이며 브라우저의 실제 클릭·모바일 레이아웃 검증을 대신하지 않는다.

## 2차 — 컴포넌트와 전달 데이터 최적화

2026-09-02 추가 분석 후 사용자 승인으로 구현했다. 아래 비교의 **변경 전은 위 1차 최적화가 끝난 작업 트리**다. 최초 커밋 대비 수치와 혼합하지 않는다.

### 실제 빌드 비교

| 항목 | 1차 완료 후 | 2차 완료 후 | 감소 |
| --- | ---: | ---: | ---: |
| 큰 체격 모아보기 RSC (`giant-build`) | 770,766 B | 35,223 B | 95.4% |
| 작은 체격 모아보기 RSC (`small-build`) | 343,922 B | 20,952 B | 93.9% |
| 법령상 관리 모아보기 RSC (`regulated-care`) | 51,301 B | 12,549 B | 75.5% |
| 독특한 피모 RSC (`distinctive-coats`) | 39,363 B | 11,504 B | 70.8% |
| 주름 피부 RSC (`wrinkled-skin`) | 39,443 B | 11,387 B | 71.1% |
| 웨스트민스터 RSC (`westminster-stories`) | 64,999 B | 12,323 B | 81.0% |
| 전체 생성 JS 청크 합계 | 1,119,484 B / 19개 | 824,682 B / 18개 | 26.3% |

압축 전 빌드 바이트다. 전체 JS 합계는 한 방문자가 모든 페이지에서 다운로드하는 양이 아니며, RSC 감소율을 화면 로딩 속도 감소율로 해석하지 않는다.

### 구현 내용

- `toCuriosityBreedCard()`에서 이름·slug·원산지·테마 문구만 남겼다. 화면에 보이는 순서·카피·링크는 그대로이며 원본 콘텐츠는 보존했다.
- `PoodleRealityCards`/`PoodleSizePicker`는 서버에서 받은 크기 및 생활 카드 데이터만 사용한다. 기존 런타임 `poodleDetail` import를 type-only import로 바꿔 Zod와 데이터 검증이 브라우저에 들어가는 경로를 제거했다.
- 변경 전 Zod/푸들 코드를 담은 `3nlhqmesx4wke.js`는 309,038 B(gzip 73,088 B)였고 견종 HTML 377개 모두에서 참조했다. 변경 후 JS 청크 전체에서 `ZodError`, `ZodString`, `safeParse`, 옛 `poodle-step-tab` 문자열이 발견되지 않았다. 해당 청크 전체 크기를 그대로 절감량으로 주장하지 않고 실제 합계 차이 294,802 B를 기록한다.
- `DiscoverResultGrid`를 분리·메모화하고 필터 강조 항목 배열을 안정적으로 재사용한다. 필터 창 열림 같은 무관한 상위 상태 변화에서는 목록을 다시 계산하지 않으며, 필터와 표시 목록이 바뀌면 정상 갱신한다.
- `useInfiniteBatch`는 배치별 중복 콜백 방지, 총 개수 상한, 콜백 해제와 fallback을 공유한다. 기존 기록에 모바일 WebView의 Observer 알림 누락 문제가 있어 보조 scroll/resize 감지는 제거하지 않았다. 대신 위치 계산을 150ms 간격으로 제한하고 타이머/프레임을 함께 해제한다. 초기 위치 확인과 정상 Observer 반응은 즉시 처리한다.
- `useSnapCarousel`로 동일한 푸들/공통 상세 캐러셀 로직을 공유한다.
- `PageScrollControl`의 아래로 이동 interval을 하나만 유지하고 재클릭, 위로 이동, pathname 변경, unmount, 높이 안정 시 정리한다.
- 미사용 소스 `src/components/breed-thumbnail.tsx`, `category-dog-icon.tsx`, `story-glyph.tsx`를 삭제했다. `PoodleStorySteps`, `PoodleReadinessChecklist`는 앱에서 이미 공통 구현을 사용하므로 삭제하고 테스트도 현재 앱 경로에 맞췄다. 삭제 소스는 기준 커밋에서 Git 복원 가능하다.
- 이번에는 이미지 파일을 더 지우거나 변경하지 않았다. 선택 사항이었던 별도 썸네일 생성도 미실시했다.

### 2차 검증

- ESLint / TypeScript / production build 통과. 정적 경로 생성 399개 유지.
- 전체 52개 파일 / 1,628개 테스트 통과. 이전 48개 파일 / 1,618개 대비 새 테스트 10개를 추가했다.
- 추가 검증: 모든 모아보기의 순서·표시 필드 보존, 카드의 동일 props 재렌더 생략/변경 시 갱신, Observer 경로와 알림 누락 WebView·미지원 브라우저 fallback/150ms 제한/상한/해제, 스크롤 interval 연속 클릭/경로 변경/unmount/안정화.
- 푸들 기존 4개 테스트는 실제 사용하는 공통 이야기·준비 체크리스트와 props 기반 크기 선택/생활 카드로 전환해 계속 통과했다.
- 빌드 전후 정적 HTML 395개를 JSDOM으로 파싱해 `body`의 script/link/style 요소와 주석을 제외한 마크업 SHA-256을 비교했다. **395개 모두 동일**했다. 이 검사는 정적 본문 회귀 검증이며, CSS 렌더링·브라우저 실제 인터랙션/로딩 시간 검증은 아니다.
- 이미지 감사 재실행: 1,779개 모두 참조됨, 미사용 후보 0개. `images.unoptimized: true` 유지.
