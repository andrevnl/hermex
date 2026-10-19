"use client";

import { useActionState } from "react";
import { Button } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { login } from "@/lib/actions/auth";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? ""} />
      <FormField label="E-mail" name="email" type="email" required />
      <FormField label="Senha" name="password" type="password" required />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
