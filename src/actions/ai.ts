"use server";

import { Message } from "@/types";

export async function generateAiReply(conversationHistory: Message[]) {
  const baseUrl = process.env.IONET_BASE_URL;
  const apiKey = process.env.IONET_API_KEY;
  const model = process.env.IONET_MODEL;

  if (!baseUrl || !apiKey || !model) {
    throw new Error("API credentials are not configured.");
  }

  const systemPrompt = `You are an expert customer support agent for a B2B SaaS company called Attimo. 
  Suggest a professional, empathetic, and concise reply. 
  Do not include placeholders like [Your Name]. Just the raw message body.`;

  const formattedHistory = conversationHistory.map((msg) => ({
    role: msg.senderRole === "customer" ? "user" : "assistant",
    content: msg.content,
  }));

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedHistory,
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("io.net API Error:", errorData);
      throw new Error("Failed to fetch response from io.net");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("An error occurred while generating the suggestion.");
  }
}