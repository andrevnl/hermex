import { connection } from "next/server";
import { Suspense } from "react";
import { CarCatalog } from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import { toCar } from "@/lib/cars";
import { getVehicles } from "@/lib/vehicles";
import type { VehiclePage } from "@/types/vehicle";

function CatalogMessage({ children }: { children: string }) {
  return (
    <p className="mx-auto max-w-308 px-4 py-14 text-center text-body-md text-neutral-text">
      {children}
    </p>
  );
}

async function VehicleCatalog() {
  // busca na requisição (com o cache de 60s do getVehicles) para que uma API
  // fora do ar no build não deixe a mensagem de erro gravada na página estática
  await connection();

  let page: VehiclePage;
  try {
    page = await getVehicles();
  } catch (error) {
    console.error("Falha ao carregar o catálogo de veículos", error);
    return (
      <CatalogMessage>
        Não foi possível carregar os veículos agora. Tente novamente em
        instantes.
      </CatalogMessage>
    );
  }

  return <CarCatalog cars={page.items.map(toCar)} />;
}

export default function Home() {
  return (
    <HomeTemplate>
      <Suspense fallback={<CatalogMessage>Carregando veículos…</CatalogMessage>}>
        <VehicleCatalog />
      </Suspense>
    </HomeTemplate>
  );
}
