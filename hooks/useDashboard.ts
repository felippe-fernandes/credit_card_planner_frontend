import { useCards } from "./useCards";
import { useTransactions } from "./useTransactions";
import { useInvoices } from "./useInvoices";
import { useCategories } from "./useCategories";
import { useMemo } from "react";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export interface DashboardFilters {
  period: "current_month" | "last_month" | "last_3_months" | "last_6_months" | "current_year";
  cardId?: string;
}

export function useDashboardData(filters: DashboardFilters) {
  const { data: cardsData, isLoading: cardsLoading } = useCards();
  const { data: categoriesData } = useCategories();

  const cards = cardsData?.result || [];
  const categories = categoriesData?.result || [];

  // Calculate date range based on period
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    let start: Date;
    let end: Date;

    switch (filters.period) {
      case "last_month":
        start = startOfMonth(subMonths(now, 1));
        end = endOfMonth(subMonths(now, 1));
        break;
      case "last_3_months":
        start = startOfMonth(subMonths(now, 3));
        end = endOfMonth(now);
        break;
      case "last_6_months":
        start = startOfMonth(subMonths(now, 6));
        end = endOfMonth(now);
        break;
      case "current_year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case "current_month":
      default:
        start = startOfMonth(now);
        end = endOfMonth(now);
    }

    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }, [filters.period]);

  // Fetch transactions for the period
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions({
    startDate,
    endDate,
    card: filters.cardId,
  });

  const transactions = transactionsData?.result || [];

  // Fetch invoices for current month
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices({
    month: currentMonth,
    year: currentYear,
    cardId: filters.cardId,
  });

  const currentInvoices = invoicesData?.result || [];

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalCards = filters.cardId
      ? 1
      : cards.length;

    const totalLimit = filters.cardId
      ? cards.find((c) => c.id === filters.cardId)?.limit || 0
      : cards.reduce((sum, card) => sum + card.limit, 0);

    const availableLimit = filters.cardId
      ? cards.find((c) => c.id === filters.cardId)?.availableLimit || 0
      : cards.reduce((sum, card) => sum + card.availableLimit, 0);

    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

    const pendingInvoices = currentInvoices.filter((inv) => inv.status === "PENDING");
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0);

    const limitUsagePercentage = totalLimit > 0 ? ((totalLimit - availableLimit) / totalLimit) * 100 : 0;

    return {
      totalCards,
      totalLimit,
      availableLimit,
      totalSpent,
      pendingInvoicesCount: pendingInvoices.length,
      pendingAmount,
      limitUsagePercentage,
      transactionCount: transactions.length,
    };
  }, [cards, transactions, currentInvoices, filters.cardId]);

  // Spending by category
  const spendingByCategory = useMemo(() => {
    const categoryMap = new Map<string, { name: string; value: number; icon: string; color: string }>();

    transactions.forEach((transaction) => {
      const existing = categoryMap.get(transaction.purchaseCategory) || {
        name: transaction.purchaseCategory,
        value: 0,
        icon: categories.find((c) => c.name === transaction.purchaseCategory)?.icon || "📦",
        color: categories.find((c) => c.name === transaction.purchaseCategory)?.color || "#000000",
      };

      categoryMap.set(transaction.purchaseCategory, {
        ...existing,
        value: existing.value + transaction.amount,
      });
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  // Spending by card
  const spendingByCard = useMemo(() => {
    const cardMap = new Map<string, { name: string; value: number; bank: string }>();

    transactions.forEach((transaction) => {
      const card = cards.find((c) => c.id === transaction.cardId);
      if (!card) return;

      const existing = cardMap.get(transaction.cardId) || {
        name: card.name,
        value: 0,
        bank: card.bank,
      };

      cardMap.set(transaction.cardId, {
        ...existing,
        value: existing.value + transaction.amount,
      });
    });

    return Array.from(cardMap.values()).sort((a, b) => b.value - a.value);
  }, [transactions, cards]);

  // Monthly trend (last 6 months)
  const monthlyTrend = useMemo(() => {
    const months: { month: string; value: number }[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(now, i);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);

      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.purchaseDate);
        return tDate >= monthStart && tDate <= monthEnd;
      });

      const total = monthTransactions.reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: format(date, "MMM/yy"),
        value: total,
      });
    }

    return months;
  }, [transactions]);

  // Recent transactions (last 10)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
      .slice(0, 10);
  }, [transactions]);

  // Top expenses
  const topExpenses = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [transactions]);

  // Upcoming invoices
  const upcomingInvoices = useMemo(() => {
    return currentInvoices
      .filter((inv) => inv.status === "PENDING")
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  }, [currentInvoices]);

  return {
    kpis,
    spendingByCategory,
    spendingByCard,
    monthlyTrend,
    recentTransactions,
    topExpenses,
    upcomingInvoices,
    isLoading: cardsLoading || transactionsLoading || invoicesLoading,
  };
}
