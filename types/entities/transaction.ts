export interface Transaction {
  id: string;
  cardId: string;
  userId: string;
  dependentId?: string;
  purchaseName: string;
  purchaseCategory: string;
  description?: string;
  amount: string; // Decimal as string
  purchaseDate: string;
  installments: number;
  installmentsValue: string[]; // Decimal[] as string[]
  installmentDates: string[];
  createdAt: string;
  editedAt?: string;
}

export interface CreateTransactionDto {
  cardId: string;
  purchaseName: string;
  purchaseCategory: string;
  description?: string;
  amount: string; // Send as string for Decimal
  installments: number;
  installmentValues?: string[];
  purchaseDate?: string;
  dependentId?: string;
}

export interface UpdateTransactionDto {
  cardId?: string;
  purchaseName?: string;
  purchaseCategory?: string;
  description?: string;
  amount?: string; // Send as string for Decimal
  installments?: number;
  installmentValues?: string[];
  purchaseDate?: string;
  dependentId?: string;
}
