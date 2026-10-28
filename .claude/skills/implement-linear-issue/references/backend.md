# Backend (apps/api)

NestJS + GraphQL code first + Prisma 7. As regras gerais estão no `CLAUDE.md`; este arquivo destaca o que importa no fluxo da issue.

## Implementação

- Scaffold sempre pelo Nest CLI, nunca à mão: `pnpm api exec nest g resource <nome>` (GraphQL code first) ou `nest g module|resolver|service <nome>`. Depois ajuste a saída às convenções abaixo.
- ESM: imports relativos terminam em `.js`, inclusive `../generated/prisma/client.js`.
- Acesso ao banco via `PrismaService` injetado.
- Mudou `prisma/schema.prisma`: `pnpm db:up`, `pnpm prisma:migrate` (migração com nome descritivo) e `pnpm prisma:generate`.
- Seed em `prisma/seed.ts`, registrado em `prisma.config.ts` (`migrations.seed`) — idempotente (`upsert`).
- Registre o novo módulo no `AppModule`.
- Não edite `src/schema.gql` — é gerado a partir dos resolvers.
- Descrições GraphQL (`description`) em pt-BR.
- Dependências só pelo CLI: `pnpm api add <pkg>`.

## Testes

- Vitest, arquivos `*.spec.ts` ao lado do código, mockando o `PrismaService`.
- Cubra as regras da spec (ordenação, filtros, paginação, validações), não só o caminho feliz.
- `pnpm test:api` para os unitários. `pnpm api test:e2e` só se o usuário pedir (precisa de Postgres rodando).
- Formatação: `pnpm api format`.
