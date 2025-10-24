export interface Dependent {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  editedAt?: string;
}

export interface CreateDependentDto {
  name: string;
}

export interface UpdateDependentDto {
  name?: string;
}
