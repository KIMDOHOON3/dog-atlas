# 300종 확장 제작 초안 배치 07 이미지·근거 기록

> 제작일: 2026-08-31
> 범위: 상세 261~270번째 10종
> 판정: `production-draft` — 제작 게이트를 통과한 초안이며 편집·수의학·행동학·컨포메이션 전문가 검수 완료를 뜻하지 않는다.

## 공식 근거와 크기 표기

| 견종 | 공식 원문 | 화면 크기 표기 |
| --- | --- | --- |
| 라지 뮌스터랜더 | [FCI No. 118](https://www.fci.be/Nomenclature/Standards/118g07-en.pdf) | 암컷 58~63cm, 수컷 60~65cm, 각 +2cm 허용, 약 30kg |
| 아이리시 레드 앤 화이트 세터 | [FCI No. 330](https://www.fci.be/Nomenclature/Standards/330g07-en.pdf) | 암컷 57~61cm, 수컷 62~66cm, 몸무게 고정 기준 없음 |
| 헝가리안 와이어헤어드 비즐라 | [FCI No. 239](https://www.fci.be/Nomenclature/Standards/239g07-en.pdf) | 암컷 54~60cm, 수컷 58~64cm, 몸무게 고정 기준 없음 |
| 피카르디 셰퍼드 | [FCI No. 176](https://www.fci.be/Nomenclature/Standards/176g01-en.pdf) | 암컷 55~60cm, 수컷 60~65cm, 각 ±1cm 허용, 몸무게 고정 기준 없음 |
| 푸미 | [FCI No. 56](https://www.fci.be/Nomenclature/Standards/056g01-en.pdf) | 암컷 38~44cm·8~13kg, 수컷 41~47cm·10~15kg |
| 피레니안 셰퍼드 | [FCI No. 141](https://www.fci.be/Nomenclature/Standards/141g01-en.pdf) | 암컷 40~46cm, 수컷 42~48cm, 각 ±2cm 허용, 몸무게 고정 기준 없음 |
| 랭커셔 힐러 | [FCI No. 360](https://www.fci.be/Nomenclature/Standards/360g01-en.pdf) | 암컷 이상적 25cm, 수컷 이상적 30cm, 몸무게 고정 기준 없음 |
| 사르로스 울프도그 | [FCI No. 311](https://www.fci.be/Nomenclature/Standards/311g01-en.pdf) | 암컷 60~70cm, 수컷 65~75cm, 몸무게 고정 기준 없음 |
| 아이디 | [FCI No. 247](https://www.fci.be/Nomenclature/Standards/247g02-en.pdf) | 52~62cm, 몸무게 고정 기준 없음 |
| 블랙 러시안 테리어 | [FCI No. 327](https://www.fci.be/Nomenclature/Standards/327g02-en.pdf) | 암컷 68~72cm·45~50kg, 수컷 72~76cm·50~60kg |

표준에 없는 몸무게는 임의 범위로 채우지 않았다. 화면에는 출처 약칭을 반복하지 않고 `성별 기준 보기` 또는 `공식 기준 보기`로 표시하며, 원문 링크는 데이터 출처에 보존했다.

## 장면 설계와 파일

기존 `/illustrations/v3/{slug}-history.webp` 한 장을 역사 장면으로 재사용하고, 아래 네 장씩을 `/illustrations/v4/{slug}-feature-{id}.webp`로 추가했다.

| 견종 | 오늘의 활동 | 활동 뒤 휴식 | 생활 안전 | 피모·신체 관리 |
| --- | --- | --- | --- | --- |
| 라지 뮌스터랜더 | `field-water-choice-retrieve` | `retrieve-to-dry-mat` | `munster-water-exit` | `munster-feathering-check` |
| 아이리시 레드 앤 화이트 세터 | `red-island-wide-search` | `search-to-side-bed` | `setter-field-distance` | `setter-feathering-burr` |
| 헝가리안 와이어헤어드 비즐라 | `dry-water-one-choice` | `water-to-towel-mat` | `vizsla-water-ramp` | `vizsla-beard-seed` |
| 피카르디 셰퍼드 | `wide-herding-return` | `balls-to-backed-bed` | `picard-visitor-buffer` | `picard-harsh-coat` |
| 푸미 | `short-s-herding-balls` | `sound-to-screen-bed` | `pumi-motion-u-turn` | `pumi-curl-care` |
| 피레니안 셰퍼드 | `mountain-wide-to-narrow` | `markers-to-choice-bed` | `pyrenean-traction-lane` | `pyrenean-coat-separate` |
| 랭커셔 힐러 | `low-ball-heel-arc` | `arc-to-foot-safe-bed` | `heeler-low-ramp-door` | `heeler-short-coat` |
| 사르로스 울프도그 | `choice-forest-return` | `choice-to-private-bed` | `saarloos-double-gate` | `saarloos-seasonal-undercoat` |
| 아이디 | `three-boundary-center` | `boundary-to-shade-bed` | `aidi-visitor-airlock` | `aidi-mane-burr` |
| 블랙 러시안 테리어 | `two-station-check-in` | `stations-to-giant-mat` | `black-russian-wide-airlock` | `black-russian-line-brush` |

## 생성 프롬프트와 스타일 교정

내장 이미지 생성 기능을 사용했다. 첫 시안은 무광 3D 점토·디오라마 표현으로 생성됐지만, 상세 페이지의 기준인 푸들 이미지와 시각 언어가 달라 폐기했다. 프로젝트에는 교정한 수채화 버전만 저장했다.

교정 프롬프트의 공통 기준은 다음과 같다.

- `/illustrations/v4/poodle-feature-learning-retrieval.webp`의 따뜻한 손그림 수채화·색연필 질감과 종이결을 따른다.
- 크림색과 연한 세이지 배경, 부드러운 자연광, 현실적인 생활 장면, 자연스러운 성견 전신을 사용한다.
- 각 견종의 `/illustrations/v3/{slug}-history.webp`를 외형 참조로 함께 사용한다.
- 4:3 가로, 한 장 한 개체를 유지하고 텍스트·로고·콜라주·삽입·과도한 크롭을 금지한다.
- CGI, 3D 렌더, 점토 모형, 겹종이 디오라마, 플라스틱 광택을 명시적으로 제외한다.

생성 PNG 원본 40개는 `/Users/df_m56/.codex/generated_images/01a03700-5ebf-7c23-9048-41e87219a757`에 보존했다. 화면 자산은 모두 1200×900, 품질 84 WebP로 변환해 `/public/illustrations/v4`에 저장했다. 견종 외형, 전신 노출, 장면·카피 일치, 푸들풍 질감과 4:3 크롭을 접촉표로 확인했다.
