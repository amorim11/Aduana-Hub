import { modalMeta } from "@/lib/modal-meta";
import type { DtaRecord } from "@/mocks/data";

type ImportadorCardProps = {
  record: DtaRecord;
};

export function ImportadorCard({ record }: ImportadorCardProps) {
  const modal = modalMeta[record.modal];
  const ModalIcon = modal.icon;

  const fields = [
    { label: "Número da DTA", value: record.numeroDta },
    {
      label: "Razão Social do Importador",
      value: record.razaoSocialImportador,
    },
    { label: "Data de Cadastro", value: record.dataCadastroImportador },
    { label: "País de Origem", value: record.paisOrigem },
    { label: "Número do Conhecimento", value: record.numeroConhecimento },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900">
          Importador Localizado
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <ModalIcon size={14} />
          {modal.label}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-xs font-medium text-zinc-500">
              {field.label}
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-zinc-900">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
