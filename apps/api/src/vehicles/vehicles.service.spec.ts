import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Transmission } from './vehicle.model.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesService', () => {
  let service: VehiclesService;
  const findMany = vi.fn();
  const count = vi.fn();

  const hatch = { id: 'c1', name: 'Hatch' };
  const dbVehicle = {
    id: '1',
    brand: 'Hyundai',
    model: 'HB20 1.0',
    year: 2023,
    licensePlate: 'HMX1A23',
    dailyRate: new Prisma.Decimal('120.00'),
    available: true,
    imageUrl: '/images/cars/hb20.png',
    transmission: 'MANUAL',
    categoryId: hatch.id,
    category: hatch,
  };
  const orderBy = [{ brand: 'asc' }, { model: 'asc' }, { id: 'asc' }];

  beforeEach(async () => {
    findMany.mockReset().mockResolvedValue([]);
    count.mockReset().mockResolvedValue(0);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: { vehicle: { findMany, count } } },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('sem argumentos, busca os 9 primeiros disponíveis ordenados, com a categoria', async () => {
    await service.findAll();

    expect(findMany).toHaveBeenCalledWith({
      where: { available: true, categoryId: undefined },
      include: { category: true },
      orderBy,
      skip: 0,
      take: 9,
    });
  });

  it('repassa skip e take para a segunda página', async () => {
    await service.findAll(undefined, 9, 9);

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 9, take: 9 }),
    );
  });

  it('limita o take a 27 sem erro', async () => {
    await service.findAll(undefined, 0, 100);

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 27 }),
    );
  });

  it('ajusta skip e take negativos para zero', async () => {
    await service.findAll(undefined, -5, -3);

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 0, take: 0 }),
    );
  });

  it('com categoria, pagina e conta só os disponíveis daquela categoria', async () => {
    count.mockResolvedValue(2);

    const page = await service.findAll(hatch.id, 0, 1);

    const where = { available: true, categoryId: hatch.id };
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where, skip: 0, take: 1 }),
    );
    expect(count).toHaveBeenCalledWith({ where });
    expect(page.totalCount).toBe(2);
  });

  it('trata categoryId nulo como ausente', async () => {
    await service.findAll(null);

    const where = { available: true, categoryId: undefined };
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where }));
    expect(count).toHaveBeenCalledWith({ where });
  });

  it('dispara findMany e count em paralelo', async () => {
    // findMany nunca resolve sozinho: se as consultas fossem sequenciais,
    // count não seria chamado antes de findMany terminar
    let resolveFindMany!: (value: unknown[]) => void;
    findMany.mockReturnValue(
      new Promise((resolve) => (resolveFindMany = resolve)),
    );

    const pending = service.findAll();

    expect(findMany).toHaveBeenCalled();
    expect(count).toHaveBeenCalled();

    resolveFindMany([]);
    await pending;
  });

  it('retorna lista vazia e total zero para categoria inexistente', async () => {
    await expect(service.findAll('inexistente')).resolves.toEqual({
      items: [],
      totalCount: 0,
    });
  });

  it('retorna categoria, câmbio e diária como número', async () => {
    findMany.mockResolvedValue([dbVehicle]);
    count.mockResolvedValue(1);

    const {
      items: [vehicle],
      totalCount,
    } = await service.findAll();

    expect(vehicle).toMatchObject({
      brand: 'Hyundai',
      model: 'HB20 1.0',
      year: 2023,
      dailyRate: 120,
      available: true,
      imageUrl: '/images/cars/hb20.png',
      transmission: Transmission.MANUAL,
      category: hatch,
    });
    expect(typeof vehicle.dailyRate).toBe('number');
    expect(totalCount).toBe(1);
  });

  it('mantém imageUrl nulo quando o veículo não tem imagem', async () => {
    findMany.mockResolvedValue([{ ...dbVehicle, imageUrl: null }]);

    const {
      items: [vehicle],
    } = await service.findAll();

    expect(vehicle.imageUrl).toBeNull();
  });
});
