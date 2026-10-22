# US12 — Criar template HomeTemplate

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Depende de:** US07, US08, US09, US10, US11
**Status:** ✅ Implementado na aula-1 (commit `9625592`)

## contexto

O template compõe todos os organismos da home na ordem e layout correto. É a cola entre os organismos e a página (`page.tsx`). Seguindo Atomic Design, o template define a estrutura/layout e recebe o conteúdo via props — não faz fetch.

## componentes

- `HomeTemplate` em `src/components/templates/HomeTemplate/HomeTemplate.tsx`

## regras

- Ordem dos organismos (conforme o design): Header → CarSearchBar → HeroBanner → conteúdo (CarCatalog) → Footer.
- Sem sobreposição entre CarSearchBar e HeroBanner — no design são faixas empilhadas.
- `Header` e `Footer` ficam fora do `<main>`; CarSearchBar, HeroBanner e o conteúdo ficam dentro.
- O conteúdo abaixo do banner entra via `children` (o `page.tsx` passa o `CarCatalog` com os dados).
- Fundo da página: branco.

## restrições

- Não fazer fetch de dados no template. O template é presentacional.
- Não adicionar estado no template. Estado fica no `page.tsx` ou em Client Components que wrappam o template.
- Não colocar lógica de negócio. Apenas composição visual.

## stack e padrões

- Componente em `src/components/templates/HomeTemplate/HomeTemplate.tsx` + `index.ts`
- Exportar via barrel em `src/components/templates/index.ts`
- Story em `src/components/templates/HomeTemplate/HomeTemplate.stories.tsx`
- `app/page.tsx` usa o `HomeTemplate`

## critérios de aceite

- todos os organismos renderizam na ordem correta
- page.tsx usa o HomeTemplate
- layout geral confere com o design do Figma
- responsivo: funciona em desktop, tablet e mobile
- story no Storybook renderiza com dados mock

## verificação

- rodar `pnpm dev:web` e conferir a home completa no browser
- comparar a composição geral com o design do Figma
- testar em diferentes resoluções
- rodar `pnpm lint:web`, `pnpm web exec tsc --noEmit` e `pnpm build:web`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
