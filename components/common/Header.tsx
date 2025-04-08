import { Button } from "@/components/ui/button";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between p-4  text-white">
      <span className="font-semibold text-lg">Usuário</span>

      <Button variant="outline" onClick={() => {}}>
        Logout
      </Button>
    </header>
  );
};

export default Header;
