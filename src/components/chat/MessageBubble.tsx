/**
 * @file components/chat/MessageBubble.tsx
 * @description Renders a single chat message bubble within the ticket detail view.
 * Messages from agents/AI are right-aligned with dark brand colors, while customer
 * messages are left-aligned with a lighter style. The component also displays the
 * sender's name (for customers only) and a timestamp below each bubble.
 */

import { Message } from "@/types";

export function MessageBubble({ message }: { message: Message }) {
  // Determine if the message is from our side (agent or AI) vs. the customer.
  // This controls alignment (right vs. left) and bubble styling.
  const isAgent = message.senderRole === "agent" || message.senderRole === "ai";

  // Format the timestamp as HH:MM (e.g., "14:30")
  const timeString = new Date(message.createdAt).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return (
    /* Container: agent messages are pushed right, customer messages stay left */
    <div className={`flex w-full ${isAgent ? "justify-end" : "justify-start"}`}>
      <div 
        className={`max-w-[85%] sm:max-w-[75%] flex flex-col space-y-1 ${
          isAgent ? "items-end" : "items-start"
        }`}
      >
        {/* Sender name label — only shown for customer messages.
            Agent/AI messages don't need a label since they're obviously "our" replies. */}
        {!isAgent && (
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
            {message.senderName}
          </span>
        )}

        {/* Message bubble — uses different colors and border-radius variations:
            - Agent/AI: dark brand background, bottom-right corner squared
            - Customer: white/transparent background with border, bottom-left corner squared */}
        <div 
          className={`px-4 py-3 rounded-2xl relative ${
            isAgent 
              ? "bg-brand-dark text-white rounded-br-sm shadow-sm dark:bg-brand-light dark:text-brand-dark" 
              : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white"
          }`}
        >
          {/* Message text — preserves whitespace and line breaks */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Timestamp displayed below the bubble in a subtle, small font */}
        <span className="text-[10px] text-gray-400 dark:text-gray-500 px-1">
          {timeString}
        </span>
      </div>
    </div>
  );
}