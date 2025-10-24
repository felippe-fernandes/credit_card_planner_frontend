import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import { Dependent, CreateDependentDto, UpdateDependentDto } from "@/types/entities/dependent";

export class DependentService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getAll(params?: { name?: string; id?: string }): Promise<IResponseBase<Dependent[]>> {
    return await handleAxiosRequest({
      path: "/dependents",
      method: "get",
      params,
    });
  }

  public async getById(id: string): Promise<IResponseBase<Dependent>> {
    return await handleAxiosRequest({
      path: `/dependents/search`,
      method: "get",
      params: { id },
    });
  }

  public async create(data: CreateDependentDto): Promise<IResponseBase<Dependent>> {
    return await handleAxiosRequest({
      path: "/dependents",
      method: "post",
      data,
    });
  }

  public async update(id: string, data: UpdateDependentDto): Promise<IResponseBase<Dependent>> {
    return await handleAxiosRequest({
      path: `/dependents/${id}`,
      method: "patch",
      data,
    });
  }

  public async delete(id: string): Promise<IResponseBase<{ id: string }>> {
    return await handleAxiosRequest({
      path: `/dependents/${id}`,
      method: "delete",
    });
  }
}
