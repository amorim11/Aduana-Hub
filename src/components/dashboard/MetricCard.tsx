import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  helpText?: string;
  emphasis?: boolean;
  percentage?: number;
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  helpText,
  emphasis = false,
  percentage,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon size={15} strokeWidth={2} />
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p
        className={`mt-4 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl ${
          emphasis ? "text-emerald-600" : "text-zinc-900"
        }`}
      >
        {value.toLocaleString("pt-BR")}
      </p>
      {helpText && <p className="mt-1.5 text-xs text-zinc-400">{helpText}</p>}
      {percentage != null && (
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
