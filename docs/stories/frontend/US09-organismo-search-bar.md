# US09 — Criar organismo CarSearchBar

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Status:** 🟡 Visual implementado na aula-1 (commit `da7e120`). Pendente: callback `onSearch` — hoje o `<form>` envia GET para `/` com os campos; o callback entra junto com a US15.

## contexto

A barra de busca fica logo abaixo do header, acima do hero banner, e permite o usuário buscar carros por local, data e horário de retirada/devolução. É o componente mais complexo da home — duas linhas de campos + botão "Buscar".

No design: fundo `primary-dark` (laranja), campos com borda e texto brancos, botão `secondary` (azul) "Buscar".

## componentes

- `CarSearchBar` em `src/components/organisms/CarSearchBar/CarSearchBar.tsx`

## regras

- **Linha 1 (Retirada):** "Local de retirada" (`IconField`, ícone `location_on`) + "Data" (`IconField`, ícone `calendar_month`) + "Horário" (`Dropdown`)
- **Linha 2 (Devolução):** "Local de devolução" (`IconField`, ícone `location_on`) + "Data" (`IconField`, ícone `calendar_month`) + "Horário" (`Dropdown`)
- Botão "Buscar" à direita das duas linhas, alinhado ao topo.
- Campos usam `tone="inverse"` (borda e texto brancos).
- Botão usa `Button` com `variant="secondary"`.
- Fundo `primary-dark` com padding vertical de 40px.
- Data: campo de texto simples (decisão da aula-1: o input de data nativo duplicaria o ícone do calendário).
- Horário: `Dropdown` com horários de 07:00 a 21:00, de hora em hora.
- Nomes dos campos: `pickupLocation`, `pickupDate`, `pickupTime`, `returnLocation`, `returnDate`, `returnTime`.
- Callback `onSearch` recebe objeto tipado com esses seis campos (pendente — ver status).

## restrições

- Não fazer fetch de dados (locations, etc). A CarSearchBar é presentacional — recebe callbacks via props.
- Não validar datas aqui. A validação é responsabilidade de quem chama `onSearch` (ou do backend).
- Não adicionar lib de date picker (react-datepicker, etc).
- Não criar átomos novos `DateField` ou `TimeField`. Usar `IconField` e `Dropdown`.

## stack e padrões

- Componente em `src/components/organisms/CarSearchBar/CarSearchBar.tsx` + `index.ts`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/CarSearchBar/CarSearchBar.stories.tsx`
- Reutilizar `IconField`, `Dropdown` (molecules) e `Button` (atoms)
- Tailwind CSS pra layout (flexbox)
- Client Component (`"use client"`) apenas quando o `onSearch` for implementado (estado/callback)

## critérios de aceite

- duas linhas de campos renderizam (retirada e devolução)
- cada linha tem: local, data, horário
- botão "Buscar" à direita
- fundo `primary-dark`
- campos com borda e texto brancos
- `onSearch` é chamado com dados estruturados ao clicar "Buscar" (pendente)
- responsivo: em mobile o local ocupa a linha inteira, data e horário dividem a linha de baixo e o botão ocupa a largura toda
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm dev:web` e conferir visualmente no browser
- comparar com o design do Figma
- testar que `onSearch` é chamado corretamente via story com action
- rodar `pnpm lint:web` e `pnpm web exec tsc --noEmit`
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
