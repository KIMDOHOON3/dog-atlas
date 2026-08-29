# 표준 상세 확장 배치 B — 10종 이미지 제작 기록

## 범위와 공통 기준

- 대상: 말리노이즈, 테르뷰런, 코몬도르, 보어보엘, 프레사 카나리오, 삽살개, 경주개 동경이, 무디, 볼로네즈, 쿠이커혼제
- 견종마다 기존 역사 이미지 1장과 새 생활 장면 4장을 연결한다. 한 상세 안의 다섯 이미지는 서로 다른 의미를 가져야 한다.
- 새 이미지는 Codex 내장 ImageGen으로 생성하고, 원본 PNG는 생성 폴더에 보존했다. 서비스 자산은 최대 1200×900, quality 88의 WebP로 변환했다.
- 공통 프롬프트: `4:3 landscape, warm natural-history watercolor and colored-pencil illustration on softly textured cream paper, exactly one recognizable adult dog shown full-body at medium distance, guardian action and environmental context visible, realistic canine anatomy, no close-up, crop, text, UI, arrows, diagram, logo or watermark.`
- 견종 외형은 FCI·AKC의 공식 표준을 우선 대조했다. 삽살개와 동경이는 국가유산청 자료를 직접 근거로 삼았다.
- 과거 역할은 오늘의 행동을 보장하는 설명이 아니라 생활 질문을 이해하기 위한 단서로만 사용한다.

## 장면과 파일 매핑

