import { PaginationMeta } from '@/types/api/pagination';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  meta: PaginationMeta | null;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
  onChangeLimit?: (limit: number) => void;
  showLimitSelector?: boolean;
}

export const Pagination = ({
  meta,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  onChangeLimit,
  showLimitSelector = true,
}: PaginationProps) => {
  if (!meta) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (meta.totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= meta.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (meta.page > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, meta.page - 1);
      const end = Math.min(meta.totalPages - 1, meta.page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (meta.page < meta.totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      pages.push(meta.totalPages);
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
            ...
          </span>
        );
      }

      const isCurrentPage = page === meta.page;

      return (
        <Button
          key={page}
          onClick={() => onGoToPage(page as number)}
          variant="outline"
          size="sm"
          className={isCurrentPage
            ? 'min-w-[2.5rem] !bg-white !text-black hover:!bg-white/90 font-bold !border-2 !border-black pointer-events-none shadow-md'
            : 'min-w-[2.5rem]'
          }
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      {/* Items per page selector */}
      {showLimitSelector && onChangeLimit && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Items per page:</span>
          <Select
            value={meta.limit.toString()}
            onValueChange={(value) => onChangeLimit(parseInt(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Page info */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Showing {(meta.page - 1) * meta.limit + 1} to{' '}
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <Button
          onClick={onPreviousPage}
          disabled={!meta.hasPreviousPage}
          variant="outline"
          size="sm"
          className="px-3"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </Button>

        <div className="flex gap-1 mx-1">{renderPageNumbers()}</div>

        <Button
          onClick={onNextPage}
          disabled={!meta.hasNextPage}
          variant="outline"
          size="sm"
          className="px-3"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
