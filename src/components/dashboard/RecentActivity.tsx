import { modalMeta, recentDocuments, type DocumentStatus } from "./data";

const statusStyles: Record<DocumentStatus, string> = {
  Averbado: "bg-emerald-50 text-emerald-700",
  Pendente: "bg-amber-50 text-amber-700",
  Rejeitado: "bg-red-50 text-red-700",
};

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-zinc-900">
          Últimos Documentos Averbados
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500">
          Registros mais recentes vinculados no recinto
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500">
              <th className="px-6 py-3 font-medium">Documento</th>
              <th className="px-6 py-3 font-medium">Modal</th>
              <th className="px-6 py-3 font-medium">Comissária</th>
              <th className="px-6 py-3 font-medium">Data</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {recentDocuments.map((doc) => {
              const modal = modalMeta[doc.modal];
              const ModalIcon = modal.icon;
              return (
                <tr
                  key={doc.id}
                  className="transition-colors hover:bg-zinc-50"
                >
                  <td className="px-6 py-3 font-medium whitespace-nowrap text-zinc-900">
                    {doc.documentType} {doc.documentNumber}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-zinc-600">
                    <span className="inline-flex items-center gap-1.5">
                      <ModalIcon size={14} strokeWidth={2} />
                      {modal.label}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-zinc-600">
                    {doc.company}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-zinc-600">
                    {doc.averbadoAt}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[doc.status]}`}
                    >
                      {doc.status}
                    </span>
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
