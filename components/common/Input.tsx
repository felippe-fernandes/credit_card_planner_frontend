import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Input as ShadcnInput } from "../ui/input";
import { Label as ShadcnLabel } from "../ui/label";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	labelClassName?: string;
	id: string;
}

export const Input: FC<IInput> = ({ id, label, labelClassName, ...rest }) => {
	return (
		<div className="grid gap-2">
			{label && (
				<ShadcnLabel className={twMerge(labelClassName)} htmlFor={id}>
					{label}
				</ShadcnLabel>
			)}
			<ShadcnInput id={id} {...rest} />
		</div>
	);
};
