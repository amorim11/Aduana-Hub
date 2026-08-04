"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AverbacaoForm, type AverbacaoFormData } from "./AverbacaoForm";
import { DtaSearchCard } from "./DtaSearchCard";
import { ImportadorCard } from "./ImportadorCard";
import type { DtaRecord } from "@/mocks/data";
import { ApiError, fetchDta, submitAverbacao } from "@/services/api";
import { simulateUpload } from "@/store/simulateUpload";
import { useUploadStore } from "@/store/useUploadStore";

export type SearchStatus = "idle" | "loading" | "found" | "not-found" | "error";

export function AverbacaoWorkflow() {
  const [dtaInput, setDtaInput] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [record, setRecord] = useState<DtaRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const addUpload = useUploadStore((state) => state.addUpload);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = dtaInput.trim();
    if (!key) return;

    setStatus("loading");
    try {
      const found = await fetchDta(key);
      setRecord(found);
      setStatus("found");
    } catch (error) {
      setRecord(null);
      setStatus(error instanceof ApiError && error.status === 404 ? "not-found" : "error");
    }
  }

  async function handleAverbacaoSubmit(data: AverbacaoFormData) {
    if (!record) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitAverbacao({
        dtaNumber: record.numeroDta,
        processType: data.processType,
        processNumber: data.processNumber,
        comissaria: data.comissaria,
        codigoReferencia: data.codigoReferencia,
        coberturaCambial: data.coberturaCambial,
        files: data.files,
      });

      addUpload({
        id: result.id,
        dtaNumber: record.numeroDta,
        importerName: record.razaoSocialImportador,
        processType: data.processType,
        processNumber: data.processNumber,
        paisOrigem: record.paisOrigem,
        modal: record.modal,
        numeroConhecimento: record.numeroConhecimento,
        files: data.files,
      });
      simulateUpload(result.id);

      setToast(
        `Averbação da DTA ${record.numeroDta} enviada para a fila de processamento.`,
      );

      // Libera a tela para o operador iniciar outra averbação sem esperar o
      // envio anterior terminar (acompanhamento fica na fila global).
      setDtaInput("");
      setStatus("idle");
      setRecord(null);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Não foi possível enviar a averbação agora. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
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

          {submitError && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <div className="mt-6">
            <AverbacaoForm
              onSubmit={handleAverbacaoSubmit}
              submitting={submitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}
