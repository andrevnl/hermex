import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  // Nome do ícone do Material Icons (ex.: "search", "calendar_month").
  name: string;
  size?: number;
};

export function Icon({ name, size = 16, className = "", style, ...props }: IconProps) {
  return (
    <span
      aria-hidden
      className={`material-icons shrink-0 select-none ${className}`}
      style={{ fontSize: size, ...style }}
      {...props}
    >
      {name}
    </span>
  );
}
