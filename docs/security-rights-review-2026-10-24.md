# 보안 수정 및 권리 점검 — 2026-10-24

> 이미지 제작자 확인·묶음 제작 기록 연결·추가 원고 36종 수정은 [후속 점검](rights-followup-2026-10-24.md)을 따른다. 아래 권리 목록 수치는 최초 점검 시점의 기록이다.

이번 범위는 로컬 변경과 검증이다. 커밋·푸시·배포 및 계정 설정 변경은 하지 않았다. 코드 정리 이전 변경도 보존했다. 이 문서는 기술·제작 기록 점검이며 모든 권리의 이용 허락이나 침해 부존재를 확정하는 문서가 아니다.

## 보안 변경

- Next 16.2.12 → 16.4.3, React/React DOM 19.3.1, eslint-config-next 16.4.3, Vitest 5.0.5와 관련 전이 의존성을 갱신했다. 도구 하위 의존성에 제한된 보안 버전 override를 추가했다. pnpm의 새 버전 대기 예외는 이번 Next 16.4.3 패키지에만 한정된다.
- 온라인 `pnpm audit` 결과: 운영 의존성 20건 → 0건, 개발 포함 전체 39건 → 0건. 이는 조회 시점에 등록된 경고 수이며 모든 경고가 이 앱에서 악용 가능했다거나 앞으로 취약점이 없다는 의미는 아니다.
- [Next Windows 원격 코드 실행 권고](https://github.com/advisories/GHSA-p293-qw3h-jr36), [Server Actions 서비스 거부 권고](https://github.com/advisories/GHSA-p3m5-59mp-jv5r)를 확인했다. 후자는 Server Actions 사용 여부에 따라 영향이 달라지며, 이 프로젝트에 해당 기능을 새로 추가하지 않았다.
- 장소 서버 모듈을 `server-only`로 제한했다. 공공데이터 요청은 고정 HTTPS 호스트만 쓰고, 키가 포함된 URL의 리다이렉트를 거부한다. 공급자 오류의 원문·URL은 사용자에게 반환하지 않는다.
- 주변 API는 JSON 본문을 최대 1,024바이트, 읽기 대기를 5초로 제한한다. Origin/Fetch Metadata, 좌표·반경·분류를 검증하고 위치 응답에는 `private, no-store`를 유지한다. 호출량 초과는 HTTP 429와 `Retry-After`로 안내한다.
- 한 프로세스에서 주변 API 30회/분·동시 4개, 캐시 미적중 공급자 요청 120회/분·동시 4개로 제한한다. 실패·잘못된 입력도 점유를 해제한다. 지역 목록/상세의 공급자 요청에도 보호가 적용된다.
- **이 제한은 모든 사용자에게 공유되는 프로세스 메모리 제한이다.** 인스턴스 증가·재시작으로 초기화되며, 서버리스 전체 호출량이나 공급자 일일 쿼터를 보장하지 않는다. 배포 계정의 WAF/분산 제한은 아직 미검증이다. Origin 검증 역시 인증이나 봇 차단을 대신하지 않는다.
- `nosniff`, 프레임 삽입 금지, referrer/권한 정책과 최소 CSP를 추가하고 `X-Powered-By`를 제거했다. CSP는 object/base/frame/form 보호 범위이며 script nonce 기반의 엄격한 XSS 정책은 아니다. 카메라·마이크는 차단하고 위치는 동일 출처에서 유지한다.
- 사용자 입력의 `constructor`/`__proto__`가 분류로 통과하지 않도록 own-property 검사를 적용했다. 공급자 필드명 표시도 같은 방식으로 보호한다. 외부 HTML은 텍스트로 표시하고 전화/카카오 링크는 검증·인코딩한다. 현재 소스에 `dangerouslySetInnerHTML`/eval 삽입은 없다.

## 비밀값 점검

현재 공개/소스 파일, Git의 도달 가능한 과거 텍스트 객체 2,778개, 로컬 빌드의 클라이언트 파일에서 현재 `.env` 비밀값과 URL 인코딩 변형, 고위험 토큰·개인키 패턴을 검사했다. 일치 항목 없음. 값 자체는 로그나 문서에 기록하지 않았다. `.env.example`만 Git 허용, 실제 `.env`는 제외한다.

이는 이미 폐기된 모든 과거 키, 임의 인코딩, Git에서 도달 불가능한 객체, 외부 로그·Vercel 계정까지 검사한 결과는 아니다. 배포된 버전에는 이번 수정이 아직 반영되지 않았다.

## 전체 권리 목록과 확인 수준

- [공개 자산 목록](audits/asset-rights-inventory.json): 이미지 1,879장과 운동장 GLB 1개, 합계 1,880개. 경로·크기·SHA-256·문서 언급을 기록했다. SHA는 동일 파일 확인용이며 창작자 증명이 아니다.
- 435개는 `design/`·`docs/`에서 경로 또는 파일명 언급을 찾았고, 1,445개는 이 방식의 개별 기록을 찾지 못했다. **언급이 있다고 이용 허락이 증명되는 것도, 없다고 무단 사용이 확정되는 것도 아니다.** 묶음 프롬프트/다른 이름으로 보관한 기록은 자동 연결하지 않는다.
- [견종 출처 목록](audits/content-rights-inventory.json): 376종 모두 출처 링크를 가진다. 7종의 과거 지적 문단은 재검토했으며 나머지는 출처 목록·구조 검사 범위다. 376종 모든 문장과 원문을 사람이 전수 대조했다는 의미는 아니다. 별도 표준 상세·가이드 원고 전체의 표현 독립성 심사도 남아 있다.
- 외부 폰트 다운로드/저장 파일 없이 시스템 글꼴을 사용한다. 운동장 [Blender 원본 기록](../design/yard-blender/README.md)은 외부 모델·텍스처 미사용을 기록하며 절차적 제작 스크립트를 보존한다. `design/bear-cub`는 오프라인 실험 원본으로 공개 자산과 구분한다.
- 이전 다운로드 강아지 모델은 현재 공개 파일에 없다. 과거 Git/다운로드 폴더의 제3자 모델을 재사용할 경우 당시 라이선스를 다시 확인해야 한다. 외형을 바꾸거나 Blender로 수정했다는 이유만으로 기존 라이선스 조건이 없어지지는 않는다. [CC BY 4.0 조건](https://creativecommons.org/licenses/by/4.0/deed.ko)은 변경 시에도 저작자표시·라이선스 링크·변경 표시를 요구한다.
- AI 제작 기록이 있는 그림도 원본 입력의 권리, 생성 당시 서비스/요금제 조건, 제3자 캐릭터·표장과의 유사성을 별도로 확인해야 한다. 현재 기록만으로 전체 이미지의 독점권 또는 상업 이용을 일괄 승인하지 않는다.

## 원고 조치

[8월 표본 감사](copyright-sample-audit-2026-08-21.md)의 7종을 현재 데이터와 대조했다. 비숑 프리제는 8월 후속 수정이 이미 반영되어 유지했다. 말티즈·시바·보더 콜리·푸들·래브라도 리트리버·사모예드의 `story.opening`/`roleToHome` 12문단을 새로 썼다. 단일 출처의 연대·인물·사건 순서를 옮기던 구성을 제거하고 최소 분류 사실과 자체 생활 관점으로 분리했다. 실제 말티즈 표준 상세의 도입 문단도 함께 정리했다. 나머지 공개 표준 상세와 푸들 전용 상세의 짧은 역할 설명은 유지했다.

분류/기원 확인: FCI [말티즈](https://www.fci.be/en/nomenclature/MALTESE-65.html), [보더 콜리](https://www.fci.be/en/nomenclature/BORDER-COLLIE-297.html), [시바](https://www.fci.be/en/nomenclature/SHIBA-257.html), [푸들](https://www.fci.be/en/nomenclature/POODLE-172.html), [래브라도](https://www.fci.be/en/nomenclature/LABRADOR-RETRIEVER-122.html), [사모예드](https://www.fci.be/en/nomenclature/SAMOYED-212.html). 원문·이미지·표준 PDF를 복제해서 배포하지 않았다. 출처 링크는 허락의 대체물이 아니다. [AKC 온라인 재게시 정책](https://www.akc.org/about/site/reproduction-policy/)도 본문 재게시 대신 링크를 요구한다.

## 장소 데이터·오픈소스

- [공공데이터포털 반려동물 동반여행 서비스](https://www.data.go.kr/data/15135102/openapi.do)는 점검일 기준 이용허락범위 제한 없음으로 표시된다. 기존 제공기관 표기와 링크를 유지한다. 이미지 필드는 서버에서 제거하며, 개별 항목의 공공누리 코드 등 원본 정보는 보존한다. 향후 사진 도입은 별도 권리 검토 대상이다. 카카오맵은 링크 연결만 사용하며 지도 타일·업체 사진을 복제하지 않는다.
- 현재 Windows에 설치된 운영 의존성 64개와 Next에 번들된 라이선스 파일을 [THIRD_PARTY_NOTICES.txt](../public/THIRD_PARTY_NOTICES.txt)에 모았다. 원래 MIT/Apache/ISC/BSD 등의 고지를 보존하며 출처 없는 자체 라이선스로 대체하지 않는다. 파일을 생략한 `@next/*`는 Next 원본 고지, client-only/server-only는 React 프로젝트 고지를 함께 제공한다.
- `caniuse-lite`의 CC BY 4.0, `@img/sharp-win32-x64`의 Apache-2.0 및 LGPL-3.0-or-later도 포함된다. 이를 전부 MIT로 간주하면 안 된다. Sharp는 서버 의존성이고 이미지 최적화는 비활성 상태다. 네이티브 바이너리를 따로 재배포하면 LGPL의 해당 소스·수정/재링크 조건 등을 추가 검토해야 한다.
- 이 고지는 현재 설치 플랫폼 기준이다. Linux 등 배포 플랫폼 설치 후 notices를 다시 생성해 해당 선택 의존성을 포함해야 한다. 미설치 모든 OS 바이너리나 모든 개발 도구를 최종 사용자에게 배포한다고 가정하지 않았다.
- 개발 포함 설치 패키지 415개의 라이선스 식별자도 점검했다. 미확인 식별자는 없으며 개발 의존성의 `axe-core`, `lightningcss`, `lightningcss-win32-x64-msvc`는 MPL-2.0, `argparse`는 Python-2.0이다. 사용 도구를 별도로 배포하거나 수정하면 해당 조건을 다시 확인한다. 세부 로컬 결과는 `tmp/all-licenses.json`에 보관한다.

## 재실행

```powershell
pnpm audit --json
pnpm audit --prod --json
pnpm licenses list --prod --json > tmp/runtime-licenses.json
pnpm notices:generate
pnpm audit:rights
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`audit:rights`는 목록을 갱신할 뿐 이용 허락을 승인하거나 자산을 삭제하지 않는다. 패키지를 변경하면 고지도 다시 생성한다. `tmp/security-*`는 로컬 검증 로그이며 비밀값 없이 결과만 기록한다.

## 남은 확인

배포 플랫폼의 보안 설정·실기기 iOS, 개별 자산 제작/권리 증빙 보완, 나머지 원고의 원문 표현 대조가 남아 있다. 이를 전체 무결성 보증으로 해석하지 않는다. 로컬 검증 최종 결과는 프로젝트 상태 문서에 기록한다.

## 완료한 로컬 검증

- lint·typecheck·65개 테스트 파일/1,717개 테스트·프로덕션 387페이지 빌드 통과. peer 의존성 충돌 없음.
- 실제 HTTP에서 보안 헤더, cross-origin/cross-site 403, 잘못된 형식 415, 초과 본문/잘못된 JSON/좌표 400, 호출량 초과 429와 Retry-After, 모든 위치 응답 no-store를 확인했다. 정상 공공데이터 주변 조회는 HTTP 200/8곳, 라이선스 고지는 HTTP 200이었다.
- Chrome 1440/390/320px에서 홈·발견·말티즈·푸들·가이드·장소 총 18화면: 가로 넘침·정의 없는 클래스·JavaScript 오류 없음. 실제 경기도 가평카페109 검색→상세→카카오 길찾기 URL, 상세 사진 0장을 확인했다.
- 운동장 GLB/Three 렌더, 공·뼈·원반·터그 네 장난감의 키보드 조작과 초기화를 PC/모바일 뷰포트에서 확인했다. 최종 콘솔 오류 없음. viewport 검사는 실기기 iOS 검사를 대체하지 않는다.
- 최신 클라이언트 파일 21개를 포함한 비밀값 재검사에서 일치 없음. 작업 파일/보고서 생성 수에 따라 현재 파일 검사 개수는 달라진다. Git 텍스트 객체 검사 수는 2,778개다.
- 최종 서버는 Next 16.4.3, `http://127.0.0.1:3000/`. Git diff 공백 오류 없음. 커밋·푸시·배포 없음.
