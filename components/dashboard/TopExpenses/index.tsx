"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/entities/transaction";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatCurrencyWithSymbol } from "@/lib/formatters";

interface TopExpensesProps {
  transactions: Transaction[];
}

export function TopExpenses({ transactions }: TopExpensesProps) {
  const router = useRouter();

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Maiores Despesas</CardTitle>
          <CardDescription>Seus gastos mais significativos</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Nenhuma despesa registrada</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate total of top expenses
  const totalTopExpenses = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-destructive" />
              Maiores Despesas
            </CardTitle>
            <CardDescription>
              Top {transactions.length} gastos • Total: {formatCurrencyWithSymbol(totalTopExpenses)}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/transactions")}
            className="gap-1"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => {
            const percentage = (parseFloat(transaction.amount) / totalTopExpenses) * 100;

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{transaction.purchaseName}</span>
                      <Badge variant="outline" className="text-xs">
                        {transaction.purchaseCategory}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {format(new Date(transaction.purchaseDate), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                      {transaction.installments > 1 && (
                        <>
                          <span>•</span>
                          <span>{transaction.installments}x parcelas</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{percentage.toFixed(1)}% do total</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-destructive">
                    {formatCurrencyWithSymbol(transaction.amount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
