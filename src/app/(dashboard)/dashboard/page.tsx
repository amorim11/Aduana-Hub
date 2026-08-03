import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Visão geral das operações do seu Porto Seco.
      </p>

      <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Nenhum indicador configurado ainda
        </p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Os indicadores de averbação e documentos aparecerão aqui assim que
          o módulo for conectado ao Siscomex.
        </p>
      </div>
    </div>
  );
}
