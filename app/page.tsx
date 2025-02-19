"use client";

import { useSession } from "@/hooks/useSession";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router, session]);

  return null;
}

export default withAuth(Home);
