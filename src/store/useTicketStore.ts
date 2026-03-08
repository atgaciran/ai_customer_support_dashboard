import { create } from 'zustand';
import { Message, Ticket, TicketStatus } from '@/types';
import { mockTickets } from '@/lib/mockData';

// Sıralama seçenekleri için tip tanımı
export type SortOption = "date-newest" | "date-oldest" | "id-desc" | "id-asc";

interface TicketState {
  tickets: Ticket[];
  searchQuery: string;
  statusFilter: TicketStatus | "all";
  sortOrder: SortOption; // Yeni
  currentPage: number;
  itemsPerPage: number;
  
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: TicketStatus | "all") => void;
  setSortOrder: (order: SortOption) => void; // Yeni
  setCurrentPage: (page: number) => void;
  addReply: (ticketId: string, message: Message) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: mockTickets,
  searchQuery: "",
  statusFilter: "all",
  sortOrder: "date-newest", // Varsayılan: En yeni tarih
  currentPage: 1,
  itemsPerPage: 8,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }), // Sıralama değişince 1. sayfaya atar
  setCurrentPage: (page) => set({ currentPage: page }),
  
  addReply: (ticketId, message) => set((state) => ({
    tickets: state.tickets.map(t => 
      t.id === ticketId 
        ? { ...t, messages: [...t.messages, message], status: 'pending' } 
        : t
    )
  })),
}));