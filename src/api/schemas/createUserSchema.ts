import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      error: "Nome é obrigatório",
    })
    .min(3, "O nome deve ter pelo menos 3 caracteres"),

  email: z
    .string({
      error: "E-mail é obrigatório",
    })
    .email("Formato de e-mail inválido"),

  password: z
    .string({
      error: "Senha é obrigatória",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),

  confirmPassword: z
    .string({
      error: "Confirmação de senha é obrigatória",
    })
    .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
});

export const updateUserSchema = createUserSchema.refine(
  (data) => data.password === data.confirmPassword,
  { error: "Senha e confirmação de senha devem ser iguais." },
);
