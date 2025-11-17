import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface MutationCallbackConfig {
  queryClient: QueryClient;
  queryKey: readonly unknown[];
  successMessage: string;
  errorMessage?: string;
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}

export function createMutationCallbacks<TData = unknown>(
  config: MutationCallbackConfig
) {
  return {
    onSuccess: (data: TData) => {
      config.queryClient.invalidateQueries({ queryKey: config.queryKey });
      toast.success(config.successMessage);
      config.onSuccessCallback?.();
      return data;
    },
    onError: (error: Error) => {
      const message = error.message || config.errorMessage || "An error occurred";
      toast.error(message);
      config.onErrorCallback?.(error);
    },
  };
}

export interface BatchMutationCallbackConfig {
  queryClient: QueryClient;
  queryKeys: readonly (readonly unknown[])[];
  successMessage: string;
  errorMessage?: string;
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}

export function createBatchMutationCallbacks<TData = unknown>(
  config: BatchMutationCallbackConfig
) {
  return {
    onSuccess: (data: TData) => {
      config.queryKeys.forEach((queryKey) => {
        config.queryClient.invalidateQueries({ queryKey });
      });
      toast.success(config.successMessage);
      config.onSuccessCallback?.();
      return data;
    },
    onError: (error: Error) => {
      const message = error.message || config.errorMessage || "An error occurred";
      toast.error(message);
      config.onErrorCallback?.(error);
    },
  };
}
