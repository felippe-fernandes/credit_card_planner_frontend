import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  Method,
} from "axios";
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
  }).then(({ data }) => data) as CancellablePromise<T>;

  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// ✅ Tipos auxiliares usados pelo Orval
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;

// ✅ Função genérica para chamadas diretas (handleAxiosRequest)
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
    const response = await AXIOS_INSTANCE.request<T>({
      url: path,
      method,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        errorMessage ??
          (error.response?.data?.message as string) ??
          error.message ??
          "Erro ao fazer requisição"
      );
    } else {
      throw new Error(errorMessage ?? "Erro inesperado");
    }
  }
};
