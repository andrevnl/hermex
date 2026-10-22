import Image from "next/image";
import Link from "next/link";
import { buttonClassName, Price } from "@/components/atoms";

type CarCardProps = {
  name: string;
  // Categoria e câmbio, ex.: "Hatch Manual".
  description: string;
  imageSrc: string;
  pricePerDay: number;
  detailsHref: string;
  className?: string;
};

export function CarCard({
  name,
  description,
  imageSrc,
  pricePerDay,
  detailsHref,
  className = "",
}: CarCardProps) {
  return (
    <article
      className={`flex w-full max-w-90 flex-col items-center gap-4 rounded bg-white p-8 text-black shadow-elevation-2 ${className}`}
    >
      <div className="relative h-40 w-full bg-neutral-details">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="280px"
          className="object-contain p-3"
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-body-lg leading-[1.25]">{name}</h3>
          <p className="text-body-md">{description}</p>
        </div>
        <Price value={pricePerDay} />
        <Link
          href={detailsHref}
          className={`${buttonClassName("primary")} w-full`}
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
