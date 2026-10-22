# US02 — Criar domínio Category

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Alta

## contexto

O design da home tem um dropdown "Selecione a categoria" que filtra os veículos. As categorias usadas nos cards do design são: Hatch, Sedan, SUV, Minivan, Intermediário, Compacto. Precisamos de um domínio Category no backend com modelo, módulo NestJS e query GraphQL.

Esse domínio é consumido por US01 (relação Vehicle → Category) e US03 (filtro por categoria).

## queries

- `categories` — retorna todas as categorias cadastradas. Sem paginação (lista curta e fixa).

## regras

- Campos do modelo: `id` (cuid), `name` (string, unique), `createdAt`, `updatedAt`.
- A query `categories` retorna ordenado por `name` ASC.
- Seed obrigatório com as categorias do design: Hatch, Sedan, SUV, Minivan, Intermediário, Compacto. (A spec original trazia Picape, que não aparece no design.)
- O seed deve ser idempotente (rodar múltiplas vezes sem duplicar).

## restrições

- Não criar CRUD completo (create, update, delete). Apenas a query de leitura. Categorias são gerenciadas via seed/migration por enquanto.
- Não adicionar campos extras "por precaução" (description, icon, etc). YAGNI.
- Usar `nest generate` pra scaffoldar o módulo — não criar arquivos manualmente.

## stack e padrões

- Scaffold com o Nest CLI: `pnpm api exec nest g module categories` e `pnpm api exec nest g resolver categories`
- Modelo Prisma em `prisma/schema.prisma`
- Model GraphQL em `src/categories/category.model.ts`
- Resolver em `src/categories/categories.resolver.ts`
- Injetar `PrismaService` no resolver (ainda não há outro resolver de domínio; esta é a primeira query com Prisma)
- ESM: imports relativos terminam em `.js` (inclusive `../generated/prisma/client.js`)
- Testes com Vitest (`*.spec.ts`), mockando o `PrismaService`
- Seed em `prisma/seed.ts` (criar se não existir), registrado em `prisma.config.ts` (`migrations.seed`) — Prisma 7 não lê o seed do `package.json`. Ainda não há executor de TypeScript na API: instalar com `pnpm api add -D tsx` e usar `seed: 'tsx prisma/seed.ts'`
- Importar `CategoriesModule` no `AppModule`

## critérios de aceite

- query `categories` retorna lista de categorias com `id` e `name`
- categorias estão ordenadas por nome
- seed cria as 6 categorias (Hatch, Sedan, SUV, Minivan, Intermediário, Compacto)
- seed roda múltiplas vezes sem erro ou duplicata
- módulo importado e funcionando no `AppModule`

## verificação

- rodar `pnpm test:api` — todos os testes devem passar
- rodar `pnpm api exec prisma db seed` e confirmar categorias no banco (`pnpm prisma:studio`)
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que usou `nest generate` e não criou arquivos manualmente
