/**
 * @file components/tickets/TicketPagination.tsx
 * @description Pagination controls for the ticket list. Displays page navigation
 * buttons (first, previous, numbered pages, next, last) along with a "Showing X to Y
 * of Z" info text. Uses a smart ellipsis algorithm to always show exactly 7 page
 * indicators regardless of total page count, preventing layout shifts.
 */

"use client";

import { useTicketStore } from "@/store/useTicketStore";

interface PaginationProps {
  /** Total number of items after filtering (used to calculate total pages) */
  totalItems: number;
}

export function TicketPagination({ totalItems }: PaginationProps) {
  const { currentPage, setCurrentPage, itemsPerPage } = useTicketStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if all items fit on a single page
  if (totalPages <= 1) return null;

  /**
   * Calculates which page numbers/ellipsis indicators to display.
   * Always renders exactly 7 elements to maintain consistent layout width.
   * 
   * Three display modes:
   * 1. Near start (page ≤ 4):    [1] [2] [3] [4] [5] [...] [last]
   * 2. Near end (page ≥ last-3): [1] [...] [last-4] [last-3] [last-2] [last-1] [last]
   * 3. Middle:                    [1] [...] [prev] [current] [next] [...] [last]
   */
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    // If total pages fit within 7, just show them all without ellipsis
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Near the start: show first 5 pages + ellipsis + last page
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } 
    // Near the end: show first page + ellipsis + last 5 pages
    else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } 
    // In the middle: show first + ellipsis + 3 around current + ellipsis + last
    else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  /** Shared Tailwind classes for the previous/next/first/last navigation buttons */
  const navBtnStyles = "p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-400";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-transparent gap-4">
      
      {/* Info text: "Showing X to Y of Z" — helps users understand their position in the list */}
      <div className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
        Showing <span className="font-medium text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
        <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
        <span className="font-medium text-gray-900 dark:text-white">{totalItems}</span>
      </div>

      {/* Navigation button group */}
      <div className="flex items-center space-x-1.5 order-1 sm:order-2">
        {/* Jump to first page button (<<) */}
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={navBtnStyles}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
        </button>

        {/* Previous page button (<) */}
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={navBtnStyles}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Numbered page buttons + ellipsis indicators */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              disabled={page === "..."}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={`min-w-8 sm:min-w-9 h-8 sm:h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-brand-dark text-white dark:bg-white/20"
                  : page === "..." ? "cursor-default text-gray-400" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next page button (>) */}
        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={navBtnStyles}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Jump to last page button (>>) */}
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className={navBtnStyles}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}