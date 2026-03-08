// types/index.ts

export type TicketStatus = 'open' | 'pending' | 'resolved';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'agent' | 'ai';
  content: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  messages: Message[];
}