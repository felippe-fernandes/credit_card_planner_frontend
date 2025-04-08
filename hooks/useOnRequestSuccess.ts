import { useEffect } from "react";

interface UseOnRequestSuccessProps<T> {
  data: T;
  callback: (response: T) => void;
}

function useOnRequestSuccess<T>({
  data,
  callback,
}: UseOnRequestSuccessProps<T>): void {
  useEffect(() => {
    if (data) {
      callback(data);
    }
  }, [data, callback]);
}

export default useOnRequestSuccess;
