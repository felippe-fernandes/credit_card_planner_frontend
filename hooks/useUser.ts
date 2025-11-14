import { UpdateUserDto, UserService } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useServiceClient } from "./useServiceClient";

export function useUserProfile() {
  const UserClient = useServiceClient({ service: UserService });

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const response = await UserClient.getMe();
      return response.result;
    },
  });
}

export function useUpdateProfile() {
  const UserClient = useServiceClient({ service: UserService });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const response = await UserClient.updateMe(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar perfil");
    },
  });
}

export function useDeleteAccount() {
  const UserClient = useServiceClient({ service: UserService });
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await UserClient.deleteMe();
      return response.result;
    },
    onSuccess: () => {
      toast.success("Conta excluída com sucesso");
      // Redirect to login after account deletion
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir conta");
    },
  });
}
