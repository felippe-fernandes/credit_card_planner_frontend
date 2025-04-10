"use client";

import LoadingPage from "@/components/common/loader";
import { useSignOut } from "@/hooks/useSignOut";
import { useEffect } from "react";

const withAuthTokenCheck = (Component: React.FC) => {
  const AuthenticatedComponent = (
    props: React.ComponentProps<typeof Component>
  ) => {
    const { signOut, isPending } = useSignOut();

    useEffect(() => {
      const expiresAt = sessionStorage.getItem("expires_at");
      const isExpired = expiresAt && Date.now() > Number(expiresAt) * 1000;

      if (!expiresAt || isExpired) {
        signOut();
      }
    }, [signOut]);

    if (isPending) {
      <LoadingPage />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthTokenCheck;
