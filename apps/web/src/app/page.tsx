import { Suspense } from "react";
import { CarSearchBar } from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import { toCar } from "@/lib/cars";
import { getLocations } from "@/lib/locations";
import { readCategory, readSearch } from "@/lib/search-params";
import { getCatalog, type Catalog } from "@/lib/vehicles";
import type { Location } from "@/types/location";
import { CatalogTransitionProvider } from "./catalog-transition";
import { CategoryCatalog } from "./category-catalog";
import { VehicleSearch } from "./vehicle-search";

type SearchParamsProps = Pick<PageProps<"/">, "searchParams">;

function CatalogMessage({ children }: { children: string }) {
  return (
    <p className="mx-auto max-w-308 px-4 py-14 text-center text-body-md text-neutral-text">
      {children}
    </p>
  );
}

async function VehicleSearchBar({ searchParams }: SearchParamsProps) {
  const search = readSearch(await searchParams);

  let locations: Location[] = [];
  let error: string | undefined;
  try {
    locations = await getLocations();
  } catch (loadError) {
    console.error("Falha ao carregar os locais", loadError);
    error = "Não foi possível carregar os locais. Tente novamente em instantes.";
  }

  return <VehicleSearch locations={locations} search={search} error={error} />;
}

async function VehicleCatalog({ searchParams }: SearchParamsProps) {
  // ler a URL já faz a busca acontecer na requisição, então uma API fora do ar
  // no build não deixa a mensagem de erro gravada na página estática
  const params = await searchParams;
  const categoryId = readCategory(params);

  let catalog: Catalog;
  try {
    catalog = await getCatalog(categoryId, readSearch(params));
  } catch (error) {
    console.error("Falha ao carregar o catálogo de veículos", error);
    return (
      <CatalogMessage>
        Não foi possível carregar os veículos agora. Tente novamente em
        instantes.
      </CatalogMessage>
    );
  }

  const { categories, vehicles } = catalog;
  // categoria inexistente na URL: o grid fica vazio e o dropdown volta ao placeholder
  const selectedCategoryId = categories.some(({ id }) => id === categoryId)
    ? categoryId
    : null;

  return (
    <CategoryCatalog
      cars={vehicles.items.map(toCar)}
      categories={categories}
      selectedCategoryId={selectedCategoryId}
    />
  );
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <CatalogTransitionProvider>
      <HomeTemplate
        searchBar={
          <Suspense fallback={<CarSearchBar locations={[]} />}>
            <VehicleSearchBar searchParams={searchParams} />
          </Suspense>
        }
      >
        <Suspense fallback={<CatalogMessage>Carregando veículos…</CatalogMessage>}>
          <VehicleCatalog searchParams={searchParams} />
        </Suspense>
      </HomeTemplate>
    </CatalogTransitionProvider>
  );
}
