import Image from "next/image";

export type SocialNetwork = "whatsapp" | "instagram" | "tiktok";

export const socialNetworkNames: Record<SocialNetwork, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  tiktok: "TikTok",
};

type SocialIconProps = {
  network: SocialNetwork;
  className?: string;
};

export function SocialIcon({ network, className = "" }: SocialIconProps) {
  return (
    <Image
      src={`/images/social/${network}.svg`}
      alt={socialNetworkNames[network]}
      width={32}
      height={32}
      unoptimized
      className={`size-8 ${className}`}
    />
  );
}
