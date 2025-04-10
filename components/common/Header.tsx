import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useSignOut";
import { FC } from "react";

const Header: FC = () => {
  const { signOut, isPending } = useSignOut();

  return (
    <header className="flex items-center justify-between p-4  text-white">
      <span className="font-semibold text-lg">Usuário</span>

      <Button variant="outline" onClick={() => signOut()} disabled={isPending}>
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
    </header>
  );
};

export default Header;
