import api, { handleAxiosRequest } from "@/lib/axios";
import type { LoginRequest, SignupRequest } from "@/schemas/api/auth.schema";
import { useAuthStore } from "@/store/auth";

export class AuthService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async SignUp(request: SignupRequest): Promise<any> {
    return handleAxiosRequest({
      path: "/auth/signup",
      method: "POST",
      data: request,
    });
  }

  public async Login(request: LoginRequest): Promise<any> {
    return handleAxiosRequest({
      path: "/auth/signin",
      method: "POST",
      data: request,
    });
  }

  public async Check(): Promise<any> {
    try {
      const token = useAuthStore.getState().token;
      const response = await api.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Error checking auth status:", error);
      throw error;
    }
  }
}
