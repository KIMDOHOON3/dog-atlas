# 견종 외형 교체 이미지 프롬프트 — 2026-08-11

> 대상: 공식 외형 자료와 큰 차이가 확인된 10종의 카드·역사 일러스트 20개
>
> 생성 방식: Codex 기본 내장 이미지 생성 도구
>
> 참고 이미지 입력: 없음. 공식 표준의 형태 설명을 읽고 새 장면으로 생성함
>
> 최종 형식: 1024×1024 WebP, quality 90
>
> 주의: 아래 그림은 공식 표준 삽화를 복제하지 않은 편집 일러스트이며 전문 심사위원의 컨포메이션 인증을 대신하지 않는다.

삽살개 교체 프롬프트는 별도 문서인 [`image-prompts-sapsaree.md`](image-prompts-sapsaree.md)에 있다.

## 프롬프트 조합 규칙

생성 시 사용한 지시를 재현할 수 있도록 공통절과 자산별절로 나눠 기록한다. 각 최종 프롬프트는 아래 순서로 이어 붙인다.

1. 카드 또는 역사 장면의 `공통절`
2. 해당 견종의 `형태절`
3. 해당 자산의 `장면절`
4. 해당 견종의 `금지절`

### 카드 공통절

```text
Create a premium square 1:1 editorial watercolor-and-colored-pencil breed portrait for the existing Korean “living dog atlas” website. Show one adult dog, full body in a natural standing three-quarter or side view, with both ears, all four feet and the complete tail visible. Center the dog with generous breathing room. Breed morphology is the highest priority. Use a pale warm ivory watercolor-paper background, a soft desaturated regional color wash and only a few understated environmental details. Refined museum-natural-history illustration, precise anatomy, delicate graphite linework, translucent layered watercolor, fine coat detail, muted natural palette, realistic but poetic, clean premium finish. No text, letters, labels, logo, border, frame, collar, leash, people, other animals, cropped anatomy or extra limbs.
```

### 역사 공통절

```text
Create a premium square 1:1 narrative editorial watercolor-and-colored-pencil illustration for the existing Korean “living dog atlas” website. Show one accurately depicted adult dog large in the foreground within the breed’s documented historical region and original working context. Keep the complete dog, all four feet and the entire tail readable. Explain the role through posture, terrain and surrounding context rather than spectacle. Refined museum-natural-history storytelling, delicate graphite structure, translucent watercolor layers, fine anatomical and environmental detail, tactile warm-ivory paper grain, quiet dignity and a cohesive muted palette. No text, captions, labels, logos, border, collar, leash, blood, traps, weapons, dead or injured animals, duplicated anatomy or extra limbs.
```

## 1. 아리에주아 (`ariegeois`)

형태절:

```text
Subject: an adult Ariégeois, a medium light elegant French scent hound. Use a lean but not fragile rectangular hound body, long neck, deep narrow chest and long straight legs. The coat is short, fine and dense, predominantly white with sharply defined jet-black patches and restrained pale-tan markings on cheeks and above the eyes. Show very long fine drop ears set low, curling slightly inward and extending beyond the nose line, a long refined muzzle, dark eyes and a long sabre tail carried naturally. The dog must read as a smooth-coated scent hound, not a pastoral dog or spitz.
```

카드 장면절:

```text
Place the dog on a lightly indicated pale limestone path in the Ariège foothills with a quiet sage-gray wash; calm alert stance and direct readable silhouette.
```

역사 장면절:

```text
Show the dog following a scent along a rocky path through the Ariège foothills, nose lowered and sabre tail open, with a distant old stone hunting lodge and layered Pyrenean slopes. Any hare remains distant and unharmed.
```

금지절:

```text
Do not depict long shaggy fur, prick ears, a curled spitz tail, a Border Collie, shepherd dog, retriever, foxhound with heavy build, or broad black saddle that overwhelms the white coat.
```

## 2. 빌리 (`billy`)

형태절:

```text
Subject: an adult Billy hound, large, strong but distinctly light and athletic. Use a tall narrow French pack-hound body, long legs, deep chest, long clean neck and refined head. The coat is short and slightly harsh, white or milk-coffee white with only restrained pale-orange or lemon patches, especially around an ear. Show medium flat drop ears, dark attentive eyes, a black nose and a long strong tail carried openly rather than curled.
```

카드 장면절:

```text
Place the dog against an airy warm-ivory background with a faint pale-oak and meadow wash; keep its height, light bone and full tail immediately readable.
```

역사 장면절:

