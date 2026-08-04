import type { LucideIcon } from "lucide-react";
import { Plane, Ship, Truck } from "lucide-react";

export type Modal = "aereo" | "maritimo" | "rodoviario";

export const modalMeta: Record<Modal, { label: string; icon: LucideIcon }> = {
  maritimo: { label: "Marítimo", icon: Ship },
  rodoviario: { label: "Rodoviário", icon: Truck },
  aereo: { label: "Aéreo", icon: Plane },
};

export const modalCounts: Record<Modal, number> = {
  maritimo: 342,
  rodoviario: 517,
  aereo: 128,
};

export const statusCounts = {
  averbado: 891,
  pendente: 68,
  rejeitado: 28,
};

export const monthlyTrend = [
  { month: "Jan", count: 94 },
  { month: "Fev", count: 108 },
  { month: "Mar", count: 121 },
  { month: "Abr", count: 115 },
  { month: "Mai", count: 132 },
  { month: "Jun", count: 127 },
  { month: "Jul", count: 149 },
  { month: "Ago", count: 141 },
];

export type DocumentType = "DTA" | "DI" | "DUIMP";
export type DocumentStatus = "Averbado" | "Pendente" | "Rejeitado";

export type AverbacaoRecord = {
  id: string;
  documentType: DocumentType;
  documentNumber: string;
  modal: Modal;
  company: string;
  averbadoAt: string;
  status: DocumentStatus;
};

export const recentDocuments: AverbacaoRecord[] = [
  {
    id: "1",
    documentType: "DUIMP",
    documentNumber: "24BR00012345-6",
    modal: "maritimo",
    company: "Rota Sul Importações",
    averbadoAt: "03/08/2026",
    status: "Averbado",
  },
  {
    id: "2",
    documentType: "DTA",
    documentNumber: "24/0456123-9",
    modal: "rodoviario",
    company: "Trans-Fronteira Despachos Aduaneiros",
    averbadoAt: "03/08/2026",
    status: "Averbado",
  },
  {
    id: "3",
    documentType: "DI",
    documentNumber: "24/0987654-3",
    modal: "maritimo",
    company: "Andrade & Filhos Comissária",
    averbadoAt: "02/08/2026",
    status: "Pendente",
  },
  {
    id: "4",
    documentType: "DUIMP",
    documentNumber: "24BR00098231-1",
    modal: "aereo",
    company: "Vantage Comércio Exterior",
    averbadoAt: "02/08/2026",
    status: "Averbado",
  },
  {
    id: "5",
    documentType: "DTA",
    documentNumber: "24/0512987-4",
    modal: "rodoviario",
    company: "Porto Norte Logística",
    averbadoAt: "01/08/2026",
    status: "Rejeitado",
  },
  {
    id: "6",
    documentType: "DI",
    documentNumber: "24/0765412-0",
    modal: "maritimo",
    company: "Global Cargo Despachos",
    averbadoAt: "01/08/2026",
    status: "Averbado",
  },
  {
    id: "7",
    documentType: "DUIMP",
    documentNumber: "24BR00074119-8",
    modal: "aereo",
    company: "Vantage Comércio Exterior",
    averbadoAt: "31/07/2026",
    status: "Averbado",
  },
];
