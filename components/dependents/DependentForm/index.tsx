"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDependentSchema } from "@/schemas/api/dependent.schema";
import { CreateDependentDto, Dependent } from "@/types/entities/dependent";
import { FormField } from "@/components/common/FormField";

interface DependentFormProps {
  onSubmit: (data: CreateDependentDto) => void;
  defaultValues?: Partial<Dependent>;
  isLoading?: boolean;
  formId?: string;
}

export function DependentForm({
  onSubmit,
  defaultValues,
  isLoading = false,
  formId,
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
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Nome do Dependente"
        id="name"
        placeholder="Ex: João Silva"
        error={errors.name?.message}
        required
        disabled={isLoading}
        autoFocus
        {...register("name")}
      />
    </form>
  );
}
