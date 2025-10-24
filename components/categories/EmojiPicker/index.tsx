"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  disabled?: boolean;
}

const EMOJI_CATEGORIES = {
  "Mais Usados": ["🍔", "🚗", "🎬", "🏥", "📚", "🏠", "💡", "📱", "✈️", "🎮"],
  Alimentação: ["🍕", "🍔", "🍟", "🍿", "🥗", "🍜", "🍱", "🥘", "🍰", "☕"],
  Transporte: ["🚗", "🚕", "🚌", "🚇", "✈️", "🚲", "🛴", "🚂", "⛽", "🚦"],
  Lazer: ["🎬", "🎮", "🎵", "🎨", "🎪", "🎭", "🎤", "🎧", "🎸", "🎯"],
  Saúde: ["🏥", "💊", "🩺", "💉", "🦷", "👓", "🧘", "💪", "🏃", "🧠"],
  Educação: ["📚", "📖", "✏️", "📝", "🎓", "🏫", "📐", "🔬", "💻", "📊"],
  Casa: ["🏠", "🛋️", "🛏️", "🚿", "🧹", "🧺", "🔧", "🔨", "💡", "🪴"],
  Compras: ["🛒", "🛍️", "👕", "👔", "👗", "👠", "💄", "👜", "🎁", "💳"],
  Outros: ["💰", "💸", "💵", "📱", "⚡", "🔔", "❤️", "⭐", "🎯", "✨"],
};

export function EmojiPicker({ value, onChange, disabled }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const filteredEmojis = Object.entries(EMOJI_CATEGORIES).reduce(
    (acc, [category, emojis]) => {
      const filtered = emojis.filter((emoji) => {
        const query = searchTerm.toLowerCase();
        const categoryMatch = category.toLowerCase().includes(query);
        return categoryMatch || !searchTerm;
      });

      if (filtered.length > 0) {
        acc[category] = filtered;
      }

      return acc;
    },
    {} as Record<string, string[]>
  );

  const handleSelect = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{value || "➕"}</span>
            <span className="text-muted-foreground">
              {value ? "Clique para trocar" : "Selecione um emoji"}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <Input
            placeholder="Buscar categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-3 space-y-4">
            {Object.entries(filteredEmojis).map(([category, emojis]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                  {category}
                </h4>
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className="h-10 w-10 p-0 text-2xl hover:bg-accent"
                      onClick={() => handleSelect(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(filteredEmojis).length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-6">
                <Smile className="h-8 w-8 mx-auto mb-2 opacity-50" />
                Nenhum emoji encontrado
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
