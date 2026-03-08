/**
 * @file app/dashboard/layout.tsx
 * @description Layout wrapper for all dashboard routes (e.g., ticket list, ticket detail).
 * Renders the persistent Header component at the top and a responsive main content area
 * below it. This layout is automatically applied to all pages under /dashboard/*.
 */

import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-100dvh bg-brand-light dark:bg-brand-dark transition-colors duration-100">
  {/* Persistent navigation header — always visible at the top of the dashboard */}
  <Header />
  {/* Main content area — uses responsive padding (p-4 on mobile, p-6 on sm+ screens) */}
  <main className="flex-1 p-4 sm:p-6">
    {children}
  </main>
</div>
  );
}