import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './vehicle.model.js';
import { VehiclesService } from './vehicles.service.js';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle], {
    description:
      'Lista os veículos disponíveis com a categoria, filtrando opcionalmente por categoria',
  })
  vehicles(
    @Args('categoryId', {
      type: () => ID,
      nullable: true,
      description: 'Filtra pelos veículos desta categoria',
    })
    categoryId?: string | null,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(categoryId);
  }
}
