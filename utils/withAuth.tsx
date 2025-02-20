import { useServiceClient } from "@/hooks/useServiceClient";
import { AuthService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const {
      session: { isAuthenticated },
    } = useAuthStore();
    const router = useRouter();
    const AuthClient = useServiceClient({ service: AuthService });

    const { data, isLoading } = useQuery({
      queryKey: ["Check Auth"],
      queryFn: () => AuthClient.Check(),
    });

    useEffect(() => {
      if (!isLoading && !data.isAuthenticated) {
        router.push("/login");
      }
    }, [data.isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return AuthComponent;
};

export default withAuth;
