# 견종 외형 교체 이미지 프롬프트 · 2차 배치

> 생성일: 2026-08-11
>
> 범위: 고위험 30종 재검수에서 오류가 확인된 11종, 13개 자산
>
> 생성 방식: Codex 기본 내장 이미지 생성 도구
>
> 참고 이미지 입력: 없음. 공식 표준의 서술형 형태 정보를 바탕으로 새로 생성
>
> 최종 형식: 1024×1024 WebP, quality 90
>
> 주의: 공식 표준 삽화를 복제한 그림이 아니며, 편집 외형 교정이지 전문가 컨포메이션 인증이 아니다.

## 공통 시각 언어

모든 자산은 기존 도감의 따뜻한 아이보리 종이, 연필 윤곽, 투명한 수채화 겹, 세이지·오커 중심의 절제된 색을 유지했다. 카드에서는 한 마리 성견의 전신과 네 발·귀·꼬리를 명확히 보여 주고, 역사 그림에서는 견종의 기록된 지역과 역할을 배경으로 두되 개의 형태를 가장 크게 읽히도록 했다. 텍스트·로고·목줄·현대 물건·다친 사냥감·잘린 신체·여분 다리는 모두 제외했다.

## 최종 자산 매핑

| 견종 | 생성 원본 | 최종 경로 |
|---|---|---|
| 앙글로 프랑세 드 프티트 베네리 | `exec-8a1c3ce6-4e5c-47bf-982c-6c2841e34f5d.png` | `public/illustrations/v3/anglo-francais-de-petite-venerie-history.webp` |
| 할덴 하운드 | `exec-a83aa1ad-1aad-47b3-ba81-344612cd9e86.png` | `public/illustrations/v3/halden-hound-history.webp` |
| 히겐 하운드 | `exec-838bad4d-cd67-4e88-a602-616509e16a74.png` | `public/illustrations/v3/hygen-hound-history.webp` |
| 트란실바니안 하운드 | `exec-c72bbccd-c81a-4a29-aed6-bd55fd70c2e4.png` | `public/illustrations/v3/transylvanian-hound-history.webp` |
| 폴리시 타트라 셰퍼드 | `exec-3188701d-8f81-4f5c-aee8-f095f0d9f53a.png` | `public/illustrations/v3/polish-tatra-sheepdog-history.webp` |
| 루마니안 미오리틱 셰퍼드 · 카드 | `exec-952a3b18-804e-40f4-a039-f4466a489de8.png` | `public/illustrations/v2/romanian-mioritic-shepherd-dog-card.webp` |
| 루마니안 미오리틱 셰퍼드 · 역사 | `exec-a7a508d8-2350-4b3f-ae7c-8702a731e1a8.png` | `public/illustrations/v3/romanian-mioritic-shepherd-dog-history.webp` |
| 피레니안 마스티프 · 카드 | `exec-3ba73880-29ca-457e-9409-d3908f68d5a1.png` | `public/illustrations/v2/pyrenean-mastiff-card.webp` |
| 피레니안 마스티프 · 역사 | `exec-5c98a0d7-f436-4183-b00d-2532bc37db4d.png` | `public/illustrations/v3/pyrenean-mastiff-history.webp` |
| 쿠바츠 | `exec-1a71469d-38ef-4527-8af8-de03277ccc04.png` | `public/illustrations/v3/kuvasz-history.webp` |
| 슬로바키안 쿠바츠 | `exec-e836136a-89ba-483d-8cdc-8f6cd31bf810.png` | `public/illustrations/v2/slovakian-cuvac-card.webp` |
| 노르보텐스펫츠 | `exec-5bd9c9f3-e092-4c7a-9797-2b467bf18843.png` | `public/illustrations/v3/norrbottenspets-history.webp` |
| 노르웨이안 부훈트 | `exec-ff6a466a-d336-4a34-a379-be33105f1e92.png` | `public/illustrations/v3/norwegian-buhund-history.webp` |

