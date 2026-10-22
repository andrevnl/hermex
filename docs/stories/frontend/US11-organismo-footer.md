# US11 — Criar organismo Footer

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Status:** ✅ Implementado na aula-1 (commit `da91cd4`)

## contexto

O footer aparece no fundo de todas as páginas. Fundo escuro com logo invertido, slogan, créditos e links pra redes sociais. Componentes `Logo` e `SocialLinks` já existem.

## componentes

- `Footer` em `src/components/organisms/Footer/Footer.tsx`

## regras

- Três colunas, distribuídas com `justify-between`:
  - **Esquerda:** Logo Hermex invertido + texto "O carro ideal para sua ocasião".
  - **Centro:** texto "Desenvolvido por Alura. Projeto fictício sem fins comerciais."
  - **Direita:** "Siga nossas redes:" + ícones WhatsApp, Instagram, TikTok.
- Fundo: `secondary-dark`.
- Textos: cor branca.
- Logo: usar `Logo` com `variant="inverse"`.
- Ícones sociais: usar `SocialLinks` (que compõe `SocialIcon` com `network` e `href`); os links abrem em nova aba.
- Os links das redes sociais são props do Footer (`socialLinks`), com as páginas iniciais das redes como padrão.
- Largura do conteúdo: 1480px no design (mais largo que os 1200px do resto da página).

## restrições

- Não criar componentes novos. Reutilizar `Logo` e `SocialLinks`.
- Não fazer fetch de dados. Conteúdo estático, links via props.
- Textos de créditos são fixos — não precisam ser props.

## stack e padrões

- Componente em `src/components/organisms/Footer/Footer.tsx` + `index.ts`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/Footer/Footer.stories.tsx`
- Tailwind CSS pra layout (flex, justify-between)

## critérios de aceite

- footer renderiza com fundo `secondary-dark`
- logo invertido e slogan visíveis à esquerda
- crédito da Alura ao centro, em branco
- ícones de redes sociais à direita com links funcionais
- responsivo: empilha em mobile
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm dev:web` e conferir visualmente
- comparar com o design do Figma
- clicar nos ícones sociais e confirmar que abrem em nova aba
- rodar `pnpm lint:web` e `pnpm web exec tsc --noEmit`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
