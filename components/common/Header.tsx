import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { FC } from "react";

const Header: FC = () => {
  const { session, signOut } = useAuth();
  console.log("🚀 | session:", session?.user?.user_metadata.displayName);

  return (
    <header className="flex items-center justify-between p-4  text-white">
      <span className="font-semibold text-lg">
        {session?.user?.user_metadata.displayName || "Usuário"}
      </span>

      <Button variant="outline" onClick={() => signOut()}>
        Logout
      </Button>
    </header>
  );
};

export default Header;
