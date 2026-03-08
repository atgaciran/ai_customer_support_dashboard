/**
 * @file actions/ai.ts
 * @description Next.js Server Action for generating AI-powered reply suggestions.
 * This module communicates with the io.net inference API (OpenAI-compatible endpoint)
 * to produce professional, context-aware responses based on the ticket's conversation
 * history. It runs exclusively on the server to protect API credentials.
 */

"use server";

import { Message } from "@/types";

/**
 * Generates an AI-suggested reply by sending the conversation history to the
 * io.net LLM API. The model is instructed to act as an expert B2B SaaS support
 * agent and return a concise, empathetic response.
 *
 * @param conversationHistory - Array of messages from the ticket's conversation thread.
 *   These are mapped to OpenAI-compatible roles: customer → "user", agent/ai → "assistant".
 * @returns The AI-generated reply text, trimmed of leading/trailing whitespace.
 * @throws Error if API credentials are missing or the API request fails.
 */
export async function generateAiReply(conversationHistory: Message[]) {
  // Read API configuration from server-side environment variables
  const baseUrl = process.env.IONET_BASE_URL;
  const apiKey = process.env.IONET_API_KEY;
  const model = process.env.IONET_MODEL;

  // Fail fast if any required env vars are not configured
  if (!baseUrl || !apiKey || !model) {
    throw new Error("API credentials are not configured.");
  }

  // System prompt instructs the model to behave as Attimo's customer support agent.
  // It explicitly asks for no placeholder text (e.g., "[Your Name]") so the
  // response can be directly used or lightly edited by the human agent.
  const systemPrompt = `You are an expert customer support agent for a B2B SaaS company called Attimo. 
  Suggest a professional, empathetic, and concise reply. 
  Do not include placeholders like [Your Name]. Just the raw message body.`;

  // Convert internal message format to OpenAI-compatible chat format:
  // - Customer messages become "user" role
  // - Agent and AI messages become "assistant" role
  const formattedHistory = conversationHistory.map((msg) => ({
    role: msg.senderRole === "customer" ? "user" : "assistant",
    content: msg.content,
  }));

  try {
    // Send the chat completion request to the io.net API endpoint
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt }, // System prompt comes first
          ...formattedHistory,                        // Followed by conversation context
        ],
        temperature: 0.7,   // Balanced creativity — not too rigid, not too random
        max_tokens: 150,    // Keep suggestions concise to fit a support reply
      }),
    });

    // Handle non-2xx HTTP responses from the API
    if (!response.ok) {
      const errorData = await response.json();
      console.error("io.net API Error:", errorData);
      throw new Error("Failed to fetch response from io.net");
    }

    // Extract and return the generated text from the first completion choice
    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("An error occurred while generating the suggestion.");
  }
}