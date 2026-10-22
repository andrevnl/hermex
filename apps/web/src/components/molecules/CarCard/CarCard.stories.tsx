import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarCard } from "./CarCard";

const meta = {
  title: "Molecules/CarCard",
  component: CarCard,
  args: {
    name: "Hyundai HB20 1.0",
    description: "Hatch Manual",
    imageSrc: "/images/cars/hb20.png",
    pricePerDay: 120,
    detailsHref: "/veiculos/hb20",
  },
} satisfies Meta<typeof CarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongDescription: Story = {
  args: {
    name: "GM Spin 1.8",
    description: "Minivan Automática 7 Lugares",
    imageSrc: "/images/cars/gm-spin.png",
    pricePerDay: 320,
  },
};

const cars = [
  ["Hyundai HB20 1.0", "Hatch Manual", "hb20", 120],
  ["Honda City", "Hatch Automático", "honda-city", 130],
  ["Jeep Renegade 1.3", "Suv Automático", "renegade", 140],
  ["Fiat Cronos", "Sedan Manual", "fiat-cronos", 130],
  ["Onix LTZ 1.0", "Hatch Automático", "onix", 130],
  ["GM Spin 1.8", "Minivan Automática 7 Lugares", "gm-spin", 320],
  ["VW T-Cross 1.0 Turbo", "Suv Automático", "vw-t-cross", 150],
  ["Honda City Sedan AT", "Intermediário Automático", "honda-city-sedan", 150],
  ["Fiat Mobi 1.0", "Compacto com Ar", "fiat-mobi", 100],
] as const;

// Prévia da grade da página inicial (a grade em si será um organism).
export const Grid: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-[repeat(3,22.5rem)] gap-x-10 gap-y-4">
      {cars.map(([name, description, slug, price]) => (
        <CarCard
          key={slug}
          name={name}
          description={description}
          imageSrc={`/images/cars/${slug}.png`}
          pricePerDay={price}
          detailsHref={`/veiculos/${slug}`}
        />
      ))}
    </div>
  ),
};
