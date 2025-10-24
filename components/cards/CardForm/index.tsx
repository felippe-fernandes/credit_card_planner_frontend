"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCardSchema } from "@/schemas/api/card.schema";
import { CreateCardDto, Card } from "@/types/entities/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardFormProps {
  onSubmit: (data: CreateCardDto) => void;
  defaultValues?: Partial<Card>;
  isLoading?: boolean;
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
      limit: defaultValues?.limit || 0,
      dueDay: defaultValues?.dueDay || 1,
      payDay: defaultValues?.payDay || 1,
    },
  });

  const selectedFlag = watch("flag");
  const selectedBank = watch("bank");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="space-y-2">
        <Label htmlFor="bank">Banco *</Label>
        <Select
          value={selectedBank}
          onValueChange={(value) => setValue("bank", value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            {COMMON_BANKS.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.bank && (
          <p className="text-sm text-destructive">{errors.bank.message}</p>
        )}
      </div>

      {/* Flag */}
      <div className="space-y-2">
        <Label htmlFor="flag">Bandeira *</Label>
        <Select
          value={selectedFlag}
          onValueChange={(value) => setValue("flag", value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a bandeira" />
          </SelectTrigger>
          <SelectContent>
            {CARD_FLAGS.map((flag) => (
              <SelectItem key={flag} value={flag}>
                {flag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.flag && (
          <p className="text-sm text-destructive">{errors.flag.message}</p>
        )}
      </div>

      {/* Limit */}
      <div className="space-y-2">
        <Label htmlFor="limit">Limite (R$) *</Label>
        <Input
          id="limit"
          type="number"
          step="0.01"
          min="0"
          placeholder="5000.00"
          {...register("limit", { valueAsNumber: true })}
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
