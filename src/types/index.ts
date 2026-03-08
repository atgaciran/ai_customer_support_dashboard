/**
 * @file types/index.ts
 * @description Central type definitions for the AI Customer Support Dashboard.
 * All shared interfaces and type aliases used across the application are defined here,
 * ensuring type safety and consistency throughout the codebase.
 */

/**
 * Represents the possible lifecycle states of a support ticket.
 * - 'open'     → Newly created, awaiting agent response.
 * - 'pending'  → Agent has replied; waiting for customer follow-up or resolution.
 * - 'resolved' → Issue has been closed/resolved.
 */
export type TicketStatus = 'open' | 'pending' | 'resolved';

/**
 * Represents a single message within a ticket's conversation thread.
 * Messages can originate from customers, human agents, or the AI assistant.
 */
export interface Message {
  /** Unique identifier for the message (e.g., "MSG-101") */
  id: string;
  /** ID of the user or agent who sent the message */
  senderId: string;
  /** Display name of the sender */
  senderName: string;
  /** Role of the sender — determines message alignment and styling in the chat UI */
  senderRole: 'customer' | 'agent' | 'ai';
  /** The text body of the message */
  content: string;
  /** ISO 8601 timestamp indicating when the message was created */
  createdAt: string;
}

/**
 * Represents a customer support ticket containing metadata and its conversation history.
 * Each ticket belongs to a single customer and holds an array of messages.
 */
export interface Ticket {
  /** Unique ticket identifier (e.g., "TKT-2026") */
  id: string;
  /** Unique identifier for the customer who created the ticket */
  customerId: string;
  /** Full name of the customer */
  customerName: string;
  /** Brief description / title of the support issue */
  subject: string;
  /** Current lifecycle status of the ticket */
  status: TicketStatus;
  /** ISO 8601 timestamp of ticket creation */
  createdAt: string;
  /** Ordered list of messages in the ticket's conversation thread */
  messages: Message[];
}