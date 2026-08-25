# Decision log

## 2026-08-01 — Product outcome

The product provides evidence, candidate conditions, and comparisons. It does not declare one breed to be the correct answer for a user.

## 2026-08-01 — Experience direction

Use an edited exhibition-like atlas rather than a uniform database grid. The detail story flows from original role to behavioral tendencies, modern household responsibility, owner experience, and related breeds.

## 2026-08-01 — MVP boundary

Build one vertical journey with five draft breeds before adding community, login, games, or a backend.

## 2026-08-01 — Styling

Use CSS Modules plus global CSS custom properties. This product has bespoke editorial scenes and responsive storytelling layouts; Tailwind and runtime CSS-in-JS add limited value for the MVP.

## 2026-08-01 — Visual assets

Use a consistent illustration language for hero and history/role scenes. Use only clearly licensed photographs for factual appearance checking. Unreviewed generated imagery must not be presented as a reliable depiction of breed conformation.

## 2026-08-01 — Responsive QA references

Use 1920px desktop, 1440px laptop, 768px tablet, and 390px mobile as the required visual QA widths. The shared content gutter is 16px per side and the shared content maximum is 1440px. Individual text blocks retain their narrower reading measures inside that common container.

Existing component breakpoints remain purpose-specific: home reflows at 960/767/420px, detail at 900/767px, comparison cards at 700px, and compact header navigation at 560px. New breakpoints should reuse one of these boundaries unless a documented layout constraint requires another value.

## 2026-08-03 — First catalog expansion

Keep the original five breeds as the core editorial cohort and publish the next fifteen as the first complete 20-breed collection. Every detailed breed must include a full-body card illustration, a role-specific history scene, source-backed copy, six shared tendency axes, care notes, and related-breed links. The remaining 140 master entries stay discovery metadata until the same content standard can be met.

## 2026-08-03 — Second catalog expansion

Add ten more source-backed detailed breeds with the same card and history illustration standard, bringing the published collection to 30. Keep every discovery card as a complete adult-dog view with ears, paws, and tail uncropped. The remaining 130 master entries stay discovery metadata.

## 2026-08-04 — Third catalog expansion

Add ten detailed breeds spanning spitz, herding, guardian, terrier, companion, and giant working roles, bringing the published collection to 40. Continue to require source-backed copy, a full-body card illustration, and a role-specific history scene for every published breed.

## 2026-08-04 — Fourth catalog expansion and card gaze

Add ten detailed breeds spanning coach dog, toy companion, sighthound, pointing, retrieving, herding, guardian, and terrier histories, bringing the published collection to 50. Card illustrations keep breed-specific adult proportions and relative visual weight, use a natural standing or slight three-quarter body pose, and turn the face and both eyes toward the viewer. History illustrations use the breed data's original role and region as the scene source, avoid harmful spectacle and unsupported folklore, and keep the existing subdued watercolor-and-pencil atlas language.

## 2026-08-04 — Fifth catalog expansion in a controlled batch

Add ten more source-backed detailed breeds across all ten FCI groups, bringing the published collection to 60 while keeping the remaining 100 entries as discovery metadata. Produce and verify this batch independently before continuing so card gaze, breed-specific adult proportions, role-based history scenes, WebP optimization, and data-to-asset links can be checked as one bounded unit.

## 2026-08-04 — Sixth catalog expansion

Add ten source-backed detailed breeds spanning cattle work, guarding, terrier work, northern hunting, scent tracking, pointing, retrieving, companionship, and sighthound histories. Bring the published collection to 70 and keep the remaining 90 entries as discovery metadata. Continue the bounded ten-breed workflow with direct-gaze full-body cards, role-and-region history scenes, WebP-only delivery, and browser-level asset verification.

## 2026-08-04 — Seventh catalog expansion

Add ten source-backed detailed breeds across herding, guarding, terrier, spitz, hound, pointing, retrieving, companion, and sighthound histories. Bring the published collection to 80 and keep the remaining 80 entries as discovery metadata. Complete and connect the data first, then create direct-gaze full-body cards and role-based history scenes as WebP assets, and finish with a focused data-to-asset mapping check.

## 2026-08-05 — Eighth catalog expansion

Add twenty source-backed detailed breeds across herding, farm work, guarding, terrier work, northern hunting, scent tracking, pointing, water work, companionship, and sighthound histories. Bring the published collection to 100 and keep the remaining 60 entries as discovery metadata. Preserve breed-specific adult proportions and direct-gaze full-body cards, depict difficult histories without harmful spectacle, deliver WebP-only assets, and validate only the new batch's data-to-asset mapping.

## 2026-08-09 — Living project status document

Use `docs/project-status.md` as the single current-state entry point for product, design, code, content coverage, assets, and verification. Keep detailed specifications and historical proposals in their existing documents, indexed by `docs/README.md`. Every material change to scope, UI, architecture, content counts, asset coverage, or verification status must update the living status document in the same change. When historical documents disagree with the implementation state, record the difference and use current code and tests for factual counts without overriding the product principles in the brief and decision log.

## 2026-08-09 — Complete the registered non-FCI catalog entries

