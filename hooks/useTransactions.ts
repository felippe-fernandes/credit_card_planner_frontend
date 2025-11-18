import { TransactionService } from "@/services/transactions";
import type { Transaction, CreateTransactionDto, UpdateTransactionDto } from "@/types/entities/transaction";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServiceClient } from "./useServiceClient";
import { useQueryList, useQuerySingle } from "./useQueryFactory";
import { queryKeys } from "@/lib/queryKeys";
import { createBatchMutationCallbacks } from "@/lib/mutations";

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
  const transactionService = useServiceClient({ service: TransactionService });
  return useQueryList(transactionService, queryKeys.transactions.all, filters as Record<string, unknown>);
}

export function useTransaction(id: string) {
  const transactionService = useServiceClient({ service: TransactionService });
  return useQuerySingle(transactionService, queryKeys.transactions.single, id, "id");
}

export function useCreateTransaction() {
  const transactionService = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionDto) => {
      const response = await transactionService.create(data);
      return response.result;
    },
    ...createBatchMutationCallbacks({
      queryClient,
      queryKeys: [
        queryKeys.transactions.all(),
        queryKeys.cards.all(),
        queryKeys.invoices.all(),
      ],
      successMessage: "Transaction created successfully!",
      errorMessage: "Error creating transaction",
    }),
  });
}

export function useUpdateTransaction() {
  const transactionService = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionDto }) => {
      const response = await transactionService.update(id, data);
      return response.result;
    },
    ...createBatchMutationCallbacks<Transaction>({
      queryClient,
      queryKeys: [
        queryKeys.transactions.all(),
        queryKeys.cards.all(),
        queryKeys.invoices.all(),
      ],
      successMessage: "Transaction updated successfully!",
      errorMessage: "Error updating transaction",
      onSuccessCallback: () => {
        const mutations = queryClient.getMutationCache().getAll();
        const lastMutation = mutations[mutations.length - 1];
        if (lastMutation?.state.variables) {
          const vars = lastMutation.state.variables as { id: string };
          queryClient.invalidateQueries({
            queryKey: queryKeys.transactions.single(vars.id),
          });
        }
      },
    }),
  });
}

export function useDeleteTransaction() {
  const transactionService = useServiceClient({ service: TransactionService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await transactionService.delete(id);
      return response.result;
    },
    ...createBatchMutationCallbacks({
      queryClient,
      queryKeys: [
        queryKeys.transactions.all(),
        queryKeys.cards.all(),
        queryKeys.invoices.all(),
      ],
      successMessage: "Transaction deleted successfully!",
      errorMessage: "Error deleting transaction",
    }),
  });
}
