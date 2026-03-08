/**
 * @file lib/mockData.ts
 * @description Generates realistic mock ticket data for development and testing.
 * Since the app operates without a backend database, this module produces a
 * deterministic set of support tickets with varied customer names, subjects,
 * and statuses to simulate a production-like environment.
 */

import { Ticket } from '@/types';

/**
 * Pool of realistic customer names used for generating mock ticket data.
 * Names cycle via modulo when generating more tickets than names available.
 */
const names = [
  'Sarah Jenkins', 'Michael Chen', 'Emma Watson', 'David Miller', 
  'Sophia Taylor', 'James Wilson', 'Olivia Brown', 'Liam Davis', 
  'Isabella Garcia', 'Lucas Martinez', 'Charlotte Anderson', 'Mason Thomas',
  'Amelia Lee', 'Ethan Harris', 'Mia Clark', 'Logan Lewis', 
  'Harper Robinson', 'Elijah Walker', 'Evelyn Young', 'Aiden King',
];

/**
 * Pool of realistic support ticket subjects covering common B2B SaaS issues
 * such as billing, integrations, security, and feature requests.
 */
const subjects = [
  'Cannot access the dashboard after recent update',
  'Billing discrepancy on my annual invoice',
  'Feature request: Export to CSV',
  'API Rate limit exceeded frequently',
  'Integration with Slack is failing',
  'How to add a new team member?',
  'Custom domain SSL issue',
  'Account locked due to multiple attempts',
  'Need help with Webhooks',
  'Mobile app crashing on startup',
  'Error 500 on checkout page',
  'Database connection timeout',
  'Unable to reset password',
  'Two-factor authentication not working',
  'Request for data deletion',
  'How to use the new AI features?',
  'Feedback on the latest UI changes',
  'Question about user roles and permissions',
  'Issue with email notifications',
];

/** Available ticket statuses cycled through during generation */
const statuses: Ticket['status'][] = ['open', 'pending', 'resolved'];

/**
 * Programmatically generates a specified number of mock support tickets.
 * 
 * The first ticket is always a hand-crafted, detailed test ticket with a
 * multi-message conversation history — useful for testing the chat view.
 * Remaining tickets are auto-generated with cycling names, subjects, and
 * statuses. Each auto-generated ticket is offset by 2 hours into the past
 * to simulate realistic chronological ordering.
 * 
 * @param count - Total number of tickets to generate (including the detailed first ticket)
 * @returns An array of Ticket objects
 */
const generateMockTickets = (count: number): Ticket[] => {
  const tickets: Ticket[] = [];

  // --- 1. Hand-crafted detailed test ticket (always placed at the top) ---
  // This ticket has a multi-turn conversation demonstrating a real support flow:
  // customer reports a 401 error → agent diagnoses → customer confirms fix → asks follow-up
  tickets.push({
    id: 'TKT-2026',
    customerId: 'CUST-099',
    customerName: 'Tolga Seymen',
    subject: 'Issue with Custom AI Agent Integration',
    status: 'open',
    createdAt: new Date().toISOString(),
    messages: [
      { id: 'MSG-101', senderId: 'CUST-099', senderName: 'Tolga Seymen', senderRole: 'customer', content: 'Hi, I am trying to integrate the io.net API with my Next.js project but I keep getting a 401 error.', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'MSG-102', senderId: 'AGENT-01', senderName: 'Attimo Support', senderRole: 'agent', content: 'Hello Tolga! Usually, a 401 error means there is an issue with your API Key. Have you checked if your .env.local file is correctly configured?', createdAt: new Date(Date.now() - 3500000).toISOString() },
      { id: 'MSG-103', senderId: 'CUST-099', senderName: 'Tolga Seymen', senderRole: 'customer', content: 'Yes, the key is there. However, I noticed it only happens when I call it from a Server Action. Client-side fetch works fine.', createdAt: new Date(Date.now() - 3400000).toISOString() },
      { id: 'MSG-104', senderId: 'AGENT-01', senderName: 'Attimo Support', senderRole: 'agent', content: 'I see. In Server Actions, you need to make sure the environment variables are loaded correctly on the server side. Are you using "use server" at the top of your file?', createdAt: new Date(Date.now() - 3300000).toISOString() },
      { id: 'MSG-105', senderId: 'CUST-099', senderName: 'Tolga Seymen', senderRole: 'customer', content: 'That was it! But now I have another question: how can I limit the token usage for each request to avoid high costs?', createdAt: new Date(Date.now() - 3200000).toISOString() }
    ]
  });

  // --- 2. Auto-generate remaining tickets using a loop ---
  for (let i = 1; i < count; i++) {
    // Cycle through name/subject/status arrays using modulo
    const name = names[i % names.length];
    const subject = subjects[i % subjects.length];
    const status = statuses[i % statuses.length];
    
    // Each ticket is offset 2 hours further into the past for realistic chronological spread
    const ticketDate = new Date(Date.now() - (i * 2 * 3600000));

    tickets.push({
      id: `TKT-${1000 + i}`,
      customerId: `CUST-${String(i).padStart(3, '0')}`,
      customerName: name,
      subject: `${subject} (Auto #${i})`, // Numbered suffix helps identify auto-generated tickets when testing search
      status: status,
      createdAt: ticketDate.toISOString(),
      messages: [
        {
          id: `MSG-${i}-1`,
          senderId: `CUST-${String(i).padStart(3, '0')}`,
          senderName: name,
          senderRole: 'customer',
          content: `Hello, I need assistance regarding: ${subject}. This is an auto-generated message for testing purposes.`,
          createdAt: ticketDate.toISOString(),
        }
      ]
    });
  }

  return tickets;
};

/**
 * Exported array of 500 mock tickets used as the initial data source
 * for the Zustand ticket store. This large dataset enables testing
 * pagination, search filtering, and sorting at scale.
 */
export const mockTickets: Ticket[] = generateMockTickets(500);