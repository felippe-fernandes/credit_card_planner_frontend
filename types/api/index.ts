import type { HttpStatusCode } from "axios";

export interface IResponseBase<T> {
	message: string;
	statusCode: HttpStatusCode;
	data: T;
	count?: number;
	success: boolean;
}
