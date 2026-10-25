import { Test, TestingModule } from '@nestjs/testing';
import { Transmission, Vehicle } from './vehicle.model.js';
import { VehiclesResolver } from './vehicles.resolver.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;
  const findAll = vi.fn();

  beforeEach(async () => {
    findAll.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesResolver,
        { provide: VehiclesService, useValue: { findAll } },
      ],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
  });

  it('retorna os veículos do service', async () => {
    const vehicles: Vehicle[] = [
      {
        id: '1',
        brand: 'Hyundai',
        model: 'HB20 1.0',
        year: 2023,
        licensePlate: 'HMX1A23',
        dailyRate: 120,
        available: true,
        imageUrl: '/images/cars/hb20.png',
        transmission: Transmission.MANUAL,
        category: { id: 'c1', name: 'Hatch' },
      },
    ];
    findAll.mockResolvedValue(vehicles);

    await expect(resolver.vehicles()).resolves.toEqual(vehicles);
    expect(findAll).toHaveBeenCalledOnce();
  });
});
