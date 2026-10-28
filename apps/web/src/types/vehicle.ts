// Tipos da resposta da query `vehicles` da API GraphQL.

export type Transmission = "MANUAL" | "AUTOMATIC";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  imageUrl: string | null;
  dailyRate: number;
  transmission: Transmission;
  category: {
    id: string;
    name: string;
  };
};

export type VehiclePage = {
  items: Vehicle[];
  totalCount: number;
};
