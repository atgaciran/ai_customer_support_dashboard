/**
 * @file components/tickets/TicketRow.tsx
 * @description Renders a single row in the ticket table. Each row displays the
 * ticket ID, customer avatar (initial letter) and name, subject with the latest
 * message preview, status badge, and a "View Details" link to the ticket's
 * conversation page. Includes hover effects for better interactivity.
 */

import { Ticket } from "@/types";
import { TicketStatusBadge } from "./TicketStatusBadge";
import Link from "next/link";

export function TicketRow({ ticket }: { ticket: Ticket }) {
  // Extract the most recent message content for the preview, or show fallback text
  const lastMessage = ticket.messages[ticket.messages.length - 1]?.content || "No messages yet.";

  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5 transition-colors group">
      {/* Column 1: Ticket ID — displayed in monospace font for visual consistency */}
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">
        {ticket.id}
      </td>

      {/* Column 2: Customer — circular avatar with first letter + full name */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          {/* Avatar circle showing the customer's first name initial */}
          <div className="w-8 h-8 rounded-full bg-brand-dark dark:bg-brand-light flex items-center justify-center text-xs font-bold text-brand-light dark:text-brand-dark mr-3 shrink-0">
            {ticket.customerName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {ticket.customerName}
          </span>
        </div>
      </td>

      {/* Column 3: Subject + latest message preview — both truncated to 1 line */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-0.5 line-clamp-1">
          {ticket.subject}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 opacity-80">
          {lastMessage}
        </div>
      </td>

      {/* Column 4: Status badge — color-coded by ticket status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <TicketStatusBadge status={ticket.status} />
      </td>

      {/* Column 5: Action — "View Details" link navigating to the ticket conversation page.
          whitespace-nowrap prevents the button text from wrapping on narrow screens. */}
      <td className="pl-6 pr-4 py-4 whitespace-nowrap text-right">
  <div className="flex justify-end items-center">
    <Link
      href={`/dashboard/${ticket.id}`}
      className="inline-flex items-center justify-center px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-brand-dark dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-sm font-medium shrink-0"
    >
      View Details
    </Link>
  </div>
</td>
    </tr>
  );
}