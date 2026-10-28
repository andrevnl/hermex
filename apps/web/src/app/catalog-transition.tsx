"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";

type CatalogTransition = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const CatalogTransitionContext = createContext<CatalogTransition | null>(null);

// Uma só transição para a busca e o filtro de categoria: o grid esmaece
// enquanto qualquer um dos dois espera a resposta do servidor.
export function CatalogTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <CatalogTransitionContext value={{ isPending, startTransition }}>
      {children}
    </CatalogTransitionContext>
  );
}

// Atualiza os parâmetros da URL sem novo item no histórico; o servidor refaz
// a busca a partir deles. `onStart` roda dentro da transição (ex.: useOptimistic).
export function useCatalogNavigation() {
  const transition = useContext(CatalogTransitionContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!transition) {
    throw new Error(
      "useCatalogNavigation precisa estar dentro do CatalogTransitionProvider",
    );
  }
  const { isPending, startTransition } = transition;

  function navigate(
    update: (params: URLSearchParams) => void,
    onStart?: () => void,
  ) {
    const params = new URLSearchParams(searchParams);
    update(params);
    const query = params.toString();

    startTransition(() => {
      onStart?.();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return { isPending, navigate };
}
