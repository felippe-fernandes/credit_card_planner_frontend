"use client";

import { LoginForm } from "@/components/login/login-form";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  useEffect(() => {
    const authExpired = sessionStorage.getItem("auth_expired");
    if (authExpired) {
      toast.error("Sua sessão expirou. Por favor, faça login novamente.");
      sessionStorage.removeItem("auth_expired");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CreditCard className="size-4" />
          </div>
          Credit Card Planner
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
