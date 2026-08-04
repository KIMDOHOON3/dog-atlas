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