Publish source-backed detail pages and distinct visual assets for the American Pit Bull Terrier and American Bully, bringing all 367 current master entries to detailed status. Attribute their identity and conformation information to the United Kennel Club rather than presenting them as FCI breeds. Keep behavior language individual and contextual, avoid stigmatizing or promotional claims, and foreground functional anatomy, safe management, local regulations, and housing constraints.

The next inclusion policy should consider well-documented regional landraces such as the Mongolian Bankhar without mislabeling them as standardized registry breeds. Require a stable local identity, a documented continuing role, institutional or peer-reviewed evidence, and a clear boundary from aliases or neighboring dog populations before adding a landrace track.

## 2026-08-10 — Broaden catalog inclusion beyond registry breed lists

Adopt `docs/catalog-inclusion-policy.md` as the editorial basis for distinguishing internationally registered breeds, nationally protected heritage dogs, nationally registered populations, verified landraces, documented candidates, and unverified names. FCI absence is not an exclusion criterion, and online name repetition is not sufficient evidence for inclusion.

Treat Gyeongju Donggyeongi as a nationally protected heritage dog and the Mongolian Bankhar as a candidate verified landrace. Preserve registration and evidence provenance in the UI and content instead of forcing every population into a single standardized-breed model. Schema and UI support remain follow-up work; do not present the proposed categories as already implemented.
# 2026-08-10 — Publish Mongolian Bankhar as the first verified landrace case

Add Mongolian Bankhar as a source-backed detailed catalog entry, while describing it as a regional livestock-guardian landrace rather than a standardized international breed. Keep the current `non-fci` registry value until the inclusion-type schema is implemented, state that limitation in the editorial policy, avoid fixed conformation and lifespan claims, and center the detail page and visual assets on pastoral working context, population variation, experienced management, and heat-safe care.

# 2026-08-10 — Add multi-perspective category exploration to home

Add a responsive home explorer built around six question-shaped lenses: original work, daily rhythm, coat and climate care, human relationship, stimulus response, and living space. Keep the existing catalog group as internal data, use curated representative breed sets for the first UI pass, and avoid recommendation scores or one-breed answers. The full taxonomy can expand behind these lenses after source-reviewed fields are normalized.

# 2026-08-10 — Reduce home category choice and add visual results

Collapse the six home questions into three faster entry points: life and original work, living requirements, and relationship and responses. Keep finer axes available through quick-exploration chips, and show representative result breeds with their existing full-body illustrations so users can scan visually before opening a detail page.

# 2026-08-10 — Make breed discovery a URL-addressable filter page

Add `/discover` as the dedicated discovery route. Normalize the existing Korean tendency labels and free-form size strings in a filter-only adapter, preserve the original Breed data, use OR within a filter axis and AND across axes, and synchronize valid selections to query parameters. Do not invent housing suitability, exercise hours, beginner suitability, management scores, popularity, or recommendation rankings. Keep the existing editorial role/history explorer below the factual condition filters.

# 2026-08-11 — Add mobile primary navigation for discovery and comparison

On viewports up to 767px, keep `견종 발견` and `비교하기` reachable through a fixed bottom navigation shared by the site header. Reuse the existing compare selection state and route links, use small inline SVG icons instead of adding an icon dependency, and account for safe-area insets plus bottom content padding. Offset the floating interest-breed tray so it does not overlap the navigation.

# 2026-08-11 — Move carousel controls below the image and support swipe

Anchor the home carousel arrows and position indicator to the lower edge of the hero image so they do not cover the upper illustration. Add horizontal pointer-swipe navigation to the image frame while retaining keyboard arrows and explicit buttons for accessibility and desktop use.

# 2026-08-11 — Match carousel image box proportions

Use a shared 1:1 aspect ratio for the home hero visual across desktop and mobile, matching the existing card illustration format. Let the image frame define its own height from the available width and anchor carousel controls inside that frame, avoiding a viewport-based fixed height that can create mismatched boxes.

# 2026-08-11 — Simplify first-time discovery on home

Replace the home explorer's hardcoded representative slug groups with six plain-language entry points backed by existing tendency filters. Each entry links to `/discover` with a valid query, while role/history exploration remains a separate section so beginners are not asked to interpret multiple taxonomies at once.

# 2026-08-11 — Add editorial browse collections to home

Replace the undifferentiated 368-breed home grid with three non-ranking collections: working roles, regional environments, and unfamiliar breeds. Use existing breed identity and role copy for the cards, and keep the full factual filter experience on `/discover`. Do not label collections as popularity or national top lists without dated, sourced data.

# 2026-08-11 — Add source-backed breed-name stories

Add a compact editorial collection that explains how Pointer, Retriever, Setter, Spaniel, Sheepdog/Shepherd, and Terrier names relate to historical work or word origin. Keep each story source-backed, connect it to existing detailed breeds, and expose the original references in the UI. Explicitly distinguish direct work terms from broader or regional names: Spaniel does not itself name one task, and Shepherd or Sheepdog can refer to either moving livestock or guarding it. Treat names as historical clues rather than predictions of a modern individual dog's behavior.

# 2026-08-11 — Expand name stories into their own browse path

