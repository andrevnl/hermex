"use client";

import { useOptimistic, type ComponentProps } from "react";
import { CarCatalog } from "@/components/organisms";
import { CATEGORY_PARAM } from "@/lib/search-params";
import { useCatalogNavigation } from "./catalog-transition";

type CategoryCatalogProps = Omit<
  ComponentProps<typeof CarCatalog>,
  "onCategoryChange"
>;

// Liga o dropdown do catálogo à URL (?categoria=<id>); o servidor refaz a
// busca a partir da URL e o grid fica esmaecido enquanto a resposta não chega.
export function CategoryCatalog({
  selectedCategoryId,
  className = "",
  ...props
}: CategoryCatalogProps) {
  const { isPending, navigate } = useCatalogNavigation();
  // o dropdown mostra a escolha na hora, sem esperar a resposta do servidor
  const [optimisticCategoryId, setOptimisticCategoryId] =
    useOptimistic(selectedCategoryId);

  function handleCategoryChange(categoryId: string | null) {
    navigate(
      (params) => {
        if (categoryId) {
          params.set(CATEGORY_PARAM, categoryId);
        } else {
          params.delete(CATEGORY_PARAM);
        }
      },
      () => setOptimisticCategoryId(categoryId),
    );
  }

  return (
    <CarCatalog
      {...props}
      selectedCategoryId={optimisticCategoryId}
      onCategoryChange={handleCategoryChange}
      aria-busy={isPending}
      className={`transition-opacity ${isPending ? "opacity-50" : ""} ${className}`}
    />
  );
}
