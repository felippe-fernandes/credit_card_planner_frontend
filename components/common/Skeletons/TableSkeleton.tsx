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
    const widths = ["w-20", "w-24", "w-32", "w-40", "w-48", "w-full"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
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
                <TableCell key={colIndex}>
                  <Skeleton className={`h-5 ${getRandomWidth()}`} />
                </TableCell>
              ))}
              {hasActions && (
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
