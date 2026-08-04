"use client";

import { useEffect } from "react";
import { Download, FileCode2, FileText, X } from "lucide-react";
import { downloadMockFile } from "./download-mock-file";

type FileViewerModalProps = {
  fileName: string | null;
  onClose: () => void;
};

export function FileViewerModal({ fileName, onClose }: FileViewerModalProps) {
  useEffect(() => {
    if (!fileName) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fileName, onClose]);

  if (!fileName) return null;

  const isXml = fileName.toLowerCase().endsWith(".xml");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pré-visualização de ${fileName}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div className="flex min-w-0 items-center gap-2">
            {isXml ? (
              <FileCode2 size={18} className="shrink-0 text-emerald-600" />
            ) : (
              <FileText size={18} className="shrink-0 text-emerald-600" />
            )}
            <p className="truncate text-sm font-semibold text-zinc-900">
              {fileName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-zinc-50 p-5">
          {isXml ? (
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-100">
              {`<?xml version="1.0" encoding="UTF-8"?>\n<documento>\n  <arquivo>${fileName}</arquivo>\n  <status>averbado</status>\n</documento>`}
            </pre>
          ) : (
            <div className="mx-auto flex aspect-3/4 w-full max-w-xs flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="h-3 w-2/3 rounded bg-zinc-200" />
              <div className="mt-2 h-2 w-full rounded bg-zinc-100" />
              <div className="h-2 w-full rounded bg-zinc-100" />
              <div className="h-2 w-5/6 rounded bg-zinc-100" />
              <div className="mt-4 h-2 w-full rounded bg-zinc-100" />
              <div className="h-2 w-full rounded bg-zinc-100" />
              <div className="h-2 w-4/6 rounded bg-zinc-100" />
              <div className="mt-4 h-2 w-full rounded bg-zinc-100" />
              <div className="h-2 w-3/6 rounded bg-zinc-100" />
            </div>
          )}
          <p className="mt-4 text-center text-xs text-zinc-400">
            Pré-visualização simulada — este ambiente ainda não está
            conectado ao armazenamento real de arquivos.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={() => downloadMockFile(fileName)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            <Download size={16} />
            Baixar
          </button>
        </div>
      </div>
    </div>
  );
}
