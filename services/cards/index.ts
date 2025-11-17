import { BaseCRUDService } from "@/services/BaseCRUDService";
import { Card, CreateCardDto, UpdateCardDto } from "@/types/entities/card";

export interface CardFilters {
  flag?: string;
  bank?: string;
  dueDay?: number;
  payDay?: number;
  name?: string;
}

export class CardService extends BaseCRUDService<
  Card,
  CreateCardDto,
  UpdateCardDto,
  CardFilters
> {
  protected basePath = "/cards";
}
