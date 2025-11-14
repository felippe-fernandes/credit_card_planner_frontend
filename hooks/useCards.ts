import { CardService } from "@/services/cards";
import { CreateCardDto, UpdateCardDto } from "@/types/entities/card";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

interface UseCardsFilters extends PaginationParams {
  flag?: string;
  bank?: string;
  dueDay?: number;
  payDay?: number;
  name?: string;
}

export function useCards(filters?: UseCardsFilters) {
  const CardClient = useServiceClient({ service: CardService });

  return useQuery({
    queryKey: ["cards", filters],
    queryFn: async () => {
      const response = await CardClient.getAll(filters);
      return response;
    },
  });
}

export function useCard(id: string) {
  const CardClient = useServiceClient({ service: CardService });

  return useQuery({
    queryKey: ["card", id],
    queryFn: async () => {
      const response = await CardClient.getById(id);
      return response.result;
    },
    enabled: !!id,
  });
}

export function useCreateCard() {
  const CardClient = useServiceClient({ service: CardService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCardDto) => {
      const response = await CardClient.create(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Cartão criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar cartão");
    },
  });
}

export function useUpdateCard() {
  const CardClient = useServiceClient({ service: CardService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCardDto }) => {
      const response = await CardClient.update(id, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["card", variables.id] });
      toast.success("Cartão atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar cartão");
    },
  });
}

export function useDeleteCard() {
  const CardClient = useServiceClient({ service: CardService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await CardClient.delete(id);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Cartão excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir cartão");
    },
  });
}
