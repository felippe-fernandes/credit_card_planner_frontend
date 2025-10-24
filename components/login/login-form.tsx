import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServiceClient } from "@/hooks/useServiceClient";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import type { LoginRequest } from "@/types/auth";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const AuthClient = useServiceClient({ service: AuthService });
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({});

  const { mutate } = useMutation({
    mutationFn: async (payload: LoginRequest) =>
      await AuthClient.Login(payload),
    onSuccess: async (response) => {
      // O backend retorna 'result' em vez de 'data'
      if (response?.result?.access_token) {
        // Invalida a query de sessão para forçar atualização
        await queryClient.invalidateQueries({ queryKey: ["session"] });

        // Aguarda um breve momento para o AuthContext processar a nova sessão
        await new Promise((resolve) => setTimeout(resolve, 100));

        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Erro: resposta inválida do servidor");
      }
    },
    onError: (error: Error) => {
      const message =
        error.message || "Erro ao fazer login. Verifique suas credenciais.";
      toast.error(message);
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  {...register("password")}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}

                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <Button
                id="login"
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
