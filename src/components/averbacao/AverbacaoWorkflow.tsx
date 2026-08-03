"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AverbacaoForm } from "./AverbacaoForm";
import { DtaSearchCard } from "./DtaSearchCard";
import { ImportadorCard } from "./ImportadorCard";
import { mockDtaRecords, type DtaRecord } from "./mock-data";

export type SearchStatus = "idle" | "loading" | "found" | "not-found";

export function AverbacaoWorkflow() {
  const [dtaInput, setDtaInput] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [record, setRecord] = useState<DtaRecord | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = dtaInput.trim();
    if (!key) return;

    setStatus("loading");
    setSubmitted(false);
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

  function handleNovaAverbacao() {
    setDtaInput("");
    setStatus("idle");
    setRecord(null);
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <DtaSearchCard
        value={dtaInput}
        onChange={setDtaInput}
        onSubmit={handleSearch}
        status={status}
      />

      {record && status === "found" && <ImportadorCard record={record} />}

      {record && status === "found" && !submitted && (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Dados da Averbação
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Vincule a documentação de importação à DTA localizada.
          </p>
          <div className="mt-6">
            <AverbacaoForm onSubmitted={() => setSubmitted(true)} />
          </div>
        </div>
      )}

      {submitted && record && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-emerald-600"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-800">
              Averbação enviada com sucesso
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              A DTA {record.numeroDta} foi vinculada à documentação enviada.
            </p>
            <button
              type="button"
              onClick={handleNovaAverbacao}
              className="mt-3 cursor-pointer text-sm font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Iniciar nova averbação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
