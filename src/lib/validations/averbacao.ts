import { z } from "zod";

export const DTA_MASK_PLACEHOLDER = "25/0000000-1";
export const DI_MASK_PLACEHOLDER = "25/0000000-1";
export const DUIMP_MASK_PLACEHOLDER = "26BR0000123456-7";

export const dtaNumberRegex = /^\d{2}\/\d{7}-\d$/;
export const diNumberRegex = /^\d{2}\/\d{7}-\d$/;
export const duimpNumberRegex = /^\d{2}BR\d{10}-\d$/;

const averbacaoBaseSchema = z.object({
  processType: z.enum(["DUIMP", "DI"]),
  duimpPdf: z.instanceof(File).nullable(),
  duimpNumero: z.string(),
  diPdf: z.instanceof(File).nullable(),
  diXml: z.instanceof(File).nullable(),
  diNumero: z.string(),
  comissaria: z.string().min(1, "Selecione a comissária."),
  codigoReferencia: z.string().optional(),
  coberturaCambial: z.enum(["sim", "nao"]),
});

export const averbacaoFormSchema = averbacaoBaseSchema.superRefine(
  (data, ctx) => {
    if (data.processType === "DUIMP") {
      if (!data.duimpPdf) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["duimpPdf"],
          message: "Envie o PDF da DUIMP.",
        });
      }

      if (!data.duimpNumero) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["duimpNumero"],
          message: "Informe o número da DUIMP.",
        });
      } else if (!duimpNumberRegex.test(data.duimpNumero)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["duimpNumero"],
          message: `Formato inválido. Use ${DUIMP_MASK_PLACEHOLDER}.`,
        });
      }
    }

    if (data.processType === "DI") {
      if (!data.diPdf) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["diPdf"],
          message: "Envie o PDF da DI.",
        });
      }

      if (!data.diXml) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["diXml"],
          message: "Envie o XML da DI.",
        });
      }

      if (!data.diNumero) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["diNumero"],
          message: "Informe o número da DI.",
        });
      } else if (!diNumberRegex.test(data.diNumero)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["diNumero"],
          message: `Formato inválido. Use ${DI_MASK_PLACEHOLDER}.`,
        });
      }
    }
  },
);

export type AverbacaoFormValues = z.infer<typeof averbacaoBaseSchema>;
