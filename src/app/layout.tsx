/**
 * @file app/layout.tsx
 * @description Root layout for the entire Next.js application.
 * Wraps all pages with the ThemeProvider (next-themes) for dark/light mode support,
 * applies global background/text colors, and sets HTML-level metadata.
 */

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

/** SEO metadata applied to all pages via Next.js's built-in Metadata API */
export const metadata: Metadata = {
  title: "Attimo Support",
  description: "AI Powered Customer Support Dashboard",
};

/**
 * RootLayout — the top-level layout component rendered on every page.
 * 
 * Key details:
 * - `suppressHydrationWarning` is required by next-themes to prevent a React
 *   hydration mismatch caused by theme class injection before hydration.
 * - Body classes set brand colors for both light and dark themes, with a
 *   smooth `transition-colors` to animate theme switches.
 * - ThemeProvider is configured to use the CSS class strategy (`attribute="class"`)
 *   and defaults to the user's OS preference (`defaultTheme="system"`).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required for next-themes to work without React warnings
    <html lang="tr" suppressHydrationWarning>
      {/* Background and text colors adapt to light/dark theme.
          transition-colors provides a smooth visual transition on theme change. */}
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