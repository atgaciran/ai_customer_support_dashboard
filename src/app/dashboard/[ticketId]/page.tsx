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
  
  // Yeni mesaj geldiğinde en alta kaydırmak için referans
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const ticketId = params.ticketId as string;
  const ticket = useTicketStore((state) => 
    state.tickets.find((t) => t.id === ticketId)
  );

  // Mesaj listesi güncellendiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

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
    <div className="flex flex-col h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-7rem)]">
      
      {/* 1. Üst Bilgi Çubuğu (Header) */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-white/10 shrink-0">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-1 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Back to tickets"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {ticket.subject}
            </h1>
          </div>
          <div className="flex items-center space-x-3 pl-9">
            <TicketStatusBadge status={ticket.status} />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {ticket.id} • {ticket.customerName}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Mesajlaşma Alanı (Sohbet Geçmişi) */}
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
        {/* Otomatik kaydırma hedefi */}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Yanıt Yazma ve Yapay Zeka Alanı */}
        <div className="shrink-0 pt-4 pb-2">
            <ReplyBox 
                ticketId={ticket.id} 
                conversationHistory={ticket.messages} 
            />
        </div>
    </div>
  );
}