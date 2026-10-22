import {
  Heading,
  SocialIcon,
  type SocialNetwork,
} from "@/components/atoms";

type SocialLinksProps = {
  links: { network: SocialNetwork; href: string }[];
  title?: string;
  className?: string;
};

export function SocialLinks({
  links,
  title = "Siga nossas redes:",
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Heading as="p">{title}</Heading>
      <ul className="flex gap-2">
        {links.map(({ network, href }) => (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <SocialIcon network={network} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
