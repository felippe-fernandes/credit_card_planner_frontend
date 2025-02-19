import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const { checkAuth, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      const authValid = checkAuth();
      if (!authValid) {
        router.push("/login");
      }
    }, [checkAuth, router, isAuthenticated]);

    if (!isAuthenticated) {
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
