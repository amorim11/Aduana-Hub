import type { LucideIcon } from "lucide-react";
import { Plane, Ship, Truck } from "lucide-react";

export type Modal = "aereo" | "maritimo" | "rodoviario";

export const modalMeta: Record<Modal, { label: string; icon: LucideIcon }> = {
  maritimo: { label: "Marítimo", icon: Ship },
  rodoviario: { label: "Rodoviário", icon: Truck },
  aereo: { label: "Aéreo", icon: Plane },
};

export type DtaRecord = {
  numeroDta: string;
  razaoSocialImportador: string;
  dataCadastroImportador: string;
  paisOrigem: string;
  modal: Modal;
  numeroConhecimento: string;
};

export const mockDtaRecords: Record<string, DtaRecord> = {
  "24/0456123-9": {
    numeroDta: "24/0456123-9",
    razaoSocialImportador: "Trans-Fronteira Despachos Aduaneiros Ltda.",
    dataCadastroImportador: "14/03/2019",
    paisOrigem: "China",
    modal: "maritimo",
    numeroConhecimento: "MSCUAB123456",
  },
  "24/0512987-4": {
    numeroDta: "24/0512987-4",
    razaoSocialImportador: "Porto Norte Logística S.A.",
    dataCadastroImportador: "02/07/2016",
    paisOrigem: "Argentina",
    modal: "rodoviario",
    numeroConhecimento: "CRT-58213410",
  },
  "24/0098231-1": {
    numeroDta: "24/0098231-1",
    razaoSocialImportador: "Vantage Comércio Exterior Ltda.",
    dataCadastroImportador: "22/11/2020",
    paisOrigem: "Estados Unidos",
    modal: "aereo",
    numeroConhecimento: "AWB-172-48839201",
  },
};

export const comissariaOptions = [
  "Andrade & Filhos Comissária de Despachos",
  "Global Cargo Despachos Aduaneiros",
  "Rota Sul Despachos e Logística",
  "Trans-Fronteira Despachos Aduaneiros",
];
