import { TransactionService } from "@/services/transactions";
import { CreateTransactionDto, UpdateTransactionDto } from "@/types/entities/transaction";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

interface UseTransactionsFilters extends PaginationParams {
  card?: string;
  dependent?: string;
  purchaseName?: string;
  purchaseCategory?: string;
  purchaseDate?: string;
  startDate?: string;
  endDate?: string;
  installments?: number;
  installmentDates?: string;
}

export function useTransactions(filters?: UseTransactionsFilters) {
  const TransactionClient = useServiceClient({ service: TransactionService });

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const response = await TransactionClient.getAll(filters);
      return response;
    },
  });
}

export function useTransaction(id: string) {
  const TransactionClient = useServiceClient({ service: TransactionService });

  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const response = await TransactionClient.getById(id);
      return response.result;
    },
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const TransactionClient = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionDto) => {
      const response = await TransactionClient.create(data);
      return response.result;
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // Card limit changes
      queryClient.invalidateQueries({ queryKey: ["invoices"] }); // Invoices affected
      toast.success("Transação criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar transação");
    },
  });
}

export function useUpdateTransaction() {
  const TransactionClient = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionDto }) => {
      const response = await TransactionClient.update(id, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Transação atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar transação");
    },
  });
}

export function useDeleteTransaction() {
  const TransactionClient = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await TransactionClient.delete(id);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Transação excluída com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir transação");
    },
  });
}
