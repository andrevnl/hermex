import { cacheLife } from "next/cache";
import type { Location } from "@/types/location";
import { gqlFetch } from "./graphql";

const LOCATIONS_QUERY = `
  query Locations {
    locations {
      id
      name
      city
      state
    }
  }
`;

// Locais de retirada e devolução; mudam pouco, então o cache é de horas.
export async function getLocations(): Promise<Location[]> {
  "use cache";
  cacheLife("hours");

  const { locations } = await gqlFetch<{ locations: Location[] }>(
    LOCATIONS_QUERY,
  );
  return locations;
}
