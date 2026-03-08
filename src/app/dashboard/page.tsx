"use client";

import { useTicketStore } from "@/store/useTicketStore";
import { TicketToolbar } from "@/components/tickets/TicketToolbar";
import { TicketTable } from "@/components/tickets/TicketTable"; // Yeni import
import { TicketPagination } from "@/components/tickets/TicketPagination";

export default function DashboardPage() {
  const { tickets, searchQuery, statusFilter, sortOrder, currentPage, itemsPerPage } = useTicketStore();

  // Veri işleme mantığı (Filtreleme + Sıralama)
  const filteredTickets = tickets
    .filter((ticket) => {
      const matchesSearch = 
        ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "id-asc") return a.id.localeCompare(b.id, undefined, { numeric: true });
      if (sortOrder === "id-desc") return b.id.localeCompare(a.id, undefined, { numeric: true });
      if (sortOrder === "date-newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  // Sayfalama mantığı
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Support Tickets</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and respond to customer inquiries.</p>
      </div>

      <TicketToolbar />

      {/* Sadece tabloyu ve sayfalamayı çağırıyoruz */}
      <div className="space-y-0"> 
        <TicketTable tickets={paginatedTickets} />
        <TicketPagination totalItems={filteredTickets.length} />
      </div>
    </div>
  );
}