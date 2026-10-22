import { CarCatalog } from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import { sampleCars } from "@/lib/cars";

export default function Home() {
  return (
    <HomeTemplate>
      <CarCatalog cars={sampleCars} />
    </HomeTemplate>
  );
}
