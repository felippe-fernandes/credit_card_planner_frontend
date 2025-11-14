"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userEmail: string;
  isLoading?: boolean;
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirm,
  userEmail,
  isLoading = false,
}: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText === "DELETAR";

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm();
      setConfirmText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle>Excluir Conta</DialogTitle>
              <DialogDescription className="text-destructive">
                Esta ação é irreversível!
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4 space-y-2">
            <p className="text-sm font-semibold text-destructive">
              ⚠️ Aviso: Todos os seus dados serão permanentemente excluídos
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>Todos os cartões cadastrados</li>
              <li>Todas as transações e compras</li>
              <li>Todas as faturas</li>
              <li>Categorias personalizadas</li>
              <li>Dependentes</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">
              Digite <strong className="text-destructive">DELETAR</strong> para confirmar
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Digite DELETAR"
              disabled={isLoading}
              className="font-mono"
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Conta: <span className="font-mono">{userEmail}</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setConfirmText("");
            }}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading || !isConfirmValid}
          >
            {isLoading ? "Excluindo..." : "Excluir Permanentemente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
