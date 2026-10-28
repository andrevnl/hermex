import type { ComponentProps } from "react";
import { Icon, Select } from "@/components/atoms";
import { fieldTones, type FieldTone } from "../IconField";

type DropdownProps = ComponentProps<typeof Select> & {
  tone?: FieldTone;
  // Nome do ícone do Material Icons exibido à esquerda (opcional).
  icon?: string;
};

export function Dropdown({
  tone = "neutral",
  icon,
  className = "",
  "aria-label": ariaLabel,
  placeholder,
  ...props
}: DropdownProps) {
  return (
    <label
      className={`relative flex items-center gap-2 rounded border ${fieldTones[tone]} ${className}`}
    >
      {icon && (
        <Icon name={icon} className="pointer-events-none absolute left-4" />
      )}
      <Select
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={`py-3 pr-10 ${icon ? "pl-10" : "pl-4"}`}
        {...props}
      />
      <Icon
        name="keyboard_arrow_down"
        className="pointer-events-none absolute right-4"
      />
    </label>
  );
}
