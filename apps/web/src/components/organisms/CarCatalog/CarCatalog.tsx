"use client";

import { useState, type HTMLAttributes } from "react";
import { CarCard, Dropdown } from "@/components/molecules";
import type { Car } from "@/lib/cars";

type CarCatalogProps = HTMLAttributes<HTMLElement> & {
  cars: Car[];
};

const ALL = "all";

export function CarCatalog({ cars, className = "", ...props }: CarCatalogProps) {
  const [category, setCategory] = useState("");

  const categories = [...new Set(cars.map((car) => car.category))];
  const options = [
    { value: ALL, label: "Todas as categorias" },
    ...categories.map((name) => ({ value: name, label: name })),
  ];
  const visibleCars =
    category && category !== ALL
      ? cars.filter((car) => car.category === category)
      : cars;

  return (
    <section
      aria-label="Catálogo de carros"
      className={`mx-auto flex max-w-308 flex-col gap-10 px-4 py-14 ${className}`}
      {...props}
    >
      <Dropdown
        tone="brand"
        placeholder="Selecione a categoria"
        options={options}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="self-start"
      />

      {visibleCars.length === 0 ? (
        <p className="text-center text-body-md text-neutral-text">
          Nenhum carro encontrado.
        </p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {visibleCars.map((car) => (
            <li key={car.id} className="flex w-full max-w-90">
              <CarCard
                name={car.name}
                description={`${car.category} ${car.details}`}
                imageSrc={car.imageSrc}
                pricePerDay={car.pricePerDay}
                detailsHref={`/veiculos/${car.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
