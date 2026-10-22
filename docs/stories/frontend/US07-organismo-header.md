# US07 — Criar organismo Header

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Status:** ✅ Implementado na aula-1 (commit `12e7d1e`)

## contexto

O header é o topo de todas as páginas. No design da home ele aparece com fundo branco, logo Hermex, campo de busca textual e links de navegação.

Já existem componentes prontos que devem ser reutilizados: `Logo`, `IconField` e `IconLink`. O header é um organismo — composição de moléculas e átomos.

## componentes

- `Header` em `src/components/organisms/Header/Header.tsx`

## regras

- Layout: logo à esquerda, campo de busca ao centro, links à direita, alinhados à coluna de conteúdo de 1200px do design.
- Fundo: branco (`bg-white`), largura 100%.
- Logo: usar `Logo` com `variant="default"`, com link para `/`.
- Busca: usar `IconField` com `tone="neutral"`, ícone `search`, placeholder "O que você procura?".
- Links: usar `IconLink` para "Cadastro" (ícone `account_circle`, href `/cadastro`) e "Login" (ícone `login`, href `/login`).
- Responsivo: em mobile, o campo de busca desce para uma linha própria, com largura total. Links mantidos.
- O header não faz fetch de dados. É puro presentacional.

## restrições

- Não criar componentes novos. Usar os átomos e moléculas que já existem.
- Não adicionar lógica de autenticação (mostrar/esconder login). Isso é outra story.
- Não adicionar lógica de busca além do `<form role="search">` (envia `?busca=` para `/`). O tratamento da busca é outra story.
- Não usar `position: fixed` ou `sticky` a menos que o design exija explicitamente.

## stack e padrões

- Componente em `src/components/organisms/Header/Header.tsx` + `index.ts`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/Header/Header.stories.tsx`
- Atomic Design: organismo compõe moléculas (`IconField`, `IconLink`) e átomos (`Logo`)
- Tailwind CSS com os tokens do projeto (cores, fontes definidas em `globals.css`)

## critérios de aceite

- header renderiza com fundo branco
- logo Hermex visível à esquerda
- campo de busca com placeholder "O que você procura?" ao centro
- links Cadastro e Login com ícones corretos à direita
- responsivo: não quebra em telas pequenas
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm dev:web` e conferir visualmente no browser
- abrir Storybook (`pnpm web storybook`) e validar o componente isolado
- comparar lado a lado com o design do Figma
- rodar `pnpm lint:web` e `pnpm web exec tsc --noEmit`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
