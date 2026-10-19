import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">HERMEX</h1>
      <p className="text-foreground/70">Locadora de veículos</p>
      <Link
        href="/login"
        className="h-10 rounded-md bg-foreground px-4 leading-10 text-sm font-medium text-background"
      >
        Entrar
      </Link>
    </main>
  );
}
