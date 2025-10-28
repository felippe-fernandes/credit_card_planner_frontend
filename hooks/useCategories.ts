import { CategoryService } from "@/services/categories";
import { CreateCategoryDto, UpdateCategoryDto } from "@/types/entities/category";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

interface UseCategoriesFilters extends PaginationParams {
  name?: string;
}

export function useCategories(filters?: UseCategoriesFilters) {
  const CategoryClient = useServiceClient({ service: CategoryService });

  return useQuery({
    queryKey: ["categories", filters],
    queryFn: async () => {
      const response = await CategoryClient.getAll(filters);
      return response;
    },
  });
}

export function useCategory(name: string) {
  const CategoryClient = useServiceClient({ service: CategoryService });

  return useQuery({
    queryKey: ["category", name],
    queryFn: async () => {
      const response = await CategoryClient.getByName(name);
      return response.result;
    },
    enabled: !!name,
  });
}

export function useCreateCategory() {
  const CategoryClient = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryDto) => {
      const response = await CategoryClient.create(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar categoria");
    },
  });
}

export function useUpdateCategory() {
  const CategoryClient = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, data }: { name: string; data: UpdateCategoryDto }) => {
      const response = await CategoryClient.update(name, data);
      return response.result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.name] });
      toast.success("Categoria atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar categoria");
    },
  });
}

export function useDeleteCategory() {
  const CategoryClient = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await CategoryClient.delete(name);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria excluída com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir categoria");
    },
  });
}

export function useAddDefaultCategories() {
  const CategoryClient = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await CategoryClient.addDefaults();
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categorias padrão adicionadas com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao adicionar categorias padrão");
    },
  });
}
