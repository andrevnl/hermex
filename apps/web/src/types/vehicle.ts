// Tipos das respostas das queries `vehicles` e `categories` da API GraphQL.

export type Transmission = "MANUAL" | "AUTOMATIC";

export type Category = {
  id: string;
  name: string;
};

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  imageUrl: string | null;
  dailyRate: number;
  transmission: Transmission;
  category: Category;
};

export type VehiclePage = {
  items: Vehicle[];
  totalCount: number;
};
