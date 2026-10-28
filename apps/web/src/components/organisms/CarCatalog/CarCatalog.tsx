import type { HTMLAttributes } from "react";
import { CarCard, Dropdown } from "@/components/molecules";
import type { Car } from "@/lib/cars";
import type { Category } from "@/types/vehicle";

type CarCatalogProps = HTMLAttributes<HTMLElement> & {
  cars: Car[];
  categories: Category[];
  selectedCategoryId: string | null;
  // null quando o usuário escolhe "Todas as categorias".
  onCategoryChange: (categoryId: string | null) => void;
};

const ALL = "all";

export function CarCatalog({
  cars,
  categories,
  selectedCategoryId,
  onCategoryChange,
  className = "",
  ...props
}: CarCatalogProps) {
  const options = [
    { value: ALL, label: "Todas as categorias" },
    ...categories.map(({ id, name }) => ({ value: id, label: name })),
  ];

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
        value={selectedCategoryId ?? ""}
        onChange={({ target: { value } }) =>
          onCategoryChange(value === ALL ? null : value)
        }
        className="self-start"
      />

      {cars.length === 0 ? (
        <p className="text-center text-body-md text-neutral-text">
          Nenhum carro encontrado.
        </p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {cars.map((car) => (
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
