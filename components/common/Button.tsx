import { FC } from "react";
import { Button as ShadcnButton } from "../ui/button";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

export const Input: FC<IButton> = ({
  className,
  children,
  id,
  type = "button",
  ...rest
}) => {
  return (
    <ShadcnButton
      data-testid={`button_test_id_${id}`}
      type={type}
      className={className}
      {...rest}
    >
      {children}
    </ShadcnButton>
  );
};
