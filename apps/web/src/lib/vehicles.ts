import { cacheLife } from "next/cache";
import type { VehiclePage } from "@/types/vehicle";
import { gqlFetch } from "./graphql";

const VEHICLES_QUERY = `
  query Vehicles($take: Int!) {
    vehicles(take: $take) {
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

// Primeira página do catálogo; o perfil "minutes" revalida a cada 60 segundos.
export async function getVehicles(take = 9): Promise<VehiclePage> {
  "use cache";
  cacheLife("minutes");

  const { vehicles } = await gqlFetch<{ vehicles: VehiclePage }>(
    VEHICLES_QUERY,
    { take },
  );
  return vehicles;
}
