import type { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-10 w-full rounded-md border border-foreground/20 bg-transparent px-3 text-sm outline-none focus:border-foreground ${className}`}
      {...props}
    />
  );
}
