import type { FormHTMLAttributes } from "react";
import { Button } from "@/components/atoms";
import { Dropdown, IconField } from "@/components/molecules";

type CarSearchBarProps = FormHTMLAttributes<HTMLFormElement>;

// Horários de 07:00 às 21:00, de hora em hora.
const hours = Array.from({ length: 15 }, (_, i) => {
  const value = `${String(i + 7).padStart(2, "0")}:00`;
  return { value, label: value };
});

type SearchRowProps = {
  // Prefixo dos nomes dos campos enviados no formulário ("pickup" ou "return").
  prefix: "pickup" | "return";
  locationPlaceholder: string;
};

function SearchRow({ prefix, locationPlaceholder }: SearchRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 md:flex-nowrap md:gap-6">
      <IconField
        icon="location_on"
        tone="inverse"
        name={`${prefix}Location`}
        placeholder={locationPlaceholder}
        className="w-full md:flex-1"
      />
      <IconField
        icon="calendar_month"
        tone="inverse"
        name={`${prefix}Date`}
        placeholder="Data"
        aria-label={`Data — ${locationPlaceholder.toLowerCase()}`}
        className="flex-1 md:w-32 md:flex-none"
      />
      <Dropdown
        tone="inverse"
        name={`${prefix}Time`}
        placeholder="Horário"
        aria-label={`Horário — ${locationPlaceholder.toLowerCase()}`}
        options={hours}
        className="flex-1 md:w-32 md:flex-none"
      />
    </div>
  );
}

export function CarSearchBar({ className = "", ...props }: CarSearchBarProps) {
  return (
    <section aria-label="Busca de carros" className="bg-primary-dark">
      <form
        role="search"
        action="/"
        className={`mx-auto flex max-w-308 flex-col gap-4 px-4 py-10 md:flex-row md:items-start md:justify-center md:gap-6 ${className}`}
        {...props}
      >
        <div className="flex flex-col gap-4 md:w-249 md:shrink">
          <SearchRow prefix="pickup" locationPlaceholder="Local de retirada" />
          <SearchRow prefix="return" locationPlaceholder="Local de devolução" />
        </div>
        <Button type="submit" variant="secondary">
          Buscar
        </Button>
      </form>
    </section>
  );
}
