"use client";

import { useMemo, useState } from "react";
import { DocumentSearch } from "./DocumentSearch";
import { DocumentTable } from "./DocumentTable";
import { FileViewerModal } from "./FileViewerModal";
import { mockDocuments, type ConsultaDocument } from "./mock-data";
import { useUploadStore } from "@/store/useUploadStore";

function formatSentAt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export function ConsultaWorkflow() {
  const [query, setQuery] = useState("");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const uploads = useUploadStore((state) => state.queue);

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

    return [...fromStore, ...mockDocuments];
  }, [uploads]);

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
      <DocumentTable documents={filteredDocuments} onViewFile={setPreviewFile} />
      <FileViewerModal
        fileName={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
