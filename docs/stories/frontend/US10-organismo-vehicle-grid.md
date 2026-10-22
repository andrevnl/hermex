# US10 — Criar organismo CarCatalog

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Status:** 🟡 Implementado na aula-1 (commit `2cf50bf`) com filtro interno: recebe `cars` e filtra no client, com dados de exemplo (`sampleCars` em `src/lib/cars.ts`). Pendente: receber `categories`/`selectedCategoryId`/`onCategoryChange` via props — entra junto com a US14.

## contexto

A seção principal da home é o catálogo de carros — cards organizados em 3 colunas com um dropdown de filtro por categoria no topo. O componente `CarCard` já existe e deve ser reutilizado.

## componentes

- `CarCatalog` em `src/components/organisms/CarCatalog/CarCatalog.tsx`

## regras

- Dropdown "Selecione a categoria" no topo, à esquerda, usando `Dropdown` com `tone="brand"`.
- Opção "Todas as categorias" no dropdown, pra limpar o filtro.
- Cards de 360px com espaçamento de 40px na horizontal e 16px na vertical, centralizados: 3 colunas no desktop, 2 no tablet, 1 no mobile.
- Cada card usa `CarCard` existente (`name`, `description`, `imageSrc`, `pricePerDay`, `detailsHref`).
- "Ver detalhes" é um link para `/veiculos/<slug>` (`detailsHref`), não um callback.
- Props do CarCatalog (após a US14):
  - `cars`: array de carros a exibir
  - `categories`: array de categorias pro dropdown
  - `selectedCategoryId`: categoria selecionada (ou null)
  - `onCategoryChange(categoryId: string | null)`: callback do dropdown
- Estado vazio: mensagem "Nenhum carro encontrado." quando a lista é vazia.
- Fundo: branco.

## restrições

- Não fazer fetch de dados. Recebe tudo via props.
- Não implementar paginação visual nesta story. Isso pode ser uma story separada.
- Não modificar o `CarCard` existente. Se precisar de ajustes, abrir outra story.
- Não adicionar loading skeleton aqui. Loading é responsabilidade da integração (US13).

## stack e padrões

- Componente em `src/components/organisms/CarCatalog/CarCatalog.tsx` + `index.ts`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/CarCatalog/CarCatalog.stories.tsx`
- Reutilizar `CarCard` (molecules) e `Dropdown` (molecules)
- Tailwind CSS (`flex flex-wrap justify-center gap-x-10 gap-y-4`, cards com `max-w-90`)

## critérios de aceite

- dropdown de categoria renderiza no topo com as categorias disponíveis
- catálogo mostra cards de carros em 3 colunas (desktop)
- catálogo adapta pra 2 colunas (tablet) e 1 coluna (mobile)
- selecionar categoria filtra os cards (`onCategoryChange` após a US14)
- "Ver detalhes" leva para a página do carro
- lista vazia mostra mensagem "Nenhum carro encontrado."
- story no Storybook renderiza com dados mock

## verificação

- rodar `pnpm dev:web` e conferir visualmente no browser
- testar responsividade em diferentes larguras
- comparar com o design do Figma
- rodar `pnpm lint:web` e `pnpm web exec tsc --noEmit`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
