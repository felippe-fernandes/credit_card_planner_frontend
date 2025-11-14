import { Skeleton } from "@/components/ui/skeleton";
import { StatCardSkeleton } from "./StatCardSkeleton";
import { ChartSkeleton } from "./ChartSkeleton";
import { ListSkeleton } from "./ListSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Quick Filters Skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48 rounded-md" />
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartSkeleton showLegend />
        <ChartSkeleton showLegend />
      </div>

      {/* Monthly Trend Skeleton */}
      <ChartSkeleton height="h-80" />

      {/* Lists Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <ListSkeleton />
        <ListSkeleton showIcon={false} />
      </div>
    </div>
  );
}
