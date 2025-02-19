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
  params?: object;
}

export const handleAxiosRequest = async <T>({
  path,
  method,
  headers,
  data,
  params,
}: IHandleAxiosRequest): Promise<T> => {
  try {
    const response = await api.request<T>({
      url: path,
      method,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw new Error("An error occurred during the request");
    } else {
      // Handle non-Axios error
      throw new Error("An unexpected error occurred");
    }
  }
};

export default api;
