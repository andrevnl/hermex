import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "inverse"] },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  args: { variant: "inverse" },
  globals: { backgrounds: { value: "secondary" } },
};
