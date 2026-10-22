import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconLink } from "./IconLink";

const meta = {
  title: "Molecules/IconLink",
  component: IconLink,
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUp: Story = {
  args: { icon: "account_circle", href: "/cadastro", children: "Cadastro" },
};

export const Login: Story = {
  args: { icon: "login", href: "/login", children: "Login" },
};
