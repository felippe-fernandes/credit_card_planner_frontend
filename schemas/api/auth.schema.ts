import { object, string, z } from "zod";

export const loginRequest = object({
  email: string().email({ message: "Invalid email address" }),
  password: string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export type LoginRequest = z.infer<typeof loginRequest>;

export const signupRequest = object({
  email: string().email({ message: "Invalid email address" }),
  password: string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
  name: string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .nonempty({ message: "Name cannot be empty" }),
  phone: string().nonempty({ message: "Phone number cannot be empty" }),
});

export type SignupRequest = z.infer<typeof signupRequest>;
