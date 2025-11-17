import { cn } from "@/lib/utils";

interface ErrorAlertProps {
  message?: string;
  className?: string;
}

export function ErrorAlert({ message, className }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "rounded-md bg-destructive/10 border border-destructive/20 p-3",
        className
      )}
    >
      <p className="text-destructive text-sm font-medium">{message}</p>
    </div>
  );
}
