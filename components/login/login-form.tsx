import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthLogin } from "@/services/api/authentication/authentication";
import { authLoginBody } from "@/services/zod/authentication/authentication.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

type AuthLoginBody = z.infer<typeof authLoginBody>;

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthLoginBody>({
    resolver: zodResolver(authLoginBody),
  });

  const { mutate, error: loginError } = useAuthLogin({
    mutation: {
      onSuccess: (response) => {
        sessionStorage.setItem(
          "expires_at",
          response.data.expires_at?.toString() ?? ""
        );
        router.push("/dashboard");
      },
    },
  });

  const onSubmit = async ({ email, password }: AuthLoginBody) => {
    mutate({ data: { email, password } });
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
              {loginError && (
                <p className="text-red-500 text-sm">{loginError.message}</p>
              )}

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
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                    <p className="text-red-500 text-sm">
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
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
