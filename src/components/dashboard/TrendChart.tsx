"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyTrend } from "./data";

export function TrendChart() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-sm font-medium text-zinc-500">Averbações por Mês</p>
      <p className="mt-0.5 text-xs text-zinc-400">
        Documentos concluídos em 2026
      </p>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyTrend}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f4f4f5" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e4e4e7",
                fontSize: 13,
              }}
              labelStyle={{ color: "#18181b", fontWeight: 600 }}
              formatter={(value) => [`${value}`, "Averbações"]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#059669"
              strokeWidth={2.5}
              fill="url(#trendFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
