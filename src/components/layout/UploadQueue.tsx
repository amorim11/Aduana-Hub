"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  RotateCcw,
  UploadCloud,
  X,
} from "lucide-react";
import { simulateUpload } from "@/store/simulateUpload";
import { useUploadStore, type UploadStatus } from "@/store/useUploadStore";

const statusMeta: Record<
  UploadStatus,
  { label: string; icon: typeof Loader2; className: string }
> = {
  processing: {
    label: "Em processamento",
    icon: Loader2,
    className: "text-zinc-500",
  },
  completed: {
    label: "Concluído",
    icon: CheckCircle2,
    className: "text-emerald-600",
  },
  failed: {
    label: "Falha no envio",
    icon: AlertTriangle,
    className: "text-red-600",
  },
};

export function UploadQueue() {
  const queue = useUploadStore((state) => state.queue);
  const retryUpload = useUploadStore((state) => state.retryUpload);
  const removeUpload = useUploadStore((state) => state.removeUpload);
  const [collapsed, setCollapsed] = useState(true);

  if (queue.length === 0) return null;

  const processingCount = queue.filter(
    (item) => item.status === "processing",
  ).length;

  function handleRetry(id: string) {
    retryUpload(id);
    simulateUpload(id);
  }

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 ${
        collapsed ? "w-auto" : "w-[calc(100%-2rem)] max-w-sm"
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-expanded={!collapsed}
          className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3"
        >
          <span className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-zinc-900">
            <UploadCloud size={16} className="text-emerald-600" />
            Envios
            {processingCount > 0 && (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {processingCount} em andamento
              </span>
            )}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-zinc-400 transition-transform ${collapsed ? "" : "rotate-180"}`}
          />
        </button>

        {!collapsed && (
          <div className="max-h-80 divide-y divide-zinc-100 overflow-y-auto border-t border-zinc-100">
            {queue.map((item) => {
              const meta = statusMeta[item.status];
              const StatusIcon = meta.icon;
              return (
                <div key={item.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        DTA {item.dtaNumber}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {item.importerName} · {item.processType} ·{" "}
                        {item.files.length} arquivo(s)
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`flex items-center gap-1 text-xs font-medium whitespace-nowrap ${meta.className}`}
                      >
                        <StatusIcon
                          size={14}
                          className={
                            item.status === "processing" ? "animate-spin" : ""
                          }
                        />
                        {meta.label}
                      </span>
                      {item.status !== "processing" && (
                        <button
                          type="button"
                          onClick={() => removeUpload(item.id)}
                          aria-label="Remover da lista"
                          className="cursor-pointer text-zinc-300 transition-colors hover:text-zinc-600"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {(item.status === "processing" ||
                    item.status === "failed") && (
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className={`h-full rounded-full transition-all ${
                          item.status === "failed"
                            ? "bg-red-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}

                  {item.status === "failed" && (
                    <button
                      type="button"
                      onClick={() => handleRetry(item.id)}
                      className="mt-2 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                    >
                      <RotateCcw size={12} />
                      Tentar novamente
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
