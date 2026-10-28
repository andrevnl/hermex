import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { SearchVehiclesInput } from './search-vehicles.input.js';
import { VehiclePage } from './vehicle-page.model.js';
import { Vehicle } from './vehicle.model.js';
import { DEFAULT_TAKE, VehiclesService } from './vehicles.service.js';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => VehiclePage, {
    description:
      'Lista paginada dos veículos disponíveis com a categoria, filtrando opcionalmente por categoria',
  })
  vehicles(
    @Args('categoryId', {
      type: () => ID,
      nullable: true,
      description: 'Filtra pelos veículos desta categoria',
    })
    categoryId?: string | null,
    @Args('skip', {
      type: () => Int,
      defaultValue: 0,
      description: 'Quantidade de veículos a pular (offset)',
    })
    skip?: number,
    @Args('take', {
      type: () => Int,
      defaultValue: DEFAULT_TAKE,
      description: 'Quantidade de veículos por página (máximo 27)',
    })
    take?: number,
  ): Promise<VehiclePage> {
    return this.vehiclesService.findAll(categoryId, skip, take);
  }

  @Query(() => VehiclePage, {
    description:
      'Lista paginada dos veículos disponíveis para retirada e devolução no período e locais informados',
  })
  searchVehicles(
    @Args('input', { description: 'Critérios da busca' })
    input: SearchVehiclesInput,
    @Args('skip', {
      type: () => Int,
      defaultValue: 0,
      description: 'Quantidade de veículos a pular (offset)',
    })
    skip?: number,
    @Args('take', {
      type: () => Int,
      defaultValue: DEFAULT_TAKE,
      description: 'Quantidade de veículos por página (máximo 27)',
    })
    take?: number,
  ): Promise<VehiclePage> {
    return this.vehiclesService.search(input, skip, take);
  }
}
