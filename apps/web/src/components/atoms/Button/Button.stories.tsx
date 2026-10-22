import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Ver detalhes" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };

export const Secondary: Story = {
  args: { variant: "secondary", children: "Buscar" },
};

export const Disabled: Story = { args: { disabled: true } };
