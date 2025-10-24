import { object, string, number } from "zod";

export const createCardSchema = object({
  name: string().min(1, "Card name is required").max(50, "Name too long"),
  bank: string().min(1, "Bank name is required").max(50, "Bank name too long"),
  flag: string().min(1, "Card flag is required"),
  limit: number().min(0, "Limit must be positive"),
  dueDay: number().min(1, "Due day must be between 1-31").max(31, "Due day must be between 1-31"),
  payDay: number().min(1, "Pay day must be between 1-31").max(31, "Pay day must be between 1-31"),
});

export const updateCardSchema = object({
  name: string().min(1).max(50).optional(),
  bank: string().min(1).max(50).optional(),
  flag: string().min(1).optional(),
  limit: number().min(0).optional(),
  dueDay: number().min(1).max(31).optional(),
  payDay: number().min(1).max(31).optional(),
});
