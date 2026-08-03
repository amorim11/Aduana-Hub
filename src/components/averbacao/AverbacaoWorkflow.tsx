"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AverbacaoForm, type AverbacaoFormData } from "./AverbacaoForm";
import { DtaSearchCard } from "./DtaSearchCard";
import { ImportadorCard } from "./ImportadorCard";
import { mockDtaRecords, type DtaRecord } from "./mock-data";
import { simulateUpload } from "@/store/simulateUpload";
import { useUploadStore } from "@/store/useUploadStore";

export type SearchStatus = "idle" | "loading" | "found" | "not-found";

export function AverbacaoWorkflow() {
  const [dtaInput, setDtaInput] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [record, setRecord] = useState<DtaRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const addUpload = useUploadStore((state) => state.addUpload);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = dtaInput.trim();
    if (!key) return;

    setStatus("loading");
    window.setTimeout(() => {
      const found = mockDtaRecords[key];
      if (found) {
        setRecord(found);
        setStatus("found");
      } else {
        setRecord(null);
        setStatus("not-found");
      }
    }, 600);
  }

  function handleAverbacaoSubmit(data: AverbacaoFormData) {
    if (!record) return;

    const id = addUpload({
      dtaNumber: record.numeroDta,
      importerName: record.razaoSocialImportador,
      processType: data.processType,
      processNumber: data.processNumber,
      paisOrigem: record.paisOrigem,
      modal: record.modal,
      numeroConhecimento: record.numeroConhecimento,
      files: data.files,
    });
    simulateUpload(id);

    setToast(
      `Averbação da DTA ${record.numeroDta} enviada para a fila de processamento.`,
    );

    // Libera a tela imediatamente para o operador iniciar outra averbação
    // sem esperar o envio anterior terminar (acompanhamento fica na fila global).
    setDtaInput("");
    setStatus("idle");
    setRecord(null);
  }

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          {toast}
        </div>
      )}

      <DtaSearchCard
        value={dtaInput}
        onChange={setDtaInput}
        onSubmit={handleSearch}
        status={status}
      />

      {record && status === "found" && <ImportadorCard record={record} />}

      {record && status === "found" && (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Dados da Averbação
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Vincule a documentação de importação à DTA localizada.
          </p>
          <div className="mt-6">
            <AverbacaoForm onSubmit={handleAverbacaoSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