| 견종 | 장면 의도 | 원본 PNG | 서비스 WebP |
| --- | --- | --- | --- |
| 말리노이즈 | 들판 표지 사이에서 보호자의 짧은 방향 신호를 따라 전신을 전환 | `exec-519bf716-a1ed-4d28-8d25-f878a44293d8.png` | `/illustrations/v4/belgian-malinois-feature-direction-markers.webp` |
| 말리노이즈 | 작업 도구를 치우는 동안 매트에서 쉬며 활동을 종료 | `exec-293403db-a397-4235-8443-42086134f3b4.png` | `/illustrations/v4/belgian-malinois-feature-task-to-rest.webp` |
| 말리노이즈 | 먼 자전거 대신 보호자에게 몸을 돌리는 거리 조절 | `exec-f2201029-711b-487c-adc8-96fed8226df5.png` | `/illustrations/v4/belgian-malinois-feature-bicycle-distance.webp` |
| 말리노이즈 | 활동 뒤 발·귀·짧은 털 아래 피부를 전신 확인 | `exec-9c8ba398-40b1-4f7e-bdc2-6d1156a0acb3.png` | `/illustrations/v4/belgian-malinois-feature-body-check.webp` |
| 테르뷰런 | 목초지 표지 사이에서 보호자의 방향 신호를 따라 이동 | `exec-cf059be7-c7a7-4d92-b266-c5e4ac5bf212.png` | `/illustrations/v4/belgian-tervueren-feature-pasture-direction.webp` |
| 테르뷰런 | 리드줄을 정리하는 동안 매트에서 활동을 종료 | `exec-774fab29-abac-4e84-8c26-e83b47a025e9.png` | `/illustrations/v4/belgian-tervueren-feature-line-to-rest.webp` |
| 테르뷰런 | 안전문 너머의 방문객을 보호자 곁에서 관찰 | `exec-cb75d5bb-719a-4b47-b4c7-30705167b8f2.png` | `/illustrations/v4/belgian-tervueren-feature-door-buffer.webp` |
| 테르뷰런 | 목둘레와 꼬리의 긴 털을 구역별로 나누어 빗질 | `exec-57c55b1c-eff6-4a07-b152-7a7c8eb0c534.png` | `/illustrations/v4/belgian-tervueren-feature-long-coat-care.webp` |
| 코몬도르 | 양 떼 가장자리에서 먼 경계를 독립적으로 관찰 | `exec-9e49b8fd-20e7-47da-8d03-be40a62756e9.png` | `/illustrations/v4/komondor-feature-flock-perimeter.webp` |
| 코몬도르 | 보호자가 울타리 잠금·물·그늘을 직접 확인 | `exec-fe83f9c0-7e4d-46b1-a9c3-5936682f11bb.png` | `/illustrations/v4/komondor-feature-fence-water-check.webp` |
| 코몬도르 | 방문객과 두 경계를 사이에 둔 이중문 운영 | `exec-6478dd6c-c951-4f32-b108-7fe6cb6e51e1.png` | `/illustrations/v4/komondor-feature-double-gate.webp` |
| 코몬도르 | 빗질 대신 코드 피모를 나누고 수건과 바람으로 건조 | `exec-9fd97275-9028-401d-8f01-61cf8e65d34a.png` | `/illustrations/v4/komondor-feature-cord-drying.webp` |
| 보어보엘 | 남아프리카 농장 입구의 변화를 보호자 곁에서 관찰 | `exec-8dcf2c4f-c840-413a-8c98-ae7760d2077c.png` | `/illustrations/v4/boerboel-feature-farm-boundary.webp` |
| 보어보엘 | 넓은 출입문과 미끄럼 방지 바닥을 천천히 통과 | `exec-fe4c8ccd-014c-419f-87fb-dfeea6572e75.png` | `/illustrations/v4/boerboel-feature-wide-doorway.webp` |
| 보어보엘 | 안전문 뒤에서 방문객과 거리를 둔 첫 만남 | `exec-cb154eec-8371-421f-a526-0f35e0d6a138.png` | `/illustrations/v4/boerboel-feature-visitor-buffer.webp` |
| 보어보엘 | 그늘에서 발과 짧은 털 아래 피부를 확인 | `exec-614dfc7c-909d-437c-878a-24bc2800a75b.png` | `/illustrations/v4/boerboel-feature-paw-coat-check.webp` |
| 프레사 카나리오 | 넓은 가축 통로에서 보호자의 신호에 맞춰 이동 | `exec-b11fab4e-37c2-45c7-8a78-74b9cb5edc01.png` | `/illustrations/v4/presa-canario-feature-cattle-lane.webp` |
| 프레사 카나리오 | 큰 몸이 출입 공간에서 넓게 회전하는 동선 | `exec-8416aac0-f3b3-4e55-9faa-f162faeb1e4a.png` | `/illustrations/v4/presa-canario-feature-wide-turn.webp` |
| 프레사 카나리오 | 방문객과 안전문·거리를 두고 보호자에게 재집중 | `exec-bcbca066-d090-4a2f-9064-7e182ae70d1c.png` | `/illustrations/v4/presa-canario-feature-visitor-buffer.webp` |
| 프레사 카나리오 | 따뜻한 날 활동 뒤 발과 짧은 피모를 확인 | `exec-841ea25a-62b5-46c9-b476-fad2c321ca70.png` | `/illustrations/v4/presa-canario-feature-paw-coat-care.webp` |
| 삽살개 | 보호자와 한국 마을길을 걸으며 냄새와 변화를 확인 | `exec-35c1467a-f4f2-4c3f-a409-bbb693a3e7e7.png` | `/illustrations/v4/sapsaree-feature-village-walk.webp` |
| 삽살개 | 문밖을 확인한 뒤 보호자를 따라 매트로 이동 | `exec-689ab016-d7d9-440e-8309-ea783403fd6f.png` | `/illustrations/v4/sapsaree-feature-door-to-rest.webp` |
| 삽살개 | 산책 뒤 긴 털 속 씨앗과 잔가지를 제거 | `exec-e77b00b2-a706-444e-8da4-9cefaf50764f.png` | `/illustrations/v4/sapsaree-feature-debris-removal.webp` |
| 삽살개 | 얼굴 털을 나누어 눈과 피부 상태를 확인 | `exec-3245bd92-d922-4634-8cc3-25cbcc747d7a.png` | `/illustrations/v4/sapsaree-feature-face-coat-care.webp` |
| 동경이 | 경주 마을길에서 냄새를 맡고 보호자에게 재집중 | `exec-15cd19d1-c209-4b41-869d-5646bb60305c.png` | `/illustrations/v4/donggyeongi-feature-village-sniff.webp` |
| 동경이 | 짧은 꼬리만이 아니라 귀·얼굴·전신으로 인사 | `exec-b2f35a87-152f-431f-bf0c-28ad1195e0b4.png` | `/illustrations/v4/donggyeongi-feature-whole-body-greeting.webp` |
| 동경이 | 안전한 울타리 안에서 실제 긴 줄을 달고 호출 복귀 | `exec-6f4dc184-6cfe-4644-9456-39a2a3ef9176.png` | `/illustrations/v4/donggyeongi-feature-secure-recall.webp` |
| 동경이 | 허리·뒷다리·자연적으로 짧은 꼬리 주변을 전신 확인 | `exec-9d0673b6-104e-4265-a6b4-e99d8e76d018.png` | `/illustrations/v4/donggyeongi-feature-body-check.webp` |
| 무디 | 농장 표지 사이에서 짧은 방향 신호에 전신을 전환 | `exec-0753c3a0-461c-48b8-9af6-f00f72dc81b1.png` | `/illustrations/v4/mudi-feature-farm-direction.webp` |
| 무디 | 여러 상자 중 냄새를 선택해 찾고 보호자에게 알림 | `exec-4c4a3344-4871-4732-984b-b78d4940d2f3.png` | `/illustrations/v4/mudi-feature-scent-box-choice.webp` |
| 무디 | 문밖 소리를 알린 뒤 매트로 돌아와 휴식 | `exec-4dc5282e-1ede-4408-8117-ee7faf6b3397.png` | `/illustrations/v4/mudi-feature-alert-to-rest.webp` |
| 무디 | 물결 모양 털을 나누어 씨앗과 잔가지를 확인 | `exec-42a3e26b-bd7a-4d83-b373-236fa3a2d0d6.png` | `/illustrations/v4/mudi-feature-wavy-coat-care.webp` |
| 볼로네즈 | 실내 작은 표지 사이를 보호자와 함께 이동 | `exec-c13431a8-740c-43d5-afdf-e52d918e2dcf.png` | `/illustrations/v4/bolognese-feature-shared-markers.webp` |
| 볼로네즈 | 보호자가 가까이 있어도 자기 매트에서 독립 휴식 | `exec-12458602-dca4-4aea-a6e4-4b89271b8801.png` | `/illustrations/v4/bolognese-feature-independent-rest.webp` |
| 볼로네즈 | 높은 가구 대신 폭이 넓고 낮은 경사로 이용 | `exec-a67c30ea-6239-49a9-890e-871272bdaa7e.png` | `/illustrations/v4/bolognese-feature-step-ramp.webp` |
| 볼로네즈 | 흰 곱슬 털을 작은 구역으로 나누어 빗질 | `exec-ca5ccd23-1da1-493c-b130-aee119d3bf28.png` | `/illustrations/v4/bolognese-feature-white-coat-care.webp` |
| 쿠이커혼제 | 오리를 해치지 않고 가림막 사이를 조용히 움직여 꼬리로 호기심을 유도 | `exec-689b9328-defa-4ba5-8078-f783362d5aad.png` | `/illustrations/v4/kooikerhondje-feature-decoy-route.webp` |
| 쿠이커혼제 | 먼 물새를 본 뒤 느슨한 긴 줄 끝의 보호자에게 재집중 | `exec-e77e0596-ce10-420b-bf48-c615b3905683.png` | `/illustrations/v4/kooikerhondje-feature-waterbird-distance.webp` |
| 쿠이커혼제 | 젖은 물가 도구를 치우는 동안 매트에서 휴식 | `exec-55f2c3cf-b961-4f9c-9b90-4bb28e2e1ad4.png` | `/illustrations/v4/kooikerhondje-feature-task-to-rest.webp` |
| 쿠이커혼제 | 물가 활동 뒤 귀·다리·배·꼬리 장식털을 확인 | `exec-7c3539bf-5dc9-4fe7-9735-05f29d7a974d.png` | `/illustrations/v4/kooikerhondje-feature-feathered-coat-care.webp` |

