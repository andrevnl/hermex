import type { ReactNode } from "react";
import {
  CarSearchBar,
  Footer,
  Header,
  HeroBanner,
} from "@/components/organisms";

type HomeTemplateProps = {
  // Conteúdo abaixo do banner (ex.: catálogo de carros).
  children: ReactNode;
};

export function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        <CarSearchBar />
        <HeroBanner />
        {children}
      </main>
      <Footer />
    </div>
  );
}
