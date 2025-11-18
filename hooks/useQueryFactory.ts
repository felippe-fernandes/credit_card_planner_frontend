import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/api/pagination";

interface QueryListService<TEntity, TFilters> {
  getAll: (filters?: TFilters) => Promise<PaginatedResponse<TEntity[]>>;
}

interface QuerySingleService<TEntity> {
  getById?: (id: string) => Promise<{ result: TEntity }>;
  getByName?: (name: string) => Promise<{ result: TEntity }>;
}

export function useQueryList<TEntity, TFilters = Record<string, unknown>>(
  service: QueryListService<TEntity, TFilters>,
  queryKey: (filters?: TFilters) => readonly unknown[],
  filters?: TFilters
) {
  return useQuery({
    queryKey: queryKey(filters),
    queryFn: async () => {
      const response = await service.getAll(filters);
      return response;
    },
  });
}

export function useQuerySingle<TEntity>(
  service: QuerySingleService<TEntity>,
  queryKey: (identifier: string) => readonly unknown[],
  identifier: string,
  type: "id" | "name" = "id"
) {
  return useQuery({
    queryKey: queryKey(identifier),
    queryFn: async () => {
      const method = type === "id" ? service.getById : service.getByName;
      if (!method) {
        throw new Error(`Method for type "${type}" not found in service`);
      }
      const response = await method(identifier);
      return response.result;
    },
    enabled: !!identifier,
  });
}
