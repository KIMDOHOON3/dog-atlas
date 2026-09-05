# Dog Atlas · 살아 있는 견종도감

예비 보호자가 낯선 견종을 발견하고, 역사와 원래 역할이 오늘의 행동 경향과 돌봄 현실에 어떻게 이어지는지 살펴보며, 여러 후보를 같은 기준으로 비교할 수 있게 돕는 편집형 견종도감입니다.

현재 제품·디자인·코드·콘텐츠 상태는 [`docs/project-status.md`](docs/project-status.md)를 먼저 확인하세요. 전체 문서의 역할과 읽는 순서는 [`docs/README.md`](docs/README.md)에 정리되어 있습니다.

## 개발 시작

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 현재 화면

- `/`: 초대형견 8종의 양면 수채화 카드와 홀로그램·덱 전환
- `/discover`: 전체 견종 검색·필터·발견
- `/breeds/[slug]`: 모든 기존 견종 상세
- `/beginner-guide?breed=...`: 상세에서 연결하는 맞이 준비 가이드

중단한 게임·엽서·장소 검색·카카오 지도와 이전 메인 전용 기능은 제거했습니다. 현재 제품은 공공 API 연결 없이 로컬 콘텐츠로 동작합니다.

## 자동 검사

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 배포 대표 주소와 공유 미리보기

- 배포 환경에 `NEXT_PUBLIC_SITE_URL`을 실제 대표 도메인의 origin으로 설정합니다(예시: `https://your-domain.example`). 경로·쿼리·인증 정보는 넣지 않습니다.
- 이 값은 canonical, Open Graph/Twitter 공유 URL·이미지, sitemap, robots에서 함께 사용합니다. 변경한 뒤에는 다시 빌드·배포해야 합니다.
- 미설정 시 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`을 사용하고, 둘 다 없으면 로컬 개발용 `http://localhost:3000`을 사용합니다. 다른 호스팅에 배포할 때에는 반드시 대표 주소를 지정하세요.
- 견종별 대표 이미지를 공유 이미지로 재사용합니다. 실제 SNS의 캐시 갱신·미리보기와 검색엔진 수집 여부는 배포 후 별도 확인이 필요합니다.
- Next 이미지 최적화는 의도적으로 꺼져 있습니다(`images.unoptimized: true`).

## 기술 구성

- Next.js App Router, React, strict TypeScript
- CSS Modules와 전역 CSS custom properties
- Zod로 검증하는 로컬 견종 콘텐츠
- Vitest와 Testing Library

MVP에서는 데이터베이스, 인증, CMS, 전역 상태 라이브러리, PWA, 커뮤니티 기능을 사용하지 않습니다.

## 제품 원칙

- 호기심과 따뜻함으로 초대하되 정보는 엄격하게 다룹니다.
- 견종 특성은 개체에 대한 보장이 아닌 일반적 경향으로 표현합니다.
- 특정 견종을 정답으로 추천하지 않습니다.
- 접근 가능하고 빠른 모바일 우선 경험을 지향합니다.
