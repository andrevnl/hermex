export type Car = {
  slug: string;
  name: string;
  category: string;
  // Complemento exibido após a categoria, ex.: "Manual", "Automático".
  details: string;
  pricePerDay: number;
};

// Dados de exemplo do Figma, até o catálogo vir da API GraphQL.
export const sampleCars: Car[] = [
  { slug: "hb20", name: "Hyundai HB20 1.0", category: "Hatch", details: "Manual", pricePerDay: 120 },
  { slug: "honda-city", name: "Honda City", category: "Hatch", details: "Automático", pricePerDay: 130 },
  { slug: "renegade", name: "Jeep Renegade 1.3", category: "Suv", details: "Automático", pricePerDay: 140 },
  { slug: "fiat-cronos", name: "Fiat Cronos", category: "Sedan", details: "Manual", pricePerDay: 130 },
  { slug: "onix", name: "Onix LTZ 1.0", category: "Hatch", details: "Automático", pricePerDay: 130 },
  { slug: "gm-spin", name: "GM Spin 1.8", category: "Minivan", details: "Automática 7 Lugares", pricePerDay: 320 },
  { slug: "vw-t-cross", name: "VW T-Cross 1.0 Turbo", category: "Suv", details: "Automático", pricePerDay: 150 },
  { slug: "honda-city-sedan", name: "Honda City Sedan AT", category: "Intermediário", details: "Automático", pricePerDay: 150 },
  { slug: "fiat-mobi", name: "Fiat Mobi 1.0", category: "Compacto", details: "com Ar", pricePerDay: 100 },
];
