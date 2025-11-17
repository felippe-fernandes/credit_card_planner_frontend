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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../common/Button";
import { ErrorAlert } from "../common/ErrorAlert";
import { FormField } from "../common/FormField";

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

  const { mutate, isError, error } = useMutation({
    mutationFn: async (payload: LoginRequest) =>
      await AuthClient.Login(payload),
    onSuccess: async (response) => {
      if (response?.result?.access_token) {
       await queryClient.invalidateQueries({ queryKey: ["session"] });

        await new Promise((resolve) => setTimeout(resolve, 100));

        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Erro: resposta inválida do servidor");
      }
    },
    onError: (error: Error) => {
      const message =
        error.message || "Login failed. Please check your credentials.";
      toast.error(message, {
        duration: 5000,
        description: "Please verify your information and try again.",
      });
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
              {isError && <ErrorAlert message={error?.message} />}

              <FormField
                label="Email"
                id="email"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                required
                disabled={isSubmitting}
                {...register("email")}
              />

              <div className="flex flex-col gap-2">
                <FormField
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  error={errors.password?.message}
                  required
                  disabled={isSubmitting}
                  {...register("password")}
                />

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
