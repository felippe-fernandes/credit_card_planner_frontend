"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("dashboard");
  }, [router]);

  return null;
}

export default Home;
