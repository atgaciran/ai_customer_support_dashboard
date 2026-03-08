import { Ticket } from "@/types";
import { TicketRow } from "./TicketRow";

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
        {/* min-w değerini 800px yaparak mobilde güvenli bir yatay kaydırma alanı oluşturduk */}
        <table className="w-full text-left border-collapse table-fixed min-w-200">
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
              tickets.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))
            ) : (
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