import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
};

// Classes do botão, reutilizáveis em links estilizados como botão.
export function buttonClassName(variant: ButtonVariant = "primary") {
  return `inline-flex items-center justify-center gap-2 rounded px-4 py-3 text-body-md whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant]}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${buttonClassName(variant)} ${className}`} {...props} />
  );
}
