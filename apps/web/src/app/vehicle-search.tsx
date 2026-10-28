"use client";

import { useState } from "react";
import { CarSearchBar } from "@/components/organisms";
import {
  searchToValues,
  valuesToSearch,
  writeSearch,
  type SearchValues,
  type VehicleSearch as Search,
} from "@/lib/search-params";
import type { Location } from "@/types/location";
import { useCatalogNavigation } from "./catalog-transition";

type VehicleSearchProps = {
  locations: Location[];
  // Busca ativa lida da URL pelo servidor, ou null.
  search: Search | null;
  // Falha ao carregar os locais.
  error?: string;
};

// Valida a busca e a grava na URL; o servidor troca a listagem pelos resultados.
export function VehicleSearch({
  locations,
  search,
  error: loadError,
}: VehicleSearchProps) {
  const { navigate } = useCatalogNavigation();
  const [error, setError] = useState<string>();

  function handleSearch(values: SearchValues) {
    if (Object.values(values).some((value) => !value)) {
      setError("Preencha local, data e horário da retirada e da devolução.");
      return;
    }

    const next = valuesToSearch(values);
    // datas "AAAA-MM-DDTHH:mm" se comparam corretamente como texto
    if (next.returnAt <= next.pickupAt) {
      setError("A devolução deve ser depois da retirada.");
      return;
    }

    setError(undefined);
    navigate((params) => writeSearch(params, next));
  }

  function handleClear() {
    setError(undefined);
    navigate((params) => writeSearch(params, null));
  }

  return (
    <CarSearchBar
      // remonta o formulário só ao entrar ou sair da busca (ex.: "Limpar busca"),
      // para não descartar o que o usuário edita enquanto os resultados carregam
      key={search ? "com-busca" : "sem-busca"}
      locations={locations}
      defaultValues={searchToValues(search)}
      onSearch={handleSearch}
      onClear={search ? handleClear : undefined}
      error={error ?? loadError}
    />
  );
}
