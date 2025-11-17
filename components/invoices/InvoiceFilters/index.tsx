"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCards } from "@/hooks/useCards";
import { MONTHS, INVOICE_STATUSES } from "@/constants/invoices";

interface InvoiceFiltersProps {
  filters: {
    cardId?: string;
    month?: number;
    year?: number;
    status?: string;
  };
  onFilterChange: (key: string, value: string | number | undefined) => void;
}

export function InvoiceFilters({ filters, onFilterChange }: InvoiceFiltersProps) {
  const { data } = useCards();
  const cards = data?.result || [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="space-y-4">
      {/* Card Filter */}
      <div className="space-y-2">
        <Label>Cartão</Label>
        <Select
          value={filters.cardId || "all"}
          onValueChange={(value) =>
            onFilterChange("cardId", value === "all" ? undefined : value)
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

      {/* Month Filter */}
      <div className="space-y-2">
        <Label>Mês</Label>
        <Select
          value={filters.month?.toString() || "all"}
          onValueChange={(value) =>
            onFilterChange("month", value === "all" ? undefined : Number(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os meses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os meses</SelectItem>
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Filter */}
      <div className="space-y-2">
        <Label>Ano</Label>
        <Select
          value={filters.year?.toString() || "all"}
          onValueChange={(value) =>
            onFilterChange("year", value === "all" ? undefined : Number(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os anos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os anos</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            onFilterChange("status", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {INVOICE_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
