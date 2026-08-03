"use client";

import { useState } from "react";
import { FileUploadField } from "./FileUploadField";
import { comissariaOptions } from "./mock-data";

export type ProcessType = "DUIMP" | "DI";

const processTypes: ProcessType[] = ["DUIMP", "DI"];

const coberturaCambialOptions = [
  { value: "nao", label: "Não" },
  { value: "sim", label: "Sim" },
] as const;

export type AverbacaoFormData = {
  processType: ProcessType;
  processNumber: string;
  files: string[];
  comissaria: string;
  codigoReferencia: string;
  coberturaCambial: "sim" | "nao";
};

type AverbacaoFormProps = {
  onSubmit: (data: AverbacaoFormData) => void;
};

export function AverbacaoForm({ onSubmit }: AverbacaoFormProps) {
  const [processType, setProcessType] = useState<ProcessType>("DUIMP");
  const [duimpPdf, setDuimpPdf] = useState<File | null>(null);
  const [chaveAcesso, setChaveAcesso] = useState("");
  const [diPdf, setDiPdf] = useState<File | null>(null);
  const [diXml, setDiXml] = useState<File | null>(null);
  const [diNumero, setDiNumero] = useState("");
  const [comissaria, setComissaria] = useState("");
  const [codigoReferencia, setCodigoReferencia] = useState("");
  const [coberturaCambial, setCoberturaCambial] = useState<"sim" | "nao">(
    "nao",
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const files =
      processType === "DUIMP"
        ? [duimpPdf?.name].filter((name): name is string => Boolean(name))
        : [diPdf?.name, diXml?.name].filter(
            (name): name is string => Boolean(name),
          );

    onSubmit({
      processType,
      processNumber: processType === "DUIMP" ? chaveAcesso : diNumero,
      files,
      comissaria,
      codigoReferencia,
      coberturaCambial,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <span className="text-sm font-medium text-zinc-700">
          Tipo de Processo
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:w-72">
          {processTypes.map((type) => (
            <label
              key={type}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                processType === type
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <input
                type="radio"
                name="processType"
                value={type}
                checked={processType === type}
                onChange={() => setProcessType(type)}
                className="sr-only"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {processType === "DUIMP" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FileUploadField
            label="PDF da DUIMP"
            accept="application/pdf"
            file={duimpPdf}
            onChange={setDuimpPdf}
            required
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="chaveAcesso"
              className="text-sm font-medium text-zinc-700"
            >
              Chave de Acesso <span className="text-emerald-600">*</span>
            </label>
            <input
              id="chaveAcesso"
              required
              value={chaveAcesso}
              onChange={(event) => setChaveAcesso(event.target.value)}
              placeholder="Chave de acesso da DUIMP"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FileUploadField
              label="PDF da DI"
              accept="application/pdf"
              file={diPdf}
              onChange={setDiPdf}
              required
            />
            <FileUploadField
              label="XML da DI"
              accept=".xml,text/xml"
              file={diXml}
              onChange={setDiXml}
              required
            />
          </div>
          <div className="flex flex-col gap-2 sm:w-1/2 sm:pr-2">
            <label
              htmlFor="diNumero"
              className="text-sm font-medium text-zinc-700"
            >
              Número da DI <span className="text-emerald-600">*</span>
            </label>
            <input
              id="diNumero"
              required
              value={diNumero}
              onChange={(event) => setDiNumero(event.target.value)}
              placeholder="Ex: 24/0765400-1"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="comissaria"
            className="text-sm font-medium text-zinc-700"
          >
            Comissária <span className="text-emerald-600">*</span>
          </label>
          <select
            id="comissaria"
            required
            value={comissaria}
            onChange={(event) => setComissaria(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="" disabled>
              Selecione a comissária
            </option>
            {comissariaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="codigoReferencia"
            className="text-sm font-medium text-zinc-700"
          >
            Código de Referência{" "}
            <span className="text-zinc-400">(opcional)</span>
          </label>
          <input
            id="codigoReferencia"
            value={codigoReferencia}
            onChange={(event) => setCodigoReferencia(event.target.value)}
            placeholder="Ex: PO-2026-0456"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-zinc-700">
          Cobertura Cambial
        </span>
        <div className="mt-2 flex gap-2 sm:w-56">
          {coberturaCambialOptions.map((option) => (
            <label
              key={option.value}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                coberturaCambial === option.value
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <input
                type="radio"
                name="coberturaCambial"
                value={option.value}
                checked={coberturaCambial === option.value}
                onChange={() => setCoberturaCambial(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-100 pt-6">
        <button
          type="submit"
          className="flex h-11 cursor-pointer items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.98]"
        >
          Enviar para Averbação
        </button>
      </div>
    </form>
  );
}
