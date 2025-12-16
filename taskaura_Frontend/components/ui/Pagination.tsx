
import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number; // 1-based for UI display
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void; // Receives 1-based page
  onPageSizeChange?: (size: number) => void;
  showPageInfo?: boolean;
  showPageSize?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageInfo = true,
  showPageSize = true,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      // Add ellipsis if needed after first page
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed before last page
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      {showPageInfo && (
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-300">
            {startItem}-{endItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-300">
            {totalItems.toLocaleString()}
          </span>{" "}
          project{totalItems !== 1 ? "s" : ""}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Page Size Selector */}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Show:
            </span>
            <select
              className="text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {[6, 12, 24, 48].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Previous Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3"
        >
          <ChevronLeft size={16} />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="px-3 py-1.5 text-slate-400"
                >
                  <MoreHorizontal size={16} />
                </div>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-[40px] px-0 ${
                  isActive
                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                    : ""
                }`}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
