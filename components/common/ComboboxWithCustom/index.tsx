"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComboboxWithCustomProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  emptyText?: string;
  addCustomLabel?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
}

export function ComboboxWithCustom({
  value,
  onValueChange,
  options,
  placeholder = "Selecione uma opção...",
  emptyText = "Nenhuma opção encontrada.",
  addCustomLabel = "Adicionar personalizado",
  disabled = false,
  error,
  label,
}: ComboboxWithCustomProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  // Check if current value is not in options (custom value)
  const isCustomValue = React.useMemo(() => {
    return value && !options.includes(value);
  }, [value, options]);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
    setSearch("");
  };

  const handleAddCustom = () => {
    if (customValue.trim()) {
      onValueChange(customValue.trim());
      setCustomValue("");
      setShowCustomInput(false);
      setOpen(false);
      setSearch("");
    }
  };

  const displayValue = React.useMemo(() => {
    if (!value) return placeholder;
    if (isCustomValue) return `${value} (personalizado)`;
    return value;
  }, [value, placeholder, isCustomValue]);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between transition-colors",
              !value && "text-muted-foreground",
              error && "border-destructive",
              open && "border-primary border-2"
            )}
            disabled={disabled}
          >
            {displayValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex flex-col">
            {/* Search Input */}
            <div className="border-b p-2">
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9"
              />
            </div>

            {/* Options List */}
            <ScrollArea className="h-[200px]">
              <div className="p-1">
                {filteredOptions.length === 0 && !showCustomInput ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {emptyText}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        value === option && "bg-accent"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Add Custom Section */}
            <div className="border-t p-2">
              {!showCustomInput ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowCustomInput(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {addCustomLabel}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o valor..."
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustom();
                      }
                    }}
                    className="h-9"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleAddCustom}>
                    Adicionar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomValue("");
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
