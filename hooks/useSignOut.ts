import { useAuthSignOut } from "@/services/api/authentication/authentication";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const {
    mutate: signOut,
    isPending,
    error,
  } = useAuthSignOut({
    mutation: {
      onSuccess: () => {
        sessionStorage.removeItem("expires_at");
        router.push("/login");
      },
    },
  });

  return { signOut, isPending, error };
};
