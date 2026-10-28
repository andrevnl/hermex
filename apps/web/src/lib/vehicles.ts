import { cacheLife } from "next/cache";
import type { Category, VehiclePage } from "@/types/vehicle";
import { gqlFetch } from "./graphql";

const CATALOG_QUERY = `
  query Catalog($categoryId: ID, $take: Int!) {
    categories {
      id
      name
    }
    vehicles(categoryId: $categoryId, take: $take) {
      items {
        id
        brand
        model
        imageUrl
        dailyRate
        transmission
        category {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export type Catalog = {
  categories: Category[];
  vehicles: VehiclePage;
};

// Categorias e primeira página de veículos numa só requisição, em cache por
// categoria; o perfil "minutes" revalida a cada 60 segundos.
export async function getCatalog(
  categoryId?: string | null,
  take = 9,
): Promise<Catalog> {
  "use cache";
  cacheLife("minutes");

  return gqlFetch<Catalog>(CATALOG_QUERY, { categoryId, take });
}
