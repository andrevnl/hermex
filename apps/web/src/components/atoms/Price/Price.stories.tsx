import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Price } from "./Price";

const meta = {
  title: "Atoms/Price",
  component: Price,
  args: { value: 120 },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerDay: Story = {};

export const WithoutUnit: Story = { args: { value: 320, unit: "" } };
