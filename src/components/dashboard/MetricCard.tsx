import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  helpText?: string;
  emphasis?: boolean;
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  helpText,
  emphasis = false,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        emphasis ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-sm font-medium ${
            emphasis ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          {label}
        </p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            emphasis
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-emerald-500/10 text-emerald-600"
          }`}
        >
          <Icon size={18} strokeWidth={2} />
        </span>
      </div>
      <p
        className={`mt-3 text-3xl font-semibold tracking-tight ${
          emphasis ? "text-white" : "text-zinc-900"
        }`}
      >
        {value.toLocaleString("pt-BR")}
      </p>
      {helpText && (
        <p
          className={`mt-1 text-xs ${
            emphasis ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}
