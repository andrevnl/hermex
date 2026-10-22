# US08 — Criar organismo HeroBanner

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Status:** ✅ Implementado na aula-1 (commit `5db1420`)

## contexto

O hero banner é a seção de destaque da home, logo abaixo da barra de busca de carros. Ocupa a largura toda com uma chamada e uma imagem grande de uma pessoa sorrindo dentro de um carro. É a primeira impressão visual do site.

## componentes

- `HeroBanner` em `src/components/organisms/HeroBanner/HeroBanner.tsx`

## regras

- Título: "**Encontre o carro ideal** para todas as ocasiões". O trecho "Encontre o carro ideal" fica na cor `primary` (laranja) e o restante em branco, conforme o design.
- Tipografia do título: `Heading` com `size="xxl"` (Exo 2, 76px), renderizado como `h1`.
- Fundo: `secondary-dark` com as setas grandes decorativas (chevrons) do design.
- Imagem: mulher sorrindo dentro de um carro, posicionada à direita. Usar `next/image` com `preload` (no Next 16 a prop `priority` foi depreciada).
- Setas decorativas: dois pares de chevrons laranja (um apontando para a esquerda, outro para a direita) ao redor da imagem, exportados do Figma como SVG.
- Altura: 600px no desktop. Largura: 100% da viewport.
- A arte (1920×600) fica ancorada à coluna de conteúdo, mantendo a relação texto/foto; em telas estreitas o excesso à direita é cortado.
- Responsivo: abaixo de `xl` (1280px) a foto e os chevrons laranja são ocultados e o título reduz para não sobrepor a foto.

## restrições

- Não fazer fetch de dados. Conteúdo é estático.
- Não hardcodar a imagem inline em base64. Usar arquivos em `public/images/banner/` com `next/image`.
- Não sobrepor outras seções ao banner — no design a barra de busca fica acima dele, sem overlap.

## stack e padrões

- Componente em `src/components/organisms/HeroBanner/HeroBanner.tsx` + `index.ts`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/HeroBanner/HeroBanner.stories.tsx`
- `next/image` pra imagem e SVGs
- Tailwind CSS pra layout e tipografia

## critérios de aceite

- título renderiza com "Encontre o carro ideal" em laranja e fonte heading
- imagem de destaque posicionada à direita
- setas decorativas laranja visíveis
- fundo `secondary-dark` contrasta com o texto branco
- responsivo: em mobile o título continua legível, sem sobrepor a foto
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm dev:web` e conferir visualmente no browser
- comparar lado a lado com o design do Figma
- rodar `pnpm lint:web` e `pnpm web exec tsc --noEmit`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: conferir que a imagem usa `next/image` com `preload` e não base64
