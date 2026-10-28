import { Test, TestingModule } from '@nestjs/testing';
import { VehiclePage } from './vehicle-page.model.js';
import { Transmission } from './vehicle.model.js';
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

  it('retorna a página de veículos do service', async () => {
    const page: VehiclePage = {
      items: [
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
      ],
      totalCount: 1,
    };
    findAll.mockResolvedValue(page);

    await expect(resolver.vehicles()).resolves.toEqual(page);
    expect(findAll).toHaveBeenCalledWith(undefined, undefined, undefined);
  });

  it('repassa categoryId, skip e take ao service', async () => {
    findAll.mockResolvedValue({ items: [], totalCount: 0 });

    await resolver.vehicles('c1', 9, 9);

    expect(findAll).toHaveBeenCalledWith('c1', 9, 9);
  });
});
