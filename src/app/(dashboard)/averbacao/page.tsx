import type { Metadata } from "next";
import { AverbacaoWorkflow } from "@/components/averbacao/AverbacaoWorkflow";

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

      <div className="mt-6 max-w-3xl">
        <AverbacaoWorkflow />
      </div>
    </div>
  );
}
