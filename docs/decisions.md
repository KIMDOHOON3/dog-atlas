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

Use 1920px desktop, 1440px laptop, 768px tablet, and 390px mobile as the required visual QA widths. The shared content gutter is 16px per side and the standard content maximum is 1200px; the comparison page alone may expand to 1440px for wide side-by-side reading.

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

# 2026-08-11 ??Add mobile primary navigation for discovery and comparison

On viewports up to 767px, keep `견종 발견` and `비교하기` reachable through a fixed bottom navigation shared by the site header. Reuse the existing compare selection state and route links, use small inline SVG icons instead of adding an icon dependency, and account for safe-area insets plus bottom content padding. Offset the floating interest-breed tray so it does not overlap the navigation.

# 2026-08-11 ??Move carousel controls below the image and support swipe

Anchor the home carousel arrows and position indicator to the lower edge of the hero image so they do not cover the upper illustration. Add horizontal pointer-swipe navigation to the image frame while retaining keyboard arrows and explicit buttons for accessibility and desktop use.

# 2026-08-11 ??Match carousel image box proportions

Use a shared 1:1 aspect ratio for the home hero visual across desktop and mobile, matching the existing card illustration format. Let the image frame define its own height from the available width and anchor carousel controls inside that frame, avoiding a viewport-based fixed height that can create mismatched boxes.

# 2026-08-11 ??Simplify first-time discovery on home

Replace the home explorer's hardcoded representative slug groups with six plain-language entry points backed by existing tendency filters. Each entry links to `/discover` with a valid query, while role/history exploration remains a separate section so beginners are not asked to interpret multiple taxonomies at once.

# 2026-08-11 ??Add editorial browse collections to home

Replace the undifferentiated 368-breed home grid with three non-ranking collections: working roles, regional environments, and unfamiliar breeds. Use existing breed identity and role copy for the cards, and keep the full factual filter experience on `/discover`. Do not label collections as popularity or national top lists without dated, sourced data.

# 2026-08-11 — Add source-backed breed-name stories

Add a compact editorial collection that explains how Pointer, Retriever, Setter, Spaniel, Sheepdog/Shepherd, and Terrier names relate to historical work or word origin. Keep each story source-backed, connect it to existing detailed breeds, and expose the original references in the UI. Explicitly distinguish direct work terms from broader or regional names: Spaniel does not itself name one task, and Shepherd or Sheepdog can refer to either moving livestock or guarding it. Treat names as historical clues rather than predictions of a modern individual dog's behavior.

# 2026-08-11 — Expand name stories into their own browse path

Show four illustrated representative breeds in each home name-story card and label them as representatives rather than the full set. Add `/breed-names/[key]` pages that collect every matching breed already present in the atlas, disclose the matching rule, and preserve links to the original source material. Retire the overlapping home collections for work roles, regional environments, and unfamiliar breeds so the editorial area has one clear purpose. Keep role and history discovery available on `/discover`.

# 2026-08-11 ??Use dog-motif icons for home shortcuts

Use dedicated transparent WebP illustration sprites based on clearly differentiated dog gestures and props for the home shortcut and condition menus. Treat them as large watercolor character icons rather than small decorative thumbnails: mobile shortcuts use a two-column horizontal layout, and condition cards give at least half their visual weight to the illustration. Let the card surface show naturally around each cutout instead of embedding a separate paper-colored rectangle. Keep accessible text labels alongside every image, use the atlas's watercolor-and-pencil palette, and avoid emoji or a generic icon-library aesthetic.

# 2026-08-11 Add gentle autoplay to the home carousel

Start the home carousel at the first catalog breed on every visit instead of deriving its initial position from the date. Advance every 2 seconds and crossfade the current and preloaded next image over 600ms so no empty frame appears. Keep one stable outer frame with at most two bounded image layers instead of remounting and transforming the large frame, which can leave stale compositor layers on some mobile browsers. Pause while the carousel is hovered, focused, or being swiped so controls remain usable, and disable autoplay and motion for users who prefer reduced motion. Keep the existing arrows, keyboard navigation, and pointer swipe behavior.