Show four illustrated representative breeds in each home name-story card and label them as representatives rather than the full set. Add `/breed-names/[key]` pages that collect every matching breed already present in the atlas, disclose the matching rule, and preserve links to the original source material. Retire the overlapping home collections for work roles, regional environments, and unfamiliar breeds so the editorial area has one clear purpose. Keep role and history discovery available on `/discover`.

# 2026-08-11 — Clarify mobile filter controls

Group the mobile filter trigger, active-condition count, and clear action into one aligned toolbar. Use `선택 지우기` instead of the broader `전체 초기화`, hide the duplicate clear action beside the mobile result heading, and shorten the result count copy. Present quick presets as an equal-width two-column grid on mobile and let an active preset toggle off when selected again.

# 2026-08-11 — Remove redundant home shortcut cards

Remove the four-card home shortcut block for discovery, comparison, role/history, and unfamiliar breeds. The same destinations remain available through the shared header, the fixed mobile bottom navigation, the search flow, and the lifestyle discovery section, so the extra block adds height and repeats choices without adding a distinct task.

# 2026-08-11 — Use dog-motif icons for home shortcuts

Use dedicated transparent WebP illustration sprites based on clearly differentiated dog gestures and props for the home shortcut and condition menus. Treat them as large watercolor character icons rather than small decorative thumbnails: mobile shortcuts use a two-column horizontal layout, and condition cards give at least half their visual weight to the illustration. Let the card surface show naturally around each cutout instead of embedding a separate paper-colored rectangle. Keep accessible text labels alongside every image, use the atlas's watercolor-and-pencil palette, and avoid emoji or a generic icon-library aesthetic.

# 2026-08-11 Add gentle autoplay to the home carousel

Start the home carousel at the first catalog breed on every visit instead of deriving its initial position from the date. Advance every 2 seconds and crossfade the current and preloaded next image over 600ms so no empty frame appears. Keep one stable outer frame with at most two bounded image layers instead of remounting and transforming the large frame, which can leave stale compositor layers on some mobile browsers. Pause while the carousel is hovered, focused, or being swiped so controls remain usable, and disable autoplay and motion for users who prefer reduced motion. Keep the existing arrows, keyboard navigation, and pointer swipe behavior.

# 2026-08-11 — Remove role/history exploration from discovery

Remove the editorial role/history explorer from the bottom of `/discover` so the route has one clear purpose: factual condition filtering and result browsing. Remove its now-unused interactive state, curated slug groups, result cards, and styles from `CategoryExplorer`, while retaining the six home lifestyle shortcuts that link into factual filters. Historical context remains available in breed detail pages and the source-backed breed-name stories.

# 2026-08-11 — Separate image integrity from breed-appearance approval

Treat local file existence, WebP validity, dimensions, and uniqueness as asset-integrity checks only. They do not establish that an illustration accurately represents a breed. Do not label generated or editorial artwork as `검수된 일러스트` until its morphology has been compared breed by breed with an official standard, national conservation source, or peer-reviewed source.

Review card and history images as one visual unit, recording the source, date, changed paths, and generation prompt. Replace the incorrect spitz-like Sapsaree artwork first and track the seven confirmed high-priority mismatches in `docs/breed-visual-audit.md`. Keep the rest in an unapproved first-pass state rather than claiming that the full 368-image set is accurate.

# 2026-08-11 — Replace morphology mismatches as card/history pairs

Replace the seven confirmed high-priority mismatches and the three additional mismatches found during focused review as card/history pairs, bringing the corrected set to eleven breeds including Sapsaree. Base each new illustration on written morphology from the FCI, the relevant national kennel club, or an official conservation source; do not transform or copy a standard illustration. Preserve the project’s watercolor-and-pencil language while making diagnostic features such as ear set, topline, coat, tail carriage, markings, and the Lundehund’s functional extra toes readable at card size.

Keep the distinction between `교체 완료`, `유지`, `집중 재확인`, and unapproved `1차 점검`. A generated replacement is an editorial correction against the cited source, not expert conformation certification, and the remaining catalog must not be described as fully verified.

# 2026-08-11 — Separate registry status from catalog inclusion

Keep `registryStatus` as a factual description of a registry relationship and add a separate `inclusionType` for the atlas's editorial inclusion basis. An FCI or UKC registration, a nationally protected heritage status, a verified landrace, and a documented local population are different claims and must not be collapsed into one `non-fci` bucket.

Expose the inclusion label and its evidence authority on breed detail pages without changing the original breed copy. Use official heritage records for Sapsaree and Gyeongju Donggyeongi, keep Mongolian Bankhar as `verified-landrace`, and keep Pungsan Dog and Jeju Dog at `documented-population` until stronger first-party conservation evidence is connected.

# 2026-08-11 — Render discovery results progressively

Keep filtering all 368 breeds in memory and keep the result count exact, but render only the first 48 result cards initially and reveal the next 48 on request. This reduces the unfiltered `/discover` DOM from roughly 4,958 elements to roughly 801 without introducing a server API, virtualization dependency, ranking, or pagination state in the URL.

Reset the visible slice whenever the filter query changes. The filter state remains shareable through the existing query parameters; the progressive display count is temporary view state and is not part of the shared condition set.

