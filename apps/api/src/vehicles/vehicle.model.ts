import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Category } from '../categories/category.model.js';

export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

registerEnumType(Transmission, {
  name: 'Transmission',
  description: 'Tipo de câmbio do veículo',
  valuesMap: {
    MANUAL: { description: 'Câmbio manual' },
    AUTOMATIC: { description: 'Câmbio automático' },
  },
});

@ObjectType({ description: 'Veículo disponível para locação' })
export class Vehicle {
  @Field(() => ID, { description: 'Identificador do veículo' })
  id: string;

  @Field({ description: 'Marca do veículo (ex.: Hyundai)' })
  brand: string;

  @Field({ description: 'Modelo do veículo (ex.: HB20 1.0)' })
  model: string;

  @Field(() => Int, { description: 'Ano do veículo' })
  year: number;

  @Field({ description: 'Placa do veículo' })
  licensePlate: string;

  @Field(() => Float, { description: 'Valor da diária, em reais' })
  dailyRate: number;

  @Field({ description: 'Indica se o veículo está disponível para locação' })
  available: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Caminho da imagem do veículo servida pelo web',
  })
  imageUrl: string | null;

  @Field(() => Transmission, { description: 'Tipo de câmbio do veículo' })
  transmission: Transmission;

  @Field(() => Category, { description: 'Categoria do veículo' })
  category: Category;
}
