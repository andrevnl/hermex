import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service.js';
import { Category } from './category.model.js';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Category], {
    description: 'Lista todas as categorias, ordenadas por nome',
  })
  categories(): Promise<Category[]> {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }
}
