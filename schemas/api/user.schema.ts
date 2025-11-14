import { object, string } from "zod";

export const updateUserSchema = object({
  name: string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo").optional(),
  email: string().email("Email inválido").optional(),
  phone: string().optional(),
});
