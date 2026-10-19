import { Suspense } from "react";
import { auth } from "@/auth";
import { Button } from "@/components/atoms";
import { logout } from "@/lib/actions/auth";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <Suspense fallback={<h1 className="text-2xl font-semibold">Olá</h1>}>
        <Greeting />
      </Suspense>
      <form action={logout}>
        <Button variant="secondary" type="submit">
          Sair
        </Button>
      </form>
    </main>
  );
}

async function Greeting() {
  const session = await auth();
  return (
    <h1 className="text-2xl font-semibold">
      Olá, {session?.user?.name ?? "usuário"}
    </h1>
  );
}
