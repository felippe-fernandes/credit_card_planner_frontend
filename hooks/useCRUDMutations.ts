import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMutationCallbacks } from "@/lib/mutations";

interface CRUDService<TEntity, TCreateDto, TUpdateDto> {
  create: (data: TCreateDto) => Promise<{ result: TEntity }>;
  update: (id: string, data: TUpdateDto) => Promise<{ result: TEntity }>;
  delete: (id: string) => Promise<{ result: { id: string } }>;
}

interface CRUDMutationsConfig {
  entityName: string;
  queryKey: readonly unknown[];
}

export function useCRUDMutations<TEntity, TCreateDto, TUpdateDto>(
  service: CRUDService<TEntity, TCreateDto, TUpdateDto>,
  config: CRUDMutationsConfig
) {
  const queryClient = useQueryClient();
  const { entityName, queryKey } = config;

  const useCreate = () =>
    useMutation({
      mutationFn: async (data: TCreateDto) => {
        const response = await service.create(data);
        return response.result;
      },
      ...createMutationCallbacks({
        queryClient,
        queryKey,
        successMessage: `${entityName} created successfully!`,
        errorMessage: `Error creating ${entityName.toLowerCase()}`,
      }),
    });

  const useUpdate = () =>
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: TUpdateDto;
      }) => {
        const response = await service.update(id, data);
        return response.result;
      },
      ...createMutationCallbacks({
        queryClient,
        queryKey,
        successMessage: `${entityName} updated successfully!`,
        errorMessage: `Error updating ${entityName.toLowerCase()}`,
      }),
    });

  const useDelete = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const response = await service.delete(id);
        return response.result;
      },
      ...createMutationCallbacks({
        queryClient,
        queryKey,
        successMessage: `${entityName} deleted successfully!`,
        errorMessage: `Error deleting ${entityName.toLowerCase()}`,
      }),
    });

  return {
    useCreate,
    useUpdate,
    useDelete,
  };
}