```text
Show the hound moving through open French woodland while following a ground scent, with muted autumn leaves and a distant historic estate edge. The scene communicates pack-hound endurance without showing a chase, weapon or harmed quarry.
```

금지절:

```text
Do not depict a white spitz, Samoyed, livestock guardian, prick ears, a tightly curled tail, long feathered coat, heavy mastiff body or lemon-and-white spaniel.
```

## 3. 둥케르 (`dunker`)

형태절:

```text
Subject: an adult Dunker, a medium Norwegian scent hound with a clearly rectangular, powerful but not heavy body. Show a long clean head, dark eyes, flat hanging ears close to the cheeks, a straight back, deep chest and a straight tail reaching roughly to the hock with only a slight upward curve. The coat is straight, hard and dense. Use the breed’s distinctive blue-marbled pattern: diluted black or blue-merle areas with white and restrained pale-tan points, clearly different from a retriever or spitz.
```

카드 장면절:

```text
Place the complete dog on a pale Norwegian forest-floor wash with subdued blue-gray, birch and moss tones. Keep the marbled coat and hanging ears clear at card size.
```

역사 장면절:

```text
Show the Dunker tracking across a quiet snow-dusted birch woodland, nose reading a hare trail while the hare remains far away and unharmed. Emphasize endurance, the blue-marbled coat and the straight open tail.
```

금지절:

```text
Do not depict a Golden Retriever, English Setter, Australian Shepherd, white spitz, prick ears, fluffy feathering, a tightly curled tail or a predominantly cream unmarked coat.
```

## 4. 아이디 (`aidi`)

형태절:

```text
Subject: an adult Aidi, a medium solid, powerful yet agile Atlas Mountain dog. Use a broad conical head, moderate muzzle, dark watchful eyes and medium half-drop or naturally hanging ears. The coat is thick, harsh and half-long, about six centimetres, with a visible neck mane and dense breeches. Use an allowed earthy brown-and-white pattern. Show a long very bushy tail carried low in a gentle scimitar curve, never permanently erect or tightly curled over the back.
```

카드 장면절:

```text
Place the dog on a lightly indicated Moroccan Atlas rock shelf with warm sand, muted umber and sage washes; calm vigilant stance.
```

역사 장면절:

```text
Show the Aidi alert beside a pastoral tent and a small flock in the Atlas Mountains, positioned as a watchful camp and livestock guardian rather than a herding dog. Keep the half-drop ears and low bushy tail visible.
```

금지절:

```text
Do not depict a white spitz, Samoyed, Akita, tightly curled tail, permanently erect ears, short slick coat, giant livestock guardian or active sheep-chasing pose.
```

## 5. 에스트렐라 마운틴 도그 (`estrela-mountain-dog`)

형태절:

```text
Subject: an adult long-coated Estrela Mountain Dog, large, rustic and athletic with a molossoid but not cumbersome body. Use a broad strong head, dark mask, small triangular ears set high and folding backward and laterally, a deep chest and long dense fawn coat with darker shading. White may appear only as a very small restrained mark. Show a long low-set scimitar tail reaching the hock with a hooked tip, never carried over the back.
```

카드 장면절:

```text
Place the dog against a pale granite-and-heather wash inspired by Portugal’s Serra da Estrela. Let the fawn coat, dark mask, small folded ears and low hooked tail define the silhouette.
```

역사 장면절:

```text
Show the dog accompanying a flock across a granite mountain route in the Serra da Estrela, calmly watching open ground while a distant shepherd walks behind. Use misty granite, heather and muted gold light.
```

금지절:

```text
Do not depict a predominantly white Great Pyrenees, a Leonberger, a Golden Retriever, large white patches, rounded low retriever ears, a fluffy spitz tail or a tail curled over the back.
```

## 6. 댄디 딘몬트 테리어 (`dandie-dinmont-terrier`)

형태절:

```text
Subject: an adult pepper-coloured Dandie Dinmont Terrier. Use the unmistakable long, low and gently curved body, short strong legs, very large domed head, broad forehead, large dark eyes and a soft nearly-white silky topknot. Show low hanging tapering ears with restrained feathering, a crisp mixed-texture pepper coat and a short scimitar-shaped tail carried just above the body line but never curled. The dog should appear sturdy, elongated and dignified rather than square or toy-like.
```

카드 장면절:

```text
Place the dog on a soft Scottish Borders heather-and-stone wash with enough open ivory space to read the low silhouette and complete tail.
```

역사 장면절:

```text
Show the terrier investigating a safe rocky crevice beside a shallow Scottish Borders stream, evoking old rough-terrain vermin work without showing prey contact. Keep the full long body, topknot, hanging ears and scimitar tail readable.
```

