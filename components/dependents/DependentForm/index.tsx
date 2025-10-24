"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDependentSchema } from "@/schemas/api/dependent.schema";
import { CreateDependentDto, Dependent } from "@/types/entities/dependent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DependentFormProps {
  onSubmit: (data: CreateDependentDto) => void;
  defaultValues?: Partial<Dependent>;
  isLoading?: boolean;
}

export function DependentForm({
  onSubmit,
  defaultValues,
  isLoading = false,
}: DependentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDependentDto>({
    resolver: zodResolver(createDependentSchema),
    defaultValues: {
      name: defaultValues?.name || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Dependente *</Label>
        <Input
          id="name"
          placeholder="Ex: João Silva"
          {...register("name")}
          disabled={isLoading}
          autoFocus
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
    </form>
  );
}
