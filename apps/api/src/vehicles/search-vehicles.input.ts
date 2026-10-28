import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Critérios de busca de veículos disponíveis por período e local',
})
export class SearchVehiclesInput {
  @Field(() => ID, { description: 'Local de retirada do veículo' })
  pickupLocationId: string;

  @Field(() => ID, { description: 'Local de devolução do veículo' })
  returnLocationId: string;

  @Field({ description: 'Data e hora de retirada' })
  pickupDate: Date;

  @Field({
    description: 'Data e hora de devolução, posterior à de retirada',
  })
  returnDate: Date;

  @Field(() => ID, {
    nullable: true,
    description: 'Filtra pelos veículos desta categoria',
  })
  categoryId?: string | null;
}