금지절:

```text
Do not depict a West Highland White Terrier, Maltese, Bichon, generic square white lapdog, prick ears, poodle curls, long stilts, a small round head or a tail curled over the back.
```

## 7. 사우스 러시안 셰퍼드 도그 (`south-russian-shepherd-dog`)

형태절:

```text
Subject: an adult South Russian Shepherd Dog, large, agile and moderately long-bodied. Cover the head, eyes, face, trunk, legs and tail with abundant coarse, long, thick shaggy hair longer than ten centimetres. Include eyebrows, moustache and beard; low triangular hanging ears should be almost hidden by hair. Use white, ivory or very pale gray tones. Show a long low tail ending in a hook or half-circle, never a spitz curl.
```

카드 장면절:

```text
Place the full dog against a pale steppe-grass and sky wash. The veil of coat, long limbs under the shag and low hooked tail must remain readable instead of becoming a featureless white cloud.
```

역사 장면절:

```text
Show the shaggy dog standing watch beside a loose flock on an open Black Sea steppe, wind moving the long coat while a distant shepherd and wagon remain secondary. The posture is calm protection, not active chasing.
```

금지절:

```text
Do not depict an Old English Sheepdog with a compact bobtail body, a Komondor with cords, a short-coated white guardian, clearly exposed eyes and ears, a rounded pet trim or a tightly curled tail.
```

## 8. 베들링턴 테리어 (`bedlington-terrier`)

형태절:

```text
Subject: an adult Bedlington Terrier, graceful, lithe and muscular, with a body slightly longer than height. The whole head is narrow, deep and pear- or wedge-shaped with a straight unbroken line from crown to nose and no visible stop. Add a profuse nearly-white silky topknot, small bright eyes and low-set thin filbert-shaped ears hanging flat to the cheeks, short-coated except for pale silky tassels at the tips. Use a long tapering neck, a pronounced natural arch over the loin, a tucked underline, hind legs appearing slightly longer, a thick linty blue-gray coat with soft twists and a low-set tapering tail curving gracefully downward.
```

카드 장면절:

```text
Place the dog on a restrained Northumberland moor with pale grasses and a soft desaturated sage wash. Use a calm mild expression and keep all feet and the low tail visible.
```

역사 장면절:

```text
Show the terrier beside a low dry-stone wall on Northumberland moorland, following the trail of a rabbit disappearing safely into scrub; a small nineteenth-century stone mining village and mine headframe sit far behind.
```

금지절:

```text
Do not depict a Poodle, doodle, generic curly dog, rounded teddy-bear head, long fully feathered spaniel ears, pom-pom grooming or a straight level topline.
```

## 9. 노르웨이안 룬데훈트 (`norwegian-lundehund`)

형태절:

```text
Subject: an adult Norwegian Lundehund, a small, light, supple, rectangular Nordic spitz. Use a clean wedge-shaped head, slightly sloping yellowish-brown eyes with a dark halo, medium triangular erect and very mobile ears, and a red-to-fawn coat always combined with clear white plus restrained black-tipped hairs. The tail is medium and carried in a loose partial ring rather than an oversized tight plume. The defining anatomy must be legible and natural: each forefoot has at least six distinct functional toes, five contacting the ground and two inner toes placed higher and inward; the hind feet also suggest the breed’s extra toes.
```

카드 장면절:

```text
Use a natural three-quarter stance on a simple Norwegian coastal rock ledge. Bring both forefeet slightly toward the viewer so the functional toes are large enough to inspect without making the dog grotesque.
```

역사 장면절:

```text
Show the dog moving carefully across a steep layered sea-cliff ledge on Værøy toward a dark nesting crevice. One ear folds inward in its characteristic closing motion and the near forefoot grips rock with at least six readable toes. A few puffins remain alive and unharmed on distant ledges or in flight, and an islander watches from near a turf-roofed stone hut.
```

금지절:

```text
Do not depict a Shiba Inu, Jindo, Basenji, fox, generic spitz, ordinary four-toed forefeet, an oversized plume tail, duplicated paws, fused toes or extra legs.
```

## 10. 마렘마 앤 아브루초 셰퍼드 (`maremma-sheepdog`)

형태절:

```text
Subject: an adult Maremma and Abruzzo Shepherd Dog, large, strongly built, majestic and rustic, with a substantial body slightly longer than height. Use a large broad flat conical head reminiscent of a polar bear, a blunt tapering muzzle, black nose, dark almond eyes and small high-set natural triangular V-shaped ears hanging close with pointed tips. Add a powerful neck with a dense collar, abundant pure-white long harsh nearly straight coat lying fairly flat, and sturdy straight heavily boned legs. The tail is critical: low set because of the sloping croup, long enough to reach below the hock, densely furnished, hanging relaxed with only a gentle hook at the tip, never curled or carried over the back.
```

