import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Transmission } from './vehicle.model.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesService', () => {
  let service: VehiclesService;
  const findMany = vi.fn();

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

  beforeEach(async () => {
    findMany.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: { vehicle: { findMany } } },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('busca os veículos incluindo a categoria na mesma consulta', async () => {
    findMany.mockResolvedValue([]);

    await service.findAll();

    expect(findMany).toHaveBeenCalledWith({ include: { category: true } });
  });

  it('retorna categoria, câmbio e diária como número', async () => {
    findMany.mockResolvedValue([dbVehicle]);

    const [vehicle] = await service.findAll();

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
  });

  it('mantém imageUrl nulo quando o veículo não tem imagem', async () => {
    findMany.mockResolvedValue([{ ...dbVehicle, imageUrl: null }]);

    const [vehicle] = await service.findAll();

    expect(vehicle.imageUrl).toBeNull();
  });
});
