import { handleAxiosRequest } from "@/lib/axios";
import { IResponseBase } from "@/types/api";
import { Invoice, UpdateInvoiceDto, MarkInvoiceAsPaidDto, InvoiceStatus } from "@/types/entities/invoice";

export class InvoiceService {
  useMock: boolean;

  constructor(useMock?: boolean) {
    this.useMock = useMock ?? false;
  }

  public async updateAll(): Promise<IResponseBase<void>> {
    return await handleAxiosRequest({
      path: "/invoice/update",
      method: "post",
    });
  }

  public async getAll(params?: {
    cardId?: string;
    month?: number;
    year?: number;
    status?: InvoiceStatus;
  }): Promise<IResponseBase<Invoice[]>> {
    return await handleAxiosRequest({
      path: "/invoice",
      method: "get",
      params,
    });
  }

  public async getById(id: string): Promise<IResponseBase<Invoice>> {
    return await handleAxiosRequest({
      path: `/invoice/search`,
      method: "get",
      params: { id },
    });
  }

  public async getForecast(params: {
    months: number;
    cardId?: string;
  }): Promise<IResponseBase<Invoice[]>> {
    return await handleAxiosRequest({
      path: "/invoice/forecast",
      method: "get",
      params,
    });
  }

  public async update(id: string, data: UpdateInvoiceDto): Promise<IResponseBase<Invoice>> {
    return await handleAxiosRequest({
      path: `/invoice/${id}`,
      method: "put",
      data,
    });
  }

  public async markAsPaid(id: string, data: MarkInvoiceAsPaidDto): Promise<IResponseBase<Invoice>> {
    return await handleAxiosRequest({
      path: `/invoice/${id}/mark-paid`,
      method: "patch",
      data,
    });
  }
}
