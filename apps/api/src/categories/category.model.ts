import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Categoria de veículo (ex.: Hatch, SUV)' })
export class Category {
  @Field(() => ID, { description: 'Identificador da categoria' })
  id: string;

  @Field({ description: 'Nome da categoria' })
  name: string;
}
