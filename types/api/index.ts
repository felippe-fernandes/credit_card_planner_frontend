import type { HttpStatusCode } from "axios";

export interface IResponseBase<T> {
	message: string;
	statusCode: HttpStatusCode;
	result: T;
	count?: number;
	success: boolean;
}
