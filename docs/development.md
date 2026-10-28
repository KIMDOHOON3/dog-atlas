# Dog Atlas 개발 안내

프로젝트 목적과 주요 경험은 [프로젝트 소개](../README.md), 최신 작업 상태는 [프로젝트 상태](project-status.md)를 먼저 확인하세요.

## 로컬 실행

Node.js 24 LTS와 pnpm 11을 사용합니다. 의존성은 `pnpm-lock.yaml`을 기준으로 관리합니다.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다. 장소 API를 사용하려면 `.env.example`을 `.env.local`로 복사하고 본인의 서비스 키를 입력하세요. 키 없이도 견종 카드·검색·상세·준비 가이드는 사용할 수 있습니다.

| 환경변수 | 용도 |
| --- | --- |
| `DATA_PET_TOUR_SERVICE_KEY` | 한국관광공사 반려동물 동반여행 API 서버 키. 브라우저에 공개하지 않습니다. |
| `NEXT_PUBLIC_SITE_URL` | 배포 대표 주소의 origin. canonical·공유 URL·sitemap·robots에 사용합니다. |

대표 주소를 생략하면 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`, 그다음 `http://localhost:3000`을 사용합니다. 대표 주소 변경 후에는 다시 빌드해야 합니다. 환경변수 파일과 키는 커밋하지 않습니다.

## 주요 화면

| 경로 | 기능 |
| --- | --- |
| `/` | 네 크기 그룹의 양면 수채화 카드 49종, WebGL 카드 전환, 장난감을 던질 수 있는 3D 운동장 |
| `/discover` | 전체 376종 검색·필터·발견 |
| `/breeds/[slug]` | 견종 상세. 완성된 표준 상세와 제작 초안을 구분합니다. |
| `/beginner-guide?breed=...` | 견종 상세에서 연결하는 맞이 준비 가이드 |
| `/places` | 사진 없는 공공데이터 장소 목록, 지역·이름·종류·내 주변 검색 |
| `/places/[id]` | 동반 조건·시설·방문 정보, 전화·주소 복사·카카오맵 길찾기 |

주변 검색은 사용자가 실행할 때만 위치 권한을 요청합니다. 표시 거리는 직선거리이며 이동시간이나 실시간 입장 가능 여부를 보장하지 않습니다. 자세한 데이터 범위는 [장소 기능 문서](pet-places.md)를 확인하세요.

## 코드 구조

```text
src/
  app/           Next.js 라우트·레이아웃·API
  features/      cards · discovery · breed-detail · guide · places · yard
  components/    여러 기능에서 사용하는 공통 UI
  hooks/         공통 React 훅
  lib/           공통 유틸리티, breeds/ 견종 도메인 로직
  content/       견종 원고·데이터·Zod 스키마
public/          서비스에서 불러오는 이미지·3D 자산
design/          자산 제작 원본·스크립트·프롬프트
scripts/         자산 감사·검색 벤치마크·배포 빌드 판단
docs/            제품·디자인·출처·작업 상태
```

기능의 컴포넌트·스타일·로직·테스트를 같은 폴더에 둡니다. 경로와 의존성 규칙은 [코드 구조 안내](code-structure.md)를 참고하세요. `tmp/`, `.next/`, `node_modules/`는 로컬 작업·빌드·의존성 폴더이며 Git에 포함하지 않습니다.

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm test --maxWorkers=2
pnpm build
pnpm audit:images
pnpm audit:rights
pnpm audit:editorial
pnpm audit
```

테스트는 Vitest·Testing Library를 사용하며 소스 옆에 배치합니다. 이미지 감사는 동적으로 선택하는 콘텐츠 이미지까지 추적합니다. 자산을 삭제하기 전에 출처 기록과 재제작 원본도 확인하세요.

보안 수정·권리 확인 범위와 미확인 항목은 [2026-10-24 점검](security-rights-review-2026-10-24.md)에 기록합니다. 자산 목록 생성은 이용 허락의 증명이 아닙니다. 운영 패키지를 바꾼 뒤에는 `pnpm licenses list --prod --json > tmp/runtime-licenses.json`과 `pnpm notices:generate`로 [오픈소스 고지](../public/THIRD_PARTY_NOTICES.txt)를 갱신하세요(`tmp` 폴더 필요). 배포 OS의 선택 의존성도 해당 환경에서 다시 확인합니다.

제작자 확인과 이미지별 제작 기록, 원고 재검토는 [권리 후속 점검](rights-followup-2026-10-24.md)을 참고하세요. `audit:editorial`은 소스 문구의 검토 후보와 수동 검수 해시를 관리하며, 외부 원문 전체의 표절 검사나 권리 승인을 대신하지 않습니다.

프로덕션 빌드를 로컬에서 확인하려면 `pnpm build` 후 `pnpm start`를 실행합니다. 반응형 화면과 WebGL·드래그 동작은 브라우저에서도 확인합니다.

## 기술과 배포

- Next.js App Router·React·strict TypeScript, CSS Modules·CSS custom properties
- Zod로 검증하는 로컬 콘텐츠, Three.js·Cannon 기반 운동장
- 데이터베이스·인증·CMS·전역 상태 라이브러리·PWA·커뮤니티는 현재 범위에 없습니다.
- 동작 감소 설정을 존중하고 애니메이션 없이도 주요 정보에 접근할 수 있게 합니다.
- 이미지 최적화는 `next.config.ts`에서 의도적으로 비활성화했습니다. 자산 정책은 [배포 저장공간](deployment-storage.md)을 참고하세요.
- Vercel은 문서만 바뀐 커밋의 빌드를 생략합니다. 코드·이미지·설정 변경은 배포 대상입니다. 로컬 정리와 검증만 요청된 작업에서는 커밋·푸시·배포를 별도로 진행하지 않습니다.

Git Credential Manager에 계정이 여러 개 저장되어 비대화형 푸시가 실패하면 `git credential-manager github list`로 계정 이름만 확인합니다. 이 저장소의 계정은 `KIMDOHOON3`이며, `git -c credential.username=KIMDOHOON3 -c credential.interactive=false push origin main`으로 계정을 명시해 푸시할 수 있습니다. 토큰을 출력하거나 원격 URL에 넣지 않습니다.

README 개편과 추가 이미지·원고 대조 범위는 [2차 점검](rights-second-pass-2026-10-24.md)을 참고하세요.
