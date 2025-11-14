export interface Card {
  id: string;
  userId: string;
  name: string;
  bank: string;
  flag: string;
  limit: string; // Decimal as string
  dueDay: number;
  payDay: number;
  availableLimit: string; // Decimal as string
  simulatedLimit: string; // Decimal as string
  createdAt: string;
  editedAt?: string;
}

export interface CreateCardDto {
  name: string;
  bank: string;
  flag: string;
  limit: string; // Send as string for Decimal
  dueDay: number;
  payDay: number;
}

export interface UpdateCardDto {
  name?: string;
  bank?: string;
  flag?: string;
  limit?: string; // Send as string for Decimal
  dueDay?: number;
  payDay?: number;
}
