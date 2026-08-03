# Batch A image prompts

Generated on 2026-08-03 with the built-in `imagegen` workflow. Existing Border Collie and Maltese illustrations were used only as visual style references.

## Card illustration common prompt

- Use case: square dog-breed atlas card illustration.
- Style: refined natural-history watercolor and colored-pencil realism on soft ivory paper, pale sage ground, restrained earth palette, fine anatomical detail, gentle paper texture.
- Composition: one healthy adult dog, full body standing in a natural three-quarter pose, centered with at least 12% safe margin around ears, paws, and tail.
- Accuracy: recognizable breed proportions, coat texture, ears, muzzle, legs, and tail; calm neutral expression.
- Exclusions: no text, letters, logo, watermark, collar, harness, clothes, toys, furniture, people, decorative frame, cropped anatomy, puppy-like exaggeration, or cartoon styling.

### Card breed traits

| Slug | Breed-specific direction |
| --- | --- |
| `chihuahua` | Smooth-coat fawn Chihuahua; tiny yet proportionate adult body, apple-shaped head, large upright ears, large dark eyes, fine legs, gently carried tail. The QA-approved pilot generation was selected. |
| `shih-tzu` | Adult Shih Tzu with long flowing cream-and-white coat, darker ears and facial markings, short muzzle, round dark eyes, and a plumed tail carried over the back; natural coat rather than show accessories. |
| `poodle` | Black/dark-brown Miniature Poodle; square athletic outline, dense naturally curly coat, long refined muzzle, dropped ears, and high-carried tail; functional natural trim without an elaborate show clip. |
| `dachshund` | Standard smooth black-and-tan Dachshund; long low body, deep chest, short sturdy legs, elongated muzzle, pendant ears, and straight tapered tail. |
| `beagle` | Adult tricolor Beagle; compact hound proportions, tan head, black saddle, white chest/legs/tail tip, broad pendant ears, sturdy legs, and alert but calm stance. |
| `english-cocker-spaniel` | Adult blue-roan English Cocker Spaniel; compact sporting build, softly domed head, long low-set feathered ears, moderate leg and chest feathering, and a natural tail. |
| `labrador-retriever` | Adult black Labrador Retriever; sturdy athletic build, broad head, kind eyes, short dense water-resistant coat, pendant ears, deep chest, and thick otter tail. |
| `golden-retriever` | Adult Golden Retriever in a rich mid-gold coat; balanced athletic build, kind expression, broad head, feathered chest/legs/tail, and natural flowing coat. |

## History illustration common prompt

- Use case: wide educational breed-atlas history scene.
- Style: refined natural-history watercolor and colored-pencil realism, soft ivory paper edges, muted sage and earth palette, accurate period detail, museum field-guide tone.
- Composition: exact 3:2 horizontal scene; the principal dog must be fully visible and anatomically credible within a coherent historical setting.
- Editorial rule: show a restrained, supportable working or companion context rather than romanticized origin mythology.
- Exclusions: no text, letters, signage, logo, watermark, decorative border, modern collar or harness, modern objects, violence, injury, blood, spectacle, or exaggerated heroism.

### History scenes

| Slug | Scene direction |
| --- | --- |
| `chihuahua` | Late-19th-century northern Mexican domestic courtyard or village edge, representing modern breed formation rather than an invented ancient ritual; a smooth adult companion dog near a seated local family member, with adobe construction and dry highland vegetation. No royal, religious, or archaeological claims. |
| `shih-tzu` | Late-Qing Chinese palace-garden domestic companion scene; an adult Shih Tzu near a calm palace household caretaker, with understated period clothing, courtyard, stone path, and garden. No ceremony, costume on the dog, or spectacle. |
| `poodle` | 18th- to 19th-century central European wetland water retrieval; a medium-small poodle-type dog with dense functional curls emerges from shallow water carrying one waterfowl gently, with a period waterfowler in the distance. No elaborate clip, active shooting, or blood. |
| `dachshund` | 19th-century German woodland; an adult standard smooth Dachshund scent-tracks at the edge of a badger burrow while a forester observes. The badger remains unseen; no confrontation, trap, weapon use, or injury. |
| `beagle` | Restrained 19th-century English countryside scent-hunting scene; a small pack of three adult Beagles works nose-to-ground across hedgerow pasture while two foot hunters remain distant. No visible prey, mounted spectacle, or weapon use. |
| `english-cocker-spaniel` | Late-19th-century English woodland edge; an adult English Cocker moves through bracken and cover as a woodcock lifts safely, while a gamekeeper observes and gestures. No shot, fallen bird, or blood. |
| `labrador-retriever` | Early-19th-century Newfoundland coastal fishing scene; a sturdy black St. John's water-dog type stands in shallow cold water helping two fishers bring a rope line to a small wooden boat, with accurate work clothes and rocky coast. No modern gear, storm drama, or heroic-rescue framing. |
| `golden-retriever` | Late-19th-century Scottish Highlands estate retrieval; an early Golden Retriever gently carries retrieved waterfowl from a reed-fringed loch toward a gamekeeper, with muted hills and weather. No active shooting, blood, or trophy framing. |

## Output and QA status

- Final card assets: WebP, 1024 x 1024, quality 88, in `public/illustrations/v2/`.
- Final history assets: WebP, 1536 x 1024, quality 88, in `public/illustrations/v3/`.
- PNG generation intermediates are retained beside the WebP files for review and future regeneration decisions.
- All 16 final images were visually checked for breed recognition, complete anatomy, cropping, accidental text, and scene adherence.
- Regeneration: none required. For Chihuahua card, the previously generated QA-approved pilot was used instead of the unused alternate generation.
- Data wiring: all eight `illustration` and `historyVisual.src` entries in `src/content/breeds/detail-batch-a.ts` point to the final WebP assets.
