"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/types/entities/invoice";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UpcomingInvoicesProps {
  invoices: Invoice[];
}

export function UpcomingInvoices({ invoices }: UpcomingInvoicesProps) {
  const router = useRouter();

  if (invoices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Próximas Faturas</CardTitle>
          <CardDescription>Faturas pendentes e vencimentos próximos</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Nenhuma fatura pendente</p>
        </CardContent>
      </Card>
    );
  }

  const getDaysUntilDue = (dueDate: string) => {
    const days = differenceInDays(new Date(dueDate), new Date());
    return days;
  };

  const getDueBadge = (daysUntil: number) => {
    if (daysUntil < 0) {
      return <Badge variant="destructive">Atrasada</Badge>;
    } else if (daysUntil === 0) {
      return <Badge className="bg-orange-500">Vence hoje</Badge>;
    } else if (daysUntil <= 3) {
      return <Badge className="bg-yellow-500">Vence em {daysUntil}d</Badge>;
    } else {
      return <Badge variant="outline">{daysUntil} dias</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Próximas Faturas</CardTitle>
            <CardDescription>{invoices.length} faturas pendentes</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/invoices")}
            className="gap-1"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => {
            const daysUntil = getDaysUntilDue(invoice.dueDate);
            const remainingAmount = invoice.totalAmount - invoice.paidAmount;

            return (
              <div
                key={invoice.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {format(new Date(invoice.year, invoice.month - 1), "MMMM/yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                    {getDueBadge(daysUntil)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Vencimento: {format(new Date(invoice.dueDate), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold block">
                    R$ {remainingAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  {invoice.paidAmount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      de R$ {invoice.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
