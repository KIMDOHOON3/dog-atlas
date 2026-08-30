# 200종 확장 배치 03 — 이미지 제작 기록

## 범위와 생성 방식

- 대상: 도그 드 보르도, 네아폴리탄 마스티프, 컨티넨탈 불독, 스무드 폭스 테리어, 와이어 폭스 테리어, 케리 블루 테리어, 케언 테리어, 노퍽 테리어, 노리치 테리어, 미니어처 불테리어.
- 생성 모드: Codex 내장 ImageGen의 신규 텍스트→이미지 생성. 참조 이미지는 사용하지 않았고 자산마다 한 번씩 별도 호출했다.
- 공통 프롬프트: `Dog Atlas editorial illustration, horizontal 4:3. Warm cream paper texture, restrained watercolor and colored pencil, natural adult-dog anatomy, documentary clarity, readable full-body action and environment, no text, no logo, no watermark, no collage.`
- 각 장면에는 상세 원고의 이미지 대체 텍스트를 장면 지시로 넣고, 견종의 피모·귀·체격과 사람의 행동 및 안전 경계가 한눈에 구분되도록 지정했다.
- 원본 PNG는 Codex 생성 이미지 폴더에, 서비스 자산은 `public/illustrations/v3`와 `public/illustrations/v4`에 저장했다. 서비스 자산은 모두 1200×900, quality 84 WebP다.

## 장면과 서비스 자산

| 견종 | 서비스 WebP 장면 5개 |
| --- | --- |
| 도그 드 보르도 | `history`, `doorway-mat`, `cool-route-to-rest`, `wide-turning-route`, `fold-drool-care` |
| 네아폴리탄 마스티프 | `history`, `double-gate-mat`, `patrol-to-rest`, `vehicle-ramp-route`, `wrinkle-eye-check` |
| 컨티넨탈 불독 | `history`, `quiet-trot-check`, `shade-recovery`, `steady-weight-route`, `skin-paw-handling` |
| 스무드 폭스 테리어 | `history`, `tunnel-return`, `tunnel-to-rest`, `moving-target-distance`, `short-coat-body-check` |
| 와이어 폭스 테리어 | `history`, `brush-scent-route`, `scent-box-to-rest`, `garden-dig-zone`, `wire-coat-care` |
| 케리 블루 테리어 | `history`, `find-carry-place`, `tasks-to-rest`, `dog-distance-arc`, `blue-coat-care` |
| 케언 테리어 | `history`, `cairn-scent-blocks`, `blocks-to-rest`, `garden-dig-border`, `rough-coat-front-paws` |
| 노퍽 테리어 | `history`, `stable-box-search`, `social-to-solo-rest`, `small-gap-security`, `drop-ear-wire-coat` |
| 노리치 테리어 | `history`, `study-box-search`, `search-to-quiet-mat`, `hallway-sound-return`, `prick-ear-wire-coat` |
| 미니어처 불테리어 | `history`, `barn-hunt-indicate`, `tug-stop-rest`, `body-play-space`, `white-skin-ear-check` |

파일명은 역사 장면의 경우 `{slug}-history.webp`, 나머지는 `{slug}-feature-{장면}.webp`다. 50개 결과 모두 전신 외형, 장면 의미, 개체·사람 중복, 글자와 워터마크 유무를 육안 대조했다.

## 폐기와 재생성

- 케리 블루 테리어 `find-carry-place`의 첫 시안은 한 화면에 같은 개가 세 번 반복되어 순차 동작 콜라주처럼 보였으므로 폐기했다.
- 교체 프롬프트: `Edit-quality replacement generation, no reference image. Create asset kerry-blue-terrier-feature-find-carry-place. Dog Atlas editorial illustration, horizontal 4:3. Show exactly ONE adult mature Kerry Blue Terrier with soft wavy blue-gray coat at the single final moment of placing one blue cloth pouch into one low wicker basket in front of one owner. A starting mat may sit empty far behind. Do not show earlier or later stages, no repeated dog, no motion sequence, no collage, no duplicate animal. Fenced grassy training area, calm cooperative posture. Warm cream paper texture, restrained watercolor and colored pencil, natural anatomy, documentary clarity, no text, no logo, no watermark.`
- 교체 원본: `exec-33401c59-c659-4c82-b81a-35b457b5758b.png`. 최종 WebP에는 한 마리만 보이는 것을 재확인했다.

이미지는 편집 설명을 위한 장면이며 수의학·행동학 또는 컨포메이션 전문가 검수를 받았다는 뜻이 아니다.
