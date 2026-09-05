# 초대형견 카드 8종 확장 · 2026-09-05

사용자 요청으로 기존 3장 뒤에 아이리시 울프하운드, 티베탄 마스티프, 캉갈 셰퍼드 도그, 코카시안 셰퍼드, 몽골 방카르(04–08)를 추가한다. 기존 상세/발견 이미지와 원고는 바꾸지 않는다.

## 정보 근거

수치는 성견 참고 정보이며 개체의 성장/수명 보장이나 수의사 검토 원고가 아니다. 일반 소개의 수명 범위는 실제 집단의 통계 평균으로 표현하지 않는다.

- 아이리시 울프하운드: [IWCA FAQ](https://iwclubofamerica.org/wolfhound-faq)의 보통 암컷 32–34in/115–140lb, 수컷 34–35in/140–180lb를 합쳐 81–89cm/52–82kg로 반올림했다. 클럽의 평균 수명 안내는 6–8년이다. 품종표준 최솟값과 혼동하지 않는다. [AKC 견종 소개](https://www.akc.org/dog-breeds/irish-wolfhound/)의 늑대/큰 사냥감 추적 역할을 짧게 요약했다.
- 티베탄 마스티프: [FCI 230](https://www.fci.be/Nomenclature/Standards/230g02-en.pdf)의 암컷 최소 61cm/수컷 최소 66cm를 성별 순서와 최소 라벨로 표시한다. [Purina UK](https://www.purina.co.uk/find-a-pet/dog-breeds/tibetan-mastiff)의 36–72kg/12–15년 및 티베트 가축·수도원·집 경비 역할을 참고했다. 출신은 티베트 고원으로 표시한다.
- 캉갈: [FCI 331](https://www.fci.be/nomenclature/Standards/331g02-en.pdf)의 암컷 65–73cm/40–50kg, 수컷 72–78cm/48–60kg를 합쳐 65–78cm/40–60kg로 표시했다. 표준의 높이 ±2cm 허용은 카드 요약 범위에 더하지 않았다. [Royal Kennel Club](https://www.royalkennelclub.com/search/breeds-a-to-z/breeds/pastoral/turkish-kangal-dog/)의 수명 소개 “Over 10 years”는 10+년으로 표시하며 평균이나 최저 수명 보장이 아니다. 튀르키예 가축 수호 역할을 요약했다.
- 코카시안 셰퍼드: [FCI 328](https://www.fci.be/Nomenclature/Standards/328g02-en.pdf)의 권장 높이 암컷 67–70cm/수컷 72–75cm를 67–75cm, 표준 권장 라벨로 표시했다. [Purina US](https://www.purina.com/dogs/dog-breeds/caucasian-shepherd-dog)의 99–170lb는 45–77kg, 일반 수명 소개는 10–12년이다. 출신은 코카서스 지역으로 표시해 표준 후원 국가와 역사적 지역을 혼동하지 않는다. 집과 가축의 경비 역할을 요약했다.
- 몽골 방카르: [Mongolian Bankhar Dog Project press kit](https://www.bankhar.org/press-kit/)는 고정 품종표준보다 토착 개체군(landrace)으로 설명한다. 안내된 수컷 평균 30in/120lb, 암컷 평균 100lb를 수컷 높이 참고 76cm, 암컷/수컷 무게 참고 45/54kg로 표시한다. 17세까지 산다는 서술은 대표 수명 통계로 볼 수 없어 수명은 null/자료 부족으로 둔다. 유목민의 양·염소 무리 수호 역할을 요약했다.

## 그림과 구현

내장 image_gen의 참조 이미지 편집 방식으로 앞뒷면 10장을 생성했다. 앞면은 지역 풍경과 성견 전신, 뒷면은 같은 외형의 개와 어른이 같은 땅에 서 있는 수채화다. 장면/의상/건축은 역사 사진의 재현이나 정확한 측정 도식이 아닌 설명용 창작이다. 참조는 기존 v2 견종 카드와 승인된 피레니즈 그림이다.

전체 프롬프트, 원본/최종 경로, 크기와 파일 용량은 [자산 manifest](giant-expansion-art-2026-09-05.json)에 보관한다. 최종 WebP는 public/illustrations/card-studies/ 아래에 저장했다. 앞면 1254², 뒷면 1060×1484; 손실 WebP 품질 92. 기존 파일은 보존한다.

한 WebGL 캔버스와 기존 320px/30Hz 포일 한도, 앞뒤 전환과 수채화 이동을 유지한다. 처음부터 16장 전체를 불러오는 대신 현재/인접 카드만 decode한다. 모바일 번호줄은 좌우 버튼 사이에서 가로 스크롤하며 선택 번호가 보이도록 따라간다. reduced motion에서는 즉시 스크롤한다.

## 검증

구현 후 검증 결과는 project-status.md에 기록한다. 실제 모바일 기기의 GPU 성능과 사용자 그림 평가는 별도 확인이 필요하다.
