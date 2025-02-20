import { useAuthStore } from "@/store/auth";
import axios, { AxiosHeaders, Method } from "axios";
import { env } from "./env";

const {
  session: { token },
} = useAuthStore.getState();

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

interface IHandleAxiosRequest {
  path: string;
  method: Method;
  headers?: AxiosHeaders;
  data?: object;
  withCredentials?: boolean;
  params?: object;
  errorMessage?: string;
}

export const handleAxiosRequest = async <T>({
  path,
  method,
  headers,
  data,
  withCredentials,
  params,
  errorMessage,
}: IHandleAxiosRequest): Promise<T> => {
  try {
    const response = await api.request<T>({
      url: path,
      method,
      data,
      params,
      headers,
      withCredentials,
    });

    if (response.data === null || response.data === undefined) {
      throw new Error(errorMessage ?? "Received null or undefined data");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw new Error(errorMessage ?? "An error occurred during the request");
    } else {
      // Handle non-Axios error
      throw new Error(errorMessage ?? "An unexpected error occurred");
    }
  }
};

export default api;
