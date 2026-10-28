import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CarCatalog } from "@/components/organisms";
import { sampleCategories, sampleCars } from "@/lib/cars";
import { HomeTemplate } from "./HomeTemplate";

const meta = {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <CarCatalog
        cars={sampleCars}
        categories={sampleCategories}
        selectedCategoryId={null}
        onCategoryChange={fn()}
      />
    ),
  },
} satisfies Meta<typeof HomeTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
