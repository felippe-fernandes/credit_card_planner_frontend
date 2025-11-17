import { handleAxiosRequest } from "@/lib/axios";
import { supabase } from "@/lib/supabaseClient";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth";

export class AuthService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async SignUp(request: SignupRequest): Promise<SignupResponse> {
    return await handleAxiosRequest({
      path: "/auth/signup",
      method: "post",
      data: request,
    });
  }

  public async Login(request: LoginRequest): Promise<LoginResponse> {
    const response = await handleAxiosRequest<LoginResponse>({
      path: "/auth/login",
      method: "post",
      data: request,
    });

    if (response?.result?.access_token && response?.result?.refresh_token) {
      await supabase.auth.setSession({
        access_token: response.result.access_token,
        refresh_token: response.result.refresh_token,
      });
    }

    return response;
  }
}
