import Image from "next/image";

type LogoProps = {
  // "default" para fundos claros, "inverse" para fundos escuros.
  variant?: "default" | "inverse";
  className?: string;
};

const sources = {
  default: {
    mark: "/images/brand/logo-mark-light.svg",
    sub: "/images/brand/logo-sub-light.svg",
  },
  inverse: {
    mark: "/images/brand/logo-mark-dark.svg",
    sub: "/images/brand/logo-sub-dark.svg",
  },
};

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const { mark, sub } = sources[variant];

  return (
    <div
      role="img"
      aria-label="Hermex locadora"
      className={`relative aspect-[180/60.472] w-45 shrink-0 ${className}`}
    >
      <div className="absolute inset-[9.94%_7.95%_41.59%_7.95%]">
        <Image src={mark} alt="" fill unoptimized />
      </div>
      <div className="absolute inset-[65.71%_8.64%_16.45%_48.32%]">
        <Image src={sub} alt="" fill unoptimized />
      </div>
    </div>
  );
}
