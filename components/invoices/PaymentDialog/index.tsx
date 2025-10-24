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
import { Invoice } from "@/types/entities/invoice";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  onConfirm: (paidAmount?: number) => void;
  isLoading?: boolean;
}

export function PaymentDialog({
  open,
  onOpenChange,
  invoice,
  onConfirm,
  isLoading = false,
}: PaymentDialogProps) {
  const [paidAmount, setPaidAmount] = useState<string>("");
  const [useFullAmount, setUseFullAmount] = useState(true);

  if (!invoice) return null;

  const remainingAmount = invoice.totalAmount - invoice.paidAmount;

  const handleConfirm = () => {
    if (useFullAmount) {
      onConfirm();
    } else {
      const amount = parseFloat(paidAmount);
      if (!isNaN(amount) && amount > 0) {
        onConfirm(amount);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle>Marcar Fatura como Paga</DialogTitle>
          </div>
          <DialogDescription>
            Confirme o pagamento da fatura
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Invoice Info */}
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor Total:</span>
              <span className="font-medium">
                R$ {invoice.totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Já Pago:</span>
              <span className="font-medium text-green-600">
                R$ {invoice.paidAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2">
              <span className="text-muted-foreground">Restante:</span>
              <span className="font-bold">
                R$ {remainingAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="full"
                checked={useFullAmount}
                onChange={() => setUseFullAmount(true)}
                className="h-4 w-4"
              />
              <Label htmlFor="full" className="cursor-pointer">
                Pagar valor total restante (R$ {remainingAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="partial"
                checked={!useFullAmount}
                onChange={() => setUseFullAmount(false)}
                className="h-4 w-4"
              />
              <Label htmlFor="partial" className="cursor-pointer">
                Pagamento parcial
              </Label>
            </div>

            {!useFullAmount && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="paidAmount">Valor a pagar (R$)</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={remainingAmount}
                  placeholder="0.00"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Processando..." : "Confirmar Pagamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
