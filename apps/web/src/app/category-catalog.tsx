"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition, type ComponentProps } from "react";
import { CarCatalog } from "@/components/organisms";
import { CATEGORY_PARAM } from "@/lib/search-params";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  // o dropdown mostra a escolha na hora, sem esperar a resposta do servidor
  const [optimisticCategoryId, setOptimisticCategoryId] =
    useOptimistic(selectedCategoryId);

  function handleCategoryChange(categoryId: string | null) {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set(CATEGORY_PARAM, categoryId);
    } else {
      params.delete(CATEGORY_PARAM);
    }
    const query = params.toString();

    startTransition(() => {
      setOptimisticCategoryId(categoryId);
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
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
