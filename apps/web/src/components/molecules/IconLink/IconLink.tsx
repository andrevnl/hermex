import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/atoms";

type IconLinkProps = ComponentProps<typeof Link> & {
  // Nome do ícone do Material Icons exibido antes do texto.
  icon: string;
};

export function IconLink({ icon, className = "", children, ...props }: IconLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-body-md text-neutral-text hover:text-primary-dark ${className}`}
      {...props}
    >
      <Icon name={icon} />
      {children}
    </Link>
  );
}
