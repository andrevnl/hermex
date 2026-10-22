import Image from "next/image";
import type { HTMLAttributes } from "react";
import { Heading } from "@/components/atoms";

type HeroBannerProps = HTMLAttributes<HTMLElement>;

export function HeroBanner({ className = "", ...props }: HeroBannerProps) {
  return (
    <section
      className={`relative overflow-hidden bg-secondary-dark md:h-150 ${className}`}
      {...props}
    >
      {/*
        Arte de 1920×600 do Figma. Fica ancorada à coluna de conteúdo (o título
        começa em x=360 do canvas) para manter a relação entre texto e foto;
        em telas estreitas o excesso à direita é cortado.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-[max(calc(50%-960px),-344px)] h-150 w-480"
      >
        <Image
          src="/images/banner/chevrons-bg.svg"
          alt=""
          width={1111.92}
          height={642}
          unoptimized
          className="absolute top-[-16px] left-0"
        />
        <div className="absolute top-[-65px] left-[669px] hidden h-[852px] w-[1278px] xl:block">
          <Image
            src="/images/banner/hero-photo.png"
            alt=""
            fill
            preload
            sizes="1278px"
            className="object-cover"
          />
        </div>
        <Image
          src="/images/banner/chevrons-left.svg"
          alt=""
          width={77.4375}
          height={77}
          unoptimized
          className="absolute top-[210px] left-[1325px] hidden rotate-180 xl:block"
        />
        <Image
          src="/images/banner/chevrons-right.svg"
          alt=""
          width={128}
          height={127.28}
          unoptimized
          className="absolute top-[98px] left-[1640px] hidden xl:block"
        />
      </div>

      <div className="relative mx-auto max-w-308 px-4 py-16">
        <Heading
          as="h1"
          size="xxl"
          className="max-w-168 text-white max-md:text-5xl"
        >
          <span className="text-primary">Encontre o carro ideal</span> para
          todas as ocasiões
        </Heading>
      </div>
    </section>
  );
}
