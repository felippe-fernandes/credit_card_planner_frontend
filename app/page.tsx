"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Home() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    verifyAuth();
  }, [isAuthenticated, router, checkAuth]);

  return null;
}

export default Home;
