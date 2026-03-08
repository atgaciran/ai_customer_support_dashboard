"use client";

import { useState } from "react";
import { useTicketStore } from "@/store/useTicketStore";
import { Message } from "@/types";
import { generateAiReply } from "@/actions/ai";

interface ReplyBoxProps {
  ticketId: string;
  // AI'a bağlam sunmak için biletin geçmiş mesajlarını da gönderiyoruz
  conversationHistory: Message[]; 
}

export function ReplyBox({ ticketId, conversationHistory }: ReplyBoxProps) {
  const [replyText, setReplyText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const addReply = useTicketStore((state) => state.addMessage);

  // 1. GÖNDERME İŞLEMİ (Optimistic UI & Enter Kısayolu)
  const handleSend = () => {
    if (!replyText.trim()) return;

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      senderId: "AGENT-01",
      senderName: "Attimo Support", // Veya giriş yapan kullanıcının adı
      senderRole: "agent",
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
    };

    // Zustand'a anında ekliyoruz (Optimistic Update)
    addReply(ticketId, newMessage);
    setReplyText(""); // Kutuyu temizle
  };

  // 2. KLAVYE KISAYOLLARI (Enter to send, Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Varsayılan alt satıra geçme işlemini durdur
      handleSend();
    }
  };

  // 3. YAPAY ZEKA BAĞLANTISI (Server Action Simülasyonu)
  // 2. handleAiSuggest fonksiyonunu şu şekilde güncelle:
  const handleAiSuggest = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Server Action'ı çağırıp konuşma geçmişini (bağlamı) gönderiyoruz
      const aiSuggestion = await generateAiReply(conversationHistory);
      
      // Gelen cevabı editöre yazdırıyoruz
      setReplyText(aiSuggestion);
    } catch (err) {
      console.error("AI Action Error:", err);
      setError("Failed to generate suggestion. Please try again or check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-transparent shrink-0">
      
      {/* Hata Durumu (Error State) */}
      {error && (
        <div className="mb-2 px-3 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center">
          <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="relative rounded-2xl border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 focus-within:ring-2 focus-within:ring-brand-dark dark:focus-within:ring-brand-light focus-within:border-transparent transition-all overflow-hidden">
        
        {/* Metin Editörü */}
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your reply... (Shift + Enter for new line)"
          className="w-full min-h-25 max-h-75 p-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none text-sm"
        />
        
        {/* Alt Araç Çubuğu (Butonlar) */}
        <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-white/5 border-t border-gray-200 dark:border-white/10 backdrop-blur-sm">  
          {/* Yapay Zeka Butonu */}
          <button
            onClick={handleAiSuggest}
            disabled={isGenerating}
            className="group flex items-center px-4 py-1.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg 
                className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
                />
              </svg>
            )}
            {isGenerating ? "Generating..." : "AI Suggest Reply"}
          </button>

          {/* Gönder Butonu */}
          <button
            onClick={handleSend}
            disabled={!replyText.trim()}
            className="flex items-center px-4 py-1.5 bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M2 3l20 9-20 9 3-9-3-9z" 
            />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}