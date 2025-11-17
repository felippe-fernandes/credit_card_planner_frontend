import { handleAxiosRequest } from "@/lib/axios";
import { BaseCRUDService } from "@/services/BaseCRUDService";
import { IResponseBase } from "@/types/api";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "@/types/entities/category";

export interface CategoryFilters {
  name?: string;
}

export class CategoryService extends BaseCRUDService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilters
> {
  protected basePath = "/categories";

  public async getByName(name: string): Promise<IResponseBase<Category>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/search`,
      method: "get",
      params: { name },
    });
  }

  public async addDefaults(): Promise<IResponseBase<void>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/add-defaults`,
      method: "post",
    });
  }

  public async update(name: string, data: UpdateCategoryDto): Promise<IResponseBase<Category>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/${name}`,
      method: "patch",
      data,
    });
  }

  public async delete(name: string): Promise<IResponseBase<{ name: string }>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/${name}`,
      method: "delete",
    });
  }
}
