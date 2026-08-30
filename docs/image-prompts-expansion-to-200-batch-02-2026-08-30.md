# 200종 확장 배치 02 — 이미지 제작 기록

## 범위와 판정 기준

- 대상: 아이슬란딕 시프도그, 더치 셰퍼드 독, 마스티프, 소프트 코티드 휘튼 테리어, 오터하운드, 라케노이즈, 체코슬로바키안 울프독, 부비에 데 플랑드르, 미니어처 아메리칸 셰퍼드, 도고 아르헨티노.
- 각 견종의 과거 역할이 오늘의 대체 활동·회복·환경 경계·피모 또는 신체 관리로 이어지도록 서로 다른 생활 장면 4장을 만들었다.
- Codex 내장 ImageGen으로 장면마다 별도 생성했고, 전신 외형·사람의 행동·공간 경계·안전성을 육안 확인한 뒤 1200×900 quality 84 WebP로 변환했다.
- 이미지 속 행동은 견종의 경향을 설명하는 편집 장면이며, 개별 개의 행동을 보장하거나 수의학·행동학 검수를 받았다는 뜻이 아니다.

## 원본과 서비스 자산

| 견종 | 원본 PNG 4장 | 서비스 WebP 접두어와 장면 |
| --- | --- | --- |
| 아이슬란딕 시프도그 | `088fb442`, `52448873`, `cee22372`, `e8573f43` | `icelandic-sheepdog-feature-`: `marker-return`, `route-to-rest`, `door-alert-return`, `weather-coat-care` |
| 더치 셰퍼드 독 | `c530e1ae`, `72ae32e7`, `97b74218`, `9dfbbcba` | `dutch-shepherd-dog-feature-`: `boundary-switch`, `boundary-to-rest`, `cyclist-side-path`, `coat-type-care` |
| 마스티프 | `3341fda3`, `d664224d`, `1d20be36`, `f6ccad6d` | `mastiff-feature-`: `doorway-mat`, `wide-home-route`, `visitor-double-boundary`, `vehicle-ramp` |
| 소프트 코티드 휘튼 테리어 | `d1d5fd13`, `91f7c4f8`, `9971e057`, `5ef2f0c3` | `soft-coated-wheaten-terrier-feature-`: `lidded-scent-box`, `search-to-rest`, `visitor-four-paws`, `soft-coat-combing` |
| 오터하운드 | `92f215cc`, `6ebab17b`, `12c12dad`, `a71bebba` | `otterhound-feature-`: `water-scent-return`, `water-to-dry-rest`, `scent-door-buffer`, `ear-beard-foot-care` |
| 라케노이즈 | `191771c0`, `00546f32`, `3ff71d83`, `ed38155a` | `belgian-laekenois-feature-`: `cloth-boundary`, `cloth-to-rest`, `visitor-distance`, `rough-coat-care` |
| 체코슬로바키안 울프독 | `1432fcb4`, `57144f2a`, `e4bb04ea`, `d136f703` | `czechoslovakian-wolfdog-feature-`: `long-route-checkin`, `double-door-rest`, `secure-perimeter`, `coat-handling` |
| 부비에 데 플랑드르 | `c28ebd8f`, `78e57ee8`, `117a5925`, `a2297d7a` | `bouvier-des-flandres-feature-`: `block-and-yield`, `work-to-rest`, `doorway-watch-place`, `beard-coat-care` |
| 미니어처 아메리칸 셰퍼드 | `bde577d8`, `e233588b`, `e717dc88`, `6e7ae0d4` | `miniature-american-shepherd-feature-`: `panel-route`, `panels-to-rest`, `wheel-distance`, `feathering-care` |
| 도고 아르헨티노 | `93e0e52d`, `fe9faeb5`, `690c45ff`, `270f1058` | `dogo-argentino-feature-`: `scent-bag-return`, `scent-to-rest`, `animal-double-distance`, `shade-skin-check` |

원본 PNG의 전체 파일명은 `exec-<위 식별자>-<나머지 UUID>.png` 형식으로 생성 폴더에 보존되어 있다. 서비스의 40개 WebP는 모두 서로 다른 파일이며 상세 데이터의 대체 텍스트와 장면 의미를 대조했다.
