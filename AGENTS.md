# Dog Atlas project guidance

Read `docs/product-brief.md`, `docs/mvp-scope.md`, `docs/decisions.md`, and
`docs/design-visual-guide.md` before changing product behavior or UI.

## Product principles

- Invite users with curiosity and warmth, then support responsible decisions.
- Be kind in expression, rigorous with information, and leave the decision to the user.
- Present breed traits as tendencies, never guarantees about an individual dog.
- Do not recommend one breed as a definitive answer.
- Prefer accessible, fast, mobile-first storytelling over decorative complexity.

## Technical direction

- Next.js App Router with strict TypeScript.
- CSS Modules and global CSS custom properties; do not add Tailwind or runtime CSS-in-JS without a documented reason.
- Keep MVP content local and validate its schema with Zod.
- Avoid a database, authentication, CMS, global state library, PWA, and community features in the MVP.
- Respect `prefers-reduced-motion` and keep essential content available without animation.

## Verification

- Run the available lint, typecheck, test, and build scripts after material changes.
- Do not present editorial draft content as veterinary or behavior-expert-reviewed fact.
