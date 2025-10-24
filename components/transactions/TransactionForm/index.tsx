"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "@/schemas/api/transaction.schema";
import { CreateTransactionDto, Transaction } from "@/types/entities/transaction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCards } from "@/hooks/useCards";
import { useCategories } from "@/hooks/useCategories";
import { useDependents } from "@/hooks/useDependents";

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionDto) => void;
  defaultValues?: Partial<Transaction>;
  isLoading?: boolean;
}

export function TransactionForm({
  onSubmit,
  defaultValues,
  isLoading = false,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateTransactionDto>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      cardId: defaultValues?.cardId || "",
      purchaseName: defaultValues?.purchaseName || "",
      purchaseCategory: defaultValues?.purchaseCategory || "",
      description: defaultValues?.description || "",
      amount: defaultValues?.amount || 0,
      installments: defaultValues?.installments || 1,
      purchaseDate: defaultValues?.purchaseDate
        ? new Date(defaultValues.purchaseDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dependentId: defaultValues?.dependentId || "",
    },
  });

  // Fetch options for dropdowns
  const { data: cards = [], isLoading: cardsLoading } = useCards();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: dependents = [], isLoading: dependentsLoading } = useDependents();

  const selectedCardId = watch("cardId");
  const selectedCategoryName = watch("purchaseCategory");
  const selectedDependentId = watch("dependentId");
  const installments = watch("installments");
  const amount = watch("amount");

  // Calculate installment value
  const installmentValue = installments > 0 ? (amount / installments).toFixed(2) : "0.00";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Card Selection */}
      <div className="space-y-2">
        <Label htmlFor="cardId">Cartão *</Label>
        <Select
          value={selectedCardId}
          onValueChange={(value) => setValue("cardId", value)}
          disabled={isLoading || cardsLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o cartão" />
          </SelectTrigger>
          <SelectContent>
            {cards.map((card) => (
              <SelectItem key={card.id} value={card.id}>
                {card.name} - {card.bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cardId && (
          <p className="text-sm text-destructive">{errors.cardId.message}</p>
        )}
      </div>

      {/* Purchase Name */}
      <div className="space-y-2">
        <Label htmlFor="purchaseName">Nome da Compra *</Label>
        <Input
          id="purchaseName"
          placeholder="Ex: Compras no mercado"
          {...register("purchaseName")}
          disabled={isLoading}
        />
        {errors.purchaseName && (
          <p className="text-sm text-destructive">{errors.purchaseName.message}</p>
        )}
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <Label htmlFor="purchaseCategory">Categoria *</Label>
        <Select
          value={selectedCategoryName}
          onValueChange={(value) => setValue("purchaseCategory", value)}
          disabled={isLoading || categoriesLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.purchaseCategory && (
          <p className="text-sm text-destructive">{errors.purchaseCategory.message}</p>
        )}
      </div>

      {/* Amount and Installments */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Valor Total (R$) *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="100.00"
            {...register("amount", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="installments">Parcelas *</Label>
          <Input
            id="installments"
            type="number"
            min="1"
            max="60"
            placeholder="1"
            {...register("installments", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.installments && (
            <p className="text-sm text-destructive">{errors.installments.message}</p>
          )}
        </div>
      </div>

      {/* Installment Preview */}
      {installments > 1 && amount > 0 && (
        <div className="rounded-md border p-3 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {installments}x de R$ {installmentValue}
          </p>
        </div>
      )}

      {/* Purchase Date */}
      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Data da Compra</Label>
        <Input
          id="purchaseDate"
          type="date"
          {...register("purchaseDate")}
          disabled={isLoading}
        />
        {errors.purchaseDate && (
          <p className="text-sm text-destructive">{errors.purchaseDate.message}</p>
        )}
      </div>

      {/* Dependent Selection (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="dependentId">Dependente (Opcional)</Label>
        <Select
          value={selectedDependentId || "none"}
          onValueChange={(value) =>
            setValue("dependentId", value === "none" ? undefined : value)
          }
          disabled={isLoading || dependentsLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Nenhum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum</SelectItem>
            {dependents.map((dependent) => (
              <SelectItem key={dependent.id} value={dependent.id}>
                {dependent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.dependentId && (
          <p className="text-sm text-destructive">{errors.dependentId.message}</p>
        )}
      </div>

      {/* Description (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Adicione detalhes sobre esta compra..."
          rows={3}
          {...register("description")}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>
    </form>
  );
}
