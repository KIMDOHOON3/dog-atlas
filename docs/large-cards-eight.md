# 대형견 첫 8종 — 2026-09-07

골든 리트리버·래브라도 리트리버·사모예드·시베리안 허스키·저먼 셰퍼드 독·도베르만·롯트와일러·달마시안. 기존 익숙한 견종 목록을 바탕으로 만든 편집 묶음이며 인기 순위는 아니다. 메인 전시 분류이고 발견/상세의 원본 크기 프로필은 변경하지 않는다.

## 그림

내장 imagegen으로 앞뒤 16장을 제작했다. 기존 발견 삽화를 외형 참고로, 새 앞면을 뒷면 참고로 사용했다. 최종 WebP 합계 3,085,848B. 파일은 `public/illustrations/card-studies/*-large-*-v1.webp`, 최종 프롬프트·원본·치수는 `design/card-large/prompts.json`에 기록한다. 첫 네 뒷면은 하단 글 여백을 확보하는 구도 수정도 수행했다.

스코틀랜드 호숫가/스코틀랜드 여성, 뉴펀들랜드 어촌/캐나다 남성, 북부 시베리아/네네츠 여성, 북동 시베리아/축치 남성, 독일 목초지/여성, 튀링겐 마을/남성, 독일 가축 시장/여성, 달마티아 시골길/크로아티아 남성. 인물은 지역 생활을 표현하는 가상의 편집 삽화이며 외모가 국적을 증명한다는 뜻은 아니다. 복식은 역사 복원 자료가 아니다. 체구 그림은 정밀 측정도가 아니다. 도베르만·롯트와일러 귀와 꼬리는 절단되지 않은 모습이다.

## 자료

AKC 서버 HTML의 height/weight/life_expectancy를 2026-09-07 확인했다. 성별 최솟값과 최댓값을 합쳐 cm/kg로 환산하고 정수로 반올림했다. 수명은 참고 범위이며 평균이나 개별견 보장이 아니다. 원문 수치는 `design/card-large/source-measurements.json`에 보관한다.

| 견종          | 높이 cm | 몸무게 kg | 수명 년 | 근거                                                       |
| ------------- | ------- | --------- | ------- | ---------------------------------------------------------- |
| 골든 리트리버 | 55–61   | 25–34     | 10–12   | [AKC](https://www.akc.org/dog-breeds/golden-retriever/)    |
| 래브라도      | 55–62   | 25–36     | 11–13   | [AKC](https://www.akc.org/dog-breeds/labrador-retriever/)  |
| 사모예드      | 48–60   | 16–29     | 12–14   | [AKC](https://www.akc.org/dog-breeds/samoyed/)             |
| 허스키        | 51–60   | 16–27     | 12–14   | [AKC](https://www.akc.org/dog-breeds/siberian-husky/)      |
| 셰퍼드        | 56–66   | 23–41     | 12–14   | [AKC](https://www.akc.org/dog-breeds/german-shepherd-dog/) |
| 도베르만      | 61–71   | 27–45     | 10–12   | [AKC](https://www.akc.org/dog-breeds/doberman-pinscher/)   |
| 롯트와일러    | 56–69   | 36–61     | 9–10    | [AKC](https://www.akc.org/dog-breeds/rottweiler/)          |
| 달마시안      | 48–61   | 20–32     | 11–13   | [AKC](https://www.akc.org/dog-breeds/dalmatian/)           |

역사는 기존 상세 원고와 출처를 짧게 정리했다. 래브라도는 [FCI 122](https://www.fci.be/Nomenclature/Standards/122g08-en.pdf)에 맞춰 캐나다 기원/영국 정립을 함께 표기한다. 허스키는 [FCI 270](https://www.fci.be/Nomenclature/Standards/270g05-en.pdf)의 미국 원산국과 시베리아 역사 배경을 구분한다. 사모예드는 [FCI 212](https://www.fci.be/Nomenclature/Standards/212g05-en.pdf), 달마시안은 [FCI 153](https://www.fci.be/Nomenclature/Standards/153g06-en.pdf)을 대조했다. 전문가 검수 완료로 표시하지 않는다.

## 구현

대형견 빈 상태를 제거하고 기존 단일 카드/포일/전환 렌더러에 연결한다. 대형견 전체 이미지를 한 번에 선로딩하지 않는다. 기존 제한된 캐시·모바일 세로 스크롤/좌우 스와이프·reduced motion을 유지한다.
