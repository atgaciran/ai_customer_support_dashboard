/**
 * @file app/dashboard/[ticketId]/page.tsx
 * @description Ticket detail page showing the full conversation history for a single
 * support ticket. Displays the ticket subject, status, and customer info at the top,
 * a scrollable chat-style message list in the middle, and the reply/AI suggestion
 * box at the bottom. The layout uses a flex column with calculated viewport height
 * to create a full-screen chat experience.
 */

"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTicketStore } from "@/store/useTicketStore";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ReplyBox } from "@/components/chat/ReplyBox";

export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  /** Ref attached to an invisible div at the bottom of the message list.
   *  Used to auto-scroll to the latest message when new messages arrive. */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  /** Extract the ticket ID from the dynamic route parameter */
  const ticketId = params.ticketId as string;

  /** Look up the ticket from the Zustand store by its ID */
  const ticket = useTicketStore((state) => 
    state.tickets.find((t) => t.id === ticketId)
  );

  /**
   * Auto-scroll effect: whenever the message array changes (e.g., new reply added),
   * smoothly scroll the chat area to the bottom so the latest message is visible.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  // --- 404 State: Ticket not found ---
  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ticket Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The ticket you are looking for does not exist or has been deleted.</p>
        <button 
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    /* Full-height flex layout: subtracts header height (6rem mobile / 7rem desktop) 
       from viewport height to create a contained chat interface */
    <div className="flex flex-col h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-7rem)]">
      
      {/* --- Section 1: Ticket Info Header ---
          Shows back button, ticket subject, status badge, ID, and customer name */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-white/10 shrink-0">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-3">
            {/* Back navigation button — returns to the ticket list */}
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-1 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Back to tickets"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Ticket subject as the page heading */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {ticket.subject}
            </h1>
          </div>
          {/* Metadata row: status badge + ticket ID + customer name */}
          <div className="flex items-center space-x-3 pl-9">
            <TicketStatusBadge status={ticket.status} />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {ticket.id} • {ticket.customerName}
            </span>
          </div>
        </div>
      </div>

      {/* --- Section 2: Message List (Chat History) ---
          Scrollable area showing all messages in chronological order.
          Renders MessageBubble components aligned left (customer) or right (agent/AI). */}
      <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-6">
        {ticket.messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          ticket.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {/* Invisible anchor element — auto-scroll target for new messages */}
        <div ref={messagesEndRef} />
      </div>

      {/* --- Section 3: Reply & AI Suggestion Area ---
          Fixed at the bottom; contains the text editor, AI suggest button, and send button */}
        <div className="shrink-0 pt-4 pb-2">
            <ReplyBox 
                ticketId={ticket.id} 
                conversationHistory={ticket.messages} 
            />
        </div>
    </div>
  );
}