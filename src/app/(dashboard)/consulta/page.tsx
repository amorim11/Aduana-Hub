import type { Metadata } from "next";

export const metadata: Metadata = { title: "Consulta de Documentos" };

export default function ConsultaPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Consulta de Documentos
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Busque DTA, DI e DUIMP já averbados no recinto.
      </p>

      <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Nenhum documento consultado ainda
        </p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          A busca por número de documento ou carga será adicionada aqui.
        </p>
      </div>
    </div>
  );
}
