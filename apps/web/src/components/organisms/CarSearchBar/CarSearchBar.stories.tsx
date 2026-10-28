import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CarSearchBar } from "./CarSearchBar";

const meta = {
  title: "Organisms/CarSearchBar",
  component: CarSearchBar,
  parameters: { layout: "fullscreen" },
  args: {
    locations: [
      { id: "gru", name: "Aeroporto de Guarulhos", city: "Guarulhos", state: "SP" },
      { id: "rio", name: "Centro do Rio de Janeiro", city: "Rio de Janeiro", state: "RJ" },
      { id: "bh", name: "Savassi", city: "Belo Horizonte", state: "MG" },
    ],
    onSearch: fn(),
  },
} satisfies Meta<typeof CarSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Busca ativa: campos preenchidos e opção de limpar.
export const WithValues: Story = {
  args: {
    defaultValues: {
      pickupLocation: "gru",
      pickupDate: "2026-11-01",
      pickupTime: "10:00",
      returnLocation: "rio",
      returnDate: "2026-11-05",
      returnTime: "18:00",
    },
    onClear: fn(),
  },
};

export const WithError: Story = {
  args: { error: "A devolução deve ser depois da retirada." },
};
