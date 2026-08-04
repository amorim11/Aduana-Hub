import { statusCounts } from "./data";

const STATUS_META = [
  { key: "averbado", label: "Averbado", dot: "bg-emerald-500" },
  { key: "pendente", label: "Pendente", dot: "bg-amber-500" },
  { key: "rejeitado", label: "Rejeitado", dot: "bg-red-500" },
] as const;

export function StatusBreakdown() {
  const total =
    statusCounts.averbado + statusCounts.pendente + statusCounts.rejeitado;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-sm font-medium text-zinc-500">
        Status das Averbações
      </p>

      <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
        {STATUS_META.map((status) => {
          const value = statusCounts[status.key];
          const width = (value / total) * 100;
          return (
            <div
              key={status.key}
              className={status.dot}
              style={{ width: `${width}%` }}
            />
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {STATUS_META.map((status) => {
          const value = statusCounts[status.key];
          const percentage = Math.round((value / total) * 1000) / 10;
          return (
            <div
              key={status.key}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-zinc-600">
                <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="font-medium tabular-nums text-zinc-900">
                  {value}
                </span>
                <span className="text-xs text-zinc-400">({percentage}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
