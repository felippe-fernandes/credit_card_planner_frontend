import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  hasActions?: boolean;
}

export function TableSkeleton({
  columns,
  rows = 5,
  hasActions = true,
}: TableSkeletonProps) {
  const getRandomWidth = () => {
    const widths = ["w-3/4", "w-2/3", "w-1/2", "w-3/5", "w-4/5"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  return (
    <div className="w-full rounded-md border overflow-hidden">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i} className="w-auto">
                  <Skeleton className="h-4 w-16 max-w-full" />
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="w-[70px]">
                  <Skeleton className="h-4 w-12" />
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="w-auto">
                    <Skeleton className={`h-5 ${getRandomWidth()} max-w-full`} />
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell className="w-[70px]">
                    <Skeleton className="h-8 w-8 rounded" />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
