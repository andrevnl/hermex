import { Exo_2, Inter } from "next/font/google";

// Fontes do design system: Inter (texto) e Exo 2 (títulos e preços).
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["700"],
});

export const fontVariables = `${inter.variable} ${exo2.variable}`;
