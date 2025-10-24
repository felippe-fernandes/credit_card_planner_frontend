import { object, string, number, array } from "zod";

export const createTransactionSchema = object({
  cardId: string().uuid("Invalid card ID"),
  purchaseName: string().min(1, "Purchase name is required").max(100, "Name too long"),
  purchaseCategory: string().min(1, "Category is required"),
  description: string().max(500, "Description too long").optional(),
  amount: number().min(0.01, "Amount must be greater than 0"),
  installments: number().min(1, "At least 1 installment required").max(60, "Max 60 installments"),
  installmentValues: array(number()).optional(),
  purchaseDate: string().optional(),
  dependentId: string().uuid().optional(),
});

export const updateTransactionSchema = object({
  cardId: string().uuid().optional(),
  purchaseName: string().min(1).max(100).optional(),
  purchaseCategory: string().min(1).optional(),
  description: string().max(500).optional(),
  amount: number().min(0.01).optional(),
  installments: number().min(1).max(60).optional(),
  installmentValues: array(number()).optional(),
  purchaseDate: string().optional(),
  dependentId: string().uuid().optional(),
});
