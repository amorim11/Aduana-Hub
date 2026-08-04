import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ModalDonutChart } from "@/components/dashboard/ModalDonutChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatusBreakdown } from "@/components/dashboard/StatusBreakdown";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { modalCounts, statusCounts } from "@/components/dashboard/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const totalCount = Object.values(modalCounts).reduce(
    (sum, count) => sum + count,
    0,
  );
  const taxaAverbacao = statusCounts.averbado / totalCount;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Visão geral das operações do seu Porto Seco.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <FileText size={15} strokeWidth={2} />
            <p className="text-sm font-medium">Visão Geral</p>
          </div>
          <p className="mt-4 text-5xl font-semibold tracking-tight tabular-nums text-zinc-900">
            {totalCount.toLocaleString("pt-BR")}
          </p>
          <p className="mt-1.5 text-xs text-zinc-400">
            Documentos averbados no total
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-5">
            <div>
              <p className="text-xl font-semibold tabular-nums text-zinc-900">
                {statusCounts.pendente}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Pendentes de análise
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold tabular-nums text-emerald-600">
                {taxaAverbacao.toLocaleString("pt-BR", {
                  style: "percent",
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Taxa de averbação
              </p>
            </div>
          </div>
        </div>

        <ModalDonutChart />
        <StatusBreakdown />
      </div>

      <div className="mt-6">
        <TrendChart />
      </div>

      <div className="mt-6">
        <RecentActivity />
      </div>
    </div>
  );
}
