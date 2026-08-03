import type { Metadata } from "next";

export const metadata: Metadata = { title: "Averbação" };

export default function AverbacaoPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Averbação
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Vincule DTA, DI ou DUIMP à carga recebida no recinto.
      </p>

      <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Formulário de averbação em construção
        </p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Esta tela receberá o fluxo de vínculo entre documentação e carga.
        </p>
      </div>
    </div>
  );
}
