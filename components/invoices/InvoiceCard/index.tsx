"use client";

import { Invoice, InvoiceStatus } from "@/types/entities/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, DollarSign, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";

interface InvoiceCardProps {
  invoice: Invoice;
  onMarkAsPaid?: (invoice: Invoice) => void;
  onViewDetails?: (invoice: Invoice) => void;
}

const STATUS_CONFIG = {
  PENDING: {
    label: "Pendente",
    variant: "default" as const,
    color: "text-yellow-600 dark:text-yellow-500",
  },
  PAID: {
    label: "Paga",
    variant: "default" as const,
    color: "text-green-600 dark:text-green-500",
  },
  OVERDUE: {
    label: "Atrasada",
    variant: "destructive" as const,
    color: "text-red-600 dark:text-red-500",
  },
};

export function InvoiceCard({
  invoice,
  onMarkAsPaid,
  onViewDetails,
}: InvoiceCardProps) {
  const statusConfig = STATUS_CONFIG[invoice.status as InvoiceStatus];
  const totalAmount = Number(invoice.totalAmount);
  const paidAmount = Number(invoice.paidAmount);
  const paymentProgress = (paidAmount / totalAmount) * 100;
  const isPaid = invoice.status === "PAID";
  const remainingAmount = totalAmount - paidAmount;

  return (
    <Card className={isPaid ? "border-green-200 dark:border-green-900" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>
                {format(new Date(invoice.year, invoice.month - 1), "MMMM yyyy", {
                  locale: ptBR,
                })}
              </span>
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              Cartão {invoice.cardId}
            </p>
          </div>
          <Badge variant={statusConfig.variant} className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Valor Total</p>
            <p className="text-lg font-bold">
              R${" "}
              {totalAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Valor Pago</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-500">
              R${" "}
              {paidAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Payment Progress */}
        {!isPaid && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{Math.round(paymentProgress)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-2" />
            {remainingAmount > 0 && (
              <p className="text-xs text-muted-foreground">
                Faltam R${" "}
                {remainingAmount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            )}
          </div>
        )}

        {/* Due Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Vencimento:{" "}
            {format(new Date(invoice.dueDate), "dd/MM/yyyy", { locale: ptBR })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {!isPaid && onMarkAsPaid && (
            <Button
              size="sm"
              onClick={() => onMarkAsPaid(invoice)}
              className="flex-1"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Marcar como Paga
            </Button>
          )}
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(invoice)}
              className={!isPaid && onMarkAsPaid ? "" : "flex-1"}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
