import { object, string } from "zod";

export const createCategorySchema = object({
  name: string().min(1, "Category name is required").max(50, "Name too long"),
  icon: string().optional(),
  color: string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color").optional(),
});

export const updateCategorySchema = object({
  icon: string().optional(),
  color: string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color").optional(),
});
