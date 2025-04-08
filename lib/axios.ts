import {
  ResponseBadRequestDto,
  ResponseForbiddenDto,
  ResponseInternalServerErrorDto,
  ResponseNotFoundDto,
  ResponseUnauthorizedDto,
} from "@/services/model";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { env } from "./env";

// ✅ ÚNICA instância global de axios
export const AXIOS_INSTANCE = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Interface de tipo para cancelável
interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

// ✅ Função genérica para Orval (com cancelamento)
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): CancellablePromise<T> => {
  const source = axios.CancelToken.source();

  const promise = AXIOS_INSTANCE<T>({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then(({ data }) => data)
    .catch(
      (
        error: AxiosError<
          ErrorType<
            | ResponseBadRequestDto
            | ResponseUnauthorizedDto
            | ResponseForbiddenDto
            | ResponseInternalServerErrorDto
            | ResponseNotFoundDto
          >
        >
      ) => {
        throw error.response?.data || error;
      }
    ) as CancellablePromise<T>;

  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// ✅ Tipos auxiliares usados pelo Orval
export type ErrorType<T> = T;
export type BodyType<BodyData> = BodyData;
