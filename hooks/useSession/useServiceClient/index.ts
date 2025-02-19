import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useQueryParams = <
  T extends Record<string, string | number | boolean | unknown>
>() => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Memoize the query parameters to avoid recomputation on each render
  const queryParam = useMemo(() => {
    const query = new URLSearchParams();

    if (searchParams) {
      searchParams.forEach((value, key) => query.append(key, value));
    }

    return query;
  }, [searchParams]);

  // Set a new query parameters or update an existing one
  const setQueryParam = <K extends keyof T>(name: K, value: T[K]) => {
    queryParam.set(String(name), String(value));

    router.replace(`?${queryParam}`, { scroll: false });
  };

  // Get the value of a specific query parameter
  const getQueryParam = <K extends keyof T>(name: K): T[K] | undefined => {
    const value = queryParam.get(String(name));

    if (value === null) return undefined;

    return value as T[K];
  };

  // Get all query parameters or only those that include a specific string
  const getAllQueryParam = (
    includes?: string
  ): Record<string, string> | undefined => {
    const queryParams: Record<string, string> = {};

    queryParam.forEach((value, key) => {
      if (!includes || key.includes(includes)) {
        queryParams[key] = value;
      }
    });

    return Object.keys(queryParam).length > 0 ? queryParams : undefined;
  };

  // Remove a specific query parameter
  const removeQueryParam = <K extends keyof T>(name: K) => {
    queryParam.delete(String(name));
    const queryString = queryParam.toString();
    router.replace(queryString ? `?${queryString}` : "", { scroll: false });
  };

  return {
    queryParam,
    setQueryParam,
    getQueryParam,
    getAllQueryParam,
    removeQueryParam,
  };
};
