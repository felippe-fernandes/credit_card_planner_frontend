"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/schemas/api/user.schema";
import { UpdateUserDto, User } from "@/services/user";
import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  user: User;
  onSubmit: (data: UpdateUserDto) => void;
  isLoading?: boolean;
}

export function ProfileForm({ user, onSubmit, isLoading = false }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Nome"
        id="name"
        placeholder="Seu nome completo"
        error={errors.name?.message}
        required
        disabled={isLoading}
        {...register("name")}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        required
        disabled={isLoading}
        {...register("email")}
      />

      <FormField
        label="Telefone"
        id="phone"
        type="tel"
        placeholder="+55 11 99999-9999"
        error={errors.phone?.message}
        disabled={isLoading}
        {...register("phone")}
      />

      <Button type="submit" disabled={isLoading || !isDirty} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}
