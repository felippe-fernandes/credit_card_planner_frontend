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

interface CardFiltersProps {
  filters: {
    flag?: string;
    bank?: string;
    dueDay?: number;
    payDay?: number;
  };
  onFilterChange: (key: string, value: string | number | undefined) => void;
}

const CARD_FLAGS = [
  "Visa",
  "Mastercard",
  "Elo",
  "American Express",
  "Hipercard",
  "Diners Club",
];

const COMMON_BANKS = [
  "Nubank",
  "Banco do Brasil",
  "Bradesco",
  "Itaú",
  "Caixa",
  "Santander",
  "Inter",
  "C6 Bank",
  "Neon",
  "Banco Original",
  "BTG Pactual",
  "PicPay",
];

export function CardFilters({ filters, onFilterChange }: CardFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Bank Filter */}
      <div className="space-y-2">
        <Label>Banco</Label>
        <Select
          value={filters.bank || "all"}
          onValueChange={(value) =>
            onFilterChange("bank", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os bancos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os bancos</SelectItem>
            {COMMON_BANKS.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Flag Filter */}
      <div className="space-y-2">
        <Label>Bandeira</Label>
        <Select
          value={filters.flag || "all"}
          onValueChange={(value) =>
            onFilterChange("flag", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as bandeiras" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as bandeiras</SelectItem>
            {CARD_FLAGS.map((flag) => (
              <SelectItem key={flag} value={flag}>
                {flag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Due Day Filter */}
      <div className="space-y-2">
        <Label htmlFor="dueDay">Dia de Vencimento</Label>
        <Input
          id="dueDay"
          type="number"
          min="1"
          max="31"
          placeholder="Ex: 10"
          value={filters.dueDay || ""}
          onChange={(e) =>
            onFilterChange(
              "dueDay",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />
      </div>

      {/* Pay Day Filter */}
      <div className="space-y-2">
        <Label htmlFor="payDay">Dia de Fechamento</Label>
        <Input
          id="payDay"
          type="number"
          min="1"
          max="31"
          placeholder="Ex: 5"
          value={filters.payDay || ""}
          onChange={(e) =>
            onFilterChange(
              "payDay",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />
      </div>
    </div>
  );
}
