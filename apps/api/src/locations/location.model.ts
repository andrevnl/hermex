import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Local de retirada e devolução de veículos' })
export class Location {
  @Field(() => ID, { description: 'Identificador do local' })
  id: string;

  @Field({ description: 'Nome do local' })
  name: string;

  @Field({ description: 'Endereço do local' })
  address: string;

  @Field({ description: 'Cidade do local' })
  city: string;

  @Field({ description: 'Sigla do estado (UF), com 2 letras' })
  state: string;
}
