# Dog Atlas · 살아 있는 견종도감

예비 보호자가 낯선 견종을 발견하고, 역사와 원래 역할이 오늘의 행동 경향과 돌봄 현실에 어떻게 이어지는지 살펴보며, 여러 후보를 같은 기준으로 비교할 수 있게 돕는 편집형 견종도감입니다.

현재 제품·디자인·코드·콘텐츠 상태는 [`docs/project-status.md`](docs/project-status.md)를 먼저 확인하세요. 전체 문서의 역할과 읽는 순서는 [`docs/README.md`](docs/README.md)에 정리되어 있습니다.

## 개발 시작

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 검증

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

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
