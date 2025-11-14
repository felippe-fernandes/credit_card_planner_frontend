import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  editedAt: string | null;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
}

export class UserService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getMe(): Promise<IResponseBase<User>> {
    return await handleAxiosRequest({
      path: "/users/me",
      method: "get",
    });
  }

  public async updateMe(data: UpdateUserDto): Promise<IResponseBase<User>> {
    return await handleAxiosRequest({
      path: "/users/me",
      method: "patch",
      data,
    });
  }

  public async deleteMe(): Promise<IResponseBase<void>> {
    return await handleAxiosRequest({
      path: "/users/me",
      method: "delete",
    });
  }
}
