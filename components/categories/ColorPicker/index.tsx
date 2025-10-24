"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

const PRESET_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#d946ef", // fuchsia
  "#ec4899", // pink
  "#f43f5e", // rose
  "#64748b", // slate
  "#6b7280", // gray
  "#000000", // black
];

export function ColorPicker({ value, onChange, disabled }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          disabled={disabled}
        >
          <div className="flex items-center gap-2 w-full">
            <div
              className="h-6 w-6 rounded-md border-2 border-background shadow"
              style={{ backgroundColor: value || "#000000" }}
            />
            <span className="flex-1">{value || "Selecione uma cor"}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          {/* Preset Colors */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">
              Cores Predefinidas
            </Label>
            <div className="grid grid-cols-10 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-md border-2 transition-transform hover:scale-110",
                    value === color
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-background shadow"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                >
                  {value === color && (
                    <Check className="h-4 w-4 text-white m-auto drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Input */}
          <div className="space-y-2">
            <Label htmlFor="custom-color" className="text-xs font-semibold text-muted-foreground">
              Cor Personalizada
            </Label>
            <div className="flex gap-2">
              <Input
                id="custom-color"
                type="color"
                value={value || "#000000"}
                onChange={(e) => onChange(e.target.value)}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                placeholder="#000000"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 font-mono text-sm"
                maxLength={7}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">
              Visualização
            </Label>
            <div
              className="h-12 w-full rounded-md border-2 border-background shadow-sm"
              style={{ backgroundColor: value || "#000000" }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
