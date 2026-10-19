export function AuthTemplate({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <p className="text-sm font-semibold tracking-widest">HERMEX</p>
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        {children}
      </div>
    </main>
  );
}
