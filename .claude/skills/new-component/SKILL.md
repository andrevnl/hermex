---
name: new-component
description: Create a new React component in apps/web following the project's atomic design structure (atoms, molecules, organisms, templates). Use when adding a UI component to the web app.
argument-hint: <level> <ComponentName>
---

Create a component in `apps/web/src/components/<level>/` where level is `atoms`, `molecules`, `organisms` or `templates`. Arguments: $ARGUMENTS. If the level or name is missing, infer the level from the component's role (single UI element → atom; small group of atoms → molecule; page section → organism; page layout → template) and say which you chose.

1. Create `<level>/<Name>/<Name>.tsx` with a named export (`export function <Name>`), no default export. Follow `atoms/Button/Button.tsx` as the style reference:
   - Props typed with `type <Name>Props = ...`, extending the relevant HTML attributes when wrapping a native element, and spreading `...props`.
   - Tailwind classes composed with template strings, accepting a `className` prop (default `""`). No clsx/cva.
   - Double quotes, semicolons (Next defaults).
   - Only add `"use client"` if it needs state, effects or event handlers defined inside it.
2. Create `<level>/<Name>/index.ts` containing `export * from "./<Name>";`.
3. Add `export * from "./<Name>";` to `<level>/index.ts`, keeping entries alphabetical.
4. Compose from lower levels via barrel imports (`@/components/atoms`), never deep paths.
5. Any user-facing text in pt-BR.

Finish by running `pnpm lint:web`.
