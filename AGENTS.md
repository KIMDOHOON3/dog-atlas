# Dog Atlas project guidance

Read `docs/project-status.md` first for the current product, design, code, and
delivery state. Then read `docs/product-brief.md`, `docs/mvp-scope.md`,
`docs/decisions.md`, and `docs/design-visual-guide.md` before changing product
behavior or UI. Use `docs/README.md` to find more specialized documents.

After a material change to product scope, UI, architecture, content coverage,
assets, or verification status, update `docs/project-status.md` in the same
change. Keep it concise and factual; detailed history belongs in the decision
log or a specialized document.

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
