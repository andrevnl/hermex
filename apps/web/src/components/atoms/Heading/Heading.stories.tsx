import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "xxl"] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Siga nossas redes:" },
};

export const ExtraExtraLarge: Story = {
  args: {
    as: "h1",
    size: "xxl",
    className: "max-w-168 text-white",
    children: (
      <>
        <span className="text-primary">Encontre o carro ideal</span> para todas
        as ocasiões
      </>
    ),
  },
  globals: { backgrounds: { value: "secondary" } },
};
