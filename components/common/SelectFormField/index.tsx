import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/components/common/FormError";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  containerClassName?: string;
  id?: string;
}

export function SelectFormField({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  error,
  required,
  disabled,
  isLoading,
  containerClassName,
  id,
}: SelectFormFieldProps) {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id}>
        {label}
        {required && " *"}
      </Label>
      {isLoading ? (
        <div className="h-10 rounded-md border border-input bg-background px-3 py-2">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      ) : (
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger id={id}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <FormError message={error} />
    </div>
  );
}
