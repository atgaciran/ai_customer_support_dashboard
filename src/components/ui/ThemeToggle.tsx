/**
 * @file components/ui/ThemeToggle.tsx
 * @description A toggle button that switches between light and dark themes.
 * Displays a sun icon in light mode and a moon icon in dark mode.
 * Uses next-themes' `useTheme` hook for theme state management.
 * 
 * Hydration safety: The component renders `null` until it has mounted on the client
 * to prevent a React hydration mismatch (server doesn't know the user's theme).
 */

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  /** Tracks whether the component has mounted on the client.
   *  Prevents hydration mismatch since the server can't determine the active theme. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout(0) to defer the state update to the next microtask.
    // This avoids interfering with React's synchronous render cycle during hydration.
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Don't render the toggle until client-side hydration is complete
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        /* Sun icon — displayed when the current theme is light mode */
        <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        /* Moon icon — displayed when the current theme is dark mode */
        <svg className="w-5 h-5 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}