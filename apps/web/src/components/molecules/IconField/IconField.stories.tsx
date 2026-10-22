import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconField } from "./IconField";

const meta = {
  title: "Molecules/IconField",
  component: IconField,
  args: { icon: "search", placeholder: "O que você procura?" },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "brand", "inverse"] },
  },
} satisfies Meta<typeof IconField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Busca do cabeçalho.
export const Search: Story = { args: { type: "search" } };

// Local de retirada/devolução na barra de busca de carros.
export const Location: Story = {
  args: {
    icon: "location_on",
    placeholder: "Local de retirada",
    tone: "inverse",
    className: "w-120",
  },
  globals: { backgrounds: { value: "primary" } },
};

export const DatePicker: Story = {
  args: {
    icon: "calendar_month",
    placeholder: "Data",
    tone: "inverse",
    className: "w-32",
  },
  globals: { backgrounds: { value: "primary" } },
};
