import type { Category, Transmission, Vehicle } from "@/types/vehicle";

export type Car = {
  id: string;
  name: string;
  category: string;
  // Complemento exibido após a categoria, ex.: "Manual", "Automático".
  details: string;
  imageSrc: string | null;
  pricePerDay: number;
};

const transmissionLabels: Record<Transmission, string> = {
  MANUAL: "Manual",
  AUTOMATIC: "Automático",
};

// Converte um veículo da API nos dados exibidos pelo catálogo.
export function toCar(vehicle: Vehicle): Car {
  return {
    id: vehicle.id,
    name: `${vehicle.brand} ${vehicle.model}`,
    category: vehicle.category.name,
    details: transmissionLabels[vehicle.transmission],
    imageSrc: vehicle.imageUrl,
    pricePerDay: vehicle.dailyRate,
  };
}

// Dados de exemplo do Figma, usados só nas stories.
export const sampleCategories: Category[] = [
  { id: "compacto", name: "Compacto" },
  { id: "hatch", name: "Hatch" },
  { id: "intermediario", name: "Intermediário" },
  { id: "minivan", name: "Minivan" },
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "Suv" },
];

export const sampleCars: Car[] = [
  { id: "hb20", name: "Hyundai HB20 1.0", category: "Hatch", details: "Manual", imageSrc: "/images/cars/hb20.png", pricePerDay: 120 },
  { id: "honda-city", name: "Honda City", category: "Hatch", details: "Automático", imageSrc: "/images/cars/honda-city.png", pricePerDay: 130 },
  { id: "renegade", name: "Jeep Renegade 1.3", category: "Suv", details: "Automático", imageSrc: "/images/cars/renegade.png", pricePerDay: 140 },
  { id: "fiat-cronos", name: "Fiat Cronos", category: "Sedan", details: "Manual", imageSrc: "/images/cars/fiat-cronos.png", pricePerDay: 130 },
  { id: "onix", name: "Onix LTZ 1.0", category: "Hatch", details: "Automático", imageSrc: "/images/cars/onix.png", pricePerDay: 130 },
  { id: "gm-spin", name: "GM Spin 1.8", category: "Minivan", details: "Automática 7 Lugares", imageSrc: "/images/cars/gm-spin.png", pricePerDay: 320 },
  { id: "vw-t-cross", name: "VW T-Cross 1.0 Turbo", category: "Suv", details: "Automático", imageSrc: "/images/cars/vw-t-cross.png", pricePerDay: 150 },
  { id: "honda-city-sedan", name: "Honda City Sedan AT", category: "Intermediário", details: "Automático", imageSrc: "/images/cars/honda-city-sedan.png", pricePerDay: 150 },
  { id: "fiat-mobi", name: "Fiat Mobi 1.0", category: "Compacto", details: "com Ar", imageSrc: "/images/cars/fiat-mobi.png", pricePerDay: 100 },
];
