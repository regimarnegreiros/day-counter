import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({
      message: "Nome é obrigatório",
    })
    .min(3, "O nome deve ter pelo menos 3 caracteres"),

  email: z
    .string({
      message: "E-mail é obrigatório",
    })
    .email("Formato de e-mail inválido"),

  password: z
    .string({
      message: "Senha é obrigatória",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),

  confirmPassword: z
    .string({
      message: "Confirmação de senha é obrigatória",
    })
    .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
});

export const updateUserSchema = createUserSchema.partial();