# 2026-08-12 — Add source-framed curiosity themes to home

Replace the long static home curation about a few individual breeds with an interactive curiosity explorer. Show six visual themes—large build, small build, wrinkled skin, distinctive coats, names at work, and dated dog-show stories—and reveal three existing breed cards immediately when a theme is selected. Link each theme to a dedicated six-breed collection page with its selection note and sources.

Use playful editorial headings, but do not present subjective beauty, popularity, or unsupported world rankings. Treat size collections as examples selected from documented measurements, coat and wrinkle collections as source-framed morphology stories, and dog-show content as a named competition with explicit years. A theme is an invitation to open breed details, not a recommendation or a claim that one feature defines an individual dog.

# 2026-08-12 — Restore exploration state on browser back

Keep transient exploration choices in the current browser history entry rather than in global storage or permanent URL parameters when they do not define a shareable page. Restore the home carousel breed, home curiosity theme, and expanded discovery result count after a user opens a breed detail and returns with browser back. Preserve the existing rule that a genuinely new home visit starts from the first catalog breed, and keep factual discovery filters in the URL as before.

# 2026-08-12 — Separate editorial stories from the home journey

Move `이름 속 견종` and `견종 호기심 탐험` from the home page into a shared `/stories` top-level destination named `견종 이야기`. Keep their existing content, theme interaction, and detail routes, while making the home page focus on service identity, search, and lifestyle-based discovery. Expose the new destination in both the desktop header and mobile bottom navigation.

# 2026-08-13 — Split editorial areas into independent top-level destinations

Replace the shared `/stories` destination with independent `/breed-names` and `/curiosity` top-level pages. Expose both directly in the desktop header and mobile bottom navigation, and keep their existing detail routes beneath the matching top-level path. The home page remains focused on service identity, search, and lifestyle discovery.

# 2026-08-13 — Make editorial indexes direct navigation

Use the `/breed-names` and `/curiosity` indexes as simple topic directories. Each topic card links directly to its matching detail page; do not insert representative-breed previews or an interactive theme preview between the index and detail.

# 2026-08-13 — Enter editorial menus through a default detail

Remove the topic-directory step from the primary journey. Link `이름 속 견종` directly to `/breed-names/pointer` and `호기심 탐험` directly to `/curiosity/distinctive-coats`, while keeping `/breed-names` and `/curiosity` as compatibility redirects. Users switch topics with the horizontal navigation already present on each detail page.

# 2026-08-13 — Add a minimal post-selection beginner guide

Split the breed-detail next action between people still comparing and people who have chosen a breed and need practical first steps. Link every breed detail to one shared `/beginner-guide?breed=[slug]` experience instead of maintaining 368 separate care pages.

Keep the guide intentionally small: what to ask before bringing the dog home, what is actually needed on the first day, how to spend the first three days, and the mindset required for ongoing guardianship. Unlock the steps in order and store progress per breed in local browser storage without authentication. Frame learning as a lifelong practice of observing the individual dog, using reward-based guidance, and seeking trustworthy expertise when needed; do not imply that a beginner must master everything before starting.

# 2026-08-14 — Include established designer-cross names without calling them registered breeds

Add Goldendoodle and Maltipoo as independently searchable detail entries because both names are widely used and users need practical information about them. Introduce a dedicated `designer-cross` inclusion type instead of treating either name as an FCI/UKC breed, landrace, or unverified commercial label.

Lead with the parent-breed combination and variability across Poodle size, cross generation, coat, body size, and behavior. Do not promise hypoallergenicity, non-shedding coats, hybrid vigor, or a fixed temperament. Use Naver results only to identify recurring Korean search questions and rely on GANA, OFA, veterinary references, registered parent-breed sources, and peer-reviewed research for factual copy.

# 2026-08-14 — Simplify the home entry path

Remove the rotating breed carousel, both catalog CTAs, and the large home slogan. Keep the short coverage line and place known-breed search directly in the hero, then offer the six lifestyle choices under `처음이라면 여기부터` as the next path.

The carousel remains available as unused component code for now, but it is no longer part of the home journey. Remove the hidden 370-card home list as well because it provides no visible path and adds unnecessary rendering work. Breed browsing already has a dedicated top-level destination, so the home should expose only the two explicit intents: search a known name or browse by lifestyle.

# 2026-08-14 — Standardize reusable lifestyle product icons

Use one shared product icon for each repeated lifestyle concept instead of creating breed-specific graphics. Build icons from one clear object and at most one supporting cue, use the project moss-and-mint two-tone palette, and keep the final asset transparent and readable at small UI sizes.

Document the system in `docs/product-icon-guide.md`, require creators and generation tools to check existing concept IDs before adding an asset, and preview new icons in their real card context before implementation. Keep company, service, designer, and commercial icon-library names out of generation prompts; references may inform general principles such as clarity and consistency but must not be copied.

# 2026-08-15 — Extend the simplified detail hierarchy to the full catalog

Apply the information hierarchy first validated on the Maltese detail to all 370 catalog entries. Keep one shared detail template, but derive the three priority living points and daily-scene icons from each entry's own care notes, tendency axes, and guardian context instead of copying Maltese-specific advice.

