import { describe, expect, it } from "vitest";
import {
  averbacaoFormSchema,
  diNumberRegex,
  dtaNumberRegex,
  duimpNumberRegex,
} from "../averbacao";

const validComissaria = "Andrade & Filhos Comissária de Despachos";

function pdfFile(name: string) {
  return new File(["conteudo"], name, { type: "application/pdf" });
}

function xmlFile(name: string) {
  return new File(["conteudo"], name, { type: "text/xml" });
}

function findIssue(result: { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } }, field: string) {
  return result.error.issues.find((issue) => issue.path.join(".") === field);
}

describe("formatos de documento", () => {
  it("aceita o formato correto de DTA (25/0000000-1)", () => {
    expect(dtaNumberRegex.test("24/0456123-9")).toBe(true);
  });

  it("rejeita números de DTA fora do padrão", () => {
    expect(dtaNumberRegex.test("24-0456123-9")).toBe(false);
    expect(dtaNumberRegex.test("240456123-9")).toBe(false);
    expect(dtaNumberRegex.test("24/456123-9")).toBe(false);
    expect(dtaNumberRegex.test("")).toBe(false);
  });

  it("aceita o formato correto de DI (25/0000000-1)", () => {
    expect(diNumberRegex.test("25/0765400-1")).toBe(true);
  });

  it("rejeita números de DI fora do padrão", () => {
    expect(diNumberRegex.test("25/765400-1")).toBe(false); // sequência curta
    expect(diNumberRegex.test("25/0765400")).toBe(false); // sem dígito verificador
    expect(diNumberRegex.test("25 0765400-1")).toBe(false); // separador errado
  });

  it("aceita o formato correto de DUIMP (26BR0000123456-7)", () => {
    expect(duimpNumberRegex.test("26BR0000123456-7")).toBe(true);
  });

  it("rejeita números de DUIMP fora do padrão", () => {
    expect(duimpNumberRegex.test("26BR000012345-7")).toBe(false); // 1 dígito a menos
    expect(duimpNumberRegex.test("26br0000123456-7")).toBe(false); // minúsculo
    expect(duimpNumberRegex.test("2600001234567")).toBe(false); // sem "BR" e sem traço
  });
});

describe("averbacaoFormSchema - processo DUIMP", () => {
  const basePayload = {
    processType: "DUIMP" as const,
    duimpPdf: pdfFile("duimp.pdf"),
    duimpNumero: "26BR0000123456-7",
    diPdf: null,
    diXml: null,
    diNumero: "",
    comissaria: validComissaria,
    codigoReferencia: "",
    coberturaCambial: "nao" as const,
  };

  it("passa quando o PDF e o número da DUIMP estão corretos", () => {
    const result = averbacaoFormSchema.safeParse(basePayload);
    expect(result.success).toBe(true);
  });

  it("retorna mensagem de erro quando o número da DUIMP está fora do formato", () => {
    const result = averbacaoFormSchema.safeParse({
      ...basePayload,
      duimpNumero: "12345",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(findIssue(result, "duimpNumero")?.message).toMatch(
        /Formato inválido/,
      );
    }
  });

  it("retorna erro quando o PDF da DUIMP não é enviado", () => {
    const result = averbacaoFormSchema.safeParse({
      ...basePayload,
      duimpPdf: null,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(findIssue(result, "duimpPdf")).toBeDefined();
    }
  });

  it("não exige os campos de DI quando o processo é DUIMP", () => {
    const result = averbacaoFormSchema.safeParse(basePayload);
    expect(result.success).toBe(true);
  });
});

describe("averbacaoFormSchema - processo DI", () => {
  const basePayload = {
    processType: "DI" as const,
    duimpPdf: null,
    duimpNumero: "",
    diPdf: pdfFile("di.pdf"),
    diXml: xmlFile("di.xml"),
    diNumero: "25/0765400-1",
    comissaria: validComissaria,
    codigoReferencia: "",
    coberturaCambial: "nao" as const,
  };

  it("passa quando PDF, XML e número da DI estão corretos", () => {
    const result = averbacaoFormSchema.safeParse(basePayload);
    expect(result.success).toBe(true);
  });

  it("retorna mensagem de erro quando o número da DI está fora do formato", () => {
    const result = averbacaoFormSchema.safeParse({
      ...basePayload,
      diNumero: "25-0765400-1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(findIssue(result, "diNumero")?.message).toMatch(
        /Formato inválido/,
      );
    }
  });

  it("retorna erro quando o XML da DI não é enviado", () => {
    const result = averbacaoFormSchema.safeParse({
      ...basePayload,
      diXml: null,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(findIssue(result, "diXml")).toBeDefined();
    }
  });

  it("retorna erro quando a comissária não é selecionada", () => {
    const result = averbacaoFormSchema.safeParse({
      ...basePayload,
      comissaria: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(findIssue(result, "comissaria")?.message).toMatch(
        /Selecione a comissária/,
      );
    }
  });
});
