import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ListSkeletonProps {
  items?: number;
  showIcon?: boolean;
}

export function ListSkeleton({ items = 5, showIcon = true }: ListSkeletonProps) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-3 w-32 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {showIcon && <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full max-w-[200px]" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16 flex-shrink-0" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
