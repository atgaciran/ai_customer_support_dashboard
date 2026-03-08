import { TicketStatus } from "@/types";

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const styles = {
    open: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}