Reuse normalized lifestyle concepts across breeds and add a concept only when a recurring meaning cannot be represented by the existing registry. Require three distinct concepts in each breed's priority cards, keep all six tendency axes available in the expandable section, and preserve the original related-breed and source data. This is an editorial presentation rule, not a claim that three cards exhaust the needs of an individual dog.

# 2026-08-15 — Separate concise facts from source notes

Show size and average lifespan in breed-detail fact rows only when a supported numeric measurement or range is available. Normalize visible values to `cm`, `kg`, and `년`, and keep organization names, source caveats, and editorial status wording in the source section instead of mixing them into the fact value.

Do not invent a standard range for designer crosses, landraces, or breeds whose linked references do not provide one. Omit that fact row until a numeric range is supported, while preserving the original editorial data and linked sources for later review.

# 2026-08-15 — Continue discovery results on scroll

Replace the manual `견종 더 보기` action on `/discover` with incremental infinite scrolling. Render the first 48 results, append another 48 as the user approaches the end, and preserve the expanded count in the current history entry so returning from a breed detail restores the same exploration depth.

Keep a visible, screen-reader-announced loading sentinel and respect reduced-motion preferences. If intersection observation is unavailable, expose all matching results rather than leaving part of the catalog inaccessible.

# 2026-08-15 — Keep long discovery lists easy to traverse

Show one compact directional control after the user has moved well into the `/discover` results. Scrolling down exposes a jump-to-top action; scrolling up changes it to a jump toward the currently rendered list end. Keep it above the mobile bottom navigation and move it above the interest tray when that tray is present.

# 2026-08-16 — Build size collections from the full catalog

Generate the `큰 체구` collection from every catalog entry classified as large or giant by the shared discovery filter. Generate `작은 체구` from every entry classified as small plus every companion-group entry. Do not maintain arbitrary hand-picked limits for these two collections; catalog additions and classification corrections must flow into them automatically.

Replace `이름 속 직업` in `견종 모아보기` with a responsibility-focused collection. Clearly separate the five types managed as dangerous dogs under Korean law from examples restricted in other jurisdictions, and never use breed membership alone to predict an individual dog's behavior. Surface the Korean legal classification on relevant discovery cards, details, and beginner guides with links to official guidance.

Use the global directional scroll control on any sufficiently long page. On `/discover`, keep the main search in normal document flow and expose only a compact, user-opened search dock after the original field has scrolled away.

Apply the same 48-item incremental rendering to every `견종 모아보기` theme, while small collections naturally render in one batch. A jump-to-bottom action must continue following the document end while an infinite list appends new batches.

Keep Pomeranian within the registered German Spitz entry rather than creating a duplicate catalog breed. Use `포메라이언` as the user-facing Korean label and retain common Korean spelling variants as search aliases.

# 2026-08-17 — Expose the four Belgian Shepherd varieties as separate browse entries

Keep the FCI classification explicit: Groenendael, Laekenois, Malinois, and Tervueren remain four varieties under Belgian Shepherd Dog standard 15. For Korean search and comparison, expose each variety as its own catalog and detail entry because the common names and coat-management differences are meaningful user-facing distinctions.

Give every entry its own slug, aliases, card illustration, history illustration, and coat-specific care copy. A search for the umbrella name may return all four entries. Redirect the retired combined detail URL to Malinois for compatibility, and never describe the editorial split as four separate FCI breed registrations.

# 2026-08-17 — Add Boerboel as a registered non-FCI breed

Add the South African Boerboel as a separately searchable, source-backed detail entry using KUSA as the primary breed-standard authority and AKC as a secondary registration reference. Keep `registryStatus` as `non-fci` while using `inclusionType: international-registered`; do not imply FCI recognition.

Use `보어보엘` as the Korean display name and retain `보어보벨` and `보어보얼` as search aliases. Center the editorial treatment on its South African farm-guardian history, large functional build, early training, secure boundaries, visitor management, and experienced handling without treating breed identity as a guarantee of aggression.

# 2026-08-17 — Keep AKC Anatolian Shepherd and FCI Kangal as distinct catalog entries

Add `Anatolian Shepherd Dog` as an AKC-registered, non-FCI catalog entry while retaining the existing FCI `Kangal Shepherd Dog` detail. Their Turkish livestock-guardian histories overlap, but registry definitions are not interchangeable: do not redirect one name to the other or present them as duplicate labels.

Use `아나톨리안 셰퍼드` as the display name, preserve common Korean spellings as search aliases, and link the two details as related reading. The Anatolian entry should emphasize independent flock-guardian judgment, secure boundaries, visitor management, early low-pressure socialization, and the responsibility created by its giant size.

# 2026-08-17 — Make discovery size categories exclusive

Assign every published catalog entry to exactly one discovery size category: small, medium, large, or giant. Do not place boundary labels such as `중대형` in two filters. Normalize a boundary or range to its upper category so space, handling, transport, and care demands are not understated; keep the source-backed adult height and weight range in the detail content.

