import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vehicle } from './vehicle.model.js';

@ObjectType({ description: 'Página de veículos com o total filtrado' })
export class VehiclePage {
  @Field(() => [Vehicle], { description: 'Veículos desta página' })
  items: Vehicle[];

  @Field(() => Int, {
    description: 'Total de veículos que atendem ao filtro, sem paginação',
  })
  totalCount: number;
}
