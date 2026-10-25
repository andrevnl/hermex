import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { CategoriesResolver } from './categories.resolver.js';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;
  const findMany = vi.fn();

  beforeEach(async () => {
    findMany.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesResolver,
        { provide: PrismaService, useValue: { category: { findMany } } },
      ],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
  });

  it('retorna as categorias cadastradas', async () => {
    const categories = [
      { id: '1', name: 'Hatch' },
      { id: '2', name: 'SUV' },
    ];
    findMany.mockResolvedValue(categories);

    await expect(resolver.categories()).resolves.toEqual(categories);
  });

  it('ordena as categorias por nome em ordem crescente', async () => {
    findMany.mockResolvedValue([]);

    await resolver.categories();

    expect(findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('retorna lista vazia quando não há categorias', async () => {
    findMany.mockResolvedValue([]);

    await expect(resolver.categories()).resolves.toEqual([]);
  });
});
