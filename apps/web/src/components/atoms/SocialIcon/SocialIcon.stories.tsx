import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialIcon } from "./SocialIcon";

const meta = {
  title: "Atoms/SocialIcon",
  component: SocialIcon,
  args: { network: "whatsapp" },
  argTypes: {
    network: {
      control: "inline-radio",
      options: ["whatsapp", "instagram", "tiktok"],
    },
  },
  globals: { backgrounds: { value: "secondary" } },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Whatsapp: Story = {};
export const Instagram: Story = { args: { network: "instagram" } };
export const Tiktok: Story = { args: { network: "tiktok" } };
