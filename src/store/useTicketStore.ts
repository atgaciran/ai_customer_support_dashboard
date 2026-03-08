/**
 * @file store/useTicketStore.ts
 * @description Global state management for the ticket system using Zustand.
 * This store holds the ticket list, search/filter/sort preferences, pagination state,
 * and provides actions to update them. All dashboard components consume this store
 * to maintain a single source of truth for ticket-related UI state.
 */

import { create } from 'zustand';
import { Message, Ticket, TicketStatus } from '@/types';
import { mockTickets } from '@/lib/mockData';

/**
 * Available sorting strategies for the ticket list.
 * - "date-newest" → Most recently created tickets appear first.
 * - "date-oldest" → Oldest tickets appear first.
 * - "id-desc"     → Tickets sorted by ID in descending (high → low) order.
 * - "id-asc"      → Tickets sorted by ID in ascending (low → high) order.
 */
export type SortOption = "date-newest" | "date-oldest" | "id-desc" | "id-asc";

/**
 * Shape of the Zustand ticket store — combines state values with action setters.
 */
interface TicketState {
  /** Full list of all support tickets (loaded from mock data) */
  tickets: Ticket[];
  /** Current search query string for filtering by customer name or subject */
  searchQuery: string;
  /** Active status filter — "all" shows every ticket regardless of status */
  statusFilter: TicketStatus | "all";
  /** Active sort strategy for ordering the filtered ticket list */
  sortOrder: SortOption;
  /** Current page index (1-based) for pagination */
  currentPage: number;
  /** Number of tickets displayed per page */
  itemsPerPage: number;
  
  /** Updates the search query and resets pagination to page 1 */
  setSearchQuery: (query: string) => void;
  /** Updates the status filter and resets pagination to page 1 */
  setStatusFilter: (status: TicketStatus | "all") => void;
  /** Updates the sort order and resets pagination to page 1 */
  setSortOrder: (order: SortOption) => void;
  /** Navigates to a specific page number */
  setCurrentPage: (page: number) => void;
  /** Appends a new message to a ticket's conversation and sets its status to 'pending' */
  addReply: (ticketId: string, message: Message) => void;
}

/**
 * Zustand store instance for ticket state management.
 * Initial state uses mock data and default filter/sort/pagination values.
 * All filter and sort changes automatically reset the user to page 1
 * to prevent viewing an empty or out-of-range page.
 */
export const useTicketStore = create<TicketState>((set) => ({
  tickets: mockTickets,
  searchQuery: "",
  statusFilter: "all",
  sortOrder: "date-newest", // Default: newest tickets first
  currentPage: 1,
  itemsPerPage: 8,

  // Resetting currentPage to 1 on filter/sort changes prevents empty page views
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  
  /**
   * Appends a reply message to the specified ticket and updates its status to 'pending'.
   * Uses an optimistic update pattern — the message appears immediately in the UI
   * without waiting for a server round-trip (since this is a client-side mock).
   */
  addReply: (ticketId, message) => set((state) => ({
    tickets: state.tickets.map(t => 
      t.id === ticketId 
        ? { ...t, messages: [...t.messages, message], status: 'pending' } 
        : t
    )
  })),
}));