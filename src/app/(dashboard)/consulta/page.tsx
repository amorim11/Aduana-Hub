import type { Metadata } from "next";
import { ConsultaWorkflow } from "@/components/consulta/ConsultaWorkflow";

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

      <div className="mt-6">
        <ConsultaWorkflow />
      </div>
    </div>
  );
}
