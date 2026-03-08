/**
 * @file components/tickets/TicketTable.tsx
 * @description Renders the main ticket data table with a responsive, horizontally
 * scrollable container. Defines fixed column widths via <colgroup> for consistent
 * layout, and shows a "No tickets found" empty state when the filtered list is empty.
 * Each ticket row is rendered by the TicketRow component.
 */

import { Ticket } from "@/types";
import { TicketRow } from "./TicketRow";

interface TicketTableProps {
  /** Pre-filtered and paginated array of tickets to display */
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    /* Outer card container with rounded corners, shadow, and theme-aware border */
    <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
      {/* Horizontally scrollable wrapper for mobile responsiveness */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
        {/* Table with fixed column widths (min-w-200 = 800px minimum for horizontal scroll on mobile) */}
        <table className="w-full text-left border-collapse table-fixed min-w-200">
            {/* Column width definitions — controls the proportional layout of each column:
                14% Ticket ID | 20% Customer | 40% Subject | 12% Status | 15% Action */}
            <colgroup>
                <col className="w-[14%]" />
                <col className="w-[20%]" />
                <col className="w-[40%]" /> 
                <col className="w-[12%]" />
                <col className="w-[15%]" /> 
            </colgroup>
          <thead>
            <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject & Latest Message</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {tickets.length > 0 ? (
              /* Render a TicketRow for each ticket in the paginated subset */
              tickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))
            ) : (
              /* Empty state shown when no tickets match the current filter criteria */
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-500 dark:text-gray-400">
                   No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}