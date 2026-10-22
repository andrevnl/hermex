import type { ComponentProps, HTMLAttributes } from "react";
import { Logo } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";

type SocialLinkList = ComponentProps<typeof SocialLinks>["links"];

type FooterProps = HTMLAttributes<HTMLElement> & {
  socialLinks?: SocialLinkList;
};

// Projeto fictício: os links apontam para as páginas iniciais das redes.
const defaultSocialLinks: SocialLinkList = [
  { network: "whatsapp", href: "https://wa.me/" },
  { network: "instagram", href: "https://instagram.com/" },
  { network: "tiktok", href: "https://tiktok.com/" },
];

export function Footer({
  socialLinks = defaultSocialLinks,
  className = "",
  ...props
}: FooterProps) {
  return (
    <footer className={`bg-secondary-dark text-white ${className}`} {...props}>
      <div className="mx-auto flex max-w-378 flex-col gap-8 px-4 py-8 text-body-md md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6">
          <Logo variant="inverse" />
          <p>O carro ideal para sua ocasião</p>
        </div>
        <p>Desenvolvido por Alura. Projeto fictício sem fins comerciais.</p>
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
