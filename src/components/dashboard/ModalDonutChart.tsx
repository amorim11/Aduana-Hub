"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { modalCounts, modalMeta, type Modal } from "./data";

const MODAL_COLORS: Record<Modal, string> = {
  maritimo: "#059669",
  rodoviario: "#34d399",
  aereo: "#a7f3d0",
};

export function ModalDonutChart() {
  const modals = Object.keys(modalMeta) as Modal[];
  const total = modals.reduce((sum, modal) => sum + modalCounts[modal], 0);
  const data = modals.map((modal) => ({
    modal,
    label: modalMeta[modal].label,
    value: modalCounts[modal],
  }));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-sm font-medium text-zinc-500">
        Distribuição por Modal
      </p>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={3}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.modal} fill={MODAL_COLORS[entry.modal]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold tabular-nums text-zinc-900">
              {total.toLocaleString("pt-BR")}
            </span>
            <span className="text-[10px] text-zinc-400">total</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {data.map((entry) => {
            const percentage = Math.round((entry.value / total) * 1000) / 10;
            return (
              <div
                key={entry.modal}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="flex items-center gap-2 text-zinc-600">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: MODAL_COLORS[entry.modal] }}
                  />
                  {entry.label}
                </span>
                <span className="font-medium tabular-nums text-zinc-900">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
