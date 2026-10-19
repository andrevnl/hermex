# HERMEX

Locadora de veículos — monorepo PNPM.

| App | Stack | Porta |
| --- | --- | --- |
| `apps/web` | Next.js 16 (App Router) · Tailwind 4 · Auth.js v5 · atomic design | 3000 |
| `apps/api` | Nest.js 12 · GraphQL (code-first, Apollo) · Prisma 7 | 3001 |
| Postgres | `postgres:17` via `docker-compose.yaml` | 5432 |

## Primeiros passos

```bash
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local   # preencha AUTH_SECRET (npx auth secret)

pnpm db:up            # sobe o Postgres
pnpm prisma:generate  # gera o Prisma Client em apps/api/src/generated
pnpm dev              # web + api em paralelo
```

- GraphQL: http://localhost:3001/graphql (GraphiQL em dev) — `{ health }`
- Web: http://localhost:3000 — `/dashboard` é protegida e redireciona para `/login`

## Scripts (raiz)

| Script | O que faz |
| --- | --- |
| `pnpm dev` / `dev:web` / `dev:api` | Ambiente de desenvolvimento |
| `pnpm build` / `build:web` / `build:api` | Build |
| `pnpm lint:web` / `lint:api` / `test:api` | Lint e testes |
| `pnpm db:up` / `db:down` / `db:logs` | Postgres no Docker |
| `pnpm prisma:generate` / `prisma:migrate` / `prisma:studio` | Prisma |
| `pnpm web <cmd>` / `pnpm api <cmd>` | Qualquer comando no app, ex.: `pnpm api add zod` |

## Front-end: atomic design

```
apps/web/src/components/
  atoms/       Button, Input, Label
  molecules/   FormField
  organisms/   LoginForm
  templates/   AuthTemplate
```

As "pages" do atomic design são as rotas em `src/app`. Cada nível exporta pelo seu `index.ts`.

## Autenticação

Auth.js v5 com provider Credentials em `apps/web/src/auth.ts`. O `authorize()` ainda retorna `null`
(TODO: chamar a mutation de login da API). A proteção de rotas fica em `src/proxy.ts`
(o antigo `middleware.ts` no Next 16) via callback `authorized`.
