"use client";

import { LoginForm } from "@/components/login/login-form";
import api from "@/lib/axios";
import { LoginRequest, loginRequest } from "@/schemas/api/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequest),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: () => {
      setError("E-mail ou senha inválidos");
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary">
            <BsFillCreditCard2FrontFill className="size-4" />
          </div>
          Credit Card Planner
        </a>
        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          onSubmit={(data) => mutation.mutate(data)}
          errorMessage={error}
        />
      </div>
    </div>
  );
}
