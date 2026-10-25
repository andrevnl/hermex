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

// Veículos do design da home; year e licensePlate são fictícios
const vehicles = [
  {
    brand: 'Hyundai',
    model: 'HB20 1.0',
    category: 'Hatch',
    transmission: 'MANUAL',
    dailyRate: 120,
    year: 2023,
    licensePlate: 'HMX1A23',
    imageUrl: '/images/cars/hb20.png',
  },
  {
    brand: 'Honda',
    model: 'City',
    category: 'Hatch',
    transmission: 'AUTOMATIC',
    dailyRate: 130,
    year: 2023,
    licensePlate: 'HMX2B34',
    imageUrl: '/images/cars/honda-city.png',
  },
  {
    brand: 'Jeep',
    model: 'Renegade 1.3',
    category: 'SUV',
    transmission: 'AUTOMATIC',
    dailyRate: 140,
    year: 2022,
    licensePlate: 'HMX3C45',
    imageUrl: '/images/cars/renegade.png',
  },
  {
    brand: 'Fiat',
    model: 'Cronos',
    category: 'Sedan',
    transmission: 'MANUAL',
    dailyRate: 130,
    year: 2023,
    licensePlate: 'HMX4D56',
    imageUrl: '/images/cars/fiat-cronos.png',
  },
  {
    brand: 'Chevrolet',
    model: 'Onix LTZ 1.0',
    category: 'Hatch',
    transmission: 'AUTOMATIC',
    dailyRate: 130,
    year: 2024,
    licensePlate: 'HMX5E67',
    imageUrl: '/images/cars/onix.png',
  },
  {
    brand: 'GM',
    model: 'Spin 1.8',
    category: 'Minivan',
    transmission: 'AUTOMATIC',
    dailyRate: 320,
    year: 2022,
    licensePlate: 'HMX6F78',
    imageUrl: '/images/cars/gm-spin.png',
  },
  {
    brand: 'VW',
    model: 'T-Cross 1.0 Turbo',
    category: 'SUV',
    transmission: 'AUTOMATIC',
    dailyRate: 150,
    year: 2024,
    licensePlate: 'HMX7G89',
    imageUrl: '/images/cars/vw-t-cross.png',
  },
  {
    brand: 'Honda',
    model: 'City Sedan AT',
    category: 'Intermediário',
    transmission: 'AUTOMATIC',
    dailyRate: 150,
    year: 2023,
    licensePlate: 'HMX8H90',
    imageUrl: '/images/cars/honda-city-sedan.png',
  },
  {
    brand: 'Fiat',
    model: 'Mobi 1.0',
    category: 'Compacto',
    transmission: 'MANUAL',
    dailyRate: 100,
    year: 2024,
    licensePlate: 'HMX9J01',
    imageUrl: '/images/cars/fiat-mobi.png',
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

  // roda depois das categorias, para o connect pelo nome encontrá-las
  for (const { category, ...vehicle } of vehicles) {
    await prisma.vehicle.upsert({
      where: { licensePlate: vehicle.licensePlate },
      update: {},
      create: { ...vehicle, category: { connect: { name: category } } },
    });
  }
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
