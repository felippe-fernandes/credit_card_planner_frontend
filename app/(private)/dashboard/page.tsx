"use client";

import { Button } from "@/components/common/Button";

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Button id="login">Sair</Button>
    </div>
  );
}

export default DashboardPage;
