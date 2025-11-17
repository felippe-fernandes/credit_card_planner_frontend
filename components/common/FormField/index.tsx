import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/common/FormError";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export function FormField({
  label,
  error,
  required,
  containerClassName,
  id,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id}>
        {label}
        {required && " *"}
      </Label>
      <Input id={id} className={className} {...props} />
      <FormError message={error} />
    </div>
  );
}