Fold toy and extra-small labels into small. For a catalog entry that covers several registered size varieties, use the variety represented by the current card as its discovery category and explain the broader variation in the detail copy.

# 2026-08-17 — Unify the wide desktop container

Use the same 1440px maximum container for primary content, editorial collections, comparison, headers, and `/discover` instead of maintaining page-specific width ceilings. Keep readable text measures narrower inside the shared container. On desktop discovery, let result columns form automatically with a 360px minimum card width so a roughly 1400px viewport keeps two generous cards beside the persistent filter and wider screens naturally gain a third column. Preserve the existing two-column tablet layout, mobile filter sheet, and 767px mobile boundary.

# 2026-08-17 — Pilot a readiness assessment for Japanese Spitz

Before extending the beginner guide across the catalog, pilot a 20-question readiness assessment only for Japanese Spitz. Ask one question at a time across housing, time, cost, household, and breed understanding. Express the result as a preparation snapshot rather than a breed-match verdict.

Keep the normalized score separate from non-negotiable conditions such as housing permission, household agreement, a responsible daily carer, emergency-care funding, and the ability to provide regular activity. A failed required condition cannot be offset by a high total score. After the result, reveal the existing four-step arrival checklist so reflection leads to concrete preparation. Other breeds retain the current checklist while the pilot is reviewed.

# 2026-08-18 — Match breed-detail care cards by meaning

Treat `careNotes` and `discoveryTags` as independent editorial lists, not positional pairs. Derive each care card's title and icon from the care description first, and use a same-index discovery tag only when the description has no recognizable lifestyle concept. This prevents grooming advice from appearing under companionship or alone-time headings.

Keep the six visible lifestyle cards conceptually distinct and do not repeat an exact sentence already shown in the history or expanded tendency sections. When a tendency is needed to complete the card set, present a concise contextual paraphrase while preserving the original tendency note in its dedicated section. Maintain catalog-wide regression checks for semantic title matching, unique card concepts, and exact-copy duplication.

# 2026-08-19 — Pilot breed-specific illustrated discoveries on Japanese Spitz

Replace the Japanese Spitz detail's six general lifestyle-advice cards with three illustrated discoveries that explain what is distinctive about this breed: its balanced Spitz silhouette, cheerful and intelligent companion temperament, and alert awareness without treating nonstop barking as an ideal trait. Keep the history, tendency disclosure, preparation action, comparison, and sources unchanged.

Use this as a one-breed pilot before changing the other 375 details. Each discovery combines a dedicated 4:3 editorial illustration with concise source-backed copy; it must reveal a breed-specific appearance or temperament insight rather than restating care tasks common to most dogs.

# 2026-08-19 — Align the Japanese Spitz pilot with observed reader questions

Remove the appearance-only discovery because the detail hero already establishes morphology. Replace the pilot with three questions repeatedly visible in Korean breed-search results and supported by official breed material: people-oriented companionship, alert attention without treating persistent barking as an ideal, and the recurring burden of an abundant double coat.

Do not add a health card to this pilot. Health claims require a different evidence threshold, and the currently reviewed material does not justify presenting one condition as a common defining Japanese Spitz trait. Keep all three cards framed as breed tendencies rather than promises about an individual dog, and use new scene-specific 4:3 editorial illustrations matching the existing atlas watercolor style.

# 2026-08-19 — Prepare but pause the catalog-wide feature-card rollout

Set the long-term direction to replace the remaining generic pre-ownership lifestyle cards with three source-backed, breed-specific illustrated discoveries on every detail page. Do not start the other 375 entries until the user explicitly requests the rollout.

Treat Japanese Spitz as the structural and visual pilot, not as a fixed content taxonomy. Select three non-overlapping topics per breed from reader questions, official breed material, historical role, temperament, and a genuinely distinctive ownership burden. Exclude health claims from this card system until a separate evidence and expert-review policy exists. Preserve all tendency data because discovery filters and comparison depend on it.

Before expanding, move the pilot's page-local data into a Zod-validated local content module, work in small reviewable batches, keep a prompt and source record for every image batch, and add catalog checks for three-card coverage, asset integrity, source linkage, copy uniqueness, and filter stability. The operational handoff is recorded in `docs/breed-feature-card-rollout.md`.

# 2026-08-20 — Start the feature-card rollout with Maltese

Use Maltese as the first small expansion of the Japanese Spitz illustrated feature-card pilot. Replace only the Maltese generic lifestyle-card area with three source-backed cards about close companionship, safe daily routes for a small body, and recurring long-coat care; keep its history, comparison, sources, and existing beginner checklist structure.

Move all published feature-card data out of the detail page and into a Zod-validated local module keyed by breed slug. Keep the other 374 details on the generic card presentation until they are explicitly selected for later batches, and do not extend the Japanese Spitz readiness assessment as part of this visual rollout.

# 2026-08-21 — Explain the breed before asking about fit

Structure each breed detail so readers first learn what is distinctive about the breed, then consider how those traits may appear in daily life, and only afterward move to comparison, readiness, and choice. The three illustrated cards should open with breed knowledge—historical role, characteristic behavior, body structure, coat structure, or meaningful variety—not with a generic training or care instruction.

