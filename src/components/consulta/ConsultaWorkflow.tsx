"use client";

import { useEffect, useMemo, useState } from "react";
import { DocumentSearch } from "./DocumentSearch";
import { DocumentTable } from "./DocumentTable";
import { FileViewerModal } from "./FileViewerModal";
import type { ConsultaDocument } from "@/mocks/data";
import { ApiError, fetchDocumentos } from "@/services/api";
import { useUploadStore } from "@/store/useUploadStore";

function formatSentAt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export function ConsultaWorkflow() {
  const [query, setQuery] = useState("");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [seedDocuments, setSeedDocuments] = useState<
    ConsultaDocument[] | null
  >(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const uploads = useUploadStore((state) => state.queue);

  useEffect(() => {
    let cancelled = false;

    fetchDocumentos()
      .then((docs) => {
        if (!cancelled) setSeedDocuments(docs);
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(
          error instanceof ApiError
            ? error.message
            : "Não foi possível carregar os documentos agora.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const documents = useMemo<ConsultaDocument[]>(() => {
    const fromStore: ConsultaDocument[] = uploads
      .filter((item) => item.status === "completed")
      .map((item) => ({
        id: item.id,
        dtaNumber: item.dtaNumber,
        processType: item.processType,
        processNumber: item.processNumber,
        importerName: item.importerName,
        sentAt: formatSentAt(item.createdAt),
        paisOrigem: item.paisOrigem,
        modal: item.modal,
        numeroConhecimento: item.numeroConhecimento,
        files: item.files,
      }));

    return [...fromStore, ...(seedDocuments ?? [])];
  }, [uploads, seedDocuments]);

  const filteredDocuments = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return documents;
    return documents.filter(
      (doc) =>
        doc.dtaNumber.toLowerCase().includes(term) ||
        doc.processNumber.toLowerCase().includes(term),
    );
  }, [documents, query]);

  return (
    <div className="flex flex-col gap-6">
      <DocumentSearch value={query} onChange={setQuery} />

      {loadError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {loadError}
        </p>
      )}

      <DocumentTable
        documents={filteredDocuments}
        onViewFile={setPreviewFile}
        loading={seedDocuments === null && !loadError}
      />

      <FileViewerModal
        fileName={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
