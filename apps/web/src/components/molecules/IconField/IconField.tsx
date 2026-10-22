import type { InputHTMLAttributes } from "react";
import { Icon, Input } from "@/components/atoms";

export type FieldTone = "neutral" | "brand" | "inverse";

// Cores de borda e texto por contexto: fundo branco, destaque da marca ou fundo escuro/laranja.
export const fieldTones: Record<FieldTone, string> = {
  neutral: "border-neutral-details text-neutral-text focus-within:border-neutral-text",
  brand: "border-secondary text-secondary focus-within:border-secondary-dark",
  inverse: "border-white text-white focus-within:ring-1 focus-within:ring-white",
};

type IconFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  // Nome do ícone do Material Icons exibido à esquerda.
  icon: string;
  tone?: FieldTone;
};

export function IconField({
  icon,
  tone = "neutral",
  className = "",
  "aria-label": ariaLabel,
  placeholder,
  ...props
}: IconFieldProps) {
  return (
    <label
      className={`flex cursor-text items-center gap-2 rounded border px-4 py-3 ${fieldTones[tone]} ${className}`}
    >
      <Icon name={icon} />
      <Input
        variant="bare"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        {...props}
      />
    </label>
  );
}
