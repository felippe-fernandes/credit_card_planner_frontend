import { InvoiceStatus, Role } from "@/types/entities";
import { z } from "zod";

export const CardSchema = z.object({
  name: z.string(),
  id: z.string(),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
  userId: z.string(),
  bank: z.string(),
  flag: z.string(),
  limit: z.number(),
  dueDay: z.number(),
  payDay: z.number(),
  availableLimit: z.number(),
  simulatedLimit: z.number(),
});

export const CategorySchema = z.object({
  name: z.string(),
  id: z.string(),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
  icon: z.string(),
  color: z.string(),
  userId: z.string(),
});

export const DependentSchema = z.object({
  name: z.string(),
  id: z.string(),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
  userId: z.string(),
});

export const InvoiceSchema = z.object({
  userId: z.string(),
  dueDate: z.date(),
  id: z.string(),
  cardId: z.string(),
  month: z.number(),
  year: z.number(),
  totalAmount: z.number(),
  paidAmount: z.number(),
  status: z.nativeEnum(InvoiceStatus),
  createdAt: z.date(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  cardId: z.string(),
  userId: z.string(),
  dependentId: z.string().nullable(),
  purchaseName: z.string(),
  purchaseCategory: z.string(),
  description: z.string().nullable(),
  amount: z.number(),
  date: z.date(),
  installments: z.number(),
  installmentsValue: z.array(z.number()),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
});

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
  id: z.string(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
});
