import { object, string, number, enum as zodEnum } from "zod";

export const invoiceStatusEnum = zodEnum(["PENDING", "PAID", "OVERDUE"]);

export const updateInvoiceSchema = object({
  totalAmount: number().min(0).optional(),
  paidAmount: number().min(0).optional(),
  dueDate: string().optional(),
  status: invoiceStatusEnum.optional(),
});

export const markInvoiceAsPaidSchema = object({
  paidAmount: number().min(0, "Paid amount must be positive"),
});
