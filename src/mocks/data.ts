export type Modal = "aereo" | "maritimo" | "rodoviario";
export type ProcessType = "DUIMP" | "DI";

export type DtaRecord = {
  numeroDta: string;
  razaoSocialImportador: string;
  dataCadastroImportador: string;
  paisOrigem: string;
  modal: Modal;
  numeroConhecimento: string;
};

export const dtaRecords: Record<string, DtaRecord> = {
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

export type ConsultaDocument = {
  id: string;
  dtaNumber: string;
  processType: ProcessType;
  processNumber: string;
  importerName: string;
  sentAt: string;
  paisOrigem: string;
  modal: Modal;
  numeroConhecimento: string;
  files: string[];
};

export const seedDocuments: ConsultaDocument[] = [
  {
    id: "seed-1",
    dtaNumber: "24/0765412-0",
    processType: "DI",
    processNumber: "24/0765400-1",
    importerName: "Global Cargo Despachos Aduaneiros",
    sentAt: "01/08/2026",
    paisOrigem: "China",
    modal: "maritimo",
    numeroConhecimento: "MSCUAB998877",
    files: ["di-global-cargo.pdf", "di-global-cargo.xml"],
  },
  {
    id: "seed-2",
    dtaNumber: "24/0512987-4",
    processType: "DUIMP",
    processNumber: "24BR00087123000198760001000000045612378",
    importerName: "Porto Norte Logística S.A.",
    sentAt: "30/07/2026",
    paisOrigem: "Argentina",
    modal: "rodoviario",
    numeroConhecimento: "CRT-58213410",
    files: ["duimp-porto-norte.pdf"],
  },
  {
    id: "seed-3",
    dtaNumber: "24/0098231-1",
    processType: "DUIMP",
    processNumber: "24BR00012390000167850001000000078451236",
    importerName: "Vantage Comércio Exterior Ltda.",
    sentAt: "29/07/2026",
    paisOrigem: "Estados Unidos",
    modal: "aereo",
    numeroConhecimento: "AWB-172-48839201",
    files: ["duimp-vantage.pdf"],
  },
  {
    id: "seed-4",
    dtaNumber: "24/0456123-9",
    processType: "DI",
    processNumber: "24/0456100-5",
    importerName: "Trans-Fronteira Despachos Aduaneiros Ltda.",
    sentAt: "28/07/2026",
    paisOrigem: "China",
    modal: "maritimo",
    numeroConhecimento: "MSCUAB123456",
    files: ["di-trans-fronteira.pdf", "di-trans-fronteira.xml"],
  },
  {
    id: "seed-5",
    dtaNumber: "24/0321654-7",
    processType: "DI",
    processNumber: "24/0321600-2",
    importerName: "Andrade & Filhos Comissária de Despachos",
    sentAt: "27/07/2026",
    paisOrigem: "Alemanha",
    modal: "aereo",
    numeroConhecimento: "AWB-035-77213645",
    files: ["di-andrade.pdf", "di-andrade.xml"],
  },
];

export const comissariaOptions = [
  "Andrade & Filhos Comissária de Despachos",
  "Global Cargo Despachos Aduaneiros",
  "Rota Sul Despachos e Logística",
  "Trans-Fronteira Despachos Aduaneiros",
];
