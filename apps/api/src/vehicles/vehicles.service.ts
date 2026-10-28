import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { VehiclePage } from './vehicle-page.model.js';
import { Transmission } from './vehicle.model.js';

export const DEFAULT_TAKE = 9;
export const MAX_TAKE = 27;

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    categoryId?: string | null,
    skip = 0,
    take = DEFAULT_TAKE,
  ): Promise<VehiclePage> {
    // sem categoryId o Prisma ignora o filtro (undefined) e traz todas as categorias
    const where: Prisma.VehicleWhereInput = {
      available: true,
      categoryId: categoryId ?? undefined,
    };

    // findMany e count rodam em paralelo; include traz a categoria sem N+1 e
    // o id desempata a ordenação para as páginas serem estáveis
    const [vehicles, totalCount] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        include: { category: true },
        orderBy: [{ brand: 'asc' }, { model: 'asc' }, { id: 'asc' }],
        // valores fora da faixa são ajustados em silêncio, sem erro
        skip: Math.max(0, skip),
        take: Math.min(Math.max(0, take), MAX_TAKE),
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      items: vehicles.map((vehicle) => ({
        ...vehicle,
        dailyRate: vehicle.dailyRate.toNumber(),
        transmission: vehicle.transmission as Transmission,
      })),
      totalCount,
    };
  }
}
