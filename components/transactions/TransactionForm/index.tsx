"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "@/schemas/api/transaction.schema";
import { CreateTransactionDto, Transaction } from "@/types/entities/transaction";
import { FormField } from "@/components/common/FormField";
import { SelectFormField } from "@/components/common/SelectFormField";
import { FormError } from "@/components/common/FormError";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCards } from "@/hooks/useCards";
import { useCategories } from "@/hooks/useCategories";
import { useDependents } from "@/hooks/useDependents";

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionDto) => void;
  defaultValues?: Partial<Transaction>;
  isLoading?: boolean;
  formId?: string;
}

export function TransactionForm({
  onSubmit,
  defaultValues,
  isLoading = false,
  formId,
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
      amount: defaultValues?.amount || "0",
      installments: defaultValues?.installments || 1,
      purchaseDate: defaultValues?.purchaseDate
        ? new Date(defaultValues.purchaseDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dependentId: defaultValues?.dependentId || "",
    },
  });

  // Fetch options for dropdowns
  const { data: cardsData, isLoading: cardsLoading } = useCards();
  const cards = cardsData?.result || [];
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const categories = categoriesData?.result || [];
  const { data: dependentsData, isLoading: dependentsLoading } = useDependents();
  const dependents = dependentsData?.result || [];

  const selectedCardId = watch("cardId");
  const selectedCategoryName = watch("purchaseCategory");
  const selectedDependentId = watch("dependentId");
  const installments = watch("installments");
  const amount = watch("amount");

  // Calculate installment value
  const installmentValue = installments > 0 && amount ? (Number(amount) / installments).toFixed(2) : "0.00";

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SelectFormField
        label="Cartão"
        id="cardId"
        value={selectedCardId}
        onValueChange={(value) => setValue("cardId", value)}
        options={cards.map((card) => ({
          value: card.id,
          label: `${card.name} - ${card.bank}`,
        }))}
        placeholder="Selecione o cartão"
        error={errors.cardId?.message}
        required
        disabled={isLoading}
        isLoading={cardsLoading}
      />

      <FormField
        label="Nome da Compra"
        id="purchaseName"
        placeholder="Ex: Compras no mercado"
        error={errors.purchaseName?.message}
        required
        disabled={isLoading}
        {...register("purchaseName")}
      />

      <SelectFormField
        label="Categoria"
        id="purchaseCategory"
        value={selectedCategoryName}
        onValueChange={(value) => setValue("purchaseCategory", value)}
        options={categories.map((category) => ({
          value: category.name,
          label: `${category.icon} ${category.name}`,
        }))}
        placeholder="Selecione a categoria"
        error={errors.purchaseCategory?.message}
        required
        disabled={isLoading}
        isLoading={categoriesLoading}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Valor Total (R$)"
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="100.00"
          error={errors.amount?.message}
          required
          disabled={isLoading}
          {...register("amount")}
        />

        <FormField
          label="Parcelas"
          id="installments"
          type="number"
          min="1"
          max="60"
          placeholder="1"
          error={errors.installments?.message}
          required
          disabled={isLoading}
          {...register("installments", { valueAsNumber: true })}
        />
      </div>

      {/* Installment Preview */}
      {installments > 1 && Number(amount) > 0 && (
        <div className="rounded-md border p-3 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {installments}x de R$ {installmentValue}
          </p>
        </div>
      )}

      <FormField
        label="Data da Compra"
        id="purchaseDate"
        type="date"
        error={errors.purchaseDate?.message}
        disabled={isLoading}
        {...register("purchaseDate")}
      />

      <SelectFormField
        label="Dependente (Opcional)"
        id="dependentId"
        value={selectedDependentId || "none"}
        onValueChange={(value) =>
          setValue("dependentId", value === "none" ? undefined : value)
        }
        options={[
          { value: "none", label: "Nenhum" },
          ...dependents.map((dependent) => ({
            value: dependent.id,
            label: dependent.name,
          })),
        ]}
        placeholder="Nenhum"
        error={errors.dependentId?.message}
        disabled={isLoading}
        isLoading={dependentsLoading}
      />

      <div className="space-y-2">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Adicione detalhes sobre esta compra..."
          rows={3}
          {...register("description")}
          disabled={isLoading}
        />
        <FormError message={errors.description?.message} />
      </div>
    </form>
  );
}
