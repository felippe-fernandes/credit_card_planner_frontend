import type { z } from "zod";
import type {
	CardSchema,
	CategorySchema,
	DependentSchema,
	InvoiceSchema,
	TransactionSchema,
	UserSchema,
} from "@/schemas/entities";

export enum Role {
	USER,
	ADMIN,
	SUPER_ADMIN,
}

export enum InvoiceStatus {
	PENDING,
	PAID,
	OVERDUE,
}

export type Card = z.infer<typeof CardSchema>;

export type Category = z.infer<typeof CategorySchema>;

export type Dependent = z.infer<typeof DependentSchema>;

export type Invoice = z.infer<typeof InvoiceSchema>;

export type Transaction = z.infer<typeof TransactionSchema>;

export type User = z.infer<typeof UserSchema>;