동경이 호출 장면의 첫 생성본 `exec-538049a3-2761-41c9-9b6d-5c463079f2fa.png`은 점선 화살표가 들어가 실제 생활 삽화가 아니라 UI 도식처럼 보여 폐기했다. 원본은 재현 기록을 위해 생성 폴더에 남겼고 서비스에는 연결하지 않았다.

## 주요 직접 근거

- [FCI Belgian Shepherd Dog](https://www.fci.be/en/nomenclature/BELGIAN-SHEPHERD-DOG-15.html)
- [AKC Belgian Tervuren history](https://www.akc.org/expert-advice/dog-breeds/belgian-tervuren-history-a-true-renaissance-dog/)
- [FCI Komondor standard](https://fci.be/Nomenclature/Standards/053g01-en.pdf)
- [AKC Boerboel standard](https://images.akc.org/pdf/breeds/standards/Boerboel.pdf)
- [FCI Presa Canario standard](https://www.fci.be/Nomenclature/Standards/346g02-en.pdf)
- [국가유산청 경산의 삽살개](https://www.heritage.go.kr/heri/cul/culSelectDetail.do?VdkVgwKey=16%2C03680000%2C37&pageNo=1_1_1_1)
- [국가유산청 경주개 동경이](https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1363705400000)
- [FCI Mudi](https://www.fci.be/fr/nomenclature/MUDI-238.html)
- [FCI Bolognese](https://www.fci.be/en/nomenclature/BOLOGNESE-196.html)
- [FCI Nederlandse Kooikerhondje standard](https://www.fci.be/nomenclature/Standards/314g08-en.pdf)

## QA 판정

- 40개 서비스 이미지가 모두 서로 다른 파일명이며, 각 상세의 역사 1장과 합쳐 견종마다 다섯 장이 중복 없이 연결된다.
- 전신·사람의 행동·환경이 함께 보이며 확대 얼굴, 글자, UI, 화살표와 해로운 사냥 장면은 서비스 자산에서 제외했다.
- 쿠이커혼제의 오리 유인은 ‘추격·포획’이 아니라 가림막 사이의 조용한 이동과 꼬리 노출이라는 공식 역할로 표현했다.
- 삽살개와 동경이는 이름과 외형을 국내 공식 보존 자료에 맞추고, 동경이의 짧은 꼬리를 상해나 임의 단미로 표현하지 않았다.
