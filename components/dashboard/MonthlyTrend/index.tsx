"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatCurrencyWithSymbol } from "@/lib/formatters";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";

interface TrendData {
  month: string;
  value: number;
}

interface MonthlyTrendProps {
  data: TrendData[];
}

export function MonthlyTrend({ data }: MonthlyTrendProps) {
  if (data.length === 0 || data.every((d) => d.value === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Gastos</CardTitle>
          <CardDescription>Acompanhe a tendência dos seus gastos ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Nenhum gasto registrado no período</p>
        </CardContent>
      </Card>
    );
  }

  const average = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  const CustomTooltip = ({ active, payload }: TooltipContentProps<string | number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <p className="font-semibold">{data.month}</p>
          <p className="text-sm font-medium mt-1">
            {formatCurrencyWithSymbol(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução de Gastos</CardTitle>
        <CardDescription>
          Últimos 6 meses • Média: {formatCurrencyWithSymbol(average)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) =>
                `R$ ${formatCurrency(value, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
              }
            />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
