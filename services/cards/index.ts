import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import { PaginationParams, PaginatedResponse } from "@/types/api/pagination";
import { Card, CreateCardDto, UpdateCardDto } from "@/types/entities/card";

export class CardService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getAll(params?: {
    flag?: string;
    bank?: string;
    dueDay?: number;
    payDay?: number;
    name?: string;
  } & PaginationParams): Promise<PaginatedResponse<Card[]>> {
    return await handleAxiosRequest({
      path: "/cards",
      method: "get",
      params,
    });
  }

  public async getById(id: string): Promise<IResponseBase<Card>> {
    return await handleAxiosRequest({
      path: `/cards/search`,
      method: "get",
      params: { id },
    });
  }

  public async create(data: CreateCardDto): Promise<IResponseBase<Card>> {
    return await handleAxiosRequest({
      path: "/cards",
      method: "post",
      data,
    });
  }

  public async update(id: string, data: UpdateCardDto): Promise<IResponseBase<Card>> {
    return await handleAxiosRequest({
      path: `/cards/${id}`,
      method: "patch",
      data,
    });
  }

  public async delete(id: string): Promise<IResponseBase<{ id: string }>> {
    return await handleAxiosRequest({
      path: `/cards/${id}`,
      method: "delete",
    });
  }
}
