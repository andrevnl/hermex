---
name: verify
description: Verify changes in the HERMEX monorepo by running lint, type-check and unit tests for the apps that changed. Use after editing code in apps/web or apps/api, before reporting work as done.
---

Verify the current changes. Run all commands from the repo root.

1. Find which apps changed: `git status --porcelain` (the repo may have no commits yet, so don't rely on `git diff HEAD`). Group paths into `apps/api`, `apps/web`, or root/config.

2. For `apps/api` changes:
   - If `apps/api/prisma/schema.prisma` changed, run `pnpm prisma:generate` first.
   - `pnpm lint:api`
   - `pnpm api exec tsc --noEmit -p tsconfig.json`
   - `pnpm test:api` (unit tests only — do NOT run `test:e2e` unless the user asks; it needs a live Postgres)

3. For `apps/web` changes:
   - `pnpm lint:web`
   - `pnpm web exec tsc --noEmit`

4. For root/config-only changes, run both sets.

Run independent commands in parallel. Report each command's result plainly; on failure, show the relevant error output and fix it if the cause is in the changed code, then re-run that step.
