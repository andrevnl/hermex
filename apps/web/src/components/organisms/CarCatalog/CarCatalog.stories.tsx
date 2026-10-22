import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { sampleCars } from "@/lib/cars";
import { CarCatalog } from "./CarCatalog";

const meta = {
  title: "Organisms/CarCatalog",
  component: CarCatalog,
  parameters: { layout: "fullscreen" },
  args: { cars: sampleCars },
} satisfies Meta<typeof CarCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { cars: [] },
};
