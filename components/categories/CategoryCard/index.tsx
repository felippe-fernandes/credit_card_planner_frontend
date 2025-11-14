"use client";

import { Category } from "@/types/entities/category";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex items-center gap-3 px-4 py-3 rounded-lg border border-border/40 hover:border-border transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-md text-lg flex-shrink-0"
        style={{ backgroundColor: category.color + "20" }}
      >
        <span style={{ filter: "brightness(0.8)" }}>{category.icon}</span>
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{category.name}</p>
        {isDefault && (
          <span className="text-xs text-muted-foreground">Padrão</span>
        )}
      </div>

      {/* Actions - show on hover */}
      {!isDefault && (onEdit || onDelete) && (
        <div
          className={`flex items-center gap-1 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onEdit(category)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(category)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
