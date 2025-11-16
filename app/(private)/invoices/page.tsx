"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { InvoiceCard } from "@/components/invoices/InvoiceCard";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { PaymentDialog } from "@/components/invoices/PaymentDialog";
import { useInvoices, useMarkInvoiceAsPaid } from "@/hooks/useInvoices";
import { Invoice, InvoiceStatus } from "@/types/entities/invoice";
import { FileText } from "lucide-react";
import { InvoicesSkeleton } from "@/components/common/Skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InvoicesPage() {

  const [filters, setFilters] = useState<{
    cardId?: string;
    month?: number;
    year?: number;
    status?: InvoiceStatus;
  }>({});

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Fetch invoices
  const { data, isLoading, refetch, isRefetching } = useInvoices(filters);

  const invoices = data?.result || [];

  // Mutations
  const markAsPaidMutation = useMarkInvoiceAsPaid();

  // Filter handlers
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  // Payment handler
  const handleMarkAsPaid = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentDialogOpen(true);
  };

  const handleConfirmPayment = (paidAmount?: number) => {
    if (!selectedInvoice || !paidAmount) return;

    markAsPaidMutation.mutate(
      {
        id: selectedInvoice.id,
        data: { paidAmount: paidAmount.toString() },
      },
      {
        onSuccess: () => {
          setPaymentDialogOpen(false);
          setSelectedInvoice(null);
        },
      }
    );
  };

  // Filter invoices by status
  const pendingInvoices = invoices.filter((inv) => inv.status === "PENDING");
  const paidInvoices = invoices.filter((inv) => inv.status === "PAID");
  const overdueInvoices = invoices.filter((inv) => inv.status === "OVERDUE");

  if (isLoading) {
    return <InvoicesSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Faturas"
        description="Acompanhe e gerencie as faturas dos seus cartões"
        onRefresh={() => refetch()}
        isRefreshing={isRefetching}
      />

      {/* Filters */}
      <div className="flex justify-end">
        <FilterDrawer
          title="Filtrar Faturas"
          description="Refine sua busca por cartão, período e status"
          hasActiveFilters={hasActiveFilters}
          onApply={() => {}}
          onReset={handleResetFilters}
        >
          <InvoiceFilters filters={filters} onFilterChange={handleFilterChange} />
        </FilterDrawer>
      </div>

      {/* Summary */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border bg-card space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      ) : (
        invoices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Total de Faturas</p>
              <p className="text-2xl font-bold">{invoices.length}</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold">
                R$ {formatCurrency(
                  invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0)
                )}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Valor Pago</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {formatCurrency(
                  invoices.reduce((sum, inv) => sum + Number(inv.paidAmount), 0)
                )}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingInvoices.length}</p>
            </div>
          </div>
        )
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas ({invoices.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendentes ({pendingInvoices.length})</TabsTrigger>
          <TabsTrigger value="paid">Pagas ({paidInvoices.length})</TabsTrigger>
          <TabsTrigger value="overdue">Atrasadas ({overdueInvoices.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma fatura encontrada</h3>
              <p className="text-muted-foreground">
                As faturas serão geradas automaticamente quando houver transações
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onMarkAsPaid={handleMarkAsPaid}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingInvoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onMarkAsPaid={handleMarkAsPaid}
              />
            ))}
          </div>
          {pendingInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Nenhuma fatura pendente</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="paid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paidInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
          {paidInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Nenhuma fatura paga</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overdueInvoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onMarkAsPaid={handleMarkAsPaid}
              />
            ))}
          </div>
          {overdueInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Nenhuma fatura atrasada</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        invoice={selectedInvoice}
        onConfirm={handleConfirmPayment}
        isLoading={markAsPaidMutation.isPending}
      />
    </div>
  );
}
