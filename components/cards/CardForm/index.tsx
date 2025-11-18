"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCardSchema } from "@/schemas/api/card.schema";
import { CreateCardDto, Card } from "@/types/entities/card";
import { ComboboxWithCustom } from "@/components/common/ComboboxWithCustom";
import { FormField } from "@/components/common/FormField";
import { CARD_FLAGS, COMMON_BANKS } from "@/constants/cards";

interface CardFormProps {
  onSubmit: (data: CreateCardDto) => void;
  defaultValues?: Partial<Card>;
  isLoading?: boolean;
  formId?: string;
}

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
      <FormField
        label="Nome do Cartão"
        id="name"
        placeholder="Ex: Cartão Principal"
        error={errors.name?.message}
        required
        disabled={isLoading}
        {...register("name")}
      />

      <ComboboxWithCustom
        label="Banco *"
        value={selectedBank}
        onValueChange={(value) => setValue("bank", value)}
        options={[...COMMON_BANKS]}
        placeholder="Selecione o banco"
        emptyText="Nenhum banco encontrado."
        addCustomLabel="Adicionar banco personalizado"
        disabled={isLoading}
        error={errors.bank?.message}
      />

      <ComboboxWithCustom
        label="Bandeira *"
        value={selectedFlag}
        onValueChange={(value) => setValue("flag", value)}
        options={[...CARD_FLAGS]}
        placeholder="Selecione a bandeira"
        emptyText="Nenhuma bandeira encontrada."
        addCustomLabel="Adicionar bandeira personalizada"
        disabled={isLoading}
        error={errors.flag?.message}
      />

      <FormField
        label="Limite (R$)"
        id="limit"
        type="number"
        step="0.01"
        min="0"
        placeholder="5000.00"
        error={errors.limit?.message}
        required
        disabled={isLoading}
        {...register("limit")}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Dia de Vencimento"
          id="dueDay"
          type="number"
          min="1"
          max="31"
          placeholder="10"
          error={errors.dueDay?.message}
          required
          disabled={isLoading}
          {...register("dueDay", { valueAsNumber: true })}
        />

        <FormField
          label="Dia de Fechamento"
          id="payDay"
          type="number"
          min="1"
          max="31"
          placeholder="5"
          error={errors.payDay?.message}
          required
          disabled={isLoading}
          {...register("payDay", { valueAsNumber: true })}
        />
      </div>
    </form>
  );
}
