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
