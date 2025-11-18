import { DependentService } from "@/services/dependents";
import type { Dependent, CreateDependentDto, UpdateDependentDto } from "@/types/entities/dependent";
import { PaginationParams } from "@/types/api/pagination";
import { useQueryClient } from "@tanstack/react-query";
import { useServiceClient } from "./useServiceClient";
import { useQueryList, useQuerySingle } from "./useQueryFactory";
import { useCRUDMutations } from "./useCRUDMutations";
import { queryKeys } from "@/lib/queryKeys";

interface UseDependentsFilters extends PaginationParams {
  name?: string;
  id?: string;
}

export function useDependents(filters?: UseDependentsFilters) {
  const dependentService = useServiceClient({ service: DependentService });
  return useQueryList(dependentService, queryKeys.dependents.all, filters as Record<string, unknown>);
}

export function useDependent(id: string) {
  const dependentService = useServiceClient({ service: DependentService });
  return useQuerySingle(dependentService, queryKeys.dependents.single, id, "id");
}

function useDependentMutations() {
  const dependentService = useServiceClient({ service: DependentService });

  return useCRUDMutations<Dependent, CreateDependentDto, UpdateDependentDto>(
    dependentService,
    {
      entityName: "Dependent",
      queryKey: queryKeys.dependents.all(),
    }
  );
}

export function useCreateDependent() {
  const mutations = useDependentMutations();
  return mutations.useCreate();
}

export function useUpdateDependent() {
  const mutations = useDependentMutations();
  const queryClient = useQueryClient();
  const mutation = mutations.useUpdate();

  return {
    ...mutation,
    mutate: (variables: { id: string; data: UpdateDependentDto }, options?: any) => {
      mutation.mutate(variables, {
        ...options,
        onSuccess: (data: any, vars: any, context: any) => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.dependents.single(vars.id),
          });
          options?.onSuccess?.(data, vars, context);
        },
      });
    },
  };
}

export function useDeleteDependent() {
  const mutations = useDependentMutations();
  return mutations.useDelete();
}
