"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploadField } from "./FileUploadField";
import { comissariaOptions } from "@/mocks/data";
import { maskDtaOrDi, maskDuimp } from "@/lib/masks";
import {
  averbacaoFormSchema,
  DI_MASK_PLACEHOLDER,
  DUIMP_MASK_PLACEHOLDER,
  type AverbacaoFormValues,
} from "@/lib/validations/averbacao";

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
  submitting?: boolean;
};

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500/20"
  }`;
}

export function AverbacaoForm({ onSubmit, submitting }: AverbacaoFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AverbacaoFormValues>({
    resolver: zodResolver(averbacaoFormSchema),
    mode: "onChange",
    defaultValues: {
      processType: "DUIMP",
      duimpPdf: null,
      duimpNumero: "",
      diPdf: null,
      diXml: null,
      diNumero: "",
      comissaria: "",
      codigoReferencia: "",
      coberturaCambial: "nao",
    },
  });

  const processType = watch("processType");
  const coberturaCambial = watch("coberturaCambial");

  function handleFormSubmit(values: AverbacaoFormValues) {
    const files =
      values.processType === "DUIMP"
        ? [values.duimpPdf?.name].filter((name): name is string =>
            Boolean(name),
          )
        : [values.diPdf?.name, values.diXml?.name].filter(
            (name): name is string => Boolean(name),
          );

    onSubmit({
      processType: values.processType,
      processNumber:
        values.processType === "DUIMP"
          ? values.duimpNumero
          : values.diNumero,
      files,
      comissaria: values.comissaria,
      codigoReferencia: values.codigoReferencia ?? "",
      coberturaCambial: values.coberturaCambial,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6"
    >
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
                value={type}
                className="sr-only"
                {...register("processType")}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {processType === "DUIMP" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="duimpPdf"
            render={({ field }) => (
              <FileUploadField
                label="PDF da DUIMP"
                accept="application/pdf"
                file={field.value}
                onChange={field.onChange}
                required
                error={errors.duimpPdf?.message}
              />
            )}
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="duimpNumero"
              className="text-sm font-medium text-zinc-700"
            >
              Número da DUIMP <span className="text-emerald-600">*</span>
            </label>
            <Controller
              control={control}
              name="duimpNumero"
              render={({ field }) => (
                <input
                  id="duimpNumero"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(maskDuimp(event.target.value))
                  }
                  onBlur={field.onBlur}
                  placeholder={DUIMP_MASK_PLACEHOLDER}
                  className={inputClass(!!errors.duimpNumero)}
                />
              )}
            />
            {errors.duimpNumero && (
              <p className="text-xs text-red-600">
                {errors.duimpNumero.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="diPdf"
              render={({ field }) => (
                <FileUploadField
                  label="PDF da DI"
                  accept="application/pdf"
                  file={field.value}
                  onChange={field.onChange}
                  required
                  error={errors.diPdf?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="diXml"
              render={({ field }) => (
                <FileUploadField
                  label="XML da DI"
                  accept=".xml,text/xml"
                  file={field.value}
                  onChange={field.onChange}
                  required
                  error={errors.diXml?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 sm:w-1/2 sm:pr-2">
            <label
              htmlFor="diNumero"
              className="text-sm font-medium text-zinc-700"
            >
              Número da DI <span className="text-emerald-600">*</span>
            </label>
            <Controller
              control={control}
              name="diNumero"
              render={({ field }) => (
                <input
                  id="diNumero"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(maskDtaOrDi(event.target.value))
                  }
                  onBlur={field.onBlur}
                  placeholder={DI_MASK_PLACEHOLDER}
                  className={inputClass(!!errors.diNumero)}
                />
              )}
            />
            {errors.diNumero && (
              <p className="text-xs text-red-600">
                {errors.diNumero.message}
              </p>
            )}
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
            className={inputClass(!!errors.comissaria) + " bg-white"}
            {...register("comissaria")}
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
          {errors.comissaria && (
            <p className="text-xs text-red-600">
              {errors.comissaria.message}
            </p>
          )}
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
            placeholder="Ex: PO-2026-0456"
            className={inputClass(false)}
            {...register("codigoReferencia")}
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
                value={option.value}
                className="sr-only"
                {...register("coberturaCambial")}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-100 pt-6">
        <button
          type="submit"
          disabled={submitting || !isValid}
          className="flex h-11 cursor-pointer items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar para Averbação"}
        </button>
      </div>
    </form>
  );
}
