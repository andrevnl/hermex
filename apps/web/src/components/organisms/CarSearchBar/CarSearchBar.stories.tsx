import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarSearchBar } from "./CarSearchBar";

const meta = {
  title: "Organisms/CarSearchBar",
  component: CarSearchBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CarSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
