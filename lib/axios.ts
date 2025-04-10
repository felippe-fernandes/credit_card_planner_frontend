import {
  ResponseBadRequestDto,
  ResponseForbiddenDto,
  ResponseInternalServerErrorDto,
  ResponseNotFoundDto,
  ResponseUnauthorizedDto,
} from "@/services/model";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { env } from "./env";

export const AXIOS_INSTANCE = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

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

export type ErrorType<T> = T;
export type BodyType<BodyData> = BodyData;
