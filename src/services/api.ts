import type { ConsultaDocument, DtaRecord, ProcessType } from "@/mocks/data";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseErrorMessage(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { message?: unknown };
    return typeof body?.message === "string" ? body.message : fallback;
  } catch {
    return fallback;
  }
}

export async function fetchDta(numero: string): Promise<DtaRecord> {
  const response = await fetch(
    `/api/dta?numero=${encodeURIComponent(numero)}`,
  );

  if (!response.ok) {
    const message = await parseErrorMessage(
      response,
      "Não foi possível buscar a DTA.",
    );
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<DtaRecord>;
}

export async function fetchDocumentos(): Promise<ConsultaDocument[]> {
  const response = await fetch("/api/documentos");

  if (!response.ok) {
    const message = await parseErrorMessage(
      response,
      "Não foi possível carregar os documentos.",
    );
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<ConsultaDocument[]>;
}

export type SubmitAverbacaoPayload = {
  dtaNumber: string;
  processType: ProcessType;
  processNumber: string;
  comissaria: string;
  codigoReferencia: string;
  coberturaCambial: "sim" | "nao";
  files: string[];
};

export type SubmitAverbacaoResult = {
  id: string;
  status: string;
};

export async function submitAverbacao(
  payload: SubmitAverbacaoPayload,
): Promise<SubmitAverbacaoResult> {
  const response = await fetch("/api/averbacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(
      response,
      "Não foi possível enviar a averbação.",
    );
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<SubmitAverbacaoResult>;
}
