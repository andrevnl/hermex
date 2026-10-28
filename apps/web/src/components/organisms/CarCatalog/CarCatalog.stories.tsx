import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { sampleCategories, sampleCars } from "@/lib/cars";
import { CarCatalog } from "./CarCatalog";

const meta = {
  title: "Organisms/CarCatalog",
  component: CarCatalog,
  parameters: { layout: "fullscreen" },
  args: {
    cars: sampleCars,
    categories: sampleCategories,
    selectedCategoryId: null,
    onCategoryChange: fn(),
  },
} satisfies Meta<typeof CarCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    cars: sampleCars.filter((car) => car.category === "Hatch"),
    selectedCategoryId: "hatch",
  },
};

export const Empty: Story = {
  args: { cars: [] },
};
