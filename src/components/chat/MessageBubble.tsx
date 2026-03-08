import { Message } from "@/types";

export function MessageBubble({ message }: { message: Message }) {
  // Mesaj bizden (agent/ai) mi yoksa müşteriden (customer) mi geldi?
  const isAgent = message.senderRole === "agent" || message.senderRole === "ai";

  // Tarihi saat:dakika formatına çeviriyoruz
  const timeString = new Date(message.createdAt).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return (
    <div className={`flex w-full ${isAgent ? "justify-end" : "justify-start"}`}>
      <div 
        className={`max-w-[85%] sm:max-w-[75%] flex flex-col space-y-1 ${
          isAgent ? "items-end" : "items-start"
        }`}
      >
        {/* Gönderici Adı (Sadece müşteri ise gösterelim, bizsek gerek yok) */}
        {!isAgent && (
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
            {message.senderName}
          </span>
        )}

        {/* Mesaj Balonu */}
        <div 
          className={`px-4 py-3 rounded-2xl relative ${
            isAgent 
              ? "bg-brand-dark text-white rounded-br-sm shadow-sm dark:bg-brand-light dark:text-brand-dark" 
              : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Zaman Damgası */}
        <span className="text-[10px] text-gray-400 dark:text-gray-500 px-1">
          {timeString}
        </span>
      </div>
    </div>
  );
}