import { Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './vehicle.model.js';
import { VehiclesService } from './vehicles.service.js';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle], { description: 'Lista os veículos com a categoria' })
  vehicles(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }
}