Follow a breed fact with a practical implication when it helps the reader judge their own environment. Do not require or ban coat topics mechanically: retain coat when its structure, seasonal shedding, grooming burden, or role in recognizing the breed is genuinely distinctive, and prefer a stronger breed-specific subject when it is not. Keep all statements as tendencies or supported characteristics rather than a verdict that a breed will suit a particular person.

# 2026-08-21 — Separate history from present-day breed clues

Let the history section own chronology: when and where the breed formed, what work shaped it, and how its recognized form developed. Do not reuse those facts as the main subject of `견종을 이해하는 출발점` cards.

Use the three opening cards for present-day clues that help a reader judge daily life. Where supported, connect the historical role to tendencies such as attention to movement, cooperation with people, alerting, body control, task persistence, or recovery after activity without presenting the connection as a guarantee. Keep `계통` and `원래 역할` as short Korean noun phrases, and present supported height and weight as separately labeled facts.

# 2026-08-21 — Pilot a growth-stage guide in place of Poodle history

Hide the Poodle history illustration and two chronology paragraphs on the public detail while preserving their data and assets for a reversible comparison. Replace that space with three portraits of the same apricot Miniature Poodle at early growth, middle growth, and adulthood, followed by concrete guardian actions for each broad stage.

Treat month ranges as navigation rather than a medical schedule. Keep vaccination, feeding, neutering, and exercise restrictions individualized through a veterinarian; use multiple primary veterinary and behavior sources instead of adapting one source's table or narrative. Do not infer exact age from an illustration or imply that one Miniature Poodle represents the growth rate of all four Poodle varieties.

# 2026-08-23 — Refocus the Poodle pilot on role, tendency, and daily reality

Supersede the public Poodle growth-stage pilot with one concise Poodle-only detail flow: an expandable four-size summary in the hero, a keyboard-operable three-step connection from retrieving work to present-day tendencies and guardian effort, two practical reality cards, three self-check questions without scoring, and two compact related-breed paths. Keep the shared growth data and assets available but do not render them on the Poodle page.

Remove only the Poodle page's large Labrador comparison block; keep the global comparison navigation, shortlist action, and tray unchanged. Limit the Poodle source disclosure to official sources directly supporting the visible role, size, learning tendency, and coat claims, and keep it collapsed by default.

# 2026-08-23 — Pause and remove the comparison flow

Supersede the earlier comparison decisions for the current product. Remove `/compare`, URL selection resolution, locally saved comparison candidates, the global tray, detail-page candidate actions, comparison-specific detail blocks, navigation entries, sitemap entry, tests, and dedicated image assets. Keep the six tendency axes because discovery filters and editorial content still use them.

Related-breed cards may remain only when they navigate directly to another breed detail and explain a different living condition without ranking, matching, or opening a comparison flow. Treat `shortlist-design-spec.md` and earlier comparison entries as historical records. Reintroducing comparison requires a new explicit product decision and scope.

# 2026-08-24 — Start the new product direction from home

Use the home page as the first bounded redesign before extending the new visual language to discovery or breed details. Lead with the idea that choosing a dog means understanding the life it needs, not selecting an appearance, while preserving direct name search and non-scored condition filtering.

Keep the base surface white and build warmth from cocoa text, oatmeal secondary surfaces, restrained caramel actions, and one original matte 3D daily-life diorama. Do not imitate the colors of familiar Korean services or fill the interface with generic 3D emoji cards. Keep mobile headings at or below 24px and desktop headings at or below 28px, using whitespace and imagery rather than oversized type or colored borders for hierarchy.

Move `이름 속 견종` and `견종 모아보기` into a top-right menu. Keep only `홈` and `견종 발견` in the mobile bottom navigation. Retain all 376 catalog entries and search coverage, but let home start with six familiar editorial examples without calling them a popularity ranking, definitive recommendation, or match result.

# 2026-08-24 — Give discovery a Korea-familiar starting set

Keep all 376 entries searchable and filterable, but do not make the full catalog or seven filter groups compete for attention at the start of `/discover`. Lead with a Zod-validated editorial set of 32 names that are familiar to Korean users: show 12 image cards immediately and place 20 more names behind a native disclosure.

Use current domestic breed-ownership reporting as the strongest input, then broaden beyond its small-companion-dog bias with widely recognized working, herding, hunting, and large breeds already present in the atlas. Do not call the set a popularity ranking, recommendation, or proof of suitability. Move the complete condition filter into an accessible drawer while preserving URL state, result restoration, and the full catalog.

# 2026-08-25 — Adopt the Poodle detail as the breed-detail standard

Use the Poodle detail as the official structural, visual, interaction, and content-order standard for future breed-detail redesigns. Every redesigned detail should move from a concise identity and living-condition hero through background, present-day tendency, daily reality, self-check questions, and direct paths to breeds with different living conditions. Preserve the white, cocoa, oatmeal, and caramel hierarchy; bounded type scale; numbered sections; keyboard-operable desktop steps; mobile hand-scroll cards; restrained transitions; and reduced-motion behavior.

