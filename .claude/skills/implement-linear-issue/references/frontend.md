# Frontend (apps/web)

Next.js 16 + Tailwind 4 + Auth.js v5. As regras gerais estão no `CLAUDE.md`; este arquivo destaca o que importa no fluxo da issue.

## Implementação

- Next.js 16 difere do que você conhece: leia o guia relevante em `apps/web/node_modules/next/dist/docs/` antes de escrever código Next (data fetching, cache, rotas).
- `cacheComponents` está ligado: dados dinâmicos/assíncronos dentro de `Suspense`.
- Componentes novos com a skill `/new-component` (atomic design: `atoms`, `molecules`, `organisms`, `templates`). Antes de criar, verifique se já existe um componente que resolve — muitas specs exigem reutilizar os existentes.
- Imports via barrel (`@/components/<nível>`), nunca caminhos profundos.
- Tailwind com `className` em template string (sem clsx/cva) e tokens de `globals.css`.
- Textos de UI em pt-BR.
- Se a spec citar o Figma, use as skills do Figma (`figma:figma-design-to-code`) para consultar o design.
- Integração com a API (GraphQL em `NEXT_PUBLIC_API_URL`): confirme no `apps/api/src/schema.gql` que a query e os campos existem. Se dependerem de uma story de backend não concluída, avise antes de seguir.

## Testes

- O web não tem testes unitários; a verificação é lint, type-check, Storybook e conferência visual.
- Componente novo ou alterado: crie/atualize o `<Nome>.stories.tsx` seguindo as stories existentes (ex. `organisms/Footer/Footer.stories.tsx`).
- `pnpm lint:web` e `pnpm web exec tsc --noEmit` (já incluídos no `/verify`).
- Conferência visual: use a skill `/run` para subir o app e checar a página (incluindo largura mobile). O que não der para verificar fica pendente no checklist para o review humano.
