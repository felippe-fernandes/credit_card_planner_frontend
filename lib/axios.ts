import axios, { AxiosHeaders, Method } from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
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
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        errorMessage ??
          error.response?.data.message ??
          error.message ??
          "An error occurred during the request"
      );
    } else {
      throw new Error(errorMessage ?? "An unexpected error occurred");
    }
  }
};

export default api;
