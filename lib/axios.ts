import axios, { type AxiosHeaders, type Method } from "axios";
import { env } from "./env";

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRedirecting = false;

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 && !isRedirecting) {
			isRedirecting = true;

			if (typeof window !== "undefined") {
				const keys = Object.keys(localStorage);
				keys.forEach((key) => {
					if (key.startsWith("sb-") || key === "supabase-session") {
						localStorage.removeItem(key);
					}
				});

				sessionStorage.setItem("auth_expired", "true");

				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

interface IHandleAxiosRequest {
	path: string;
	method: Method;
	headers?: AxiosHeaders;
	data?: object;
	withCredentials?: boolean;
	params?: object;
	errorMessage?: string;
}

/**
 * Map of HTTP status codes to their default error messages
 */
const ERROR_MESSAGES = new Map<number, string>([
	[400, "Invalid data. Please check the fields and try again."],
	[401, "Invalid email or password. Please check your credentials and try again."],
	[404, "User not found."],
	[500, "Server error. Please try again later."],
]);

/**
 * Extracts and formats error message from Axios error response
 * @param error - The Axios error object
 * @param customMessage - Optional custom error message to override defaults
 * @returns Formatted error message string
 */
const getErrorMessage = (
	error: unknown,
	customMessage?: string,
): string => {
	if (!axios.isAxiosError(error)) {
		return customMessage ?? "An unexpected error occurred.";
	}

	const status = error.response?.status;
	const backendMessage = error.response?.data?.message;
	const backendError = error.response?.data?.error;

	if (customMessage) {
		return customMessage;
	}

if (status) {
		const defaultMessage = ERROR_MESSAGES.get(status);

		if (status >= 500) {
			return "Server error. Please try again later.";
		}

		if (defaultMessage) {
			return backendMessage || defaultMessage;
		}
	}

	return (
		backendMessage ||
		backendError ||
		error.message ||
		"An error occurred during the request."
	);
};

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
		const message = getErrorMessage(error, errorMessage);
		throw new Error(message);
	}
};

export default api;
