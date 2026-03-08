/**
 * @file components/chat/ReplyBox.tsx
 * @description The reply composition area at the bottom of the ticket detail page.
 * Provides a resizable text editor, an "AI Suggest Reply" button that calls the
 * io.net API via a Server Action, and a "Send" button. Supports keyboard shortcuts
 * (Enter to send, Shift+Enter for new line) and optimistic UI updates.
 */

"use client";

import { useState } from "react";
import { useTicketStore } from "@/store/useTicketStore";
import { Message } from "@/types";
import { generateAiReply } from "@/actions/ai";

interface ReplyBoxProps {
  /** ID of the ticket this reply will be attached to */
  ticketId: string;
  /** Full conversation history passed to the AI for context-aware suggestion generation */
  conversationHistory: Message[]; 
}

export function ReplyBox({ ticketId, conversationHistory }: ReplyBoxProps) {
  /** Current text content of the reply editor */
  const [replyText, setReplyText] = useState("");
  /** Whether the AI suggestion is currently being generated */
  const [isGenerating, setIsGenerating] = useState(false);
  /** Error message displayed when AI generation fails */
  const [error, setError] = useState<string | null>(null);
  
  /** Zustand action to append a new message to the ticket */
  const addReply = useTicketStore((state) => state.addReply);

  /**
   * Handles sending the reply message.
   * Creates a new Message object and immediately adds it to the Zustand store
   * (optimistic update — no server round-trip needed since data is client-side).
   * Clears the text editor after sending.
   */
  const handleSend = () => {
    if (!replyText.trim()) return;

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      senderId: "AGENT-01",
      senderName: "Attimo Support", // In production, this would be the logged-in user's name
      senderRole: "agent",
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
    };

    // Optimistic update — message appears instantly in the chat
    addReply(ticketId, newMessage);
    setReplyText(""); // Clear the editor
  };

  /**
   * Keyboard shortcut handler for the textarea:
   * - Enter (without Shift) → Send the message
   * - Shift + Enter → Insert a new line (default textarea behavior)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline insertion
      handleSend();
    }
  };

  /**
   * Triggers the AI reply suggestion flow:
   * 1. Calls the `generateAiReply` Server Action with the conversation history
   * 2. Populates the text editor with the AI-generated suggestion
   * 3. The agent can review, edit, and then send the suggestion
   * 
   * Error handling: displays an inline error message if the API call fails.
   */
  const handleAiSuggest = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Call the Server Action, passing the full conversation for context
      const aiSuggestion = await generateAiReply(conversationHistory);
      
      // Place the AI-generated text into the editor for agent review
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
      
      {/* Error banner — shown only when AI generation encounters an error */}
      {error && (
        <div className="mb-2 px-3 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center">
          {/* Warning circle icon */}
          <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Editor container — rounded card with focus ring and overflow hidden for toolbar */}
      <div className="relative rounded-2xl border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 focus-within:ring-2 focus-within:ring-brand-dark dark:focus-within:ring-brand-light focus-within:border-transparent transition-all overflow-hidden">
        
        {/* Resizable textarea editor — min 100px, max 300px height */}
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your reply... (Shift + Enter for new line)"
          className="w-full min-h-25 max-h-75 p-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none text-sm"
        />
        
        {/* Bottom toolbar with action buttons */}
        <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-white/5 border-t border-gray-200 dark:border-white/10 backdrop-blur-sm">  
          {/* AI Suggest button — calls the io.net API for response suggestions */}
          <button
            onClick={handleAiSuggest}
            disabled={isGenerating}
            className="group flex items-center px-4 py-1.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              /* Loading spinner shown while waiting for AI response */
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              /* Sparkle/stars icon indicating AI functionality */
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

          {/* Send button — disabled when the editor is empty */}
          <button
            onClick={handleSend}
            disabled={!replyText.trim()}
            className="flex items-center px-4 py-1.5 bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            {/* Paper plane / send icon */}
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