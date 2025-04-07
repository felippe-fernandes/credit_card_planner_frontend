import { loginRequest, signupRequest } from "@/schemas/api/auth.schema";
import { Session } from "@supabase/supabase-js";
import { z } from "zod";
import { IResponseBase } from "../api";
import { User } from "../entities";

export type LoginRequest = z.infer<typeof loginRequest>;

export type LoginResponse = IResponseBase<Session>;

export type SignupRequest = z.infer<typeof signupRequest>;

export type SignupResponse = IResponseBase<User>;

export type SignoutResponse = IResponseBase<{ userId: User["id"] }>;

export type CheckAuthResponse = IResponseBase<{
  isAuthenticated: boolean;
  token: Session["access_token"];
}>;
