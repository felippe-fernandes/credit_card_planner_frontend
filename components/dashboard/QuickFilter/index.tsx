"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickFilterProps {
  period: string;
  cardId?: string;
  onPeriodChange: (period: string) => void;
  onCardChange: (cardId: string | undefined) => void;
  cards: Array<{ id: string; name: string; bank: string }>;
}

const PERIODS = [
  { value: "current_month", label: "Este mês" },
  { value: "last_month", label: "Último mês" },
  { value: "last_3_months", label: "Últimos 3 meses" },
  { value: "last_6_months", label: "Últimos 6 meses" },
  { value: "current_year", label: "Este ano" },
];

export function QuickFilter({
  period,
  cardId,
  onPeriodChange,
  onCardChange,
  cards,
}: QuickFilterProps) {
  const hasFilters = cardId !== undefined;

  const handleReset = () => {
    onPeriodChange("current_month");
    onCardChange(undefined);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Period Filter */}
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Período
            </Label>
            <Select value={period} onValueChange={onPeriodChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Card Filter */}
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-1 text-xs text-muted-foreground">
              <CreditCard className="h-3 w-3" />
              Cartão
            </Label>
            <Select value={cardId || "all"} onValueChange={(v) => onCardChange(v === "all" ? undefined : v)}>
              <SelectTrigger>
                <SelectValue />
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

          {/* Reset Button */}
          {hasFilters && (
            <div className="flex items-end">
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
                <X className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
