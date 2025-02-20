"use client";

import LoadingPage from "@/components/common/loader";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default Wrapper;
