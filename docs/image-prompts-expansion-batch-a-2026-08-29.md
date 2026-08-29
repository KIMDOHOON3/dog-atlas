# 표준 상세 확장 배치 A 이미지 제작 기록

> 제작일: 2026-08-29
> 대상: 그로넨달, 코카시안 셰퍼드, 몽골 방카르
> 방식: 내장 ImageGen 생성 후 1200×900 이내 WebP(quality 88)로 변환

## 근거와 원고 축

- 그로넨달: FCI Belgian Shepherd Dog 표준, AKC Belgian Sheepdog 자료, 강형욱의 보듬TV `강형욱 첫사랑 공개합니다 | 견종백과 그로넨달편`을 대조했다. 공식 자료의 목양·경비·작업 배경을 사실 축으로 삼고, 국내 영상은 빠른 학습과 함께 살 때 생기는 질문을 고르는 보조 자료로만 썼다.
- 코카시안 셰퍼드: FCI Caucasian Shepherd Dog 표준과 AKC 자료를 사실 축으로 삼고, EBS의 국내 생활 사례는 큰 체격·방문객 동선이 실제 생활에서 어떤 질문이 되는지 살피는 보조 자료로 썼다.
- 몽골 방카르: Mongolian Bankhar Dog Project, Conservation Science and Practice 논문을 사실 축으로 삼고, EBS의 몽골 현장 영상은 가축과의 결속과 유목 환경이 화면에서 어떻게 보이는지 대조하는 데만 썼다.
- 영상 제목, 출연견 한 마리와 개별 발언은 견종 전체의 보장된 성향으로 일반화하지 않았다.

## 모든 이미지에 적용한 전체 프롬프트

`Warm editorial natural-history watercolor and colored-pencil illustration for a premium Korean mobile dog atlas. Show one clearly identifiable adult dog at full-body scale, paws and tail visible, together with a person performing a concrete action and enough environment to explain the scene. Natural proportions and breed-specific silhouette, calm responsible handling, soft cream paper texture, muted earthy palette, gentle diffuse light, landscape 4:3 composition with comfortable margins. No close-up, no cropped dog, no puppy, no duplicated dog, no text, no labels, no logo, no watermark, no UI, no decorative vignette, no photorealism, no exaggerated expression, no aggression spectacle.`

아래 장면 문장을 전체 프롬프트 뒤에 붙여 각각 독립 생성했다.

## 그로넨달

1. `A solid-black long-coated adult Belgian Groenendael follows the guardian's hand direction through three simple field markers in a quiet fenced meadow; the dog's body, attentive gaze, markers and cooperative turn are all visible.`
   원본 `exec-4bc03962-fe94-41b5-99b9-d58fbb495903.png` → `/public/illustrations/v4/belgian-groenendael-feature-cooperative-markers.webp`
2. `After a short activity, the full-body black Groenendael rests on a low mat while the guardian places a tug and training markers into a lidded basket; make the transition from task to rest immediately readable.`
   원본 `exec-29bbe47a-ebd5-4711-9223-b6e9066065ba.png` → `/public/illustrations/v4/belgian-groenendael-feature-task-to-rest.webp`
3. `Inside a calm home entryway, the full-body Groenendael waits behind a secure indoor safety gate while the guardian greets one visitor at the closed outer door; show two separate zones and generous distance.`
   원본 `exec-b523213d-e437-4340-9a81-aa957ed39726.png` → `/public/illustrations/v4/belgian-groenendael-feature-visitor-buffer.webp`
4. `The full-body standing Groenendael is calmly brushed by the guardian indoors, with the black long coat divided into visible sections and a small amount of removed undercoat beside the brush.`
   원본 `exec-53a52775-5b31-42a7-9bbf-776c595aac5e.png` → `/public/illustrations/v4/belgian-groenendael-feature-black-coat-care.webp`

## 코카시안 셰퍼드

1. `A huge adult Caucasian Shepherd and guardian calmly observe the far edge of a broad secure rural fence; show the complete heavy body, mountain-dog coat, broad boundary and distant harmless movement.`
   원본 `exec-d060024e-bfe3-43ec-b26e-de5f175bdcd1.png` → `/public/illustrations/v4/caucasian-shepherd-dog-feature-boundary-watch.webp`
2. `A guardian guides a huge full-body adult Caucasian Shepherd through a wide driveway gate using a sturdy harness and loose heavy leash; show generous turning room and the scale difference without struggle.`
   원본 `exec-b5e5b33c-ea75-4449-a903-b74a68c73a04.png` → `/public/illustrations/v4/caucasian-shepherd-dog-feature-wide-route-handling.webp`
3. `A parcel delivery happens across a clearly visible double-gate setup: the huge Caucasian Shepherd waits behind the inner secure gate, the guardian stands in the buffer zone, and the visitor remains outside the outer gate.`
   원본 `exec-061d66af-8239-4a4a-bfc3-357dab417717.png` → `/public/illustrations/v4/caucasian-shepherd-dog-feature-double-gate-visitor.webp`
4. `Outdoors in deep shade, a guardian uses an undercoat rake across the full standing body of a huge Caucasian Shepherd; show the dense double coat, removed loose undercoat, water and shaded rest area.`
   원본 `exec-e6764e7f-85d1-4350-b911-d63cfeb89eba.png` → `/public/illustrations/v4/caucasian-shepherd-dog-feature-double-coat-care.webp`

## 몽골 방카르

1. `On the Mongolian steppe, a full-body black-and-tan adult Bankhar walks the outside perimeter of a mixed sheep and goat flock while a herder follows at a respectful distance; include open grassland and distant ger.`
   원본 `exec-d3a2e2e1-fd49-4f64-bd7b-e8f086a6d301.png` → `/public/illustrations/v4/mongolian-bankhar-feature-livestock-perimeter.webp`
2. `A Mongolian herder checks a practical livestock fence and refills a water trough while a full-body adult Bankhar remains beside the flock; make fence, water, livestock and daily inspection equally readable.`
   원본 `exec-ccc45657-ce8f-4d71-b1d2-0c0914f99d84.png` → `/public/illustrations/v4/mongolian-bankhar-feature-fence-water-check.webp`
3. `At dusk near a ger, a full-body adult Bankhar rests among sheep inside a night pen while the herder checks the gate from outside; emphasize the dog's closeness to livestock rather than posing beside the person.`
   원본 `exec-81e92bb1-54b2-4861-9ed2-2c428c0a06bc.png` → `/public/illustrations/v4/mongolian-bankhar-feature-livestock-bond.webp`
4. `Beside a Mongolian ger in a shaded work area, a herder brushes the complete standing body of an adult Bankhar during seasonal coat shedding; include loose undercoat, water and open-steppe context.`
   원본 `exec-162f16d0-a9aa-43e7-89e8-14694ceae053.png` → `/public/illustrations/v4/mongolian-bankhar-feature-seasonal-coat-care.webp`

## 검수 결과

- 12장 모두 한 장면에 성견 한 마리의 전신, 사람의 구체적인 행동과 역할을 설명하는 환경이 함께 보인다.
- 확대 얼굴·부분 신체 컷, 글자·로고·워터마크, 공격 장면은 사용하지 않았다.
- 같은 견종의 네 장면이 학습/휴식/방문/빗질, 경계/이동/방문/빗질, 순찰/환경 점검/가축 결속/빗질로 각각 다른 의미를 전달한다.
- 역사 그림은 기존 v3 자산을 유지하고, 새 생활 장면 12장만 v4에 추가했다.
