import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service.js';
import { Location } from './location.model.js';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Location], {
    description: 'Lista todos os locais, ordenados por nome',
  })
  locations(): Promise<Location[]> {
    return this.prisma.location.findMany({ orderBy: { name: 'asc' } });
  }
}
