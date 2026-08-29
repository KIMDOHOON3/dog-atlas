# 200종 확장 배치 01 이미지 제작 기록

> 제작일: 2026-08-29~30  
> 목표: 검수 완료 114종에서 200종까지 이어지는 첫 10종 제작 묶음  
> 완료: 10종, 생활 장면 40장

## 공통 제작 기준

- 4:3 가로 구도와 1200×900 WebP를 사용한다.
- 성견 전신, 보호자의 행동, 거리·문·울타리·수납 같은 환경 단서를 한 화면에 둔다.
- 확대 컷, 글자, 로고, 워터마크, 견종과 무관한 장식 장면은 제외한다.
- 과거 역할을 오늘 그대로 재현하지 않고 안전한 대체 과제와 생활 책임으로 연결한다.
- 같은 견종의 네 장은 외형과 색을 유지하되 서로 다른 행동과 공간을 보여준다.

생성 원본은 내장 이미지 생성 도구를 사용했고, 채택본은 공식 `libwebp`의 `cwebp`로 변환했다.

## 견종별 채택 장면

| 견종 | 현재의 경향 | 생활의 현실 | 핵심 생활 1 | 핵심 생활 2 |
| --- | --- | --- | --- | --- |
| 풀리 | `puli-feature-curve-return.webp` — 표식 사이 곡선 이동 뒤 돌아오기 | `puli-feature-work-to-rest.webp` — 도구 수납 뒤 매트 휴식 | `puli-feature-visitor-buffer.webp` — 현관 이중 경계 | `puli-feature-cord-care.webp` — 코드 분리와 완전 건조 |
| 화이트 스위스 셰퍼드 독 | `white-swiss-shepherd-dog-feature-cooperative-route.webp` — 사람과 경로 협력 | `white-swiss-shepherd-dog-feature-task-to-rest.webp` — 과제 도구 정리와 휴식 | `white-swiss-shepherd-dog-feature-pedestrian-distance.webp` — 보행자 거리 | `white-swiss-shepherd-dog-feature-double-coat-care.webp` — 흰 이중모 관리 |
| 웰시 코기 카디건 | `welsh-corgi-cardigan-feature-cart-reorientation.webp` — 손수레 옆 방향 바꾸기 | `welsh-corgi-cardigan-feature-cart-to-rest.webp` — 손수레 수납 뒤 낮은 휴식 | `welsh-corgi-cardigan-feature-cyclist-distance.webp` — 자전거와 분리된 길 | `welsh-corgi-cardigan-feature-low-ramp.webp` — 낮고 긴 몸의 완만한 경사로 |
| 샤페이 | `shar-pei-feature-scent-choice.webp` — 냄새 상자 선택 | `shar-pei-feature-search-to-rest.webp` — 상자 수납 뒤 휴식 | `shar-pei-feature-visitor-buffer.webp` — 보호자와 닫힌 안전문 안쪽 대기 | `shar-pei-feature-fold-ear-care.webp` — 피부 접힘과 작은 귀 확인 |
| 불독 | `bulldog-feature-scent-choice.webp` — 그늘의 짧은 냄새 선택 | `bulldog-feature-activity-to-rest.webp` — 물과 서늘한 매트에서 회복 | `bulldog-feature-shaded-route.webp` — 긴 햇볕 길 대신 짧은 그늘 길 | `bulldog-feature-fold-paw-care.webp` — 얼굴 접힘과 발 확인 |
| 아메리칸 아키타 | `american-akita-feature-perimeter-check-in.webp` — 마당 확인 뒤 사람에게 돌아오기 | `american-akita-feature-task-to-rest.webp` — 큰 장비 수납과 넓은 휴식 자리 | `american-akita-feature-visitor-boundary.webp` — 큰 몸에 맞는 방문객 경계 | `american-akita-feature-undercoat-care.webp` — 대량 속털 관리 |
| 핀니시 스피츠 | `finnish-spitz-feature-tree-target-return.webp` — 나무의 인공 새 표적 찾기 | `finnish-spitz-feature-target-to-rest.webp` — 표적과 긴 줄 수납 | `finnish-spitz-feature-window-return.webp` — 창밖 확인 뒤 매트 복귀 | `finnish-spitz-feature-coat-paw-care.webp` — 붉은 이중모와 숲길 뒤 발 관리 |
| 카렐리안 베어 도그 | `karelian-bear-dog-feature-bear-target-return.webp` — 이중 울타리 너머 인공 곰 표적 | `karelian-bear-dog-feature-target-to-rest.webp` — 표적과 긴 줄 잠금 수납 | `karelian-bear-dog-feature-wildlife-turn.webp` — 먼 야생동물을 보고 옆길 회피 | `karelian-bear-dog-feature-coat-paw-check.webp` — 숲길 이물질 확인 |
| 라사압소 | `lhasa-apso-feature-door-return.webp` — 현관 소리 확인 뒤 자리 복귀 | `lhasa-apso-feature-alert-to-rest.webp` — 알림 도구를 서랍에 넣고 휴식 | `lhasa-apso-feature-visitor-distance.webp` — 방문객과 닫힌 안전문 | `lhasa-apso-feature-section-grooming.webp` — 긴 털을 얇게 나눈 빗질 |
| 티베탄 스패니얼 | `tibetan-spaniel-feature-lookout-return.webp` — 안전한 낮은 관찰대와 경사로 | `tibetan-spaniel-feature-lookout-to-rest.webp` — 커튼과 관찰대를 닫고 휴식 | `tibetan-spaniel-feature-balcony-lock.webp` — 닫힌 베란다 문과 보조 잠금 | `tibetan-spaniel-feature-feathering-care.webp` — 귀 뒤·가슴 장식털과 발 관리 |

