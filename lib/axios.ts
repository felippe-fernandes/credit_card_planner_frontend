import axios, { type AxiosHeaders, type Method } from "axios";
import { env } from "./env";

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Flag to prevent multiple redirects
let isRedirecting = false;

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Check if error is 401 Unauthorized
		if (error.response?.status === 401 && !isRedirecting) {
			isRedirecting = true;

			// Clear Supabase session from localStorage
			if (typeof window !== "undefined") {
				const keys = Object.keys(localStorage);
				keys.forEach((key) => {
					if (key.startsWith("sb-") || key === "supabase-session") {
						localStorage.removeItem(key);
					}
				});

				// Store a message to show after redirect
				sessionStorage.setItem("auth_expired", "true");

				// Redirect to login page
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
				"An error occurred during the request",
			);
		} else {
			throw new Error(errorMessage ?? "An unexpected error occurred");
		}
	}
};

export default api;
