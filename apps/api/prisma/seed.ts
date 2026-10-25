import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

// Categorias exibidas no design da home
const categories = [
  'Hatch',
  'Sedan',
  'SUV',
  'Minivan',
  'Intermediário',
  'Compacto',
];

// Locais de retirada e devolução de exemplo
const locations = [
  {
    name: 'Aeroporto de Guarulhos',
    address: 'Rod. Hélio Smidt, s/n – Terminal 2',
    city: 'Guarulhos',
    state: 'SP',
  },
  {
    name: 'Centro do Rio de Janeiro',
    address: 'Av. Rio Branco, 156',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
  {
    name: 'Savassi',
    address: 'Rua Pernambuco, 1000',
    city: 'Belo Horizonte',
    state: 'MG',
  },
];

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // upsert pelo nome mantém o seed idempotente
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const location of locations) {
    await prisma.location.upsert({
      where: { name: location.name },
      update: {},
      create: location,
    });
  }
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
