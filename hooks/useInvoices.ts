import { InvoiceService } from "@/services/invoices";
import {
  InvoiceStatus,
  MarkInvoiceAsPaidDto,
  UpdateInvoiceDto,
} from "@/types/entities/invoice";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

interface UseInvoicesFilters extends PaginationParams {
  cardId?: string;
  month?: number;
  year?: number;
  status?: InvoiceStatus;
}

export function useInvoices(filters?: UseInvoicesFilters) {
  const InvoiceClient = useServiceClient({ service: InvoiceService });

  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: async () => {
      const response = await InvoiceClient.getAll(filters);
      return response;
    },
  });
}

export function useInvoice(id: string) {
  const InvoiceClient = useServiceClient({ service: InvoiceService });

  return useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const response = await InvoiceClient.getById(id);
      return response.result;
    },
    enabled: !!id,
  });
}

export function useInvoiceForecast(months: number, cardId?: string) {
  const InvoiceClient = useServiceClient({ service: InvoiceService });

  return useQuery({
    queryKey: ["invoice-forecast", months, cardId],
    queryFn: async () => {
      const response = await InvoiceClient.getForecast({ months, cardId });
      return response.result;
    },
    enabled: months > 0,
  });
}

export function useUpdateInvoice() {
  const InvoiceClient = useServiceClient({ service: InvoiceService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateInvoiceDto }) => {
      const response = await InvoiceClient.update(id, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // Card limit may change
      toast.success("Fatura atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar fatura");
    },
  });
}

export function useMarkInvoiceAsPaid() {
  const InvoiceClient = useServiceClient({ service: InvoiceService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MarkInvoiceAsPaidDto }) => {
      const response = await InvoiceClient.markAsPaid(id, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice", variables.id] });
      toast.success("Fatura marcada como paga!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao marcar fatura como paga");
    },
  });
}

export function useUpdateAllInvoices() {
  const InvoiceClient = useServiceClient({ service: InvoiceService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await InvoiceClient.updateAll();
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Todas as faturas foram recalculadas!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao recalcular faturas");
    },
  });
}
