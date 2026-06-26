import { z } from "zod";
import emojiRegex from "emoji-regex";
import { tr } from "zod/locales";

const emojiR = emojiRegex();

const baseCardSchema = z.object({
  icon: z.string().refine((value: string) => {
    const matches = value.match(emojiR);
    return matches?.length === 1 && matches[0] === value;
  }, "O icone deve conter exatamente um emoji"),

  title: z
    .string()
    .min(1, "Titulo obrigatório")
    .max(50, "O titulo deve ter no máximo 50 caracteres"),

  type: z.enum(["r", "p"], {
    error: "Tipo inválido",
  }),

  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "A data tem que esta no formato YYYY-MM-DD"),

  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "A data tem que esta no formato YYYY-MM-DD")
    .nullable()
    .optional(),

  description: z
    .string()
    .max(1000, "A descrição tem que ter no máximo 1000 caracteres")
    .optional(),

  hue: z.number().int().min(0).max(360),

  notify_interval: z.enum(["d", "s", "m", "a", "n"], {
    error: "Intervalo de notificação inválido",
  }),
});

export const createCardSchema = baseCardSchema
  .refine(
    (data) => {
      if (!data.end_date) return true;
      return new Date(data.end_date) >= new Date(data.start_date);
    },
    {
      path: ["end_date"],
      error: "A data final não pode ser anterior a data inicial",
    }
  )
  .refine(
    (data) => {
      if (data.type === "r") {
        return data.end_date !== null && data.end_date !== undefined;
      }
      return true;
    },
    {
      path: ["end_date"],
      error: "Contadores Regressivos devem possuir data final",
    }
  );

export const updateCardSchema = baseCardSchema
  .partial({
    end_date: true,
    description: true,
  })
  .refine(
    (data) => {
      if (!data.end_date) return true;
      return new Date(data.end_date) >= new Date(data.start_date);
    },
    {
      path: ["end_date"],
      error: "A data final não pode ser anterior a data inicial",
    }
  )
  .refine(
    (data) => {
      if (data.type === "r") {
        return data.end_date !== null && data.end_date !== undefined;
      }
      return true;
    },
    {
      path: ["end_date"],
      error: "Contadores Regressivos devem possuir data final",
    }
  );
