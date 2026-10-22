import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  args: {
    placeholder: "Selecione a categoria",
    options: [
      { value: "hatch", label: "Hatch" },
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
