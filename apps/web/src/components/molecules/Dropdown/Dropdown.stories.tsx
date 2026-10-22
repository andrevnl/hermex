import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dropdown } from "./Dropdown";

const hours = Array.from({ length: 15 }, (_, i) => {
  const value = `${String(i + 7).padStart(2, "0")}:00`;
  return { value, label: value };
});

const meta = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "brand", "inverse"] },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Filtro de categoria acima da lista de carros.
export const Category: Story = {
  args: {
    tone: "brand",
    placeholder: "Selecione a categoria",
    options: [
      { value: "hatch", label: "Hatch" },
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "minivan", label: "Minivan" },
    ],
  },
};

// Horário de retirada/devolução na barra de busca de carros.
export const Hour: Story = {
  args: {
    tone: "inverse",
    placeholder: "Horário",
    options: hours,
    className: "w-32",
  },
  globals: { backgrounds: { value: "primary" } },
};
