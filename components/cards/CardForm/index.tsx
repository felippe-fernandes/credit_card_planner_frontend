"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCardSchema } from "@/schemas/api/card.schema";
import { CreateCardDto, Card } from "@/types/entities/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxWithCustom } from "@/components/common/ComboboxWithCustom";

interface CardFormProps {
  onSubmit: (data: CreateCardDto) => void;
  defaultValues?: Partial<Card>;
  isLoading?: boolean;
  formId?: string;
}

const CARD_FLAGS = [
  "Visa",
  "Mastercard",
  "Elo",
  "American Express",
  "Hipercard",
  "Diners Club",
];

const COMMON_BANKS = [
  "Nubank",
  "Banco do Brasil",
  "Bradesco",
  "Itaú",
  "Caixa",
  "Santander",
  "Inter",
  "C6 Bank",
  "Neon",
  "Banco Original",
  "BTG Pactual",
  "PicPay",
];

export function CardForm({
  onSubmit,
  defaultValues,
  isLoading = false,
  formId,
}: CardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateCardDto>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      bank: defaultValues?.bank || "",
      flag: defaultValues?.flag || "",
      limit: defaultValues?.limit || "0",
      dueDay: defaultValues?.dueDay || 1,
      payDay: defaultValues?.payDay || 1,
    },
  });

  const selectedFlag = watch("flag");
  const selectedBank = watch("bank");

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Cartão *</Label>
        <Input
          id="name"
          placeholder="Ex: Cartão Principal"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Bank */}
      <ComboboxWithCustom
        label="Banco *"
        value={selectedBank}
        onValueChange={(value) => setValue("bank", value)}
        options={COMMON_BANKS}
        placeholder="Selecione o banco"
        emptyText="Nenhum banco encontrado."
        addCustomLabel="Adicionar banco personalizado"
        disabled={isLoading}
        error={errors.bank?.message}
      />

      {/* Flag */}
      <ComboboxWithCustom
        label="Bandeira *"
        value={selectedFlag}
        onValueChange={(value) => setValue("flag", value)}
        options={CARD_FLAGS}
        placeholder="Selecione a bandeira"
        emptyText="Nenhuma bandeira encontrada."
        addCustomLabel="Adicionar bandeira personalizada"
        disabled={isLoading}
        error={errors.flag?.message}
      />

      {/* Limit */}
      <div className="space-y-2">
        <Label htmlFor="limit">Limite (R$) *</Label>
        <Input
          id="limit"
          type="number"
          step="0.01"
          min="0"
          placeholder="5000.00"
          {...register("limit")}
          disabled={isLoading}
        />
        {errors.limit && (
          <p className="text-sm text-destructive">{errors.limit.message}</p>
        )}
      </div>

      {/* Due Day and Pay Day */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDay">Dia de Vencimento *</Label>
          <Input
            id="dueDay"
            type="number"
            min="1"
            max="31"
            placeholder="10"
            {...register("dueDay", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.dueDay && (
            <p className="text-sm text-destructive">{errors.dueDay.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="payDay">Dia de Fechamento *</Label>
          <Input
            id="payDay"
            type="number"
            min="1"
            max="31"
            placeholder="5"
            {...register("payDay", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.payDay && (
            <p className="text-sm text-destructive">{errors.payDay.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
