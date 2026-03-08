/**
 * @file components/ThemeProvider.tsx
 * @description Client-side wrapper around next-themes' ThemeProvider.
 * 
 * This component exists because next-themes requires a client component boundary
 * ("use client") to function properly, but Next.js app layouts are server components
 * by default. By isolating the "use client" directive here, the root layout can
 * remain a server component while still providing theme context to the entire app.
 */

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider — passes all received props directly to NextThemesProvider.
 * Accepts the same props as the underlying next-themes provider (attribute,
 * defaultTheme, enableSystem, etc.) via React.ComponentProps spread.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}