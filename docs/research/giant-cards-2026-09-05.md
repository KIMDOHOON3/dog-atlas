# 초대형견 카드 3종

사용자는 국내에 익숙한 25종 후보/15종 우선 제작 방향을 승인하고, 이번 제작은 그레이트 피레니즈·세인트 버나드·그레이트 데인 3종으로 한정했다. 다른 크기 분류는 콘텐츠 제작 후 추가한다. 전체 상세 개편은 이번 범위 밖이다.

## 그림

후속 사용자 정정: 견종 발견의 `/illustrations/v2/great-dane-card.webp`는 배경 전체 교체가 아닌 강아지 외형 참고다. 내장 imagegen으로 숲·저택 배경을 살린 앞뒷면 v2를 새로 그렸으며 곧게 선 귀, 긴 다리, 검은 털과 흰 가슴 무늬를 맞췄다. 카드 안 상단 브랜드/에디션 문구는 공통 템플릿에서 제거했다. [v2 전체 프롬프트·참고 이미지·원본 경로](great-dane-v2-art-prompts-2026-09-05.json). 아래 v1 데인 자산은 보존하며 현재 화면은 v2를 사용한다.

| 현재 데인 자산 (public 기준) | 크기 | 바이트 |
|---|---|---|
| illustrations/card-studies/great-dane-woodland-v2.webp | 1254×1254 | 607704 |
| illustrations/card-studies/great-dane-human-back-v2.webp | 1060×1484 | 407644 |

v2 반영 후 lint·typecheck·57파일/1,657테스트·403페이지 빌드 통과. 3000/3001에 반영하고 데스크톱과 390px 모바일에서 앞뒷면 전체 배치 및 전환을 확인했다. 두 이미지 로딩 완료, 캔버스 1개, 가로 넘침 없음, 브라우저 오류/경고 없음. 그림 품질에 대한 사용자 평가는 남아 있다.

내장 imagegen으로 새 4장을 생성했다. 기존 v2 견종 카드와 v3 역사 그림을 외형/환경 참고, 승인된 피레니즈 앞뒷면을 질감/구도 참고로 사용했다. 원본은 보존하고 크롭/리사이즈 없이 WebP quality 92로 형식 변환했다. [전체 프롬프트와 원본 경로](giant-card-art-prompts-2026-09-05.json).

| 프로젝트 경로 (public 기준) | 크기 | 바이트 |
|---|---|---|
| illustrations/card-studies/saint-bernard-hospice-v1.webp | 1254×1254 | 568544 |
| illustrations/card-studies/saint-bernard-human-back-v1.webp | 1060×1484 | 334450 |
| illustrations/card-studies/great-dane-woodland-v1.webp | 1254×1254 | 602532 |
| illustrations/card-studies/great-dane-human-back-v1.webp | 1060×1484 | 393330 |

피레니즈 그림은 유지했다. 세인트 버나드는 눈길과 여행자 쉼터, 데인은 독일 숲과 저택이 보인다. 특정 역사 건물의 정확한 재현은 아니다. 세인트 버나드 목에 술통을 넣지 않았다. 데인은 v1의 늘어진 귀에서 사용자 외형 참고에 따라 v2의 곧게 선 귀로 변경했다. 뒷면 인물/견종은 크기 비교 예시이며 실측 도식 또는 실제 사진으로 제시하지 않는다.

## 정보 근거 (2026-09-05 확인)

- 세인트 버나드 키 65–90cm: [FCI 61](https://dev.fci.be/Nomenclature/Standards/061g02-en.pdf)의 암컷 65–80, 수컷 70–90cm를 합친 범위. 균형과 움직임이 적절하면 상한 초과가 허용되는 표준으로 모든 개체의 한계는 아니다.
- 그레이트 데인 키 72–90cm: [FCI 235, 2024 독일어판](https://fci.be/Nomenclature/Standards/235g02-de.pdf)의 암컷 72–84, 수컷 80–90cm를 합친 범위.
- 몸무게: [AKC weight chart](https://www.akc.org/expert-advice/nutrition/breed-weight-chart/) 세인트 버나드 120–180lb → 54.43–81.65kg → 약 54–82kg; 데인 110–175lb → 49.90–79.38kg → 약 50–79kg.
- 세인트 버나드 수명 8–10년: [VCA](https://vcahospitals.com/village-park-ca/know-your-pet/dog-breeds/saint-bernard), [Hill's](https://www.hillspet.se/dog-care/dog-breeds/saint-bernard).
- 세인트 버나드 알프스 구조 역사: [AKC](https://www.akc.org/expert-advice/dog-breeds/saint-bernard-history-rescue-dogs-swiss/).
- 데인 독일 기원/멧돼지 사냥 및 보통 수명 7–10년: [AKC](https://www.akc.org/expert-advice/lifestyle/fun-facts-great-danes/). 경비 역할은 [FCI](https://dev.fci.be/Nomenclature/Standards/235g02-en.pdf), 귀족의 숲/저택과 사냥·경비 배경은 [Kinship](https://www.kinship.co.uk/dog-lifestyle/great-danes-working-group-origins).
- 피레니즈 근거는 [기존 카드 기록](foil-card-back-2026-09-05.md)에 유지.

정보는 편집 초안이며 전문가 검수를 의미하지 않는다. 수명은 개체별 예측이나 통계적 평균으로 표현하지 않고 보통 범위로 표기한다. 출처를 펼치는 UI는 사용자 삭제 요청에 따라 복원하지 않았다.

## 구현과 검증

Zod로 검증한 로컬 3종 데이터, 공통 앞뒷면 템플릿, 프랑스/스위스/독일 국기. 좌우 버튼과 01–03 직접 선택으로 이동한다. 카드 드래그/방향키는 빛 조작에 유지해 이동과 충돌하지 않게 한다. 자동 넘김은 없다.

견종 이동 시 같은 WebGL 캔버스/컨텍스트/텍스처를 재사용하고 진행 중 뒤집기/시연을 취소하며 새 앞면으로 돌아간다. 홀로그램 켜짐/강도는 유지한다. 데인은 눈 결정 각인을 낮추고 금빛/녹색 미세 결로 변경하는 uniform을 사용한다. 60/30Hz, 포일 너비 320px 상한, 화면 밖/idle 중지와 reduced motion을 유지한다.

- lint·typecheck 통과. 57파일/1,657테스트 통과. 새 회귀 테스트는 뒤집기 도중 견종 이동, 앞면 초기화, 데이터/역사 교체, 끝 경계, 강도 유지, 숲 uniform 및 단일 렌더러를 확인한다.
- 프로덕션 빌드 403페이지 통과, 3000/3001에 반영.
- 내장 브라우저 데스크톱/390px에서 두 새 견종 앞뒷면, 국기·수치·역사 배치, 이전/다음/직접 선택, 빛 시연을 확인했다. 새 이미지 로딩 완료, 캔버스 1개/WebGL 정상, 가로 넘침 없음. 모바일 실기기 GPU 성능과 사용자의 그림 평가는 별도 확인이 필요하다.
