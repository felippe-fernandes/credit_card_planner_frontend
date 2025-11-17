import { handleAxiosRequest } from "@/lib/axios";
import { BaseCRUDService } from "@/services/BaseCRUDService";
import { IResponseBase } from "@/types/api";
import { CreateTransactionDto, Transaction, UpdateTransactionDto } from "@/types/entities/transaction";

export interface TransactionFilters {
  card?: string;
  dependent?: string;
  purchaseName?: string;
  purchaseCategory?: string;
  purchaseDate?: string;
  startDate?: string;
  endDate?: string;
  installments?: number;
  installmentDates?: string;
}

export class TransactionService extends BaseCRUDService<
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionFilters
> {
  protected basePath = "/transactions";

  public async update(id: string, data: UpdateTransactionDto): Promise<IResponseBase<Transaction>> {
    return await handleAxiosRequest({
      path: `${this.basePath}/${id}`,
      method: "put",
      data,
    });
  }
}
