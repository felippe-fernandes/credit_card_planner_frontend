import { CardService } from "@/services/cards";
import type { Card, CreateCardDto, UpdateCardDto } from "@/types/entities/card";
import { PaginationParams } from "@/types/api/pagination";
import { useQueryClient } from "@tanstack/react-query";
import { useServiceClient } from "./useServiceClient";
import { useQueryList, useQuerySingle } from "./useQueryFactory";
import { useCRUDMutations } from "./useCRUDMutations";
import { queryKeys } from "@/lib/queryKeys";

interface UseCardsFilters extends PaginationParams {
  flag?: string;
  bank?: string;
  dueDay?: number;
  payDay?: number;
  name?: string;
}

export function useCards(filters?: UseCardsFilters) {
  const cardService = useServiceClient({ service: CardService });
  return useQueryList(cardService, queryKeys.cards.all, filters as Record<string, unknown>);
}

export function useCard(id: string) {
  const cardService = useServiceClient({ service: CardService });
  return useQuerySingle(cardService, queryKeys.cards.single, id, "id");
}

function useCardMutations() {
  const cardService = useServiceClient({ service: CardService });
  const queryClient = useQueryClient();

  return useCRUDMutations<Card, CreateCardDto, UpdateCardDto>(cardService, {
    entityName: "Card",
    queryKey: queryKeys.cards.all(),
  });
}

export function useCreateCard() {
  const mutations = useCardMutations();
  return mutations.useCreate();
}

export function useUpdateCard() {
  const mutations = useCardMutations();
  const queryClient = useQueryClient();
  const mutation = mutations.useUpdate();

  return {
    ...mutation,
    mutate: (variables: { id: string; data: UpdateCardDto }, options?: any) => {
      mutation.mutate(variables, {
        ...options,
        onSuccess: (data: any, vars: any, context: any) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.cards.single(vars.id) });
          options?.onSuccess?.(data, vars, context);
        },
      });
    },
  };
}

export function useDeleteCard() {
  const mutations = useCardMutations();
  return mutations.useDelete();
}
