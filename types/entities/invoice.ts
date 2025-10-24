export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE";

export interface Invoice {
  id: string;
  userId: string;
  cardId: string;
  month: number;
  year: number;
  totalAmount: string; // Decimal as string
  paidAmount: string; // Decimal as string
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
  editedAt?: string;
}

export interface UpdateInvoiceDto {
  totalAmount?: string;
  paidAmount?: string;
  dueDate?: string;
  status?: InvoiceStatus;
}

export interface MarkInvoiceAsPaidDto {
  paidAmount: string; // Send as string for Decimal
}
