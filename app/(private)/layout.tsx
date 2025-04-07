"use client";

import Header from "@/components/common/Header";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
