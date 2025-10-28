"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingByCategory } from "@/components/dashboard/SpendingByCategory";
import { SpendingByCard } from "@/components/dashboard/SpendingByCard";
import { MonthlyTrend } from "@/components/dashboard/MonthlyTrend";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { UpcomingInvoices } from "@/components/dashboard/UpcomingInvoices";
import { QuickFilter } from "@/components/dashboard/QuickFilter";
import { useDashboardData, DashboardFilters } from "@/hooks/useDashboard";
import { useCards } from "@/hooks/useCards";
import {
  CreditCard,
  Wallet,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DashboardSkeleton } from "@/components/common/Skeletons";
import { formatCurrencyWithSymbol, formatCurrency } from "@/lib/formatters";

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    period: "current_month",
  });

  const { data: cardsData } = useCards();
  const cards = cardsData?.result || [];

  const {
    kpis,
    spendingByCategory,
    spendingByCard,
    monthlyTrend,
    recentTransactions,
    upcomingInvoices,
    isLoading,
  } = useDashboardData(filters);

  const handlePeriodChange = (period: string) => {
    setFilters((prev) => ({
      ...prev,
      period: period as DashboardFilters["period"],
    }));
  };

  const handleCardChange = (cardId: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      cardId,
    }));
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral das suas finanças e cartões de crédito"
      />

      {/* Quick Filters */}
      <QuickFilter
        period={filters.period}
        cardId={filters.cardId}
        onPeriodChange={handlePeriodChange}
        onCardChange={handleCardChange}
        cards={cards}
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Cartões"
          value={kpis.totalCards}
          description={`Limite total: ${formatCurrencyWithSymbol(kpis.totalLimit)}`}
          icon={CreditCard}
        />

        <StatCard
          title="Limite Disponível"
          value={formatCurrencyWithSymbol(kpis.availableLimit)}
          description={`${(100 - kpis.limitUsagePercentage).toFixed(1)}% disponível`}
          icon={Wallet}
          footer={
            <Progress value={100 - kpis.limitUsagePercentage} className="h-2" />
          }
        />

        <StatCard
          title="Faturas Pendentes"
          value={kpis.pendingInvoicesCount}
          description={`${formatCurrencyWithSymbol(kpis.pendingAmount)} a pagar`}
          icon={FileText}
        />

        <StatCard
          title="Gastos do Período"
          value={formatCurrencyWithSymbol(kpis.totalSpent)}
          description={`${kpis.transactionCount} transações`}
          icon={DollarSign}
        />
      </div>

      {/* Alert for high limit usage */}
      {kpis.limitUsagePercentage > 80 && (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-semibold text-sm">Atenção: Alto uso de limite</p>
            <p className="text-sm text-muted-foreground">
              Você está usando {kpis.limitUsagePercentage.toFixed(1)}% do seu limite total.
              Considere reduzir gastos ou pagar faturas pendentes.
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <SpendingByCategory data={spendingByCategory} />
        <SpendingByCard data={spendingByCard} />
      </div>

      {/* Monthly Trend */}
      <MonthlyTrend data={monthlyTrend} />

      {/* Lists Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentTransactions transactions={recentTransactions} />
        <UpcomingInvoices invoices={upcomingInvoices} />
      </div>

      {/* Top Expenses (if any) */}
      {kpis.transactionCount === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum dado no período selecionado</h3>
          <p className="text-muted-foreground max-w-md">
            Altere o período ou adicione transações para visualizar os gráficos e estatísticas.
          </p>
        </div>
      )}
    </div>
  );
}
