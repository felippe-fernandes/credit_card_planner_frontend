"use client";

import { CardFilters } from "@/components/cards/CardFilters";
import { CardForm } from "@/components/cards/CardForm";
import { ColumnDef, DataTable } from "@/components/common/DataTable";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { FormDialog } from "@/components/common/FormDialog";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/badge";
import {
  useCards,
  useCreateCard,
  useDeleteCard,
  useUpdateCard,
} from "@/hooks/useCards";
import { Card, CreateCardDto } from "@/types/entities/card";
import { CreditCard, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function CardsPage() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    flag?: string;
    bank?: string;
    dueDay?: number;
    payDay?: number;
  }>({});

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch cards with filters
  const { data: cards = [], isLoading, refetch, isRefetching } = useCards({
    ...filters,
    name: searchTerm || undefined,
  });

  // Mutations
  const createMutation = useCreateCard();
  const updateMutation = useUpdateCard();
  const deleteMutation = useDeleteCard();

  // Filter change handler
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({});
  };

  // Check if has active filters
  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  // Sorted and filtered data (client-side sorting)
  const sortedData = useMemo(() => {
    if (!sortColumn) return cards;

    const sorted = [...cards].sort((a, b) => {
      const aValue = a[sortColumn as keyof Card];
      const bValue = b[sortColumn as keyof Card];

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
  }, [cards, sortColumn, sortDirection]);

  // Table columns
  const columns: ColumnDef<Card>[] = [
    {
      id: "name",
      header: "Nome",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "bank",
      header: "Banco",
      accessorKey: "bank",
      sortable: true,
    },
    {
      id: "flag",
      header: "Bandeira",
      cell: (row) => <Badge variant="outline">{row.flag}</Badge>,
      sortable: true,
    },
    {
      id: "limit",
      header: "Limite",
      cell: (row) => (
        <span className="font-medium">
          R$ {Number(row.limit).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
    {
      id: "availableLimit",
      header: "Disponível",
      cell: (row) => {
        const percentage = (Number(row.availableLimit) / Number(row.limit)) * 100;
        return (
          <div className="space-y-1">
            <span className="text-sm">
              R$ {Number(row.availableLimit).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${percentage > 50
                  ? "bg-green-500"
                  : percentage > 20
                    ? "bg-yellow-500"
                    : "bg-red-500"
                  }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      id: "dueDay",
      header: "Vencimento",
      cell: (row) => `Dia ${row.dueDay}`,
      sortable: true,
    },
    {
      id: "payDay",
      header: "Fechamento",
      cell: (row) => `Dia ${row.payDay}`,
      sortable: true,
    },
  ];

  // Table actions
  const actions = [
    {
      label: "Editar",
      icon: <Pencil className="h-4 w-4" />,
      onClick: (card: Card) => {
        setSelectedCard(card);
        setEditDialogOpen(true);
      },
    },
    {
      label: "Excluir",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (card: Card) => {
        setSelectedCard(card);
        setDeleteDialogOpen(true);
      },
      variant: "destructive" as const,
    },
  ];

  // Form submission handlers
  const handleCreate = (data: CreateCardDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateDialogOpen(false);
      },
    });
  };

  const handleUpdate = (data: CreateCardDto) => {
    if (!selectedCard) return;

    updateMutation.mutate(
      { id: selectedCard.id, data },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedCard(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedCard) return;

    deleteMutation.mutate(selectedCard.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedCard(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Cartões"
        description="Gerencie seus cartões de crédito"
        action={{
          label: "Novo Cartão",
          onClick: () => setCreateDialogOpen(true),
          icon: CreditCard,
        }}
        onRefresh={() => refetch()}
        isRefreshing={isRefetching}
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Buscar cartão por nome..."
          onSearch={setSearchTerm}
          isLoading={isLoading}
        />
        <FilterDrawer
          title="Filtrar Cartões"
          description="Refine sua busca com filtros avançados"
          hasActiveFilters={hasActiveFilters}
          onApply={() => { }}
          onReset={handleResetFilters}
        >
          <CardFilters filters={filters} onFilterChange={handleFilterChange} />
        </FilterDrawer>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sortedData}
        actions={actions}
        isLoading={isLoading}
        emptyMessage="Nenhum cartão encontrado. Crie seu primeiro cartão!"
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
        title="Novo Cartão"
        description="Adicione um novo cartão de crédito"
        isLoading={createMutation.isPending}
        formId="create-card-form"
      >
        <CardForm
          formId="create-card-form"
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </FormDialog>

      {/* Edit Dialog */}
      {selectedCard && (
        <FormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Editar Cartão"
          description="Atualize as informações do cartão"
          isLoading={updateMutation.isPending}
          formId="edit-card-form"
        >
          <CardForm
            formId="edit-card-form"
            onSubmit={handleUpdate}
            defaultValues={selectedCard}
            isLoading={updateMutation.isPending}
          />
        </FormDialog>
      )}

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Cartão"
        description="Esta ação não pode ser desfeita. Todas as transações e faturas associadas a este cartão serão perdidas."
        itemName={selectedCard?.name}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
