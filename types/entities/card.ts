export interface Card {
  id: string;
  userId: string;
  name: string;
  bank: string;
  flag: string;
  limit: number;
  dueDay: number;
  payDay: number;
  availableLimit: number;
  simulatedLimit: number;
  createdAt: string;
  editedAt?: string;
}

export interface CreateCardDto {
  name: string;
  bank: string;
  flag: string;
  limit: number;
  dueDay: number;
  payDay: number;
}

export interface UpdateCardDto {
  name?: string;
  bank?: string;
  flag?: string;
  limit?: number;
  dueDay?: number;
  payDay?: number;
}
