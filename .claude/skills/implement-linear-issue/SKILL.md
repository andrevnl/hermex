---
name: implement-linear-issue
description: Planeja e implementa de ponta a ponta uma issue do Linear (backend ou frontend) — lê a spec, monta o plano, pede aprovação, implementa, testa e confere contra os critérios de aceite. Use quando o usuário fornecer um link ou ID de issue do Linear (ex. AND-5) para desenvolver.
argument-hint: <link ou ID da issue>
---

# implementar issue do Linear

Fluxo para buscar uma issue no Linear e entregá-la pronta, testada e verificada contra a spec. Issue: $ARGUMENTS.

## 1. Obter a spec

- Extraia o ID da issue do link (ex. `https://linear.app/.../issue/AND-5/...` → `AND-5`). Se não houver link nem ID, pergunte.
- Busque a issue com `get_issue` do MCP `linear-server` e os comentários com `list_comments` — comentários podem ajustar a spec.
- Leia também a issue pai (épico) e as issues relacionadas/bloqueadoras. Se uma dependência ainda não estiver concluída, avise antes de seguir.

## 2. Ler a spec

Identifique o `Tipo` da issue e leia a referência da stack correspondente:

- Backend → [references/backend.md](references/backend.md)
- Frontend → [references/frontend.md](references/frontend.md)

Extraia da spec:

- contexto
- queries / endpoints (backend) ou componentes afetados (frontend)
- regras e restrições — restrições do tipo "não criar", "não adicionar" valem tanto quanto as regras
- stack e padrões
- critérios de aceite e verificação

## 3. Planejar

- Procure no projeto implementações parecidas e siga o mesmo padrão (estrutura, nomes, estilo de código).
- Crie uma ToDo list com todas as tarefas, na ordem de execução.
- Antes de fechar o plano, releia a spec e garanta que ele:
  - não cria regressão no que já existe;
  - não introduz padrão, design ou estilo de código desalinhado com o restante do projeto;
  - cobre todos os critérios de aceite e não faz nada que as restrições proíbem.
- Apresente o plano e **aguarde aprovação** antes de implementar.

## 4. Implementar

- Se estiver na `main`, crie uma branch antes (ex. `feat/and-5-dominio-categoria`).
- Siga o plano aprovado e as convenções do `CLAUDE.md` e da referência da stack. Se precisar desviar do plano, avise o motivo.

## 5. Testar

- Escreva e execute os testes relacionados, conforme a referência da stack.
- Rode a skill `/verify` (lint, type-check e testes das apps alteradas).
- Se algum teste existente falhar, verifique se foi causado por este desenvolvimento. Se foi, analise as possíveis causas e **pergunte antes de resolver** — pode ser uma regra de negócio não prevista que precisa entrar na spec.

## 6. Conferir contra a spec

Monte um checklist com cada item de **critérios de aceite** e **verificação** da issue, com status e evidência:

```
- [x] query `categories` ordenada por nome — `categories.resolver.spec.ts`
- [ ] seed idempotente — não verificado: precisa do banco rodando
```

- Itens que dependem de ação humana (review, conferência visual, banco) entram como pendentes, com o que falta.
- Liste qualquer item da spec não atendido.
- Ao final, pergunte se deve commitar (Conventional Commits em pt-BR, escopo da app — ex. `feat(api): adiciona domínio de categorias`) e se deve comentar o checklist na issue e mudar o status no Linear.
