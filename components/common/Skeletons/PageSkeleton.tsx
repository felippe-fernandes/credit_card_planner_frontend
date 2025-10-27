import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "./TableSkeleton";

interface PageSkeletonProps {
  hasFilters?: boolean;
  tableColumns?: number;
  tableRows?: number;
}

export function PageSkeleton({
  hasFilters = true,
  tableColumns = 7,
  tableRows = 5,
}: PageSkeletonProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header Skeleton */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Search and Filters Skeleton */}
      {hasFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      )}

      {/* Table Skeleton */}
      {tableColumns > 0 && (
        <TableSkeleton columns={tableColumns} rows={tableRows} />
      )}
    </div>
  );
}
