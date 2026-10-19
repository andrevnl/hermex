# HERMEX

Uma locadora de veículos.

## monorepo

PNPM workspaces
Com atalhos no package.json usando o --filter para evitar navegar entre pastas antes de executar comandos

## Front-end

App Next.js (criado via NPX)
Estilos com tailwind
Organização de componentes: atomic design
Preparado para autenticação

## Back-end

Nest.js (criado usando cli do próprio nest)
Com graphql
ORM: prisma
Banco de dados: postgres (docker-compose.yaml para levantar o banco, com volume montado)
