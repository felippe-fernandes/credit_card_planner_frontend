"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCards } from "@/hooks/useCards";
import { useCategories } from "@/hooks/useCategories";
import { useDependents } from "@/hooks/useDependents";

interface TransactionFiltersProps {
  filters: {
    card?: string;
    dependent?: string;
    purchaseCategory?: string;
    startDate?: string;
    endDate?: string;
    installments?: number;
  };
  onFilterChange: (key: string, value: string | number | undefined) => void;
}

export function TransactionFilters({
  filters,
  onFilterChange,
}: TransactionFiltersProps) {
  const { data: cards = [] } = useCards();
  const { data: categories = [] } = useCategories();
  const { data: dependents = [] } = useDependents();

  return (
    <div className="space-y-4">
      {/* Card Filter */}
      <div className="space-y-2">
        <Label>Cartão</Label>
        <Select
          value={filters.card || "all"}
          onValueChange={(value) =>
            onFilterChange("card", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os cartões" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cartões</SelectItem>
            {cards.map((card) => (
              <SelectItem key={card.id} value={card.id}>
                {card.name} - {card.bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Categoria</Label>
        <Select
          value={filters.purchaseCategory || "all"}
          onValueChange={(value) =>
            onFilterChange("purchaseCategory", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dependent Filter */}
      <div className="space-y-2">
        <Label>Dependente</Label>
        <Select
          value={filters.dependent || "all"}
          onValueChange={(value) =>
            onFilterChange("dependent", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os dependentes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os dependentes</SelectItem>
            {dependents.map((dependent) => (
              <SelectItem key={dependent.id} value={dependent.id}>
                {dependent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label>Período</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="startDate" className="text-xs text-muted-foreground">
              De
            </Label>
            <Input
              id="startDate"
              type="date"
              value={filters.startDate || ""}
              onChange={(e) =>
                onFilterChange("startDate", e.target.value || undefined)
              }
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-xs text-muted-foreground">
              Até
            </Label>
            <Input
              id="endDate"
              type="date"
              value={filters.endDate || ""}
              onChange={(e) =>
                onFilterChange("endDate", e.target.value || undefined)
              }
            />
          </div>
        </div>
      </div>

      {/* Installments Filter */}
      <div className="space-y-2">
        <Label htmlFor="installments">Número de Parcelas</Label>
        <Input
          id="installments"
          type="number"
          min="1"
          max="60"
          placeholder="Ex: 12"
          value={filters.installments || ""}
          onChange={(e) =>
            onFilterChange(
              "installments",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />
      </div>
    </div>
  );
}
