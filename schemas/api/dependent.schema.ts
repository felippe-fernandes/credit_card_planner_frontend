import { object, string } from "zod";

export const createDependentSchema = object({
  name: string().min(1, "Dependent name is required").max(100, "Name too long"),
});

export const updateDependentSchema = object({
  name: string().min(1).max(100).optional(),
});
