import { cacheLife } from "next/cache";
import type { Category, VehiclePage } from "@/types/vehicle";
import { gqlFetch } from "./graphql";
import type { VehicleSearch } from "./search-params";

const VEHICLE_PAGE_FIELDS = `
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
`;

const CATALOG_QUERY = `
  query Catalog($categoryId: ID, $take: Int!) {
    categories {
      id
      name
    }
    vehicles(categoryId: $categoryId, take: $take) {
      ${VEHICLE_PAGE_FIELDS}
    }
  }
`;

// o alias mantém o mesmo formato de resposta da listagem padrão
const SEARCH_QUERY = `
  query Search($input: SearchVehiclesInput!, $take: Int!) {
    categories {
      id
      name
    }
    vehicles: searchVehicles(input: $input, take: $take) {
      ${VEHICLE_PAGE_FIELDS}
    }
  }
`;

// Todos os locais estão no horário de Brasília (sem horário de verão desde
// 2019); rever quando houver locais em outros fusos ou com a Reservation.
const LOCATIONS_UTC_OFFSET = "-03:00";

export type Catalog = {
  categories: Category[];
  vehicles: VehiclePage;
};

// Categorias e primeira página de veículos numa só requisição, em cache por
// categoria e busca; o perfil "minutes" revalida a cada 60 segundos.
export async function getCatalog(
  categoryId?: string | null,
  search?: VehicleSearch | null,
  take = 9,
): Promise<Catalog> {
  "use cache";
  cacheLife("minutes");

  if (!search) {
    return gqlFetch<Catalog>(CATALOG_QUERY, { categoryId, take });
  }

  return gqlFetch<Catalog>(SEARCH_QUERY, {
    take,
    input: {
      pickupLocationId: search.pickupLocationId,
      returnLocationId: search.returnLocationId,
      pickupDate: `${search.pickupAt}:00${LOCATIONS_UTC_OFFSET}`,
      returnDate: `${search.returnAt}:00${LOCATIONS_UTC_OFFSET}`,
      categoryId,
    },
  });
}
