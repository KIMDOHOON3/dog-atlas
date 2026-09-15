# 배포 저장공간과 문서 변경 빌드 생략

2026-09-15 사용자가 문서·작업 기록만 변경될 때 불필요한 Vercel 빌드를 건너뛰도록 승인했다.

- `vercel.json`의 `ignoreCommand`는 의존성 설치 전 Node 기본 모듈만 사용하는 `scripts/vercel-ignore-build.mjs`를 실행한다. 종료 코드 0은 생략, 1은 빌드 진행이다.
- Vercel이 제공하는 같은 프로젝트/브랜치의 마지막 성공 SHA(`VERCEL_GIT_PREVIOUS_SHA`)와 HEAD를 비교한다. `HEAD^`만 비교하지 않아 여러 커밋을 푸시하거나 직전 배포가 실패한 뒤 문서 커밋을 올려도 미배포 코드 변경을 포함한다.
- 변경 파일이 모두 `docs/`, 루트 `README.md`, 루트 `AGENTS.md`일 때만 생략한다. 코드·공개 이미지·모델·의존성·설정 및 알 수 없는 경로는 빌드를 진행한다. rename을 삭제/추가로 비교하므로 코드를 문서 폴더로 옮긴 경우도 감지한다.
- 첫 배포, 이전 SHA 누락/유효하지 않음, shallow history 부족, Git 오류/시간 초과는 빌드를 진행한다. 같은 SHA 재배포와 빈 파일 차이도 빌드해 환경변수·설정 변경을 적용할 수 있게 한다.
- 생략된 배포 항목 자체는 Vercel에 남을 수 있다. 새 빌드 산출물 누적을 줄이는 조치이며 기존 저장 사용량을 삭제하는 조치는 아니다.

## 확인 범위

실제 임시 Git 저장소에서 연속 문서 커밋, 코드 뒤 문서 커밋, 이미지·설정 변경, 코드의 문서 폴더 이동, 최초/누락 SHA 및 같은 SHA 재배포를 검증했다. 전체 61파일·1,698테스트와 lint/typecheck/build 통과. Vercel 적용 및 후속 문서 변경의 생략 결과는 배포 후 확인한다.

## 현재 저장공간 조사

사용자 화면의 팀 Usage는 Deployment Storage 133.8GB / 10GB, Functions Storage 약 539MB / 10GB였다. 프로젝트별 사용량은 관리 화면 로그인 대기 때문에 확인하지 못했다. 이를 dog-atlas 단독 사용량으로 단정하지 않는다. 공개 장소 페이지는 HTTP 200과 실제 목록을 확인했다.

로컬 Git 추적 파일 468.72MiB, `public` 454.85MiB(대부분 이미지), 운동장 GLB 1.09MiB. 읽기 전용 이미지 참조 검사에서 1,883개 중 1,877개가 참조되고 미참조 후보 6개는 약 40KB였다. 로컬 파일 크기와 Vercel 기간 사용량은 다른 지표다. 오래된 배포 삭제·보관 정책 변경·이미지 품질 변경은 아직 수행하지 않았다.

## 근거

- [Vercel ignoreCommand](https://vercel.com/docs/project-configuration/vercel-json#ignorecommand)
- [Vercel 시스템 환경변수](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_git_previous_sha)
- [Deployment Storage 측정](https://vercel.com/docs/deployment-storage)
- [보관 정책과 최적화](https://vercel.com/docs/deployment-storage/optimize)
