type PriceProps = {
  // Valor em reais.
  value: number;
  unit?: string;
  className?: string;
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function Price({ value, unit = "/diária", className = "" }: PriceProps) {
  return (
    <p className={`flex items-baseline ${className}`}>
      <span className="font-heading text-heading-xs font-bold">
        {currency.format(value)}
      </span>
      {unit && <span className="text-body-lg">{unit}</span>}
    </p>
  );
}
