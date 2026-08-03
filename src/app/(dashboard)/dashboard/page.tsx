import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { modalCounts, modalMeta, type Modal } from "@/components/dashboard/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const totalCount = Object.values(modalCounts).reduce(
    (sum, count) => sum + count,
    0,
  );
  const modals = Object.keys(modalMeta) as Modal[];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Visão geral das operações do seu Porto Seco.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Geral"
          value={totalCount}
          icon={FileText}
          helpText="Documentos averbados no recinto"
          emphasis
        />
        {modals.map((modal) => (
          <MetricCard
            key={modal}
            label={modalMeta[modal].label}
            value={modalCounts[modal]}
            icon={modalMeta[modal].icon}
            helpText="Documentos averbados"
          />
        ))}
      </div>

      <div className="mt-6">
        <RecentActivity />
      </div>
    </div>
  );
}
