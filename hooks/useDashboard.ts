import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import { useCards } from "./useCards";
import { useCategories } from "./useCategories";
import { useInvoices } from "./useInvoices";
import { useTransactions } from "./useTransactions";

export interface DashboardFilters {
  period: "current_month" | "last_month" | "last_3_months" | "last_6_months" | "current_year";
  cardId?: string;
}

export function useDashboardData(filters: DashboardFilters) {
  const { data: cardsData, isLoading: cardsLoading } = useCards();
  const { data: categoriesData } = useCategories();

  const cards = useMemo(() => cardsData?.result || [], [cardsData]);
  const categories = useMemo(() => categoriesData?.result || [], [categoriesData]);

  // Calculate date range based on period
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();

    switch (filters.period) {
      case "last_month":
        return {
          startDate: startOfMonth(subMonths(now, 1)).toISOString(),
          endDate: endOfMonth(subMonths(now, 1)).toISOString(),
        };
      case "last_3_months":
        return {
          startDate: startOfMonth(subMonths(now, 3)).toISOString(),
          endDate: endOfMonth(now).toISOString(),
        };
      case "last_6_months":
        return {
          startDate: startOfMonth(subMonths(now, 6)).toISOString(),
          endDate: endOfMonth(now).toISOString(),
        };
      case "current_year":
        return {
          startDate: new Date(now.getFullYear(), 0, 1).toISOString(),
          endDate: new Date(now.getFullYear(), 11, 31).toISOString(),
        };
      case "current_month":
      default:
        return {
          startDate: startOfMonth(now).toISOString(),
          endDate: endOfMonth(now).toISOString(),
        };
    }
  }, [filters.period]);

  // Fetch transactions for the period
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions({
    startDate,
    endDate,
    card: filters.cardId,
  });

  const transactions = useMemo(() => transactionsData?.result || [], [transactionsData]);

  // Fetch invoices for current month
  const currentMonth = useMemo(() => new Date().getMonth() + 1, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices({
    month: currentMonth,
    year: currentYear,
    cardId: filters.cardId,
  });

  const currentInvoices = useMemo(() => invoicesData?.result || [], [invoicesData]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalCards = filters.cardId ? 1 : cards.length;
    const totalLimit = filters.cardId
      ? parseFloat(cards.find((c) => c.id === filters.cardId)?.limit ?? "0")
      : cards.reduce((sum, card) => sum + parseFloat(card.limit), 0);
    const availableLimit = filters.cardId
      ? parseFloat(cards.find((c) => c.id === filters.cardId)?.availableLimit ?? "0")
      : cards.reduce((sum, card) => sum + parseFloat(card.availableLimit), 0);
    const totalSpent = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const pendingInvoices = currentInvoices.filter((inv) => inv.status === "PENDING");
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + (parseFloat(inv.totalAmount) - parseFloat(inv.paidAmount)), 0);
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
        value: existing.value + parseFloat(transaction.amount),
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
        value: existing.value + parseFloat(transaction.amount),
      });
    });

    return Array.from(cardMap.values()).sort((a, b) => b.value - a.value);
  }, [transactions, cards]);

  // Monthly trend (last 6 months)
  const monthlyTrend = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(now, 5 - i);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.purchaseDate);
        return tDate >= monthStart && tDate <= monthEnd;
      });
      return {
        month: format(date, "MMM/yy"),
        value: monthTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0),
      };
    });
  }, [transactions]);

  // Recent transactions (last 10)
  const recentTransactions = useMemo(
    () => [...transactions]
      .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
      .slice(0, 10),
    [transactions]
  );

  // Top expenses
  const topExpenses = useMemo(
    () => [...transactions]
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      .slice(0, 5),
    [transactions]
  );

  // Upcoming invoices
  const upcomingInvoices = useMemo(
    () => currentInvoices
      .filter((inv) => inv.status === "PENDING")
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5),
    [currentInvoices]
  );

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
