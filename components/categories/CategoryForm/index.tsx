"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schemas/api/category.schema";
import { CreateCategoryDto, Category } from "@/types/entities/category";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmojiPicker } from "../EmojiPicker";
import { ColorPicker } from "../ColorPicker";

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryDto) => void;
  defaultValues?: Partial<Category>;
  isLoading?: boolean;
}

export function CategoryForm({
  onSubmit,
  defaultValues,
  isLoading = false,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCategoryDto>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      icon: defaultValues?.icon || "",
      color: defaultValues?.color || "#000000",
    },
  });

  const selectedIcon = watch("icon");
  const selectedColor = watch("color");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Categoria *</Label>
        <Input
          id="name"
          placeholder="Ex: Alimentação"
          {...register("name")}
          disabled={isLoading || !!defaultValues?.name} // Disable if editing (name is PK)
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Icon */}
      <div className="space-y-2">
        <Label>Ícone</Label>
        <EmojiPicker
          value={selectedIcon || ""}
          onChange={(emoji) => setValue("icon", emoji)}
          disabled={isLoading}
        />
        {errors.icon && (
          <p className="text-sm text-destructive">{errors.icon.message}</p>
        )}
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label>Cor</Label>
        <ColorPicker
          value={selectedColor || "#000000"}
          onChange={(color) => setValue("color", color)}
          disabled={isLoading}
        />
        {errors.color && (
          <p className="text-sm text-destructive">{errors.color.message}</p>
        )}
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Visualização</Label>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm"
            style={{ backgroundColor: selectedColor || "#000000" }}
          >
            {selectedIcon || "➕"}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">
              {watch("name") || "Nome da categoria"}
            </span>
            <span className="text-xs text-muted-foreground">
              Assim sua categoria aparecerá
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
