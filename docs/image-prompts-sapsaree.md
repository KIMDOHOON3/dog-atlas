# 삽살개 이미지 재제작 기록

> 제작일: 2026-08-11
>
> 생성 방식: OpenAI 내장 이미지 생성 도구로 참고 이미지를 사용해 새 래스터 일러스트 생성
>
> 최종 형식: 1024 × 1024 WebP

## 결과 파일

- 카드: `public/illustrations/v2/sapsaree-card.webp`
- 역사 장면: `public/illustrations/v3/sapsaree-history.webp`
- 생성 원본 카드 PNG: `C:\Users\ss\.codex\generated_images\019fe6f0-dfd7-72e3-888c-08ac4313c166\exec-0a351b45-b55f-49fb-a9e4-56c8d727a353.png`
- 생성 원본 역사 PNG: `C:\Users\ss\.codex\generated_images\019fe6f0-dfd7-72e3-888c-08ac4313c166\exec-12827ab3-eed1-4a1d-b2bb-7e94440629ff.png`

형태 판단에는 사용자가 제공한 실제 삽살개 검색 화면, [국가유산포털](https://www.heritage.go.kr/heri/cul/culSelectDetail.do?VdkVgwKey=16%2C03680000%2C37&pageNo=1_1_1_1), [Korea.net](https://www.korea.net/NewsFocus/Culture/view?articleId=142199), [BMC Genetics 논문](https://pmc.ncbi.nlm.nih.gov/articles/PMC6683530/)을 참고했다. 기존 Dog Atlas 그림은 화풍과 구도만 참고하고 잘못된 스피츠형 해부는 유지하지 않았다.

## 카드 프롬프트

```text
Use case: stylized-concept
Asset type: square 1:1 breed-atlas card illustration
Input images: Image 1 is morphology reference only for the real long-haired Korean Sapsaree; Image 2 is style, palette, paper texture, and full-body card-composition reference only. Do not preserve Image 2's incorrect dog anatomy.
Primary request: Create a new, breed-faithful adult long-haired Sapsaree (삽살개) illustration in the existing Dog Atlas watercolor-and-pencil language.
Scene/backdrop: quiet low foothills and meadow suggestive of Gyeongsan, Korea, painted very softly on warm ivory watercolor paper so the dog stays dominant.
Subject: one cream-to-light-yellow adult Sapsaree, medium and sturdy, slightly rectangular body, substantial broad head and muzzle, large sturdy paws, dense abundant shaggy double coat with long straight-to-gently-wavy furnishings. Long facial fringe must naturally cover most of both eyes. The ears are medium pendant/drop ears and mostly hidden by the coat. Black nose. Long feathered tail visible in a natural relaxed upward curve, not a tight spitz ring.
Composition/framing: complete standing adult dog in natural three-quarter side view, head turned toward the viewer, all four paws and the entire tail visible with generous margin; realistic adult proportions, dog fills about 72–78% of the square.
Style/medium: refined natural-history watercolor with delicate colored-pencil detail, calm muted sage, cream, ochre, and warm-gray palette, same visual family as Image 2, not photorealistic and not cartoon.
Constraints: accurate Sapsaree silhouette is more important than cuteness; no text, logo, border, or watermark; no cropped ears, paws, or tail.
Avoid: upright pointed ears, exposed round eyes, foxlike wedge head, short coat, tight spitz tail, Jindo/Akita/Samoyed/Golden Retriever appearance, oversized mastiff proportions, show-groomed topknot, puppy proportions, extra limbs or toes.
```

## 역사 장면 프롬프트

```text
Use case: historical-scene
Asset type: square 1:1 Dog Atlas breed-detail history illustration
Input images: Image 1 is real Sapsaree morphology reference only; Image 2 is the approved morphology and watercolor character anchor for the same cream adult Sapsaree; Image 3 is composition, Korean rural setting, paper texture, and historical-atlas style reference only. Replace Image 3's incorrect spitz-like dog completely.
Primary request: Paint one breed-faithful long-haired Korean Sapsaree standing watchfully but calmly in a traditional rural courtyard in Gyeongsan, Korea, conveying its historical life beside people and homes without dramatization.
Scene/backdrop: modest Korean hanok courtyard with stone wall, earthen ground, wooden gate and distant low mountains; historically neutral, no modern objects, no people required.
Subject: the exact same type of cream-to-light-yellow adult Sapsaree established in Image 2: medium sturdy slightly rectangular body, substantial head and muzzle, large paws, abundant shaggy double coat, long facial fringe covering most of both eyes, pendant/drop ears hidden in the coat, black nose, long feathered tail in a relaxed upward curve. It must remain recognizable even at smaller scale.
Composition/framing: full dog in clear three-quarter side view in the lower-middle foreground; all four paws and entire tail visible; enough environment to explain the village-watch context, but dog remains the primary focal point.
Style/medium: refined subdued watercolor and colored-pencil historical natural-history illustration on warm textured paper; muted earth, gray, sage, and cream palette matching Image 3.
Constraints: breed morphology from Image 2 must remain consistent; calm observational scene; no text, logo, border, watermark, crop, violence, supernatural spectacle, or decorative costume.
Avoid: upright pointed ears, exposed round eyes, foxlike wedge head, short coat, tight spitz tail, Jindo/Akita/Samoyed appearance, generic livestock guardian, modern buildings, extra dogs, people, extra limbs.
```
