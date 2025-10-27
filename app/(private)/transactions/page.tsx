"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { DataTable, ColumnDef } from "@/components/common/DataTable";
import { FormDialog } from "@/components/common/FormDialog";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";
import { Transaction, CreateTransactionDto } from "@/types/entities/transaction";
import { ShoppingCart, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageSkeleton } from "@/components/common/Skeletons";
import { formatCurrency } from "@/lib/formatters";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    card?: string;
    dependent?: string;
    purchaseCategory?: string;
    startDate?: string;
    endDate?: string;
    installments?: number;
  }>({});

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch transactions
  const { data: transactions = [], isLoading, refetch, isRefetching } = useTransactions({
    ...filters,
    purchaseName: searchTerm || undefined,
  });

  // Mutations
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

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

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn) return transactions;

    const sorted = [...transactions].sort((a, b) => {
      const aValue = a[sortColumn as keyof Transaction];
      const bValue = b[sortColumn as keyof Transaction];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [transactions, sortColumn, sortDirection]);

  // Table columns
  const columns: ColumnDef<Transaction>[] = [
    {
      id: "purchaseDate",
      header: "Data",
      cell: (row) => {
        try {
          return format(new Date(row.purchaseDate), "dd/MM/yyyy", {
            locale: ptBR,
          });
        } catch {
          return row.purchaseDate;
        }
      },
      sortable: true,
    },
    {
      id: "purchaseName",
      header: "Nome",
      accessorKey: "purchaseName",
      sortable: true,
    },
    {
      id: "purchaseCategory",
      header: "Categoria",
      cell: (row) => (
        <Badge variant="outline">{row.purchaseCategory}</Badge>
      ),
      sortable: true,
    },
    {
      id: "amount",
      header: "Valor",
      cell: (row) => (
        <span className="font-medium">
          R$ {formatCurrency(row.amount)}
        </span>
      ),
      sortable: true,
    },
    {
      id: "installments",
      header: "Parcelas",
      cell: (row) => {
        if (row.installments === 1) {
          return <span className="text-muted-foreground">À vista</span>;
        }
        const installmentValue = Number(row.amount) / row.installments;
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.installments}x</span>
            <span className="text-xs text-muted-foreground">
              R$ {formatCurrency(installmentValue)}
            </span>
          </div>
        );
      },
      sortable: true,
    },
  ];

  // Table actions
  const actions = [
    {
      label: "Editar",
      icon: <Pencil className="h-4 w-4" />,
      onClick: (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setEditDialogOpen(true);
      },
    },
    {
      label: "Excluir",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setDeleteDialogOpen(true);
      },
      variant: "destructive" as const,
    },
  ];

  // Form handlers
  const handleCreate = (data: CreateTransactionDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateDialogOpen(false);
      },
    });
  };

  const handleUpdate = (data: CreateTransactionDto) => {
    if (!selectedTransaction) return;

    updateMutation.mutate(
      { id: selectedTransaction.id, data },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedTransaction(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedTransaction) return;

    deleteMutation.mutate(selectedTransaction.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedTransaction(null);
      },
    });
  };

  if (isLoading) {
    return <PageSkeleton tableColumns={8} />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas compras e despesas"
        action={{
          label: "Nova Transação",
          onClick: () => setCreateDialogOpen(true),
          icon: ShoppingCart,
        }}
        onRefresh={() => refetch()}
        isRefreshing={isRefetching}
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Buscar transação por nome..."
          onSearch={setSearchTerm}
          isLoading={isLoading}
        />
        <FilterDrawer
          title="Filtrar Transações"
          description="Refine sua busca com filtros avançados"
          hasActiveFilters={hasActiveFilters}
          onApply={() => {}}
          onReset={handleResetFilters}
        >
          <TransactionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </FilterDrawer>
      </div>

      {/* Summary */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border bg-card space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      ) : (
        transactions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Total de Transações</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold">
                R${" "}
                {transactions
                  .reduce((sum, t) => sum + Number(t.amount), 0)
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Valor Médio</p>
              <p className="text-2xl font-bold">
                R${" "}
                {(
                  transactions.reduce((sum, t) => sum + Number(t.amount), 0) /
                  transactions.length
                ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sortedData}
        actions={actions}
        isLoading={isLoading}
        emptyMessage="Nenhuma transação encontrada. Crie sua primeira transação!"
        onSort={(column, direction) => {
          setSortColumn(column);
          setSortDirection(direction);
        }}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />

      {/* Create Dialog */}
      <FormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        title="Nova Transação"
        description="Registre uma nova compra ou despesa"
        isLoading={createMutation.isPending}
        formId="create-transaction-form"
      >
        <TransactionForm
          formId="create-transaction-form"
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </FormDialog>

      {/* Edit Dialog */}
      {selectedTransaction && (
        <FormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Editar Transação"
          description="Atualize as informações da transação"
          isLoading={updateMutation.isPending}
          formId="edit-transaction-form"
        >
          <TransactionForm
            formId="edit-transaction-form"
            onSubmit={handleUpdate}
            defaultValues={selectedTransaction}
            isLoading={updateMutation.isPending}
          />
        </FormDialog>
      )}

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Transação"
        description="Esta ação não pode ser desfeita. A transação será removida e o limite do cartão será atualizado."
        itemName={selectedTransaction?.purchaseName}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
