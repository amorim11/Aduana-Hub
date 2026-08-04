"use client";

import { Loader2, Search } from "lucide-react";
import type { SearchStatus } from "./AverbacaoWorkflow";

type DtaSearchCardProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  status: SearchStatus;
};

export function DtaSearchCard({
  value,
  onChange,
  onSubmit,
  status,
}: DtaSearchCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
      <h2 className="text-base font-semibold text-zinc-900">Buscar DTA</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Informe o número da Declaração de Trânsito Aduaneiro para localizar a
        carga.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="dtaNumber" className="sr-only">
          Número da DTA
        </label>
        <input
          id="dtaNumber"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex: 24/0456123-9"
          className="w-full flex-1 rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} />
          )}
          Buscar
        </button>
      </form>

      {status === "not-found" && (
        <p className="mt-3 text-sm text-red-600">
          Nenhuma DTA encontrada para esse número. Tente 24/0456123-9,
          24/0512987-4 ou 24/0098231-1.
        </p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          Não foi possível buscar a DTA agora. Tente novamente em instantes.
        </p>
      )}
    </div>
  );
}
