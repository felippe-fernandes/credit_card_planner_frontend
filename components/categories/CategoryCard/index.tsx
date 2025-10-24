"use client";

import { Category } from "@/types/entities/category";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  isDefault?: boolean;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
  isDefault = false,
}: CategoryCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm flex-shrink-0"
              style={{ backgroundColor: category.color }}
            >
              {category.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-semibold truncate">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.color}</p>
            </div>
          </div>

          {!isDefault && (onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(category)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(category)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isDefault && (
          <div className="mt-3 pt-3 border-t">
            <span className="text-xs text-muted-foreground">
              Categoria padrão
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
