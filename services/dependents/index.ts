import { BaseCRUDService } from "@/services/BaseCRUDService";
import { Dependent, CreateDependentDto, UpdateDependentDto } from "@/types/entities/dependent";

export interface DependentFilters {
  name?: string;
  id?: string;
}

export class DependentService extends BaseCRUDService<
  Dependent,
  CreateDependentDto,
  UpdateDependentDto,
  DependentFilters
> {
  protected basePath = "/dependents";
}
