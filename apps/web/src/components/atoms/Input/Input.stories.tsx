import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: { placeholder: "Digite aqui" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "bare"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bare: Story = { args: { variant: "bare" } };
