import { useState } from "react";

export interface FormDialogHandlers<TEntity> {
  createDialog: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  editDialog: {
    isOpen: boolean;
    open: (item: TEntity) => void;
    close: () => void;
  };
  deleteDialog: {
    isOpen: boolean;
    open: (item: TEntity) => void;
    close: () => void;
  };
  selectedItem: TEntity | null;
  clearSelection: () => void;
}

export function useFormDialogs<TEntity>(): FormDialogHandlers<TEntity> {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TEntity | null>(null);

  return {
    createDialog: {
      isOpen: createDialogOpen,
      open: () => setCreateDialogOpen(true),
      close: () => setCreateDialogOpen(false),
    },
    editDialog: {
      isOpen: editDialogOpen,
      open: (item: TEntity) => {
        setSelectedItem(item);
        setEditDialogOpen(true);
      },
      close: () => {
        setEditDialogOpen(false);
        setSelectedItem(null);
      },
    },
    deleteDialog: {
      isOpen: deleteDialogOpen,
      open: (item: TEntity) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
      },
      close: () => {
        setDeleteDialogOpen(false);
        setSelectedItem(null);
      },
    },
    selectedItem,
    clearSelection: () => setSelectedItem(null),
  };
}
