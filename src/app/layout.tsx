import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Attimo Support",
  description: "AI Powered Customer Support Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning next-themes için zorunludur
    <html lang="tr" suppressHydrationWarning>
      {/* Gövde rengini hem açık hem koyu tema için Tailwind ile veriyoruz.
        transition-colors aradaki geçişin yumuşak olmasını sağlar.
      */}
      <body className="bg-brand-light text-brand-dark dark:bg-brand-dark dark:text-brand-light transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}