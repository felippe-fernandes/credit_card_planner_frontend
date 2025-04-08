import { useEffect } from "react";

interface UseOnRequestErrorProps<T> {
  isError: boolean;
  callback: (error: T) => void;
  error: T;
}

function useOnRequestError<T>({
  error,
  callback,
  isError,
}: UseOnRequestErrorProps<T>): void {
  useEffect(() => {
    if (isError) {
      callback(error);
    }
  }, [isError, callback, error]);
}

export default useOnRequestError;