생성 원본은 Codex 생성 이미지 보관 경로에 그대로 두고 프로젝트에는 최적화한 WebP만 설치했다.

## 1. 앙글로 프랑세 드 프티트 베네리 · 역사

```text
Late-19th-century French countryside small-game hunting scene. One balanced and solid but not heavy medium French scenthound dominates the foreground: short dense smooth coat, elongated not-too-broad head, large brown eyes, long flexible drop ears attached below eye level and reaching near the nose, straight strong legs, medium fine open tail. Classic tricolour of white with well-defined black patches and bright tan markings. Avoid spitz ears, curled tail, fluffy white coat and generic puppy proportions.
```

근거: [FCI 표준 325](https://www.fci.be/Nomenclature/Standards/325g06-en.pdf)

## 2. 할덴 하운드 · 역사

```text
Historical Norwegian woodland scent-tracking scene. A proud, strong but not heavy rectangular medium hound with clean balanced head, dark eyes, medium drop ears, dense straight short coat and a thick tail carried naturally low. Predominantly white with defined black patches and tan shading on head and legs; black must not dominate. Avoid an all-white spitz, erect ears, curled tail and long fluffy coat.
```

근거: [FCI 표준 267](https://www.fci.be/Nomenclature/Standards/267g06-en.pdf)

## 3. 히겐 하운드 · 역사

```text
Historical Norwegian forest tracking scene. A solid compact rectangular medium scenthound with a moderately broad head, clean broad muzzle, dark brown eyes, short tapered rounded drop ears, dense slightly rough short coat and a tail carried straight or in only a slight upward curve. Rich red-brown with restrained black shading plus a white blaze, chest, lower legs and tail tip. Avoid spitz anatomy, erect ears, ring tail and all-white coat.
```

근거: [FCI 표준 266](https://www.fci.be/Nomenclature/Standards/266g06-en.pdf)

## 4. 트란실바니안 하운드 · 역사

```text
Historical Carpathian mountain tracking scene. An athletic medium Central-European hound, slightly rectangular and muscular without heaviness, with a longish hound head, dark almond eyes, medium drop ears, short dense glossy coat and long strong legs. Primarily black with sharply defined tan eyebrows, muzzle and legs, and restrained white on chest, toes and tail tip. Tail low with only the lower third gently curved upward, never curled over the back.
```

근거: [FCI 표준 241](https://www.fci.be/Nomenclature/Standards/241g06-en.pdf)

## 5. 폴리시 타트라 셰퍼드 · 역사

```text
Historical Podhale mountain livestock-guarding scene. A large strong compact rectangular white mountain guardian with a lean proportional head, dark slightly slanting eyes, medium triangular drop ears, deep body and straight legs. Long thick straight-to-slightly-wavy hard coat, profuse undercoat, rich neck ruff, thigh furnishings and feathered tail. At rest the tail hangs below the topline to the hock with only the tip gently curved. Avoid erect ears, spitz silhouette, curled tail and short retriever coat.
```

근거: [FCI 표준 252](https://www.fci.be/Nomenclature/Standards/252g01-en.pdf)

## 6. 루마니안 미오리틱 셰퍼드 · 카드

```text
One very large vigorous yet not heavy Romanian Mioritic Shepherd Dog, full body in a calm three-quarter stand. Slightly rectangular, broad powerful neck and chest, medium triangular drop ears, calm dark eyes. Abundant harsh straight hair visually longer than 10 cm across head and body, dense undercoat, shaggy eyebrows and beard, well-furnished tail. White ground with clearly defined ash-grey body patches and dark grey ear tips. At rest the high-set tail hangs to or below the hock with no ring or curl over the back.
```

## 7. 루마니안 미오리틱 셰퍼드 · 역사

```text
Historical Carpathian livestock-guarding scene with shepherd and sheep secondary. The same very large slightly rectangular Mioritic morphology, abundant harsh straight long coat, shaggy eyebrows and beard, white ground with ash-grey patches and dark grey ear tips. The dog stands calmly and its well-furnished tail hangs to or below the hock, never curled or touching the back. Avoid a Komondor corded coat, short coat or white spitz silhouette.
```

근거: [FCI 표준 349](https://www.fci.be/Nomenclature/Standards/349g01-en.pdf)

## 8. 피레니안 마스티프 · 카드

```text
One enormous powerful but balanced Spanish livestock guardian, rectangular and substantial, with a very large broad head, small dark almond eyes, medium triangular drop ears, deep chest and strong limbs. Dense bristly medium-long white coat with a clearly defined medium-grey mask covering ears and eye area plus crisp medium-grey body patches; white lower legs and tail tip. The furnished tail hangs low with a gentle hook. Avoid a pure-white unmasked dog, ring tail and woolly or corded coat.
```

## 9. 피레니안 마스티프 · 역사

```text
Historical Aragonese Pyrenees livestock-guarding scene with shepherd, sheep and stone shelter secondary. Repeat the enormous balanced mastiff morphology, clear medium-grey facial mask and body patches, white lower legs and tail tip, bristly 6–9 cm coat, and low hanging hooked plume. Avoid a pure-white dog, unclear mask, curled tail or generic retriever head.
```

근거: [FCI 표준 92](https://www.fci.be/Nomenclature/Standards/092g02-en.pdf)

## 10. 쿠바츠 · 역사

```text
Historical Hungarian pastoral scene. A large tall athletic white livestock guardian, agile rather than blocky, with a long clean wedge-like head, minimal stop, dark almond eyes, V-shaped drop ears, deep chest and long strong legs. Pure white to ivory, moderately harsh and distinctly wavy coat with a pronounced mane. At rest the tail hangs low to the hock with a slight upward tip and remains below the topline. Avoid a curled tail, short Labrador coat or coloured patches.
```

근거: [FCI 표준 54](https://www.fci.be/Nomenclature/Standards/054g01-en.pdf)

## 11. 슬로바키안 쿠바츠 · 카드

```text
One large impressive white mountain dog with firm constitution, a moderately rectangular body on strong rather high legs, strong longish broad skull, blunt muzzle, dark brown oval eyes, high-set moderate drop ears and black pigment. Light dense white double coat, long 5–15 cm wavy topcoat with pronounced neck mane and no back part. At rest the low-set straight cigar-shaped tail hangs to the hock and is not curled. Avoid erect ears, ring tail and short smooth coat.
```

근거: [FCI 표준 142](https://www.fci.be/Nomenclature/Standards/142g01-en.pdf)

## 12. 노르보텐스펫츠 · 역사

```text
Historical northern Scandinavian woodland hunting scene. A small, slightly rectangular, sinewy Nordic hunting spitz with clean wedge head, dark almond eyes, high-set erect ears and close-lying short hard double coat. Pure white ground with large, well-defined warm red-to-yellow patches covering both sides of head and ears and several substantial body patches. Tail in a high loose curve with the tip touching the upper thigh, not a tight ring. Avoid an all-white coat and scattered ticking.
```

근거: [FCI 표준 276](https://www.fci.be/Nomenclature/Standards/276g05-en.pdf)

## 13. 노르웨이안 부훈트 · 역사

```text
Historical Norwegian farmstead herding scene. A little-under-medium square-built Nordic farm spitz with harmonious wedge head, dark oval eyes, medium pointed erect ears, clean neck and straight legs. Clear warm wheaten or biscuit coat with dense undercoat and hard smooth-lying outer coat, minimal white. High-set tail tightly curled over the centre of the back. Avoid all-white or wolf-grey coat, drop ears, hanging tail and long Samoyed-like fur.
```

근거: [FCI 표준 237](https://www.fci.be/Nomenclature/Standards/237g05-en.pdf)
