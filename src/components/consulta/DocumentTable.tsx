import { Download, Eye } from "lucide-react";
import { downloadMockFile } from "./download-mock-file";
import { modalMeta } from "@/lib/modal-meta";
import type { ConsultaDocument } from "@/mocks/data";

const TABLE_COLUMNS = 8;

type DocumentTableProps = {
  documents: ConsultaDocument[];
  onViewFile: (fileName: string) => void;
  loading?: boolean;
};

export function DocumentTable({
  documents,
  onViewFile,
  loading,
}: DocumentTableProps) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="px-4 py-3 font-medium">Nº DTA</th>
                <th className="px-4 py-3 font-medium">Nº DUIMP/DI</th>
                <th className="px-4 py-3 font-medium">Razão Social</th>
                <th className="px-4 py-3 font-medium">Data do Envio</th>
                <th className="px-4 py-3 font-medium">País de Origem</th>
                <th className="px-4 py-3 font-medium">Modal</th>
                <th className="px-4 py-3 font-medium">Nº Conhecimento</th>
                <th className="px-4 py-3 font-medium">Arquivos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: TABLE_COLUMNS }).map(
                    (__, colIndex) => (
                      <td key={colIndex} className="px-4 py-3.5">
                        <div className="h-3 w-20 animate-pulse rounded bg-zinc-100" />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          Nenhum documento encontrado
        </p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Tente buscar por outro número de DTA, DUIMP ou DI.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-245 text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500">
              <th className="px-4 py-3 font-medium">Nº DTA</th>
              <th className="px-4 py-3 font-medium">Nº DUIMP/DI</th>
              <th className="px-4 py-3 font-medium">Razão Social</th>
              <th className="px-4 py-3 font-medium">Data do Envio</th>
              <th className="px-4 py-3 font-medium">País de Origem</th>
              <th className="px-4 py-3 font-medium">Modal</th>
              <th className="px-4 py-3 font-medium">Nº Conhecimento</th>
              <th className="px-4 py-3 font-medium">Arquivos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {documents.map((doc) => {
              const modal = modalMeta[doc.modal];
              const ModalIcon = modal.icon;
              return (
                <tr key={doc.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-zinc-900">
                    {doc.dtaNumber}
                  </td>
                  <td className="max-w-50 px-4 py-3 text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex shrink-0 items-center rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-700">
                        {doc.processType}
                      </span>
                      <span
                        className="truncate"
                        title={doc.processNumber}
                      >
                        {doc.processNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                    {doc.importerName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                    {doc.sentAt}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                    {doc.paisOrigem}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-zinc-600">
                      <ModalIcon size={14} />
                      {modal.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                    {doc.numeroConhecimento}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      {doc.files.map((file) => (
                        <div key={file} className="flex items-center gap-2">
                          <span
                            className="max-w-35 truncate text-xs text-zinc-600"
                            title={file}
                          >
                            {file}
                          </span>
                          <button
                            type="button"
                            onClick={() => onViewFile(file)}
                            aria-label={`Visualizar ${file}`}
                            title="Visualizar arquivo"
                            className="cursor-pointer text-zinc-400 transition-colors hover:text-emerald-600"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => downloadMockFile(file)}
                            aria-label={`Baixar ${file}`}
                            title="Baixar arquivo"
                            className="cursor-pointer text-zinc-400 transition-colors hover:text-emerald-600"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
