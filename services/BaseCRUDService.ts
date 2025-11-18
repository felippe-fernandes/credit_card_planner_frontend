import { handleAxiosRequest } from "@/lib/axios";
import type { IResponseBase } from "@/types/api";
import type { PaginationParams, PaginatedResponse } from "@/types/api/pagination";

export abstract class BaseCRUDService<
  TEntity extends object,
  TCreateDto extends object,
  TUpdateDto extends object,
  TFilters = Record<string, unknown>
> {
  protected abstract basePath: string;
  public useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getAll(
    params?: TFilters & PaginationParams
  ): Promise<PaginatedResponse<TEntity[]>> {
    return await handleAxiosRequest({
      path: this.basePath,
      method: "get",
      params,
    });
  }

  public async getById(id: string): Promise<IResponseBase<TEntity>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/search`,
      method: "get",
      params: { id },
    });
  }

  public async create(data: TCreateDto): Promise<IResponseBase<TEntity>> {
    return await handleAxiosRequest({
      path: this.basePath,
      method: "post",
      data,
    });
  }

  public async update(
    id: string,
    data: TUpdateDto
  ): Promise<IResponseBase<TEntity>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/${id}`,
      method: "patch",
      data,
    });
  }

  public async delete(id: string): Promise<IResponseBase<{ id: string }>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/${id}`,
      method: "delete",
    });
  }
}
