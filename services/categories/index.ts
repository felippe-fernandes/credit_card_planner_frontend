import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import { PaginationParams, PaginatedResponse } from "@/types/api/pagination";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "@/types/entities/category";

export class CategoryService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getAll(params?: { name?: string } & PaginationParams): Promise<PaginatedResponse<Category[]>> {
    return await handleAxiosRequest({
      path: "/categories",
      method: "get",
      params,
    });
  }

  public async getByName(name: string): Promise<IResponseBase<Category>> {
    return await handleAxiosRequest({
      path: `/categories/search`,
      method: "get",
      params: { name },
    });
  }

  public async create(data: CreateCategoryDto): Promise<IResponseBase<Category>> {
    return await handleAxiosRequest({
      path: "/categories",
      method: "post",
      data,
    });
  }

  public async addDefaults(): Promise<IResponseBase<void>> {
    return await handleAxiosRequest({
      path: "/categories/add-defaults",
      method: "post",
    });
  }

  public async update(name: string, data: UpdateCategoryDto): Promise<IResponseBase<Category>> {
    return await handleAxiosRequest({
      path: `/categories/${name}`,
      method: "patch",
      data,
    });
  }

  public async delete(name: string): Promise<IResponseBase<{ name: string }>> {
    return await handleAxiosRequest({
      path: `/categories/${name}`,
      method: "delete",
    });
  }
}
