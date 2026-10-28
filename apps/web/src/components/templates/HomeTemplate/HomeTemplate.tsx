import type { ReactNode } from "react";
import { Footer, Header, HeroBanner } from "@/components/organisms";

type HomeTemplateProps = {
  // Barra de busca exibida logo abaixo do header (ex.: CarSearchBar).
  searchBar: ReactNode;
  // Conteúdo abaixo do banner (ex.: catálogo de carros).
  children: ReactNode;
};

export function HomeTemplate({ searchBar, children }: HomeTemplateProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        {searchBar}
        <HeroBanner />
        {children}
      </main>
      <Footer />
    </div>
  );
}