카드 장면절:

```text
Place the dog on a lightly indicated central Italian upland pasture with muted limestone, olive and ivory washes. Use a quiet perceptive guardian expression and show the complete low tail.
```

역사 장면절:

```text
Show the dog standing calmly between a compact flock and open terrain during seasonal movement through Abruzzo uplands, with a distant shepherd and simple dry-stone shelter. It guards rather than chasing sheep; the low hanging tail with hooked tip remains completely visible.
```

금지절:

```text
Do not depict a Samoyed, Great Pyrenees, Golden Retriever, Kuvasz, fluffy spitz, rounded retriever ears, smiling pet portrait, active sheep-chasing or any tail curled over the back.
```

## 생성 원본과 프로젝트 저장 경로

| slug | 생성 원본 PNG — 카드 / 역사 | 프로젝트 WebP — 카드 / 역사 |
|---|---|---|
| `ariegeois` | `exec-64b7998e-dce8-4caf-adf4-0f2ca907f109.png` / `exec-7261ff14-5cde-4108-aadf-a75af2a37fd4.png` | `public/illustrations/v2/ariegeois-card.webp` / `public/illustrations/v3/ariegeois-history.webp` |
| `billy` | `exec-4862e128-fa4b-4809-94f7-7d21aefb8e10.png` / `exec-c6a3b272-4102-4879-8138-aa0e89246159.png` | `public/illustrations/v2/billy-card.webp` / `public/illustrations/v3/billy-history.webp` |
| `dunker` | `exec-03deffd2-ea4e-4dae-a708-033a7d1fc1d3.png` / `exec-f7759a3f-c396-45d5-a5c2-02ad764727e6.png` | `public/illustrations/v2/dunker-card.webp` / `public/illustrations/v3/dunker-history.webp` |
| `aidi` | `exec-61c37181-e8dc-48ee-85a1-40a29914eafa.png` / `exec-20a91301-dea5-416b-9cbe-616f7bb220e7.png` | `public/illustrations/v2/aidi-card.webp` / `public/illustrations/v3/aidi-history.webp` |
| `estrela-mountain-dog` | `exec-2d991311-5a3e-42b8-96c1-8b9661b6c342.png` / `exec-45deae89-2588-48b6-8fd9-ee9b3bd25c62.png` | `public/illustrations/v2/estrela-mountain-dog-card.webp` / `public/illustrations/v3/estrela-mountain-dog-history.webp` |
| `dandie-dinmont-terrier` | `exec-45078f72-f83d-4b23-8213-7a521d9c7d23.png` / `exec-66be84db-2584-4cab-b429-62799ced855e.png` | `public/illustrations/v2/dandie-dinmont-terrier-card.webp` / `public/illustrations/v3/dandie-dinmont-terrier-history.webp` |
| `south-russian-shepherd-dog` | `exec-c0ae1ea9-4b74-4085-a2a5-ee155a2d854a.png` / `exec-52efb8fd-abe1-4757-ada3-766596632b17.png` | `public/illustrations/v2/south-russian-shepherd-dog-card.webp` / `public/illustrations/v3/south-russian-shepherd-dog-history.webp` |
| `bedlington-terrier` | `exec-d3da979f-d745-4b12-b0c5-c125c118fe3a.png` / `exec-0fd9e154-f048-48d8-a181-f807311a075a.png` | `public/illustrations/v2/bedlington-terrier-card.webp` / `public/illustrations/v3/bedlington-terrier-history.webp` |
| `norwegian-lundehund` | `exec-e9578752-de71-4b19-8833-1dee27da0876.png` / `exec-2953e80d-7ef1-45fe-bc8d-46a868433188.png` | `public/illustrations/v2/norwegian-lundehund-card.webp` / `public/illustrations/v3/norwegian-lundehund-history.webp` |
| `maremma-sheepdog` | `exec-f06f92d8-0025-4052-891b-3427d2573d7e.png` / `exec-a6288920-3615-4b11-9d20-26a32de7fa23.png` | `public/illustrations/v2/maremma-sheepdog-card.webp` / `public/illustrations/v3/maremma-sheepdog-history.webp` |

생성 원본은 Codex 기본 생성 저장소의 해당 작업 폴더에 남겨 두고, 제품은 위의 프로젝트 WebP만 참조한다.
