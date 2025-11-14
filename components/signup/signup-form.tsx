"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useServiceClient } from "@/hooks/useServiceClient";
import { signupRequest } from "@/schemas/api/auth.schema";
import { AuthService } from "@/services/auth";

type SignupFormData = z.infer<typeof signupRequest>;

export default function SignupForm() {
  const router = useRouter();
  const authService = useServiceClient({ service: AuthService });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupRequest),
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormData) => authService.SignUp(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      router.push("/login?registered=true");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao criar conta. Tente novamente.";
      toast.error(message);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  const isSubmitting = signupMutation.isPending;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Criar conta</CardTitle>
        <CardDescription>Preencha os dados abaixo para começar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <Input
              label="Nome completo"
              id="name"
              type="text"
              placeholder="João Silva"
              required
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}

            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              required
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}

            <Input
              label="Telefone"
              id="phone"
              type="tel"
              placeholder="(11) 98765-4321"
              autoComplete="tel"
              required
              {...register("phone")}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}

            <Input
              label="Senha"
              id="password"
              type="password"
              placeholder="Pelo menos 6 caracteres"
              autoComplete="new-password"
              required
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}

            <Button
              id="signup"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
