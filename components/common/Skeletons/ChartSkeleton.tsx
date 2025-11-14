import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ChartSkeletonProps {
  height?: string;
  showLegend?: boolean;
}

export function ChartSkeleton({
  height = "h-64",
  showLegend = false,
}: ChartSkeletonProps) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-3 w-60 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {showLegend && (
          <div className="flex gap-4 justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        )}
        <Skeleton className={`${height} w-full rounded-lg`} />
      </CardContent>
    </Card>
  );
}
