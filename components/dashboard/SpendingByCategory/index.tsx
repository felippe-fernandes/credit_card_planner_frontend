"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrencyWithSymbol } from "@/lib/formatters";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { PieLabelRenderProps } from "recharts/types/polar/Pie";

interface CategoryData {
  name: string;
  value: number;
  icon: string;
  color: string;
  [key: string]: string | number;
}

interface SpendingByCategoryProps {
  data: CategoryData[];
}

export function SpendingByCategory({ data }: SpendingByCategoryProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Distribuição dos seus gastos por categoria</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Nenhum gasto registrado no período</p>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: TooltipContentProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{data.icon}</span>
            <span className="font-semibold">{data.name}</span>
          </div>
          <div className="text-sm">
            <p className="font-medium">
              {formatCurrencyWithSymbol(data.value)}
            </p>
            <p className="text-muted-foreground">{percentage}% do total</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    if (typeof percent !== 'number' || percent < 0.05) return null; // Hide labels for slices < 5%
    if (typeof cx !== 'number' || typeof cy !== 'number') return null;
    if (typeof innerRadius !== 'number' || typeof outerRadius !== 'number') return null;
    if (typeof midAngle !== 'number') return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
        <CardDescription>Distribuição dos seus gastos por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend
              formatter={(_value, entry) => {
                const data = entry.payload as CategoryData;
                return `${data.icon} ${data.name}`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
