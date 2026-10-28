import { Suspense } from "react";
import { HomeTemplate } from "@/components/templates";
import { toCar } from "@/lib/cars";
import { CATEGORY_PARAM } from "@/lib/search-params";
import { getCatalog, type Catalog } from "@/lib/vehicles";
import { CategoryCatalog } from "./category-catalog";

function CatalogMessage({ children }: { children: string }) {
  return (
    <p className="mx-auto max-w-308 px-4 py-14 text-center text-body-md text-neutral-text">
      {children}
    </p>
  );
}

async function VehicleCatalog({
  searchParams,
}: Pick<PageProps<"/">, "searchParams">) {
  // ler a URL já faz a busca acontecer na requisição, então uma API fora do ar
  // no build não deixa a mensagem de erro gravada na página estática
  const param = (await searchParams)[CATEGORY_PARAM];
  const categoryId = typeof param === "string" && param ? param : null;

  let catalog: Catalog;
  try {
    catalog = await getCatalog(categoryId);
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
    <HomeTemplate>
      <Suspense fallback={<CatalogMessage>Carregando veículos…</CatalogMessage>}>
        <VehicleCatalog searchParams={searchParams} />
      </Suspense>
    </HomeTemplate>
  );
}
