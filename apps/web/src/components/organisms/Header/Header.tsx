import Link from "next/link";
import type { HTMLAttributes } from "react";
import { Logo } from "@/components/atoms";
import { IconField, IconLink } from "@/components/molecules";

type HeaderProps = HTMLAttributes<HTMLElement>;

export function Header({ className = "", ...props }: HeaderProps) {
  return (
    <header className={`bg-white ${className}`} {...props}>
      <div className="mx-auto flex max-w-308 flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" aria-label="Página inicial">
          <Logo />
        </Link>

        {/* Na versão mobile a busca desce para uma linha própria. */}
        <form
          role="search"
          action="/"
          className="order-last w-full md:order-none md:w-auto"
        >
          <IconField
            icon="search"
            type="search"
            name="busca"
            placeholder="O que você procura?"
            className="md:w-60"
          />
        </form>

        <nav aria-label="Conta" className="flex items-center gap-6">
          <IconLink icon="account_circle" href="/cadastro">
            Cadastro
          </IconLink>
          <IconLink icon="login" href="/login">
            Login
          </IconLink>
        </nav>
      </div>
    </header>
  );
}