## 재생성·폐기 판정

- 풀리 방문객 첫 시안은 개가 실내 안전문 바깥의 현관 완충 공간에 놓여 폐기했다. 개와 보호자가 모두 안쪽에 있고 닫힌 외부 문이 두 번째 경계를 이루는 장면을 채택했다.
- 샤페이 방문객 첫 시안은 접이식 칸막이가 실제 경계로 읽히지 않고 보호자 위치도 모호해 폐기했다. 닫힌 안전문 안쪽에 개와 보호자가 함께 있는 장면으로 다시 만들었다.
- 카렐리안 베어 도그의 첫 종료 시안은 보호자가 두 명처럼 중복되어 폐기했다. 한 보호자가 인공 표적과 긴 줄을 상자에 넣고 개가 매트에서 쉬는 단일 장면으로 교체했다.

## 출처 판단

- 역할·형성 배경과 체고는 각 견종의 FCI 견종 페이지와 표준을 우선했다.
- 몸무게와 생활 관리의 보조 범위는 AKC 견종 페이지를 대조했다.
- 아메리칸 아키타는 FCI 344번의 미국 발전 타입을 사용해 일본 아키타와 구분했고, 카렐리안 베어 도그는 FCI 48번의 성별 크기 기준으로 기존 합산 수치를 바로잡았다.
- 견종 배경은 행동을 보장하는 문장으로 쓰지 않았고, 수의학·행동학 전문가 검수 완료로 표시하지 않았다.

## 직접 확인한 대표 출처

- FCI, [PULI (55)](https://www.fci.be/en/nomenclature/PULI-55.html)
- FCI, [AMERICAN AKITA (344)](https://www.fci.be/en/nomenclature/AMERICAN-AKITA-344.html)
- FCI, [KARELIAN BEAR DOG (48)](https://www.fci.be/en/nomenclature/KARELIAN-BEAR-DOG-48.html)
- AKC, [Akita](https://www.akc.org/dog-breeds/akita/)
- AKC, [Tibetan Spaniel](https://www.akc.org/dog-breeds/tibetan-spaniel/)
