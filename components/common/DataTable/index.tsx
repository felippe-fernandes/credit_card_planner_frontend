"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { TableSkeleton } from "@/components/common/Skeletons";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
}

export interface DataTableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  actions?: DataTableAction<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
  isLoading = false,
  emptyMessage = "Nenhum resultado encontrado.",
  onSort,
  sortColumn,
  sortDirection,
}: DataTableProps<T>) {
  const handleSort = (columnId: string) => {
    if (!onSort) return;

    const newDirection =
      sortColumn === columnId && sortDirection === "asc" ? "desc" : "asc";
    onSort(columnId, newDirection);
  };

  const renderCell = (column: ColumnDef<T>, row: T) => {
    if (column.cell) {
      return column.cell(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey] as ReactNode;
    }
    return null;
  };

  if (isLoading) {
    return (
      <TableSkeleton
        columns={columns.length}
        rows={5}
        hasActions={actions ? actions.length > 0 : false}
      />
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-[70px]">Ações</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>
                {column.sortable && onSort ? (
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.id)}
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                  >
                    {column.header}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="w-[70px]">Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id}>{renderCell(column, row)}</TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {actions.map((action, actionIndex) => (
                        <DropdownMenuItem
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={
                            action.variant === "destructive"
                              ? "text-destructive focus:text-destructive"
                              : ""
                          }
                        >
                          {action.icon && (
                            <span className="mr-2">{action.icon}</span>
                          )}
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
