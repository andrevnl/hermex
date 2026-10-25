import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { LocationsResolver } from './locations.resolver.js';

describe('LocationsResolver', () => {
  let resolver: LocationsResolver;
  const findMany = vi.fn();

  beforeEach(async () => {
    findMany.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsResolver,
        { provide: PrismaService, useValue: { location: { findMany } } },
      ],
    }).compile();

    resolver = module.get<LocationsResolver>(LocationsResolver);
  });

  it('retorna os locais cadastrados', async () => {
    const locations = [
      {
        id: '1',
        name: 'Aeroporto de Guarulhos',
        address: 'Rod. Hélio Smidt, s/n – Terminal 2',
        city: 'Guarulhos',
        state: 'SP',
      },
      {
        id: '2',
        name: 'Savassi',
        address: 'Rua Pernambuco, 1000',
        city: 'Belo Horizonte',
        state: 'MG',
      },
    ];
    findMany.mockResolvedValue(locations);

    await expect(resolver.locations()).resolves.toEqual(locations);
  });

  it('ordena os locais por nome em ordem crescente', async () => {
    findMany.mockResolvedValue([]);

    await resolver.locations();

    expect(findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('retorna lista vazia quando não há locais', async () => {
    findMany.mockResolvedValue([]);

    await expect(resolver.locations()).resolves.toEqual([]);
  });
});
