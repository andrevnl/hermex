import type { SelectHTMLAttributes } from "react";

export type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  placeholder?: string;
};

// Select nativo sem borda nem seta; a molecule Dropdown aplica o visual.
export function Select({
  options,
  placeholder,
  defaultValue = placeholder ? "" : undefined,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      defaultValue={props.value === undefined ? defaultValue : undefined}
      className={`w-full min-w-0 cursor-pointer appearance-none bg-transparent text-body-md outline-none [&>option]:text-neutral-text ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
