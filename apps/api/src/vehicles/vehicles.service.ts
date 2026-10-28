import { Injectable, Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SearchVehiclesInput } from './search-vehicles.input.js';
import { VehiclePage } from './vehicle-page.model.js';
import { Transmission } from './vehicle.model.js';

export const DEFAULT_TAKE = 9;
export const MAX_TAKE = 27;

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(private readonly prisma: PrismaService) {}

  search(
    input: SearchVehiclesInput,
    skip = 0,
    take = DEFAULT_TAKE,
  ): Promise<VehiclePage> {
    const { pickupLocationId, returnLocationId, pickupDate, returnDate } =
      input;

    // o scalar DateTime converte texto inválido em Invalid Date em vez de rejeitar
    if (
      Number.isNaN(pickupDate.getTime()) ||
      Number.isNaN(returnDate.getTime())
    ) {
      throw new GraphQLError(
        'As datas de retirada e devolução devem estar no formato ISO 8601.',
        { extensions: { code: 'BAD_USER_INPUT' } },
      );
    }

    if (returnDate.getTime() <= pickupDate.getTime()) {
      throw new GraphQLError(
        'A data de devolução deve ser posterior à data de retirada.',
        { extensions: { code: 'BAD_USER_INPUT' } },
      );
    }

    // TODO(Reservation): locais e datas são aceitos, mas ainda não filtram;
    // por enquanto a disponibilidade é só o flag `available` do findAll
    this.logger.debug(
      `Busca de ${pickupLocationId} (${pickupDate.toISOString()}) a ${returnLocationId} (${returnDate.toISOString()}) sem filtro de local e período`,
    );

    return this.findAll(input.categoryId, skip, take);
  }

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
