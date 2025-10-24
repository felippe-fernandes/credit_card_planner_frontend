export interface Transaction {
  id: string;
  cardId: string;
  userId: string;
  dependentId?: string;
  purchaseName: string;
  purchaseCategory: string;
  description?: string;
  amount: number;
  purchaseDate: string;
  installments: number;
  installmentsValue: number[];
  installmentDates: string[];
  createdAt: string;
  editedAt?: string;
}

export interface CreateTransactionDto {
  cardId: string;
  purchaseName: string;
  purchaseCategory: string;
  description?: string;
  amount: number;
  installments: number;
  installmentValues?: number[];
  purchaseDate?: string;
  dependentId?: string;
}

export interface UpdateTransactionDto {
  cardId?: string;
  purchaseName?: string;
  purchaseCategory?: string;
  description?: string;
  amount?: number;
  installments?: number;
  installmentValues?: number[];
  purchaseDate?: string;
  dependentId?: string;
}