Do not copy Poodle-specific facts or controls into every breed. Four-size selection, water-retriever history, curly-coat care, and Poodle-related breeds remain Poodle content. Research each breed's own supported background and meaningful ownership conditions, and omit or adapt a module when the evidence does not support the same relationship.

Do not convert all remaining details in one mechanical pass. Keep the current Poodle-only branch until a second breed validates the shared boundary, then extract a reusable standard-detail component backed by Zod-validated breed data and optional breed-specific modules. Roll out in small reviewable batches and keep unconverted pages unchanged.

# 2026-08-25 — Apply the detail standard to Japanese Spitz

Use Japanese Spitz as the second implementation of the Poodle-derived detail standard and extract the shared 01–04 structure, story interaction, image-reality carousel, self-check behavior, related-breed paths, and responsive rules into reusable components. Keep Poodle's four-size selector as an optional Poodle-only module.

Adapt the first story step because Japanese Spitz was developed as a companion rather than assigning it an unsupported working role. Connect its formation in twentieth-century Japan to people-oriented attention, then to the daily reality of noticing and alerting to surrounding changes. Use daily activity rhythm and double-coat care as the two practical realities, supported by the existing editorial data and assets.

Do not render a public source disclosure on standard-detail pages. Retain the linked source records internally and keep the visible copy independently structured, concise, and tendency-based.

# 2026-08-25 — Apply the detail standard to Maltese

Use Maltese as the third standard-detail implementation without forcing a working-dog narrative. Start from its documented central Mediterranean background and long history as a companion, connect that background cautiously to choosing proximity to people, and make the guardian-facing third step about daily shared activity rather than claiming that companionship alone determines behavior.

Use small-body household routes and long straight-coat care as the two ownership realities. Keep the three self-check questions concrete, and link directly to Japanese Spitz and Bichon Frise to explain differences in body size, coat structure, alerting, and activity rhythm without calling them recommendations.

Reuse the existing history, companionship, small-body-safety, and coat-care assets. Add one distinct play scene so the hero and five content meanings never reuse an image. Preserve the shared interaction and layout code; Maltese should require data and assets, not a new page branch.

# 2026-08-25 — Apply the detail standard to Bichon Frise

Use Bichon Frise as the fourth standard-detail implementation. Describe its documented companion background through the breed's formation in France and Belgium, then connect that background cautiously to participation with people and the daily need for walking, play, and calm recovery. Replace the older chronology-heavy history copy with an independently structured summary that does not reproduce a single source's sequence.

Use independent rest and curly-coat care as the two ownership realities. Keep the three self-check questions concrete, and link directly to Maltese and Poodle to explain differences in coat structure, household routes, size range, and activity context without presenting a recommendation.

Reuse the existing history, cooperative-learning, independent-rest, and coat-care assets. Add one distinct outdoor play scene so the hero and five content meanings never reuse an image. Preserve the shared component and interaction code; Bichon Frise should be added through validated data rather than a new page branch.

# 2026-08-25 — Apply the detail standard to all 32 Korea-familiar breeds

Convert every breed in the `익숙한 이름` discovery set to the official 01–04 detail standard. Keep Poodle's four-size module, preserve the three individually authored standard details, and add the remaining 28 through a shared validated factory backed by each breed's existing sources, role clues, feature cards, care realities, and related-breed reasons. Require an automated coverage assertion so changes to the familiar set cannot silently return a breed to the legacy detail.

Do not mechanically expose each breed's chronology-heavy legacy history. Use the concise role or formation clue for the first step, the breed-specific current-tendency card for the second, and the guardian-facing daily reality for the third. Retain internal source records, variation cautions, three concrete self-check questions, and direct related-breed paths. A shared structure must not turn breed content into a recommendation or claim that every individual behaves the same way.

Preserve existing history and feature assets where their meanings are distinct. Add one daily-rhythm scene to the 19 breeds that already have three feature cards, and create three standard-local feature scenes plus one daily-rhythm scene for the nine familiar breeds without feature sets. Keep every hero and five content images distinct, use one adult dog per scene, and validate local WebP existence, dimensions, file budgets, and cross-section uniqueness.

# 2026-08-25 — Add present-day work only where direct evidence exists

Add an optional `오늘도 이어지는 역할` module inside the past-to-present section instead of forcing a job label onto every breed. Start with Labrador Retriever, Golden Retriever, German Shepherd Dog, and Dobermann because guide-dog schools, an operating police service, FCI, and the Royal Kennel Club directly document their guide, detection, patrol, search-and-rescue, protection, or tracking roles.

Connect each role to the attention, adaptability, environmental confidence, or handler cooperation the work requires, but do not present these as guaranteed breed personalities. Keep role-specific source URLs in validated editorial data and require a visible caution that professional working dogs are individually selected and trained. Distinguish current operation from historical police or military use, especially for the Dobermann.

# 2026-08-25 — Compare past and present roles in the detail hero

Replace the standard-detail `계통` card with `과거 역할` and change the former original-role position to `현재 역할`. When the role has effectively continued into the present, do not duplicate it: combine it into one `과거부터 현재까지` card and use a three-card layout. Only show guide, detection, herding, sport, or other present-day work when supported; otherwise describe the current role simply as companion.
