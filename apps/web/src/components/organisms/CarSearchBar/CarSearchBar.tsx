"use client";

import type { FormEvent, FormHTMLAttributes } from "react";
import { Button, Icon, type SelectOption } from "@/components/atoms";
import { Dropdown, IconField } from "@/components/molecules";
import type { SearchValues } from "@/lib/search-params";
import type { Location } from "@/types/location";

type CarSearchBarProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "defaultValue"
> & {
  locations: Location[];
  defaultValues?: Partial<SearchValues>;
  // Recebe os seis campos como preenchidos; a validação fica com quem chama.
  onSearch?: (values: SearchValues) => void;
  // Quando informado, exibe "Limpar busca" (ex.: só com a busca ativa).
  onClear?: () => void;
  // Mensagem exibida abaixo dos campos.
  error?: string;
};

// Horários de 07:00 às 21:00, de hora em hora.
const hours = Array.from({ length: 15 }, (_, i) => {
  const value = `${String(i + 7).padStart(2, "0")}:00`;
  return { value, label: value };
});

type SearchRowProps = {
  // Prefixo dos nomes dos campos ("pickup" ou "return").
  prefix: "pickup" | "return";
  locationPlaceholder: string;
  locationOptions: SelectOption[];
  defaultValues: Partial<SearchValues>;
};

function SearchRow({
  prefix,
  locationPlaceholder,
  locationOptions,
  defaultValues,
}: SearchRowProps) {
  const context = locationPlaceholder.toLowerCase();
  // local fora da lista cai no placeholder; sem isso o navegador seleciona a
  // primeira opção e o campo mostraria um local que o usuário não escolheu
  const location = defaultValues[`${prefix}Location`];
  const knownLocation = locationOptions.some(({ value }) => value === location);

  return (
    <div className="flex flex-wrap items-center gap-4 md:flex-nowrap md:gap-6">
      <Dropdown
        icon="location_on"
        tone="inverse"
        name={`${prefix}Location`}
        placeholder={locationPlaceholder}
        options={locationOptions}
        defaultValue={knownLocation ? location : ""}
        className="w-full md:flex-1"
      />
      <IconField
        icon="calendar_month"
        tone="inverse"
        type="date"
        name={`${prefix}Date`}
        placeholder="Data"
        aria-label={`Data — ${context}`}
        defaultValue={defaultValues[`${prefix}Date`]}
        // abre o calendário ao clicar em qualquer ponto do campo
        onClick={(event) => event.currentTarget.showPicker?.()}
        className="flex-1 md:w-40 md:flex-none"
      />
      <Dropdown
        tone="inverse"
        name={`${prefix}Time`}
        placeholder="Horário"
        aria-label={`Horário — ${context}`}
        options={hours}
        defaultValue={defaultValues[`${prefix}Time`] ?? ""}
        className="flex-1 md:w-32 md:flex-none"
      />
    </div>
  );
}

export function CarSearchBar({
  locations,
  defaultValues = {},
  onSearch,
  onClear,
  error,
  className = "",
  ...props
}: CarSearchBarProps) {
  const locationOptions = locations.map(({ id, name, city, state }) => ({
    value: id,
    label: `${name} — ${city}/${state}`,
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: keyof SearchValues) => String(data.get(name) ?? "");

    onSearch?.({
      pickupLocation: field("pickupLocation"),
      pickupDate: field("pickupDate"),
      pickupTime: field("pickupTime"),
      returnLocation: field("returnLocation"),
      returnDate: field("returnDate"),
      returnTime: field("returnTime"),
    });
  }

  return (
    <section aria-label="Busca de carros" className="bg-primary-dark">
      <form
        role="search"
        noValidate
        onSubmit={handleSubmit}
        className={`mx-auto flex max-w-308 flex-col gap-4 px-4 py-10 md:flex-row md:items-start md:justify-center md:gap-6 ${className}`}
        {...props}
      >
        <div className="flex flex-col gap-4 md:w-249 md:shrink">
          <SearchRow
            prefix="pickup"
            locationPlaceholder="Local de retirada"
            locationOptions={locationOptions}
            defaultValues={defaultValues}
          />
          <SearchRow
            prefix="return"
            locationPlaceholder="Local de devolução"
            locationOptions={locationOptions}
            defaultValues={defaultValues}
          />
          {error && (
            <p
              role="alert"
              className="flex items-center gap-2 text-body-md text-white"
            >
              <Icon name="error" />
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-body-md text-white underline underline-offset-4 hover:no-underline"
            >
              Limpar busca
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
