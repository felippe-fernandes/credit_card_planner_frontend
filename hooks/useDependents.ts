import { DependentService } from "@/services/dependents";
import { CreateDependentDto, UpdateDependentDto } from "@/types/entities/dependent";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

interface UseDependentsFilters extends PaginationParams {
  name?: string;
  id?: string;
}

export function useDependents(filters?: UseDependentsFilters) {
  const DependentClient = useServiceClient({ service: DependentService });

  return useQuery({
    queryKey: ["dependents", filters],
    queryFn: async () => {
      const response = await DependentClient.getAll(filters);
      return response;
    },
  });
}

export function useDependent(id: string) {
  const DependentClient = useServiceClient({ service: DependentService });

  return useQuery({
    queryKey: ["dependent", id],
    queryFn: async () => {
      const response = await DependentClient.getById(id);
      return response.result;
    },
    enabled: !!id,
  });
}

export function useCreateDependent() {
  const DependentClient = useServiceClient({ service: DependentService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDependentDto) => {
      const response = await DependentClient.create(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
      toast.success("Dependente criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar dependente");
    },
  });
}

export function useUpdateDependent() {
  const DependentClient = useServiceClient({ service: DependentService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDependentDto }) => {
      const response = await DependentClient.update(id, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
      queryClient.invalidateQueries({ queryKey: ["dependent", variables.id] });
      toast.success("Dependente atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar dependente");
    },
  });
}

export function useDeleteDependent() {
  const DependentClient = useServiceClient({ service: DependentService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await DependentClient.delete(id);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
      toast.success("Dependente excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir dependente");
    },
  });
}
