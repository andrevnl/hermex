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
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
