import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialLinks } from "./SocialLinks";

const meta = {
  title: "Molecules/SocialLinks",
  component: SocialLinks,
  args: {
    className: "text-white",
    links: [
      { network: "whatsapp", href: "https://wa.me/" },
      { network: "instagram", href: "https://instagram.com/" },
      { network: "tiktok", href: "https://tiktok.com/" },
    ],
  },
  globals: { backgrounds: { value: "secondary" } },
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
