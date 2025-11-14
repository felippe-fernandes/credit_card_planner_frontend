export interface Category {
  name: string;
  icon: string;
  color: string;
  userId: string;
  createdAt: string;
  editedAt?: string;
}

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  color?: string;
}

export interface UpdateCategoryDto {
  icon?: string;
  color?: string;
}
