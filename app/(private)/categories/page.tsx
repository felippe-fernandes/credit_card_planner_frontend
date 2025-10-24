"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FormDialog } from "@/components/common/FormDialog";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { CategoryCard } from "@/components/categories/CategoryCard";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useAddDefaultCategories,
} from "@/hooks/useCategories";
import { Category, CreateCategoryDto } from "@/types/entities/category";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Default categories that come from backend
const DEFAULT_CATEGORY_NAMES = ["Food", "Transport", "Entertainment", "Health", "Education"];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading } = useCategories({
    name: searchTerm || undefined,
  });

  // Mutations
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const addDefaultsMutation = useAddDefaultCategories();

  // Check if category is default
  const isDefaultCategory = (categoryName: string) => {
    return DEFAULT_CATEGORY_NAMES.includes(categoryName);
  };

  // Filter categories by search
  const filteredCategories = searchTerm
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  // Form submission handlers
  const handleCreate = (data: CreateCategoryDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateDialogOpen(false);
      },
    });
  };

  const handleUpdate = (data: CreateCategoryDto) => {
    if (!selectedCategory) return;

    // For update, we only send icon and color (name is PK and cannot change)
    updateMutation.mutate(
      {
        name: selectedCategory.name,
        data: {
          icon: data.icon,
          color: data.color,
        },
      },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedCategory(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedCategory) return;

    deleteMutation.mutate(selectedCategory.name, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
      },
    });
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Categorias"
        description="Organize seus gastos por categorias personalizadas"
        action={{
          label: "Nova Categoria",
          onClick: () => setCreateDialogOpen(true),
          icon: Plus,
        }}
      />

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          placeholder="Buscar categoria..."
          onSearch={setSearchTerm}
          isLoading={isLoading}
        />

        {categories.length === 0 && !isLoading && (
          <Button
            onClick={() => addDefaultsMutation.mutate()}
            disabled={addDefaultsMutation.isPending}
            variant="outline"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {addDefaultsMutation.isPending
              ? "Adicionando..."
              : "Adicionar Categorias Padrão"}
          </Button>
        )}
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchTerm ? "Nenhuma categoria encontrada" : "Nenhuma categoria ainda"}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            {searchTerm
              ? "Tente ajustar sua busca"
              : "Crie sua primeira categoria ou adicione as categorias padrão"}
          </p>
          {!searchTerm && (
            <div className="flex gap-2">
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Categoria
              </Button>
              <Button
                onClick={() => addDefaultsMutation.mutate()}
                disabled={addDefaultsMutation.isPending}
                variant="outline"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Categorias Padrão
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isDefault={isDefaultCategory(category.name)}
            />
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <FormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        title="Nova Categoria"
        description="Crie uma categoria personalizada para organizar seus gastos"
        isLoading={createMutation.isPending}
        onSubmit={() => {
          const form = document.getElementById("category-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
      >
        <div id="category-form">
          <CategoryForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </div>
      </FormDialog>

      {/* Edit Dialog */}
      {selectedCategory && (
        <FormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          title="Editar Categoria"
          description="Atualize o ícone e a cor da categoria"
          isLoading={updateMutation.isPending}
          onSubmit={() => {
            const form = document.getElementById("edit-category-form") as HTMLFormElement;
            form?.requestSubmit();
          }}
        >
          <div id="edit-category-form">
            <CategoryForm
              onSubmit={handleUpdate}
              defaultValues={selectedCategory}
              isLoading={updateMutation.isPending}
            />
          </div>
        </FormDialog>
      )}

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Categoria"
        description="Esta ação não pode ser desfeita. Todas as transações com esta categoria precisarão ser recategorizadas."
        itemName={selectedCategory?.name}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
