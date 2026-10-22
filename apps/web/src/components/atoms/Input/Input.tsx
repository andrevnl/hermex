import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  // "bare" remove borda e espaçamento para uso dentro de molecules (ex.: IconField).
  variant?: "default" | "bare";
};

const variants = {
  default:
    "h-10 rounded-md border border-foreground/20 px-3 text-sm focus:border-foreground",
  bare: "text-body-md placeholder:text-current",
};

export function Input({
  variant = "default",
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full min-w-0 bg-transparent outline-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
