import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import { PaginationParams, PaginatedResponse } from "@/types/api/pagination";
import { CreateTransactionDto, Transaction, UpdateTransactionDto } from "@/types/entities/transaction";

export class TransactionService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async getAll(params?: {
    card?: string;
    dependent?: string;
    purchaseName?: string;
    purchaseCategory?: string;
    purchaseDate?: string;
    startDate?: string;
    endDate?: string;
    installments?: number;
    installmentDates?: string;
  } & PaginationParams): Promise<PaginatedResponse<Transaction[]>> {
    return await handleAxiosRequest({
      path: "/transactions",
      method: "get",
      params,
    });
  }

  public async getById(id: string): Promise<IResponseBase<Transaction>> {
    return await handleAxiosRequest({
      path: `/transactions/search`,
      method: "get",
      params: { id },
    });
  }

  public async create(data: CreateTransactionDto): Promise<IResponseBase<Transaction>> {
    return await handleAxiosRequest({
      path: "/transactions",
      method: "post",
      data,
    });
  }

  public async update(id: string, data: UpdateTransactionDto): Promise<IResponseBase<Transaction>> {
    return await handleAxiosRequest({
      path: `/transactions/${id}`,
      method: "put",
      data,
    });
  }

  public async delete(id: string): Promise<IResponseBase<{ id: string }>> {
    return await handleAxiosRequest({
      path: `/transactions/${id}`,
      method: "delete",
    });
  }
}
