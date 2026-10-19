# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

HERMEX is a vehicle rental system (locadora de veículos): a pnpm workspaces monorepo with `apps/web` (Next.js 16, port 3000) and `apps/api` (NestJS + GraphQL code-first + Prisma 7, port 3001), backed by Postgres in docker-compose.

## Commands

Run everything from the repo root, never `cd` into an app:
- `pnpm api <cmd>` / `pnpm web <cmd>` — pass-through to `pnpm --filter` (e.g. `pnpm api add zod`, `pnpm web lint`)
- Dependencies: ALWAYS install through the pnpm CLI (`pnpm api add <pkg>`, `pnpm web add -D <pkg>`, `pnpm install`) and NEVER edit any `package.json` by hand — not to add, remove or bump packages.
- `pnpm dev` (both), `pnpm dev:web`, `pnpm dev:api`
- `pnpm db:up` before anything that touches the DB
- `pnpm prisma:generate` after install or any `schema.prisma` change — the client in `apps/api/src/generated/prisma` is gitignored; `pnpm prisma:migrate` for new migrations
- Lint: `pnpm lint:web` (ESLint), `pnpm lint:api` (oxlint `--type-aware`, not ESLint)
- Format: only the API has Prettier (`pnpm api format`; single quotes, trailing commas). Web follows Next defaults (double quotes, semicolons) with no formatter.
- Tests: `pnpm test:api` (Vitest, `*.spec.ts`). Only run unit tests when verifying; skip `pnpm api test:e2e` unless asked (it needs a live DB).

## API (apps/api)

- ESM (`"type": "module"`, `nodenext`): relative imports must end in `.js` (e.g. `./app.module.js`), including imports of the generated Prisma client (`../generated/prisma/client.js`).
- Prisma 7: the DB URL comes from `prisma.config.ts` (`DATABASE_URL`), not the `datasource` block; the client uses the `PrismaPg` adapter via `PrismaService`.
- New modules (domains) are scaffolded with the Nest CLI, never by hand: `pnpm api exec nest g resource <name>` (choose "GraphQL (code first)"), or `nest g module|resolver|service <name>` for individual pieces. Then adjust the output to the conventions here (`.js` import suffixes, Vitest specs, Prisma via `PrismaService`).
- `src/schema.gql` is auto-generated from resolvers — don't edit it by hand.
- oxlint enforces `no-floating-promises`.

## Web (apps/web)

- Next.js 16 has breaking changes vs. training data: read the relevant guide in `apps/web/node_modules/next/dist/docs/` before writing Next code (see `apps/web/AGENTS.md`, which `next dev` regenerates — leave it).
- Route protection lives in `src/proxy.ts` (replaces `middleware.ts` in Next 16). `cacheComponents` is on: wrap dynamic/async data (e.g. `auth()`) in `Suspense`.
- Auth is Auth.js v5 Credentials (`src/auth.ts`); `authorize()` is a TODO stub that should call the API's GraphQL login mutation.
- Components follow atomic design in `src/components/{atoms,molecules,organisms,templates}`: one folder per component (`Name/Name.tsx` + `Name/index.ts`), re-exported from the level's `index.ts`; import via `@/components/<level>`. Pages are the routes in `src/app`.
- Styling: Tailwind 4 with template-string `className` composition (no clsx/cva); theme tokens in `globals.css`.

## Conventions

- Identifiers in English; comments, docs, UI strings and GraphQL descriptions in pt-BR.
- Commits: Conventional Commits in pt-BR, scoped by app — e.g. `feat(api): adiciona resolver de veículos`.
- Env: root `.env` (Postgres), `apps/api/.env`, `apps/web/.env.local` — each has a `.env.example`.
