import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-100dvh bg-brand-light dark:bg-brand-dark transition-colors duration-100">
  <Header />
  {/* Mobilde p-4, masaüstünde p-6 yaparak alanı optimize ettik */}
  <main className="flex-1 p-4 sm:p-6">
    {children}
  </main>
</div>
  );
}