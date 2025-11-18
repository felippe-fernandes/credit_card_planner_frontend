import { CategoryService } from "@/services/categories";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "@/types/entities/category";
import { PaginationParams } from "@/types/api/pagination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServiceClient } from "./useServiceClient";
import { useQueryList, useQuerySingle } from "./useQueryFactory";
import { useCRUDMutations } from "./useCRUDMutations";
import { queryKeys } from "@/lib/queryKeys";
import { createMutationCallbacks } from "@/lib/mutations";

interface UseCategoriesFilters extends PaginationParams {
  name?: string;
}

export function useCategories(filters?: UseCategoriesFilters) {
  const categoryService = useServiceClient({ service: CategoryService });
  return useQueryList(categoryService, queryKeys.categories.all, filters as Record<string, unknown>);
}

export function useCategory(name: string) {
  const categoryService = useServiceClient({ service: CategoryService });
  return useQuerySingle(categoryService, queryKeys.categories.single, name, "name");
}

export function useCreateCategory() {
  const categoryService = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryDto) => {
      const response = await categoryService.create(data);
      return response.result;
    },
    ...createMutationCallbacks({
      queryClient,
      queryKey: queryKeys.categories.all(),
      successMessage: "Category created successfully!",
      errorMessage: "Error creating category",
    }),
  });
}

export function useUpdateCategory() {
  const categoryService = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, data }: { name: string; data: UpdateCategoryDto }) => {
      const response = await categoryService.update(name, data);
      return response.result;
    },
    ...createMutationCallbacks({
      queryClient,
      queryKey: queryKeys.categories.all(),
      successMessage: "Category updated successfully!",
      errorMessage: "Error updating category",
      onSuccessCallback: () => {
        const mutations = queryClient.getMutationCache().getAll();
        const lastMutation = mutations[mutations.length - 1];
        if (lastMutation?.state.variables) {
          const vars = lastMutation.state.variables as { name: string };
          queryClient.invalidateQueries({
            queryKey: queryKeys.categories.single(vars.name),
          });
        }
      },
    }),
  });
}

export function useDeleteCategory() {
  const categoryService = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await categoryService.delete(name);
      return response.result;
    },
    ...createMutationCallbacks({
      queryClient,
      queryKey: queryKeys.categories.all(),
      successMessage: "Category deleted successfully!",
      errorMessage: "Error deleting category",
    }),
  });
}

export function useAddDefaultCategories() {
  const categoryService = useServiceClient({ service: CategoryService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await categoryService.addDefaults();
      return response.result;
    },
    ...createMutationCallbacks({
      queryClient,
      queryKey: queryKeys.categories.all(),
      successMessage: "Default categories added successfully!",
      errorMessage: "Error adding default categories",
    }),
  });
}
