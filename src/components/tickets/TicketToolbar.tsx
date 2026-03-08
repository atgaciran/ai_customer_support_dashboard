/**
 * @file components/tickets/TicketToolbar.tsx
 * @description Toolbar component positioned above the ticket table on the dashboard.
 * Provides three controls for refining the ticket list:
 * 1. Search input — filters tickets by customer name or subject in real-time.
 * 2. Status filter dropdown — narrows results to a specific ticket status.
 * 3. Sort order dropdown — controls the ordering of the filtered results.
 * 
 * All state is managed via the Zustand ticket store. Changes automatically
 * reset pagination to page 1 (handled by the store's setter functions).
 */

"use client";

import { useTicketStore, SortOption } from "@/store/useTicketStore";
import { TicketStatus } from "@/types";

export function TicketToolbar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    sortOrder, 
    setSortOrder 
  } = useTicketStore();

  /**
   * Shared Tailwind styles for both select dropdowns.
   * Uses a custom dark background color (#0f294d) to maintain visual consistency
   * with the Header and dropdown menu components in dark mode.
   */
  const selectStyles = "w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-[#0f294d] text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-dark dark:focus:ring-brand-light outline-none cursor-pointer transition-colors appearance-none";

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
      {/* Search input with a magnifying glass icon overlay */}
      <div className="relative w-full lg:flex-1 max-w-md">
        {/* Search icon positioned inside the input field (non-interactive overlay) */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by customer or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-dark dark:focus:ring-brand-light focus:border-transparent outline-none appearance-none transition-colors"
        />
      </div>

      {/* Filter and sort controls — stack vertically on mobile, inline on larger screens */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {/* Status filter dropdown — filters tickets by their lifecycle status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | "all")}
          className={selectStyles}
          style={{ colorScheme: 'dark' }} // Prevents the browser from rendering a white dropdown box in dark mode
        >
          <option value="all" className="bg-white dark:bg-[#0f294d]">All Statuses</option>
          <option value="open" className="bg-white dark:bg-[#0f294d]">Open</option>
          <option value="pending" className="bg-white dark:bg-[#0f294d]">Pending</option>
          <option value="resolved" className="bg-white dark:bg-[#0f294d]">Resolved</option>
        </select>

        {/* Sort order dropdown — controls ticket list ordering */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOption)}
          className={selectStyles}
          style={{ colorScheme: 'dark' }}
        >
          <option value="date-newest" className="bg-white dark:bg-[#0f294d]">Date: Newest First</option>
          <option value="date-oldest" className="bg-white dark:bg-[#0f294d]">Date: Oldest First</option>
          <option value="id-desc" className="bg-white dark:bg-[#0f294d]">ID: High to Low</option>
          <option value="id-asc" className="bg-white dark:bg-[#0f294d]">ID: Low to High</option>
        </select>
      </div>
    </div>
  );
}