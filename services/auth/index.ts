import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import {
  CheckAuthResponse,
  LoginRequest,
  LoginResponse,
  SignoutResponse,
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
      method: "POST",
      data: request,
    });
  }

  public async Login(
    request: LoginRequest
  ): Promise<IResponseBase<LoginResponse>> {
    return await handleAxiosRequest({
      path: "/auth/signin",
      method: "POST",
      data: request,
    });
  }

  public async Check(): Promise<CheckAuthResponse> {
    return await handleAxiosRequest({
      path: "/auth/check-auth",
      method: "GET",
      withCredentials: true,
      errorMessage: "Error checking auth status",
    });
  }

  public async Signout(): Promise<SignoutResponse> {
    return await handleAxiosRequest({
      path: "/auth/signout",
      method: "POST",
      withCredentials: true,
    });
  }
}
