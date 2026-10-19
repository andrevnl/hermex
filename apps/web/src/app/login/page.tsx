import { Suspense } from "react";
import { LoginForm } from "@/components/organisms";
import { AuthTemplate } from "@/components/templates";

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <AuthTemplate title="Entrar">
      <Suspense fallback={<LoginForm />}>
        <LoginFormWithCallback searchParams={searchParams} />
      </Suspense>
    </AuthTemplate>
  );
}

async function LoginFormWithCallback({
  searchParams,
}: Pick<PageProps<"/login">, "searchParams">) {
  const { callbackUrl } = await searchParams;
  return (
    <LoginForm
      callbackUrl={typeof callbackUrl === "string" ? callbackUrl : undefined}
    />
  );
}
