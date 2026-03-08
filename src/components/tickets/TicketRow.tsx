import { Ticket } from "@/types";
import { TicketStatusBadge } from "./TicketStatusBadge";
import Link from "next/link";

export function TicketRow({ ticket }: { ticket: Ticket }) {
  const lastMessage = ticket.messages[ticket.messages.length - 1]?.content || "No messages yet.";

  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5 transition-colors group">
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">
        {ticket.id}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-brand-dark dark:bg-brand-light flex items-center justify-center text-xs font-bold text-brand-light dark:text-brand-dark mr-3 shrink-0">
            {ticket.customerName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {ticket.customerName}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-0.5 line-clamp-1">
          {ticket.subject}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 opacity-80">
          {lastMessage}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TicketStatusBadge status={ticket.status} />
      </td>
      {/* whitespace-nowrap ekleyerek butonun kırılmasını ve boşluk oluşmasını engelledik */}
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