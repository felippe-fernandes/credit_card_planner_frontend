"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { DataTable, ColumnDef } from "@/components/common/DataTable";
import { FormDialog } from "@/components/common/FormDialog";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { DependentForm } from "@/components/dependents/DependentForm";
import {
  useDependents,
  useCreateDependent,
  useUpdateDependent,
  useDeleteDependent,
} from "@/hooks/useDependents";
import { Dependent, CreateDependentDto } from "@/types/entities/dependent";
import { Users, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageSkeleton } from "@/components/common/Skeletons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DependentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDependent, setSelectedDependent] = useState<Dependent | null>(null);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch dependents
  const { data: dependents = [], isLoading, refetch, isRefetching } = useDependents({
    name: searchTerm || undefined,
  });

  // Mutations
  const createMutation = useCreateDependent();
  const updateMutation = useUpdateDependent();
  const deleteMutation = useDeleteDependent();

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn) return dependents;

    const sorted = [...dependents].sort((a, b) => {
      const aValue = a[sortColumn as keyof Dependent];
      const bValue = b[sortColumn as keyof Dependent];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sorted;
  }, [dependents, sortColumn, sortDirection]);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Table columns
  const columns: ColumnDef<Dependent>[] = [
    {
      id: "name",
      header: "Nome",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: "createdAt",
      header: "Criado em",
      cell: (row) => {
        try {
          return format(new Date(row.createdAt), "dd/MM/yyyy 'às' HH:mm", {
            locale: ptBR,
          });
        } catch {
          return row.createdAt;
        }
      },
      sortable: true,
    },
  ];

  // Table actions
  const actions = [
    {
      label: "Editar",
      icon: <Pencil className="h-4 w-4" />,
      onClick: (dependent: Dependent) => {
        setSelectedDependent(dependent);
        setEditDialogOpen(true);
      },
    },
    {
      label: "Excluir",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (dependent: Dependent) => {
        setSelectedDependent(dependent);
        setDeleteDialogOpen(true);
      },
      variant: "destructive" as const,
    },
  ];

  // Form submission handlers
  const handleCreate = (data: CreateDependentDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateDialogOpen(false);
      },
    });
  };

  const handleUpdate = (data: CreateDependentDto) => {
    if (!selectedDependent) return;

    updateMutation.mutate(
      { id: selectedDependent.id, data },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedDependent(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedDependent) return;

    deleteMutation.mutate(selectedDependent.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedDependent(null);
      },
    });
  };

  if (isLoading) {
    return <PageSkeleton tableColumns={4} hasFilters={true} />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Dependentes"
        description="Gerencie os dependentes e acompanhe seus gastos"
        action={{
          label: "Novo Dependente",
          onClick: () => setCreateDialogOpen(true),
          icon: Users,
        }}
        onRefresh={() => refetch()}
        isRefreshing={isRefetching}
      />

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Buscar dependente por nome..."
          onSearch={setSearchTerm}
          isLoading={isLoading}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sortedData}
        actions={actions}
        isLoading={isLoading}
        emptyMessage="Nenhum dependente encontrado. Adicione o primeiro!"
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
        title="Novo Dependente"
        description="Adicione um dependente para acompanhar gastos"
        isLoading={createMutation.isPending}
        formId="create-dependent-form"
      >
        <DependentForm
          formId="create-dependent-form"
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </FormDialog>

      {/* Edit Dialog */}
      {selectedDependent && (
        <FormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Editar Dependente"
          description="Atualize as informações do dependente"
          isLoading={updateMutation.isPending}
          formId="edit-dependent-form"
        >
          <DependentForm
            formId="edit-dependent-form"
            onSubmit={handleUpdate}
            defaultValues={selectedDependent}
            isLoading={updateMutation.isPending}
          />
        </FormDialog>
      )}

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Dependente"
        description="Esta ação não pode ser desfeita. Todas as transações associadas a este dependente ficarão sem atribuição."
        itemName={selectedDependent?.name}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
