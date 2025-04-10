"use client";

import { useSignOut } from "@/hooks/useSignOut";
import withAuthTokenCheck from "@/lib/HOC/withAuthTokenCheck";

function DashboardPage() {
  const { signOut, isPending } = useSignOut();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <button onClick={() => signOut()} disabled={isPending}>
        {isPending ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}

export default withAuthTokenCheck(DashboardPage);
