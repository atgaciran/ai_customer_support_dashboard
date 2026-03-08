/**
 * @file app/dashboard/page.tsx
 * @description Main dashboard page displaying the paginated, filterable, and sortable
 * ticket list. This is the primary view for support agents to browse and manage
 * customer support tickets.
 *
 * Data flow:
 * 1. Raw ticket data + filter/sort/pagination state is read from the Zustand store.
 * 2. Tickets are filtered by search query (customer name or subject) and status.
 * 3. Filtered tickets are sorted according to the selected sort strategy.
 * 4. The sorted list is sliced for the current page.
 * 5. The paginated subset is passed to TicketTable for rendering.
 */

"use client";

import { useTicketStore } from "@/store/useTicketStore";
import { TicketToolbar } from "@/components/tickets/TicketToolbar";
import { TicketTable } from "@/components/tickets/TicketTable";
import { TicketPagination } from "@/components/tickets/TicketPagination";

export default function DashboardPage() {
  const { tickets, searchQuery, statusFilter, sortOrder, currentPage, itemsPerPage } = useTicketStore();

  // --- Step 1: Filter tickets by search query and status ---
  // Search matches against both customerName and subject (case-insensitive).
  // Status filter is bypassed when set to "all".
  const filteredTickets = tickets
    .filter((ticket) => {
      const matchesSearch = 
        ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    // --- Step 2: Sort filtered tickets by selected sort strategy ---
    // Uses locale-aware comparison for IDs (numeric: true handles "TKT-1001" vs "TKT-999")
    .sort((a, b) => {
      if (sortOrder === "id-asc") return a.id.localeCompare(b.id, undefined, { numeric: true });
      if (sortOrder === "id-desc") return b.id.localeCompare(a.id, undefined, { numeric: true });
      if (sortOrder === "date-newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  // --- Step 3: Slice for current page ---
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      {/* Page header with title and descriptive subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Support Tickets</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and respond to customer inquiries.</p>
      </div>

      {/* Search bar, status filter, and sort order controls */}
      <TicketToolbar />

      {/* Ticket table with pagination — rendered as a single visual block */}
      <div className="space-y-0"> 
        <TicketTable tickets={paginatedTickets} />
        <TicketPagination totalItems={filteredTickets.length} />
      </div>
    </div>
  );
}