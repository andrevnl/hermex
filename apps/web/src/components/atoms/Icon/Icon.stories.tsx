import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  args: { name: "search", size: 16 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Ícones usados na página inicial.
export const Catalog: Story = {
  render: (args) => (
    <div className="flex gap-4 text-neutral-text">
      {[
        "search",
        "account_circle",
        "login",
        "location_on",
        "calendar_month",
        "keyboard_arrow_down",
      ].map((name) => (
        <Icon key={name} {...args} name={name} size={24} />
      ))}
    </div>
  ),
};
