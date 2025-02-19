import { z } from "zod";

export const RoleEnum = z.enum(["USER", "ADMIN", "SUPER_ADMIN"]);

export const InvoiceStatusEnum = z.enum(["PENDING", "PAID", "OVERDUE"]);
