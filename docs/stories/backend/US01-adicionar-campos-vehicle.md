# US01 — Criar domínio Vehicle (com `category`, `imageUrl` e `transmission`)

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Alta

## contexto

O projeto ainda **não tem** o modelo Vehicle: o `schema.prisma` só tem o generator e o datasource, não há migrations e o único resolver é o `health`. Esta story cria a tabela e a query `vehicles` do zero, já com os campos que o design da home pede.

O design da home mostra cards com imagem, nome, categoria + câmbio (ex: "Hatch Manual", "SUV Automático") e preço da diária. Precisamos desses dados no backend antes de qualquer integração no frontend.

A relação com Category é 1:N — uma categoria tem muitos veículos, um veículo pertence a uma categoria. Depende de US02 existir primeiro (ou ser feita junto na mesma migration).

## queries

- `vehicles` — query nova, retorna a lista de veículos com `category { id, name }`

## regras

- Campos do modelo Vehicle:
  - `id` (cuid)
  - `brand`: String (ex: "Hyundai")
  - `model`: String (ex: "HB20 1.0")
  - `year`: Int
  - `licensePlate`: String, unique
  - `dailyRate`: valor da diária (Decimal no banco, exposto como Float no GraphQL)
  - `available`: Boolean, default `true`
  - `imageUrl`: String opcional. Caminho/URL da imagem do veículo.
  - `categoryId`: relação obrigatória com o modelo Category (FK)
  - `transmission`: `MANUAL` | `AUTOMATIC`. O design mostra "Hatch Manual", "Hatch Automático" — a transmissão é do veículo, não da categoria.
  - `createdAt`, `updatedAt`
- A query `vehicles` deve incluir a categoria no retorno via relation do Prisma (não fazer N+1).
- `imageUrl` guarda o caminho relativo da foto servida pelo web (ex: `/images/cars/hb20.png`). As fotos ficam em `apps/web/public/images/cars/`.
- Seed idempotente (upsert por `licensePlate`) com os 9 veículos do design, no mesmo `prisma/seed.ts` de US02. Marca e modelo foram escolhidos para que `"${brand} ${model}"` reproduza o nome do card:

| brand | model | categoria | transmission | dailyRate | imageUrl |
|-------|-------|-----------|--------------|-----------|----------|
| Hyundai | HB20 1.0 | Hatch | MANUAL | 120 | `/images/cars/hb20.png` |
| Honda | City | Hatch | AUTOMATIC | 130 | `/images/cars/honda-city.png` |
| Jeep | Renegade 1.3 | SUV | AUTOMATIC | 140 | `/images/cars/renegade.png` |
| Fiat | Cronos | Sedan | MANUAL | 130 | `/images/cars/fiat-cronos.png` |
| Chevrolet | Onix LTZ 1.0 | Hatch | AUTOMATIC | 130 | `/images/cars/onix.png` |
| GM | Spin 1.8 | Minivan | AUTOMATIC | 320 | `/images/cars/gm-spin.png` |
| VW | T-Cross 1.0 Turbo | SUV | AUTOMATIC | 150 | `/images/cars/vw-t-cross.png` |
| Honda | City Sedan AT | Intermediário | AUTOMATIC | 150 | `/images/cars/honda-city-sedan.png` |
| Fiat | Mobi 1.0 | Compacto | MANUAL | 100 | `/images/cars/fiat-mobi.png` |

- `year` e `licensePlate` são fictícios (placas únicas no padrão Mercosul).
- Diferenças aceitas em relação ao Figma, por causa das regras de composição do card (US13):
  - "Onix LTZ 1.0" vira "Chevrolet Onix LTZ 1.0" (o Figma omite a marca só nesse card).
  - A descrição é sempre `categoria + câmbio`: "Minivan Automática 7 Lugares" vira "Minivan Automático" e "Compacto com Ar" vira "Compacto Manual". Não criar campo extra de descrição (YAGNI).

## restrições

- Não criar resolver separado pra buscar categoria do veículo. Usar `include` do Prisma.
- Não usar enum do Prisma pra transmission — usar `registerEnumType` do NestJS/GraphQL e string no banco.
- Não criar CRUD completo (create, update, delete). Apenas a query de leitura; veículos vêm do seed por enquanto.

## stack e padrões

- Scaffold com o Nest CLI: `pnpm api exec nest g resource vehicles` (escolher "GraphQL (code first)") e remover o que não for leitura
- Prisma schema em `apps/api/prisma/schema.prisma`
- Model GraphQL em `apps/api/src/vehicles/vehicle.model.ts` usando decorators `@Field`, `@ObjectType`
- Enum GraphQL via `registerEnumType` do `@nestjs/graphql`
- Injetar `PrismaService` no resolver/service
- ESM: imports relativos terminam em `.js` (inclusive `../generated/prisma/client.js`)
- Prisma Client gerado em `apps/api/src/generated/prisma/`
- Rodar `pnpm prisma:migrate` e `pnpm prisma:generate` após alterar o schema
- Testes com Vitest (`*.spec.ts`): `pnpm test:api`
- Importar `VehiclesModule` no `AppModule`

## critérios de aceite

- query `vehicles` retorna `id`, `brand`, `model`, `year`, `dailyRate`, `available` em cada veículo
- query `vehicles` retorna `imageUrl` (string ou null) em cada veículo
- query `vehicles` retorna `category { id, name }` em cada veículo
- query `vehicles` retorna `transmission` (MANUAL ou AUTOMATIC) em cada veículo
- migration roda sem erros
- seed roda múltiplas vezes sem duplicatas
- testes do resolver `vehicles` passam

## verificação

- rodar `pnpm test:api` — todos os testes devem passar
- rodar `pnpm lint:api`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que a migration cria as tabelas sem perda de dados e que o seed é idempotente
