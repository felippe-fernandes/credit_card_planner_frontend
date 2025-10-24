"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useServiceClient } from "@/hooks/useServiceClient";
import { CardService } from "@/services/cards";
import { InvoiceService } from "@/services/invoices";
import { TransactionService } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, DollarSign, FileText, TrendingUp } from "lucide-react";

function DashboardPage() {
  const cardService = useServiceClient({ service: CardService });
  const invoiceService = useServiceClient({ service: InvoiceService });
  const transactionService = useServiceClient({ service: TransactionService });

  // Fetch cards
  const { data: cardsData, isLoading: cardsLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: () => cardService.getAll(),
  });

  // Fetch current month invoices
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: invoicesData, isLoading: invoicesLoading } = useQuery({
    queryKey: ["invoices", currentMonth, currentYear],
    queryFn: () =>
      invoiceService.getAll({
        month: currentMonth,
        year: currentYear,
      }),
  });

  // Fetch recent transactions
  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionService.getAll(),
  });

  const cards = cardsData?.data || [];
  const invoices = invoicesData?.data || [];
  const transactions = transactionsData?.data || [];

  // Calculate KPIs
  const totalCards = cards.length;
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const availableLimit = cards.reduce(
    (sum, card) => sum + card.availableLimit,
    0,
  );
  const usedLimit = totalLimit - availableLimit;
  const limitUsagePercentage =
    totalLimit > 0 ? (usedLimit / totalLimit) * 100 : 0;

  const totalInvoiceAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0,
  );
  const totalPaid = invoices.reduce(
    (sum, invoice) => sum + invoice.paidAmount,
    0,
  );
  const pendingAmount = totalInvoiceAmount - totalPaid;

  const pendingInvoices = invoices.filter(
    (inv) => inv.status === "PENDING",
  ).length;
  const overdueInvoices = invoices.filter(
    (inv) => inv.status === "OVERDUE",
  ).length;

  const currentMonthExpenses = transactions
    .filter((t) => {
      const date = new Date(t.purchaseDate);
      return (
        date.getMonth() === currentMonth - 1 &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const isLoading = cardsLoading || invoicesLoading || transactionsLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral das suas finanças e cartões de crédito
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Cartões
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totalCards}</div>
                <p className="text-xs text-muted-foreground">
                  Limite total: R${" "}
                  {totalLimit.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Limit Usage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Limite Utilizado
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {limitUsagePercentage.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  R${" "}
                  {usedLimit.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  de R${" "}
                  {totalLimit.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pending Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturas Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {pendingInvoices + overdueInvoices}
                </div>
                <p className="text-xs text-muted-foreground">
                  {overdueInvoices > 0 && (
                    <span className="text-destructive">
                      {overdueInvoices} vencida(s)
                    </span>
                  )}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Current Month Expenses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  R${" "}
                  {currentMonthExpenses.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    transactions.filter((t) => {
                      const date = new Date(t.purchaseDate);
                      return (
                        date.getMonth() === currentMonth - 1 &&
                        date.getFullYear() === currentYear
                      );
                    }).length
                  }{" "}
                  transações
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Seus gastos por categoria este mês
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <p className="text-sm text-muted-foreground">
              Gráficos em desenvolvimento...
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Próximas Faturas</CardTitle>
            <CardDescription>
              Faturas a vencer nos próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lista em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
