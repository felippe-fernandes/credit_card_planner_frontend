export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE";

export interface Invoice {
  id: string;
  userId: string;
  cardId: string;
  month: number;
  year: number;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
  editedAt?: string;
}

export interface UpdateInvoiceDto {
  totalAmount?: number;
  paidAmount?: number;
  dueDate?: string;
  status?: InvoiceStatus;
}

export interface MarkInvoiceAsPaidDto {
  paidAmount: number;
}
